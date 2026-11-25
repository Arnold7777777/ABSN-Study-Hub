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
- Exam reviews use indented bullets for facts under a heading, numbered lists for actual sequences,
  and lettered lists for answer choices. Preserve the source's nesting and choice labels.
  Use `assets/study-reviews/guide-outline.css` and the list helpers in `tools/study_outline.py`.
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
  | The back-to-top arrow (`absn-top.js` tag) on pages that don't load `absn-hidebar.js` | `tools/wire-top-arrow.py` |
  | `study-reviews/*-simple.html` exam guides | `tools/build-simple-exams.py` |
  | `transcripts/*.html` lecture transcripts | `tools/build-lecture-transcripts.py` |

- **Quiz pointers go to her guides, not to quiz-made pages** (Caroline, 24 Nov: "a pointer to a location in
  the guides that teaches about the exact item on the questions, preferably an already-established infographic,
  not the ones created for the quiz. The infographic needs to be very closely related"). `assets/quiz-study/links.js`
  no longer adds "Open illustrated review" or links `study-reviews/quiz-topics/`. It shows one link from
  `assets/quiz-study/guide-pointers.json`: "Where this is taught" before she answers, and the named picture or
  guide section after (the name can give the answer away). That file is written by
  `python3 tools/build-quiz-pointers.py --compile` from `tools/quiz-pointers.json`; `--check` verifies it. Please
  don't put the old button back, don't point a question at a page or graphic made for the quiz, and don't
  regenerate `question-links.json` with new ids without re-running the tool (pointers are keyed by those ids).
  To change one pointer, edit its entry in `tools/quiz-pointers.json` and re-compile. A loose match is worse
  than none: when nothing established is truly about the item, leave it `null`.
- **Every page gets the up arrow** (Caroline, 11 Nov: "make all the stuff have up arrows"). The purple
  back-to-top button at the lower right comes from `absn-hidebar.js`, or from `absn-top.js` on a page that
  doesn't load hidebar. About 230 pages from your recent folders had neither: `study-reviews/`,
  `transcripts/`, `pediatric-visuals/`, `visual-mnemonics/`, `course-materials/`, the
  `assets/modules-1-7/visuals/` companion pages, `more/`, the new `neuro/` pages, `thalassemia/`, the arcades.
  An in-page "Back to top" link at the bottom is not a substitute. When you add a page, either load
  `absn-top.js` yourself (path relative to the page, e.g. `<script defer src="../absn-top.js"></script>`
  before `</body>`) or run `python3 tools/wire-top-arrow.py`. If a generator writes the page, put the tag in
  the generator's template, as `build-simple-exams.py`, `build-lecture-transcripts.py`,
  `build-nur234-flashcards.py` and `build-spotify-library.py` now do, or the next rebuild strips it.
- **Re-run `wire-back-links.py` after `build-simple-exams.py` or `build-lecture-transcripts.py`.** Those two
  rewrite their pages from scratch and drop the Study Hub / parent-guide bars (18 pages lost them on 11 Nov
  until it was re-run).

- **After you edit pages, run the checks and fix anything they report:**
  ```bash
  for t in wire-back-links wire-module-reader wire-arcade-cards wire-sn-previews wire-module-visuals \
           wire-ng-xrefs add-normal-values refresh-site-counts refresh-nav-counts refresh-module-info-counts \
           build-spotify-library wire-top-arrow build-quiz-pointers; do python3 tools/$t.py --check; done
  python3 tools/check-duplicate-ids.py
  python3 tools/build-search-index.py      # nothing is searchable until it is in search-index.json
  ```
- Search results show a picture (Caroline, 24 Nov): `tools/resource_search.py` stores each infographic's gallery
  preview and each lecture's Drive thumbnail in `resource-search.json`; `index.html` draws it in a fixed-height box.
- **Click-a-column grid questions** (Caroline, 24 Nov: "can you make it a click a column"). `nur258-quiz.html` and
  `super-mega-quiz.html` carry a `matrix` NGN type beside matching/bowtie: `{"type":"matrix","stem":"<p>…</p>",
  "cols":["Associated","Not associated"],"rows":[{"text":…,"answer":0}],"why":…}`, a real radio table, one 44px cell
  per column, graded per row, with her pick and the right column marked after Check. A "Click a column" Style button
  filters them. `nur258-qbank.js` (the module-page quizzes) has no NGN renderer, so it keeps a select-all copy.
  `build-quiz-pointers.py` reads a matrix item's `stem` as its question text.
- Fix a game item by its `id` and keep the id, or her saved progress detaches.

## Current semester navigation and public exam dates

- NUR 234, 235 and 258 landing pages start with exam number, then numeric module order.
  File topic features inside their module; brachytherapy belongs in NUR 258 Exam 4, Module 10.
  Keep course-wide tools and the full slide catalogue after the exam sections.
- `tools/organize-semester-pages.py` owns the `#course-study-resources.semester-overview` blocks.
  It preserves the existing resource HTML and anchors. Re-run it after changing module labels or dates.
- The public exam calendar uses the reviewed snapshot `assets/calendar/fall-2026.json`.
  Caroline authorized publishing course exam dates only. Never store raw private calendar exports,
  calendar IDs, personal events, credentials, or private feed URLs in this repository.
- Refresh from connected Google Calendar and its Canvas calendar, reconcile newer dated entries
  against old TBA placeholders, retain testing windows, and label due times as deadlines.
  Keep stable public event IDs and update `checkedOn`. This is a manual snapshot, not live private-calendar sync.
- After refreshing dates run `tools/build-exam-calendar.py`, `tools/organize-semester-pages.py`,
  `tools/wire-back-links.py`, and `tools/build-search-index.py`. Verify public ICS date ranges use
  an exclusive end date. Absolute site URLs are needed inside the downloadable calendar and Google
  Calendar event descriptions; ordinary links between website pages remain relative.

## Concise exam guides (NUR 234, 235, 258)

- Cover every Content Review / Key Concept Review item, not a sample of flashcards.
  `tools/concise-topics-234.json`, `-235.json`, and `-258.json` hold the sourced
  topic cards; grouped cards list every original item in `covers`.
- Keep each card brief: **Recognize / Act / Remember**, usually 35–65 words total.
  Keep safety qualifiers and key exam distinctions even when extra words are needed.
- Use official module numbers. NUR 234 Module 11 includes postpartum family and
  newborn nutrition; Module 12 is postpartum complications; Module 13 is normal
  and high-risk newborn care. Legacy module page numbers differ.
- `tools/concise_guides.py` and `assets/study-reviews/concise.css` / `concise.js`
  provide search, the full checklist, optional single-topic viewing, and browser-only
  progress. Keep stable topic IDs so exam and final checks stay connected.
- Keep matching original handouts and original memory visuals with their topic,
  behind an inline Pictures + handout disclosure. Clearly identify missing matches.
  Preserve the existing guide and practice material below the concise cards.
- Run `build-simple-exams.py`, `wire-back-links.py`, `check-concise-guides.py`,
  and the standard checks after edits. NUR 258 Exam 4's original conversion must
  remain intact; the builder updates only its marked concise block.
- Module 11 reproductive illustrations are placed by `wire-module11-inline-visuals.py`
  from `module11-inline-placements.json`. Keep its marked figures beside their
  subject; do not shrink them into thumbnails or add another preview disclosure.
  Preserve original galleries and source/attribution links. Run its `--check` too.

## Lectures and podcasts

- `lectures.html` is the complete list of her recordings. `lecture-library.html` mirrors her
  "NUR Lecture Library" workbook and nothing else.
- **Never touch her live Google Sheet** (`1baCPjAJu0ZQlZdnApl1AdxmHoKJaaS2qr8lRAyZmScA`). She edits it by hand.
- The **Learn Nursing 101** podcast episodes live only on `spotify-nur125/198/234/235/258/pharmacology.html`.
  She asked that they never share a page with her own recordings.
  Each episode also carries a same-topic YouTube video and a no-Spotify MP3 link (`tools/spotify-episodes.json`);
  the workbook gets them as "<class> YouTube" tabs. Edit the JSON and run `tools/build-spotify-library.py`.
- A new lecture is named `COURSE_TermYear_Lecturer_Wk##_Day#_Description.mp4`, where the `Wk` number is the
  module number. Use `WkNA`/`DayNA` when a field is unknown, and never guess a lecturer.
- When you hand her a new spreadsheet, give its direct Drive link (`https://drive.google.com/file/d/<id>/view`),
  never just its name. She asked for this as a rule on 24 Nov.
- Simmons recorded no NUR 258 Week 11 or 12 lecture; her students were sent Halecka's. Don't look for them.
- When she has to run something in Command Prompt, paste the full line as text in your reply. Don't make her open a file to copy it.
- The workbook's "<class> Online" tabs (YouTube and Spotify playlists, textbook chapters first) come from
  `tools/online-playlists.json` via `tools/build-online-tabs.py`; they never reach `lecture-library.html`.

## Images

- For nursing topic reviews, embed the matching original Simple Nursing handout inline beside the relevant explanation. Include an original picmonic-style memory visual inline with the topic. Label each source, retain existing visuals, show the whole image at its natural proportions, and provide a working full-size link. Use a matching handout when available and identify any missing match accurately.
- Gallery previews: `img/previews/`, **longest edge 760px, WEBP quality 82**. The card's `<img>` points
  at the preview and its link at the full image.
- Study pages keep the full-size image.

## Committing

- Stage explicit paths. Never `git add -A`, so half-finished edits don't get published.
- Claude also commits to `main` on this repo. Pull before you push.

- **A recording carded under two modules counts once** (24 Nov). An exam prep that covers M11 and M12 is carded
  in both module blocks on `lectures.html`; `refresh-nav-counts.py` counts distinct `<a class="rec">` links for the
  course and site totals, and `build-lsc-coverage.py` counts distinct Drive ids for its session totals. A module's own
  "N recordings" heading still counts every card in it. Counting cards had put NUR 258 four over.
- **Questions written from lecture transcripts** carry a `src` naming the recording ("NUR 258 Exam 5 review session
  recording (24 Nov)", "NUR 258 Week 12 lecture (Halecka, 19 Nov): ..."). Read the `.srt` from Drive, key the textbook
  where the speaker disagrees (Halecka called trichomoniasis fungal and heat-stroke sodium low; neither went in), and
  add each question to all of its copies: the course quiz, the module bank (`nur258-qbank.js` or the NUR 235 module
  page's `#qbank`) and the Mega Quiz, then `build-quiz-pointers.py --compile`.
- Quiz question text is plain text plus b/i/br/`span class` - never wrap it in `<p>`. Run `python3 tools/check-quiz-markup.py --check` after adding questions.
