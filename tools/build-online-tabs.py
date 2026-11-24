#!/usr/bin/env python3
"""Add a "<class> Online" tab per course to a copy of the NUR Lecture Library workbook.

Caroline, 24 Nov: "look for youtube and spotify playlists about the nursing courses nur 198, nur 175,
nur 234, 235, and 258 and make a separate sheet on this spreadsheet for each course with those ...
links instead of recordings. Find spotify podcasts and find youtube podcasts" - "esp stuff about
textbook chapters".

The list lives in tools/online-playlists.json ({course, section, url, note} plus the fields --verify
fills in from the live page: kind, title, owner, size, checked). Edit the JSON, never the tabs.

    python3 tools/build-online-tabs.py --verify          re-check every link live, refresh title/owner/size
    python3 tools/build-online-tabs.py --xlsx IN OUT     write the five tabs into a copy of the workbook

A link that fails --verify is reported and left out of the tabs. These tabs are someone else's
material, so build-lecture-library.py skips every tab ending " Online", the same way it skips the
" Spotify" tabs: lecture-library.html mirrors her own recordings only.
"""
import copy
import datetime
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, 'online-playlists.json')
ORDER = ['NUR175', 'NUR198', 'NUR234', 'NUR235', 'NUR258']
TITLE = {'NUR175': 'Mental Health', 'NUR198': 'Adult Health I', 'NUR234': 'Maternal & Newborn',
         'NUR235': 'Nursing Care of the Child', 'NUR258': 'Adult Health II'}
BOOKS = {'NUR175': 'Videbeck, Psychiatric-Mental Health Nursing + ATI RN Mental Health',
         'NUR198': 'Brunner & Suddarth (Hinkle), Medical-Surgical Nursing + ATI Adult Medical-Surgical',
         'NUR234': 'Pillitteri, Maternal & Child Health Nursing + ATI Maternal Newborn',
         'NUR235': 'ATI Nursing Care of Children + Pillitteri, Maternal & Child Health Nursing',
         'NUR258': 'Brunner & Suddarth (Hinkle), Medical-Surgical Nursing + ATI Adult Medical-Surgical'}
HDR = {'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en-US,en;q=0.9'}


def fetch(url):
    req = urllib.request.Request(url, headers=HDR)
    return urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'replace')


def check_youtube(url):
    pid = urllib.parse.parse_qs(urllib.parse.urlparse(url).query)['list'][0]
    s = fetch('https://www.youtube.com/playlist?list=' + pid)
    m = re.search(r'var ytInitialData = (\{.*?\});</script>', s)
    if not m:
        return None
    d = json.loads(m.group(1))
    title = d.get('metadata', {}).get('playlistMetadataRenderer', {}).get('title')
    # "Unavailable videos are hidden" arrives as an INFO alert on a healthy playlist; only an
    # ERROR alert (private, deleted) or a missing title means the link is dead.
    if not title or '"ERROR"' in json.dumps(d.get('alerts') or []):
        return None
    parts = re.findall(r'"content": "([^"]{2,80})"', json.dumps(d.get('header', {}), ensure_ascii=False))
    by = [p[3:] for p in parts if p.startswith('by ')]
    owner = by[0] if by else (parts[0] if parts and parts[0] != title else '')
    size = next((p for p in parts if re.search(r'\d[\d,]* (videos|episodes|lessons)', p)), '')
    kind = 'YouTube podcast' if 'Podcast' in parts or 'episodes' in size else 'YouTube playlist'
    return {'kind': kind, 'title': title, 'owner': owner, 'size': size}


def check_spotify(url):
    # oEmbed answers for a dead link with an error, but for a show it names the newest episode,
    # so the name and publisher come from the page's own og: tags.
    json.loads(fetch('https://open.spotify.com/oembed?url=' + urllib.parse.quote(url, safe='')))
    s = fetch(url)
    t = re.search(r'<meta property="og:title" content="([^"]*)"', s)
    dsc = re.search(r'<meta property="og:description" content="([^"]*)"', s)
    if not t:
        return None
    k = urllib.parse.urlparse(url).path.split('/')[1]
    kind = {'show': 'Spotify podcast', 'episode': 'Spotify episode', 'playlist': 'Spotify playlist'}[k]
    bits = [b.strip() for b in html.unescape(dsc.group(1)).split('\u00b7')] if dsc else []
    owner = size = ''
    if k in ('show', 'playlist') and len(bits) > 1:
        owner = bits[1]
        size = next((b for b in bits if re.match(r'\d+ (items|episodes)', b)), '')
    elif k == 'episode':
        m = re.search(r'Listen to this episode from (.+?) on Spotify', html.unescape(dsc.group(1)) if dsc else '')
        owner = m.group(1) if m else ''
    return {'kind': kind, 'title': html.unescape(t.group(1)), 'owner': owner, 'size': size}


