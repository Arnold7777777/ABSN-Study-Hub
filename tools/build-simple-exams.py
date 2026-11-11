"""Build the simple exam reviews from the course outlines and selected study cases.

Run this script, then wire-back-links.py and build-search-index.py. The published
NUR 258 Exam 4 guide is the original document conversion and is kept separately.
"""
from pathlib import Path
from html import escape
from urllib.parse import urlsplit
import json
import re

from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REVIEWS = ROOT / 'study-reviews'
TOOLS = ROOT / 'tools'
TOPICS = json.loads((TOOLS / 'simple-exam-topics.json').read_text(encoding='utf-8'))
EXAMS = json.loads((TOOLS / 'simple-exams.json').read_text(encoding='utf-8'))
ART = '../assets/study-reviews/atlas/'
MODS = {}
for folder in sorted((ROOT / 'assets').glob('*module-arcade')):
    raw = (folder / 'data.js').read_text(encoding='utf-8').split('=', 1)[1].strip().removesuffix(';')
    for item in json.loads(raw)['modules']:
        MODS[item['id']] = item

def soup(filename):
    return BeautifulSoup((ROOT / filename).read_text(encoding='utf-8'), 'html.parser')

GALLERY = soup('infographics.html').select('#pool .card')
CASES = {
 '234-1': [(4,1),(2,1)], '234-2': [(6,1),(7,1)], '234-3': [(8,4),(10,1)],
 '234-4': [(11,1),(12,1),(14,5)], '234-F': [(4,1),(7,1),(11,1),(14,2)],
 '235-1': [(2,1),(4,1)], '235-2': [(5,1),(6,1),(7,1)], '235-3': [(8,1),(9,4)],
 '235-4': [(10,1),(12,1)], '235-F': [(13,4),(13,5),(9,4),(14,1)],
 '258-1': [(1,1),(2,1)], '258-2': [(4,1),(5,1)], '258-3': [(7,4),(8,1)],
 '258-5': [(11,1),(12,1)], '258-F': [(6,6),(8,1),(9,1),(14,1)],
}
MEMORY_KEYS = {
 'fetal-detour-station':'Three detours route fetal blood around the liver or lungs: ductus venosus, foramen ovale and ductus arteriosus.',
 'pregnancy-evidence-desk':'Sort the clues into three piles: what the patient feels, what an examiner observes, and direct evidence of a fetus.',
 'fetal-monitor-clue-board':'Match the timing to the cause: variable–cord, early–head, late–placenta. Accelerations are generally reassuring.',
 'magnesium-safety-dashboard':'Read the three gauges: breathing, deep tendon reflexes and urine output. A failing gauge calls for reassessment.',
 'postpartum-four-ts':'Tone, trauma, tissue and thrombin name four causes of postpartum bleeding. A firm fundus with persistent bleeding changes the cause you investigate.',
 'newborn-heat-thieves':'Wet skin, a cold surface, a draft and a cold nearby object stand for evaporation, conduction, convection and radiation.',
 'flacc-five-observations':'Score face, legs, activity, cry and consolability. Recheck using the same tool.',
 'play-neighborhood':'Alone, beside, sharing and teaming up distinguish solitary, parallel, associative and cooperative play.',
 'piaget-thinking-workshop':'Move from sensing and doing to pretend play, concrete reasoning, then abstract reasoning.',
 'neutropenia-guard-alarm':'Fewer guards mean fewer infection-fighting neutrophils. The fever alarm calls for urgent oncology assessment.',
 'acid-immune-workshop':'ACID pairs a mechanism with each hypersensitivity type: anaphylactic, cytotoxic, immune complex and delayed.',
 'adh-water-workshop':'Too much ADH holds water. Too little effective ADH lets dilute urine drain away.',
 'autonomic-alarm-tower':'An alarm above the spinal injury meets a trigger below it. Sit upright, check blood pressure and look for bladder distention.',
 'shock-four-failures':'An empty tank, failing pump, widened pipes and a blockage stand for four mechanisms of shock.',
 'bowel':'The telescope folds into itself like the bowel. The peaks and troughs recall intermittent pain; the bell means urgent evaluation.',
 'triage':'In adult START the bell is immediate, the clock delayed, the walker minor and the lamp deceased or expectant as defined by protocol. The arrow means reassess.',
 'tetralogy':'Remember PROVe: pulmonary outflow obstruction, right ventricular hypertrophy, overriding aorta and a ventricular septal defect.',
}
EXTERNAL = {
 '234': ('CDC · Urgent maternal warning signs','https://www.cdc.gov/hearher/maternal-warning-signs/'),
 '235-4': ('Royal Children’s Hospital · Intussusception','https://www.rch.org.au/clinicalguide/guideline_index/intussusception/'),
 '258-5': ('HHS · Adult START triage','https://chemm.hhs.gov/incident-primer/triage/start-triage'),
}

