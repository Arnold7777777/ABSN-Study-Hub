"""Keep current course landing pages in exam/module order without serializing HTML.

Run after changing course modules or assets/calendar/fall-2026.json. Existing
resource blocks are moved byte-for-byte; generated visual/reader blocks stay intact.
"""
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from datetime import date
import json
import re
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT/'assets/calendar/fall-2026.json').read_text(encoding='utf-8'))


def soup(text):
    return BeautifulSoup(text, 'html.parser')


def bounds(text, selector):
    tag = soup(text).select_one(selector)
    if tag is None:
        raise ValueError('Missing selector: '+selector)
    start = sum(len(line) for line in text.splitlines(keepends=True)[:tag.sourceline-1]) + tag.sourcepos
    fragment = text[start:]
    class End(HTMLParser):
        depth = 0
        end = None
        def handle_starttag(self, name, attrs):
            if name == tag.name and self.end is None:
                self.depth += 1
        def handle_endtag(self, name):
            if name == tag.name and self.end is None:
                self.depth -= 1
                if self.depth == 0:
                    line, col = self.getpos()
                    pos = sum(map(len, fragment.splitlines(keepends=True)[:line-1])) + col
                    self.end = fragment.index('>', pos)+1
    parser = End(convert_charrefs=False)
    parser.feed(fragment)
    if parser.end is None:
        raise ValueError('Unclosed element: '+selector)
    return start, start+parser.end


def replace(text, selector, value):
    a, b = bounds(text, selector)
    return text[:a]+value+text[b:]


def insert(text, selector, value, where='before'):
    a, b = bounds(text, selector)
    pos = a if where == 'before' else b
    if where == 'inside':
        pos = text.index('>', a)+1
    return text[:pos]+'\n'+value+'\n'+text[pos:]


def move(text, selector, destination, where='before'):
    a, b = bounds(text, selector)
    block = text[a:b]
    text = text[:a]+text[b:]
    return insert(text, destination, block, where)


def date_label(event):
    start = date.fromisoformat(event['startDate']).strftime('%b %d').replace(' 0', ' ')
    end = date.fromisoformat(event['endDate']).strftime('%b %d').replace(' 0', ' ')
    return (start+'–'+end+' · testing window') if event['kind']=='window' else start+' · deadline'


def roadmap(course, text):
    dom = soup(text)
    cards = []
    sections = dom.select('.exsec')
    for section in sections:
        key = section['id'].removeprefix('exam-')
        title = 'Final' if key == 'final' else 'Exam '+key
        modules = []
        if course == 234:
            for unit in section.select('.modunit'):
                n = int(unit['id'].split('-m')[-1])
                label = re.sub(r'^Module \d+:\s*', '', unit.h3.get_text(' ',strip=True))
                modules.append((n, label, '#'+unit['id']))
        elif course == 235:
            for unit in section.select('.modrow'):
                n = int(unit.select_one('.mnum').get_text().removeprefix('M'))
                label = re.sub(r'\s*Week \d+$','',unit.select_one('.mttl').get_text(' ',strip=True))
                modules.append((n,label,unit.select_one('.modcard')['href']))
        else:
            for unit in section.select('details.mod'):
                n = int(unit['data-m'][1:])
                label = re.sub(r'\s*Week \d+$','',unit.select_one('.mttl').get_text(' ',strip=True))
                modules.append((n,label,'#review-258-'+('final' if n==14 else 'm'+str(n))))
        modules.sort()
        event = next((e for e in DATA['events'] if e['course']==str(course) and e.get('exam')==key), None)
        pick = f' data-pick="{key}"' if course==234 else ''
        event_link = f'<a class="semester-date" href="exam-calendar.html#{event["id"]}">{date_label(event)}</a>' if event else ''
        links = ''.join(f'<li><a href="{escape(url,quote=True)}"><b>Module {n}</b><span>{escape(label)}</span></a></li>' for n,label,url in modules)
        deck_dom = soup((ROOT/f'nur{course}-slides.html').read_text(encoding='utf-8'))
        deck_anchor = section['id'] if key!='final' else 'final'
        slides_url = f'nur{course}-slides.html#{deck_anchor}' if deck_dom.find(id=deck_anchor) else '#decks-'+title.lower().replace(' ','')
        cards.append(f'<article class="semester-exam"><h3><a href="#{section["id"]}"{pick}>{title} →</a></h3>{event_link}'
                     f'<ol class="semester-modules">{links}</ol><div class="semester-links">'
                     f'<a href="study-reviews/nur{course}-{title.lower().replace(" ", "")}-simple.html">Study guide</a>'
                     f'<a href="{slides_url}">PowerPoints</a></div></article>')
    if course == 234:
        event = next(e for e in DATA['events'] if e['id']=='nur234-final')
        cards.append(f'<article class="semester-exam"><h3><a href="study-reviews/nur234-final-simple.html">Final →</a></h3>'
                     f'<a class="semester-date" href="exam-calendar.html#nur234-final">{date_label(event)}</a>'
                     '<p>Comprehensive review of Modules 1–13.</p><div class="semester-links">'
                     '<a href="study-reviews/nur234-final-simple.html">Study guide</a><a href="nur234-slides.html#whole-course">PowerPoints</a></div></article>')
    nav_id = 'exam-choice' if course==234 else 'semester-exam-navigation'
    all_link = '<a href="#all" data-pick="all">Show all exams</a><p id="exselNote" role="status"></p>' if course==234 else ''
    return (f'<section id="course-study-resources" class="semester-overview course-{course}" aria-labelledby="exsel-h">'
            '<div class="semester-heading"><div><p class="semester-eyebrow">Fall 2026 · Study in order</p>'
            '<h2 id="exsel-h">Choose an exam, then a module</h2></div>'
            f'<a class="semester-calendar-link" href="exam-calendar.html?course={course}">Exam calendar →</a></div>'
            '<p class="semester-help">Modules follow the course study sequence. Calendar assessment weeks may have a different number.</p>'
            f'<nav id="{nav_id}" aria-label="Exams and modules"><div class="semester-exams">'+''.join(cards)+f'</div>{all_link}</nav></section>')


