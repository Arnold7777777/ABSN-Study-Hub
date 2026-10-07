#!/usr/bin/env python3
"""Report any id used twice on one page.

Codex's audit (6 Oct 2026) found seven <marker id="hsar"> on the NUR 258
infectious-diseases page, seven id="deck" slots on nur258.html, and gradients
defined twice on two skin pages. A duplicated id is a quiet bug: #deck links,
label/for pairs and url(#...) fills all resolve to the first one, and the rest
are unreachable. Checks only; it changes nothing.

    python3 tools/check-duplicate-ids.py            # every html page
    python3 tools/check-duplicate-ids.py a.html ... # just these
"""
import re, sys, collections
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {'.git', 'node_modules', 'tools', 'scratchpad', 'files'}
STRIP = re.compile(r'<script\b.*?</script>|<style\b.*?</style>|<!--.*?-->', re.S | re.I)
ID = re.compile(r'<[a-zA-Z][^>]*?\sid\s*=\s*"([^"]+)"', re.S)

args = [a for a in sys.argv[1:] if not a.startswith('--')]
files = [ROOT / a for a in args] if args else sorted(
    p for p in ROOT.rglob('*.html')
    if not (set(p.relative_to(ROOT).parts[:-1]) & SKIP_DIRS)
    and not any(part.startswith('.') for part in p.relative_to(ROOT).parts))

bad = 0
for p in files:
    text = STRIP.sub('', p.read_text(encoding='utf-8', errors='replace'))
    dup = {k: v for k, v in collections.Counter(ID.findall(text)).items() if v > 1}
    if dup:
        bad += 1
        print(f'{p.relative_to(ROOT)}: ' + ', '.join(f'{k} x{v}' for k, v in sorted(dup.items())))
print(f'{len(files)} pages, {bad} with a duplicated id')
sys.exit(1 if bad else 0)
