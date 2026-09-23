#!/usr/bin/env python3
"""Generate lsc-coverage.html - which LSC exam prep sessions are captured.

Why this exists
---------------
On 23 Sep she re-recorded three sessions she already had - Foundations of
Psychiatric Mental Health Nursing, Gas Exchange, and Neurobiological Theories -
because there was no way to see what was already captured without asking. Each
was a real-time playback plus an upload, at three in the morning. In the same
session she asked "what's my delta?" six times, and every answer was assembled
by hand and went stale within the hour.

The data was always on the site: every `<a class="rec">` in lectures.html
carries the Drive id, the module (from its enclosing `<div class="wk">`) and
the Drive filename. It was just spread across fourteen accordions per course.

Generated, never hand-maintained, for the reason `tools/refresh-nav-counts.py`
exists: every hand-kept count here has gone stale - lectures said 390 against
452, NUR 235's quiz said 312 against 315, NUR 258's week rows said 3 against 5.

    python3 tools/build-lsc-coverage.py            # write lsc-coverage.html
    python3 tools/build-lsc-coverage.py --check    # exit 1 if it would change
"""
import glob, html, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = 'lsc-coverage.html'

# Jewel per course, matching the rest of the site.
COURSES = [
    ('nur234', 'NUR 234', 'Maternal &amp; Newborn',    '157,92,255'),
    ('nur235', 'NUR 235', 'Nursing Care of the Child', '0,194,199'),
    ('nur258', 'NUR 258', 'Adult Health II',           '18,184,134'),
    ('nur198', 'NUR 198', 'Adult Health I',            '255,138,61'),
    ('nur175', 'NUR 175', 'Mental Health',             '47,107,255'),
]

# NUR 198 and NUR 175 module names come from her own sibling study-guide repos
# (NUR-198-Study-Guide, NUR-175-Study-Guide); NUR 258's come from the week rows
# in nur258-podcasts.html. NUR 234 and 235 are read from their module pages at
# run time, below, so they cannot drift from the site.
STATIC = {
 'nur198': {1:'Older Adult, Chronic Illness &amp; Disability', 2:'Fluid, Electrolyte &amp; Acid&ndash;Base',
   3:'Perioperative, Pain &amp; Integumentary', 4:'Respiratory I', 5:'Respiratory II', 6:'Respiratory III',
   7:'Cardiac I', 8:'Cardiac II', 9:'Renal &amp; Urinary', 10:'Hepatobiliary',
   11:'Upper GI', 12:'Lower GI', 13:'Musculoskeletal'},
 'nur175': {1:'Foundations, Neurobiology &amp; Psychopharmacology', 2:'Psychosocial Theories &amp; Treatment Settings',
   3:'Therapeutic Relationships &amp; Communication', 4:'Response to Illness &middot; MSE &middot; Suicide',
   5:'Legal &amp; Ethical Issues &middot; Grief &amp; Loss', 6:'Anger, Hostility &amp; Aggression &middot; Abuse',
   7:'Trauma, Stressor-Related &amp; Anxiety Disorders', 8:'Mood Disorders',
   9:'Mood &middot; Suicide &middot; Personality Disorders', 10:'Personality, Eating &amp; Substance Use',
   11:'Somatic Symptom &amp; Neurodevelopmental Disorders', 12:'Disruptive Behaviors &amp; Cognitive Disorders',
   13:'Psychopharmacology'},
 'nur258': {1:'Sensory Disorders &mdash; Eye &amp; Ear', 2:'Infectious Diseases &amp; HIV',
   3:'Allergic, Inflammatory &amp; Immunologic Disorders', 4:'Burns', 5:'Endocrine Disorders', 6:'Diabetes',
   7:'Neurologic Dysfunction &amp; Cerebrovascular Disorders', 8:'Traumatic, Infectious, Oncologic &amp; Degenerative Neuro',
   9:'Hematologic Disorders', 10:'Oncologic Disorders &amp; End-of-Life Care', 11:'Reproductive Disorders',
   12:'Disaster, Mass Casualty &amp; Emergency Nursing', 13:'Shock &amp; MODS', 14:'Final Exam Review'},
}


