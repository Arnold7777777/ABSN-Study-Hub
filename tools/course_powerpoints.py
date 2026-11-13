"""Shared markup for course PowerPoint shortcuts in the exam guides."""
from html import escape
from pathlib import Path
import json
from module_guide_links import deck_group

BASE = Path(__file__).resolve().parents[1]
DECKS = {d['href'].split('/d/')[-1].split('/')[0]: d for d in
         json.loads((BASE/'tools/module-decks.json').read_bytes()) if '/d/' in d['href']}
FEATURED = {
    '258': ('4', [
        ('13xjDQeaLHXhL-YpbKc6TyysZc2qmE1Uz','M9','Hematological disorders'),
        ('1OSXqUwJ57hgZ5EvDke9VG6xB4h4g5uuM','M10','Oncology and end-of-life care')]),
    '234': ('3', [
        ('1zjdWkekE2fvZrz6Il3PywHFYqdmxvPLR','M8 · Ch. 20','Pregnancy complications'),
        ('1DT2fdWF2rwkxiT9zeCbM8UJSm8nzmFcK','M9 · Ch. 21','Sudden pregnancy complications'),
        ('1Es3nSuXmrhdj9WpcQaEk3km1iHZsTv09','M10 · Ch. 23','Complications of labor and birth'),
        ('17999QThpFgt-gQoFQDdE23ZF0enpyjPv','M10 · Ch. 24','Surgical interventions for birth')]),
}
DECK_EXAMS = {'234': {'1','2','3','4'}, '235': {'1','2','3','4','F'}, '258': {'1','2','4','F'}}

def shortcut(course, exam, prefix='../'):
    anchor=('#'+('final' if exam=='F' else 'exam-'+exam)) if exam in DECK_EXAMS[course] else ''
    label=('Final' if exam=='F' else 'Exam '+exam)+' PowerPoints' if anchor else 'Course PowerPoint library'
    if course in FEATURED and FEATURED[course][0]==exam:anchor='#course-powerpoints'
    button = f'<a class="button ppt-action" href="{prefix}nur{course}-slides.html{anchor}"><span aria-hidden="true">▣</span> {label}</a>'
    group_label = 'All PowerPoints for cumulative review' if exam == 'F' else 'Browse all Exam '+exam+' decks'
    button += f'<a class="button" href="{deck_group(int(course),exam,prefix)}">{group_label}</a>'
    if course == '234':
        for week in {'3': [10], '4': [11], 'F': [10, 11]}.get(exam, []):
            button += f'<a class="button" href="{prefix}nur234-m{week}.html#buhler-week-{week}">Buhler · Week {week} review</a>'
    return button

def panel(course, prefix='', module=None, library=False):
    exam, rows=FEATURED[course]
    if module: rows=[x for x in rows if x[1].split(' ·')[0]==module]
    cards=[]
    for fid,tag,title in rows:
        d=DECKS[fid]
        cards.append(f'<a class="ppt-tile" href="{d["href"]}" target="_blank" rel="noopener"><img src="{prefix}{d["preview"]}" width="760" height="{570 if fid==FEATURED["234"][1][0][0] else 428}" alt="" decoding="async"><span><small>{escape(tag)}</small><strong>{escape(title)}</strong><span class="ppt-open">Open slides ↗</span></span></a>')
        if d.get('answered_href'):
            title_attr=escape(title,quote=True)
            cards[-1]=f'<div class="ppt-edition">{cards[-1]}<a class="ppt-answers" href="{d["answered_href"]}" target="_blank" rel="noopener" aria-label="{title_attr}: open PowerPoint with study answers">Slides with answers ↗</a></div>'
    more=('' if library else f'<a class="ppt-more" href="{prefix}nur{course}-slides.html#exam-{exam}">All Exam {exam} slides, answers and downloads →</a>')
    reading=('<p>Module 8: Chapter 20. Module 9: Chapter 21. Module 10: Chapters 23 and 24. The exam review also lists dosage calculations.</p>' if course=='234' and not module else '')
    return f'<section class="ppt-panel" aria-labelledby="course-powerpoints"><h2 id="course-powerpoints">NUR {course} Exam {exam} · Course PowerPoints</h2>{reading}<div class="ppt-grid">{"".join(cards)}</div>{more}</section>'
