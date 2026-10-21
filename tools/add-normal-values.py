#!/usr/bin/env python3
"""Show the normal range beside every value a NUR 234 question gives.

Caroline, 21 Oct: "I would like the normal values in." A question that hands her
a blood pressure, a lab or a newborn's temperature now says, in a yellow line
under the values, what normal is. The ranges are the ones her own pages teach
(module pages, NG pages and the quiz explanations); keep them that way.

Each entry is (a phrase found only in that question's text or stem, the normals
line). The line goes at the end of the stem when the question has one, otherwise
just before the question's last sentence. Every copy is updated: the NUR 234
quiz, the module page and the Mega Quiz. Items that already carry a normals line
are left alone, so the script can run again safely.

    python3 tools/add-normal-values.py           # add any that are missing
    python3 tools/add-normal-values.py --check   # exit 1 if any are missing

Add an entry here when a new question gives a measured value.
"""
import glob, io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPAN = '<span class="normals" style="display:block;margin:8px 0;color:#ffe9a8;font-size:.92em">Normal: %s</span>'
# The Mega Quiz runs question text through rich(), which lets a <span> through only as a bare
# <span class="x">; a style attribute leaves the whole tag escaped and printed as text (21 Oct).
# Its own stylesheet styles .normals instead.
SPAN_BARE = '<span class="normals">Normal: %s</span>'

BP = 'blood pressure below 140/90 (160/110 or higher is severe)'
BP_LOW = 'blood pressure 90/60 up to 140/90'
MAT_P = 'maternal pulse 60 to 100'
MAT_RR = 'respirations 12 to 20'
FHR = 'fetal heart rate 110 to 160 with moderate variability (6 to 25 bpm)'
NB = 'newborn heart rate 110 to 160, respirations 30 to 60, axillary temperature 36.5 to 37.5°C (97.7 to 99.5°F)'
TEMP = 'temperature 36.5 to 37.5°C (97.7 to 99.5°F)'
MG = 'respirations 12 or more, deep tendon reflexes 2+, urine output 30 mL/hr or more'

