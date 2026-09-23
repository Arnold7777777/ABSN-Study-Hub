#!/usr/bin/env python3
"""Find lecture/podcast cards that point at the same recording twice.

The same session often reaches Drive more than once - a phone capture and a
laptop capture of one Zoom call, or the same file dropped into two folders on
different days. Each copy gets its own Drive id, so nothing in the HTML looks
duplicated, and each one ends up carded separately. The page then shows one
session two or three times under names that give no hint they are the same.

On 23 Sep this bit twice in one session: Kaiser's 6 and 7 August reviews were
carded under the vague names "Kaiser Final Review 1/2.mp4", and adding them
again under descriptive names took NUR 234 M14 to 7 cards for 5 recordings.

**Byte size is the detector.** Two Drive files with an identical `fileSize` are
the same recording - that call was made about fifteen times over that session
with no false positive. Label similarity is NOT a detector: a normalised-label
scan rates "Buhler Wk1 D1" vs "Buhler Wk1 D2" at 0.89 and Toddler vs
Preschooler at 0.86, and those are different sessions. So only exact byte
equality may collapse a card; everything else is reported for a human.

Usage
-----
    python3 tools/audit-lecture-dupes.py --sizes sizes.json

`sizes.json` is `{drive_id: [bytes, title]}`. Only the Drive MCP tools can
build it, so collect it per parent folder (`parentId = '<id>' and mimeType =
'video/mp4'`) rather than one lookup per card - there are ~450 cards across
about 20 folders. Ids with no entry are simply skipped and counted.

Reports three groups:

  EXACT    two or more carded ids with the same byte size. Safe to collapse:
           keep the card whose Drive title is most descriptive, drop the rest.
  SUSPECT  same module, sizes within --near (default 10%). A human decides -
           different bytes may well be different sessions, and guessing here
           loses a recording she cannot get back.
  DRIFT    the card's title= attribute no longer matches the Drive title.
           That attribute is the tooltip, so it is worth keeping honest.
"""
import argparse, collections, html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(name):
    with open(os.path.join(ROOT, name), encoding='utf-8') as fh:
        return fh.read()


def card_spans(text, opener):
    """Start/end offsets of each card.

    Bounded by the NEXT opener, not by counting <div> depth. Depth counting
    looks correct and is not: these pages contain unbalanced divs, and a
    depth-based span silently swallowed eight innocent cards when this was
    first attempted. The next-opener bound cannot over-reach by construction.
    """
    starts = [m.start() for m in re.finditer(re.escape(opener), text)]
    return [(a, starts[i + 1] if i + 1 < len(starts) else len(text))
            for i, a in enumerate(starts)]


def lecture_cards():
    s = read('lectures.html')
    mods = [(m.group(1), m.start()) for m in
            re.finditer(r'<div class="wk [^"]*" id="([a-z0-9-]+)"', s)]
    out = []
    for a, b in card_spans(s, '<a class="rec"'):
        seg = s[a:b]
        m = re.search(r'/file/d/([^/"?]+)/view', seg)
        if not m:
            continue
        t = re.search(r'title="([^"]*)"', seg)
        mod = [n for n, p in mods if p < a]
        out.append({'page': 'lectures.html', 'mod': mod[-1] if mod else '?',
                    'id': m.group(1), 'title': html.unescape(t.group(1)) if t else ''})
    return out


def podcast_cards():
    s = read('podcasts.html')
    out = []
    for a, b in card_spans(s, '<div class="pod"'):
        seg = s[a:b]
        m = re.search(r'/file/d/([^/"?]+)/view', seg)
        if not m:
            continue
        h = re.search(r'<h3>(.*?)</h3>', seg, re.S)
        mod = re.search(r'data-mod="([^"]*)"', seg)
        out.append({'page': 'podcasts.html', 'mod': mod.group(1) if mod else '?',
                    'id': m.group(1),
                    'title': html.unescape(re.sub(r'<[^>]+>', '', h.group(1))).strip() if h else ''})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--sizes', required=True, help='{drive_id: [bytes, title]}')
    ap.add_argument('--near', type=float, default=0.10)
    a = ap.parse_args()

    sizes = json.load(open(a.sizes))
    cards = lecture_cards() + podcast_cards()
    known = [c for c in cards if c['id'] in sizes]
    print('%d cards, %d with a known size, %d unknown\n'
          % (len(cards), len(known), len(cards) - len(known)))

    by_size = collections.defaultdict(list)
    for c in known:
        by_size[sizes[c['id']][0]].append(c)

    exact = 0
    for sz, group in sorted(by_size.items()):
        if len({c['id'] for c in group}) < 2:
            continue
        exact += 1
        print('EXACT  %s bytes' % format(sz, ','))
        for c in group:
            print('   %-16s %-13s %s' % (c['page'], c['mod'], sizes[c['id']][1][:72]))
        print()

    seen, suspect = set(), 0
    per_mod = collections.defaultdict(list)
    for c in known:
        per_mod[(c['page'], c['mod'])].append(c)
    for key, group in sorted(per_mod.items()):
        for i in range(len(group)):
            for j in range(i + 1, len(group)):
                x, y = sizes[group[i]['id']][0], sizes[group[j]['id']][0]
                if x == y or not max(x, y):
                    continue
                if abs(x - y) / max(x, y) <= a.near:
                    pair = tuple(sorted((group[i]['id'], group[j]['id'])))
                    if pair in seen:
                        continue
                    seen.add(pair); suspect += 1
                    print('SUSPECT %s  sizes within %.0f%%' % (key[1], a.near * 100))
                    print('   %s' % sizes[group[i]['id']][1][:76])
                    print('   %s' % sizes[group[j]['id']][1][:76])
                    print()

    drift = 0
    for c in known:
        want = sizes[c['id']][1]
        if c['page'] == 'lectures.html' and c['title'] and c['title'] != want:
            drift += 1
            print('DRIFT  %-13s card says %s' % (c['mod'], c['title'][:60]))
            print('                     Drive says %s' % want[:60])
    if drift:
        print()

    print('EXACT clusters: %d | SUSPECT pairs: %d | DRIFT: %d' % (exact, suspect, drift))
    return 1 if exact else 0


if __name__ == '__main__':
    sys.exit(main())
