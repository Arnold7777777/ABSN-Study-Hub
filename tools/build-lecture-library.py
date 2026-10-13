#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Rebuild lecture-library.html from the NUR Lecture Library workbook.

Caroline keeps the workbook in Google Sheets and edits it by hand. This turns an
export of it into a page on the site, because a .xlsx is unreadable on the phone
she actually studies on.

Two things it does that are not obvious:

  * It strips every pointer to the NUR Zoom Backups workbook, and any
    zoom.us/rec/share URL, before anything is written. A Zoom share URL is
    itself the access credential and the backups workbook holds passwords, so
    neither may reach a public GitHub Pages site.
  * The lecturer tabs title a recording only "Halecka W4d1.mp4", so a search for
    "burns" would miss every lecture about burns. Each row gets its module's real
    subject from the same map playlists.html uses, as a chip and as search text.

    python3 tools/build-lecture-library.py [workbook.xlsx]

With no argument it re-reads files/NUR-Lecture-Library.xlsx, so re-running it is
safe and idempotent. Give it a fresh export to take in her latest edits; the
stripped copy is written back to files/ for the page's download button.
"""
import glob, html, io, json, os, re, shutil, sys
import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLISHED = os.path.join(ROOT, 'files', 'NUR-Lecture-Library.xlsx')
TEMPLATE = os.path.join(ROOT, 'tools', 'lecture-library.template.html')
PAGE = os.path.join(ROOT, 'lecture-library.html')

ZOOM_WB = '1rJXo8dn05hNyMbJZaQQz7iFtUB5SgRSc7XSluXC46IY'
ZOOM_CELL = "'START HERE'!$B$36"
# The leading \b matters: without it "Exam 3" matches on the m of Exam and
# every exam-review row gets the wrong module's subject.
NUM = re.compile(r'\b(?:module|week|wk|m)\s*0?(\d{1,2})\b', re.I)
GENERIC = re.compile(r'^\W*(watch|open|play|link|view|recording)\s*$', re.I)
SKIP_TABS = {'START HERE', 'Sheet1'}

# Three handouts were linked through cdn.fbsbx.com - Facebook CDN URLs carrying an
# expiring signature, so they rot. Her Drive holds each one; these are the
# link-shared copies in the 234/235/258 Resources tree, each confirmed by reading
# its first page rather than trusting the file name. Keyed by the PDF's own name
# inside the fbsbx URL, because a fresh export still carries the Facebook link
# every time - the fix has to live here, not only in the committed workbook.
DEAD_LINKS = {
    'NUR234_Exam1_Maternal_Study_Guide-1-2.pdf': '1G-isAusr4xSiEajdswjxRKPg2ZXah-E9',
    '234_Exam-1-Practice-Test.pdf':              '18sXhH2IZ8qhFlQThhjENr3rB-P8La9BX',
    '235_Exam1-Practice-Test.pdf':               '1Yv94xKT8ZGHW1GnrXWKFS0_AD8U-WOqr',
}
DRIVE = 'https://drive.google.com/file/d/%s/view'

# Recordings she has taken out of service, old file id -> (new id, old name, new
# name). One of the two NUR 235 Week 2 recordings had no sound and she could not
# tell which, so both were replaced with her fresh Fuller uploads (Fuller
# teaches the Fall 2026 cohort; Fadell taught the Spring 2026 one - they are two
# different people, so the two tabs stay separate). Her workbook
# still names the old files, and will until she imports the replacement, so do
# the swap on the way through - the same job DEAD_LINKS does for the dead
# Facebook links. Without this, a rebuild from her sheet silently re-links a
# recording she has retired.
REPLACED = {
    '1YDN4CgL8_FAt4iZlOI1XSOM0gWrLNzvB': (
        '1nxH_cDpLrnzakw8o7bN36vnLd_ha75al',
        'NUR258_Fall2026_SimpleNursing_Wk05_DayNA_Adrenal disorders - cortisol and steroids (topic from the speech index).mp4',
        'NUR258_Fall2026_SimpleNursing_Wk05_DayNA_Hyperaldosteronism (Conn syndrome).mp4'),
    '1yRquegiEz7A7eN-ms2smuTgrVaeivjoE': (
        '1LlXr19xnRaDRvh2CaY0NTa5m33OeLVNw',
        'Nur235_Fuller_Wk2.mp4',
        'NUR235_Fall2026_Fuller_Wk02_DayNA_Week 2 Check-In.mp4'),
    '1ZsiOFwQcKMaxmyj56WYyPr4Im3de1nZp': (
        '1TSnKc08spggBEKh7_RN-rLtAM4sXgiUa',
        'NUR235_Fall2026_Async_Wk02_DayNA_Nursing care of the infant.mp4',
        'NUR235_Fall2026_Fuller_Wk02_DayNA_Nursing care of the infant.mp4'),
    '1Hvmu7OUcu6SiYkAQl-7CSUP8aGpLRP_2': (
        '1AF4APNVK1nUVKVsDeOE_Mepqj-en-ldM',
        'DUPLICATE of NUR234_Summer2026_Kaiser_WkNA_DayNA_Final exam review - fetal heart rate monitoring and decelerations (6 Aug 2026) - was Final Review 1.mp4',
        'NUR234_Summer2026_Kaiser_WkNA_DayNA_Final exam review - fetal heart rate monitoring and decelerations (6 Aug 2026, 1-26-40).mp4'),
    '1I5SqOtY8opWDexyUBaWoTlfuy4oR_kSV': (
        '10tLIx65hCfOM86q3mZgMt6S33lH0fiIs',
        'DUPLICATE of NUR234_Summer2026_Kaiser_WkNA_DayNA_Final exam review day 2 - obstetric concepts (7 Aug 2026) - was Final Review 2.mp4',
        'NUR234_Summer2026_Kaiser_WkNA_DayNA_Final exam review day 2 - obstetric concepts and exam logistics (7 Aug 2026, 1-29-39).mp4'),
}

COURSES = [('NUR 234', 'NUR234', 'amethyst'),
           ('NUR 235', 'NUR235', 'citrine'),
           ('NUR 258', 'NUR258', 'teal')]
COURSE_TABS = {
 'NUR234': ['NUR234 Kaiser', 'NUR234 Buhler', 'NUR234 Glesner', 'NUR234 Exam Reviews', 'NUR234 Review videos'],
 'NUR235': ['NUR235 Fadell', 'NUR235 Fuller', 'NUR235 Exam Reviews', 'NUR235 Review videos'],
 'NUR258': ['NUR258 Halecka', 'NUR258 Wagner', 'NUR258 Simmons', 'NUR258 Exam Reviews', 'NUR258 Review videos'],
}
# Rows that carry no week go here, in this order, rather than being dropped.
TAILS = [('Exam reviews &amp; handouts', 'exam-reviews', 'sapphire', '&#128221;', 'Exam reviews',
          'Study guides, practice tests and whole-course reviews - they name an exam, not a week.'),
         ('Other classes', 'other-classes', 'emerald', '&#128218;', 'Other classes',
          'NUR 198, NUR 175, BIO 290V and MAT 300. A NUR week number means nothing for these.'),
         ('Still to file', 'still-to-file', 'garnet', '&#128269;', 'To file',
          'Recordings whose class or lecturer is still a best guess.')]

TABCOURSE = {t: c for c, tabs in COURSE_TABS.items() for t in tabs}
# A tab holding several courses names each row's course in its Course column.
# The shared Review videos tab (12 Oct) was split into one per course on 13 Oct;
# this stays as the fallback for any such tab.
ROW_COURSE_TABS = {'Review videos'}


def course_of(tab, row):
    if tab in TABCOURSE:
        return TABCOURSE[tab]
    if tab in ROW_COURSE_TABS:
        for n, v in row['chips']:
            if n == 'Course':
                m = re.search(r'NUR\s*(\d{3})', v, re.I)
                if m:
                    return 'NUR' + m.group(1)
    return ''


def strip_zoom(wb):
    """Remove everything that would publish a Zoom credential. Returns a count."""
    n = 0
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for c in row:
                # A cell's hyperlink object keeps its target after its value is
                # cleared, so START HERE!B36 once published the Zoom link with no
                # text showing (13 Oct). Check the target as well as the value.
                h = c.hyperlink
                if h is not None and any(z in (h.target or '') + (h.location or '')
                                         for z in (ZOOM_WB, 'zoom.us')):
                    c.hyperlink = None; n += 1
                if c.value is None:
                    continue
                s = str(c.value)
                # A button that reads its Zoom link from START HERE!B36 carries no
                # credential: B36 is blank in every published copy (12 Oct).
                if ZOOM_CELL in s:
                    continue
                if ZOOM_WB in s:
                    c.value = None; n += 1
                elif 'zoom.us' in s:
                    # Keep the row's title, drop only the URL.
                    c.value = (args_of(s)[1] or None) if s.strip().startswith('=HYPERLINK(') else None
                    n += 1
                elif 'Zoom Backup' in s:
                    c.value = ('\u2022  Every lecturer has their own sub-tab. '
                               'The Lecturer column repeats it row by row.'); n += 1
                elif 'Zoom cloud copy' in s:
                    # A note that points at a link this pass has just removed.
                    c.value = re.sub(r'\s*Title link = Zoom cloud copy,\s*', ' ', s).strip(); n += 1
    return n


def repoint(wb):
    """Swap the dead Facebook CDN links for her Drive copies. (fixed, unmatched)"""
    fixed = unmatched = 0
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for c in row:
                if c.value is None or 'cdn.fbsbx.com' not in str(c.value):
                    continue
                url, label = args_of(str(c.value))
                name = url.split('?')[0].rsplit('/', 1)[-1] if url else ''
                fid = DEAD_LINKS.get(name)
                if not fid:
                    # Leave it. A link that quietly vanishes is worse than a dead
                    # one, and the count says it needs a Drive copy finding.
                    unmatched += 1
                    continue
                c.value = '=HYPERLINK("%s","%s")' % (DRIVE % fid, label)
                fixed += 1
    return fixed, unmatched


def swap_replaced(wb):
    """Repoint every cell naming a retired recording. Returns the cell count.

    Both the link and the visible file name move, and the cell's hyperlink
    object has to move with them: clearing or rewriting only .value leaves the
    old target live behind the new label, which is worse than a stale link
    because it reads as correct.
    """
    n = 0
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for c in row:
                if c.value is None:
                    continue
                before = str(c.value)
                after = before
                for old_id, (new_id, old_name, new_name) in REPLACED.items():
                    after = after.replace(old_id, new_id).replace(old_name, new_name)
                if after == before and not (
                        c.hyperlink is not None and c.hyperlink.target
                        and any(o in c.hyperlink.target for o in REPLACED)):
                    continue
                c.value = after
                if c.hyperlink is not None and c.hyperlink.target:
                    t = c.hyperlink.target
                    for old_id, (new_id, _, _) in REPLACED.items():
                        t = t.replace(old_id, new_id)
                    c.hyperlink.target = t
                n += 1
    return n


def module_topics():
    """Course -> {module number: subject}, read off playlists.html's own cards."""
    s = io.open(os.path.join(ROOT, 'playlists.html'), encoding='utf-8').read()
    out, cur = {}, None
    for m in re.finditer(r'<h2>[^<]*?(NUR\s*\d{3})|<h3><span class="pmod">M(\d+)</span>([^<]+)</h3>', s):
        if m.group(1):
            cur = m.group(1).replace(' ', '')
        elif cur:
            out.setdefault(cur, {})[int(m.group(2))] = html.unescape(m.group(3)).strip()
    return out


