#!/usr/bin/env python3
"""Rewrite the hand-written totals that drift: how many quiz questions, how many
cards in the visual library.

Codex's audit (6 Oct 2026) found index.html promising 5,614 questions and 306
graphics while the bank held 5,714 and the gallery 1,178 cards, the quiz page
carrying 5,616 in three places and difficulty chips 750/3,181/1,277 against
753/3,556/1,405. Nothing wrote those numbers, so nothing kept them right.

This reads the two sources - the #qbank JSON on super-mega-quiz.html and the
card attributes on infographics.html - and rewrites every static copy by an
anchored pattern, the way build-lecture-library.py keeps the lecture count on
index.html. Run it after adding questions or cards:

    python3 tools/refresh-site-counts.py          # rewrite
    python3 tools/refresh-site-counts.py --check  # exit 1 if anything is stale

The per-chip numbers on the gallery's filter buttons are a separate job:
node tools/refresh-infographic-counts.mjs drives the page's own filter.
"""
import json, re, sys, collections
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHECK = '--check' in sys.argv

def fmt(n): return f'{n:,}'

# ---- sources ----------------------------------------------------------------
quiz = (ROOT / 'super-mega-quiz.html').read_text(encoding='utf-8')
bank = json.loads(re.search(r'<script type="application/json" id="qbank">(.*?)</script>', quiz, re.S).group(1))
NQ = len(bank)
DIFF = collections.Counter(q.get('diff') for q in bank)

gal = (ROOT / 'infographics.html').read_text(encoding='utf-8')
KIND = collections.Counter(re.findall(r'<div class="card[^"]*" data-kind="([^"]*)"', gal))
NCARDS = sum(KIND.values())
# every Simple Nursing original should link to the page built from it; count the ones that do
NSN_LINKED = sum(1 for c in re.split(r'(?=<div class="card[^"]*" data-kind=")', gal)[1:]
                 if c.startswith('<div class="card') and 'data-kind="sn"' in c[:120] and 'class="snpage"' in c)

print(f'questions {NQ}  easy {DIFF["easy"]} moderate {DIFF["moderate"]} hard {DIFF["hard"]}')
print('cards', NCARDS, dict(KIND), 'sn linked', NSN_LINKED)

# ---- rewrites: (file, pattern, replacement, expected count) -------------------
EDITS = [
    ('index.html', r'<b>[\d,]+ questions</b>', f'<b>{fmt(NQ)} questions</b>', 2),
    ('index.html', r'<div class="sub">[\d,]+ (?:graphics|infographics)(?: &middot; [\d,]+ items)? &middot; searchable</div>',
     f'<div class="sub">{fmt(KIND["infographic"])} infographics &middot; {fmt(NCARDS)} items &middot; searchable</div>', 1),
    ('index.html', r'<b>[\d,]+ of your own (?:robot-nurse )?infographics</b>[^<]*?searchable\. ',
     f'<b>{fmt(KIND["infographic"])} of your own infographics</b>, plus the Simple Nursing originals, handouts, decks and references &mdash; {fmt(NCARDS)} items, grouped by system and searchable. ', 1),
    ('super-mega-quiz.html', r'<span class="total">[\d,]+ questions</span>', f'<span class="total">{fmt(NQ)} questions</span>', 1),
    ('super-mega-quiz.html', r'<b id="poolcount">[\d,]+</b>', f'<b id="poolcount">{fmt(NQ)}</b>', 1),
    ('super-mega-quiz.html', r'<b id="poolcount2">[\d,]+</b>', f'<b id="poolcount2">{fmt(NQ)}</b>', 1),
    ('super-mega-quiz.html', r'Easier \([\d,]+\)', f'Easier ({fmt(DIFF["easy"])})', 1),
    ('super-mega-quiz.html', r'Middling \([\d,]+\)', f'Middling ({fmt(DIFF["moderate"])})', 1),
    ('super-mega-quiz.html', r'Hardest \([\d,]+\)', f'Hardest ({fmt(DIFF["hard"])})', 1),
    ('infographics.html', r'<p class="lede">[^<]*?&mdash;',
     f'<p class="lede">{fmt(KIND["infographic"])} infographics drawn for this site, {fmt(KIND["sn"])} original Simple Nursing PDFs, '
     f'{fmt(KIND["pdf"])} more Simple Nursing handouts, {fmt(KIND["powerpoint"])} PowerPoint decks, '
     f'{fmt(KIND["calc"])} dosage-calculation references and {fmt(KIND["visual"])} visual guides &mdash;', 1),
    ('infographics.html', r'and all [\d,]+ of them carry a link', f'and all {fmt(NSN_LINKED)} of them carry a link', 1),
]

stale = 0
for fn, pat, rep, want in EDITS:
    p = ROOT / fn
    s = p.read_text(encoding='utf-8')
    hits = re.findall(pat, s)
    if len(hits) != want:
        print(f'!! {fn}: pattern {pat!r} matched {len(hits)}, expected {want}')
        stale += 1
        continue
    new = re.sub(pat, lambda m: rep, s)
    if new != s:
        stale += 1
        if CHECK:
            print(f'stale  {fn}: {hits[0][:70]!r} -> {rep[:70]!r}')
        else:
            p.write_text(new, encoding='utf-8')
            print(f'wrote  {fn}: {rep[:90]!r}')

if CHECK:
    print(f'{stale} stale')
    sys.exit(1 if stale else 0)
print('done,', stale, 'file edit(s)')
