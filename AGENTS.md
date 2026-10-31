# Notes for Codex (and any other agent) working on the ABSN Study Hub

Caroline's study site for her ABSN program. Static HTML on GitHub Pages, served from `main`.
Claude keeps the full working notes in `CLAUDE.md`. This file is the short list of rules both
of us follow. Caroline asked for it on 31 Oct 2026, after a large edit dropped parts of the site
without anyone noticing.

## Who reads this site

Caroline is 50, has ADHD and a vision impairment, and reads on a phone with everything magnified.

- Test every page you change at **320px and 390px wide**, not just desktop.
- **Nothing may scroll sideways.** Put wide tables and diagrams in their own `overflow-x:auto` box.
  Let long words and slash-joined phrases wrap (`overflow-wrap:anywhere`).
- Tap targets **at least 44px**, text **at least 12px** (most body text is 16px).
- Contrast meets **WCAG AA**. Composite any translucent background before you measure it.
- Reserve every image's box before it loads (`width`/`height` or `aspect-ratio`), so the page doesn't jump.
- The site is **dark and jewel-toned**. A light "paper" page needs `assets/jewel/jewel.css` linked last
  and `<body class="absn-jewel">`.

## Her content rules (the answer key)

- **Her textbooks are the answer key.** For NUR 234 that's Pillitteri and the ATI Maternal Newborn book;
  for med-surg, the ATI Med-Surg book. A newer guideline may appear as a clearly labelled
  **side note**, never as the answer.
  - Boggy uterus deviated to the right: **empty the bladder first**, then massage.
    Boggy and midline: massage first.
  - PPH and cord prolapse include **oxygen by mask**.
  - Diabetes insipidus sodium is **HIGH (hypernatremia)**. "May be normal" is a side note only.
  - Clear drainage after head trauma or pituitary surgery: **check for glucose and a halo ring**.
    Beta-2 transferrin is a side note.
- **No "APE To Man."** The heart-point mnemonic is **"All People Enjoy Time Magazine"**. The only
  exception is a Simple Nursing handout that prints it.
- A question that gives a **lab** value shows its normal range. Vital signs, fetal heart rate,
  contractions, reflexes and urine output get no normal-range line.

## Never publish these

- **A Zoom share URL, or any pointer to the "NUR Zoom Backups" workbook.** The URL itself is the
  access credential.
- Links to her "My PC / Downloads" copies. Link the copy in a shared Drive folder, or classmates see "You need access".
- `cdn.fbsbx.com` links. They expire.
- Absolute `https://arnold7777777.github.io/...` links between her pages. Use relative links.

## Don't break what the tools write

Many blocks on these pages are written by scripts in `tools/`. They are matched by exact text.

- **Don't re-serialise or reformat pages.** Don't run whole files through an HTML parser and save
  the result. That reorders and lower-cases attributes, turns `data-x` into `data-x=""`, adds `/>`,
  and stops the tools recognising their own blocks. Edit the parts you mean to change.
- **Never delete or hand-edit these generated blocks.** Change the tool's data and re-run it instead.

  | Block | Written by |
  |---|---|
  | `nav.absn-back` bars at the top and bottom of every page | `tools/wire-back-links.py` |
  | Reader layer on Modules 1–7 (`data-sr-added`, `data-sr-inline`, `#sr-config`) | `tools/wire-module-reader.py` |
  | "Play this module" arcade cards | `tools/wire-arcade-cards.py` |
  | Simple Nursing "Preview here" panels | `tools/wire-sn-previews.py` |
  | Visual-references slots and `details.modvis[data-vismod]` panels | `tools/wire-module-visuals.py` |
  | `a.ngx` links on every "NG-###" mention | `tools/wire-ng-xrefs.py` |
  | Yellow `span.normals` lab-range lines | `tools/add-normal-values.py` |
  | `spotify-*.html` pages | `tools/build-spotify-library.py` |
  | `lecture-library.html` | `tools/build-lecture-library.py` |
  | `nur234-flashcards.html` | `tools/build-nur234-flashcards.py` |
  | Counts on the homepage, nav and module slots | `refresh-site-counts.py`, `refresh-nav-counts.py`, `refresh-module-info-counts.py` |

- **After you edit pages, run the checks and fix anything they report:**
  ```bash
  for t in wire-back-links wire-module-reader wire-arcade-cards wire-sn-previews wire-module-visuals \
           wire-ng-xrefs add-normal-values refresh-site-counts refresh-nav-counts refresh-module-info-counts \
           build-spotify-library; do python3 tools/$t.py --check; done
  python3 tools/check-duplicate-ids.py
  python3 tools/build-search-index.py      # nothing is searchable until it is in search-index.json
  ```
- Fix a game item by its `id` and keep the id, or her saved progress detaches.

## Lectures and podcasts

- `lectures.html` is the complete list of her recordings. `lecture-library.html` mirrors her
  "NUR Lecture Library" workbook and nothing else.
- **Never touch her live Google Sheet** (`1baCPjAJu0ZQlZdnApl1AdxmHoKJaaS2qr8lRAyZmScA`). She edits it by hand.
- The **Learn Nursing 101** podcast episodes live only on `spotify-nur125/198/234/235/258/pharmacology.html`.
  She asked that they never share a page with her own recordings.
- A new lecture is named `COURSE_TermYear_Lecturer_Wk##_Day#_Description.mp4`, where the `Wk` number is the
  module number. Use `WkNA`/`DayNA` when a field is unknown, and never guess a lecturer.

## Images

- Gallery previews: `img/previews/`, **longest edge 760px, WEBP quality 82**. The card's `<img>` points
  at the preview and its link at the full image.
- Study pages keep the full-size image.

## Committing

- Stage explicit paths. Never `git add -A`, so half-finished edits don't get published.
- Claude also commits to `main` on this repo. Pull before you push.
