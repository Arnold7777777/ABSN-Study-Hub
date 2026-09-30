#!/usr/bin/env python3
"""Recompute the Infographics count on each module page from the cards present.

Every module page's slots carry a number in their heading:

    <div class="slot filled" data-slot="info"><h4>&#128444;&#65039; Infographics
       <span class="cnt">18</span></h4>

Three of the four slot kinds stay right because a script writes them -
`wire-module-videos.py` recounts the `lectures` slot from its `a.rec` cards, and
the `mindmap` and `alt` counts are generated with their contents. The `info`
slot had no writer, so it was the one that drifted: module 4 said 7 against 10,
module 3 said 12 against 8, module 11 said 10 against 13. Caroline found the
first of those herself.

The number counts everything in the slot: one per `a.igcard` - including the
cards that link YouTube or Drive rather than a page here - plus one per
`figure.ownfig` sitting full-width in the same grid.

    python3 tools/refresh-module-info-counts.py          # rewrite, print a summary
    python3 tools/refresh-module-info-counts.py --check  # exit 1 if anything is stale
"""
import glob, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLOT = re.compile(r'<div class="slot[^"]*" data-slot="([^"]+)">')
CNT = re.compile(r'<span class="cnt">(\d+)</span>')


def slots(s):
    """Each slot's (name, start, end). A slot runs until the next one opens."""
    marks = [(m.group(1), m.start()) for m in SLOT.finditer(s)]
    for i, (name, start) in enumerate(marks):
        yield name, start, marks[i + 1][1] if i + 1 < len(marks) else len(s)


def count(seg):
    return seg.count('class="igcard') + seg.count('<figure class="ownfig"')


def fix(path):
    """Returns (current, wanted) when this page's info count is stale."""
    s = open(path, encoding='utf-8').read()
    for name, start, end in slots(s):
        if name != 'info':
            continue
        seg = s[start:end]
        n = count(seg)
        # Module 12 has no cards at all: its info slot is headed "Triage at a
        # glance" and holds the triage table itself, because no disaster page
        # exists to link to. Its 1 means that chart. Recounting it to 0 would
        # make the heading lie, so a slot with nothing to count is left alone.
        if n == 0:
            continue
        m = CNT.search(seg)
        if not m or m.group(1) == str(n):
            continue
        at = start + m.start()
        if '--check' not in sys.argv:
            open(path, 'w', encoding='utf-8').write(
                s[:at] + '<span class="cnt">%d</span>' % n + s[at + len(m.group(0)):])
        return m.group(1), n
    return None


def main():
    stale = 0
    for path in sorted(glob.glob(os.path.join(ROOT, 'nur*-module-*.html'))):
        r = fix(path)
        if r:
            stale += 1
            print('%-62s %s -> %d' % (os.path.basename(path), r[0], r[1]))
    verb = 'stale' if '--check' in sys.argv else 'corrected'
    print('%d Infographics count%s %s' % (stale, '' if stale == 1 else 's', verb))
    return 1 if stale and '--check' in sys.argv else 0


if __name__ == '__main__':
    sys.exit(main())
