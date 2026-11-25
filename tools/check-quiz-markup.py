#!/usr/bin/env python3
"""Flag quiz text that a renderer would print as literal tags (25 Nov 2026).

    python3 tools/check-quiz-markup.py           list problems
    python3 tools/check-quiz-markup.py --check   exit 1 if any

Caroline saw "<p>Which event is an internal disaster for a hospital?</p>" in the Mega Quiz: 103
questions written from lecture transcripts wrapped their text in <p>, and both the Mega Quiz's rich()
and nur258-module.js escape every tag outside a short list. Question text, options and rationales
are plain text plus the tags below. A <p> is now tolerated by both renderers, but keep it out of
the data anyway: the course quizzes put q inside <p class="qtext">, and a <p> inside a <p> is invalid.
"""
import glob, json, os, re, sys

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OK = {'b', 'i', 'em', 'strong', 'code', 'u', 'mark', 'sup', 'sub', 'small', 'br', 'span'}
TAG = re.compile(r'</?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>')


def banks():
    for f in ['nur234-quiz.html', 'nur235-quiz.html', 'nur258-quiz.html'] + sorted(glob.glob(os.path.join(R, 'nur23[45]-m*.html'))):
        p = os.path.join(R, os.path.basename(f))
        s = open(p, encoding='utf-8').read()
        m = re.search(r'<script[^>]*id="qbank"[^>]*>(.*?)</script>', s, re.S)
        if m:
            yield os.path.basename(p), json.loads(m.group(1))
    s = open(os.path.join(R, 'nur258-qbank.js'), encoding='utf-8').read()
    yield 'nur258-qbank.js', json.loads(s[s.index('=') + 1:].strip())
    s = open(os.path.join(R, 'super-mega-quiz.html'), encoding='utf-8').read()
    i = s.find('[{"q"')
    yield 'super-mega-quiz.html', json.JSONDecoder().raw_decode(s, i)[0]


def items(o):
    if isinstance(o, dict):
        if 'q' in o or 'stem' in o:
            yield o
        for v in o.values():
            if isinstance(v, (dict, list)):
                yield from items(v)
    elif isinstance(o, list):
        for v in o:
            yield from items(v)


def rule(name, field):
    """Tags that would print as text (or break the layout) for this bank and field, or None to skip."""
    if name == 'super-mega-quiz.html':
        return OK | {'p'}                 # rich() on every field; it drops <p> since 25 Nov
    if name == 'nur258-qbank.js':
        return (OK | {'p'}) if field == 'q' else None   # questionHtml() on q; options escaped; why raw
    return None if field != 'q' else 'nop'  # course quizzes and NUR 235 modules insert raw: only a <p> in q hurts


def main():
    bad = []
    for name, data in banks():
        for it in items(data):
            texts = [('q', it.get('q'))] + [('option', x) for x in (it.get('o') or it.get('opts') or [])] \
                + [('why', it.get('r') or it.get('why'))]
            for field, t in texts:
                ok = rule(name, field)
                if isinstance(t, str) and ok is not None:
                    found = {m.group(1).lower() for m in TAG.finditer(t)}
                    tags = ({'p'} & found) if ok == 'nop' else (found - ok)
                    if tags:
                        bad.append((name, field, sorted(tags), t[:80]))
    for b in bad:
        print('%s  %s  <%s>  %s' % (b[0], b[1], '> <'.join(b[2]), b[3]))
    print('%d item(s) with tags a renderer would print as text' % len(bad))
    if '--check' in sys.argv:
        sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
