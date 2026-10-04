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

## A new lecture: four things, every time

Her rule, stated 28 Sep. Do all four or the lecture is only half filed.

1. **Rename it to the convention.**
   `COURSE_TermYear_Lecturer_Wk##_Day#_Description.mp4`, with `WkNA` / `DayNA`
   where the field is genuinely unknown. The `Wk` number tracks the *module*
   number - `NUR235_..._Wk13_DayNA_Renal and genitourinary.mp4` is module 13.
   Rename in Drive with `update_file`: it changes the title and **not** the
   file id, so every link on the site survives.
2. **A copy in `Nursing School Videos`** (`1umhFpgrpZEorxGn40iN-UKB2JNSw5cTM`).
   This is the folder that carries the link sharing, so this is the copy the
   site must link.
3. **A copy in the course folder's resources subfolder.** The tree is
   `234/235/258 Resources -> NUR 234 -> 234 resources -> NUR234 lectures`
   (`1_UD85m6A02JI2TsOE5YNdYit3lObmlKj`); 235 and 258 mirror it.
4. **Update the lecture library** - `lectures.html`, the module page, both
   module playlists, and the NUR Lecture Library workbook.

Watch for the **same lecture existing twice**, once in a shared folder and
once in `My PC / Downloads`. Link the shared copy. Downloads is not
link-shared, so a link to that copy works for her and shows "You need access"
to everyone else - which is exactly how 171 handouts sat broken unnoticed.

**Check `fileSize` before filing a "new" upload.** An identical byte count means
the same recording re-uploaded under a new name and a new id, not a new lecture -
twice now, at 138,184,233 and at 174,114,280 bytes. File it as a second copy, say
so, and never add it as another recording. It matters most when she uploads a
replacement for a video with no sound: **byte-identical means the sound did not
change either**, so that upload cannot be the fix, whatever it is called.

When she retires a recording, her workbook still names the old file until she
imports a replacement, so put the swap in `build-lecture-library.py`'s `REPLACED`
map (old id -> new id, old name, new name) rather than hand-editing
`lecture-library.html`, which is regenerated. Move the cell's **hyperlink object**
as well as its text: rewriting only `.value` leaves the old target live behind the
new label, which reads as correct and is not.

**An internal hyperlink written with openpyxl also needs `display` set**, or Google
Sheets shows the raw target where the label should be. An xlsx hyperlink stores its
target (`location`) and its text (`display`) separately, and openpyxl does not fill
`display` in from the cell value. On 3 Oct the rebuilt NUR 235 nav read `#gid=359028495`
instead of “→ Fadell” on START HERE and on all four NUR 235 tabs — 25 cells, every one
of them newly written, while the 110 untouched nav cells were fine. So after writing one:

```python
cell.hyperlink = Hyperlink(ref=cell.coordinate, location="'NUR235 Fadell'!A1")
cell.hyperlink.display = cell.value      # without this it renders as #gid=…
```

A `=HYPERLINK(url,"label")` formula carries its own label and never has this problem,
which is why the Zoom Backup rows survived while the buttons beside them did not.

## The Lecture Library workbook: she edits it, so start from the live copy

The "NUR Lecture Library" Google Sheet
(`1baCPjAJu0ZQlZdnApl1AdxmHoKJaaS2qr8lRAyZmScA`, linked from `index.html`) is hers,
and she edits it by hand between sessions — adding chapter numbers, deleting notes
and columns she doesn't want.

So **never rebuild it from a local xlsx**. Export the live sheet first
(`download_file_content` with `exportMimeType` set to the xlsx type), diff it against
what you last uploaded, and build the new version on top of *her* copy. On 9 Sep a
diff caught three of her edits that a straight rebuild would have thrown away.

Deleting a column on one of those tabs also deletes that tab's nav buttons, which sit
in the same columns. If she has done that, tell her rather than silently putting them
back.

**You almost certainly cannot write the change back.** Drive's `update_file` only
touches metadata — there is no content update — so the only route is `create_file`
with the whole workbook as base64, which means reproducing ~46,000 characters exactly
in a tool argument. That failed twice on 9 Sep; the payload gets corrupted in transit.
It also mints a new file id, so `index.html` and her bookmarks have to be repointed.

**The site carries its own copy.** `lecture-library.html` renders the workbook as a page,
by week - she reads on a phone, where a .xlsx is useless. **It mirrors the workbook and
nothing else.** Merging in the 280 recordings that `lectures.html` has and the workbook
does not was tried on 30 Sep and reverted the same day: she asked for week 5 to be
findable, not for a second copy of the whole Lectures page. `lectures.html` is where the
complete list lives. Rebuild it from a fresh
export with `python3 tools/build-lecture-library.py <export.xlsx>`, then
`build-search-index.py`. That tool strips every pointer to the NUR Zoom Backups
workbook and any `zoom.us/rec/share` URL first: **a Zoom share URL is itself the
access credential**, so neither may ever reach the public site. It also repoints
three handouts that were linked through `cdn.fbsbx.com` at her Drive copies - those
Facebook URLs carry an expiring signature, so they rot - and it derives the count on
index.html's card rather than leaving it hand-written.

**A HYPERLINK cell is not always `=HYPERLINK("url","label")`.** When the URL itself
contains a double quote, Sheets writes it concatenated: `=HYPERLINK("...Va"&"Nitz...",
"label")`. A `("[^"]+")` pattern stops at that inner quote and matches nothing, which
silently dropped three links from the page. Parse the arguments and join the string
literals instead.

