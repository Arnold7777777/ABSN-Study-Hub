#!/usr/bin/env python3
"""Learn Nursing 101 podcast episodes, one page per class (Caroline, 31 Oct 2026).

    python3 tools/build-spotify-library.py                  write the six spotify-*.html pages
    python3 tools/build-spotify-library.py --check          exit 1 if a page is out of date
    python3 tools/build-spotify-library.py --xlsx IN OUT    also add a "<class> Spotify" tab per class
                                                            to a copy of her workbook

She asked for the show's episodes "on their own page per class and organized by class,
exam, module", and "I don't want them on the same page as ones that I have the full copy
of". So these are links out to Spotify on pages of their own: never cards on lectures.html
or lecture-library.html, and build-lecture-library.py skips the Spotify tabs.

The data is tools/spotify-episodes.json: 260 episodes read from the show's public RSS feed
and its Spotify for Creators profile (which carries each episode's open.spotify.com link),
each given a class and module by topic. Edit the JSON to move an episode, then re-run this,
wire-back-links.py and build-search-index.py.
"""
import copy, html, json, os, sys

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(R, 'tools', 'spotify-episodes.json')
ORDER = ['NUR 125', 'NUR 198', 'NUR 234', 'NUR 235', 'NUR 258', 'Pharmacology']
TAB = {'NUR 125': 'NUR125 Spotify', 'NUR 198': 'NUR198 Spotify', 'NUR 234': 'NUR234 Spotify',
       'NUR 235': 'NUR235 Spotify', 'NUR 258': 'NUR258 Spotify', 'Pharmacology': 'Pharm Spotify'}
MON = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split()
e = lambda s: html.escape(str(s), quote=True)

CSS = '''
:root{--accent:#ffd76a;--soft:#e9dcff;--muted:#c9bdea;--line:rgba(255,255,255,.28)}
*{box-sizing:border-box}
html{overflow-x:hidden}
html,body{margin:0;padding:0}
body{background-color:#140b24;color:#fff;min-height:100vh;padding:24px 16px 60px;
 font-family:"Segoe UI",Roboto,system-ui,-apple-system,sans-serif;font-size:16px;line-height:1.5;
 background-image:radial-gradient(1100px 600px at 10% -5%,rgba(157,92,255,.34),transparent 62%),
  radial-gradient(950px 540px at 100% 10%,rgba(30,215,96,.16),transparent 60%),
  radial-gradient(900px 700px at 50% 108%,rgba(255,138,61,.18),transparent 62%);
 background-attachment:fixed}
.wrap{max-width:900px;margin:0 auto}
a{color:#ffe9a8}
h1{font-size:clamp(1.6rem,5.4vw,2.4rem);margin:0 0 8px;line-height:1.15;font-weight:900;overflow-wrap:break-word}
.lede{font-size:1.06rem;line-height:1.6;color:var(--soft);margin:0 0 12px;max-width:66ch}
.note{font-size:.95rem;color:var(--muted);margin:0 0 16px;max-width:66ch}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px;padding:0;list-style:none}
.chips a{display:inline-flex;align-items:center;min-height:44px;padding:8px 14px;border-radius:999px;
 border:1px solid var(--line);background:rgba(255,255,255,.08);color:#fff;text-decoration:none;font-weight:700}
.chips a[aria-current="page"]{background:#1db954;border-color:#1db954;color:#06210f}
.chips a:focus-visible,.ep:focus-visible,.fb:focus-visible,summary:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.lbl{font-weight:800;color:var(--accent);margin:4px 0 6px;font-size:.95rem}
.bar{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 18px}
.fb{min-height:44px;padding:8px 14px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.10);
 color:#fff;font-weight:700;font-size:1rem;font-family:inherit;cursor:pointer}
section.exam{margin:0 0 26px;scroll-margin-top:12px}
section.exam>h2{font-size:1.45rem;margin:0 0 10px;padding:8px 14px;border-radius:12px;background:rgba(157,92,255,.30);
 border:1px solid rgba(157,92,255,.6);overflow-wrap:break-word}
section.exam>h2 .cnt{font-size:.95rem;font-weight:700;color:var(--soft)}
details.mod{margin:0 0 10px;border:1px solid var(--line);border-radius:14px;background:rgba(20,11,36,.72);overflow:hidden}
details.mod>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:10px;min-height:52px;padding:10px 14px;font-weight:800}
details.mod>summary::-webkit-details-marker{display:none}
details.mod>summary .mn{flex:none;padding:2px 9px;border-radius:8px;background:rgba(0,194,199,.30);border:1px solid rgba(0,194,199,.7)}
details.mod>summary .mt{flex:1 1 auto;min-width:0;overflow-wrap:break-word}
details.mod>summary .cnt{flex:none;font-weight:700;color:var(--soft);font-size:.95rem}
details.mod>summary::after{content:"\\25B8";flex:none;font-size:1.1rem;transition:transform .15s}
details.mod[open]>summary::after{transform:rotate(90deg)}
details.mod ol{list-style:none;margin:0;padding:0 10px 10px}
.ep{display:flex;align-items:center;gap:12px;min-height:56px;padding:10px 12px;margin:6px 0 0;border-radius:12px;
 background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);color:#fff;text-decoration:none}
.ep:hover{background:rgba(29,185,84,.18)}
.ep .pl{flex:none;width:36px;height:36px;border-radius:50%;background:#1db954;color:#06210f;display:grid;place-items:center;font-size:1rem}
.ep .tx{flex:1 1 auto;min-width:0}
.ep .tt{display:block;font-weight:700;overflow-wrap:break-word}
.ep .mt2{display:block;font-size:.9rem;color:var(--muted)}
.foot{font-size:.9rem;color:var(--muted);margin-top:24px}
@media print{details.mod{break-inside:avoid}.bar,.chips{display:none}}
'''

