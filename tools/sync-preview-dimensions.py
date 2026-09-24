#!/usr/bin/env python3
"""Make every preview <img>'s width/height match the file on disk.

Those two attributes are what reserves the box before the image arrives. If
they disagree with the real file the browser reserves the wrong shape and the
page jumps under her thumb as each thumbnail lands - which is the one thing
CLAUDE.md asks us never to let happen. They drift whenever a preview is
re-rendered at a different size, so this re-derives them rather than trusting
what is written.

    python3 tools/sync-preview-dimensions.py          # rewrite
    python3 tools/sync-preview-dimensions.py --check  # exit 1 if any drifted
"""
import glob, os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
check = '--check' in sys.argv

real = {}
for p in glob.glob('img/previews/*.webp'):
    with Image.open(p) as im:
        real[os.path.basename(p)[:-5]] = im.size

TAG = re.compile(r'<img[^>]*src="[^"]*img/previews/([A-Za-z0-9._-]+)\.webp"[^>]*>')
drift = 0
for page in sorted(glob.glob('*.html') + glob.glob('*/*.html')):
    s = open(page, encoding='utf-8').read()

    def fix(m):
        global drift
        tag, slug = m.group(0), m.group(1)
        if slug not in real:
            return tag
        rw, rh = real[slug]
        w = re.search(r'width="(\d+)"', tag)
        h = re.search(r'height="(\d+)"', tag)
        if w and h and (int(w.group(1)), int(h.group(1))) == (rw, rh):
            return tag
        drift += 1
        print('%-52s %-34s %s -> %dx%d' % (
            page, slug,
            ('%sx%s' % (w.group(1), h.group(1))) if w and h else 'none', rw, rh))
        if w and h:
            tag = re.sub(r'width="\d+"', 'width="%d"' % rw, tag, count=1)
            tag = re.sub(r'height="\d+"', 'height="%d"' % rh, tag, count=1)
        else:
            tag = tag[:-1].rstrip() + ' width="%d" height="%d">' % (rw, rh)
        return tag

    new = TAG.sub(fix, s)
    if new != s and not check:
        open(page, 'w', encoding='utf-8').write(new)

print('%d preview <img> %s' % (drift, 'drifted' if check else 'corrected'))
sys.exit(1 if (check and drift) else 0)
