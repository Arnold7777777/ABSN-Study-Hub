# Infographics wanted

For Codex. Each entry says what the plate must **show**, and the one fact it has
to make obvious at a glance. That fact is the reason the plate exists — if a
reader takes nothing else away, it should be that.

Ordered by how much the page needs it. The first seven pages have **no drawn
visual at all**; the rest lean on comparison tables with at most one image.

---

## House spec — applies to every plate

- **Caroline reads these on a phone, magnified.** The plate must be legible at
  **390px** wide, and must not force sideways scrolling at **320px**. Test at
  both before calling one done. This is the single thing existing plates get
  wrong most often.
- **Portrait is fine and usually better.** Most of the folder is portrait.
- **Full plate** goes in `img/infographics/`. **Preview** goes in
  `img/previews/`, longest edge **760px**, WEBP **quality 82** — cap the
  *longest* edge, not the width, or a portrait preview ends up ~40% heavier than
  the rest of the folder.
- **Contrast to WCAG AA**, composited — check the text against what is actually
  behind it, not against the nominal background colour.
- **Text no smaller than 12px** at final size; aim higher.
- Jewel tones, matching the site: amethyst `#9d5cff`, sapphire `#2f6bff`,
  emerald `#12b886`, teal `#00c2c7`, topaz `#ffc233`, ruby `#ff3b6b`, garnet
  `#c02255`, citrine `#ff8a3d`. **Ruby is reserved for never-do and emergency.
  Topaz is reserved for high-yield.**
- Give me a one-paragraph **alt text** with each plate that states the content,
  not "an infographic about X" — the alt text is what the search index reads.

---

## 1. Pages with no visual at all

### Endometriosis — the four ASRM stages
`more/NG-415_endometriosis.html`
Four rungs: **I minimal** (few small shallow implants, little scarring),
**II mild** (more and deeper, minor adhesions), **III moderate** (many deep
implants, endometriomas — the chocolate cysts — significant adhesions),
**IV severe** (widespread deep implants, large endometriomas, dense adhesions
binding organs). A small pelvis diagram per rung showing spread.
**Must make obvious:** the stage describes what the surgeon *sees*, not how much
it *hurts*. Put that on the plate — a stage I can be agonising and a stage IV
almost silent.

### Perioperative — the Aldrete score
`core/NG-416_perioperative-care.html`
Five parameters as a scorecard, each 0/1/2: activity, respiration, circulation,
consciousness, oxygen saturation. Total out of 10, 9 to discharge.
**Must make obvious:** bowel sounds are *not* on it. Show them crossed off.

### Postmortem care — the medical examiner fork
`mh/NG-417_postmortem-care.html`
A two-branch diagram. **Expected death:** remove tubes and lines, wash, clean
gown, dentures in, eyes closed, HOB slightly raised, ID tags on body *and*
shroud. **Medical examiner case:** every tube, line and drain stays, no bathing,
nothing discarded.
**Must make obvious:** in an ME case you touch nothing — the lines are evidence.

### COPD
`resp/NG-414_copd.html`
Emphysema vs chronic bronchitis side by side — the air-trapped barrel chest and
pursed-lip breathing against the productive cough and cyanosis — then the shared
management column.
**Must make obvious:** why pursed-lip breathing works (it splints the airway open
on exhalation so trapped air can leave).

### Sensory disorders — vision & hearing
`neuro/NG-383_sensory-disorders-vision-hearing.html`
Five tables and not one picture — the worst-served page on the site. Show the
visual-field losses as actual pictures of a scene: glaucoma's tunnel, macular
degeneration's central blur, cataract's overall haze, a homonymous hemianopsia.
Then Weber and Rinne as a small paired diagram.
**Must make obvious:** which field loss belongs to which disease, by looking
rather than reading.

### Pediatric medication safety
`peds/NG-410_pediatric-medication-safety.html`
The safe-dose-range calculation as a worked strip: weight in kg → mg/kg/day →
divide by doses → compare to what was prescribed.
**Must make obvious:** the step people skip — multiplying the single dose by the
number of doses *before* comparing to the range.

### The hospitalized child
`peds/NG-412_hospitalized-child.html`
Separation anxiety by stage — protest, despair, detachment — with the age bands
that own each, and what helps at each stage.
**Must make obvious:** detachment looks like a *settled* child, and that is the
worrying one.

---

## 2. Comparison-heavy pages with no drawn diagram

Each of these carries two or more comparison tables and at most one image.

| Plate | Page | Must make obvious |
|---|---|---|
| **Erikson across the lifespan** | `core/NG-349_growth-development.html`, `NG-339_developmental-milestones.html` | Each stage as the crisis it actually is, with the age band — one plate can serve both pages |
| **Fetal heart rate decelerations** | `more/NG-323_fetal-monitoring.html` | Early / late / variable by the *shape and timing* against the contraction — VEAL CHOP made visual |
| **The stages of labor** | `more/NG-324_stages-of-labor.html` | What the cervix is doing in each, and what the nurse watches for |
| **CNS vs PNS** | `neuro/NG-313_cns-vs-pns.html` | Which structures sit where, and why damage to one can recover and the other cannot |
| **Congenital heart defects** | `NG-341_congenital-heart-defects.html` | Which defects shunt left-to-right (acyanotic) and which right-to-left (cyanotic), drawn as flow |
| **Ectopic & molar pregnancy** | `more/NG-326_ectopic-molar-pregnancy.html` | Where an ectopic implants, and what a molar pregnancy looks like on ultrasound |
| **Macular degeneration** | `neuro/NG-311_macular-degeneration.html` | Dry vs wet, and what the Amsler grid looks like when it is abnormal |
| **Immunization schedule** | `core/NG-353_immunizations.html`, `NG-342_immunizations.html` | The childhood schedule as a timeline — one plate for both pages |
| **APGAR** | `more/NG-325_apgar-newborn-assessment.html` | The five signs scored 0/1/2, and what the total means at 1 and 5 minutes |
| **The high-risk newborn** | `more/NG-336_high-risk-newborn.html` | Preterm vs post-term vs SGA vs LGA appearance side by side |
| **Prostate & testicular cancer** | `NG-373_prostate-testicular-cancer.html` | Who gets screened, when, and with what |

---

## 3. Topics with no page yet

These are being written now; each will want a plate once it exists.

- **Chest tubes** — the drainage system's three chambers, what bubbling in each
  means, and what to do when the tube disconnects or comes out.
  *Must make obvious:* continuous bubbling in the water seal is an air leak, and
  tidalling is normal.
- **Abscesses and blocked ducts** — peritonsillar abscess, sialolithiasis,
  pilonidal cyst: where each sits, and the one finding that names it.
  *Must make obvious:* the muffled "hot potato" voice and deviated uvula of a
  peritonsillar abscess.