NORMALS = [
    ('reporting a temperature of 102.4 F', None),  # a vital sign: Caroline wants lab values only
    ('lying flat for an examination. Her BP is 86/52', None),  # a vital sign: Caroline wants lab values only
    ('BP drops from 118/72 to 88/54', None),  # a vital sign: Caroline wants lab values only
    ('CBC results: <b>Hgb 10.8 g/dL, Hct 32%</b>', 'hemoglobin 11 g/dL or higher and hematocrit 33% or higher in the first and third trimesters (10.5 g/dL and 32% in the second)'),
    ('two accelerations of 15 beats per minute lasting 15 seconds within 20 minutes', None),  # a vital sign: Caroline wants lab values only
    ('The fetal heart rate is 155/min, and she asks whether that is all right', None),  # a vital sign: Caroline wants lab values only
    ('the fetal heart rate is 155/min. She asks', None),  # a vital sign: Caroline wants lab values only
    ('Cervical exam is unchanged at <b>1 cm/50% effaced</b>', None),  # a vital sign: Caroline wants lab values only
    ('BP is 88/50 and the fetal heart rate falls to 100 bpm', None),  # a vital sign: Caroline wants lab values only
    ('<b>BP is now 82/48 mm Hg</b> (baseline 122/76)', None),  # a vital sign: Caroline wants lab values only
    ('her blood pressure is now 84/48 mm Hg', None),  # a vital sign: Caroline wants lab values only
    ('2 accelerations in 20 minutes, each increasing the heart rate by 15 beats', None),  # a vital sign: Caroline wants lab values only
    ('the baseline is about 140 bpm with moderate variability, and with each contraction', None),  # a vital sign: Caroline wants lab values only
    ('has absent patellar reflexes. Respirations are 14/min', None),  # a vital sign: Caroline wants lab values only
    ('has a BP of 162/112 and reports right upper quadrant pain', 'platelets 150,000 to 400,000/mm³; liver enzymes AST and ALT within normal limits'),
    ('has been receiving magnesium sulfate for 4 hours', None),  # a vital sign: Caroline wants lab values only
    ('The client reports a persistent headache and right upper quadrant pain. <b>Deep tendon reflexes are', 'urine protein negative to trace'),
    ('has a blood pressure of 158/104 mm Hg, 3+ proteinuria, a severe headache and visual changes', 'urine protein negative to trace'),
    ('has a blood pressure of 146/92 mm Hg on two occasions', None),  # a vital sign: Caroline wants lab values only
    ('Before giving the dose, the nurse finds the maternal heart rate is 128/min', None),  # a vital sign: Caroline wants lab values only
    ('"the worst headache of my life." BP is 162/104', None),  # a vital sign: Caroline wants lab values only
    ('reports a severe headache and seeing spots. BP is 164/100', None),  # a vital sign: Caroline wants lab values only
    ('has a BP of 168/112. She asks', None),  # a vital sign: Caroline wants lab values only
    ('serum magnesium of 6.2 mEq/L', 'magnesium 4 to 7 mEq/L is therapeutic'),
    ('Her contractions stop, and the fetal heart rate drops to 90 bpm', None),  # a vital sign: Caroline wants lab values only
    ('7 contractions in 10 minutes with a uterine resting tone of 20 mmHg', None),  # a vital sign: Caroline wants lab values only
    ('reports a dull backache and pelvic heaviness since morning', None),  # a vital sign: Caroline wants lab values only
    ('On reassessment the nurse finds a maternal heart rate of 128/min', None),  # a vital sign: Caroline wants lab values only
    ("The client's temperature is <b>38.9°C (102°F)</b>", None),  # a vital sign: Caroline wants lab values only
    ("The client's blood pressure is 168/98", None),  # a vital sign: Caroline wants lab values only
    ('temperature is 100.8°F on postpartum day 3', None),  # a vital sign: Caroline wants lab values only
    ("Twelve hours after a vaginal birth, a client's temperature is 37.9", None),  # a vital sign: Caroline wants lab values only
    ('A newborn 1 hour old has an axillary temperature of 36.1 C', None),  # a vital sign: Caroline wants lab values only
    ('Axillary temperature is <b>36.2°C (97.2°F)</b>, blood glucose is 52 mg/dL', 'newborn blood glucose above 40 to 45 mg/dL'),
    ('nurse performs CCHD pulse oximetry screening. The right hand reads 97%', None),  # a vital sign: Caroline wants lab values only
    ('A newborn at 2 hours of age has a respiratory rate of 78/min', None),  # a vital sign: Caroline wants lab values only
    ('Respiratory rate is <b>68/min</b> with grunting', 'newborn blood glucose above 40 to 45 mg/dL'),
    ('total serum bilirubin of 14 mg/dL', 'no visible jaundice in the first 24 hours; physiologic jaundice appears after 24 hours'),
    ('Blood pressure 172/112', 'urine protein negative to trace; platelets 150,000 to 400,000/mm³'),
    ('respirations are 10/min and urine output has been 20 mL over the past hour', None),  # a vital sign: Caroline wants lab values only
    ('Ten minutes later her blood pressure is 84/50 mmHg', None),  # a vital sign: Caroline wants lab values only
    ('Her blood pressure is 88/52 mmHg and her pulse is 122', None),  # a vital sign: Caroline wants lab values only
    ('has a blood pressure of 158/104 mmHg, 3+ proteinuria, a headache that will not go away', 'urine protein negative to trace'),
    ("A newborn's axillary temperature is 36.1°C (97.0°F)", None),  # a vital sign: Caroline wants lab values only
    ('full, firm, painful breasts and a temperature of 37.8°C', None),  # a vital sign: Caroline wants lab values only
    ("A client's blood pressure falls to 86/50 mm Hg 10 minutes after an epidural", None),  # a vital sign: Caroline wants lab values only
    ('receiving IV morphine and has a respiratory rate of 8/min', None),  # a vital sign: Caroline wants lab values only
    ('has a platelet count of 75,000/mm3 and wants pain relief', 'platelets 150,000 to 400,000/mm³'),
]

