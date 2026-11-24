"""Complete, short course-review cards and a progressively enhanced study reader.

The three concise-topics JSON files are the reviewed content source. Original
guide text stays below the cards; this module never serializes an existing page.
"""
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
MAP = {
    '234': {'1': range(1, 5), '2': range(5, 8), '3': range(8, 11), '4': range(11, 14)},
    '235': {'1': range(1, 5), '2': range(5, 8), '3': range(8, 10), '4': range(10, 13)},
    '258': {'1': range(1, 4), '2': range(4, 7), '3': range(7, 9), '4': range(9, 11), '5': range(11, 13)},
}
START, END = '<!-- concise-guide:start -->', '<!-- concise-guide:end -->'
STYLE = '<link rel="stylesheet" href="../assets/study-reviews/concise.css">'
SCRIPT = '<script defer src="../assets/study-reviews/concise.js"></script>'


def e(value):
    return escape(str(value), quote=True)


def catalogue(course):
    return json.loads((ROOT / 'tools' / f'concise-topics-{course}.json').read_text(encoding='utf-8'))


def topics_for(course, exam):
    modules = range(1, 14) if exam == 'F' else MAP[course][exam]
    return sorted((t for t in catalogue(course)['topics'] if int(t['module']) in modules), key=lambda t: int(t['module']))


def href(value):
    return value if re.match(r'https?://', value) else '../' + value.lstrip('/')