def args_of(formula):
    """The two arguments of =HYPERLINK(...), each with its string pieces joined.

    A plain cell is =HYPERLINK("url","label"). But when the URL itself contains a
    double quote - Facebook's signed CDN links do - Sheets writes it concatenated,
    =HYPERLINK("...Va"&"Nitz...","label"), and a ("[^"]+") pattern stops at that
    inner quote and matches nothing. Three links were being dropped silently that
    way, so split on the top-level comma and join the literals instead.
    """
    body = formula.strip()[len('=HYPERLINK('):].rstrip()
    if body.endswith(')'):
        body = body[:-1]
    parts, buf, inside = [], [], False
    for ch in body:
        if ch == '"':
            inside = not inside
        if ch == ',' and not inside:
            parts.append(''.join(buf)); buf = []
        else:
            buf.append(ch)
    parts.append(''.join(buf))
    joined = [''.join(re.findall(r'"([^"]*)"', p)) for p in parts]
    return (joined + ['', ''])[:2]


def parse(v):
    """(url, label) for a HYPERLINK cell, else (None, plain text)."""
    if v is None:
        return None, ''
    s = str(v)
    if s.strip().startswith('=HYPERLINK('):
        url, label = args_of(s)
        if url:
            return url, label.strip()
    return None, s.strip()