def read(name):
    with open(os.path.join(ROOT, name), encoding='utf-8') as fh:
        return fh.read()


def module_names(course):
    """Module number -> name. 234/235 are read from their own pages."""
    if course in STATIC:
        return dict(STATIC[course])
    out = {}
    for f in glob.glob(os.path.join(ROOT, course + '-m*.html')):
        t = re.search(r'<title>([^<]*)', read(os.path.basename(f)))
        if not t:
            continue
        m = re.match(r'M(\d+)\s+(.*?)(?:\s*&middot;|\s*·|$)', t.group(1).strip())
        if m:
            out[int(m.group(1))] = m.group(2).strip()
    return out


def is_lsc(title):
    """Does this recording's Drive filename mark it as an LSC exam prep session?

    `_LSC_` catches the renamed ones. "exam prep" catches the rest. The third
    test matters: NUR 258's Module 1 is filed as
    `..._Unknown_Wk01_DayNA_Exam Review Session - Sensory Issues.mp4`, with no
    LSC anywhere in the name. Without it the one course that is actually
    complete reports 4 of 5, which is exactly the kind of wrong number this
    page is supposed to stop.
    """
    if NOT_LSC.search(title):
        return False
    return bool(re.search(r'_LSC_|exam prep|exam review session', title, re.I))


def spans(text, opener):
    """Card boundaries, bounded by the next opener - never by <div> depth.

    These pages contain unbalanced divs; a depth-counted span silently ate
    eight podcast cards when that was tried on 23 Sep.
    """
    st = [m.start() for m in re.finditer(re.escape(opener), text)]
    return [(a, st[i + 1] if i + 1 < len(st) else len(text)) for i, a in enumerate(st)]


# Two NUR 175 sessions carry no week or module marker anywhere - not in the
# filename, not in the module div they are filed under ("Other"). Both are
# Module 1 material: her NUR-175-Study-Guide names M1 "Foundations,
# Neurobiology & Psychopharmacology", and the sessions are titled Foundations
# of Psychiatric Mental Health Nursing and Neurobiological Theories. That is a
# judgement, not something read off the file, so it is written down here rather
# than buried in a regex.
OVERRIDE = {
    '16_2-rpSzjqYL86QvvA4jLel-pniYK-SR': ('nur175', 1),   # Foundations of Psych MH Nursing
    '1gWMxVcfP4zgTbbdk-3bPYd1lrgk50pkX': ('nur175', 1),   # Neurobiological Theories
    # These three are LSC sessions - their title slides read "NUR198 Exam Prep"
    # - but the filenames say neither LSC nor exam prep, so is_lsc() alone
    # would drop them and NUR 198 would under-report by three.
    '1lkxS1eSln_Wjmc0AhJfCiksLFXdKuhuw': ('nur198', 1),   # Chronic Illness and Disability
    '1qb50i9n41mM4qhFLPj8w2e0bbjEUUq0q': ('nur198', 2),   # Fluid and Electrolytes
    '1QAJuu8sY2avKZam-5QJexdwTniN9I83j': ('nur198', 2),   # Acid-Base Balance
}

# A session run by the school's own asynchronous content, Simple Nursing, or a
# prior term is not an LSC exam prep session, however its filename reads.
NOT_LSC = re.compile(r'_Async_|_SimpleNursing_|_StudyHub_|_RegisteredNurseRN_|_PriorTerm_')

KNOWN_COURSES = {c for c, _, _, _ in COURSES}


def module_of(course_hint, div_id, fid, title):
    """Which module a recording belongs to, most reliable signal first."""
    if fid in OVERRIDE:
        return OVERRIDE[fid]
    m = re.search(r'id="([a-z0-9]+)-m(\d+)"', div_id)
    if m:
        return m.group(1), int(m.group(2))
    # an "Other" bucket - fall back to the filename, which now carries Wk/Module
    for pat in (r'_Wk(\d+)_', r'Module (\d+)'):
        w = re.search(pat, title)
        if w:
            return course_hint, int(w.group(1))
    return None, None