# Questions whose values sit in the answer choices (Caroline, 21 Oct: "Need to know the
# normal range" on the general-anesthesia platelet question). Keyed on the whole question;
# the line goes after the question, just above the choices.
PP_TEMP = 'temperature 36.5 to 37.5°C (97.7 to 99.5°F); up to 38°C (100.4°F) in the first 24 hours after birth can be dehydration, and 38°C or higher after that is a fever'
PP_LABS = 'WBC can reach 20,000 to 25,000/mm³ after birth; hemoglobin 11 g/dL or higher; platelets 150,000 to 400,000/mm³'
PREG_LABS = 'hemoglobin 11 g/dL or higher, hematocrit 33% or higher; WBC 5,000 to 15,000/mm³ in pregnancy; platelets 150,000 to 400,000/mm³'
HYPER = 'BUN 10 to 20 mg/dL; urine output 30 mL/hr or more; urine ketones negative; moist mucous membranes'
NB_FULL = NB + '; brief pauses in breathing are normal, but apnea over 20 seconds is not; blood glucose above 40 to 45 mg/dL'
CHOICES = [
    ('A nurse reviews vital signs on four clients in the prenatal clinic.', 'hemoglobin 11 g/dL or higher'),
    ('A nurse reviews four fetal monitor strips.', None),  # a vital sign: Caroline wants lab values only
    ('Which client is the best candidate for general anesthesia for a cesarean birth?', 'platelets 150,000 to 400,000/mm³'),
    ('Which finding after an epidural is placed needs the most immediate intervention?', None),  # a vital sign: Caroline wants lab values only
    ('Which findings suggest a ruptured ectopic pregnancy requiring emergency care?', None),  # a vital sign: Caroline wants lab values only
    ('A nurse reviews four clients with hypertensive disorders.', None),  # a vital sign: Caroline wants lab values only
    ('A client is receiving IV magnesium sulfate. Which findings indicate toxicity?', 'magnesium 4 to 7 mEq/L (about 4.8 to 8.4 mg/dL) is therapeutic'),
    ('A nurse on the antepartum unit is caring for four clients who have preeclampsia.', 'urine protein under 300 mg in 24 hours'),
    ('A nurse monitors a client receiving oxytocin. Which findings require the nurse to stop the infusion?', None),  # a vital sign: Caroline wants lab values only
    ('A nurse assesses a client 18 hours postpartum.', 'WBC can reach 20,000 to 25,000/mm³ after birth'),
    ('Which findings in the postpartum period require immediate reporting?', None),  # a vital sign: Caroline wants lab values only
    ('Which finding in the first 24 hours after birth requires the most immediate nursing action?', None),  # a vital sign: Caroline wants lab values only
    ('A nurse assesses four newborns.', None),  # a vital sign: Caroline wants lab values only
    ('Which newborn findings should the nurse report rather than document as expected?', None),  # a vital sign: Caroline wants lab values only
    ('A client is receiving magnesium sulfate. Which assessment finding requires the nurse to stop the infusion', None),  # a vital sign: Caroline wants lab values only
    ('A client is 12 hours postpartum. Which finding should the nurse report?', None),  # a vital sign: Caroline wants lab values only
    ('Which postpartum findings suggest endometritis?', None),  # a vital sign: Caroline wants lab values only
    ('Which newborn findings require the nurse to notify the provider?', None),  # a vital sign: Caroline wants lab values only
    ('A client is receiving magnesium sulfate. Which finding requires the nurse to stop the infusion?', None),  # a vital sign: Caroline wants lab values only
    ('Which finding at a 26-week antenatal visit should the nurse report to the provider?', None),  # a vital sign: Caroline wants lab values only
    ('Which finding should the nurse expect at a routine 18-week assessment?', None),  # a vital sign: Caroline wants lab values only
    ('Which finding in a newborn 12 hr after birth should the nurse report?', 'newborn blood glucose above 40 to 45 mg/dL'),
    ('Which manifestation should the nurse expect in a client who is 1 day postpartum with a vaginal hematoma?', None),  # a vital sign: Caroline wants lab values only
    ('Which finding at a 38-week visit should the nurse report?', None),  # a vital sign: Caroline wants lab values only
    ('Which finding in a client with hyperemesis gravidarum on IV fluids should the nurse report?', 'BUN 10 to 20 mg/dL'),
    ('Which prenatal laboratory result at 12 weeks should the nurse report?', 'hemoglobin 11 g/dL or higher in the first trimester'),
    ('Which newborn should the nurse report to the provider?', 'newborn blood glucose above 40 to 45 mg/dL'),
    ('A client at 30 weeks is receiving magnesium sulfate for preterm labor. Which finding should the nurse report?', None),  # a vital sign: Caroline wants lab values only
    ('A client is receiving IV magnesium sulfate for preeclampsia. Which finding indicates toxicity and should be reported?', None),  # a vital sign: Caroline wants lab values only
    ('A client gave birth 18 hr ago. Which finding indicates a postpartum complication?', None),  # a vital sign: Caroline wants lab values only
    ('A client gave birth vaginally 6 hr ago. Which finding should the nurse report?', 'WBC can reach 20,000 to 25,000/mm³ after birth'),
    ('A newborn is admitted with respiratory distress. Which findings should the nurse report?', None),  # a vital sign: Caroline wants lab values only
    ('A nurse is reviewing antepartum laboratory results. Which result should be reported to the provider?', 'hemoglobin 11 g/dL or higher, hematocrit 33% or higher; WBC 5,000 to 15,000/mm³ in pregnancy; platelets 150,000 to 400,000/mm³'),
    ('A client is 1 day postpartum. Which finding indicates infection?', 'WBC can reach 20,000 to 25,000/mm³ after birth; hemoglobin 11 g/dL or higher; BUN 10 to 20 mg/dL; urine specific gravity 1.005 to 1.030'),
    ('Which finding should the nurse expect while monitoring a client after an amniocentesis?', None),  # a vital sign: Caroline wants lab values only
    ('A client is in the active phase of the first stage of labor. Which finding should the nurse report to the charge nurse?', None),  # a vital sign: Caroline wants lab values only
    ('A client has endometritis 48 hr after a cesarean birth. Which finding should the nurse anticipate?', 'WBC can reach 20,000 to 25,000/mm³ after birth'),
    ('A client is receiving magnesium sulfate. Which finding should the nurse report to the provider?', None),  # a vital sign: Caroline wants lab values only
    ('Which finding contraindicates starting an oxytocin infusion', None),  # a vital sign: Caroline wants lab values only
    ('Which laboratory result in a client who has preeclampsia should the nurse report?', 'platelets 150,000 to 400,000/mm³; hemoglobin 11 g/dL or higher; WBC 5,000 to 15,000/mm³ in pregnancy'),
    ('Which finding should the nurse report in a client who has hyperemesis gravidarum on IV fluids?', 'BUN 10 to 20 mg/dL; urine ketones negative'),
    ('Which laboratory result in a client who is 24 hr postpartum indicates infection?', 'WBC can reach 20,000 to 25,000/mm³ after birth; hemoglobin 11 g/dL or higher; platelets 150,000 to 400,000/mm³'),
    ('Which finding should the nurse expect in a client who has a vaginal hematoma 1 day postpartum?', None),  # a vital sign: Caroline wants lab values only
    ('Which findings should the nurse expect on a routine newborn assessment?', None),  # a vital sign: Caroline wants lab values only
    ('Which finding in a newborn 15 min after birth requires intervention?', None),  # a vital sign: Caroline wants lab values only
    ('A nurse is collecting data from a newborn following birth. Which findings indicate acceptable adaptation', None),  # a vital sign: Caroline wants lab values only
    ('Which finding after an amniocentesis should the nurse report?', None),  # a vital sign: Caroline wants lab values only
]

