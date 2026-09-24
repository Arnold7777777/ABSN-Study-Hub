#!/usr/bin/env python3
"""Wire Drive-hosted topic clips into a module page and the lecture library.

    python3 tools/wire-module-videos.py
    python3 tools/wire-module-videos.py --check   # exit 1 if anything is unwired

The sibling of tools/wire-module-decks.py, for recordings instead of slides.

These are Drive recordings, so they follow what the rest of the site already
does with a recording: a .rec card that opens it in Drive. They are NOT
embedded. Every one of the ~2,500 Drive recording links here is a link-out;
the only /preview iframes on the site are the podcast players, and an iframe
could not be tested from the build environment anyway - drive.google.com is
refused by its egress proxy.

The clips go in their own .recs strip inside the module's existing lectures
slot rather than being mixed into the day-by-day list, because they are one
lecture cut by topic, not six more lectures.

Counts are always derived by counting the cards actually present. Hand-typed
counts on this site have been wrong more than once.
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
CHECK = '--check' in sys.argv
REG = 'tools/module-videos.json'
LIB = 'lectures.html'


def cards(g):
    """The clip cards, in registry order."""
    out = []
    for c in g['clips']:
        out.append(
            '<a class="rec" href="https://drive.google.com/file/d/%s/view" '
            'target="_blank" rel="noopener" title="%s">'
            '<span class="pl" aria-hidden="true">&#9654;&#65039;</span>'
            '<span class="rt">%s<span class="rl">%s</span></span></a>'
            % (c['id'], c['file'], c['title'], c['len']))
    return ''.join(out)


def strip(g, lede=True):
    """The group's own .recs strip, marked so a re-run replaces it in place."""
    p = ('<p class="vgl">%s</p>' % g['lede']) if lede else ''
    return ('%s<div class="recs" data-vidgroup="%s">%s</div>'
            % (p, g['group'], cards(g)))


def span(s, g):
    """Existing strip for this group, or None. Bounded by its own closing tag."""
    m = re.search(r'(?:<p class="vgl">[^<]*</p>)?<div class="recs" '
                  r'data-vidgroup="%s">.*?</div>' % re.escape(g['group']), s, re.S)
    return m


def recount(s, start, end, pat, fmt):
    """Rewrite a count from the cards actually present between start and end."""
    n = s.count('class="rec"', start, end)
    m = re.search(pat, s[start:end])
    if not m:
        return s, n
    cur = m.group(1)
    if cur == str(n):
        return s, n
    at = start + m.start()
    return s[:at] + fmt % n + s[at + len(m.group(0)):], n


def wire_page(g):
    """Into the module page's lectures slot, just before 'All … recordings ->'."""
    f = g['page']
    s = old = open(f).read()
    i = s.find('<div class="slot filled" data-slot="lectures">')
    if i < 0:
        sys.exit('%s: no lectures slot to wire into' % f)
    end = s.index('</div>', s.index('class="lecall"', i)) + 6
    m = span(s[i:end], g)
    block = strip(g)
    if m:
        s = s[:i + m.start()] + block + s[i + m.end():]
    else:
        at = i + s[i:end].index('<a class="lecall"')
        s = s[:at] + block + s[at:]
    end = s.index('</div>', s.index('class="lecall"', i)) + 6
    s, n = recount(s, i, end, r'<span class="cnt">(\d+)</span>',
                   '<span class="cnt">%d</span>')
    if s != old and not CHECK:
        open(f, 'w').write(s)
    return f, n, (s != old)


def wire_library(g):
    """Into lectures.html, inside this module's week block."""
    s = old = open(LIB).read()
    k = s.find('id="%s"' % g['week'])
    if k < 0:
        sys.exit('%s: no week block id="%s"' % (LIB, g['week']))
    i = s.rindex('<div class="wk', 0, k)
    nxt = s.find('<div class="wk', k)
    end = len(s) if nxt < 0 else nxt
    m = span(s[i:end], g)
    block = strip(g, lede=False)
    if m:
        s = s[:i + m.start()] + block + s[i + m.end():]
    else:
        # after the existing .recs closes, before the week block's own </div>
        at = i + s[i:end].rindex('</div>')
        s = s[:at] + block + s[at:]
    nxt = s.find('<div class="wk', k)
    end = len(s) if nxt < 0 else nxt
    s, n = recount(s, i, end, r'(?<=</span>)(\d+) recordings', '%d recordings')
    if s != old and not CHECK:
        open(LIB, 'w').write(s)
    return n, (s != old)


def main():
    groups = json.load(open(REG))
    pending = 0
    for g in groups:
        f, n, page_changed = wire_page(g)
        libn, lib_changed = wire_library(g)
        changed = page_changed or lib_changed
        pending += 1 if changed else 0
        print('%-46s %-11s page %2d / library %2d'
              % (f, 'unwired' if (CHECK and changed) else
                    ('wired' if changed else 'ok'), n, libn))
    if CHECK:
        print('%d group(s) unwired' % pending)
        return 1 if pending else 0
    print('%d group(s), %d clip(s)' % (len(groups), sum(len(g['clips']) for g in groups)))
    return 0


if __name__ == '__main__':
    sys.exit(main())
