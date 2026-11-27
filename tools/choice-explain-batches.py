#!/usr/bin/env python3
"""Batch the quiz questions whose wrong answer choices have no explanation of their own.

    python3 tools/choice-explain-batches.py OUTDIR [--courses NUR234,NUR235,NUR258] [--size 200] [--report]

Caroline, 27 Nov: the Mega Quiz "doesn't explain why the incorrect choices are incorrect". The
"Incorrect answers" panel (assets/quiz-study/links.js) reads assets/quiz-study/feedback-*.json, where
row.options[i] explains choice i; an empty slot on a wrong choice used to print a stock line instead.
This writes OUTDIR/batch-NN.json files of rows with empty wrong-choice slots, each carrying its course
(matched by prompt against the quizzes and games), for helpers to write the missing explanations.
tools/apply-choice-explanations.py merges their answers back.
"""
import collections
import glob
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)


def norm(s):
    s = html.unescape(re.sub(r'<[^>]+>', '', str(s or ''))).lower()
    s = re.sub(r'select all that apply\.?', '', s)
    return re.sub(r'[^a-z0-9]', '', s)


def course_map():
    """prompt -> (course, topic) from every question source on the site."""
    out = {}
    mega = open('super-mega-quiz.html', encoding='utf-8').read()
    for m in re.finditer(r'\{"q":"((?:[^"\\]|\\.)*)"(.*?)"qid":', mega):
        try:
            q = json.loads('"' + m[1] + '"')
        except ValueError:
            continue
        c = re.search(r'"course":"(NUR\d+|PHARM\w*)"', m[2])
        t = re.search(r'"topic":"((?:[^"\\]|\\.)*)"', m[2])
        if c:
            out.setdefault(norm(q), (c[1], t[1] if t else ''))
    for f, c in (('nur234-quiz.html', 'NUR234'), ('nur235-quiz.html', 'NUR235'), ('nur258-quiz.html', 'NUR258'),
                 ('nur258-qbank.js', 'NUR258')):
        t = open(f, encoding='utf-8').read()
        for m in re.finditer(r'"(?:q|stem|question)"\s*:\s*"((?:[^"\\]|\\.)*)"', t):
            try:
                out.setdefault(norm(json.loads('"' + m[1] + '"')), (c, ''))
            except ValueError:
                pass
    for f in glob.glob('nur23[45]-m*.html') + glob.glob('nur234-m*.html'):
        c = 'NUR' + f[3:6]
        t = open(f, encoding='utf-8').read()
        for m in re.finditer(r'"(?:q|stem|question)"\s*:\s*"((?:[^"\\]|\\.)*)"', t):
            try:
                out.setdefault(norm(json.loads('"' + m[1] + '"')), (c, ''))
            except ValueError:
                pass
    for f in ('game-nursing-game-lab.html', 'game-alien-clinical-rescue.html'):
        t = open(f, encoding='utf-8').read()
        for m in re.finditer(r'"packs":\[([^\]]*)\],"group":"((?:[^"\\]|\\.)*)","category":"((?:[^"\\]|\\.)*)","prompt":"((?:[^"\\]|\\.)*)"', t):
            packs = re.findall(r'"(nur\d+)"', m[1])
            if packs:
                try:
                    out.setdefault(norm(json.loads('"' + m[4] + '"')), (packs[0].upper(), m[3]))
                except ValueError:
                    pass
    return out


def empty_slots(row):
    ans = set(row['answers'])
    opts = row.get('options') or []
    return [i for i, c in enumerate(row['choices'])
            if c not in ans and not (opts[i] if i < len(opts) else None)]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    opt = dict(a[2:].split('=', 1) if '=' in a else (a[2:], '1') for a in sys.argv[1:] if a.startswith('--'))
    courses = set((opt.get('courses') or 'NUR234,NUR235,NUR258').split(','))
    size = int(opt.get('size', 200))
    cmap = course_map()
    picked, tally = [], collections.Counter()
    for f in sorted(glob.glob('assets/quiz-study/feedback-*.json')):
        for qid, row in json.load(open(f, encoding='utf-8')).items():
            slots = empty_slots(row)
            if not slots:
                continue
            course, topic = cmap.get(norm(row.get('prompt')), ('?', ''))
            tally[course] += len(slots)
            if course in courses:
                picked.append(dict(id=qid, course=course, topic=topic, prompt=row.get('prompt'),
                                   choices=row['choices'], answers=row['answers'], why=row.get('why', ''),
                                   explain=slots))
    print('empty wrong-choice slots by course:', dict(tally))
    if 'report' in opt or not args:
        return
    out = args[0]
    os.makedirs(out, exist_ok=True)
    picked.sort(key=lambda r: (r['course'], r['topic'], r['id']))
    for n in range(0, len(picked), size):
        json.dump(picked[n:n + size], open(os.path.join(out, 'batch-%02d.json' % (n // size)), 'w', encoding='utf-8'),
                  ensure_ascii=False, indent=0)
    print('%d questions, %d slots, in %d batches -> %s' % (len(picked), sum(len(r['explain']) for r in picked),
                                                         -(-len(picked) // size), out))


if __name__ == '__main__':
    main()
