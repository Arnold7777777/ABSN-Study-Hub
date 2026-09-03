#!/usr/bin/env python3
"""Build search-index.json for ABSN-Study-Hub.

Run from anywhere:  python3 tools/build-search-index.py
Re-run whenever pages are added, renamed or rewritten - the hub search box on
index.html reads this file, and anything not in it cannot be found.

Same shape as the NUR-198 index so index.html can merge the two:
  {"sites":[{"k","n"}], "pages":[{"s","u","t"}], "entries":[{"p","h","a","t"}]}
"""
import json, os, re, html, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://arnold7777777.github.io/ABSN-Study-Hub/'
SITE = 'hub'

SKIP_DIRS = {'.git', 'node_modules', '.github'}
# Pages whose text is a data blob, not prose - indexed as a single page entry.
BLOB = {'super-mega-quiz.html'}

TAG      = re.compile(r'<[^>]+>')
DROP     = re.compile(r'<(script|style|svg|noscript|template)\b.*?</\1\s*>', re.S | re.I)
COMMENT  = re.compile(r'<!--.*?-->', re.S)
TITLE    = re.compile(r'<title[^>]*>(.*?)</title>', re.S | re.I)
REDIRECT = re.compile(r'http-equiv\s*=\s*["\']?refresh', re.I)
# A heading is h1-h4 or a <summary> - this site uses <details>/<summary> heavily.
HEAD     = re.compile(r'<(h[1-4]|summary)\b([^>]*)>(.*?)</\1\s*>', re.S | re.I)
IDATTR   = re.compile(r'\bid\s*=\s*["\']([^"\']+)["\']', re.I)

MAXTEXT = 520          # chars of body text kept per entry
MINTEXT = 2            # shorter than this and the entry is just a heading


def text_of(chunk):
    chunk = DROP.sub(' ', chunk)
    chunk = COMMENT.sub(' ', chunk)
    chunk = TAG.sub(' ', chunk)
    chunk = html.unescape(chunk)
    return re.sub(r'\s+', ' ', chunk).strip()


def nearest_id(raw, attrs, before):
    """id on the heading itself, else on the element that opens just before it."""
    m = IDATTR.search(attrs)
    if m:
        return m.group(1)
    tail = before[-400:]
    ids = IDATTR.findall(tail)
    return ids[-1] if ids else ''


def walk():
    for dirpath, dirnames, filenames in os.walk(REPO):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for f in sorted(filenames):
            if f.lower().endswith('.html'):
                yield os.path.join(dirpath, f)


def main():
    pages, entries = [], []
    skipped_redirect = 0
    for path in sorted(walk()):
        rel = os.path.relpath(path, REPO)
        try:
            src = open(path, encoding='utf-8', errors='replace').read()
        except OSError:
            continue

        head_src = src[:4000]
        tm = TITLE.search(src)
        title = re.sub(r'\s+', ' ', html.unescape(TAG.sub('', tm.group(1)))).strip() if tm else rel

        # Redirect stubs point at the real page - indexing them makes duplicates.
        if REDIRECT.search(head_src) or 'location.replace' in head_src:
            skipped_redirect += 1
            continue

        url = BASE + '/'.join(_q(p) for p in rel.split(os.sep))
        pi = len(pages)
        pages.append({'s': SITE, 'u': url, 't': title})

        if os.path.basename(rel) in BLOB:
            entries.append({'p': str(pi), 'h': title, 'a': '',
                            't': text_of(src[:6000])[:MAXTEXT]})
            continue

        body = src
        b = re.search(r'<body\b[^>]*>', body, re.I)
        if b:
            body = body[b.end():]
        body = DROP.sub(' ', COMMENT.sub(' ', body))

        marks = list(HEAD.finditer(body))
        if not marks:
            t = text_of(body)
            if t:
                entries.append({'p': str(pi), 'h': title, 'a': '', 't': t[:MAXTEXT]})
            continue

        # Text before the first heading belongs to the page as a whole.
        lede = text_of(body[:marks[0].start()])
        if len(lede) > 40:
            entries.append({'p': str(pi), 'h': title, 'a': '', 't': lede[:MAXTEXT]})

        for i, m in enumerate(marks):
            h = text_of(m.group(3))
            if not h or len(h) > 180:
                continue
            end = marks[i + 1].start() if i + 1 < len(marks) else len(body)
            t = text_of(body[m.end():end])
            if len(t) < MINTEXT and len(h) < 4:
                continue
            entries.append({'p': str(pi), 'h': h,
                            'a': nearest_id(m.group(0), m.group(2), body[:m.start()]),
                            't': t[:MAXTEXT]})

    out = {'sites': [{'k': SITE, 'n': 'Study Hub'}], 'pages': pages, 'entries': entries}
    dest = os.path.join(REPO, 'search-index.json')
    with open(dest, 'w', encoding='utf-8') as fh:
        json.dump(out, fh, ensure_ascii=False, separators=(',', ':'))
    print('pages', len(pages), 'entries', len(entries),
          'redirect stubs skipped', skipped_redirect,
          'size MB', round(os.path.getsize(dest) / 1e6, 2))


def _q(s):
    from urllib.parse import quote
    return quote(s, safe="!$&'()*+,-.;=@_~")


main()
