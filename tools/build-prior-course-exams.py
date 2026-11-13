"""Build the NUR 175 and NUR 198 simple exam and PowerPoint pages.

Course outlines and original decks are in the two sibling course sites. Keep their
exam numbering, module order and cumulative-final coverage when updating the data.
Run wire-back-links.py and build-search-index.py after rebuilding.
"""
from html import escape
import json
from pathlib import Path
from urllib.parse import quote, urlsplit, parse_qs

from bs4 import BeautifulSoup
from PIL import Image
from study_outline import study_list
from module_guide_links import deck_group

ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / 'tools'
TOPICS = json.loads((TOOLS / 'prior-course-topics.json').read_bytes())
EXAMS = json.loads((TOOLS / 'prior-course-exams.json').read_bytes())
DECKS = json.loads((TOOLS / 'prior-course-decks.json').read_bytes())
NAMES = {'175': 'Psychiatric–Mental Health Nursing', '198': 'Adult Health Nursing I'}
CONTENTS = [('rules', 'Rules to remember'), ('clues', 'See this → think this'),
            ('first', 'What do I do first?'), ('topics', 'Topics in plain words and pictures'),
            ('numbers', 'Numbers and distinctions'), ('practice', 'Practice and memory cues')]
SOURCES = {
    '175': [('NIMH · Psychotherapies','https://www.nimh.nih.gov/health/topics/psychotherapies'),
            ('NIMH · Mental health medications','https://www.nimh.nih.gov/health/topics/mental-health-medications'),
            ('NIMH · Suicide assessment','https://www.nimh.nih.gov/health/publications/suicide-faq')],
    '198': [('NHLBI · Heart attack symptoms','https://www.nhlbi.nih.gov/health/heart-attack/symptoms'),
            ('NIDDK · Cirrhosis','https://www.niddk.nih.gov/health-information/liver-disease/cirrhosis/symptoms-causes'),
            ('AAOS · Compartment syndrome','https://orthoinfo.aaos.org/en/diseases--conditions/compartment-syndrome/')]
}
ADULT_SOURCES = ['NUR198 Exam 1 Study Guide.html','NUR198 Exam 2 Study Guide.html',
                 'NUR198 Exam 3 Study Guide.html','NUR198 Exam 4 Guide.html',
                 'Exam 5 GI Complete Study Guide.html','NUR198 Final Review QA.html']
DISTINCTIONS = {
    '175': [
        ['Orientation establishes the agreement. Working addresses the goal. Termination reviews progress.', 'A patient’s account is subjective. Observed behavior is objective.'],
        ['At panic-level anxiety, use short, concrete directions. Return to teaching when attention improves.', 'Separate the feeling of anger from a behavior that threatens safety.'],
        ['Ask directly about suicidal thoughts and current intent when warning signs are present.', 'Hallucination describes perception. Delusion describes a belief. Withdrawal risk depends in part on time since last use.'],
        ['Sudden inattention suggests delirium. Progressive loss of function suggests dementia.', 'Fever and marked rigidity after an antipsychotic require urgent assessment. Review medication changes and the time symptoms began.']],
    '198': [
        ['Typical adult serum potassium is 3.5–5.0 mEq/L. Both low and high levels can alter cardiac conduction.', 'Typical arterial pH is 7.35–7.45, PaCO₂ 35–45 mmHg and bicarbonate 22–26 mEq/L. Read these together.'],
        ['Stridor suggests upper-airway narrowing. Wheezing usually arises in the lower airways.', 'Compare oxygen saturation with the ordered target and the patient’s baseline. Assess work of breathing even when the number looks reassuring.'],
        ['Pulmonary congestion commonly causes orthopnea and crackles. Systemic congestion can produce dependent edema and jugular venous distention.', 'Look at symptoms, pulse and blood pressure when deciding how urgently a rhythm change needs treatment.'],
        ['Assess reduced urine output alongside perfusion, volume status and possible obstruction.', 'Cloudy peritoneal dialysis effluent with abdominal pain suggests peritonitis. Cirrhosis with new confusion warrants assessment for encephalopathy and its triggers.'],
        ['Coffee-ground emesis suggests upper GI bleeding. Assess circulation and ongoing losses.', 'A new rigid abdomen or continuous severe pain raises concern for perforation or ischemia.'],
        ['Acute compartment syndrome can develop while a distal pulse is present.', 'Compare new signs with baseline. Sudden breathing difficulty after a fracture or immobility requires urgent assessment.']]
}

def label(exam):
    return 'Final' if exam == 'F' else 'Exam ' + exam

def slug(exam):
    return 'final' if exam == 'F' else 'exam' + exam