def read_rows(wb):
    """One entry per workbook tab: its rows, each {title, url, chips, note}."""
    out = []
    for ws in wb.worksheets:
        if ws.title in SKIP_TABS:
            continue
        hdr = {}
        for c in range(1, ws.max_column + 1):
            h = ws.cell(5, c).value
            if h:
                hdr[str(h).strip()] = c
        if not hdr:
            continue
        linkcol = None
        for name in ('Link', 'Recording'):
            if name in hdr and any(str(ws.cell(r, hdr[name]).value or '').strip()
                                   .startswith('=HYPERLINK(')
                                   for r in range(6, ws.max_row + 1)):
                linkcol = hdr[name]
                break
        titlecols = [hdr[n] for n in ('Item', 'Recording', 'File') if n in hdr and hdr[n] != linkcol]
        chipcols = [(n, hdr[n]) for n in ('Exam', 'Class', 'Week', 'Module', 'Day', 'Date',
                                          'Lecturer', 'Who', 'Type', 'App', 'Course', 'Recorded')
                    if n in hdr]
        notecol = hdr.get('Notes')
        rows = []
        for r in range(6, ws.max_row + 1):
            url, lab = parse(ws.cell(r, linkcol).value) if linkcol else (None, '')
            title = ''
            for tc in titlecols:
                v = ws.cell(r, tc).value
                if v:
                    title = parse(v)[1]
                    break
            title = title or lab
            chips = [[n, str(ws.cell(r, c).value).strip()]
                     for n, c in chipcols if ws.cell(r, c).value]
            note = str(ws.cell(r, notecol).value).strip() if notecol and ws.cell(r, notecol).value else ''
            if not (url or title):
                continue          # an empty row, set up for the rest of the semester
            rows.append({'title': title, 'url': url, 'chips': chips, 'note': note})
        out.append({'tab': ws.title, 'rows': rows})
    return out