JS = '''(function(){var d=[].slice.call(document.querySelectorAll('details.mod'));
document.getElementById('oa').addEventListener('click',function(){d.forEach(function(x){x.open=true})});
document.getElementById('ca').addEventListener('click',function(){d.forEach(function(x){x.open=false})});
function h(){var t=location.hash&&document.getElementById(decodeURIComponent(location.hash.slice(1)));
 if(t){[].forEach.call(t.querySelectorAll('details.mod'),function(x){x.open=true});if(t.tagName==='DETAILS')t.open=true;}}
window.addEventListener('hashchange',h);h();
window.addEventListener('beforeprint',function(){d.forEach(function(x){x.open=true})});})();'''


def load():
    return json.load(open(DATA, encoding='utf-8'))


def when(iso):
    y, m, _ = iso.split('-')
    return '%s %s' % (MON[int(m) - 1], y)


def grouped(doc, cls):
    """[(exam, [(module_no or None, [episodes])])] in course order; None = course reviews/other."""
    meta = doc['classes'][cls]
    eps = sorted([x for x in doc['episodes'] if x['class'] == cls], key=lambda x: (x['published'], x['title']))
    out = []
    for exam, mods in meta['exams'].items():
        rows = [(m, [x for x in eps if x['module'] == m]) for m in mods]
        rows = [r for r in rows if r[1]]
        if rows:
            out.append((exam, rows))
    rest = [x for x in eps if x['module'] is None]
    if rest:
        out.append(('Course reviews & other topics', [(None, rest)]))
    return out


def page(doc, cls):
    meta = doc['classes'][cls]
    groups = grouped(doc, cls)
    n = sum(len(v) for _, rows in groups for _, v in rows)
    nav = ''.join('<li><a href="spotify-%s.html"%s>%s</a></li>' % (
        doc['classes'][c]['slug'], ' aria-current="page"' if c == cls else '', e(c)) for c in ORDER)
    jump = ''.join('<li><a href="#%s">%s</a></li>' % (sid(ex), e(ex if ex.startswith(('Exam', 'Final')) else 'Reviews & other')) for ex, _ in groups)
    body = []
    for exam, rows in groups:
        k = sum(len(v) for _, v in rows)
        body.append('<section class="exam" id="%s"><h2>%s <span class="cnt">&middot; %d episode%s</span></h2>' % (
            sid(exam), e(exam), k, '' if k == 1 else 's'))
        for m, items in rows:
            mn = 'M%d' % m if m else '&#127891;'
            mt = meta['modules'][str(m)] if m else 'Not tied to one module'
            body.append('<details class="mod" id="%s-m%s"><summary><span class="mn">%s</span><span class="mt">%s</span>'
                        '<span class="cnt">%d</span></summary><ol>' % (meta['slug'], m or 'other', mn, e(mt), len(items)))
            for x in items:
                body.append('<li><a class="ep" href="%s" target="_blank" rel="noopener">'
                            '<span class="pl" aria-hidden="true">&#9654;</span><span class="tx"><span class="tt">%s</span>'
                            '<span class="mt2">%d min &middot; %s &middot; opens Spotify</span></span></a></li>' % (
                                e(x['spotify']), e(x['title']), x['minutes'], when(x['published'])))
            body.append('</ol></details>')
        body.append('</section>')
    return ('<!DOCTYPE html>\n<html lang="en"><head>\n<meta charset="UTF-8"><link rel="icon" href="favicon.ico" sizes="any">'
            '<link rel="icon" type="image/png" href="favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="favicon-180.png">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
            '<title>%s Podcast Episodes &middot; Learn Nursing 101 &middot; ABSN Study Hub</title>\n'
            '<meta name="description" content="Learn Nursing 101 podcast episodes for %s %s, sorted by exam and module, each a link to Spotify.">\n'
            '<style>%s</style>\n</head>\n<body>\n<div class="wrap">\n'
            '<h1>&#127911; %s podcast episodes</h1>\n'
            '<p class="lede"><b>%d episodes</b> of <a href="%s" target="_blank" rel="noopener">Learn Nursing 101</a> (LN101) '
            'that match <b>%s &middot; %s</b>, sorted by exam and module. Each one is a link that opens Spotify.</p>\n'
            '<p class="note">These are someone else&rsquo;s review podcast, not your class recordings. '
            'Your own recordings are on the <a href="lecture-library.html">Lecture library</a> and <a href="lectures.html">Lectures</a> pages.</p>\n'
            '<p class="lbl">Other classes</p><ul class="chips">%s</ul>\n'
            '<p class="lbl">Jump to</p><ul class="chips">%s</ul>\n'
            '<div class="bar"><button type="button" class="fb" id="oa">&#9660; Open all modules</button>'
            '<button type="button" class="fb" id="ca">&#9650; Close all</button></div>\n'
            '%s\n<p class="foot">Episode list from the show&rsquo;s public feed, %s. Built by tools/build-spotify-library.py.</p>\n'
            '</div>\n<script>%s</script>\n<script defer src="absn-top.js"></script>\n</body></html>\n') % (
        e(cls), e(cls), e(meta['name']), CSS, e(cls), n, e(doc['show']['spotify']), e(cls), e(meta['name']),
        nav, jump, '\n'.join(body), '31 Oct 2026', JS)


