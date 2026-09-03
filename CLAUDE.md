# ABSN Study Hub

Caroline's study site for her ABSN program at Joyce University. Static HTML on
GitHub Pages, no build step. ~583 pages.

## Publish to `main` when the work is done

**GitHub Pages serves from `main`.** Work committed to a branch and left there
is not live, however finished it is.

So: when a piece of work is finished and verified, merge it to `main` and push.
Don't wait to be asked. Caroline asked for this explicitly after a session where
thirteen commits sat on a branch while she was about to share the site with her
classmates — the live site still showed fifteen "this recording has been removed"
notices, and she found that out herself.

Keep committing on the working branch, then fast-forward `main` and push both.

## Who this is for

Caroline is 50, has ADHD and a vision impairment, and reads this site on a phone
with everything magnified. That is not a footnote — it decides most calls:

- **Test at 390px and 320px, not just desktop.** Every diagram on the site was
  once unreadable on a phone because it was only ever checked at desktop width.
- **Tap targets ≥ 44px, text ≥ 12px** (aim higher — most body text is 16px).
- **Contrast to WCAG AA**, and composite the alpha when you measure it. Checking
  `color` against a translucent background without compositing gives wrong
  answers in both directions.
- **Nothing may scroll sideways.** Wide things (tables, diagrams) go in their own
  `overflow-x:auto` box.
- **Don't let the page jump while she reads.** Anything lazy-loaded needs its box
  reserved up front — `aspect-ratio` from the file's own dimensions.

## The search box has its own index — rebuild it

`index.html`'s "Search everything" box loads two files: this repo's
`search-index.json` and the sibling `../NUR-198-Study-Guide/search-index.json`.
Nothing is searched live; if a page is not in the index, it cannot be found.

For a long time this repo had no index of its own, so the box searched the five
sibling sites and none of the ~583 pages here. Caroline hit that twice looking
for polycythemia.

So: **after adding, renaming or substantially rewriting pages, run**

```bash
python3 tools/build-search-index.py
```

and commit the regenerated `search-index.json` with the change.

## Local testing

```bash
python3 -m http.server 8899          # then drive it with Playwright
```

Playwright: `import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'`
with `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`.

This Chromium has **no proprietary codecs** — H.264/AAC video cannot play or even
load metadata here. Don't diagnose an mp4 as broken on that basis; check the
container directly instead.

## Traps this codebase has already sprung

- **`font: 900 .8rem inherit` is invalid CSS.** The shorthand needs a real family
  and `inherit` is not one, so the browser discards the whole declaration. 435
  buttons across 332 files were silently rendering at 13.3px Arial 400. Use
  longhand.
- **`absn-hidebar.js` moves sticky bars into the off-canvas menu.** It once
  swallowed the infographic board's search box, hiding a working feature
  completely. Bars containing a form control are now left alone; anything else
  can opt out with `data-absn-keep`.
- **A `1fr` grid track's minimum is its content**, so a wide child stretches the
  whole grid and pushes the page sideways. Use `minmax(0,1fr)`.
- **Long medical words** (Glomerulonephritis, Hyperaldosteronism) overflow their
  headings on a narrow screen without `overflow-wrap:break-word`.
- **Root-level `NG-*.html` pages are redirect stubs** to the real page in
  `essentials/`, `pharm/`, `mh/` etc. Don't edit them as content, and don't
  "fix" a `../drug-guide/` link — that's a real sibling Pages repo of hers.
- **Verify against the rendered page, not the source.** Several bugs here looked
  fine in the HTML and were wrong in the browser.

## Her other repos

`drug-guide`, `NUR-125-Fundamentals`, `Laboratory-and-Diagnostic-Tests-for-Nursing`,
`NUR-175-Study-Guide`, `NUR-198-Study-Guide` — all public Pages sites, linked from
this one with `../`.
