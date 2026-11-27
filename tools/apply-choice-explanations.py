#!/usr/bin/env python3
"""Merge written "why this choice is wrong" explanations into assets/quiz-study/feedback-*.json.

    python3 tools/apply-choice-explanations.py OUT.json [OUT2.json ...] [--dry-run]

Each OUT file is {"explanations": {"<question id>": {"<choice index>": "text"}}, "key_issues": [...]}, as written for
the batches from tools/choice-explain-batches.py. A slot is filled only when it is a wrong choice whose explanation is
empty; an existing explanation is never overwritten. Key issues are not applied here: they are checked by hand and the
fix goes into every copy of the question (quizzes, module banks, games, feedback json).
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
TAG = re.compile(r'<[^>]+>')


def main():
    files = [a for a in sys.argv[1:] if not a.startswith('--')]
    dry = '--dry-run' in sys.argv
    texts = {}
    for f in files:
        for qid, slots in json.load(open(f, encoding='utf-8')).get('explanations', {}).items():
            texts.setdefault(qid, {}).update(slots)
    filled = skipped = unknown = 0
    seen = set()
    for path in sorted(glob.glob('assets/quiz-study/feedback-*.json')):
        data = json.load(open(path, encoding='utf-8'))
        changed = False
        for qid, row in data.items():
            if qid not in texts:
                continue
            seen.add(qid)
            ans = set(row['answers'])
            opts = row.setdefault('options', [])
            while len(opts) < len(row['choices']):
                opts.append('')
            for k, text in texts[qid].items():
                i = int(k)
                text = re.sub(r'\s+', ' ', TAG.sub('', str(text or ''))).strip()
                if i >= len(row['choices']) or row['choices'][i] in ans or opts[i] or not text:
                    skipped += 1
                    continue
                opts[i] = text
                filled += 1
                changed = True
        if changed and not dry:
            json.dump(data, open(path, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    unknown = len(set(texts) - seen)
    print('filled %d, skipped %d (correct choice, already explained or empty text), unknown ids %d%s'
          % (filled, skipped, unknown, ' (dry run)' if dry else ''))


if __name__ == '__main__':
    main()
