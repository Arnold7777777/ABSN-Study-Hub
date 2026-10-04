#!/usr/bin/env python3
"""Bring every page's floating nav (#absnNav) up to the fullest version.

The block is inlined on ~420 pages and drifted into eight versions: some
lost the :focus-visible ring, some the 44px minimum width on phones, and
the subfolder pages still called the gallery "Infographics" after the
root pages moved to "Visual library". Idempotent: run it again and it
changes nothing. --check exits 1 if any page is behind.
"""
import glob, re, sys

CHECK = '--check' in sys.argv
RULES = ('#absnNav{position:fixed;top:9px;right:9px;z-index:99990;display:flex;gap:6px;\n'
         ' font-family:"Segoe UI",Roboto,system-ui,-apple-system,sans-serif}\n'
         '#absnNav a{display:inline-flex;align-items:center;justify-content:center;gap:6px;text-decoration:none;color:#fff;\n'
         ' font-weight:800;font-size:.84rem;line-height:1;padding:9px 13px;min-height:44px;box-sizing:border-box;border-radius:999px;\n'
         ' border:1px solid rgba(255,255,255,.32);box-shadow:0 4px 14px rgba(0,0,0,.42);\n'
         ' white-space:nowrap}\n'
         '#absnNav a.hub{background:linear-gradient(135deg,#0b6656,#0f7d6b)}\n'
         '#absnNav a.ig{background:linear-gradient(135deg,#52277d,#7c3aed)}\n'
         '#absnNav a:hover{filter:brightness(1.15)}\n'
         '#absnNav a:focus-visible{outline:3px solid #ffd76a;outline-offset:2px}\n'
         '@media (max-width:620px){#absnNav .lb{display:none}#absnNav a{padding:9px 11px;min-width:44px}}\n'
         '@media print{#absnNav{display:none!important}}')
SPAN = re.compile(r'#absnNav\{position:fixed.*?@media print\{#absnNav\{display:none!important\}\}', re.S)
LABEL = re.compile(r'(<div id="absnNav">.*?<span class="lb"> )Infographics(</span>)', re.S)

def main():
    stale = 0
    for f in sorted(glob.glob('**/*.html', recursive=True)):
        if f.startswith('.infographic-backups'):
            continue
        s = old = open(f, encoding='utf-8').read()
        if 'id="absnNav"' not in s:
            continue
        s, n = SPAN.subn(lambda m: RULES, s, count=1)
        if n != 1:
            print('%-50s no nav rules found' % f)
            continue
        s = LABEL.sub(r'\1Visual library\2', s, count=1)
        if s != old:
            stale += 1
            if not CHECK:
                open(f, 'w', encoding='utf-8').write(s)
    print('%d page(s) %s' % (stale, 'behind' if CHECK else 'updated'))
    return 1 if (CHECK and stale) else 0

if __name__ == '__main__':
    sys.exit(main())
