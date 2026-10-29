"""Every "NG-###" a page mentions opens that page (Caroline, 29 Oct).

    python3 tools/wire-ng-xrefs.py            write / refresh the links
    python3 tools/wire-ng-xrefs.py --check    exit 1 if any page is out of date
    python3 tools/wire-ng-xrefs.py --remove   take the links off again
    python3 tools/wire-ng-xrefs.py --list     print the number -> page map and anything unmatched

The study pages point at each other by number ("see NG-098", the "This page in the batch"
rows on NG-190), and 534 of those mentions were plain text: she tapped NG-079 and nothing
happened. This wraps each one in a link to the real page:
- the topic-folder page (cardio/NG-071_...) wins; a root NG-*.html counts only when it is a
  real page, not one of the redirect stubs;
- the page's own number, numbers with no page, and text inside tags, links, <script>,
  <style>, <title>, <head>, <svg>, buttons and summaries are left alone;
- a "This page in the batch" row (div.xref starting with span.pill NG-###) becomes one
  44px tap target instead of a tiny pill.
Run it after adding or renaming NG pages. Never hand-edit a.ngx / a.ngx-row or #ngx-css.
"""
import glob, os, re, sys

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = ('tools/', '.git/', 'node_modules/')
NG = re.compile(r'\bNG-(\d{3})\b')
PROTECT = re.compile(r'<!--.*?-->|<(script|style|title|head|svg|textarea|button|summary|select|label)\b.*?</\1>|<a\b[^>]*>.*?</a>|<[^>]+>', re.S | re.I)
ROW = re.compile(r'<div class="xref"><span class="pill">NG-(\d{3})</span>(.*?)</div>', re.S)
GO = '<span class="ngx-go" aria-hidden="true">&rsaquo;</span>'
CSS = ('<style id="ngx-css">'
       'html body a.ngx{color:inherit;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:2px}'
       'html body a.ngx-row{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;min-height:44px;color:inherit;text-decoration:none}'
       'html body a.ngx-row .ngx-go{margin-left:auto;font-size:1.4em;font-weight:900;line-height:1}'
       'html body a.ngx:focus-visible,html body a.ngx-row:focus-visible,html body a.ngx-row:hover{outline:2px solid currentColor;outline-offset:4px;border-radius:8px}'
       '</style>\n')
CSSB = re.compile(r'<style id="ngx-css">.*?</style>\n?', re.S)


def stub(path):
    head = open(path, encoding='utf-8', errors='ignore').read(4000)
    return 'http-equiv="refresh"' in head or 'location.replace' in head


def pages():
    real = {}
    for f in sorted(glob.glob(os.path.join(R, '*', 'NG-*.html'))):
        real.setdefault(re.search(r'NG-(\d{3})', os.path.basename(f)).group(1), f)
    for f in sorted(glob.glob(os.path.join(R, 'NG-*.html'))):
        n = re.search(r'NG-(\d{3})', os.path.basename(f)).group(1)
        if n not in real and not stub(f):
            real[n] = f
    return real


def files():
    for f in sorted(glob.glob(os.path.join(R, '**', '*.html'), recursive=True)):
        rel = os.path.relpath(f, R)
        if rel.startswith(SKIP_DIRS):
            continue
        if os.path.dirname(rel) == '' and rel.startswith('NG-') and stub(f):
            continue
        yield f


def strip(s):
    s = re.sub(r'<a class="ngx-row" href="[^"]*">(.*?)' + re.escape(GO) + '</a>', r'\1', s, flags=re.S)
    s = re.sub(r'<a class="ngx" href="[^"]*">(NG-\d{3})</a>', r'\1', s)
    return s


def link(s, path, real):
    own = (re.search(r'NG-(\d{3})', os.path.basename(path)) or [None, None])[1]
    here = os.path.dirname(path)
    href = lambda n: os.path.relpath(real[n], here).replace(os.sep, '/')
    ok = lambda n: n in real and n != own
    s = ROW.sub(lambda m: ('<div class="xref"><a class="ngx-row" href="%s"><span class="pill">NG-%s</span>%s%s</a></div>'
                           % (href(m.group(1)), m.group(1), m.group(2), GO)) if ok(m.group(1)) else m.group(0), s)
    out, last = [], 0
    for m in PROTECT.finditer(s):
        out.append(NG.sub(lambda t: '<a class="ngx" href="%s">NG-%s</a>' % (href(t.group(1)), t.group(1))
                          if ok(t.group(1)) else t.group(0), s[last:m.start()]))
        out.append(m.group(0)); last = m.end()
    out.append(NG.sub(lambda t: '<a class="ngx" href="%s">NG-%s</a>' % (href(t.group(1)), t.group(1))
                      if ok(t.group(1)) else t.group(0), s[last:]))
    return ''.join(out)


def build(s, path, real, remove=False):
    base = strip(s)
    if remove:
        return CSSB.sub('', base)
    new = link(base, path, real)
    used = 'class="ngx' in new
    if used and not CSSB.search(new):
        new = new.replace('</head>', CSS + '</head>', 1)      # kept where it is on later runs
    if not used:
        new = CSSB.sub('', new)
    return new


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ''
    real = pages()
    if mode == '--list':
        for n in sorted(real):
            print('NG-%s  %s' % (n, os.path.relpath(real[n], R)))
        return
    stale, nlinks, unmatched = [], 0, {}
    for f in files():
        s = open(f, encoding='utf-8', errors='ignore').read()
        new = build(s, f, real, remove=(mode == '--remove'))
        nlinks += new.count('class="ngx')
        for n in NG.findall(re.sub(r'<a\b[^>]*>.*?</a>', '', PROTECT.sub(lambda m: m.group(0) if m.group(0).startswith('<a') else ' ', new), flags=re.S)):
            if n not in real:
                unmatched.setdefault(n, set()).add(os.path.relpath(f, R))
        if new != s:
            stale.append(f)
            if mode not in ('--check',):
                open(f, 'w', encoding='utf-8').write(new)
    if mode == '--check':
        print('%d page(s) stale' % len(stale)); sys.exit(1 if stale else 0)
    print('%s %d page(s); %d NG links in place; %d pages known' % ('removed from' if mode == '--remove' else 'wrote', len(stale), nlinks, len(real)))
    for n, fs in sorted(unmatched.items()):
        print('  no page for NG-%s (mentioned on %s)' % (n, ', '.join(sorted(fs))))


main()
