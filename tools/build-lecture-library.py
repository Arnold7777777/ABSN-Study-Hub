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
import html, io, json, os, re, shutil, sys
import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLISHED = os.path.join(ROOT, 'files', 'NUR-Lecture-Library.xlsx')
TEMPLATE = os.path.join(ROOT, 'tools', 'lecture-library.template.html')
PAGE = os.path.join(ROOT, 'lecture-library.html')

ZOOM_WB = '1rJXo8dn05hNyMbJZaQQz7iFtUB5SgRSc7XSluXC46IY'
LINK = re.compile(r'=HYPERLINK\("([^"]+)"\s*,\s*"(.*?)"\)', re.S)
NUM = re.compile(r'(?:module|week|wk|m)\s*0?(\d{1,2})\b', re.I)
GENERIC = re.compile(r'^\W*(watch|open|play|link|view|recording)\s*$', re.I)
SKIP_TABS = {'START HERE', 'Sheet1'}

GROUPS = [
 ('NUR 234', 'Maternal &amp; newborn', 'amethyst', '&#129334;',
  ['NUR234 Kaiser', 'NUR234 Buhler', 'NUR234 Glesner', 'NUR234 Exam Reviews']),
 ('NUR 235', 'Pediatrics', 'citrine', '&#129331;',
  ['NUR235 Fadell', 'NUR235 Fuller', 'NUR235 LSC exam prep', 'NUR235 Exam Reviews']),
 ('NUR 258', 'Med-surg', 'teal', '&#129658;',
  ['NUR258 Halecka', 'NUR258 Wagner', 'NUR258 Simmons', 'NUR258 Exam Reviews']),
 ('Other classes', 'NUR 198, NUR 175, BIO 290V and MAT 300', 'sapphire', '&#128218;',
  ['Exam Reviews (other classes)']),
 ('Still to file', 'Recordings whose class or lecturer is a best guess', 'garnet', '&#128269;',
  ['Sort me']),
]
TABCOURSE = {t: g[0].replace(' ', '') for g in GROUPS[:3] for t in g[4]}


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
                    m = LINK.search(s)
                    c.value = m.group(2) if m else None; n += 1
                elif 'Zoom Backup' in s:
                    c.value = ('\u2022  Every lecturer has their own sub-tab. '
                               'The Lecturer column repeats it row by row.'); n += 1
                elif 'Zoom cloud copy' in s:
                    # A note that points at a link this pass has just removed.
                    c.value = re.sub(r'\s*Title link = Zoom cloud copy,\s*', ' ', s).strip(); n += 1
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


def parse(v):
    """(url, label) for a HYPERLINK cell, else (None, plain text)."""
    if v is None:
        return None, ''
    m = LINK.search(str(v))
    return (m.group(1), m.group(2).strip()) if m else (None, str(v).strip())


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
            if name in hdr and any(LINK.search(str(ws.cell(r, hdr[name]).value or ''))
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
            chips = [str(ws.cell(r, c).value).strip() for _, c in chipcols if ws.cell(r, c).value]
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
    for text in row['chips'] + [row['title']]:
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
    bits = [c for c in row['chips'] if re.match(r'^(week|module|day|m\d)', str(c), re.I)]
    who = [c for c in row['chips']
           if c not in bits and not re.match(r'^(fall|spring|summer|prior)', str(c), re.I)]
    made = ' · '.join(bits + who[:1])
    if topic:
        made = (made + ' · ' + topic) if made else topic
    return made or 'Recording'


def render(rows, modmap):
    esc = lambda s: html.escape(s, quote=True)
    slug = lambda s: re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
    by = {t['tab']: t['rows'] for t in rows}
    total = sum(1 for t in rows for r in t['rows'] if r['url'])
    out, chips = [], []
    for gname, gsub, jewel, icon, tabs in GROUPS:
        n = sum(1 for t in tabs for r in by.get(t, []) if r['url'])
        chips.append('<a class="jump" href="#%s">%s %s <b>%d</b></a>' % (slug(gname), icon, esc(gname), n))
        out.append('<section class="grp" id="%s" style="--jewel:var(--%s)">' % (slug(gname), jewel))
        out.append('<h2>%s %s <span class="gn">%d</span></h2><p class="gsub">%s</p>'
                   % (icon, esc(gname), n, gsub))
        for tab in tabs:
            rs = by.get(tab, [])
            if not rs:
                out.append('<div class="tabempty"><b>%s</b> &mdash; nothing recorded yet. '
                           'The rows are set up in the workbook, waiting.</div>' % esc(tab))
                continue
            linked = [r for r in rs if r['url']]
            out.append('<details class="tab" id="tab-%s"><summary><span class="tt">%s</span>'
                       '<span class="tn">%d</span></summary><div class="tbody">'
                       % (slug(tab), esc(tab), len(linked)))
            for r in rs:
                tp = topic_for(tab, r, modmap)
                course = TABCOURSE.get(tab, '')
                search = ' '.join([r['title']] + r['chips'] +
                                  [r['note'], tab, tp, course, course.replace('NUR', 'NUR ')]).lower()
                out.append('<article class="lr" data-s="%s">' % esc(search))
                out.append('<h3>%s</h3>' % esc(title_for(r, tp)))
                if r['chips'] or tp:
                    out.append('<p class="chips">%s%s</p>' % (
                        ''.join('<span class="c">%s</span>' % esc(c) for c in r['chips']),
                        ('<span class="c topic">%s</span>' % esc(tp)) if tp else ''))
                if r['url']:
                    out.append('<a class="play" href="%s" target="_blank" rel="noopener">'
                               '&#9654;&#65039; Play on Drive</a>' % esc(r['url']))
                else:
                    out.append('<span class="noplay">No recording linked</span>')
                if r['note']:
                    out.append('<p class="note">%s</p>' % esc(r['note']))
                out.append('</article>')
            out.append('</div></details>')
        out.append('</section>')
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
    if n:
        wb.save(PUBLISHED)
        wb = openpyxl.load_workbook(PUBLISHED)
    page, total = render(read_rows(wb), module_topics())
    io.open(PAGE, 'w', encoding='utf-8').write(page)
    print('%d Zoom cells stripped; %d recordings; lecture-library.html %d bytes'
          % (n, total, len(page)))
    print('Now run: python3 tools/build-search-index.py')


if __name__ == '__main__':
    main()
