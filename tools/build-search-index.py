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

SKIP_DIRS = {'.git', 'node_modules', '.github', 'tools', '.infographic-backups'}
# Pages whose text is a data blob, not prose - indexed as a single page entry.
BLOB = {'super-mega-quiz.html'}

TAG      = re.compile(r'<[^>]+>')
DROP     = re.compile(r'<(script|style|svg|noscript|template)\b.*?</\1\s*>', re.S | re.I)
COMMENT  = re.compile(r'<!--.*?-->', re.S)
TITLE    = re.compile(r'<title[^>]*>(.*?)</title>', re.S | re.I)
REDIRECT = re.compile(r'http-equiv\s*=\s*["\']?refresh', re.I)
# A heading is h1-h4 or a <summary> - this site uses <details>/<summary> heavily.
# h1-h4 and <summary> carry the page structure. Mind maps carry theirs in a
# <figcaption class="mmhub2"> hub plus <h6> column heads, and card decks use
# <h5>; without these, a whole mind map folded into its parent section and
# was cut off at MAXTEXT, so "pull the pinna" was unfindable.
HEAD     = re.compile(r'<(h[1-6]|summary|figcaption)\b([^>]*)>(.*?)</\1\s*>', re.S | re.I)
IDATTR   = re.compile(r'\bid\s*=\s*["\']([^"\']+)["\']', re.I)

MAXTEXT = 520          # chars of body text kept per entry
MINTEXT = 2            # shorter than this and the entry is just a heading

# Chrome that every page carries and no one searches for: the menu, the sticky
# bars, the fold bar, the robot guide. Left in, "Open all sections" matched 28
# pages and the same ATI section names came back 150 times with nothing under
# them (Codex audit F03). Each is an element opener; strip_blocks() removes the
# element to its matching close.
CHROME = re.compile(
    r'<(nav)\b[^>]*>'
    r'|<(div|aside|section|header)\b[^>]*\bid\s*=\s*["\'](?:side|navBtns|absnNav)["\'][^>]*>'
    r'|<(a)\b[^>]*\bclass\s*=\s*["\'][^"\']*\bple-module-skip\b[^"\']*["\'][^>]*>'
    r'|<(div|aside|section|header)\b[^>]*\bclass\s*=\s*["\'][^"\']*\b'
    r'(?:bar|modbar|ple-module-bar|ple-module-actions|focusbar|foldbar|adhd-guide|adhd-index-atlas|absn-robot)\b[^"\']*["\'][^>]*>',
    re.I)
BOILER_PAGES = 10      # a heading on more pages than this, with no text under it, is chrome


