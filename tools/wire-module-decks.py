#!/usr/bin/env python3
"""Put each course's lecture deck inside the module it belongs to.

For a long time none of the 42 module sections across NUR 234, 235 and 258
linked its PowerPoint - every deck lived only on the infographic board, so the
deck for the module she was reading was three pages away.

tools/module-decks.json is the list. Add an entry, run this, and the deck gets
a "Lecture slides" slot on its module page and a way in from the course hub.
Re-running is safe: an existing slot is replaced, not duplicated, so correcting
a title or adding a preview is just an edit plus a re-run.

The two course hubs are not the same shape, so neither is the way in:

  * nur234.html is an index of module cards, so the hub gets a link beside the
    module's "lecture recordings" link.
  * nur258.html carries the module content itself, so the hub gets the same
    slot the standalone page does.

    python3 tools/wire-module-decks.py          # wire everything in the list
    python3 tools/wire-module-decks.py --check  # exit 1 if anything is missing
"""
import glob, json, os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
CHECK = '--check' in sys.argv

SLOT = re.compile(r'<div class="slot filled" id="deck" data-slot="deck">.*?</div></div>', re.S)


def card(d):
    """The deck's card: a preview when we have one, a glyph when we do not."""
    if d.get('preview') and os.path.exists(d['preview']):
        with Image.open(d['preview']) as im:
            w, h = im.size
        prev = ('<span class="igprev"><img src="%s" alt="First slide of %s" '
                'loading="lazy" decoding="async" width="%d" height="%d"></span>'
                % (d['preview'], re.sub(r'<[^>]+>', '', d['title']), w, h))
        cls = 'igcard hasprev'
    else:
        prev, cls = '', 'igcard'
    where = 'opens in Drive' if d.get('external') else 'open the deck'
    sub = ('%d slides &mdash; %s &rarr;' % (d['slides'], where)) if d.get('slides') \
        else ('%s &rarr;' % where[0].upper() + where[1:])
    tgt = ' target="_blank" rel="noopener"' if d.get('external') else ''
    return ('<a class="%s" href="%s"%s>%s'
            '<span class="igico" aria-hidden="true">&#128202;</span>'
            '<span class="ignm">%s<span class="igsub">%s</span></span></a>'
            % (cls, d['href'], tgt, prev, d['title'], sub))


def slot(d):
    return ('<div class="slot filled" id="deck" data-slot="deck">'
            '<h4>&#128202; Lecture slides <span class="cnt">1</span></h4>'
            '<p>The deck this module is built on.</p>'
            '<div class="shgrid iggrid">%s</div></div>' % card(d))


def insert_slot(text, d, label):
    """Replace an existing deck slot, or put one before the module's own media."""
    new = slot(d)
    if SLOT.search(text):
        return SLOT.sub(lambda m: new, text, count=1), 'refreshed'
    for anchor in ('<div class="slot filled" data-slot="lectures">',
                   '<div class="slot filled" data-slot="info">',
                   '<div class="slot filled" data-slot="mindmap">'):
        i = text.find(anchor)
        if i >= 0:
            return text[:i] + new + text[i:], 'added'
    sys.exit('%s: no slot to sit beside' % label)


def module_span(s, mod):
    """The hub's block for one module, bounded by the NEXT module's opener -
    never by counting <div> depth, which these pages defeat."""
    i = s.find('data-m="%s"' % mod)
    if i < 0:
        return None, None
    n = int(mod[1:])
    j = s.find('data-m="m%d"' % (n + 1), i)
    return i, (j if j > 0 else len(s))


def main():
    decks = json.load(open('tools/module-decks.json'))
    pending = 0
    for d in decks:
        page, hub = d['page'], d['course'] + '.html'
        if not os.path.exists(page):
            sys.exit('%s: no such module page' % page)

        s = open(page, encoding='utf-8').read()
        new, how = insert_slot(s, d, page)
        if new != s:
            pending += 1
            print('%-52s slot %s' % (page, how))
            if not CHECK:
                open(page, 'w', encoding='utf-8').write(new)

        h = open(hub, encoding='utf-8').read()
        lo, hi = module_span(h, d['module'])
        if lo is None:
            sys.exit('%s: no %s block' % (hub, d['module']))
        block = h[lo:hi]
        if '<a class="modcard"' in h[max(0, lo - 200):lo + 40]:
            # index-of-cards hub: a link beside the lecture-recordings link
            link = ('<a class="modlec" href="%s#deck">&#128202; %s</a>'
                    % (page, d['short']))
            if link in block:
                continue
            m = re.search(r'<a class="modlec"[^>]*>.*?</a>', block, re.S)
            if not m:
                sys.exit('%s: no %s lecture link to sit beside' % (hub, d['module']))
            block = block[:m.end()] + link + block[m.end():]
        else:
            # content hub: the same slot the standalone page gets
            block, how = insert_slot(block, d, '%s %s' % (hub, d['module']))
        if block != h[lo:hi]:
            pending += 1
            print('%-52s %s wired' % (hub, d['module']))
            if not CHECK:
                open(hub, 'w', encoding='utf-8').write(h[:lo] + block + h[hi:])

    print('%d deck%s %s' % (pending, '' if pending == 1 else 's',
                            'unwired' if CHECK else 'wired'))
    return 1 if (CHECK and pending) else 0


if __name__ == '__main__':
    sys.exit(main())
