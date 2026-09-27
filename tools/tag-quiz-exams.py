#!/usr/bin/env python3
"""Stamp an `exam` field onto super-mega-quiz.html's question bank.

    python3 tools/tag-quiz-exams.py            # write
    python3 tools/tag-quiz-exams.py --check    # report only, change nothing

Nothing in the bank carries an exam number, so it comes from two real sources
and nowhere else. No question is guessed at.

1. NUR 234 / 235 / 258 already store a module in `week`. Each course's
   module -> exam mapping is READ OFF ITS OWN MODULE PAGES, not assumed - the
   three courses genuinely differ (234 puts M1-M4 in Exam 1, 258 puts M1-M3).

2. NUR 198's own mega quiz, in the sibling NUR-198 repo, already tags its
   questions e1..e5/final/calc/ngn/ati. Those transfer by matching the question
   stem.

NUR 125, NUR 175 and the Leadership / Community / Ethics sets have no exam
source anywhere, so they stay untagged and their buttons stay empty. That is the
honest answer rather than an invented one.
"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
CHECK = '--check' in sys.argv
QUIZ = 'super-mega-quiz.html'
NUR198 = '/home/user/nur-198-study-guide/NUR198 Mega Quiz.html'

EXAM_RE = re.compile(r'Exam ([0-9])|Final')


def norm(t):
    return re.sub(r'\s+', ' ', re.sub('<[^>]+>', '', t or '')).strip().lower()[:110]


def module_pages(course):
    """Every module page for a course, as {module_number: path}."""
    out = {}
    for n in range(1, 15):
        hits = (glob.glob('nur%s-m%d.html' % (course, n)) or
                glob.glob('nur%s-module-%02d-*.html' % (course, n)))
        if hits:
            out[n] = hits[0]
    return out


def exam_of(path):
    """The exam a module page says it belongs to - its most frequent label."""
    s = open(path, encoding='utf-8', errors='ignore').read()
    tally = {}
    for m in EXAM_RE.finditer(s):
        k = 'final' if m.group(0) == 'Final' else 'e' + m.group(1)
        tally[k] = tally.get(k, 0) + 1
    if not tally:
        return None
    return max(tally.items(), key=lambda kv: kv[1])[0]


def module_exam_table():
    t = {}
    for course in ('234', '235', '258'):
        for n, path in module_pages(course).items():
            e = exam_of(path)
            if e:
                t[('NUR' + course, str(n))] = e
    return t


def nur198_tags():
    """stem -> exam, from NUR 198's own quiz. Missing repo is not fatal."""
    if not os.path.exists(NUR198):
        return {}, 'NUR-198 repo not attached'
    s = open(NUR198, encoding='utf-8', errors='ignore').read()
    i = s.index('QUIZ')
    j = s.index('[', i)
    depth, k = 0, j
    while k < len(s):
        if s[k] == '[':
            depth += 1
        elif s[k] == ']':
            depth -= 1
            if depth == 0:
                break
        k += 1
    try:
        bank = json.loads(s[j:k + 1])
    except Exception as e:
        return {}, 'could not parse NUR 198 bank: %s' % str(e)[:60]
    return ({norm(q.get('q')): q['exam'] for q in bank if q.get('exam')},
            '%d tagged questions' % sum(1 for q in bank if q.get('exam')))


def main():
    page = open(QUIZ, encoding='utf-8').read()
    i = page.index('id="qbank"')
    a = page.index('>', i) + 1
    b = page.index('</script>', a)
    bank = json.loads(page[a:b].strip())
    before = len(bank)

    table = module_exam_table()
    tags198, note = nur198_tags()

    from_week = from_198 = 0
    for q in bank:
        if q.get('exam'):
            continue
        key = (q.get('course'), str(q.get('week', '')))
        if key in table:
            q['exam'] = table[key]
            from_week += 1
        elif q.get('course') == 'NUR198':
            e = tags198.get(norm(q.get('q')))
            if e:
                q['exam'] = e
                from_198 += 1

    tagged = sum(1 for q in bank if q.get('exam'))
    per = {}
    for q in bank:
        c = q.get('course')
        per.setdefault(c, [0, 0])
        per[c][1] += 1
        if q.get('exam'):
            per[c][0] += 1

    assert len(bank) == before, 'question count changed'
    values = sorted({q['exam'] for q in bank if q.get('exam')})

    print('module->exam pairs read from module pages: %d' % len(table))
    print('NUR 198 source: %s' % note)
    print('tagged from module: %d    tagged from NUR 198: %d' % (from_week, from_198))
    print('exam values in use: %s' % ', '.join(values))
    print('\n  course    tagged /  total')
    for c in sorted(per, key=lambda c: -per[c][1]):
        got, tot = per[c]
        print('  %-8s %5d / %5d  %3d%%%s'
              % (c, got, tot, round(100 * got / tot), '' if got else '   (no source)'))
    print('\n  TOTAL    %5d / %5d  %d%%' % (tagged, before, round(100 * tagged / before)))

    if CHECK:
        return 0
    out = json.dumps(bank, ensure_ascii=False, separators=(',', ':'))
    open(QUIZ, 'w', encoding='utf-8').write(page[:a] + out + page[b:])
    print('\nwritten')
    return 0


if __name__ == '__main__':
    sys.exit(main())
