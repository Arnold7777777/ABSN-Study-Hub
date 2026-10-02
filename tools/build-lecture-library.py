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
# tell which, so both were replaced with her fresh Fuller uploads. Her workbook
# still names the old files, and will until she imports the replacement, so do
# the swap on the way through - the same job DEAD_LINKS does for the dead
# Facebook links. Without this, a rebuild from her sheet silently re-links a
# recording she has retired.
REPLACED = {
    '1yRquegiEz7A7eN-ms2smuTgrVaeivjoE': (
        '1LlXr19xnRaDRvh2CaY0NTa5m33OeLVNw',
        'Nur235_Fuller_Wk2.mp4',
        'NUR235_Fall2026_Fuller_Wk02_DayNA_Week 2 Check-In.mp4'),
    '1ZsiOFwQcKMaxmyj56WYyPr4Im3de1nZp': (
        '1TSnKc08spggBEKh7_RN-rLtAM4sXgiUa',
        'NUR235_Fall2026_Async_Wk02_DayNA_Nursing care of the infant.mp4',
        'NUR235_Fall2026_Fuller_Wk02_DayNA_Nursing care of the infant.mp4'),
}

COURSES = [('NUR 234', 'NUR234', 'amethyst'),
           ('NUR 235', 'NUR235', 'citrine'),
           ('NUR 258', 'NUR258', 'teal')]
COURSE_TABS = {
 'NUR234': ['NUR234 Kaiser', 'NUR234 Buhler', 'NUR234 Glesner', 'NUR234 Exam Reviews'],
 'NUR235': ['NUR235 Fadell', 'NUR235 Fuller', 'NUR235 LSC exam prep', 'NUR235 Exam Reviews'],
 'NUR258': ['NUR258 Halecka', 'NUR258 Wagner', 'NUR258 Simmons', 'NUR258 Exam Reviews'],
}
# Rows that carry no week go here, in this order, rather than being dropped.
TAILS = [('Exam reviews &amp; handouts', 'exam-reviews', 'sapphire', '&#128221;', 'Exam reviews',
          'Study guides, practice tests and whole-course reviews - they name an exam, not a week.'),
         ('Other classes', 'other-classes', 'emerald', '&#128218;', 'Other classes',
          'NUR 198, NUR 175, BIO 290V and MAT 300. A NUR week number means nothing for these.'),
         ('Still to file', 'still-to-file', 'garnet', '&#128269;', 'To file',
          'Recordings whose class or lecturer is still a best guess.')]

TABCOURSE = {t: c for c, tabs in COURSE_TABS.items() for t in tabs}


def strip_zoom(wb):
    """Remove everything that would publish a Zoom credential. Returns a count."""
    n = 0
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for c in row:
                if c.value is None:
                    continue
                s = str(c.value)
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
    course = TABCOURSE.get(tab)
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
    if tab not in TABCOURSE:
        return None
    for text in [v for n, v in row['chips'] if n in ('Week', 'Module')] + \
                [v for n, v in row['chips']] + [row['title']]:
        m = NUM.search(str(text))
        if m:
            w = int(m.group(1))
            return w if 1 <= w <= 14 else None
    return None


def card_html(row, tab, esc, topic=''):
    """One recording. The week heading names the subject, so the chips name who.

    The subject is not shown on the card - the heading above already says it - but
    it does go into data-s, or searching "prenatal" or "endocrine" finds only the
    handful of rows that happen to spell it in their file name.
    """
    course = TABCOURSE.get(tab, '')
    pretty = course.replace('NUR', 'NUR ') if course else ''
    who = [v for n, v in row['chips'] if n in ('Lecturer', 'Who')]
    day = [v for n, v in row['chips'] if n == 'Day']
    kind = [v for n, v in row['chips'] if n in ('Type', 'Exam', 'Class')]
    chips = ([pretty] if pretty else []) + who + day + kind

    wk = week_of(tab, row)
    # Every spelling of the week, so "week 5", "module 5", "m5" and "wk5" all land.
    wtok = ' week%d wk%d m%d module%d week %d module %d' % ((wk,) * 6) if wk else ''
    search = (' '.join([row['title']] + [v for _, v in row['chips']] +
                       [row['note'], tab, course, pretty, topic]) + wtok).lower()

    o = ['<article class="lr" data-s="%s">' % esc(search)]
    o.append('<h3>%s</h3>' % esc(title_for(row, '')))
    if chips:
        o.append('<p class="chips">%s</p>' %
                 ''.join('<span class="c%s">%s</span>'
                         % (' cse' if c == pretty else '', esc(c)) for c in chips))
    if row['url']:
        doc = (any(v.strip().upper() in ('PDF', 'PPTX', 'POWERPOINT')
                   for n, v in row['chips'] if n == 'Type')
               or any(fid in row['url'] for fid in DEAD_LINKS.values()))
        o.append('<a class="play" href="%s" target="_blank" rel="noopener">%s</a>'
                 % (esc(row['url']),
                    '&#128196; Open on Drive' if doc else '&#9654;&#65039; Play on Drive'))
    else:
        o.append('<span class="noplay">No recording linked</span>')
    if row['note']:
        o.append('<p class="note">%s</p>' % esc(row['note']))
    o.append('</article>')
    return '\n'.join(o)