def scene_markup(scene):
    """Original vector scenes. The adjacent caption supplies the topic-specific key."""
    shapes = {
        'water': '<path d="M190 80h180l-18 158H208z" fill="#164d68"/><path d="M204 165q40-22 78 0t75 0l-7 63H211z" fill="#65d5e5"/><path d="M244 235l-9 25m47-25v30m39-30 10 25" stroke="#65d5e5" stroke-width="7"/>',
        'shield': '<path d="M280 56l90 34v72q-10 68-90 96-80-28-90-96V90z" fill="#26726a"/><path d="m236 156 30 30 61-68" fill="none" stroke="#ffdc8a" stroke-width="17"/>',
        'gate': '<path d="M188 253V94q92-85 184 0v159" fill="none" stroke="#f0c47d" stroke-width="19"/><path d="M223 102v145m57-160v160m57-145v145" stroke="#7cdaca" stroke-width="12"/><path d="m110 176 60 0m-20-20 20 20-20 20" fill="none" stroke="#ffdc8a" stroke-width="8"/>',
        'growth': '<path d="M280 260V90m0 85-60-42m60 3 62-47" stroke="#7cdaca" stroke-width="13"/><ellipse cx="212" cy="121" rx="40" ry="23" fill="#7cdaca" transform="rotate(30 212 121)"/><ellipse cx="344" cy="85" rx="40" ry="23" fill="#d0a1ee" transform="rotate(-30 344 85)"/><path d="m228 242h104l-15 38h-74z" fill="#c58b65"/>',
        'balance': '<path d="M280 67v185m-64 0h128m-145-149h162m-139 0-35 82h70z m115-82-35 82h70z" fill="#356072" stroke="#ffdc8a" stroke-width="9" stroke-linejoin="round"/><circle cx="280" cy="70" r="18" fill="#7cdaca"/>',
        'airway': '<path d="M268 59v84m24-84v84" stroke="#ffdc8a" stroke-width="12"/><path d="M264 113q-76-29-96 86t95 44V113m33 0q76-29 96 86t-95 44V113" fill="#658db8" stroke="#b6dfeb" stroke-width="4"/><path d="m280 139-64 64m64-64 64 64" stroke="#ffdc8a" stroke-width="10"/>',
        'blood': '<path d="M280 57q-104 115-87 154c24 71 150 71 174 0Q384 172 280 57z" fill="#b34165" stroke="#ffb4c8" stroke-width="5"/><path d="M250 135q-35 35-30 63" fill="none" stroke="#ffccda" stroke-width="12" stroke-linecap="round"/>',
        'clock': '<circle cx="280" cy="163" r="94" fill="#253851" stroke="#ffdc8a" stroke-width="12"/><path d="M280 93v72l50 29" fill="none" stroke="#7cdaca" stroke-width="12" stroke-linecap="round"/><path d="M280 79v17m0 134v17m-84-84h17m134 0h17" stroke="#ffdc8a" stroke-width="6"/>',
        'brain': '<path d="M280 94c-36-62-109-20-94 18-56 26-42 88 0 91-6 60 69 78 94 39 25 39 100 21 94-39 42-3 56-65 0-91 15-38-58-80-94-18z" fill="#8d679c" stroke="#edc6f1" stroke-width="5"/><path d="M280 96v140m-55-117q-27 23 3 42m-32 22q48-15 52 35m86-99q27 23-3 42m32 22q-48-15-52 35" fill="none" stroke="#e8c6eb" stroke-width="6"/>',
        'newborn': '<path d="m192 143 88-54 88 54-20 96q-68 55-136 0z" fill="#7c76af" stroke="#cfc5fb" stroke-width="5"/><circle cx="280" cy="118" r="49" fill="#dba77f"/><path d="m200 163 143 79m17-79-125 82" stroke="#d7d5f8" stroke-width="8"/><circle cx="263" cy="117" r="4" fill="#242133"/><circle cx="297" cy="117" r="4" fill="#242133"/><path d="M268 137q12 10 24 0" fill="none" stroke="#693d40" stroke-width="4"/>',
        'uterus': '<path d="M221 121q59-35 118 0v55q-8 47-47 61v27h-24v-27q-39-14-47-61z" fill="#a85c8a" stroke="#f2bfd9" stroke-width="5"/><path d="M222 132q-53-75-85-14m201 14q53-75 85-14" fill="none" stroke="#f2bfd9" stroke-width="12"/><ellipse cx="141" cy="130" rx="23" ry="16" fill="#ffdc8a"/><ellipse cx="419" cy="130" rx="23" ry="16" fill="#ffdc8a"/>',
        'food': '<circle cx="280" cy="164" r="88" fill="#294c58" stroke="#d2e9e2" stroke-width="11"/><circle cx="280" cy="164" r="65" fill="#387060"/><path d="M280 99v130m-64-65h128" stroke="#b8dfcf" stroke-width="5"/><path d="M159 79v75m-15-75v52q15 36 30 0V79m-15 74v99m245-173v173m0-173q-39 43 0 75" fill="none" stroke="#ffdc8a" stroke-width="8"/>',
        'bones': '<path d="m220 88 97 139c35-3 30 41 2 38-17 33-55 10-46-16L182 117c-35 0-30-43-4-40 16-28 49-11 42 11z" fill="#efdec2" stroke="#bfa987" stroke-width="5"/><path d="m230 150 46-32 44 65-45 30z" fill="#6a87b5" stroke="#d0dafa" stroke-width="5"/><path d="m240 163 46-32m-33 51 46-32" stroke="#d0dafa" stroke-width="5"/>',
        'eye': '<path d="M134 164q146-148 292 0-146 148-292 0z" fill="#e0e8e4" stroke="#7cdaca" stroke-width="7"/><circle cx="280" cy="164" r="57" fill="#446d97"/><circle cx="280" cy="164" r="28" fill="#111d2b"/><circle cx="294" cy="146" r="12" fill="#fff0cb"/>',
        'ear': '<path d="M242 242q-6 34 30 28 36-6 35-39 4-25 31-49 44-42 9-94-44-61-99-19-26 21-24 62" fill="none" stroke="#e8b497" stroke-width="22" stroke-linecap="round"/><path d="M263 130q-3-36 25-35 33 0 29 38-2 22-37 37l-10 31" fill="none" stroke="#f7dbc1" stroke-width="11"/><path d="M157 104q-34 60 0 120m29-102q-19 42 0 84" fill="none" stroke="#7cdaca" stroke-width="6"/>',
        'fire': '<path d="M280 55q29 60 1 81 51-10 49-54 88 91 35 157-48 50-122 21-76-35-30-114 9 23 26 24-29-58 41-115z" fill="#d47758" stroke="#ffcc94" stroke-width="5"/><path d="M284 155q-51 64-24 90 45 30 60-15 10-29-36-75z" fill="#ffdb83"/>',
        'alarm': '<path d="M210 214v-74q0-69 70-69t70 69v74l24 17H186z" fill="#bb8b48" stroke="#ffe0a0" stroke-width="6"/><circle cx="280" cy="249" r="18" fill="#ffdc8a"/><path d="M163 96q-21 43-9 80m243-80q21 43 9 80" fill="none" stroke="#7cdaca" stroke-width="8"/>',
    }
    return shapes.get(scene, shapes['shield'])


