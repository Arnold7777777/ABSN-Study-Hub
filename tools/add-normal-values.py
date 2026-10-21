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

BP = 'blood pressure below 140/90 (160/110 or higher is severe)'
BP_LOW = 'blood pressure 90/60 up to 140/90'
MAT_P = 'maternal pulse 60 to 100'
MAT_RR = 'respirations 12 to 20'
FHR = 'fetal heart rate 110 to 160 with moderate variability (6 to 25 bpm)'
NB = 'newborn heart rate 110 to 160, respirations 30 to 60, axillary temperature 36.5 to 37.5°C (97.7 to 99.5°F)'
TEMP = 'temperature 36.5 to 37.5°C (97.7 to 99.5°F)'
MG = 'respirations 12 or more, deep tendon reflexes 2+, urine output 30 mL/hr or more'

NORMALS = [
    ('reporting a temperature of 102.4 F', TEMP + '; 38°C (100.4°F) or higher is a fever'),
    ('lying flat for an examination. Her BP is 86/52', BP_LOW),
    ('BP drops from 118/72 to 88/54', BP_LOW + ', ' + MAT_P + ', ' + FHR),
    ('CBC results: <b>Hgb 10.8 g/dL, Hct 32%</b>', 'hemoglobin 11 g/dL or higher and hematocrit 33% or higher in the first and third trimesters (10.5 g/dL and 32% in the second)'),
    ('two accelerations of 15 beats per minute lasting 15 seconds within 20 minutes', 'a reactive nonstress test is 2 accelerations of at least 15 bpm lasting at least 15 seconds in 20 minutes; ' + FHR),
    ('The fetal heart rate is 155/min, and she asks whether that is all right', FHR),
    ('the fetal heart rate is 155/min. She asks', FHR),
    ('Cervical exam is unchanged at <b>1 cm/50% effaced</b>', FHR),
    ('BP is 88/50 and the fetal heart rate falls to 100 bpm', BP_LOW + '; ' + FHR),
    ('<b>BP is now 82/48 mm Hg</b> (baseline 122/76)', BP_LOW + '; ' + FHR),
    ('her blood pressure is now 84/48 mm Hg', BP_LOW + '; a drop of 20% or more from her baseline after an epidural is hypotension'),
    ('2 accelerations in 20 minutes, each increasing the heart rate by 15 beats', 'a reactive nonstress test is 2 accelerations of at least 15 bpm lasting at least 15 seconds in 20 minutes; ' + FHR),
    ('the baseline is about 140 bpm with moderate variability, and with each contraction', FHR),
    ('has absent patellar reflexes. Respirations are 14/min', MG + '; magnesium 4 to 7 mEq/L is therapeutic'),
    ('has a BP of 162/112 and reports right upper quadrant pain', BP + '; platelets 150,000 to 400,000/mm³; liver enzymes AST and ALT within normal limits'),
    ('has been receiving magnesium sulfate for 4 hours', MG + '; magnesium 4 to 7 mEq/L is therapeutic'),
    ('The client reports a persistent headache and right upper quadrant pain. <b>Deep tendon reflexes are', BP + '; deep tendon reflexes 2+; urine protein negative to trace'),
    ('has a blood pressure of 158/104 mm Hg, 3+ proteinuria, a severe headache and visual changes', BP + '; urine protein negative to trace'),
    ('has a blood pressure of 146/92 mm Hg on two occasions', BP + '; urine protein negative to trace'),
    ('Before giving the dose, the nurse finds the maternal heart rate is 128/min', MAT_P + '; hold terbutaline for a heart rate above 120'),
    ('"the worst headache of my life." BP is 162/104', BP),
    ('reports a severe headache and seeing spots. BP is 164/100', BP),
    ('has a BP of 168/112. She asks', BP),
    ('serum magnesium of 6.2 mEq/L', 'magnesium 4 to 7 mEq/L is therapeutic; ' + MG),
    ('Her contractions stop, and the fetal heart rate drops to 90 bpm', FHR),
    ('7 contractions in 10 minutes with a uterine resting tone of 20 mmHg', 'no more than 5 contractions in 10 minutes; uterine resting tone 15 mm Hg or less; ' + FHR),
    ('reports a dull backache and pelvic heaviness since morning', TEMP + '; ' + FHR),
    ('On reassessment the nurse finds a maternal heart rate of 128/min', MAT_P + '; hold terbutaline for a heart rate above 120; ' + BP_LOW),
    ("The client's temperature is <b>38.9°C (102°F)</b>", TEMP + '; after the first 24 hours postpartum, 38°C (100.4°F) or higher is a fever'),
    ('The client\'s blood pressure is 168/98', BP + '; methylergonovine is held for hypertension'),
    ("temperature is 100.8°F on postpartum day 3", TEMP + '; after the first 24 hours postpartum, 38°C (100.4°F) or higher is a fever'),
    ('Twelve hours after a vaginal birth, a client\'s temperature is 37.9', TEMP + '; up to 38°C (100.4°F) in the first 24 hours can be dehydration'),
    ('A newborn 1 hour old has an axillary temperature of 36.1 C', NB + '; blood glucose above 40 to 45 mg/dL'),
    ('Axillary temperature is <b>36.2°C (97.2°F)</b>, blood glucose is 52 mg/dL', NB + '; blood glucose above 40 to 45 mg/dL'),
    ('nurse performs CCHD pulse oximetry screening. The right hand reads 97%', 'a pass is 95% or higher in the right hand or a foot, with less than a 3% difference between them'),
    ('A newborn at 2 hours of age has a respiratory rate of 78/min', NB),
    ('Respiratory rate is <b>68/min</b> with grunting', NB + '; blood glucose above 40 to 45 mg/dL'),
    ('total serum bilirubin of 14 mg/dL', 'no visible jaundice in the first 24 hours; physiologic jaundice appears after 24 hours'),
    ('Blood pressure 172/112', BP + '; deep tendon reflexes 2+ with no clonus; urine protein negative to trace; platelets 150,000 to 400,000/mm³'),
    ('respirations are 10/min and urine output has been 20 mL over the past hour', MG),
    ('Ten minutes later her blood pressure is 84/50 mmHg', BP_LOW + '; a drop of 20% or more from her baseline after an epidural is hypotension'),
    ('Her blood pressure is 88/52 mmHg and her pulse is 122', BP_LOW + '; ' + MAT_P),
    ('has a blood pressure of 158/104 mmHg, 3+ proteinuria, a headache that will not go away', BP + '; urine protein negative to trace'),
    ("A newborn's axillary temperature is 36.1°C (97.0°F)", NB),
    ('full, firm, painful breasts and a temperature of 37.8°C', TEMP + '; 38°C (100.4°F) or higher is a fever'),
    ("A client's blood pressure falls to 86/50 mm Hg 10 minutes after an epidural", BP_LOW + '; a drop of 20% or more from her baseline after an epidural is hypotension'),
    ('receiving IV morphine and has a respiratory rate of 8/min', MAT_RR + '; below 12 is respiratory depression'),
    ('has a platelet count of 75,000/mm3 and wants pain relief', 'platelets 150,000 to 400,000/mm³'),
]