def organize(course):
    path = ROOT/f'nur{course}.html'
    original = text = path.read_text(encoding='utf-8')
    initial = soup(text)
    if initial.select_one('#course-study-resources.semester-overview'):
        text = replace(text,'#course-study-resources',roadmap(course,text))
        if text != original:
            path.write_text(text,encoding='utf-8')
        print(path.name+': overview refreshed')
        return
    # Retain the full catalogue, but below the exams instead of above Module 1.
    if initial.select_one('#course-study-resources.course-resources'):
        a,b = bounds(text,'#course-study-resources')
        block = text[a:b].replace('id="course-study-resources"','id="all-course-resources"',1)
        text = text[:a]+text[b:]
        text = insert(text,'.afterword',block)
    if soup(text).select_one('nav.exjump'):
        text = replace(text,'nav.exjump','')
    if course==258:
        for sel in ('#exam4-vlc-collections','#downloaded-study-reviews'):
            text = move(text,sel,'#exam-4 > .exhead','after')
        text = move(text,'#brachytherapy-picture-guide','#review-258-m10','after')
    if course==234:
        text = move(text,'#downloaded-study-reviews','#exam-3 > .exhead','after')
    if course==235:
        text = move(text,'#study-powerpoints','#exam-3 > .exhead','after')
        text = move(text,'#content-mastery','#exam-final > .exhead','after')
        # The final heading precedes its comprehensive resources.
        text = move(text,'#exam-final > .exhead','#exam-final > style','before')
    # Course-wide helpers stay available after the exam/module sections.
    selectors = ['.wrap > p.cmlink','.wrap > #practice-games','.wrap > #nur258-arcade-games',
                 '.wrap > #review-judgment','.wrap > #review-source-guide','.wrap > #weekly-course-resources']
    for selector in selectors:
        nodes = soup(text).select(selector)
        blocks = []
        edits = []
        for node in nodes:
            # Identify siblings using nth-of-type, since several helper paragraphs have no id.
            matching = [x for x in node.parent.find_all(node.name,recursive=False)]
            specific = f'.wrap > {node.name}:nth-of-type({matching.index(node)+1})'
            a,b = bounds(text,specific)
            blocks.append(text[a:b])
            edits.append((a,b))
        for a,b in sorted(edits,reverse=True):
            text=text[:a]+text[b:]
        if blocks:
            text=insert(text,'.afterword','\n'.join(blocks))
    # Replace only this tool's own generated overview.
    block = roadmap(course,text)
    if soup(text).select_one('#course-study-resources'):
        text = replace(text,'#course-study-resources',block)
    else:
        text = insert(text,'.wrap > header',block,'after')
    css = '<link rel="stylesheet" href="assets/calendar/semester.css">'
    js = '<script defer src="assets/calendar/semester.js"></script>'
    if css not in text: text=text.replace('</head>',css+'\n</head>',1)
    if js not in text: text=text.replace('</body>',js+'\n</body>',1)
    if text != original:
        path.write_text(text,encoding='utf-8')
    print(path.name+': exam/module overview and filed resources updated')


if __name__ == '__main__':
    for course in (234,235,258):
        organize(course)