def topic_for(tab, row, modmap):
    course = course_of(tab, row)
    if not course:
        return ''
    for text in [v for _, v in row['chips']] + [row['title']]:
        m = NUM.search(str(text))
        if m:
            t = modmap.get(course, {}).get(int(m.group(1)), '')
            return t if t and t.lower() not in row['title'].lower() else ''
    return ''


def title_for(row, topic):
    """A dozen rows are titled only by the link's caption - "Watch", "Open"."""
    t = (row['title'] or '').strip()
    if t and not GENERIC.match(t):
        return t
    bits = [v for n, v in row['chips'] if n in ('Week', 'Module', 'Day')]
    who = [v for n, v in row['chips'] if n in ('Lecturer', 'Who', 'Class', 'Course')]
    made = ' · '.join(bits + who[:1])
    if topic:
        made = (made + ' · ' + topic) if made else topic
    return made or 'Recording'


def study_pages():
    """Week -> the NUR 258 module page. Globbed, so a renamed page cannot rot."""
    out = {}
    for f in glob.glob(os.path.join(ROOT, 'nur258-module-*.html')):
        m = re.search(r'module-(\d+)', os.path.basename(f))
        if m:
            out[int(m.group(1))] = os.path.basename(f)
    return out


def week_links(course, w, pages):
    """The rest of the study hub for this course's week, as chips.

    Only emit a chip whose target is really there - a guessed link is how 171
    handouts sat broken. NUR 234 and NUR 235 have no module pages at all, so
    they get two chips where NUR 258 gets three.
    """
    out = []
    if course == 'NUR258' and w in pages:
        out.append(('&#128214; Study page', pages[w]))
    out.append(('&#128444;&#65039; Infographics',
                'infographics.html?cls=NUR%%20%s&mod=M%d' % (course[3:], w)))
    pl = 'playlists/nur%s-module-%02d-drive.m3u' % (course[3:], w)
    if os.path.exists(os.path.join(ROOT, pl)):
        out.append(('&#127925; Playlist',
                    'playlists.html#pl-nur%s-module-%02d' % (course[3:], w)))
    return [(label, href) for label, href in out
            if href.startswith(('infographics.html?', 'playlists.html#'))
            or os.path.exists(os.path.join(ROOT, href))]


def week_of(tab, row):
    """The week (= module) this row belongs to, or None."""
    if not course_of(tab, row):
        return None
    for text in [v for n, v in row['chips'] if n in ('Week', 'Module')] + \
                [v for n, v in row['chips']] + [row['title']]:
        m = NUM.search(str(text))
        if m:
            w = int(m.group(1))
            return w if 1 <= w <= 14 else None
    return None