def check(row):
    # YouTube turns away the odd request at random (a different playlist each run on 24 Nov),
    # so a link only counts as dead after three tries.
    for attempt in range(3):
        try:
            got = check_youtube(row['url']) if 'youtube.com' in row['url'] else check_spotify(row['url'])
        except Exception:  # network refusal, 404, private playlist
            got = None
        if got:
            return row, got
        time.sleep(2 + 3 * attempt)
    return row, None


def verify():
    rows = json.load(open(DATA, encoding='utf-8'))
    urls = {r['url'] for r in rows}
    seen = {}
    with ThreadPoolExecutor(8) as ex:
        for row, got in ex.map(check, [{'url': u} for u in sorted(urls)]):
            seen[row['url']] = got
    today = datetime.date.today().isoformat()
    bad = 0
    for r in rows:
        got = seen[r['url']]
        if got:
            # Course-style playlists ('N lessons') and some podcasts hide the channel and size in
            # this header; keep what an earlier check or the search result recorded.
            r.update({k: v for k, v in got.items() if v}); r['checked'] = today; r.pop('failed', None)
        else:
            r['failed'] = today; bad += 1
            print('FAILED', r['course'], r['url'])
    json.dump(rows, open(DATA, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    n = {}
    for r in rows:
        if 'failed' not in r:
            n.setdefault(r['course'], {}).setdefault(r['kind'], 0)
            n[r['course']][r['kind']] += 1
    for c in ORDER:
        print(c, n.get(c))
    print('%d links checked, %d failed' % (len(urls), bad))
    return bad


def add_tabs(src, dst):
    import openpyxl
    from openpyxl.worksheet.hyperlink import Hyperlink
    rows = [r for r in json.load(open(DATA, encoding='utf-8')) if 'failed' not in r and r.get('title')]
    wb = openpyxl.load_workbook(src)
    model = wb['NUR234 Exam Reviews']
    for cls in ORDER:
        name = cls + ' Online'
        if name in wb.sheetnames:
            del wb[name]
        ws = wb.create_sheet(name)
        ws['A1'] = '%s  ·  %s  ·  YouTube & Spotify (links)' % (cls, TITLE[cls])
        ws['A1']._style = copy.copy(model['A1']._style)
        ws.merge_cells('A1:F1')
        c = ws['A2']; c.value = '🏠 START HERE'; c._style = copy.copy(model['D2']._style)
        c.hyperlink = Hyperlink(ref='A2', location="'START HERE'!A1"); c.hyperlink.display = c.value
        ws['C2'] = 'Your textbooks: %s.' % BOOKS[cls]
        ws['C3'] = ("Not your own recordings - other people's free playlists and podcasts, each link checked "
                    "%s. Learn Nursing 101 has its own '%s Spotify' tab." % (
                        max(r['checked'] for r in rows), cls) if cls != 'NUR175' else
                    "Not your own recordings - other people's free playlists and podcasts, each link checked %s." %
                    max(r['checked'] for r in rows))
        for col, h in enumerate(['Section', 'Type', 'Title (tap to open)', 'Channel / show', 'Size', 'What it covers'], 1):
            ws.cell(5, col).value = h
            ws.cell(5, col)._style = copy.copy(model.cell(5, min(col, 4))._style)
        r = 6
        for x in [x for x in rows if x['course'] == cls]:
            vals = [x['section'], x['kind'], '=HYPERLINK("%s","%s")' % (x['url'], x['title'].replace('"', "'")),
                    x.get('owner', ''), x.get('size', ''), x['note']]
            for col, v in enumerate(vals, 1):
                ws.cell(r, col).value = v
                ws.cell(r, col)._style = copy.copy(model.cell(6, min(col, 4))._style)
            r += 1
        for col, w in zip('ABCDEF', (26, 17, 70, 24, 13, 70)):
            ws.column_dimensions[col].width = w
        ws.freeze_panes = 'A6'
    wb.save(dst)
    print('wrote', dst)


def main():
    if '--verify' in sys.argv:
        sys.exit(1 if verify() else 0)
    if '--xlsx' in sys.argv:
        i = sys.argv.index('--xlsx')
        add_tabs(sys.argv[i + 1], sys.argv[i + 2])
        return
    print(__doc__)


if __name__ == '__main__':
    main()
