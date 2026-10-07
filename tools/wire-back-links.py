#!/usr/bin/env python3
"""Give every page a way back: the Study Hub, and the study guide it belongs to.

Caroline, 7 Oct 2026: "make sure ... you can get back to the study hub and
the main study guide page for whatever subpage you are on". Before this, 493
of the 554 real pages had no link to their module or course page, and the
module pages open most NG pages in a new tab, so the Back button did nothing.

Each page gets a small bar of two kinds of link, written at the top and again
at the bottom:

    <nav class="absn-back" ...>  [Study Hub]  [the parent study guide(s)]

The parent is worked out from who links to the page, most specific first:

  1. a module page (nur234-mN, nur235-mN, nur258-module-NN, patho-mN, mN);
     up to two, when a page is shared between courses
  2. a course page (nur234.html, nur258.html, pathophysiology.html, ...)
  3. the page's own folder index (cardio/index.html "Cardiovascular ...")
  4. otherwise the Study Hub alone

Module pages point at their course page; course pages and folder indexes get
the Study Hub alone. The bars this tool writes are ignored when it builds the
link graph, so re-running it is stable. absn-hidebar.js reads the first
parent link for its drawer's "Course hub" button.

    python3 tools/wire-back-links.py          # write every page
    python3 tools/wire-back-links.py --check  # exit 1 if any page is stale
    python3 tools/wire-back-links.py --list   # show each page's parents, write nothing

Run it after adding, renaming or re-linking pages, alongside the other wire
tools.
"""
import glob, html, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
CHECK = '--check' in sys.argv
LIST = '--list' in sys.argv

SKIP_DIRS = ('tools/', '.infographic-backups/', 'node_modules/', 'slides/', 'files/')
MODULE = [  # (page pattern, its course page)
    (re.compile(r'^nur234-m\d+\.html$'), 'nur234.html'),
    (re.compile(r'^nur235-m\d+\.html$'), 'nur235.html'),
    (re.compile(r'^nur258-module-\d+.*\.html$'), 'nur258.html'),
    (re.compile(r'^patho-m\d+\.html$'), 'pathophysiology.html'),
    (re.compile(r'^m\d+\.html$'), 'pharmacology.html'),
]
COURSES = ['nur234.html', 'nur235.html', 'nur258.html', 'pathophysiology.html',
           'pharmacology.html', 'pharmacology-new.html', 'mat300.html']
# a root page named after its course belongs to that course: nur258-quiz.html
PREFIX = [('nur234-', 'nur234.html'), ('nur235-', 'nur235.html'), ('nur258-', 'nur258.html'),
          ('patho-', 'pathophysiology.html'), ('mat300-', 'mat300.html'), ('game-', 'games.html')]
# pages for the whole site, not subpages of any one course
SITEWIDE = {'super-mega-quiz.html', 'infographics.html', 'lectures.html', 'lecture-library.html',
            'podcasts.html', 'playlists.html', 'games.html', 'study-plan.html', 'nclex-prep.html'}
# her other course sites, siblings of this one on GitHub Pages
SIBLING = {'NUR 125': ('NUR-125-Fundamentals/index.html', 'NUR 125 · Fundamentals study guide'),
           'NUR 175': ('NUR-175-Study-Guide/index.html', 'NUR 175 study guide'),
           'NUR 198': ('NUR-198-Study-Guide/index.html', 'NUR 198 study guide')}
CODE = {'nur234.html': 'NUR 234', 'nur235.html': 'NUR 235', 'nur258.html': 'NUR 258',
        'pathophysiology.html': 'BIO 280', 'pharmacology.html': 'BIO 290V'}

TOP = re.compile(r'\n?<nav class="absn-back top".*?</nav>', re.S)
BOT = re.compile(r'\n?<nav class="absn-back bottom".*?</nav>', re.S)
CSSRE = re.compile(r'<style id="absnBackCss">.*?</style>\n?', re.S)
CSS = ('<style id="absnBackCss">\n'
       'nav.absn-back{display:flex;flex-wrap:wrap;gap:8px;margin:10px auto;padding:0 12px;max-width:1180px;'
       'box-sizing:border-box;position:relative;top:auto;z-index:5;background:none;border:0;border-radius:0;'
       'box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}\n'
       'body:has(#absnNav) nav.absn-back.top{padding-right:112px}\n'
       '@media (min-width:621px){body:has(#absnNav) nav.absn-back.top{padding-right:330px}}\n'
       'nav.absn-back a{display:inline-flex;align-items:center;gap:7px;min-height:44px;padding:8px 14px;'
       'box-sizing:border-box;max-width:100%;border-radius:12px;background:rgba(18,12,44,.88);'
       'border:1px solid rgba(255,255,255,.3);color:#fff;text-decoration:none;'
       'font-family:"Segoe UI",Roboto,system-ui,-apple-system,sans-serif;font-weight:800;font-size:16px;'
       'line-height:1.25;overflow-wrap:anywhere;box-shadow:0 3px 10px rgba(0,0,0,.3)}\n'
       'nav.absn-back a.par{background:rgba(11,92,80,.92)}\n'
       'nav.absn-back a:hover{filter:brightness(1.2)}\n'
       'nav.absn-back a:focus-visible{outline:3px solid #ffd76a;outline-offset:2px}\n'
       '@media print{nav.absn-back{display:none}}\n'
       '</style>\n')