def strip_blocks(body):
    """Remove each CHROME element and everything inside it, matching the
    element's own open/close tags so nested divs do not cut it short."""
    out, pos = [], 0
    while True:
        m = CHROME.search(body, pos)
        if not m:
            out.append(body[pos:])
            break
        tag = next(g for g in m.groups() if g).lower()
        out.append(body[pos:m.start()])
        depth, i = 1, m.end()
        pair = re.compile(r'<(/?)%s\b[^>]*>' % tag, re.I)
        while depth:
            n = pair.search(body, i)
            if not n:
                i = len(body)
                break
            depth += -1 if n.group(1) else 1
            i = n.end()
        pos = i
    return ''.join(out)


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
    # tools/ holds the lecture-library template, which is not a page and
    # was showing up in search as one; the backups folder is never public.
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
        body = strip_blocks(DROP.sub(' ', COMMENT.sub(' ', body)))

        # All text and captions in a quiz review belong to the question's stable fragment.
        if rel.replace(os.sep, '/').startswith('study-reviews/quiz-topics/review-'):
            for match in re.finditer(r'<article id="(q-[a-f0-9]+)">\s*<h2>(.*?)</h2>(.*?)</article>', body, re.S):
                anchor, heading, content = match.groups()
                title_text = text_of(heading)
                full = text_of(content)
                entries.append({'p':str(pi), 'h':title_text, 'a':anchor, 't':full})
            continue

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
            if m.group(1).lower() == 'figcaption' and 'mmhub' not in m.group(2):
                continue
            h = text_of(m.group(3))
            full_document = rel.replace(os.sep, '/').startswith('study-reviews/')
            if not h or (len(h) > 180 and not full_document):
                continue
            end = marks[i + 1].start() if i + 1 < len(marks) else len(body)
            t = text_of(body[m.end():end])
            if len(h) > 180:
                t = h + ' ' + t
                h = h[:177] + '...'
            if len(t) < MINTEXT and len(h) < 4:
                continue
            anchor = nearest_id(m.group(0), m.group(2), body[:m.start()])
            # Converted exam documents contain long explanations and comparison
            # cards. Index every passage, rather than losing all text after the
            # first 520 characters of a heading. Other pages retain their shape.
            chunks = [t[:MAXTEXT]]
            if full_document:
                chunks, current = [], ''
                for word in t.split():
                    if current and len(current) + len(word) + 1 > MAXTEXT:
                        chunks.append(current)
                        current = ''
                    current = (current + ' ' + word).strip()
                if current or not chunks:
                    chunks.append(current)
            for chunk in chunks:
                entries.append({'p': str(pi), 'h': h, 'a': anchor, 't': chunk})

    # A learner can also search the wording of questions that share a clinical figure.
    review_file = os.path.join(REPO, 'assets/quiz-study/question-links.json')
    if os.path.isfile(review_file):
        lookup = {page['u']: i for i, page in enumerate(pages)}
        with open(review_file, encoding='utf-8') as file:
            catalogue = json.load(file)['items']
        for bucket in '0123456789abcdef':
            filename = os.path.join(REPO, 'assets/quiz-study/feedback-'+bucket+'.json')
            if not os.path.isfile(filename):
                continue
            with open(filename, encoding='utf-8') as file:
                for ident, explanation in json.load(file).items():
                    target = catalogue[ident][0]
                    if '/review-' in target: continue
                    path, anchor = target.split('#', 1)
                    page_url = BASE + '/'.join(_q(part) for part in path.split('/'))
                    if page_url not in lookup: continue
                    entries.append({'p':str(lookup[page_url]), 'a':anchor, 'h':explanation.get('prompt') or catalogue[ident][1],
                                    't':' '.join([explanation['why'], *explanation['choices'], *filter(None, explanation['options'])])})

    # Second pass: drop what would only be noise in the results.
    #  - a heading with no text under it, when the same heading sits on more
    #    than BOILER_PAGES pages (ATI section names, "QUICK RECALL")
    #  - a second entry on the same page with the same text as one already kept
    #  - "Show 5 more" summaries take their parent's heading, so the hidden
    #    five items are found under the name of the list they belong to
    on_pages = {}
    for e in entries:
        on_pages.setdefault(e['h'], set()).add(e['p'])
    kept, seen, last_h = [], set(), {}
    for e in entries:
        if re.match(r'^(Show|Hide) \d+ (more|these)', e['h']) and e['p'] in last_h:
            e['h'] = last_h[e['p']] + ' \u00b7 more'
        if not e['t'] and len(on_pages.get(e['h'], ())) > BOILER_PAGES:
            continue
        key = (e['p'], e['a'], e['h'], e['t'])
        if key in seen:
            continue
        seen.add(key)
        kept.append(e)
        last_h[e['p']] = e['h']
    dropped = len(entries) - len(kept)
    entries = kept

    out = {'sites': [{'k': SITE, 'n': 'Study Hub'}], 'pages': pages, 'entries': entries}
    dest = os.path.join(REPO, 'search-index.json')
    with open(dest, 'w', encoding='utf-8') as fh:
        json.dump(out, fh, ensure_ascii=False, separators=(',', ':'))
    # The two earlier classes also use a shared search box on the NUR 198 site.
    # Give it just their Hub guides and slide libraries to keep its mobile payload small.
    subset, positions = [], {}
    for pos, page in enumerate(pages):
        match = re.search(r'/nur(175|198)-(?:slides|(?:exam\d+|final)-simple)\.html$', page['u'])
        if match:
            positions[pos] = len(subset)
            subset.append(dict(page, s=match[1]))
    related = [dict(entry, p=positions[int(entry['p'])]) for entry in entries if int(entry['p']) in positions]
    with open(os.path.join(REPO, 'assets/study-reviews/prior-course-search.json'), 'w', encoding='utf-8') as fh:
        json.dump({'pages': subset, 'entries': related}, fh, ensure_ascii=False, separators=(',', ':'))
    print('pages', len(pages), 'entries', len(entries), 'noise dropped', dropped,
          'redirect stubs skipped', skipped_redirect,
          'size MB', round(os.path.getsize(dest) / 1e6, 2))


def _q(s):
    from urllib.parse import quote
    return quote(s, safe="!$&'()*+,-.;=@_~")


main()