# (file, the tag that opens its JSON bank, compact dump?)
def banks():
    yield os.path.join(ROOT, 'nur234-quiz.html'), 'id="qbank">', False
    for p in sorted(glob.glob(os.path.join(ROOT, 'nur234-m*.html'))):
        yield p, 'id="qbank" type="application/json">', False
    yield os.path.join(ROOT, 'super-mega-quiz.html'), 'id="qbank">', True


def place(q, line, end=False, bare=False):
    """Put the line at the end of the stem, else before the last sentence of the question."""
    span = (SPAN_BARE if bare else SPAN) % line
    if end:
        q['q'] = q['q'] + ' ' + span
        return
    if q.get('stem'):
        q['stem'] = q['stem'] + span
        return
    t = q['q']
    m = list(re.finditer(r'(?<=[.!?"”])\s+(?=[A-Z"“])', t))
    # "...the nurse take? Select all that apply." keeps the question and its instruction together
    while m and re.match(r'Select (all|both)', t[m[-1].end():]):
        m.pop()
    if m:
        k = m[-1].start()
        q['q'] = t[:k] + ' ' + span + t[m[-1].end():]
    else:
        q['q'] = t + ' ' + span


ENTRIES = [(k, l, False) for k, l in NORMALS] + [(k, l, True) for k, l in CHOICES]