def captured():
    """{course: {module_no: [ {id,label,runtime} ]}} from lectures.html."""
    s = read('lectures.html')
    mods = [(m.group(1), m.start()) for m in
            re.finditer(r'<div class="wk [^"]*" id="([a-z0-9]+)-m(\d+)"', s)]
    owners = [(m.group(0), m.start()) for m in
              re.finditer(r'<div class="wk [^"]*" id="([a-z0-9]+)-m?(\w*)"', s)]
    out, seen, unplaced = {}, 0, []
    for a, b in spans(s, '<a class="rec"'):
        seg = s[a:b]
        t = re.search(r'title="([^"]*)"', seg)
        f = re.search(r'/file/d/([^/"?]+)/view', seg)
        if not (t and f):
            continue
        title = html.unescape(t.group(1))
        if f.group(1) not in OVERRIDE and not is_lsc(title):
            continue
        own = [o for o, p in owners if p < a]
        if not own:
            continue
        hint = re.search(r'id="([a-z0-9]+)', own[-1]).group(1)
        course, num = module_of(hint, own[-1], f.group(1), title)
        if course not in KNOWN_COURSES:
            continue                       # a prerequisite course, out of scope
        if num is None:
            unplaced.append(title)
            continue
        label = re.search(r'<span class="rt">(.*?)(?:<span class="rl">|</span>)', seg, re.S)
        label = re.sub(r'<[^>]+>', '', label.group(1)).strip() if label else title
        out.setdefault(course, {}).setdefault(num, []).append(
            {'id': f.group(1), 'label': html.unescape(label), 'title': title})
        seen += 1
    return out, seen, unplaced


PAGE = """<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><link rel="icon" href="favicon.ico" sizes="any"><link rel="icon" type="image/png" href="favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="favicon-180.png">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>LSC exam prep coverage &middot; ABSN Study Hub</title>
<meta name="description" content="Which LSC exam prep sessions are captured, module by module, for every course.">
<style>
:root{--ink:#f2ecff;--soft:#d6c9f2;--muted:#a99cc9;--line:rgba(255,255,255,.22);--gold:#ffd75e}
*{box-sizing:border-box}
body{margin:0;font:17px/1.6 'Segoe UI',system-ui,sans-serif;color:var(--ink);
 background:linear-gradient(165deg,#0d0a1c 0%%,#160f33 55%%,#0b1424 100%%);min-height:100vh;
 padding:18px 16px 70px}
.wrap{max-width:900px;margin:0 auto}
h1{font-size:clamp(1.5rem,5.5vw,2.1rem);margin:.2em 0 .1em;line-height:1.15;overflow-wrap:break-word}
.lede{margin:0 0 6px;font-size:1.02rem;color:var(--soft)}
.tot{display:inline-block;margin:10px 0 22px;padding:9px 15px;border-radius:12px;
 background:rgba(0,0,0,.55);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);
 border:1px solid var(--line);font-weight:800}
.tot b{color:var(--gold)}
.course{margin:0 0 26px;border-radius:18px;padding:16px 16px 10px;
 background:rgba(var(--j),.60);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);
 border:1px solid var(--line);border-left:6px solid rgba(255,255,255,.55);
 box-shadow:0 8px 26px rgba(0,0,0,.38)}
.course h2{margin:0 0 2px;font-size:1.22rem;display:flex;flex-wrap:wrap;gap:9px;align-items:baseline}
.course h2 .sub{font-size:.9rem;font-weight:600;opacity:.85}
.score{display:inline-block;margin:0 0 12px;padding:5px 12px;border-radius:999px;
 background:rgba(0,0,0,.42);font-weight:800;font-size:.95rem}
.score.done{background:rgba(18,184,134,.92);color:#06251a}
ol.mods{list-style:none;margin:0;padding:0}
/* The row background is DARK on every course, with the captured/missing signal
   carried by the left border and the badge - not by tinting the row itself.
   Tinting it green or red over a light jewel (teal, emerald, citrine) pushed
   body text to 3.6:1, under AA, when the alpha was composited against the
   card rather than measured against the colour alone. */
ol.mods li{margin:0 0 7px;border-radius:12px;border:1px solid rgba(255,255,255,.20);
 background:rgba(0,0,0,.52);padding:10px 12px;border-left:6px solid rgba(255,255,255,.35)}
ol.mods li.has{border-left-color:#12b886}
ol.mods li.no{border-left-color:#ff3b6b}
ol.mods li.has .mname::after{content:" ✓";color:#5ff0c0;font-weight:900}
.mnum{display:inline-block;min-width:3.1em;font-weight:900;color:var(--gold)}
.mname{font-weight:700}
.sess{display:block;margin:7px 0 0}
.sess a{display:block;min-height:44px;padding:11px 12px;border-radius:10px;
 background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.26);
 color:#fff;text-decoration:none;font-size:.95rem;line-height:1.45}
.sess a:hover,.sess a:focus{background:rgba(0,0,0,.66);outline:2px solid var(--gold)}
.gap{display:inline-block;margin-top:6px;font-size:.93rem;font-weight:800;color:#ff9db1}
.back{display:inline-flex;min-height:44px;align-items:center;gap:8px;margin:0 0 16px;
 padding:11px 16px;border-radius:13px;background:rgba(0,0,0,.55);color:#fff;
 text-decoration:none;font-weight:800;border:1px solid var(--line)}
.built{margin:26px 0 0;font-size:.9rem;color:var(--muted)}
@media(max-width:400px){body{padding:14px 12px 60px}.mnum{min-width:2.6em}}
</style></head>
<body>
<div class="wrap">
<a class="back" href="index.html">&#127968; Study Hub</a>
<h1>&#127919; LSC exam prep &mdash; what&rsquo;s captured</h1>
<p class="lede">Every module of every course, and whether the exam prep session for it is recorded.
 <b>Check here before you record</b> &mdash; green means you already have it.</p>
<div class="tot"><b>%(total)d</b> sessions captured across <b>%(ncourse)d</b> courses</div>
%(courses)s
<p class="built">Generated from the recording cards on Lectures by
 <code>tools/build-lsc-coverage.py</code> &mdash; it cannot go out of date by hand.
 Last built %(when)s.</p>
</div>
<script src="absn-hidebar.js" defer></script>
</body></html>
"""


