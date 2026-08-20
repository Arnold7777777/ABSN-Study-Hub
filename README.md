# ABSN Study Hub

A static study site for an Accelerated BSN program — quizzes, infographics,
podcasts and review games. No build step, no dependencies: every page is
plain HTML that opens straight in a browser.

**Live site:** https://arnold7777777.github.io/ABSN-Study-Hub/

## Getting around

| Page | What's in it |
| --- | --- |
| `index.html` | Home page — links to everything below |
| `super-mega-quiz.html` | The big one: 3,876 questions across all courses |
| `infographics.html` | Browsable index of all 295 infographic pages |
| `nur234.html`, `nur235.html`, `nur258.html` | Per-course hubs, each with its own quiz and podcasts page |
| `exam1.html` … `exam7.html`, `final.html` | Exam reviews |
| `m1.html` … `m14.html` | Module reviews |
| `games.html` | Review games |
| `pharmacology.html`, `physiology.html` | Subject reviews |

## Infographics

The 295 infographic pages are filed by body system / topic:

`cardio` · `core` · `endo` · `essentials` · `gi` · `mh` (mental health) ·
`more` · `musc` · `neuro` · `pharm` · `renal` · `resp` · `skin`

Each folder has its own `index.html`. Source images live in `ig/`.

## Shared assets

- `absn-adhd-enhanced.css` / `.js` — focus-friendly styling and behaviour applied across the site
- `lib-lucide.js`, `lib-floating-ui.*.js` — vendored icon and tooltip libraries
- `ADHD_REDESIGN_MANIFEST.json` — record of which pages the redesign touched

## Editing

Open any `.html` file in a text editor and save — that's the whole workflow.
To preview locally before pushing:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## A note on links

Some pages link to sibling sites that live in **separate repositories**
(`../drug-guide/`, `../NUR-125-Fundamentals/`, `../NUR-175-Study-Guide/`,
`../NUR-198-Study-Guide/`, `../Laboratory-and-Diagnostic-Tests-for-Nursing/`).
These resolve correctly on GitHub Pages, but they will look broken when you
open files locally, because the neighbouring folders aren't there. That's
expected — nothing to fix.

## Uploading new files

GitHub's web uploader cannot rename or edit files over a few megabytes; a
web-based rename of a large file silently replaces it with an empty stub.
Several of the largest pages here are multi-megabyte, so rename them locally
and push with git instead of using the web UI.
