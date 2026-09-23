#!/usr/bin/env python3
"""Build gallery preview thumbnails for ABSN-Study-Hub.

The house convention, from CLAUDE.md:

    Board previews live in `img/previews/` and the full plate in
    `img/infographics/`. The convention is **longest edge 760px, WEBP quality 82**
    - cap the *longest* edge, not the width.

Capping the width instead makes a portrait preview ~40% heavier than the rest of
the folder, which is the bug this script exists to stop recurring.

Usage
-----
    python3 tools/build-previews.py SRC DST            # one file
    python3 tools/build-previews.py --manifest m.json  # many

A manifest is a list of {"src": ..., "dst": ...}. Sources may be an image, a PDF
(page 1 is rendered) or a .pptx (converted via LibreOffice, then page 1).

Idempotent: an existing destination is skipped unless --force is given, so a run
interrupted partway - by a dropped Drive session, say - can simply be re-run.

Prints one JSON object per line: {"dst", "w", "h", "bytes", "status"}.
"""
import argparse, json, os, subprocess, sys, tempfile

LONGEST = 760
QUALITY = 82
PDF_DPI = 150


def _from_pdf(src, page=0):
    """Render one page of a PDF to a PIL image."""
    import pymupdf
    from PIL import Image
    with pymupdf.open(src) as doc:
        if doc.page_count == 0:
            raise ValueError(f'{src}: PDF has no pages')
        pix = doc.load_page(page).get_pixmap(dpi=PDF_DPI)
        return Image.frombytes('RGB', (pix.width, pix.height), pix.samples)


def _from_pptx(src):
    """Convert a deck to PDF with LibreOffice, then render slide 1."""
    with tempfile.TemporaryDirectory() as td:
        r = subprocess.run(
            ['soffice', '--headless', '--convert-to', 'pdf', '--outdir', td, src],
            capture_output=True, text=True, timeout=300)
        pdfs = [f for f in os.listdir(td) if f.lower().endswith('.pdf')]
        if not pdfs:
            raise RuntimeError(f'{src}: soffice produced no PDF. {r.stderr[:200]}')
        return _from_pdf(os.path.join(td, pdfs[0]))


def load(src):
    ext = os.path.splitext(src)[1].lower()
    if ext == '.pdf':
        return _from_pdf(src)
    if ext in ('.pptx', '.ppt', '.potx'):
        return _from_pptx(src)
    from PIL import Image
    return Image.open(src)


def build(src, dst, force=False):
    if os.path.exists(dst) and not force:
        from PIL import Image
        with Image.open(dst) as im:
            w, h = im.size
        return {'dst': dst, 'w': w, 'h': h, 'bytes': os.path.getsize(dst),
                'status': 'skipped'}

    from PIL import Image
    im = load(src)
    W, H = im.size
    sc = min(1.0, LONGEST / max(W, H))           # cap the LONGEST edge
    out = im.convert('RGB').resize((round(W * sc), round(H * sc)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst) or '.', exist_ok=True)
    out.save(dst, 'WEBP', quality=QUALITY, method=6)
    return {'dst': dst, 'w': out.width, 'h': out.height,
            'bytes': os.path.getsize(dst), 'status': 'built'}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src', nargs='?')
    ap.add_argument('dst', nargs='?')
    ap.add_argument('--manifest')
    ap.add_argument('--force', action='store_true')
    a = ap.parse_args()

    jobs = json.load(open(a.manifest)) if a.manifest else [{'src': a.src, 'dst': a.dst}]
    built = skipped = failed = 0
    for j in jobs:
        try:
            r = build(j['src'], j['dst'], a.force)
            built += r['status'] == 'built'
            skipped += r['status'] == 'skipped'
        except Exception as e:                       # one bad source must not stop a batch
            r = {'dst': j.get('dst'), 'status': 'FAILED', 'error': f'{type(e).__name__}: {e}'}
            failed += 1
        print(json.dumps(r), flush=True)
    print(json.dumps({'summary': {'built': built, 'skipped': skipped, 'failed': failed}}))
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