SCENE_KEYS = {
    'water': 'The bucket represents fluid balance: follow what enters, leaves, or stays.',
    'shield': 'The shield is the safety priority: protect the patient before the problem grows.',
    'gate': 'The gate represents passage: decide what is blocked or what must stay out.',
    'growth': 'The growing tree represents development: match care to the stage.',
    'balance': 'The scales represent balance: compare the competing findings.',
    'airway': 'The branching airways represent airflow: breathing changes raise the priority.',
    'blood': 'The drop represents blood: connect the finding to oxygen delivery, bleeding, or circulation.',
    'clock': 'The clock represents timing: onset, sequence, and reassessment change the answer.',
    'brain': 'The brain represents function: a change from baseline is a clue.',
    'newborn': 'The wrapped baby represents newborn care: support adaptation and safety.',
    'uterus': 'The uterus represents maternal care: connect the finding to its stage.',
    'food': 'The divided plate represents nutrition: match intake to the clinical need.',
    'bones': 'The supported bone represents movement and protection: check function and circulation.',
    'eye': 'The eye represents vision: a new change deserves assessment.',
    'ear': 'The ear and sound waves represent hearing and balance: protect communication and safety.',
    'fire': 'The flame represents injury: stop ongoing harm and assess what is threatened.',
    'alarm': 'The bell represents a change needing attention: recognize it and act promptly.',
}


def memory_scene(topic):
    scene = topic.get('scene', 'shield')
    meaning = SCENE_KEYS.get(scene, SCENE_KEYS['shield'])
    meaning += (' Imagine: ' + topic['mnemonic']) if topic.get('mnemonic') else (' ' + topic['remember'])
    # A simple scene plus the exact topic key remains legible when magnified.
    path = ROOT / 'assets/study-reviews/topic-cues' / (topic['id'] + '.svg')
    path.parent.mkdir(parents=True, exist_ok=True)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="560" height="320" viewBox="0 0 560 320" role="img" aria-labelledby="title desc">'
           f'<title id="title">{e(topic["title"])} — memory cue</title><desc id="desc">{e(meaning)}</desc>'
           '<rect width="560" height="320" rx="24" fill="#162238"/>'
           '<path d="M24 22h512M24 298h512" stroke="#e4bb75" stroke-width="3"/>'
           '<circle cx="280" cy="165" r="137" fill="#1e3447"/>' + scene_markup(scene) + '</svg>')
    path.write_text(svg, encoding='utf-8')
    url = '../' + path.relative_to(ROOT).as_posix()
    return (f'<figure><a href="{url}"><img src="{url}" width="560" height="320" loading="lazy" alt="{e(meaning)}"></a>'
            f'<figcaption>Study Hub original memory cue · {e(meaning)} <a href="{url}" class="full-size">Open full size</a></figcaption></figure>')


def card(topic, course, handout, memory):
    tid = topic['id']
    points = ''.join(f'<li><strong>{label}</strong> {e(topic[field])}</li>' for field, label in
                     [('recognize', 'Recognize:'), ('act', 'Act:'), ('remember', 'Remember:')])
    source = topic['source']
    covers = topic.get('covers', [])
    coverage = '<p class="sg-covers">Covers: ' + e(' · '.join(covers)) + '</p>' if len(covers) > 1 else ''
    sn = handout(course, topic['sn'], topic.get('sn_note', '')) if topic.get('sn') else '<p class="sg-missing">No matching original Simple Nursing handout found in the current library.</p>'
    if topic.get('handout'):
        v = topic['handout']; src = href(v['src']); target = href(v.get('href', v['src']))
        caption = v.get('caption', 'Simple Nursing original · ' + v.get('title', topic['title']))
        sn = f'<figure><a href="{e(target)}"><img src="{e(src)}" width="{e(v["width"])}" height="{e(v["height"])}" loading="lazy" alt="{e(caption)}"></a><figcaption>{e(caption)} <a href="{e(target)}">Open full size</a></figcaption></figure>'
    for name in topic.get('sn_also', []):
        sn += handout(course, name)
    if topic.get('memory'):
        cue = memory(topic['memory'])
    elif topic.get('visual'):
        v = topic['visual']; src = href(v['src']); target = href(v.get('href', v['src']))
        cue = f'<figure><a href="{e(target)}"><img src="{e(src)}" width="{e(v["width"])}" height="{e(v["height"])}" loading="lazy" alt="{e(v["caption"])}"></a><figcaption>{e(v["caption"])} <a href="{e(target)}">Open full size</a></figcaption></figure>'
    else:
        cue = memory_scene(topic)
    return (f'<article class="sg-topic" id="{e(tid)}" data-topic="{e(tid)}" data-module="{topic["module"]}" tabindex="-1">'
            f'<p class="sg-kicker">Module {topic["module"]}</p><header><h3>{e(topic["title"])}</h3><label class="sg-reviewed"><input type="checkbox" aria-label="Reviewed: {e(topic["title"])}" data-reviewed="{e(tid)}"> Reviewed</label></header>'
            f'<ul class="sg-facts">{points}</ul>{coverage}<details class="sg-visuals"><summary>Pictures + handout</summary><div class="visual-pair">{cue}{sn}</div></details>'
            f'<a class="sg-source" href="{e(href(source))}">Full explanation + source</a></article>')


