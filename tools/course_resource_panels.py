"""Build the visible study guide and PowerPoint panels from the existing course sources."""
from collections import defaultdict
from html import escape, unescape
import json
from pathlib import Path
import re
from urllib.parse import quote, unquote

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
COUNTS = {175: 3, 198: 5, 234: 4, 235: 4, 258: 5}
MODULE_ENDS = {234: [4, 7, 10, 13], 235: [4, 7, 9, 13], 258: [3, 6, 8, 10, 12]}


def link(url, title, aria=None):
    label = f' aria-label="{escape(aria, quote=True)}"' if aria else ''
    return f'<a href="{escape(url, quote=True)}"{label}>{escape(title)}</a>'


def course_exams(course):
    return [f'Exam {n}' for n in range(1, COUNTS[course] + 1)] + ['Final']


def slug(exam):
    return exam.lower().replace(' ', '')


def owner(module, course):
    return next((f'Exam {i}' for i, end in enumerate(MODULE_ENDS[course], 1) if module <= end), 'Final')


def deck_key(url):
    fid = re.search(r'/d/([\w-]+)|[?&]id=([\w-]+)', url)
    return next((v for v in fid.groups() if v), url) if fid else unquote(url)


def collect_decks(course, course_source):
    groups = defaultdict(list)
    seen = set()

    def add(group, title, url):
        key = deck_key(url)
        if key in seen:
            return
        seen.add(key)
        groups[group].append((unescape(title), url))

    if course in (175, 198):
        for rec in json.loads((ROOT/'tools/prior-course-decks.json').read_bytes())[str(course)]:
            add('Final' if rec['exam'] == 'F' else 'Exam '+rec['exam'], rec['title'], rec['href'])
        return groups

    catalogue = f'nur{course}-slides.html'
    slides = BeautifulSoup((ROOT/catalogue).read_text(encoding='utf-8'), 'html.parser')
    for deck in slides.select('.exsec .deck[id]'):
        group = deck.find_parent(class_='exsec')['id'].replace('exam-', 'Exam ').replace('whole-course', 'Whole course').replace('clinical', 'Clinical').replace('final', 'Final')
        title = deck.select_one('.dt') or deck.h4
        url = catalogue+'#'+deck['id']
        add(group, title.get_text(' ', strip=True).lstrip('📊 '), url)
        for a in deck.select('a[href]'):
            seen.add(deck_key(a['href']))

    for rec in json.loads((ROOT/'tools/module-decks.json').read_bytes()):
        if rec['course'] == f'nur{course}':
            group = owner(int(rec['module'][1:]), course)
            # A shared simulation deck is filed with both labor and newborn care.
            if course == 234 and rec['module'] == 'm12' and deck_key(rec['href']) in seen:
                groups[group].append((unescape(rec['title']), rec['href']))
            add(group, rec['title'], rec['href'])
            if rec.get('answered_href'):
                add(group, rec['title']+' · Slides with study answers', rec['answered_href'])

    gallery = BeautifulSoup((ROOT/'infographics.html').read_text(encoding='utf-8'), 'html.parser')
    for card in gallery.select(f'.card[data-kind="powerpoint"][data-cls="NUR {course}"]'):
        button = card.select_one('.deckplate[href]')
        if not button:
            continue
        modules = re.findall(r'M(\d+)', card.get('data-mod',''))
        group = owner(int(modules[0]),course) if len(modules)==1 else card.get('data-exam') or 'Whole course'
        add(group, card.h3.get_text(' ',strip=True), button['href'])

    # Course pages also hold downloadable editions and module decks outside the slide library.
    source = BeautifulSoup(course_source, 'html.parser')
    for a in source.select('a[href]'):
        if a.find_parent(class_='course-resources'):
            continue
        url = a['href']
        section = a.find_parent(class_='exsec')
        group = section.get('id','').replace('exam-final','Final').replace('exam-','Exam ') if section else 'Whole course'
        if url.lower().endswith('.pptx'):
            title = unquote(url.split('/')[-1]).rsplit('.',1)[0].replace('_',' ').replace('-',' ')
            if 'exam 3' in title.lower():
                group = 'Exam 3'
            if 'mastery' in title.lower():
                group = 'Whole course'
            add(group,title,url)
        elif 'drive.google.com/' in url and a.get('class') and 'igcard' in a['class']:
            text = a.get_text(' ',strip=True)
            if re.search(r'PowerPoint|Instructor deck|STUDENT deck|Lecture Slides',text,re.I):
                add(group, re.split(r'\s*📊\s*(?:PowerPoint|Instructor deck)|\s+Opens in Drive',text.lstrip('📊 '))[0], url)
    if course == 235:
        for deck in json.loads((ROOT/'tools/pediatric-original-slides.json').read_bytes()):
            module = deck['module']
            group = 'Final' if module >= 13 else owner(module, course)
            slide_range = ' · slides 3–41' if module == 6 else ''
            add(group, f'Week {module} · {deck["title"]} · Fuller lecture PowerPoint{slide_range}', deck['fullerUrl'])
            add(group, f'Week {module} · {deck["title"]} · Instructor {deck["format"]}', deck['url'])
        for deck in sorted((ROOT/'course-materials/originals').glob('*.pptx')):
            group = 'Exam 3' if 'respiratory' in deck.stem.lower() else 'Exam 4'
            title = re.sub(r'-1$', '', deck.stem.removeprefix('NEW! ')).strip()
            add(group,title,'course-materials/originals/'+quote(deck.name))
    return groups


def make_panel(course, groups, prefix='', fundamentals_slides=None):
    if course==125:
        guides = ''.join(link(f'NUR125%20Exam%20{i}%20Study%20Guide.html',f'Exam {i}') for i in (1,2))
        library = 'NUR125%20Slides.html'
        groups = {'Lecture decks': fundamentals_slides}
    else:
        guides = ''.join(link(f'{prefix}study-reviews/nur{course}-{slug(exam)}-simple.html',exam,
                              f'NUR {course} {exam} simple study guide') for exam in course_exams(course))
        library = f'{prefix}nur{course}-slides.html'
    ordered = [key for key in (course_exams(course) if course!=125 else []) if key in groups]
    ordered += [key for key in groups if key not in ordered]
    lists = []
    for group in ordered:
        items = ''.join(f'<li>{link(url,title)}</li>' for title,url in groups[group])
        name = 'deck' if len(groups[group])==1 else 'decks'
        lists.append(f'<details id="decks-{slug(group).replace("/","-")}"><summary>{escape(group)} · {len(groups[group])} {name}</summary><ul>{items}</ul></details>')
    guide_heading = 'Exam study guides' if course==125 else 'Simple exam guides'
    fuller = link(library+'#original-course-powerpoints','Fuller lectures and matching PowerPoints') if course == 235 else ''
    return (f'<section class="course-resources" id="course-study-resources" aria-label="NUR {course} exam guides and PowerPoints">'
            f'<div class="resource-heads"><div><h2>{guide_heading}</h2><div class="resource-buttons">{guides}</div></div>'
            f'<div><h2 id="quick-powerpoints">Course PowerPoints</h2><div class="resource-buttons ppt-access">'
            f'{fuller}{link(library, "Open slide library")}'
            '<a href="#course-deck-list" data-open-decks>Browse deck titles ↓</a></div></div></div>'
            '<details class="course-deck-groups" id="course-deck-list"><summary>PowerPoints by exam or topic</summary>'
            + ''.join(lists) + '</details></section>')
