"""Build the public exam-only calendar and Google Calendar subscription file.

Input is the reviewed, allowlisted snapshot in assets/calendar/fall-2026.json.
Never pass raw calendar exports or credentials to this public repository.
"""
from pathlib import Path
from datetime import date, datetime, timedelta
from html import escape
from urllib.parse import urlencode
import json

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = 'https://arnold7777777.github.io/ABSN-Study-Hub/'
DATA = json.loads((ROOT/'assets/calendar/fall-2026.json').read_text(encoding='utf-8'))
ALLOWED = {'id','course','title','exam','startDate','endDate','kind','deadline','source','hours'}


def review(event):
    key = event.get('exam')
    return f'study-reviews/nur{event["course"]}-'+(f'exam{key}' if key and key!='final' else 'final')+'-simple.html'


def long_date(value):
    return date.fromisoformat(value).strftime('%a, %b %d').replace(' 0',' ')


def deadline(event):
    return datetime.fromisoformat(event['deadline']).strftime('%I:%M %p').lstrip('0')+' Mountain Time'


def detail(event):
    text = f'Calendar deadline: {long_date(event["endDate"])} at {deadline(event)}. This is a due time, not a confirmed exam start time.'
    if event['kind']=='window':
        text = 'Testing window. '+event['hours']+' '+text
    return text+' Check Canvas announcements for the assigned session and any changes.'


def compact(value):
    return value.replace('-','')


def next_date(value):
    return (date.fromisoformat(value)+timedelta(days=1)).isoformat()


def google_link(event):
    # Date markers preserve deadlines without inventing a timed exam appointment.
    title=f'NUR {event["course"]} · {event["title"]} · '+('Testing window' if event['kind']=='window' else 'Deadline '+deadline(event))
    params={'action':'TEMPLATE','text':title,
            'dates':compact(event['startDate'])+'/'+compact(next_date(event['endDate'])),
            'ctz':DATA['timezone'],'details':detail(event)+'\nStudy guide: '+PUBLIC+review(event)}
    return 'https://calendar.google.com/calendar/r/eventedit?'+urlencode(params)


def card(e):
    when=long_date(e['startDate'])
    if e['startDate']!=e['endDate']: when+=' – '+long_date(e['endDate'])
    note = f'<p>{escape(e["hours"])}</p>' if e.get('hours') else ''
    label='Testing window' if e['kind']=='window' else 'Exam deadline'
    return (f'<article class="exam-event course-{e["course"]}" id="{e["id"]}" data-course="{e["course"]}" '
            f'data-start="{e["startDate"]}" data-end="{e["endDate"]}"><span data-course-label>NUR {e["course"]}</span>'
            f'<h3>{escape(e["title"])}</h3><p class="exam-date">{when}</p><p><b>{label}</b></p>{note}'
            f'<p>Due {escape(deadline(e))} on {long_date(e["endDate"])}.</p>'
            f'<div class="calendar-actions"><a class="action" href="{review(e)}">Study for this exam →</a>'
            f'<a class="action" href="{escape(google_link(e),quote=True)}" target="_blank" rel="noopener">Add date to Google Calendar ↗</a></div></article>')


def ics_escape(value):
    return value.replace('\\','\\\\').replace('\n','\\n').replace(';','\\;').replace(',','\\,')


def fold(line):
    # RFC 5545: fold at 75 octets without splitting a UTF-8 character.
    lines=[]; current=''
    for char in line:
        if len((current+char).encode('utf-8'))>75:
            lines.append(current);current=' '
        current+=char
    lines.append(current)
    return '\r\n'.join(lines)


def build():
    events=DATA['events']
    assert len({e['id'] for e in events})==len(events), 'Duplicate exam identity'
    for e in events:
        assert not(set(e)-ALLOWED), 'Unapproved public field'
        assert e['course'] in ('234','235','258')
        assert e['startDate']<=e['endDate']
        assert e['deadline'].startswith(e['endDate'])
        assert e['kind'] in ('deadline','window')
        assert (ROOT/review(e)).exists(), review(e)
    content='\n'.join(card(e) for e in events)
    checked=date.fromisoformat(DATA['checkedOn']).strftime('%B %d, %Y')
    html=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Fall 2026 Exam Calendar · ABSN Study Hub</title>