# (file, the tag that opens its JSON bank, compact dump?)
def banks():
    yield os.path.join(ROOT, 'nur234-quiz.html'), 'id="qbank">', False
    for p in sorted(glob.glob(os.path.join(ROOT, 'nur234-m*.html'))):
        yield p, 'id="qbank" type="application/json">', False
    yield os.path.join(ROOT, 'super-mega-quiz.html'), 'id="qbank">', True


def place(q, line):
    """Put the line at the end of the stem, else before the last sentence of the question."""
    span = SPAN % line
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
        for q in items:
            text = (q.get('q') or '') + ' ' + (q.get('stem') or '')
            for key, line in NORMALS:
                if key in text:
                    used.add(key)
                    if 'class="normals"' in text:
                        want = SPAN % line
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
                        place(q, line); n += 1
                    break
        if n:
            out = json.dumps(bank, ensure_ascii=False, separators=(',', ':')) if compact else json.dumps(bank, ensure_ascii=False)
            io.open(path, 'w', encoding='utf-8').write(s[:i] + out + s[j:])
            written += n
            print('%-28s %d added' % (os.path.basename(path), n))
    unused = [k for k, _ in NORMALS if k not in used]
    for k in unused:
        print('no question matches:', k)
    if check:
        print('%d question copies missing their normal values, %d out of date' % (missing, stale))
        sys.exit(1 if missing or stale or unused else 0)
    print('%d added' % written)


if __name__ == '__main__':
    run('--check' in sys.argv)
