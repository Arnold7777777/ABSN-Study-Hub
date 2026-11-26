#!/usr/bin/env python3
"""Fold each course's Spotify, YouTube and Online tabs into that course's one "Review videos" tab.

    python3 tools/fold-review-tabs.py IN.xlsx OUT.xlsx

Caroline, 26 Nov: "You don't need to separate the review videos into youtube, spotify, simple nursing,
osmosis etc." So a course has instructor tabs, then Exam Reviews, then ONE Review videos tab; the Lecturer
column says where a row comes from:

    Learn Nursing 101 (Spotify)        an episode; Recording = 🎧 Listen, Other link = 🎧 MP3 (no Spotify)
    <channel> (YouTube)                the same-topic YouTube video for that episode
    <channel> (YouTube playlist) etc.  a whole playlist or podcast from the "<class> Online" list

`build-spotify-library.py --xlsx` and `build-online-tabs.py --xlsx` still write their own tabs; run this
after them. Rows whose link is already on the Review videos tab are not added twice, and the source tabs are
deleted. `build-lecture-library.py` leaves these tagged rows off the site's library page (the podcast has
its own pages: Caroline, 31 Oct).
"""
import copy
import re
import sys

import openpyxl

KINDS = (' Spotify', ' YouTube', ' Online')
LINK = re.compile(r'=HYPERLINK\("([^"]+)"\s*,\s*"((?:[^"]|"")*)"\)')
TAGGED = re.compile(r'\((Spotify|YouTube)[^)]*\)\s*$')      # what build-lecture-library.py skips


def hdr_row(ws):
    for r in range(1, 9):
        vals = [str(c.value).strip() for c in ws[r] if c.value]
        if len(vals) >= 3 and 'Exam' in vals:
            return r
    raise SystemExit('no header row on ' + ws.title)


def last(ws):
    for r in range(ws.max_row, 0, -1):
        if any(c.value not in (None, '') for c in ws[r]):
            return r
    return 0


def module_label(v):
    v = str(v or '').strip()
    m = re.match(r'M(\d+)\b', v)
    if m:
        return 'Module %d' % int(m[1])
    return v or 'All modules'


def link(cell_value):
    m = LINK.match(str(cell_value or ''))
    return (m[1], m[2].replace('""', '"')) if m else (None, None)


def formula(url, label):
    return '=HYPERLINK("%s","%s")' % (url, label.replace('"', '""'))


def rows_from(ws):
    """Rows for the Review videos tab from one Spotify / YouTube / Online tab, as dicts keyed by header."""
    hr = hdr_row(ws)
    h = {str(c.value).strip(): c.column for c in ws[hr] if c.value}
    g = lambda r, k: ws.cell(r, h[k]).value if k in h else None
    out = []
    for r in range(hr + 1, last(ws) + 1):
        if ws.title.endswith(' Spotify'):
            url, _ = link(g(r, 'Listen'))
            if not url:
                continue
            mins = g(r, 'Minutes'); pub = g(r, 'Published')
            note = '%s · %s min%s' % (g(r, 'Episode'), mins, (' · ' + str(pub)) if pub else '')
            out.append(dict(Exam=g(r, 'Exam'), Module=module_label(g(r, 'Module')), Lecturer='Learn Nursing 101 (Spotify)',
                            Recording=formula(url, '🎧 Listen'), Notes=note, _url=url, _ep=str(g(r, 'Episode') or '')))
        elif ws.title.endswith(' YouTube'):
            url, _ = link(g(r, 'Watch'))
            if not url:
                continue
            mp3, _ = link(g(r, 'No Spotify'))
            note = '%s · %s min · same topic as the Learn Nursing 101 episode "%s"' % (g(r, 'YouTube video'), g(r, 'Minutes'),
                                                                                     g(r, 'Topic (podcast episode)'))
            out.append(dict(Exam=g(r, 'Exam'), Module=module_label(g(r, 'Module')), Lecturer='%s (YouTube)' % (g(r, 'Channel') or 'YouTube'),
                            Recording=formula(url, '▶ Watch'), Notes=note, _url=url, _mp3=mp3,
                            _ep=str(g(r, 'Topic (podcast episode)') or '')))
        else:  # Online
            url, title = link(g(r, 'Title (tap to open)'))
            if not url:
                continue
            kind = g(r, 'Type') or 'playlist'
            bits = [title or '', str(g(r, 'What it covers') or '').strip()]
            note = ' — '.join(b for b in bits if b)
            if g(r, 'Size'):
                note += ' (%s)' % g(r, 'Size')
            if g(r, 'Section'):
                note += ' · ' + str(g(r, 'Section'))
            out.append(dict(Exam=g(r, 'Exam') or 'All exams', Module=g(r, 'Module') or 'All modules',
                            Lecturer='%s (%s)' % (g(r, 'Channel / show') or '', kind), Recording=formula(url, '▶ Open'),
                            Notes=note, _url=url))
    # the MP3 ("no Spotify") link of each episode goes beside its Spotify row
    mp3 = {r['_ep']: r.get('_mp3') for r in out if r.get('_mp3')}
    for r in out:
        if r['Lecturer'].endswith('(Spotify)') and mp3.get(r['_ep']):
            r['Other link'] = formula(mp3[r['_ep']], '🎧 MP3 (no Spotify)')
    return out


