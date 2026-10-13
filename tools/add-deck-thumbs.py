#!/usr/bin/env python3
"""Give every PowerPoint card on the infographic board a picture of its first slide.

Caroline asked (13 Oct 2026) for previews of the PowerPoints on infographics.html.
24 of the 96 deck cards had a first-slide WEBP of our own in img/previews/; the
other 72 showed only a glyph and "Open the deck", because their PPTX files are
far bigger than the Drive connector will hand over, so no preview could be made
here.

Those cards now show Drive's own thumbnail of the first slide - the same
stand-in the module pages' "Lecture slides" cards use (tools/wire-module-decks.py).
The decks are link-shared, so the thumbnail loads for anyone. The box is
reserved at 16:9 with object-fit so the page does not jump when it arrives, and
if Drive has no thumbnail to give, the image removes itself and the glyph that
was always there underneath comes back.

A card that gains a WEBP of its own later (wire-module-decks.py writes those) is
left alone: only plates that still hold the glyph and no <img> are touched.

    python3 tools/add-deck-thumbs.py          # add the thumbnails
    python3 tools/add-deck-thumbs.py --check  # exit 1 if a deck card still has no picture
"""
import html, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOARD = os.path.join(ROOT, 'infographics.html')
CHECK = '--check' in sys.argv

PLATE = re.compile(r'(<a class="plink deckplate)(" href="([^"]+)"[^>]*>)(<span class="dpi")')
DRIVE_ID = re.compile(r'/(?:file|presentation)/d/([A-Za-z0-9_-]{20,})')
CSS_MARK = '/* deck thumbnails (add-deck-thumbs.py) */'
CSS = (CSS_MARK + '\n'
       '.card.deck .deckplate.dthumb{min-height:0;padding:0;overflow:hidden;background:#000}\n'
       '.card.deck .deckplate.dthumb img{display:block;width:100%;height:auto;aspect-ratio:760/428;object-fit:cover}\n'
       '.card.deck .deckplate.dthumb .dpi,.card.deck .deckplate.dthumb .dpt{display:none}\n')


def thumb(fid, title):
    alt = 'First slide of ' + html.escape(html.unescape(re.sub(r'<[^>]+>', '', title)), quote=True)
    return ('<img src="https://drive.google.com/thumbnail?id=%s&amp;sz=w760" alt="%s" '
            'loading="lazy" decoding="async" width="760" height="428" referrerpolicy="no-referrer" '
            'onerror="this.parentNode.classList.remove(\'dthumb\');this.remove()">' % (fid, alt))


def main():
    s = open(BOARD, encoding='utf-8').read()
    out, last, added, missing = [], 0, 0, []
    for m in re.finditer(r'<div class="card[^"]*" data-kind="powerpoint"', s):
        start = m.start()
        nxt = s.find('<div class="card ', start + 10)
        seg = s[start:nxt if nxt > 0 else len(s)]
        if '<img' in seg:
            continue
        title = re.search(r'<h3>(.*?)</h3>', seg, re.S).group(1)
        p = PLATE.search(seg)
        fid = DRIVE_ID.search(p.group(3)) if p else None
        if not fid:
            dl = re.search(r'download\?id=([A-Za-z0-9_-]{20,})', seg)
            fid = dl
        if not (p and fid):
            missing.append(re.sub(r'<[^>]+>', '', title))
            continue
        added += 1
        new = seg[:p.start()] + p.group(1) + ' dthumb' + p.group(2) + thumb(fid.group(1), title) + p.group(4) + seg[p.end():]
        out.append(s[last:start]); out.append(new); last = start + len(seg)
    out.append(s[last:])
    if CHECK:
        print('%d deck card(s) without a picture' % (added + len(missing)))
        for t in missing:
            print('  no Drive id:', t)
        sys.exit(1 if added or missing else 0)
    s = ''.join(out)
    if CSS_MARK not in s:
        s = s.replace('</style>', CSS + '</style>', 1)
    open(BOARD, 'w', encoding='utf-8').write(s)
    print('%d deck card(s) given a Drive thumbnail' % added)
    for t in missing:
        print('  no Drive id, left as is:', t)


if __name__ == '__main__':
    main()