HREF = re.compile(r'''(?:href=["']|hop\(\s*['"])([^"'#?]+)''')
STUB = re.compile(r'<meta[^>]+http-equiv=["\']?refresh', re.I)


def pages():
    out = []
    for f in sorted(glob.glob('**/*.html', recursive=True)):
        if f.startswith(SKIP_DIRS) or '/.' in f:
            continue
        out.append(f)
    return out


def course_of(f):
    for pat, course in MODULE:
        if '/' not in f and pat.match(f):
            return course
    return None


def title(f):
    try:
        s = open(f, encoding='utf-8').read(20000)
    except OSError:
        return os.path.basename(f)
    m = re.search(r'<title>(.*?)</title>', s, re.S)
    return html.unescape(re.sub(r'\s+', ' ', m.group(1))).strip() if m else os.path.basename(f)


def label(f):
    """A short name for the parent: 'NUR 258 · M13 Shock & MODS'."""
    for path, name in SIBLING.values():
        if f == '../' + path:
            return name
    t = title(f)
    parts = [p.strip() for p in re.split(r'\s*[·|]\s*', t) if p.strip()]
    parts = [p for p in parts if not re.fullmatch(r'ABSN Study Hub', p, re.I)]
    code = next((p for p in parts if re.fullmatch(r'(NUR|BIO) \d+V?', p)), None)
    rest = [p for p in parts if p != code]
    if course_of(f):
        mod = None
        for i, p in enumerate(rest):
            m = re.match(r'^(?:Modules? )?M?(\d+(?: ?& ?\d+)?)\b\s*(.*)$', p)
            if m and (p.startswith('M') or p.lower().startswith('module')):
                mod = 'M' + m.group(1).replace(' ', '')
                rest = rest[:i] + ([m.group(2)] if m.group(2) else []) + rest[i + 1:]
                break
        if not code:
            code = CODE.get(course_of(f))
        if not mod:
            n = re.findall(r'\d+', f.replace('nur234', '').replace('nur235', '').replace('nur258', ''))
            mod = 'M%d' % int(n[0]) if n else None
            rest = [x for x in rest if not re.search(r'course hub|NUR \d', x, re.I)]
        name = ' '.join(x for x in [mod, ' '.join(rest[:1])] if x)
        out = ' · '.join(x for x in [code, name] if x)
    elif f in COURSES:
        out = ' · '.join(x for x in [code, (rest[:1] or [''])[0]] if x)
    else:
        out = (rest[:1] or [t])[0]
        if f.endswith('/index.html'):
            out = re.sub(r'\s*[·-].*$', '', out) + ' — all pages'
    out = re.sub(r'\s+—\s+Accessible Illustrated Edition', '', out)
    return out if len(out) <= 64 else out[:61].rstrip() + '…'


def module_sort(f):
    order = [c for _, c in MODULE]
    n = re.findall(r'\d+', f)
    return (order.index(course_of(f)), int(n[-1]) if n else 0)