def filename(course, exam):
    return f'nur{course}-{slug(exam)}-simple.html'

def anchor(url, title, cls='button'):
    return f'<a class="{cls}" href="{escape(url, quote=True)}">{escape(title)}</a>'

def heading(key, title):
    return f'<h2 id="{key}">{escape(title)}</h2>'

def shell(title, body, prefix):
    assets = prefix + 'assets/study-reviews/'
    styles = ''.join(f'<link rel="stylesheet" href="{assets}{name}.css">' for name in
                     ('study','atlas/atlas','guide-outline','powerpoints','exam-buttons','prior-courses'))
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{escape(title)} | ABSN Study Hub</title>{styles}</head><body class="jewel-reading prior-course"><main id="top">\n'
            + '\n'.join(body) + f'\n<a class="top-link" href="#top">Back to top ↑</a></main>'
            f'<script defer src="{prefix}absn-top.js"></script></body></html>\n')

def course_url(course, prefix='../'):
    path = 'index.html' if course == '175' else 'NUR198%20Study%20Hub.html'
    return f'{prefix}../NUR-{course}-Study-Guide/{path}'

def course_source(course, exam):
    if course == '175':
        return course_url(course) + '#' + slug(exam)
    name = ADULT_SOURCES[-1 if exam == 'F' else int(exam)-1]
    return f'../../NUR-198-Study-Guide/{quote(name)}'

def art(course, number):
    name = f'assets/study-reviews/course-cues/{course}-{number}.webp'
    with Image.open(ROOT / name) as im:
        w,h = im.size
    return '../' + name, w, h

def picture(src, w, h, alt, title, target, button, full_image=None):
    return (f'<figure><a href="{escape(full_image or src,quote=True)}"><img alt="{escape(alt,quote=True)}" src="{escape(src,quote=True)}" '
            f'width="{w}" height="{h}" loading="lazy" decoding="async"></a><figcaption>{escape(title)} '
            f'{anchor(target, button,"full-size")}</figcaption></figure>')

def handouts():
    soup = BeautifulSoup((ROOT/'infographics.html').read_bytes(),'html.parser')
    found = {}
    for card in soup.select('#pool .card[data-kind="sn"], #pool .card[data-kind="pdf"]'):
        im = card.select_one('a.sn-inline-image img, a.deckplate.snprev img')
        original = card.select_one('a.sn-inline-source, a.deckplate.snprev[href*="drive.google.com"]')
        local = card.select_one('a.deckplate.snprev[href^="img/"]')
        download = card.select_one('a.deckdl[href*="drive.usercontent.google.com"]')
        if not card.h3 or not im:
            continue
        if original:
            target = original['href']
        elif local and download:
            file_id = parse_qs(urlsplit(download['href']).query)['id'][0]
            target = f'https://drive.google.com/file/d/{file_id}/view'
        else:
            continue
        full_image = '../'+local['href'] if local else target
        found[card.h3.get_text(' ', strip=True)] = (im, target, full_image)
    return found

def topic_card(course, item, final, first, resources):
    number = item['module']
    title = f'Module {number} · {item["topic"]}'
    definition = study_list([escape(item['distinction']), escape(item['cue'])])
    src,w,h = art(course, number)
    drawing = picture(src,w,h,item['meaning'],'Study Hub memory picture · '+item['scene']+'. '+item['meaning'],src,'Open full size')
    im, target, full_image = resources[item['sn']]
    original = picture('../'+im['src'],im['width'],im['height'],item['sn'],
                       'Simple Nursing original · '+item['sn'],target,'Open original PDF',full_image)
    link = anchor(course_url(course)+'#m'+str(number),'Open the full module')
    inside = definition+'<div class="visual-pair">'+original+drawing+'</div><p>'+link+'</p>'
    if final:
        opened = ' open' if first else ''
        return f'<details id="topic-{number}"{opened}><summary>{escape(title)}</summary>{inside}</details>'
    return f'<article id="topic-{number}" class="card"><h3>{escape(title)}</h3>{inside}</article>'

def practice_card(case):
    choices = study_list(map(escape,case['choices']), 'choices')
    correct = chr(65+case['answer'])+'. '+case['choices'][case['answer']]
    return (f'<article class="card"><h3>{escape(case["question"])}</h3>{choices}<details><summary>Check the answer and why</summary>'
            f'<p><strong>{escape(correct)}</strong></p><p>{escape(case["why"])}</p></details></article>')

