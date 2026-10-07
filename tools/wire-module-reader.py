#!/usr/bin/env python3
"""Install Codex's "reader" presentation layer on the 21 Modules 1-7 pages.

Codex's 7 Oct package (Modules 1-7, NUR 234 / 235 / 258) changes layout only:
assets/modules-1-7/reader.js runs after the site's own helpers and adds a
study-choice panel, hanging-indent list runs, named "Show more" labels, phone
cards for simple tables, and swaps the old diagrams for new illustrations with
companion pages (assets/modules-1-7/visuals/).  The original HTML is left in
the page as the fallback - remove the additions and the page is exactly what
it was.

The additions per page are mechanical, so this tool writes them rather than
copying Codex's whole files over ours (which would undo anything added since):

  * <link rel="stylesheet" data-sr-added href="assets/modules-1-7/reader.css">
  * class "sr-module" on <body>
  * data-sr-inline="sr-inline-N" on the inline SVGs Codex mapped
  * <script id="sr-config" type="application/json">  (per-page replacement map)
  * <script defer data-sr-added src="assets/modules-1-7/reader.js">, after our helpers

The per-page data lives in tools/module-reader-data.json, taken from Codex's
prepared pages.  Image sizes are added to every replacement so reader.js can
reserve each picture's box before it loads (the page must not jump while she
reads).

    python3 tools/wire-module-reader.py            # write
    python3 tools/wire-module-reader.py --check    # list stale pages, exit 1
    python3 tools/wire-module-reader.py --remove   # roll the layer back off
"""
import io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
DATA = 'tools/module-reader-data.json'

CSS_TAG = '<link rel="stylesheet" data-sr-added href="assets/modules-1-7/reader.css">\n'
JS_TAG = '<script defer data-sr-added src="assets/modules-1-7/reader.js"></script>\n'

STRIP = [
    (re.compile(r'<link rel="stylesheet" data-sr-added href="[^"]*">\n?'), ''),
    (re.compile(r'<script id="sr-config" type="application/json">.*?</script>\n?', re.S), ''),
    (re.compile(r'<script defer data-sr-added src="[^"]*"></script>\n?'), ''),
    (re.compile(r' data-sr-inline="[^"]*"'), ''),
]


def strip(s):
    for rx, rep in STRIP:
        s = rx.sub(rep, s)
    s = re.sub(r'<body([^>]*?) class="([^"]*)"',
               lambda m: '<body%s class="%s"' % (m.group(1), ' '.join(c for c in m.group(2).split() if c != 'sr-module')), s, 1)
    s = s.replace('<body class="">', '<body>')
    return s


def add(s, entry):
    # stylesheet: before the back-bar block so wire-back-links keeps its CSS last
    k = s.find('<style id="absnBackCss">')
    if k < 0:
        k = s.find('</head>')
    s = s[:k] + CSS_TAG + s[k:]
    # body class
    m = re.search(r'<body\b[^>]*>', s)
    tag = m.group(0)
    if ' class="' in tag:
        new = re.sub(r' class="([^"]*)"', lambda c: ' class="%s sr-module"' % c.group(1), tag, 1)
    else:
        new = tag[:-1] + ' class="sr-module">'
    s = s[:m.start()] + new + s[m.end():]
    # inline markers, in source order
    pos = 0
    for opener, marker in entry['inline']:
        i = s.find(opener, pos)
        if i < 0:
            raise ValueError('%s: inline graphic not found: %s' % (entry['path'], opener[:80]))
        marked = opener.replace('<svg', '<svg data-sr-inline="%s"' % marker, 1)
        s = s[:i] + marked + s[i + len(opener):]
        pos = i + len(marked)
    # config + script after every other script, so reader.js runs after absn-fold.js;
    # before the bottom back bar, which wire-back-links.py keeps last
    k = s.find('<nav class="absn-back bottom"')
    if k < 0:
        k = s.rfind('</body>')
    block = ('<script id="sr-config" type="application/json">%s</script>\n' % json.dumps(entry['config'], ensure_ascii=False)
             + JS_TAG)
    return s[:k] + block + s[k:]


def main():
    check, remove = '--check' in sys.argv, '--remove' in sys.argv
    data = json.load(io.open(DATA, encoding='utf-8'))
    stale = []
    for entry in data:
        p = entry['path']
        s = io.open(p, encoding='utf-8').read()
        t = strip(s)
        if not remove:
            t = add(t, entry)
        if t != s:
            stale.append(p)
            if not check:
                io.open(p, 'w', encoding='utf-8').write(t)
    print('%d module page(s); %d %s' % (len(data), len(stale),
          'stale' if check else ('rolled back' if remove else 'written')))
    if check and stale:
        print('\n'.join(stale))
        sys.exit(1)


if __name__ == '__main__':
    main()