def run(check):
    missing, written, used, stale = 0, 0, set(), 0
    for path, tag, compact in banks():
        if not os.path.exists(path):
            continue
        s = io.open(path, encoding='utf-8').read()
        if tag not in s:
            continue
        i = s.index(tag) + len(tag); j = s.index('</script>', i)
        bank = json.loads(s[i:j])
        items = [q for v in bank.values() for q in v] if isinstance(bank, dict) else bank
        if 'super-mega' in path:
            items = [q for q in items if q.get('course') == 'NUR234']
        n = 0
        if compact:
            for q in items:
                for f in ('q', 'stem'):
                    v = q.get(f) or ''
                    if re.search(r'<span class="normals" style="[^"]*">', v):
                        stale += 1
                        if not check:
                            q[f] = re.sub(r'<span class="normals" style="[^"]*">', '<span class="normals">', v); n += 1
        for q in items:
            text = (q.get('q') or '') + ' ' + (q.get('stem') or '')
            for key, line, end in ENTRIES:
                if key in text:
                    used.add(key)
                    if line is None:
                        for f in ('q', 'stem'):
                            v = q.get(f) or ''
                            mm = re.search(r'<span class="normals"[^>]*>Normal: .*?</span>', v)
                            if mm:
                                stale += 1
                                if not check:
                                    q[f] = (v[:mm.start()].rstrip() + ' ' + v[mm.end():].lstrip()).strip() if f == 'q' else v[:mm.start()] + v[mm.end():]
                                    n += 1
                        break
                    if 'class="normals"' in text:
                        want = (SPAN_BARE if compact else SPAN) % line
                        for f in ('q', 'stem'):
                            v = q.get(f) or ''
                            mm = re.search(r'<span class="normals"[^>]*>Normal: .*?</span>', v)
                            if mm and mm.group(0) != want:
                                stale += 1
                                if not check:
                                    q[f] = v[:mm.start()] + want + v[mm.end():]; n += 1
                        break
                    missing += 1
                    if not check:
                        place(q, line, end, compact); n += 1
                    break
        if n:
            out = json.dumps(bank, ensure_ascii=False, separators=(',', ':')) if compact else json.dumps(bank, ensure_ascii=False)
            io.open(path, 'w', encoding='utf-8').write(s[:i] + out + s[j:])
            written += n
            print('%-28s %d added' % (os.path.basename(path), n))
    unused = [k for k, _, _ in ENTRIES if k not in used]
    for k in unused:
        print('no question matches:', k)
    if check:
        print('%d question copies missing their normal values, %d out of date' % (missing, stale))
        sys.exit(1 if missing or stale or unused else 0)
    print('%d added' % written)


if __name__ == '__main__':
    run('--check' in sys.argv)