def render():
    cap, placed, unplaced = captured()
    assert not unplaced, 'recordings with no module: %s' % unplaced
    blocks, total = [], 0
    for course, label, sub, jewel in COURSES:
        names = module_names(course)
        got = cap.get(course, {})
        total += sum(len(v) for v in got.values())
        rows = []
        for num in sorted(names):
            sess = got.get(num, [])
            cls = 'has' if sess else 'no'
            inner = ''.join(
                '<span class="sess"><a href="https://drive.google.com/file/d/%s/view"'
                ' target="_blank" rel="noopener">&#9654;&#65039; %s</a></span>'
                % (r['id'], html.escape(r['label'])) for r in sess)
            if not sess:
                inner = '<span class="gap">&#9711; not recorded yet</span>'
            rows.append('<li class="%s"><span class="mnum">M%d</span>'
                        '<span class="mname">%s</span>%s</li>' % (cls, num, names[num], inner))
        done = len(got) == len(names)
        blocks.append(
            '<section class="course" style="--j:%s">\n<h2>%s <span class="sub">%s</span></h2>\n'
            '<div class="score%s">%d of %d modules &middot; %d session%s</div>\n'
            '<ol class="mods">\n%s\n</ol>\n</section>'
            % (jewel, label, sub, ' done' if done else '', len(got), len(names),
               sum(len(v) for v in got.values()),
               '' if sum(len(v) for v in got.values()) == 1 else 's',
               '\n'.join(rows)))
    import datetime
    return PAGE % {'total': total, 'ncourse': len(COURSES),
                   'courses': '\n'.join(blocks),
                   'when': datetime.date.today().isoformat()}


def main():
    page = render()
    path = os.path.join(ROOT, OUT)
    old = read(OUT) if os.path.exists(path) else None
    if '--check' in sys.argv:
        print('up to date' if old == page else 'WOULD CHANGE')
        return 0 if old == page else 1
    with open(path, 'w', encoding='utf-8') as fh:
        fh.write(page)
    print('wrote %s (%d bytes)' % (OUT, len(page)))
    return 0


if __name__ == '__main__':
    sys.exit(main())