def render(rows, modmap):
    esc = lambda s: html.escape(s, quote=True)
    by = {t['tab']: t['rows'] for t in rows}
    total = sum(1 for t in rows for r in t['rows'] if r['url'])

    weeks = {w: [] for w in range(1, 15)}
    tails = {t[1]: [] for t in TAILS}
    order = {c: i for i, (_, c, _) in enumerate(COURSES)}
    for tab, rs in by.items():
        for r in rs:
            w = week_of(tab, r)
            if w:
                weeks[w].append((tab, r))
            elif tab == 'Sort me':
                tails['still-to-file'].append((tab, r))
            elif tab == 'Exam Reviews (other classes)':
                tails['other-classes'].append((tab, r))
            else:
                tails['exam-reviews'].append((tab, r))

    def key(pair):
        tab, r = pair
        who = ([v for n, v in r['chips'] if n in ('Lecturer', 'Who')] or [''])[0]
        day = ([v for n, v in r['chips'] if n == 'Day'] or [''])[0]
        return (order.get(TABCOURSE.get(tab, ''), 9), who.lower(), day, r['title'].lower())
    for w in weeks:
        weeks[w].sort(key=key)
    for k in tails:
        tails[k].sort(key=key)

    pages = study_pages()
    out, chips = [], []
    first_open = True
    for w in range(1, 15):
        items = weeks[w]
        n = sum(1 for _, r in items if r['url'])
        chips.append('<a class="jump" href="#week-%d">Wk %d <b>%d</b></a>' % (w, w, n))
        if not items:
            out.append('<div class="wkempty"><b>Week %d</b> &mdash; nothing filed yet.</div>' % w)
            continue
        opened = ' open' if first_open else ''
        first_open = False
        out.append('<details class="wk" id="week-%d"%s><summary>'
                   '<span class="wn">Week %d</span><span class="wc">%d</span></summary>'
                   '<div class="wbody">' % (w, opened, w, n))
        bits = []
        for pretty, code, _ in COURSES:
            subj = modmap.get(code, {}).get(w, '')
            if not subj:
                continue
            links = ''.join('<a class="go" href="%s">%s</a>' % (esc(h), lab)
                            for lab, h in week_links(code, w, pages))
            bits.append('<span class="sj"><b>%s</b> %s%s</span>'
                        % (pretty, esc(subj),
                           ('<span class="gos">%s</span>' % links) if links else ''))
        out.append('<p class="subj">%s</p>' % ''.join(bits))
        for tab, r in items:
            out.append(card_html(r, tab, esc,
                                 modmap.get(TABCOURSE.get(tab, ''), {}).get(w, '')))
        out.append('</div></details>')

    for title, tid, jewel, icon, short, blurb in TAILS:
        items = tails[tid]
        n = sum(1 for _, r in items if r['url'])
        chips.append('<a class="jump" href="#%s">%s %s <b>%d</b></a>' % (tid, icon, short, n))
        out.append('<details class="wk tail" id="%s" style="--jewel:var(--%s)"><summary>'
                   '<span class="wn">%s %s</span><span class="wc">%d</span></summary>'
                   '<div class="wbody"><p class="subj"><span class="sj">%s</span></p>'
                   % (tid, jewel, icon, title, n, blurb))
        for tab, r in items:
            out.append(card_html(r, tab, esc))
        out.append('</div></details>')

    page = io.open(TEMPLATE, encoding='utf-8').read()
    return (page.replace('{{TOTAL}}', str(total))
                .replace('{{CHIPS}}', ''.join(chips))
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
    print('Now run: python3 tools/build-search-index.py')


if __name__ == '__main__':
    main()