def filename(course, exam):
    part = 'final' if exam=='F' else 'exam'+exam
    return f'nur{course}-{part}-simple.html'

def label(exam):
    return 'Final' if exam=='F' else 'Exam '+exam

def icon(name):
    return f'<svg class="study-icon" aria-hidden="true" focusable="false" width="24" height="24"><use href="{ART}icons.svg#{name}"></use></svg>'

def link(href, title, cls='button'):
    return f'<a class="{cls}" href="{escape(href,quote=True)}">{escape(title)}</a>'

def figure(image, width, height, alt, target, caption, extra=''):
    return (f'<figure><a href="{escape(target,quote=True)}"><img src="{escape(image,quote=True)}" '
            f'width="{width}" height="{height}" loading="lazy" decoding="async" alt="{escape(alt,quote=True)}"></a>'
            f'<figcaption>{escape(caption)} {link(target,"Open full size","full-size")} {extra}</figcaption></figure>')

def handout(course, name):
    for card in GALLERY:
        if card.get('data-cls')!='NUR '+course or not card.h3 or card.h3.get_text(' ',strip=True)!=name:
            continue
        if card.get('data-kind') not in ('pdf','sn'): continue
        image=card.select_one('a.sn-inline-image img, a.deckplate.snprev img')
        original=card.select_one('a.sn-inline-source, a.deckplate.snprev[href*="drive.google.com"]')
        if image and original:
            return figure('../'+image['src'],image['width'],image['height'],'Simple Nursing handout: '+name,
                          original['href'],'Simple Nursing original · '+name)
    raise ValueError(f'No verified handout for {course}: {name}')

def memory(key):
    if not key: return ''
    if key in ('bowel','triage'):
        image='assets/study-reviews/atlas/'+key+'.webp'
        title={'bowel':'Intussusception: the telescoping bowel','triage':'START: four triage tags'}[key]
        markup=''
    else:
        page='pediatric-visuals/tetralogy-of-fallot.html' if key=='tetralogy' else f'visual-mnemonics/{key}.html'
        doc=soup(page)
        im=next((i for i in doc.select('img[src]') if key in i['src']),None)
        if im is None: im=doc.select_one('figure img')
        image=(ROOT/Path(page).parent/urlsplit(im['src']).path).resolve().relative_to(ROOT).as_posix()
        title=doc.h1.get_text(' ',strip=True)
        markup=link('../'+page,'Read the picture key','full-size')
    if (ROOT/image).exists(): w,h=Image.open(ROOT/image).size
    else: w,h=int(im['width']),int(im['height'])
    return figure('../'+image,w,h,title,'../'+image,'Study Hub memory picture · '+title+'. '+MEMORY_KEYS.get(key,''),markup)

def clean(text):
    return BeautifulSoup(text,'html.parser').get_text(' ',strip=True) if '<' in text and re.search(r'<[a-z]',text,re.I) else text

def pair_list(mod):
    # Site-authored recall prompts. Include the prompt as well as the answer so units and context are retained.
    idxs=[1,5,9,14,18,21]
    if mod['id']=='nur235-m12':idxs=[1,3,9,14,18,21]
    if mod['id']=='nur234-m5':idxs=[2,5,9,14,18,21]
    items=[]
    for i in idxs:
        prompt=clean(mod['pairs'][i]['prompt'])
        answer=clean(mod['pairs'][i]['answer'])
        note=' <span class="lab-note">Typical adult serum potassium: 3.5–5.0 mmol/L.</span>' if 'potassium 3.1' in prompt.lower() else ''
        items.append(f'<dt>{escape(prompt)}{note}</dt><dd>{escape(answer)}</dd>')
    return '<dl>'+''.join(items)+'</dl>'

