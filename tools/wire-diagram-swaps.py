#!/usr/bin/env python3
"""Put Codex's new illustrations in place of the old diagrams on every page
outside Modules 1-7.

The Modules 1-7 pages get their new pictures from the reader layer at runtime
(wire-module-reader.py).  The same old diagrams also appear on the later
modules, the NG study pages, the course hubs and the gallery; Caroline asked
for those too (8 Oct: "I would like those other pictures done").  This tool
swaps them in the page source, using the same replacement map
(tools/module-reader-data.json), so one corrected picture is one edit.

  * A figure's  <a href="…old.svg"><img src="…old.svg"></a>  becomes the new
    picture, sized from the file, plus a link to its companion page in
    assets/modules-1-7/visuals/ - every label from the old diagram is there.
  * That figure's "Swipe it sideways if it is cut off" hint goes: the new
    picture fits the phone width.
  * A gallery card that shows an old diagram as its thumbnail gets a 760px
    preview of the new picture (img/previews/sr-<slug>.webp); its link stays.

Idempotent: a swapped picture no longer matches an old path.
    python3 tools/wire-diagram-swaps.py            # write
    python3 tools/wire-diagram-swaps.py --check    # list stale pages, exit 1
"""
import glob, html, io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

LINK_STYLE = ('display:inline-flex;align-items:center;min-height:44px;box-sizing:border-box;margin:10px 0 0;'
              'padding:8px 14px;border-radius:10px;background:#16384f;border:1px solid #6fb8d6;color:#c9f3ff;'
              'font-weight:800;font-size:1rem;line-height:1.35;text-decoration:none')
IMG_STYLE = 'display:block;width:100%;height:auto;border-radius:14px'
HINT = re.compile(r'\s*<span[^>]*>\s*Swipe it sideways if it is cut off, or tap to open it full size\.\s*</span>')


def replacements():
    data = json.load(io.open('tools/module-reader-data.json', encoding='utf-8'))
    reps, mods = {}, {e['path'] for e in data}
    for e in data:
        for k, r in (e['config'].get('replacements') or {}).items():
            reps.setdefault(k, r)
    return reps, mods


def preview(rep):
    """760px longest-edge thumbnail for gallery cards (CLAUDE.md image rule)."""
    from PIL import Image
    out = 'img/previews/sr-%s.webp' % rep['slug']
    if not os.path.exists(out):
        im = Image.open(rep['image'])
        W, H = im.size
        sc = min(1.0, 760 / max(W, H))
        im.convert('RGB').resize((round(W * sc), round(H * sc)), Image.LANCZOS).save(out, 'WEBP', quality=82, method=6)
    from PIL import Image as I
    return out, I.open(out).size


def wire(page, s, reps):
    pre = os.path.relpath('.', os.path.dirname(page) or '.').replace(os.sep, '/')
    pre = '' if pre == '.' else pre + '/'
    n = 0
    for key, rep in reps.items():
        if not rep.get('image') or key not in s:
            continue
        old = re.escape(pre + key)
        alt = html.escape(rep.get('alt') or rep['title'], quote=True)
        w, h = rep.get('w'), rep.get('h')
        # 1. a figure picture: image-only link to the old file
        rx = re.compile(r'<a href="%s"([^>]*)>\s*<img src="%s"[^>]*>\s*</a>' % (old, old))
        def fig(m):
            nonlocal n; n += 1
            return ('<a href="%s%s"%s data-dswap="%s"><img src="%s%s" alt="%s" width="%s" height="%s" loading="lazy" decoding="async" style="%s"></a>'
                    '<a class="dswap-card" href="%s%s" target="_blank" rel="noopener" style="%s">&#128444;&#65039; Open readable diagram &amp; course labels</a>'
                    % (pre, rep['image'], m.group(1), rep['slug'], pre, rep['image'], alt, w, h, IMG_STYLE,
                       pre, rep['page'], LINK_STYLE))
        s = rx.sub(fig, s)
        # 2. a gallery thumbnail inside a card link that goes somewhere else
        rx2 = re.compile(r'<img src="%s"[^>]*>' % old)
        def thumb(m):
            nonlocal n; n += 1
            src, (tw, th) = preview(rep)
            return ('<img src="%s%s" alt="%s" width="%d" height="%d" loading="lazy" decoding="async" style="display:block;width:100%%;height:auto"> '
                    % (pre, src, alt, tw, th)).rstrip()
        s = rx2.sub(thumb, s)
        # 3. any other link to the old file ("Open full size") opens the new picture
        k = 'href="%s%s"' % (pre, key)
        if k in s:
            n += s.count(k)
            s = s.replace(k, 'href="%s%s"' % (pre, rep['image']))
    if n:
        # the swiping hint is wrong once the picture fits: drop it from swapped figures only
        def unhint(m):
            return HINT.sub('', m.group(0))
        s = re.sub(r'<figure\b(?:(?!</figure>).)*?data-dswap=.*?</figure>', unhint, s, flags=re.S)
    return s, n


def main():
    check = '--check' in sys.argv
    reps, mods = replacements()
    stale, total = [], 0
    for page in sorted(glob.glob('**/*.html', recursive=True)):
        if page.startswith(('.', 'tools/', 'assets/')) or page in mods:
            continue
        s = io.open(page, encoding='utf-8').read()
        t, n = wire(page, s, reps)
        total += n
        if t != s:
            stale.append(page)
            if not check:
                io.open(page, 'w', encoding='utf-8').write(t)
    print('%d old diagram(s) %s on %d page(s)' % (total, 'to swap' if check else 'swapped', len(stale)))
    if check and stale:
        print('\n'.join(stale))
        sys.exit(1)


if __name__ == '__main__':
    main()