def main():
    all_pages = pages()
    real, text = [], {}
    for f in all_pages:
        s = open(f, encoding='utf-8').read()
        if STUB.search(s[:3000]) and len(s) < 6000:
            continue
        real.append(f)
        text[f] = s
    exists = set(all_pages)

    # who links to whom, without this tool's own bars
    linked_from = {}
    for f in real:
        s = BOT.sub('', TOP.sub('', text[f]))
        here = os.path.dirname(f)
        for h in set(HREF.findall(s)):
            if re.match(r'^[a-z]+:', h) or not h.endswith('.html'):
                continue
            t = os.path.normpath(os.path.join(here, h))
            if t in exists and t != f:
                linked_from.setdefault(t, set()).add(f)

    # the Visual library's card tags say which course and module a page is for
    tagged = {}
    g = text.get('infographics.html', '')
    for card in re.split(r'(?=<div class="card)', g)[1:]:
        cls = re.search(r'data-cls="([^"]*)"', card[:800])
        mod = re.search(r'data-mod="([^"]*)"', card[:800])
        if not cls:
            continue
        for h in HREF.findall(card):
            t = os.path.normpath(h)
            if t.endswith('.html') and t in exists and t not in tagged:
                tagged[t] = (cls.group(1), mod.group(1) if mod else '')

    def from_tags(f):
        if f not in tagged:
            return []
        cls, mod = tagged[f]
        n = re.findall(r'\d+', html.unescape(mod))
        if cls in SIBLING:
            return ['../' + SIBLING[cls][0]]
        if not n:
            return []
        n = int(n[0])
        pats = {'NUR 234': ['nur234-m%d.html' % n], 'NUR 235': ['nur235-m%d.html' % n],
                'NUR 258': sorted(glob.glob('nur258-module-%02d-*.html' % n))}.get(cls, [])
        return [x for x in pats if x in exists][:1]

    stale = 0
    for f in real:
        if f == 'index.html':
            continue
        srcs = linked_from.get(f, set())
        if course_of(f):
            parents = [course_of(f)]
        elif f in COURSES or f in SITEWIDE or (f.endswith('/index.html') and f.count('/') == 1):
            parents = []
        elif '/' not in f and any(f.startswith(a) for a, _ in PREFIX):
            parents = [next(c for a, c in PREFIX if f.startswith(a))]
            parents = [c for c in parents if c in exists and c != f]
        else:
            mods = [p for p in srcs if course_of(p)]
            per = {}
            for p in mods:
                per[course_of(p)] = per.get(course_of(p), 0) + 1
            # the course that uses the page most comes first
            mods.sort(key=lambda p: (-per[course_of(p)], module_sort(p)))
            subpage = '/' in f or re.match(r'^NG-\d', f)
            if subpage:
                parents = mods[:2]
                if not parents:
                    parents = from_tags(f)
                    idx = os.path.join(os.path.dirname(f), 'index.html')
                    if parents and os.path.dirname(f) and idx in exists and idx != f:
                        parents.append(idx)
            elif len(per) == 1 and len(mods) <= 2:
                parents = mods            # a page that belongs to one or two modules
            elif len(per) == 1:
                parents = [next(iter(per))]   # used across one course
            else:
                parents = []              # a site-wide page, not a subpage
            if not parents and len(per) <= 1:
                cs = [c for c in COURSES if c in srcs]
                parents = cs if len(cs) <= 2 else []
            if not parents:
                # the page's own links up to a module ("Back to NUR 235 M2")
                outs = sorted({os.path.normpath(os.path.join(os.path.dirname(f), h))
                               for h in HREF.findall(BOT.sub('', TOP.sub('', text[f])))
                               if h.endswith('.html') and not re.match(r'^[a-z]+:', h)})
                parents = [o for o in outs if o in exists and (course_of(o) or o in COURSES)][:2]
            if not parents:
                idx = os.path.join(os.path.dirname(f), 'index.html')
                if os.path.dirname(f) and idx in exists and idx != f:
                    parents = [idx]
            if not parents:
                # a folder index elsewhere that lists it (more/ has none of its own)
                parents = sorted(p for p in srcs if p.endswith('/index.html') and p.count('/') == 1)[:1]
            if not parents and f.startswith('peds/') and 'pediatrics.html' in exists:
                parents = ['pediatrics.html']
            if not parents and f.startswith('games/') and 'games.html' in exists:
                parents = ['games.html']
        if LIST:
            print('%-60s %s' % (f, ' | '.join('%s [%s]' % (p, label(p)) for p in parents) or '(hub only)'))
            continue
        here = os.path.dirname(f) or '.'
        rel = lambda p: os.path.relpath(p, here).replace(os.sep, '/')  # '../X' stays outside the repo
        links = ['<a class="hub" href="%s">&#127968; Study Hub</a>' % rel('index.html')]
        for p in parents:
            links.append('<a class="par" href="%s">&#128216; %s</a>' % (rel(p), html.escape(label(p), quote=False)))
        inner = ''.join(links)
        top = '\n<nav class="absn-back top" data-absn-keep aria-label="Back to the Study Hub and this page\'s study guide">%s</nav>' % inner
        bot = '\n<nav class="absn-back bottom" data-absn-keep aria-label="Back to the Study Hub and this page\'s study guide">%s</nav>' % inner

        s = old = text[f]
        s = CSSRE.sub('', s)
        s = TOP.sub('', s)
        s = BOT.sub('', s)
        head_end = s.find('</head>')
        if head_end < 0:                  # a few pages never close <head>
            head_end = s.lower().find('<body')
        if head_end < 0:
            print('%-55s no <head>/<body>, skipped' % f)
            continue
        s = s[:head_end] + CSS + s[head_end:]
        b = re.compile(r'<body\b[^>]*>', re.I).search(s, head_end + len(CSS))
        if not b:
            print('%-55s no <body>, skipped' % f)
            continue
        at = b.end()
        nav = re.compile(r'\s*(?:<!-- absn-floating-nav -->\s*<style>.*?</style>\s*)?<div id="absnNav">.*?</div>', re.S).match(s, at)
        if nav:
            at = nav.end()
        s = s[:at] + top + s[at:]
        end = s.rfind('</body>')
        if end < 0:
            end = len(s)
        s = s[:end].rstrip('\n') + bot + '\n' + s[end:]
        if s != old:
            stale += 1
            if not CHECK:
                open(f, 'w', encoding='utf-8').write(s)
    print('%d page(s) %s' % (stale, 'stale' if CHECK else 'written'))
    return 1 if (CHECK and stale) else 0


if __name__ == '__main__':
    sys.exit(main())