# ---------------------------------------------------------------------------
# The page. Codex's usability review (12 Oct 2026) asked for a lecture *finder*:
# a readable title instead of a storage file name, the term and any doubt shown
# on the card rather than buried in a note, one card per Drive file, counts that
# mean one thing, and each course's study links next to that course's
# recordings. Everything below is derived from the workbook row - nothing is
# invented: an unknown term says "Term unknown", a row whose day disagrees with
# another row for the same file says "Day unconfirmed".
# ---------------------------------------------------------------------------
CURRENT_TERM = 'Fall 2026'
CONVENTION = re.compile(r'^(?P<course>[A-Za-z]{3}\s?\d{3}V?)_(?P<term>[A-Za-z]+\d{4}|PriorTerm)_'
                        r'(?P<who>[^_]+)_Wk(?P<wk>[\w-]+?)_Day(?P<day>\w+?)_(?P<desc>.+?)'
                        r'(?:\.(?:mp4|m4a|mov|webm|mp3|pdf|pptx|docx))?$')
MEDIA_EXT = re.compile(r'\.(mp4|m4a|mov|webm|mp3)$', re.I)
DOC_EXT = re.compile(r'\.(pdf|pptx?|docx?)$', re.I)
# Words a storage name is made of that say nothing about the topic.
NOISE = re.compile(r'^(?:nur\d{3}|nur|\d{3}|fall\d{4}|spring\d{4}|summer\d{4}|priorterm|wkna|dayna|'
                   r'w\d+(?:d\d+)?|wk\d*|m\d+(?:d\d+)?|d\d+|day\d*|only|source|screen|recording|'
                   r'messenger|chrome|na|lecture)$', re.I)
UNSURE = re.compile(r'(needs? (?:checking|confirming)|to confirm|not confirmed|unconfirmed|not named|'
                    r'best guess|not sure|unverified|probabl|check (?:the|which|whether|it)|'
                    r'open it and tell|move the row if)', re.I)
NOT_A_PERSON = {'', 'not named', '?', 'exam prep', 'exam prep (lsc)', 'course handout'}
PROVENANCE = re.compile(r'\s*\(([^()]*\b(?:topic from|named from|speech index)\b[^()]*)\)', re.I)
TERM_IN_NAME = {'fall2026': 'Fall 2026', 'spring2026': 'Spring 2026', 'summer2026': 'Summer 2026',
                'priorterm': 'Prior term'}


def drive_id(url):
    m = re.search(r'(?:/d/|[?&]id=)([\w-]{20,})', url or '')
    return m.group(1) if m else (url or '')


def chip(row, *names):
    for n, v in row['chips']:
        if n in names and v:
            return v
    return ''


def display_title(row, wk, tab):
    """A title a person would write, from the row's own words only."""
    raw = (row['title'] or '').strip()
    if raw and not GENERIC.match(raw):
        m = CONVENTION.match(raw)
        if m:
            return m.group('desc').strip(), raw
        who = {v.lower() for n, v in row['chips'] if n in ('Lecturer', 'Who')}
        words3 = [w for w in re.findall(r'[A-Za-z]{3,}', MEDIA_EXT.sub('', raw))
                  if not NOISE.match(w) and w.lower() not in who]
        # a sentence with an .mp4 on the end is still a sentence
        descriptive = ' ' in raw and len(words3) >= 3 and not re.match(r'^\S+\s\S+\.\w+$', raw)
        if descriptive or not (MEDIA_EXT.search(raw) or '_' in raw):
            return MEDIA_EXT.sub('', DOC_EXT.sub('', raw)).strip(), raw
        who = {v.lower() for n, v in row['chips'] if n in ('Lecturer', 'Who')}
        words = re.split(r'[\s_]+', MEDIA_EXT.sub('', raw).replace('(Source)', ''))
        keep = [w for w in words if w and not NOISE.match(w) and w.lower() not in who]
        while keep and re.match(r'^\d+$', keep[0]):
            keep.pop(0)
        if any(len(re.sub(r'\W', '', w)) >= 3 and not re.search(r'\d', w) for w in keep):
            return ' '.join(keep).strip(' -'), raw
    if course_of(tab, row) and 'Exam Reviews' not in tab and wk:
        return 'Week %d lecture' % wk, raw
    if 'Exam Reviews' in tab:
        return (('Week %d exam review' % wk) if wk else 'Exam review recording'), raw
    return title_for(row, '') if row['title'] else 'Recording', raw


def term_of(row):
    d = chip(row, 'Date')
    if not d:
        m = CONVENTION.match(row['title'] or '')
        if m:
            d = TERM_IN_NAME.get(m.group('term').lower(), '')
    return d