def reader(course, exam, handout, memory):
    topics = topics_for(course, exam)
    if not topics:
        raise ValueError(f'No concise topics for {course} {exam}')
    modules = sorted(set(int(t['module']) for t in topics))
    checklist_count = sum(len(t.get('covers') or [t['title']]) for t in topics)
    options = ''.join(f'<option value="{m}">Module {m}</option>' for m in modules)
    idx = ''.join(f'<li><a href="#{e(t["id"])}" data-index="{e(t["id"])}"><span class="sg-check" aria-hidden="true"></span>M{t["module"]} · {e(t["title"])}</a></li>' for t in topics)
    titles = {int(m['module']): m['title'] for m in catalogue(course).get('modules', [])}
    groups = []
    for m in modules:
        group = [t for t in topics if int(t['module']) == m]
        title = ' · ' + e(titles[m]) if m in titles else ''
        groups.append(f'<details class="sg-module" data-module="{m}"'+(' open' if m == modules[0] else '')+f'><summary>Module {m}{title} <span>{len(group)} short topics</span></summary>'+''.join(card(t, course, handout, memory) for t in group)+'</details>')
    common = ('<details class="sg-skills"><summary>Every exam: priority + dose checks</summary>'
              '<ul class="sg-facts"><li><strong>Clinical judgment:</strong> Recognize cues → analyze → prioritize → plan → act → evaluate. Compare with baseline; reassess the response.</li>'
              '<li><strong>Dose safety:</strong> Verify patient, allergies, drug, dose, route and time. Use kilograms for weight-based doses; check the safe range and maximum.</li>'
              '<li><strong>Calculate:</strong> Ordered dose ÷ available dose × volume. Example: 250 mg ÷ 125 mg × 5 mL = 10 mL. Clarify an unsafe or unclear order before giving it.</li></ul>'
              '<div class="visual-pair">' + memory('pediatric-dose-checkpoints') + handout('125', 'Med Math Memory Tricks') + '</div>'
              '<a class="sg-source" href="../core/NG-171_med-math-memory-tricks.html">Dose-calculation explanation + practice</a></details>')
    return (START + f'\n<section class="sg-reader" id="quick-guide" data-course="{course}" aria-labelledby="sg-title">'
            f'<h2 id="sg-title">All topics, short answers</h2><p class="sg-intro">{checklist_count} review items · {len(topics)} short cards · in module order. Start with one topic; pictures and extra practice are optional.</p>'
            '<div class="sg-tools" hidden><div class="sg-fields"><label>Find a topic<input type="search" data-search placeholder="Try: bleeding, DKA, safety" autocomplete="off"></label>'
            f'<label>Module<select data-module-filter><option value="all">All modules</option>{options}</select></label></div>'
            '<div class="sg-buttons"><button type="button" data-focus aria-pressed="false">One topic at a time</button><button type="button" data-resume hidden>Resume last topic</button><button type="button" data-expand>Expand all modules</button></div>'
            '<p class="sg-status" role="status" aria-live="polite" aria-atomic="true"></p><p class="sg-storage-note">Checks save on this browser. Reviewing is a study marker, not a quiz score.</p>'
            '<div class="sg-pager" hidden><button type="button" data-prev>← Previous</button><span data-position></span><button type="button" data-next>Next →</button></div></div>'
            f'<details class="sg-index"><summary>Full topic checklist</summary><ul>{idx}</ul></details>'
            '<p class="sg-empty" hidden>No topics found. Try a shorter word or choose All modules.</p>'+''.join(groups)+
            '<div class="sg-bottom" hidden><button type="button" data-prev>← Previous</button><button type="button" data-next>Next topic →</button></div>'
            + common + '<p class="sg-course-note">Course review wording guides the exam answers. Open the linked explanation for assessment details, treatments, and source notes.</p></section>\n'+END)


def enhance(html, course, exam, handout, memory):
    block = reader(course, exam, handout, memory)
    if START in html:
        html = re.sub(re.escape(START) + '.*?' + re.escape(END), lambda _: block, html, flags=re.S)
    else:
        head, tail = html.split('</header>', 1)
        original, rest = tail.rsplit('</main>', 1)
        html = (head + '</header>\n' + block + '\n<details class="sg-extras" id="extra-practice"><summary>Extra practice, pictures + original guide</summary>'
                + original + '</details></main>' + rest)
    if STYLE not in html:
        html = html.replace('</head>', STYLE + '</head>')
    if SCRIPT not in html:
        html = html.replace('</body>', SCRIPT + '</body>')
    return html
