#!/usr/bin/env python3
"""Put a closed "Preview here" under every Simple Nursing handout link.

Caroline (7 Oct 2026): "can you make inline previews of the simple nursing
graphics site-wide?"  Two kinds of link carry the Simple Nursing PDFs:

  * the "Simple Nursing original - opens in Drive" button under the header of
    each NG study page   (<p class="snsrc"><a class="snsrcl" ...>)
  * the "Simple Nursing handouts for this module" grid on the module pages
    (<a class="igcard pdfh" ...>)

Each gets a closed <details class="vprev"> beside it.  absn-vprev.js builds
Drive's /preview viewer only when she opens one, so a page with twenty
handouts loads nothing extra.  The viewer box is portrait and has its height
from CSS before anything arrives, so the page does not jump under her.

The Visual references cards already have the same panel (wire-module-visuals.py);
this reuses its markup, script and styles.  absn-vprev.css is generated here
from the Visual-references block of absn-adhd-enhanced.css, because the NG
pages do not load that stylesheet.

Idempotent: strips what it wrote before writing again.
    python3 tools/wire-sn-previews.py            # write
    python3 tools/wire-sn-previews.py --check    # list stale pages, exit 1
"""
import glob, io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

DRIVE = 'https://drive.google.com/file/d/%s/'
EYE = '<span aria-hidden="true">&#128065;&#65039;</span>'

SNSRC = re.compile(r'(<p class="snsrc"><a class="snsrcl" href="https://drive\.google\.com/file/d/'
                   r'([\w-]+)/view"[^>]*>.*?</a></p>)(<figure class="sn-inline".*?</figure>)?', re.S)
PDFH = re.compile(r'<a class="igcard pdfh(?: hasprev)?" href="https://drive\.google\.com/file/d/([\w-]+)/view"[^>]*>.*?</a>', re.S)

OLD_SNSRC = re.compile(r'<div class="vact snprev"><details class="vprev">.*?</details></div>', re.S)
OLD_PDFH = re.compile(r'<div( id="[^"]*")? class="vcell snh">(<a class="igcard pdfh(?: hasprev)?".*?</a>)<div class="vact snprev"><details class="vprev">.*?</details></div></div>', re.S)
PDFH_ID = re.compile(r'((?:\x00[^\x00]*\x00)?)(' + PDFH.pattern + ')', re.S)
# Codex (30 Oct) points some sheets at their card further down the page instead: leave those as they are
VNEW = '<div class="vact snprev"><a class="vnew" href="#'



def panel(fid, label):
    return ('<div class="vact snprev"><details class="vprev"><summary>%s</summary>'
            '<div class="vprevb" data-type="drive" data-src="%spreview" data-open="%sview"></div>'
            '</details></div>' % (label, DRIVE % fid, DRIVE % fid))


def css():
    """The Visual-references rules from absn-adhd-enhanced.css, plus the portrait viewer."""
    s = io.open('absn-adhd-enhanced.css', encoding='utf-8').read()
    i = s.index('/* Visual references: a closed inline preview')
    j = s.index('.vprevb .vprevnote a{', i)
    j = s.index('}', j) + 1
    return ('/* absn-vprev.css - written by tools/wire-sn-previews.py; do not edit.\n'
            '   The inline-preview rules from absn-adhd-enhanced.css, for pages that do not load it. */\n'
            + s[i:j] + '\n\n'
            '/* Simple Nursing handouts are portrait pages: give the viewer a page-shaped box */\n'
            '.snprev{margin-top:8px}\n'
            '.snprev .vprevb iframe,#site-extras .snprev .vprevb iframe{aspect-ratio:3/4;max-height:85vh}\n'
            '/* an opened handout takes the whole row of the grid, not one narrow cell */\n'
            '.vcell.snh:has(details[open]){grid-column:1/-1}\n'
            '.vcell.snh{gap:6px}\n'
            '.vcell.snh>.igcard{height:auto}\n')


def rel(page, asset):
    return os.path.relpath(asset, os.path.dirname(page) or '.').replace(os.sep, '/')


def ensure_assets(page, t):
    if 'absn-vprev.css' not in t:
        tag = '<link rel="stylesheet" href="%s">\n' % rel(page, 'absn-vprev.css')
        k = t.find('<link rel="stylesheet" data-arcade-card')    # wire-arcade-cards puts its own just above the back bar
        if k < 0:
            k = t.find('<style id="absnBackCss">')
        if k < 0:
            k = t.find('</head>')
        t = t[:k] + tag + t[k:]
    if 'absn-vprev.js' not in t:
        tag = '<script defer src="%s"></script>\n' % rel(page, 'absn-vprev.js')
        k = t.rfind('</body>')
        t = t[:k] + tag + t[k:]
    return t


def wire(page, s):
    t = OLD_PDFH.sub(lambda m: ('\x00%s\x00' % m.group(1) if m.group(1) else '') + m.group(2), s)   # first: it contains the snsrc panel's shape; a cell id (Codex, 30 Oct) rides along
    t = OLD_SNSRC.sub('', t)
    n = 0
    def a(m):
        nonlocal n; n += 1
        if t.startswith(VNEW, m.end()):
            return m.group(0)
        if m.group(3):       # Codex's first-page picture (30 Oct) shows the sheet; the panel under it reads the whole PDF
            return m.group(1) + m.group(3) + panel(m.group(2), 'Read the full PDF here')
        return m.group(1) + panel(m.group(2), EYE + ' Preview the Simple Nursing sheet here')
    t = SNSRC.sub(a, t)
    def b(m):
        nonlocal n; n += 1
        return '<div%s class="vcell snh">' % m.group(1).strip('\x00') + m.group(2) + panel(m.group(3), EYE + ' Preview here') + '</div>'
    t = PDFH_ID.sub(b, t)
    if n:
        t = ensure_assets(page, t)
    return t, n


def main():
    check = '--check' in sys.argv
    stale, total, pages = [], 0, 0
    want_css = css()
    have_css = io.open('absn-vprev.css', encoding='utf-8').read() if os.path.exists('absn-vprev.css') else ''
    if want_css != have_css:
        stale.append('absn-vprev.css')
        if not check:
            io.open('absn-vprev.css', 'w', encoding='utf-8').write(want_css)
    for page in sorted(glob.glob('**/*.html', recursive=True)):
        if page.startswith(('.', 'tools/', 'node_modules/')):
            continue
        s = io.open(page, encoding='utf-8').read()
        if 'snsrcl' not in s and 'igcard pdfh' not in s:
            continue
        t, n = wire(page, s)
        total += n; pages += n > 0
        if t != s:
            stale.append(page)
            if not check:
                io.open(page, 'w', encoding='utf-8').write(t)
    print('%d Simple Nursing links on %d pages; %d file(s) %s'
          % (total, pages, len(stale), 'stale' if check else 'written'))
    if check and stale:
        print('\n'.join(stale[:40]))
        sys.exit(1)


if __name__ == '__main__':
    main()