def record(tab, row, sec, course_code, course_label, wk):
    """Everything one card needs, as plain data."""
    url = row['url']
    fid = drive_id(url) if url else ''
    typ = chip(row, 'Type').upper()
    doc = (typ in ('PDF', 'PPTX', 'POWERPOINT', 'DOCX') or fid in DEAD_LINKS.values()
           or bool(DOC_EXT.search(row['title'] or '')))
    title, raw = display_title(row, wk, tab)
    # "(topic from the speech index)" is a doubt, not part of the name: badge it
    prov = PROVENANCE.search(title)
    if prov:
        title = (title[:prov.start()] + title[prov.end():]).strip()
    cat = 'handout' if doc else ('examprep' if ('Exam Reviews' in tab or 'exam prep' in typ.lower())
                                 else 'lecture')
    who = chip(row, 'Lecturer', 'Who')
    return {'tab': tab, 'row': row, 'sec': sec, 'id': fid, 'url': url, 'doc': doc, 'cat': cat,
            'course': course_code, 'clabel': course_label, 'wk': wk, 'title': title, 'raw': raw,
            'who': who, 'day': chip(row, 'Day'), 'exam': chip(row, 'Exam'),
            'terms': [term_of(row)], 'days': [chip(row, 'Day')], 'notes': [row['note']] if row['note'] else [],
            'raws': [raw] if raw else [], 'chips': list(row['chips']),
            'prov': prov.group(1) if prov else ''}


def merge(recs):
    """One card per Drive file within a section; disagreements are shown, not resolved."""
    out, seen = [], {}
    for r in recs:
        k = r['id']
        if not k or k not in seen:
            if k:
                seen[k] = r
            out.append(r)
            continue
        a = seen[k]
        if re.match(r'^(Week \d+ (lecture|exam review)|Exam review recording|Recording)$', a['title']):
            a['title'] = r['title']
        a['terms'] += r['terms']; a['days'] += r['days']
        a['notes'] += [n for n in r['notes'] if n not in a['notes']]
        a['raws'] += [x for x in r['raws'] if x not in a['raws']]
        a['chips'] += r['chips']
        a['merged'] = a.get('merged', 1) + 1
    return out


def term_badge(r):
    ts = sorted({t for t in r['terms'] if t})
    if len(ts) > 1:
        return 'unconfirmed', 'Term unconfirmed'
    t = ts[0] if ts else ''
    if not t:
        return 'unknown', 'Term unknown'
    if t == CURRENT_TERM:
        return 'current', t
    return 'prior', 'Prior term' + ('' if t == 'Prior term' else ' &middot; ' + html.escape(t))


def card(r, esc, topic, seen_ids):
    tkey, tlabel = term_badge(r)
    days = sorted({d for d in r['days'] if d})
    day = days[0] if len(days) == 1 else ('Day unconfirmed' if days else '')
    unsure = (any(UNSURE.search(n) for n in r['notes']) or len(days) > 1 or tkey == 'unconfirmed'
              or bool(r['prov']))
    meta = [r['clabel']] if r['clabel'] else []
    if r['wk'] and r['sec'].startswith('week-'):
        meta.append('Week %d' % r['wk'])
    if r['exam'] and r['cat'] != 'lecture':
        meta.append(r['exam'].title() if r['exam'].isupper() and len(r['exam']) > 3 else r['exam'])
    if r['who'] and r['who'].lower() not in NOT_A_PERSON:
        meta.append(r['who'])
    elif r['cat'] == 'lecture':
        meta.append('Lecturer not named')
    if day:
        meta.append(day)

    wk = r['wk']
    wtok = (' week%d wk%d w%d m%d module%d week %d module %d wk %d' % ((wk,) * 8)) if wk else ''
    code = r['course'].replace(' ', '').lower()
    search = ' '.join([r['title']] + r['raws'] + [v for _, v in r['chips']] + r['notes'] +
                      [r['tab'], r['clabel'], code, topic, tlabel, r['cat'],
                       {'lecture': 'lecture class', 'examprep': 'exam prep review',
                        'handout': 'handout document pdf'}[r['cat']]]).lower() + wtok

    cid = 'lr-' + re.sub(r'[^\w-]', '', r['id'] or r['title'])[:48]
    # the same file can sit in a week and in the exam reviews; ids must stay unique
    seen_ids[cid] = seen_ids.get(cid, 0) + 1
    if seen_ids[cid] > 1:
        cid += '-%d' % seen_ids[cid]
    who = r['who'].lower() if r['who'] and r['who'].lower() not in NOT_A_PERSON else ''
    o = ['<article class="lr" id="%s" data-id="%s" data-course="%s" data-cat="%s" data-term="%s" '
         'data-who="%s" data-s="%s">' % (esc(cid), esc(r['id']), esc(r['course']), r['cat'],
                                         'unknown' if tkey == 'unconfirmed' else tkey, esc(who), esc(search))]
    o.append('<h4>%s</h4>' % esc(r['title']))
    o.append('<p class="meta">%s</p>' % ' &middot; '.join(esc(m) for m in meta))
    badges = ['<span class="c term %s">%s</span>' % (tkey, tlabel)]
    badges.append('<span class="c">%s</span>' % {'lecture': 'Lecture', 'examprep': 'Exam prep',
                                                 'handout': 'Handout'}[r['cat']])
    if unsure:
        badges.append('<span class="c warn">Needs verification</span>')
    o.append('<p class="chips">%s</p>' % ''.join(badges))
    if r['doc']:
        o.append('<a class="play doc" href="%s" target="_blank" rel="noopener">&#128196; Open document</a>'
                 % esc(r['url']))
    else:
        o.append('<a class="play" href="%s" target="_blank" rel="noopener">&#9654;&#65039; Play on Drive</a>'
                 % esc(r['url']))
    det = []
    if r['raws'] and any(x != r['title'] for x in r['raws']):
        det.append('<p><b>File name%s:</b> %s</p>' % ('s' if len(r['raws']) > 1 else '',
                                                      ' &middot; '.join(esc(x) for x in r['raws'])))
    if len(days) > 1:
        det.append('<p><b>Day:</b> %d workbook rows link this one file, as %s.</p>'
                   % (r.get('merged', 2), ' and '.join(esc(d) for d in days)))
    if r['prov']:
        det.append('<p><b>Topic:</b> %s.</p>' % esc(r['prov'][0].upper() + r['prov'][1:]))
    ts = sorted({t for t in r['terms'] if t})
    if len(ts) > 1:
        det.append('<p><b>Term:</b> the workbook lists this file as %s.</p>' % ' and '.join(esc(t) for t in ts))
    for n in r['notes']:
        det.append('<p>%s</p>' % esc(n))
    if det:
        o.append('<details class="more"><summary>Details</summary>%s</details>' % ''.join(det))
    o.append('</article>')
    return '\n'.join(o)


