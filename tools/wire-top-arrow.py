#!/usr/bin/env python3
"""Give every page the back-to-top arrow.

Caroline asked for the purple up arrow (#absnTopBtn) at the lower right of every
page. absn-hidebar.js draws it on the pages that load it; absn-top.js draws it on
its own for everything else. On 11 Nov about 250 pages loaded neither - every
Codex-built folder (study-reviews, transcripts, pediatric-visuals,
visual-mnemonics, course-materials, the modules-1-7 companion pages, the
arcades...) - so they had no arrow at all.

This adds  <script defer src="<relative path>absn-top.js"></script>  before
</body> on any published page that has no arrow yet. Skipped: redirect stubs,
pages that already load absn-hidebar.js or absn-top.js, pages that build the
arrow inline (absnTopBtn), and everything under tools/ (sources, not pages).

  python3 tools/wire-top-arrow.py           add the tag where it is missing
  python3 tools/wire-top-arrow.py --check   exit 1 if any page lacks the arrow
  python3 tools/wire-top-arrow.py --list    list the pages that would change
"""
import os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STUB = re.compile(r'<meta[^>]+http-equiv=["\']?refresh', re.I)
HAS = re.compile(r'absn-hidebar\.js|absn-top\.js|absnTopBtn')
BODY_END = re.compile(r'</body\s*>', re.I)
SKIP_DIRS = ('tools/', 'node_modules/', '.git/', 'vendor/')


def pages():
    out = subprocess.run(['git', 'ls-files', '*.html'], cwd=ROOT, capture_output=True, text=True).stdout.split()
    others = subprocess.run(['git', 'ls-files', '--others', '--exclude-standard', '*.html'],
                            cwd=ROOT, capture_output=True, text=True).stdout.split()
    for rel in sorted(set(out + others)):
        if rel.startswith(SKIP_DIRS) or os.path.basename(rel).startswith('_'):
            continue
        yield rel


def needs(rel, s):
    if STUB.search(s[:3000]) and len(s) < 6000:
        return False
    if HAS.search(s):
        return False
    return bool(BODY_END.search(s))


def tag(rel):
    src = os.path.relpath('absn-top.js', os.path.dirname(rel) or '.').replace(os.sep, '/')
    return '<script defer src="%s"></script>' % src


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ''
    todo = []
    for rel in pages():
        path = os.path.join(ROOT, rel)
        with open(path, encoding='utf-8', errors='surrogateescape') as f:
            s = f.read()
        if needs(rel, s):
            todo.append((rel, path, s))
    if mode in ('--check', '--list'):
        for rel, _, _ in todo:
            print(rel)
        print('%d page(s) without the back-to-top arrow' % len(todo))
        sys.exit(1 if (todo and mode == '--check') else 0)
    for rel, path, s in todo:
        m = list(BODY_END.finditer(s))[-1]
        s = s[:m.start()] + tag(rel) + '\n' + s[m.start():]
        with open(path, 'w', encoding='utf-8', errors='surrogateescape') as f:
            f.write(s)
    print('added the arrow to %d page(s)' % len(todo))


if __name__ == '__main__':
    main()