def exam_key(v):
    v = str(v or '')
    m = re.search(r'Exam (\d+)', v)
    if m: return int(m[1])
    if 'final' in v.lower(): return 9
    return 0 if 'all' in v.lower() else 8


def module_key(v):
    m = re.search(r'(\d+)', str(v or ''))
    return int(m[1]) if m else 0


def fold(wb, dest_for):
    """dest_for(course) -> the Review videos worksheet for that course (created by the caller if needed)."""
    log = []
    sources = [ws for ws in wb.worksheets if ws.title.endswith(KINDS)]
    by_course = {}
    for ws in sources:
        by_course.setdefault(ws.title.rsplit(' ', 1)[0], []).append(ws)
    for course, tabs in by_course.items():
        dest = dest_for(course)
        hr = hdr_row(dest)
        h = {str(c.value).strip(): c.column for c in dest[hr] if c.value}
        if 'Other link' not in h:
            c = max(h.values()) + 1
            dest.cell(hr, c).value = 'Other link'
            dest.cell(hr, c)._style = copy.copy(dest.cell(hr, c - 1)._style)
            h['Other link'] = c
        notes = h.get('Notes') or h.get('Topic')
        rec = h.get('Recording') or h.get('Link')
        width = max(h.values())
        lr = last(dest)
        have = set()
        for r in range(hr + 1, lr + 1):
            u, _ = link(dest.cell(r, rec).value)
            if u: have.add(u)
        new = []
        for ws in tabs:
            new += [x for x in rows_from(ws) if x['_url'] not in have]
        # existing rows + new rows, re-sorted by exam, module, then source
        model = [copy.copy(dest.cell(hr + 1, c)._style) for c in range(1, width + 1)]
        rows = []
        for r in range(hr + 1, lr + 1):
            rows.append(dict(vals=[dest.cell(r, c).value for c in range(1, width + 1)],
                             st=[copy.copy(dest.cell(r, c)._style) for c in range(1, width + 1)],
                             hl=[copy.copy(dest.cell(r, c).hyperlink) if dest.cell(r, c).hyperlink else None for c in range(1, width + 1)]))
        for x in new:
            vals = [None] * width
            for k, c in (('Exam', h.get('Exam')), ('Module', h.get('Module')), ('Lecturer', h.get('Lecturer')),
                         ('Recording', rec), ('Notes', notes), ('Other link', h['Other link'])):
                if c and x.get(k) is not None: vals[c - 1] = x[k]
            rows.append(dict(vals=vals, st=[copy.copy(s) for s in model], hl=[None] * width))
        g = lambda row, c: row['vals'][c - 1] if c else None
        rows.sort(key=lambda row: (exam_key(g(row, h.get('Exam'))), module_key(g(row, h.get('Module'))),
                                   1 if TAGGED.search(str(g(row, h.get('Lecturer')) or '')) else 0,
                                   str(g(row, h.get('Lecturer')) or '').lower()))
        for i, row in enumerate(rows):
            r = hr + 1 + i
            for c in range(1, width + 1):
                cell = dest.cell(r, c)
                cell.value = row['vals'][c - 1]; cell._style = row['st'][c - 1]; cell.hyperlink = None
                if row['hl'][c - 1] is not None:
                    hl = copy.copy(row['hl'][c - 1]); hl.ref = cell.coordinate; cell.hyperlink = hl
        for ws in tabs:
            wb.remove(ws)
        log.append('%s: %d rows folded in from %s' % (dest.title, len(new), ', '.join(t.title for t in tabs)))
    return log


def default_dest(wb):
    def dest_for(course):
        name = course + ' Review videos'
        if name in wb.sheetnames:
            return wb[name]
        model = next(ws for ws in wb.worksheets if ws.title.endswith(' Review videos'))
        ws = wb.copy_worksheet(model); ws.title = name
        hr = hdr_row(ws)
        if ws.max_row > hr:
            ws.delete_rows(hr + 1, ws.max_row - hr)
        return ws
    return dest_for


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    wb = openpyxl.load_workbook(sys.argv[1])
    print('\n'.join(fold(wb, default_dest(wb))))
    wb.save(sys.argv[2])