def exam_page(course, ex, resources, index):
    exam = ex['exam']
    name = f'NUR {course} · {label(exam)}'
    rows = [TOPICS[course][n-1] for n in ex['modules']]
    lead = ex['recall']
    cover,w,h = art(course,'cover')
    links = [anchor('../nur'+course+'-slides.html#'+slug(exam), label(exam)+' PowerPoints'),
             anchor(deck_group(int(course),exam), 'All PowerPoints for cumulative review' if exam=='F' else 'Browse all '+label(exam)+' decks'),
             anchor(course_source(course,exam),'Detailed exam review'),anchor(course_url(course),f'NUR {course} course hub'),
             anchor('index.html#all-exams','All exam guides')]
    scope = ('Cumulative final · '+('New material in Modules 11–12 and the Modules 13/14 pharmacology reference.' if course=='175'
                else 'Module 13 adds musculoskeletal disorders and trauma.') if exam=='F' else
             'Modules '+str(ex['modules'][0])+'–'+str(ex['modules'][-1]))
    body = [f'<header class="art-hero"><div class="art-copy"><p class="eyebrow">{name} · Simple exam guide</p><h1>{escape(ex["title"])}</h1>'
            f'<p class="lead">{escape(scope)}</p></div><a class="art-plate" href="{cover}"><img src="{cover}" width="{w}" height="{h}" alt="Original {escape(NAMES[course])} course mosaic"></a>'
            f'<nav class="actions">{"".join(links)}</nav></header>', heading('jump','Jump to what you need'),
            '<nav class="jump">'+''.join(anchor('#'+k,v) for k,v in CONTENTS)+'</nav>',
            heading(*CONTENTS[0]),f'<p>{escape(lead)}</p>',
            study_list(escape(x['distinction']) for x in (rows[:3] if exam=='F' else rows)),
            heading(*CONTENTS[1])]
    # The final starts with new material and adds one recall cue from each prior exam.
    focused = rows if exam!='F' else [row for row in rows if row['module'] in (
        {11,12,13,3,7,8} if course=='175' else {13,2,4,7,9,11})]
    for row in focused:
        body.append(f'<article class="card"><h3>{escape(row["question"])}</h3><dl><dt>Think…</dt><dd>{study_list([escape(row["answer"])])}</dd></dl></article>')
    body.append(heading(*CONTENTS[2]))
    for row in focused:
        steps=study_list(['<strong>First action</strong>'+study_list([escape(row['action'])]),
                          '<strong>Look for a response</strong>'+study_list([escape(row['outcome'])])],'steps')
        body.append(f'<article class="card"><h3>{escape(row["topic"])}</h3>{steps}</article>')
    body.append(heading(*CONTENTS[3]))
    body.extend(topic_card(course,row,exam=='F',i==0,resources) for i,row in enumerate(rows))
    body += [heading(*CONTENTS[4]),study_list(map(escape,DISTINCTIONS[course][index])),heading(*CONTENTS[5])]
    body.extend(practice_card(case) for case in ex['practice'])
    body += [heading('sources','Course sources and related guides'),'<nav class="actions">'+''.join(links[:3])+'</nav>',
             '<div class="actions">'+''.join(anchor(url,title) for title,url in SOURCES[course])+'</div>',
             '<nav class="actions" aria-label="More exams for this class">'+''.join(anchor(filename(course,x['exam']),label(x['exam'])) for x in EXAMS[course] if x!=ex)+'</nav>']
    return shell(name+' · The simple version',body,'../')

def slide_page(course):
    title=f'NUR {course} · Course PowerPoints'
    sections=[f'<header><p class="eyebrow">{NAMES[course]}</p><h1>{title}</h1><div class="actions">'+anchor(course_url(course,''),'Course hub')+'</div></header>',
              '<nav class="jump" aria-label="PowerPoints by exam">'+''.join(anchor('#'+slug(x['exam']),label(x['exam'])) for x in EXAMS[course])+'</nav>']
    for ex in EXAMS[course]:
        exam=ex['exam']
        sections.append(heading(slug(exam),label(exam)+' · '+ex['title']))
        sections.append('<div class="deck-list">'+''.join(anchor(d['href'],d['title']+' ↗') for d in DECKS[course] if d['exam']==exam)+'</div>')
        sections.append('<p>'+anchor('study-reviews/'+filename(course,exam),'Open the simple '+label(exam)+' guide')+'</p>')
    return shell(title,sections,'')

if __name__ == '__main__':
    matched = handouts()
    for course, exams in EXAMS.items():
        for i, exam in enumerate(exams):
            dest=ROOT/'study-reviews'/filename(course,exam['exam'])
            dest.write_text(exam_page(course,exam,matched,i),encoding='utf-8')
        (ROOT/f'nur{course}-slides.html').write_text(slide_page(course),encoding='utf-8')