def section(id,title,symbol):
    return f'<h2 id="{id}">{icon(symbol)}{escape(title)}</h2>'

def case_card(course, module, number):
    q=MODS[f'nur{course}-m{module}']['cases'][number-1]
    opts=''.join('<li>'+escape(clean(x))+'</li>' for x in q['opts'])
    ans=' '.join(escape(clean(q['opts'][i])) for i in q['ans'])
    reference=''
    if (course,module,number)==('258',5,1):
        reference='<p class="lab-note">Typical adult references: serum sodium 135–145 mEq/L; urine specific gravity about 1.005–1.030.</p>'
    return (f'<article class="card"><h3>{escape(clean(q["q"]))}</h3>{reference}<ol type="A">{opts}</ol>'
            f'<details><summary>Check the answer and why</summary><p><strong>{ans}</strong></p><p>{escape(clean(q["why"]))}</p></details></article>')

TOP = [('rules','Rules to remember','check'),('clues','See this → think this','scope'),
       ('first','What do I do first?','priority'),('topics','Topics in plain words and pictures','atlas'),
       ('numbers','Numbers and distinctions','numbers'),('practice','Practice and memory cues','memory')]

def render(ex):
    course,exam=ex['course'],ex['exam']; key=course+'-'+exam; final=exam=='F'
    mods=[MODS[f'nur{course}-m{m}'] for m in ex['modules']]
    if final and course in ('235','258'):mods.sort(key=lambda m:m['module']!=13)
    records=[(m,TOPICS[f'{course}-{m["module"]}']) for m in mods]
    art='maternity' if course=='234' else 'mosaic'; display=label(exam)
    title=f'NUR {course} {display} · The simple version'
    hub=f'../nur{course}.html'
    group=hub+('#review-judgment' if course=='234' and final else '#exam-'+('final' if final else exam))
    buttons=link('index.html','All study guides')+link(group,f'NUR {course} · {display} course outline')
    if course=='234' and exam=='3':
        buttons+=link('nur234-exam3-high-yield.html','High-yield review')+link('nur234-exam3-complete.html','Complete 39-page guide')
    parts=[f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} | ABSN Study Hub</title><meta name="description" content="{escape(ex["intro"],quote=True)}"><link rel="stylesheet" href="../assets/study-reviews/study.css"><link rel="stylesheet" href="{ART}atlas.css"></head><body class="jewel-reading"><main id="top">',
           f'<header class="art-hero"><div class="art-copy"><p class="eyebrow">{icon("bookmark")}{title}</p><h1>{escape(ex["title"])}</h1><p class="lead">{escape(ex["intro"])}</p></div><a class="art-plate" href="{ART}{art}.webp" aria-label="Open the Study Hub mosaic full size"><img src="{ART}{art}-small.webp" width="660" height="440" alt="Original Study Hub jewel-tone nursing mosaic"></a><div class="actions">{buttons}</div></header>',
           section('jump','Jump to what you need','compass'),'<nav class="jump">'+''.join(f'<a href="#{k}">{icon(i)}{v}</a>' for k,v,i in TOP)+'</nav>',
           section(*TOP[0]),'<ul>'+''.join('<li>'+escape(t['rule'])+'</li>' for m,t in records)+'</ul>',section(*TOP[1])]
    for m,t in records:
        parts.append(f'<article class="card"><h3>{escape(t["cue"])}</h3><dl><dt>Think…</dt><dd>{escape(t["think"])}</dd></dl></article>')
    parts.append(section(*TOP[2]))
    for m,t in records:
        parts.append(f'<article class="card"><h3>{escape(m["topic"])}</h3><dl><dt>First action</dt><dd>{escape(t["action"])}</dd><dt>Look for a response</dt><dd>{escape(t["outcome"])}</dd></dl></article>')
    parts.append(section(*TOP[3]))
    for m,t in records:
        num=m['module']; view=t['memory']
        if (course,num)==('235',9):view='tetralogy'
        pics=handout(course,t['sn'])+memory(view)
        body=pair_list(m)+f'<div class="visual-pair">{pics}</div><p>{link("../"+m["path"],"Open the full topic and course visuals")}</p>'
        if (course,num)==('234',11):
            body+='<h4>Postpartum changes that need urgent review</h4><dl><dt>Fever, uterine tenderness and foul-smelling lochia</dt><dd>Think endometritis. Assess vital signs and notify the obstetric team for evaluation and prescribed treatment.</dd><dt>Unilateral leg swelling and pain</dt><dd>Suspect a clot. Avoid massaging the leg and obtain urgent assessment. New chest pain or breathlessness requires an emergency response.</dd><dt>Hallucinations, delusions or thoughts of harming the baby</dt><dd>Keep the parent and baby safe with supervision and obtain emergency psychiatric and medical help.</dd></dl>'
        if (course,num)==('258',8):
            body+='<h4>Compare the neurologic cues</h4><dl><dt>Fluctuating double vision, drooping lids or weakness that worsens with use</dt><dd>Think myasthenia gravis. A weak cough, difficulty swallowing or shallow breathing calls for urgent respiratory assessment.</dd><dt>Episodes of neurologic deficits separated in time</dt><dd>Consider multiple sclerosis. Compare function with baseline and review infection or overheating when symptoms worsen.</dd><dt>Slowness, rigidity and a resting tremor</dt><dd>Think Parkinson disease. Assess fall and swallowing risks and keep prescribed medications on schedule.</dd><dt>New confusion, pupillary change or a falling Glasgow Coma Scale score after head trauma</dt><dd>Escalate immediately, support airway and oxygenation, and protect spinal alignment. Reassess the individual eye, verbal and motor responses.</dd></dl>'
        if (course,num)==('235',5) or (course,num)==('258',9):
            body+='<h4>What a Reed–Sternberg cell looks like</h4>'+(TOOLS/'hodgkin-visual.html').read_text(encoding='utf-8')
        if final:
            parts.append(f'<details id="topic-{num}"'+(' open' if num==13 and course in ('235','258') else '')+f'><summary>{escape(m["topic"])}</summary>{body}</details>')
        else: parts.append(f'<article class="card" id="topic-{num}"><h3>{escape(m["topic"])}</h3>{body}</article>')
    parts.extend([section(*TOP[4]),f'<article class="card"><h3>What to remember</h3><p>{escape(ex["number"])}</p><p>{escape(ex["contrast"])}</p></article>',section(*TOP[5]),f'<p class="source-line">{escape(ex["recall"])}</p>'])
    for mod,number in CASES[key]:parts.append(case_card(course,mod,number))
    others=[link(filename(course,n),f'NUR {course} · {label(n)}') for n in exams_for(course) if n!=exam]
    parts+=['<h2 id="sources">Course sources and related guides</h2>',f'<p>Exam coverage follows the {link(group,f"NUR {course} course outline","full-size")}. Recall prompts and practice cases come from the Study Hub’s linked course modules. Each Simple Nursing preview links to the original handout.</p>']
    if course=='234':
        official={'1':range(1,5),'2':range(5,8),'3':range(8,11),'4':range(11,14),'F':range(1,14)}[exam]
        outline=soup('nur234.html')
        parts.append('<details><summary>Official module topics for this exam</summary><ul>')
        for n in official:
            panel=outline.find(id='review-m'+str(n))
            heading=panel.find(['h3','h2','h4'])
            parts.append('<li>'+link(hub+'#review-m'+str(n),f'Module {n} · '+heading.get_text(' ',strip=True),'full-size')+'</li>')
        parts.append('</ul></details>')
    ext=EXTERNAL.get(key,EXTERNAL.get(course))
    if ext:parts.append('<p>'+link(ext[1],ext[0])+'</p>')
    parts+=['<nav class="actions" aria-label="More exams for this class">'+''.join(others)+'</nav><a href="#top" class="top-link">Back to top ↑</a></main></body></html>']
    return '\n'.join(parts)+'\n'

def exams_for(course):
    return [str(n) for n in range(1,6 if course=='258' else 5)]+['F']

if __name__=='__main__':
    for exam in EXAMS:
        path=REVIEWS/filename(exam['course'],exam['exam'])
        path.write_text(render(exam),encoding='utf-8')
        print(path.name)