def sid(exam):
    return 'reviews' if not exam.startswith(('Exam', 'Final')) else exam.lower().replace(' ', '-')


def keep_wrapping(path, new):
    """Keep what other tools add around the page (back-link bars, their CSS) on later runs."""
    if not os.path.exists(path):
        return new
    old = open(path, encoding='utf-8').read()
    import re
    css = re.search(r'<style id="absnBackCss">.*?</style>\n?', old, re.S)
    top = re.search(r'\n?<nav class="absn-back top".*?</nav>', old, re.S)
    bot = re.search(r'\n?<nav class="absn-back bottom".*?</nav>', old, re.S)
    if css:
        new = new.replace('</head>', css.group(0) + '</head>', 1)
    if top:
        new = new.replace('<body>\n', '<body>' + top.group(0) + '\n', 1)
    if bot:
        k = new.rfind('</body>')
        new = new[:k].rstrip('\n') + bot.group(0) + '\n' + new[k:]
    return new


def write_pages(doc, check):
    stale = []
    for cls in ORDER:
        p = os.path.join(R, 'spotify-%s.html' % doc['classes'][cls]['slug'])
        new = keep_wrapping(p, page(doc, cls))
        if not os.path.exists(p) or open(p, encoding='utf-8').read() != new:
            stale.append(os.path.relpath(p, R))
            if not check:
                open(p, 'w', encoding='utf-8').write(new)
    return stale


def add_tabs(doc, src, dst):
    import openpyxl
    from openpyxl.worksheet.hyperlink import Hyperlink
    wb = openpyxl.load_workbook(src)
    model = wb['NUR234 Exam Reviews']
    for cls in ORDER:
        name = TAB[cls]
        if name in wb.sheetnames:
            del wb[name]
        ws = wb.create_sheet(name)
        ws['A1'] = '%s  ·  Learn Nursing 101 podcast (Spotify links)' % cls.replace(' ', '')
        ws['A1']._style = copy.copy(model['A1']._style)
        ws.merge_cells('A1:E1')
        c = ws['A2']; c.value = '🏠 START HERE'; c._style = copy.copy(model['D2']._style)
        c.hyperlink = Hyperlink(ref='A2', location="'START HERE'!A1"); c.hyperlink.display = c.value
        ws['C2'] = 'Not your own recordings - someone else\'s review podcast, kept apart from your lecture tabs.'
        for col, h in enumerate(['Exam', 'Module', 'Episode', 'Minutes', 'Published'], 1):
            ws.cell(4, col).value = h; ws.cell(4, col)._style = copy.copy(model.cell(5, min(col, 4))._style)
        r = 5
        meta = doc['classes'][cls]
        for exam, rows in grouped(doc, cls):
            for m, items in rows:
                for x in items:
                    vals = [exam, ('M%d - %s' % (m, meta['modules'][str(m)])) if m else 'Not tied to one module',
                            '=HYPERLINK("%s","%s")' % (x['spotify'], x['title'].replace('"', "'")), x['minutes'], when(x['published'])]
                    for col, v in enumerate(vals, 1):
                        ws.cell(r, col).value = v
                        ws.cell(r, col)._style = copy.copy(model.cell(6, {1: 1, 2: 2, 3: 3, 4: 4, 5: 4}[col])._style)
                    r += 1
        for col, w in zip('ABCDE', (12, 34, 70, 10, 12)):
            ws.column_dimensions[col].width = w
        ws.freeze_panes = 'A5'
    wb.save(dst)


def main():
    doc = load()
    check = '--check' in sys.argv
    stale = write_pages(doc, check)
    if '--xlsx' in sys.argv:
        i = sys.argv.index('--xlsx')
        add_tabs(doc, sys.argv[i + 1], sys.argv[i + 2])
        print('wrote %s with %d Spotify tabs' % (sys.argv[i + 2], len(ORDER)))
    if check:
        print('%d page(s) stale' % len(stale)); sys.exit(1 if stale else 0)
    print('%d episodes; %s' % (len(doc['episodes']), ('wrote ' + ', '.join(stale)) if stale else 'pages current'))


if __name__ == '__main__':
    main()
