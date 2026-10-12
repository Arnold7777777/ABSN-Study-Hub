#!/usr/bin/env python3
"""Put the pediatric disease pictures beside the study pages that teach each disease.

Codex's 74 cards live in pediatric-visuals/<slug>.html (preview img/previews/pv-<slug>.webp).
Caroline asked (12 Oct) for them on the matching study pages too, not only on the NUR 235
module pages. tools/pv-study-map.json says where:

  {"page": "...NG-xxx.html", "anchor": "#id" | "h2:<text>" | "h3:<text>", "slugs": [...],
   "adult": true}   # optional: an adult-focused page, so the card says "In children"

  #id        the row goes at the end of that section
  h2:<text>  the row goes after the first block (card, table, figure) of the <section>
             whose h2 contains the text
  h3:<text>  the row goes right after the card (div.card) that holds the h3

Each row sits between <!-- pv-study --> and <!-- /pv-study -->, with inline styles so the
NG pages need no extra stylesheet.

  python3 tools/wire-pv-study-links.py           # write
  python3 tools/wire-pv-study-links.py --check   # exit 1 if any page is stale
  python3 tools/wire-pv-study-links.py --remove  # take every row off
  python3 tools/wire-pv-study-links.py --list    # show what goes where

An anchor that cannot be found is an error, not a guess: fix the map.
"""
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

OPEN, CLOSE = '<!-- pv-study -->', '<!-- /pv-study -->'
OLD = re.compile(re.escape(OPEN) + r'.*?' + re.escape(CLOSE), re.S)


def plain(t):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', t))).strip()


def title(slug):
    s = open('pediatric-visuals/%s.html' % slug, encoding='utf-8').read()
    return plain(re.search(r'<h1[^>]*>(.*?)</h1>', s, re.S).group(1))


def balanced_end(s, start, tag):
    """End index of the <tag> element that opens at `start`."""
    pat = re.compile(r'<(/?)%s\b[^>]*>' % tag)
    depth = 0
    for m in pat.finditer(s, start):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return m.end()
    raise ValueError('unbalanced <%s>' % tag)


def where(s, anchor):
    """Index at which to insert the row."""
    if anchor.startswith('#'):
        m = re.search(r'<(section|div)\b[^>]*\bid="%s"' % re.escape(anchor[1:]), s)
        if not m:
            raise ValueError('no element with id %s' % anchor)
        end = balanced_end(s, m.start(), m.group(1))
        return s.rfind('</%s>' % m.group(1), 0, end)
    level, text = anchor.split(':', 1)
    for m in re.finditer(r'<%s\b[^>]*>(.*?)</%s>' % (level, level), s, re.S):
        if text.lower() in plain(m.group(1)).lower():
            break
    else:
        raise ValueError('no %s containing "%s"' % (level, text))
    if level == 'h2':
        st = s.rfind('<section', 0, m.start())
        if st < 0:
            raise ValueError('h2 "%s" is not in a <section>' % text)
        end = balanced_end(s, st, 'section')
        # right after the section's first block (its intro card, table or figure),
        # so the picture sits beside the explanation rather than after the traps
        blk = re.compile(r'<(div|figure|table|ul|p)\b[^>]*>').search(s, m.end(), end)
        while blk and 'class="inner"' in blk.group(0):
            blk = re.compile(r'<(div|figure|table|ul|p)\b[^>]*>').search(s, blk.end(), end)
        if blk:
            return balanced_end(s, blk.start(), blk.group(1))
        return s.rfind('</section>', 0, end)
    # h3: after the card that holds it
    st = s.rfind('<div class="card', 0, m.start())
    if st >= 0 and balanced_end(s, st, 'div') > m.end():
        return balanced_end(s, st, 'div')
    return m.end()


def row(page, slugs, adult):
    up = os.path.relpath('.', os.path.dirname(page) or '.')
    pre = '' if up == '.' else up + '/'
    cards = []
    for slug in slugs:
        name = title(slug)
        head = ('&#129490; In children: %s' if adult else '&#129490; %s') % html.escape(name)
        cards.append(
            '<a href="%spediatric-visuals/%s.html" style="display:flex;gap:12px;align-items:center;flex:1 1 250px;'
            'min-width:0;min-height:44px;box-sizing:border-box;padding:10px 12px;border-radius:12px;background:#16384f;'
            'border:1px solid #6fb8d6;color:#c9f3ff;text-decoration:none">'
            '<img src="%simg/previews/pv-%s.webp" width="507" height="760" alt="Preview of the %s picture" '
            'loading="lazy" decoding="async" style="flex:none;width:64px;height:auto;aspect-ratio:507/760;border-radius:6px">'
            '<span style="min-width:0;line-height:1.4;overflow-wrap:break-word"><b style="display:block;font-size:1.02rem;color:#fff">%s</b>'
            '<span style="font-size:.95rem">Picture, memory hook and nursing care &rarr;</span></span></a>'
            % (pre, slug, pre, slug, html.escape(name), head))
    return ('%s<div class="pv-study" style="display:flex;flex-wrap:wrap;gap:10px;margin:14px 0">%s</div>%s'
            % (OPEN, ''.join(cards), CLOSE))


def build(remove=False):
    plan = json.load(open('tools/pv-study-map.json', encoding='utf-8'))
    pages = {}
    for e in plan:
        pages.setdefault(e['page'], []).append(e)
    out = {}
    for page, entries in pages.items():
        s = open(page, encoding='utf-8').read()
        t = OLD.sub('', s)
        if not remove:
            spots = []
            for e in entries:
                missing = [x for x in e['slugs'] if not os.path.exists('pediatric-visuals/%s.html' % x)]
                if missing:
                    raise SystemExit('%s: no viewer for %s' % (page, missing))
                try:
                    spots.append((where(t, e['anchor']), e))
                except ValueError as err:
                    raise SystemExit('%s: %s' % (page, err))
            for i, e in sorted(spots, key=lambda x: -x[0]):
                t = t[:i] + row(page, e['slugs'], e.get('adult')) + t[i:]
        out[page] = (s, t, entries)
    return out


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ''
    if mode == '--list':
        for e in json.load(open('tools/pv-study-map.json', encoding='utf-8')):
            print('%-55s %-40s %s' % (e['page'], e['anchor'], ', '.join(e['slugs'])))
        return
    res = build(remove=(mode == '--remove'))
    stale = [p for p, (s, t, _) in res.items() if s != t]
    n = sum(len(e['slugs']) for _, _, es in res.values() for e in es)
    if mode == '--check':
        print('%d picture links on %d pages; %d page(s) stale' % (n, len(res), len(stale)))
        for p in stale:
            print('  ' + p)
        sys.exit(1 if stale else 0)
    for p in stale:
        open(p, 'w', encoding='utf-8').write(res[p][1])
    print('%s %d page(s)%s' % ('cleared' if mode == '--remove' else 'wrote', len(stale),
                               '' if mode == '--remove' else '; %d picture links on %d pages' % (n, len(res))))


if __name__ == '__main__':
    main()
