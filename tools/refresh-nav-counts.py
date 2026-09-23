#!/usr/bin/env python3
"""Recompute the numbers in the site-wide nav from the pages they describe.

Every page carries the same `<nav>` block, and each entry states a count:

    <a class="nav" href="lectures.html">&#127909; Lectures
       <span class="nsub">390 recordings, all courses</span></a>

Those numbers are hand-written, so they go stale the moment a recording or a
quiz question is added - and they go stale in *every* file at once. This has
now been true four times: lectures said 390 against 452, NUR 235's quiz said
312 against 315, NUR 258's week rows said 3 recordings against 5, and
podcasts.html said the lecture page held 122.

So derive them instead. The counts come from the real markup:

  * lectures.html            - one `<a class="rec">` per recording
  * lectures.html#nur234     - the same, inside that course's `<section>`
  * nur234-quiz.html         - the length of the `#qbank` JSON
  * nur258-podcasts.html     - the week rows, from lectures.html's modules

Run it after adding a recording or a question, and commit what it changes:

    python3 tools/refresh-nav-counts.py          # rewrite, print a summary
    python3 tools/refresh-nav-counts.py --check  # exit 1 if anything is stale
"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(name):
    with open(os.path.join(ROOT, name), encoding='utf-8') as fh:
        return fh.read()


def plural(n, word):
    return '%d %s%s' % (n, word, '' if n == 1 else 's')


def _div_block(s, start):
    """The source of one <div> and everything nested inside it."""
    depth = 0
    for m in re.finditer(r'<(/?)div\b[^>]*>', s[start:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return s[start:start + m.end()]
    return s[start:]


def counts():
    """{nav href: the text its <span class="nsub"> should carry}."""
    out = {}
    lec = read('lectures.html')
    out['lectures.html'] = '%s, all courses' % plural(
        len(re.findall(r'<a class="rec"', lec)), 'recording')

    for m in re.finditer(r'<section class="course" id="(nur\d+)"', lec):
        body = lec[m.start():]
        nxt = re.search(r'<section class="course"', body[1:])
        if nxt:
            body = body[:nxt.start() + 1]
        out['lectures.html#' + m.group(1)] = plural(
            len(re.findall(r'<a class="rec"', body)), 'recording')

    for path in sorted(glob.glob(os.path.join(ROOT, 'nur*-quiz.html'))):
        name = os.path.basename(path)
        bank = re.search(r'<script type="application/json" id="qbank">(.*?)</script>',
                         read(name), re.S)
        if not bank:
            continue
        data = json.loads(bank.group(1))
        n = sum(len(v) for v in data.values()) if isinstance(data, dict) else len(data)
        out[name] = plural(n, 'question')
    return out


def module_counts():
    """{lectures.html#nur258-m3: '5 recordings'} for the week rows."""
    lec = read('lectures.html')
    out = {}
    for m in re.finditer(r'<div class="wk [^"]*" id="(nur\d+-m\d+)"', lec):
        out['lectures.html#' + m.group(1)] = plural(
            len(re.findall(r'<a class="rec"', _div_block(lec, m.start()))), 'recording')
    return out


def main():
    check = '--check' in sys.argv
    want = counts()
    want.update(module_counts())
    # a count only belongs to an entry that already states one - never invent a
    # subtitle for a link whose nsub is prose ("Maternal & newborn").
    numeric = re.compile(r'^\d+ (recording|question|deck)s?\b')
    changes, stale = [], 0

    for path in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
        name = os.path.basename(path)
        src = new = read(name)

        def fix(m):
            # (?P<cls>...) is group 1, so the rest shift up by one
            href, mid, cur = m.group(2), m.group(3), m.group(4)
            target = want.get(href)
            if target is None or not numeric.match(cur) or cur == target:
                return m.group(0)
            changes.append((name, href, cur, target))
            return '<a class="%s" href="%s"%s<span class="nsub">%s</span>' % (
                m.group('cls'), href, mid, target)

        new = re.sub(
            r'<a class="(?P<cls>nav[^"]*|wkrow)" href="([^"]+)"(.*?)<span class="nsub">([^<]*)</span>',
            lambda m: fix(m), new, flags=re.S)
        # the week rows on nur258-podcasts.html use .wkc, not .nsub
        new = re.sub(
            r'(<a class="wkrow" href="([^"]+)".*?<span class="wkc">)([^<]*)(</span>)',
            lambda m: (m.group(1) + want[m.group(2)] + m.group(4))
            if want.get(m.group(2)) and want[m.group(2)] != m.group(3)
            and not changes.append((name, m.group(2), m.group(3), want[m.group(2)]))
            else m.group(0), new, flags=re.S)

        if new != src:
            stale += 1
            if not check:
                with open(path, 'w', encoding='utf-8') as fh:
                    fh.write(new)

    for name, href, cur, target in changes:
        print('%-28s %-26s %r -> %r' % (name, href, cur, target))
    print('%d entr%s %s in %d file%s' % (
        len(changes), 'y' if len(changes) == 1 else 'ies',
        'stale' if check else 'updated', stale, '' if stale == 1 else 's'))
    return 1 if (check and changes) else 0


if __name__ == '__main__':
    sys.exit(main())
