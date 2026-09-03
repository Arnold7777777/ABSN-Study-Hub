#!/usr/bin/env python3
"""Undo one layer of escaping where an entity got escaped twice.

"Death &amp;amp; Dying" renders as "Death &amp; Dying" on the card. The text
was HTML-escaped once when it was already HTML.

Left alone deliberately:
  * anything inside <script> or <style> - a JS string may hold escaped HTML
    on purpose, and unescaping it there would change what the script builds;
  * bedside-tests.html, whose data-find attribute is a lowercased escaped copy
    of each card's markup used only as a search haystack, never rendered.
"""
import os
import re
import sys

SKIP_FILES = {'bedside-tests.html'}
BLOCK = re.compile(r'<(script|style)\b.*?</\1\s*>', re.S | re.I)
DOUBLE = re.compile(r'&amp;(amp|lt|gt|quot|apos|nbsp|middot|mdash|ndash|rsquo|lsquo|'
                    r'ldquo|rdquo|hellip|deg|times|#\d{1,6}|#x[0-9a-fA-F]{1,6});')

total = 0
touched = []
for dirpath, dirnames, filenames in os.walk('.'):
    dirnames[:] = [d for d in dirnames if d not in {'.git', 'node_modules'}]
    for name in sorted(filenames):
        if not name.endswith('.html') or name in SKIP_FILES:
            continue
        path = os.path.join(dirpath, name)
        src = open(path, encoding='utf-8', errors='replace').read()
        if not DOUBLE.search(src):
            continue
        # rebuild around the script/style blocks so they are never rewritten
        out, last, n = [], 0, 0
        for m in BLOCK.finditer(src):
            seg, k = DOUBLE.subn(r'&\1;', src[last:m.start()])
            out.append(seg); out.append(m.group(0)); n += k; last = m.end()
        seg, k = DOUBLE.subn(r'&\1;', src[last:])
        out.append(seg); n += k
        if n:
            if '--dry-run' not in sys.argv:
                open(path, 'w', encoding='utf-8').write(''.join(out))
            touched.append((os.path.relpath(path, '.'), n)); total += n

print(f'{total} double-escaped entities in {len(touched)} files')
for f, n in touched:
    print(f'  {n:4}  {f}')