<meta name="description" content="NUR 234, NUR 235 and NUR 258 exam dates, testing windows and study guides for Fall 2026.">
<link rel="stylesheet" href="assets/calendar/semester.css">
<script defer src="assets/calendar/exam-calendar.js"></script></head>
<body class="exam-calendar"><main id="main">
<header class="calendar-hero"><p class="semester-eyebrow">ABSN Study Hub · Fall 2026</p>
<h1>Exam calendar</h1><p>See what is due together, then jump straight to the right exam review.</p>
<div class="calendar-actions"><a class="action" href="nur234.html#course-study-resources">NUR 234</a>
<a class="action" href="nur235.html#course-study-resources">NUR 235</a><a class="action" href="nur258.html#course-study-resources">NUR 258</a></div>
<p class="muted">Checked against Google Calendar and its Canvas calendar on <b>{checked}</b>. Dates are in Mountain Time.</p>
<p>These are <b>deadlines and testing windows</b>, not confirmed exam start times. Check Canvas announcements for your assigned session.</p>
<p class="muted">This is a manually refreshed snapshot. Private calendar changes do not appear here automatically.</p></header>
<section aria-labelledby="connect-heading"><h2 id="connect-heading">Use these dates in Google Calendar</h2>
<div class="calendar-actions"><a class="action" href="assets/calendar/fall-2026.ics" download>Download exam dates (.ics)</a>
<a class="action" href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl" target="_blank" rel="noopener">Open Google Calendar · From URL ↗</a></div>
<details class="calendar-connect"><summary>Subscribe to the public exam calendar</summary>
<ol><li>On a computer, open Google Calendar and choose <b>Other calendars → + → From URL</b>.</li>
<li>Copy the public calendar URL below, paste it into Google Calendar, and choose <b>Add calendar</b>.</li></ol>
<label for="feed-url">Public exam calendar URL</label><input id="feed-url" readonly value="{PUBLIC}assets/calendar/fall-2026.ics">
<p>A subscription picks up future published updates when Google refreshes it. Downloaded files and individual added dates are copies; they do not update automatically.</p>
<p><a href="https://support.google.com/calendar/answer/37100?co=GENIE.Platform%3DDesktop" target="_blank" rel="noopener">Google’s instructions for adding a public calendar ↗</a></p></details></section>
<section aria-labelledby="dates-heading"><h2 id="dates-heading">Dates and study links</h2>
<div class="calendar-controls"><label for="course-filter">Course <select id="course-filter"><option value="all">All three courses</option>
<option value="234">NUR 234 · Maternal Newborn</option><option value="235">NUR 235 · Pediatrics</option><option value="258">NUR 258 · Adult Health II</option></select></label>
<label for="include-past"><input type="checkbox" id="include-past" checked> Include past exams</label></div>
<p id="calendar-status" class="calendar-status" role="status">All {len(events)} semester exam dates and testing windows are listed below.</p>
<div class="calendar-events">{content}</div><p id="calendar-empty" class="calendar-empty" hidden>No exams match this view. Include past exams to review the full semester.</p>
</section><footer>Only NUR 234, NUR 235 and NUR 258 exam information is shared here. Personal calendar events are excluded.<br>
<a href="index.html">← Study Hub</a> · <a href="study-plan.html">Study plan</a></footer></main>
<script defer src="absn-top.js"></script></body></html>
'''
    (ROOT/'exam-calendar.html').write_text(html,encoding='utf-8')
    lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ABSN Study Hub//Fall 2026 Exams//EN','CALSCALE:GREGORIAN',
           'METHOD:PUBLISH','X-WR-CALNAME:ABSN Fall 2026 Course Exams','X-WR-TIMEZONE:America/Denver']
    for e in events:
        title=f'NUR {e["course"]} - {e["title"]} - '+('Testing window' if e['kind']=='window' else 'Deadline '+deadline(e))
        lines+=['BEGIN:VEVENT',f'UID:{e["id"]}-fall2026@absn-study-hub',
                'DTSTAMP:'+compact(DATA['checkedOn'])+'T180000Z',
                'DTSTART;VALUE=DATE:'+compact(e['startDate']),'DTEND;VALUE=DATE:'+compact(next_date(e['endDate'])),
                'SUMMARY:'+ics_escape(title),'DESCRIPTION:'+ics_escape(detail(e)+'\nStudy: '+PUBLIC+review(e)+'\nLast checked: '+DATA['checkedOn']),
                'URL:'+PUBLIC+'exam-calendar.html#'+e['id'],'TRANSP:TRANSPARENT','END:VEVENT']
    lines+=['END:VCALENDAR']
    (ROOT/'assets/calendar/fall-2026.ics').write_bytes(('\r\n'.join(map(fold,lines))+'\r\n').encode('utf-8'))
    print(f'Built exam-calendar.html and public ICS: {len(events)} exams/windows')


if __name__=='__main__':
    build()