def render(rows, modmap):
    esc = lambda s: html.escape(s, quote=True)
    pages = study_pages()
    secs = {('week-%d' % w): [] for w in range(1, 15)}
    for t in TAILS:
        secs[t[1]] = []
    missing = []
    for t in rows:
        tab = t['tab']
        for row in t['rows']:
            wk = week_of(tab, row)
            if tab == 'Exam Reviews (other classes)':
                cls = chip(row, 'Class') or 'Other'
                code, label, sec = cls, cls.replace(' ?', ' (class unconfirmed)'), 'other-classes'
            else:
                code = course_of(tab, row) or 'Other'
                label = code.replace('NUR', 'NUR ') if code.startswith('NUR') else chip(row, 'Course') or 'To file'
                sec = ('week-%d' % wk) if wk else ('still-to-file' if tab == 'Sort me' else 'exam-reviews')
            if not row['url']:
                missing.append((label, row))
                continue
            secs[sec].append(record(tab, row, sec, code, label, wk))

    corder = {c: i for i, (_, c, _) in enumerate(COURSES)}
    def key(r):
        return (corder.get(r['course'], 5), r['course'], (r['who'] or '').lower(), r['day'],
                r['title'].lower())
    for s in secs:
        secs[s] = merge(sorted(secs[s], key=key))

    vids = {r['id'] for s in secs.values() for r in s if not r['doc']}
    docs = {r['id'] for s in secs.values() for r in s if r['doc']}
    total, handouts = len(vids), len(docs)

    seen_ids, out, weekopts = {}, [], []
    first = True
    order = ['week-%d' % w for w in range(1, 15)] + [t[1] for t in TAILS]
    for sec in order:
        recs = secs[sec]
        if not recs:
            if sec.startswith('week-'):
                out.append('<div class="wkempty"><b>Week %s</b> &mdash; nothing filed yet.</div>' % sec[5:])
            continue
        n = len({r['id'] for r in recs})
        if sec.startswith('week-'):
            w = int(sec[5:])
            name, jewel, blurb = 'Week %d' % w, '', ''
        else:
            t = [x for x in TAILS if x[1] == sec][0]
            name, jewel, blurb = '%s %s' % (t[3], t[0]), ' style="--jewel:var(--%s)"' % t[2], t[5]
        weekopts.append('<option value="%s">%s (%d)</option>' % (sec, re.sub(r'&#\d+;\s*', '', name), n))
        out.append('<details class="wk%s" id="%s" data-sec="%s"%s%s><summary><span class="wn">%s</span>'
                   '<span class="wc">%d</span></summary><div class="wbody">'
                   % ('' if sec.startswith('week-') else ' tail', sec, sec, jewel,
                      ' open' if first else '', name, n))
        first = False
        if blurb:
            out.append('<p class="blurb">%s</p>' % blurb)
        groups = []
        for r in recs:
            if not groups or groups[-1][0] != r['course']:
                groups.append((r['course'], r['clabel'], []))
            groups[-1][2].append(r)
        for code, label, rs in groups:
            subj = modmap.get(code, {}).get(int(sec[5:]), '') if sec.startswith('week-') else ''
            links = ''
            if sec.startswith('week-') and code in TABCOURSE.values():
                links = ''.join('<a class="go" href="%s">%s</a>' % (esc(h), lab)
                                for lab, h in week_links(code, int(sec[5:]), pages))
            out.append('<section class="cg" data-course="%s"><h3 class="cgh"><b>%s</b>%s</h3>%s'
                       % (esc(code), esc(label), (' &mdash; ' + esc(subj)) if subj else '',
                          ('<p class="gos">%s</p>' % links) if links else ''))
            for r in rs:
                out.append(card(r, esc, subj, seen_ids))
            out.append('</section>')
        out.append('</div></details>')

    if missing:
        out.append('<details class="wk tail" id="missing" style="--jewel:var(--garnet)"><summary>'
                   '<span class="wn">&#10067; Missing recordings</span><span class="wc">%d</span></summary>'
                   '<div class="wbody"><p class="blurb">Rows in the workbook with no file linked. '
                   'They are not counted above.</p><ul class="miss">%s</ul></div></details>'
                   % (len(missing), ''.join('<li><b>%s</b> &middot; %s%s</li>'
                                            % (esc(l), esc(r['title'] or 'untitled'),
                                               (' &mdash; ' + esc(r['note'])) if r['note'] else '')
                                            for l, r in missing)))

    whos = sorted({r['who'] for s in secs.values() for r in s
                   if r['who'] and r['who'].lower() not in NOT_A_PERSON}, key=str.lower)
    page = io.open(TEMPLATE, encoding='utf-8').read()
    return (page.replace('{{TOTAL}}', str(total))
                .replace('{{HANDOUTS}}', str(handouts))
                .replace('{{WEEKOPTS}}', ''.join(weekopts))
                .replace('{{WHOOPTS}}', ''.join('<option value="%s">%s</option>' % (esc(w.lower()), esc(w))
                                                for w in whos))
                .replace('{{BODY}}', '\n'.join(out))), total


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else PUBLISHED
    if not os.path.exists(src):
        sys.exit('%s: not found' % src)
    if os.path.abspath(src) != os.path.abspath(PUBLISHED):
        shutil.copy(src, PUBLISHED)
    wb = openpyxl.load_workbook(PUBLISHED)
    n = strip_zoom(wb)
    fixed, unmatched = repoint(wb)
    swapped = swap_replaced(wb)
    if n or fixed or swapped:
        wb.save(PUBLISHED)
        wb = openpyxl.load_workbook(PUBLISHED)
    page, total = render(read_rows(wb), module_topics())
    io.open(PAGE, 'w', encoding='utf-8').write(page)
    # index.html's card states the count. Hand-written numbers on this site drift
    # - the module pages' Infographics labels did - so derive it here too.
    idx = os.path.join(ROOT, 'index.html')
    src = io.open(idx, encoding='utf-8').read()
    fixed_idx = re.sub(r'(On this site &middot; )\d+( recordings)',
                       r'\g<1>%d\g<2>' % total, src, count=1)
    if fixed_idx != src:
        io.open(idx, 'w', encoding='utf-8').write(fixed_idx)
        print('index.html card updated to %d' % total)
    print('%d Zoom cells stripped; %d dead links repointed; %d cells moved to a '
          'replacement recording; %d recordings; lecture-library.html %d bytes'
          % (n, fixed, swapped, total, len(page)))
    if unmatched:
        print('WARNING: %d cdn.fbsbx.com link(s) left - they need a Drive copy '
              'finding and adding to DEAD_LINKS' % unmatched)
    # The page is regenerated from scratch, so its back bars go with it.
    import subprocess
    subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                                 'wire-back-links.py')], check=False)
    print('Now run: python3 tools/build-search-index.py')


if __name__ == '__main__':
    main()