She could not download a file from the chat, so a small helper Sheet
(`14nh-GeV8ZM3pnlq8pizr-r98QKJie51eSQkaLX11wJI`) sits beside the workbook in Drive
with the rows to paste. `create_file` with `textContent` and `text/csv` works fine
and Drive converts it to a Sheet - that route is small enough not to corrupt.

So for a small change: build and verify it locally, then either hand her the .xlsx
with `SendUserFile` or give her the click-by-click fix for Google Sheets. Nav buttons
are easiest restored by copying `D2:E3` from a sibling tab and pasting — the links and
formatting come with them.

## Image tooling: install it, don't assume it is missing

Nothing image-related is preinstalled — no PIL, no ImageMagick, no `cwebp`, no
`sharp`. On 20 Sep that was read as "this environment cannot resize images" and
eight infographics shipped with no thumbnails. That was wrong: **PyPI is
reachable, so `python3 -m pip install Pillow` works and takes seconds.** Check
by installing, not by looking for what is already there.

**ffmpeg is one pip install away too.** `python3 -m pip install imageio-ffmpeg`
gives ffmpeg 7.0.2 via `imageio_ffmpeg.get_ffmpeg_exe()`, which decodes H.264/AAC
— unlike the bundled Chromium. That makes two things possible that earlier
sessions wrote off as impossible here:

- **Identify a recording by looking at it.** `-ss <sec> -i f.mp4 -frames:v 1 out.png`
  pulls a frame; a title slide or a shared screen names the module outright.
- **Test for missing audio objectively.** `-af volumedetect -f null -` prints
  `mean_volume` and `max_volume`; **both at `-91.0 dB` means digital silence.**
  Two of her Sep 17 clips measured exactly that.

Board previews live in `img/previews/` and the full plate in
`img/infographics/`. The convention is **longest edge 760px, WEBP quality 82** —
cap the *longest* edge, not the width. Most of these plates are portrait, and
capping width instead makes a 760x1075 preview that is **40% heavier** than the
rest of the folder (88 KB against a 29-56 KB median):

```python
im = Image.open(src); W, H = im.size
sc = min(1.0, 760 / max(W, H))
im.convert('RGB').resize((round(W*sc), round(H*sc)), Image.LANCZOS) \
  .save(dst, 'WEBP', quality=82, method=6)
```

**The gallery card's `<img>` must point at the preview and its `<a href>` at the
full plate.** 105 Simple Nursing cards had both pointing at the full file, so
`infographics.html` was serving 11.8 MB of full-size artwork as thumbnails.

Study pages keep the **full-size** image — that is where she reads the detail.
Only the gallery on `infographics.html` uses previews.

## Local testing

```bash
python3 -m http.server 8899          # then drive it with Playwright
```

Playwright: `import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'`
with `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`.

This Chromium has **no proprietary codecs** — H.264/AAC video cannot play or even
load metadata here. Don't diagnose an mp4 as broken on that basis; check the
container directly instead.

## Lecture videos cannot be transcribed from a remote session

The Drive connector only returns files up to about 4 MB; anything bigger drops
the connection ("session expired"). Every lecture is 30 MB to 600 MB, and
drive.google.com and huggingface.co are refused by the egress policy, so there is
no other way to fetch the bytes. (PyPI and GitHub release assets are reachable —
sherpa-onnx plus the Parakeet model run here at about 9x real time — but nothing
can feed them a lecture.)

So transcription runs on Caroline's PC: `TRANSCRIBE_MISSING.bat` and
`TRANSCRIBE_LIST.txt` sit in the Drive "Nursing School Videos" folder, use
whisper.cpp small.en, and write each `.srt` next to its video. Those `.srt`
files sync back and are small enough to read from here. The list holds the 30
Fall 2026 recordings that had no transcript on 20 Sep 2026; add lines to it
(folder name first, one file per line) to queue more.

The only way to peek inside a video from here is Drive's speech index. It
answers match / no match only, never the words, so name guesses made that way
should say so in the file name.

**Use `fullText contains 'term'` on its own** (narrow it with
`mimeType = 'video/mp4'`, never with a title clause). ANDing it with
`title contains '...'` **silently discards the fullText half** and returns every
file that matches the title — proved on 23 Sep with the nonsense term
`zzqxwmplf`, which came back with the whole folder, including two clips that are
digitally silent. A bare query does work: `'hypersensitivity'` returned the NUR
258 Module 3 clip and `Wagner M3D1.mp4`. It pages out past 100 results though, so
a *non*-match proves nothing — never name a file from an absence.

And there is no way at all to fetch a video the connector will not serve:
`drive.google.com` and `drive.usercontent.google.com` both come back **403 at the
egress proxy**, so a file over about 5 MB cannot be downloaded, compressed, timed
or sampled here. The only route for those is `TRANSCRIBE_LIST.txt` below.

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
- **A module page's slot counts are hand-written and drift.** `lectures`,
  `mindmap` and `alt` stay right because scripts write them; `info` had no
  writer, so three pages disagreed with their own cards — module 4 said 7 against
  10. Run `python3 tools/refresh-module-info-counts.py` after adding a card.
  Module 12's `info` count is deliberate: no cards, one inline triage table, so
  the tool skips any slot with nothing to count.

## Her other repos

`drug-guide`, `NUR-125-Fundamentals`, `Laboratory-and-Diagnostic-Tests-for-Nursing`,
`NUR-175-Study-Guide`, `NUR-198-Study-Guide` — all public Pages sites, linked from
this one with `../`.
