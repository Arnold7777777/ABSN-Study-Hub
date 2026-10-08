#!/usr/bin/env python3
"""Put a "Play this module" card for Codex's game arcades on the module pages.

Codex's two game packages (8 Oct) are standalone pages:
  games/module-arcade.html        Modules 4-7   (assets/module-arcade/)
  games/later-module-arcade.html  Modules 8-14  (assets/later-module-arcade/)
Each module page gets one small card linking to its room, plus the card's own
scoped stylesheet (module-card.css).  The full arcade.css never goes on a
course page.

The cards and their places come from Codex's insertion maps, merged into
tools/arcade-card-map.json:
  * NUR 234 / 235 pages: under the module title, after the first
    "Module navigation" bar (Codex put it after #navBtns, which put the game
    above the module's own title)
  * NUR 258 pages: first thing inside #pleModuleContent

Idempotent: strips every card and stylesheet link it wrote, then adds them again.
    python3 tools/wire-arcade-cards.py            # write
    python3 tools/wire-arcade-cards.py --check    # list stale pages, exit 1
    python3 tools/wire-arcade-cards.py --remove   # take every card off
"""
import io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
MAP = 'tools/arcade-card-map.json'

CARD = re.compile(r'\n?<section class="absn-(?:later-)?arcade-card" id="[^"]+".*?</section>\n?', re.S)
LINK = re.compile(r'<link rel="stylesheet" data-arcade-card href="[^"]*">\n')


def strip(s):
    return LINK.sub('', CARD.sub('', s))


def add(s, e):
    css = '<link rel="stylesheet" data-arcade-card href="%s">\n' % e['css']
    if css not in s:
        # before the reader layer's stylesheet and the back-bar block, so that
        # wire-module-reader and wire-back-links each still find their own order
        k = s.find('<link rel="stylesheet" data-sr-added')
        if k < 0:
            k = s.find('<style id="absnBackCss">')
        if k < 0:
            k = s.find('</head>')
        s = s[:k] + css + s[k:]
    if e['insertion'] == 'after-first-modbar':
        i = s.find('class="%s"' % e['anchor'])
        if i < 0:
            raise ValueError('%s: .%s not found' % (e['page'], e['anchor']))
        k = s.index('</nav>', i) + len('</nav>')
        return s[:k] + '\n' + e['html'] + '\n' + s[k:]
    m = re.search(r'<(\w+)\b[^>]*\bid="%s"[^>]*>' % re.escape(e['anchor']), s)
    if not m:
        raise ValueError('%s: #%s not found' % (e['page'], e['anchor']))
    if e['insertion'] == 'first-child':
        k = m.end()
    else:  # after: past the anchor element's closing tag (it holds no nested tag of its own kind)
        k = s.index('</%s>' % m.group(1), m.end()) + len(m.group(1)) + 3
    return s[:k] + '\n' + e['html'] + '\n' + s[k:]


def main():
    check, remove = '--check' in sys.argv, '--remove' in sys.argv
    data = json.load(io.open(MAP, encoding='utf-8'))
    pages = {}
    for e in data:
        pages.setdefault(e['page'], []).append(e)
    stale = []
    for page, entries in sorted(pages.items()):
        s = io.open(page, encoding='utf-8').read()
        t = strip(s)
        if not remove:
            for e in entries:
                t = add(t, e)
        if t != s:
            stale.append(page)
            if not check:
                io.open(page, 'w', encoding='utf-8').write(t)
    print('%d card(s) on %d page(s); %d %s' % (len(data), len(pages), len(stale),
          'stale' if check else ('cleared' if remove else 'written')))
    if check and stale:
        print('\n'.join(stale))
        sys.exit(1)


if __name__ == '__main__':
    main()
