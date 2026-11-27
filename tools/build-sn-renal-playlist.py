#!/usr/bin/env python3
"""Simple Nursing renal VLC playlist (Caroline, 27 Nov: "a simple nursing playlist using all simple nursing videos
about the renal system. Make it VLC and make it open on my phone").

    python3 tools/build-sn-renal-playlist.py

Writes playlists/simple-nursing-renal.m3u and .xspf and simple-nursing-renal-vlc-playlist.html (same player as the
NUR 258 Exam 5 page: assets/exam4-playlists/player.css/js). Each video streams the link-shared Drive copy the site
already links; byte-identical copies were left out. Edit TRACKS to add or move a video, then re-run.
"""
import html
import os
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

TRACKS = [  # (drive id, title, where it is filed)
    ('1dTptKjNsMpYHy05yc3kzqYs72cVgepP5', 'Renal anatomy and physiology', 'NUR 198 Module 9'),
    ('1_qsIBb8NQ4PUxMq1uwpUEXai_vk8roWy', 'Renal lab values', 'NUR 198 Module 9'),
    ('11mXkwroNhYWxE6xlDV5FzT2xPKDkd3BK', 'Kidney function and renal failure (Nurse Mike, 1:48)', 'NUR 198 Module 9'),
    ('1FbtKwpYrBCIQzsOVUcte6RFPMLfTZIrk', 'Renal failure: acute vs chronic', 'NUR 198 Module 9'),
    ('1_eL23c8NMwJL_XKWWG8LFHL6rZtYjvm9', 'Renal failure', 'NUR 198 Module 9'),
    ('1JAA1oQgUSK4b51Ld6ZZ6bYoZMtAgI84X', 'Renal and urinary disorders review: CKD, dialysis, incontinence', 'NUR 198 Module 9'),
    ('1_DuKCBvJMHsS-Jo91d3wYLCP-7qXk35e', 'Children: UTI, glomerulonephritis, nephrotic syndrome, enuresis', 'NUR 235 Module 13'),
    ('1IC6G86_Rf6lGoi8HsC63Mqij8A1AQoGL', 'Wilms tumor (nephroblastoma)', 'NUR 235 Module 5'),
    ('1YXwmU0qqnFw8SFgrWFISpWAJ3IDbEVg8', 'Neuroblastoma vs Wilms tumor', 'NUR 235 Module 5'),
    ('17ppc8UPWVGRPwcDKuzK9Yn1LccG87795', 'Long screen recording: Modules 9 and 10, renal then GI (6 GB)', 'NUR 198 Modules 9–10'),
    ('1gILr5q198xazdBSQQ_m4X6goyg9RUsDf', 'Long screen recording: Modules 9 and 10, part 2 (4.5 GB)', 'NUR 198 Modules 9–10'),
]
NAME = 'Simple Nursing - Renal system'
M3U = 'playlists/simple-nursing-renal.m3u'
XSPF = 'playlists/simple-nursing-renal.xspf'
PAGE = 'simple-nursing-renal-vlc-playlist.html'
SITE = 'https://arnold7777777.github.io/ABSN-Study-Hub/'


def stream(i):
    return 'https://drive.usercontent.google.com/download?id=%s&export=download&confirm=t' % i


def label(n, t, where):
    return '%02d. %s (%s)' % (n, t, where)


def main():
    m3u = ['#EXTM3U', '#PLAYLIST:' + NAME]
    for n, (i, t, w) in enumerate(TRACKS, 1):
        m3u += ['#EXTINF:-1,' + label(n, t, w), '#EXTVLCOPT:network-caching=5000', stream(i)]
    open(M3U, 'w', encoding='utf-8').write('\n'.join(m3u) + '\n')

    x = ["<?xml version='1.0' encoding='utf-8'?>", '<playlist version="1" xmlns="http://xspf.org/ns/0/">',
         '  <title>%s</title>' % html.escape(NAME), '  <trackList>']
    for n, (i, t, w) in enumerate(TRACKS, 1):
        x += ['    <track>', '      <location>%s</location>' % html.escape(stream(i)),
              '      <title>%s</title>' % html.escape(label(n, t, w)), '      <creator>Simple Nursing</creator>',
              '      <trackNum>%d</trackNum>' % n, '    </track>']
    x += ['  </trackList>', '</playlist>']
    open(XSPF, 'w', encoding='utf-8').write('\n'.join(x) + '\n')

    lis = []
    for i, t, w in TRACKS:
        s = stream(i)
        intent = ('intent://%s#Intent;scheme=https;type=video/*;package=org.videolan.vlc;S.browser_fallback_url=%s;end'
                  % (s[len('https://'):], quote(s, safe='')))
        lis.append('<li><h3>%s <span class="small">(%s)</span></h3><div class="actions">'
                   '<a class="button" href="https://drive.google.com/file/d/%s/view">Watch in Drive</a>'
                   '<a class="button phone-video" data-stream="%s" href="%s">Open this video in VLC</a>'
                   '<button type="button" data-copy="%s">Copy video link</button></div></li>'
                   % (html.escape(t), html.escape(w), i, html.escape(s), html.escape(intent), html.escape(s)))
    n = len(TRACKS)
    page = ('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            '<title>Simple Nursing renal playlist (VLC)</title>'
            '<meta name="description" content="Every Simple Nursing video about the renal system in one VLC playlist: anatomy, labs, '
            'acute and chronic kidney failure, dialysis, children\'s UTI, glomerulonephritis, nephrotic syndrome and Wilms tumor. Opens on a phone.">'
            '<link rel="stylesheet" href="assets/exam4-playlists/player.css"></head>'
            '<body class="exam4-playlist-page exam5-playlist-page"><a class="skip" href="#main">Skip to the playlist</a>'
            '<main id="main"><header><p class="eyebrow">Simple Nursing · Renal system</p><h1>Renal<br>VLC playlist</h1>'
            '<p>Every Simple Nursing video about the kidneys and urinary system in your Drive, from anatomy and labs to kidney failure, '
            'dialysis and the children\'s renal disorders. Stream it with an internet connection.</p>'
            '<nav class="actions" aria-label="Choose"><a class="button" href="#renal">Renal playlist · %d videos</a>'
            '<a class="button" href="#help">How to open in VLC</a></nav></header>'
            '<section class="help" id="help"><h2>Open your playlist</h2>'
            '<p><strong>Phone:</strong> Install VLC, then tap <strong>Open in VLC — Android</strong> or <strong>Open in VLC — iPhone / iPad</strong> '
            'below and accept the prompt to open VLC.</p>'
            '<p><strong>If the phone button does not open the whole list:</strong> tap <strong>Copy playlist link</strong>, then in VLC open '
            '<strong>Network / New stream</strong> and paste it. Each video below also has its own VLC button.</p>'
            '<p><strong>Computer:</strong> Download the .m3u playlist, then right-click it and choose <strong>Open with → VLC media player</strong>.</p>'
            '<p>Keep shuffle off to study in order. If a video stalls: VLC → Settings → Advanced → Network caching → 15000.</p>'
            '<p class="small">The .m3u and .xspf files are small lists of links; they do not download the videos.</p></section>'
            '<section class="collection" id="renal"><p class="eyebrow">NUR 198 Module 9 · NUR 235 Modules 5 and 13</p>'
            '<h2>Simple Nursing · renal system</h2><p><strong>%d videos</strong> · basics first, then disease, then children</p>'
            '<div class="actions"><a class="button primary" href="%s" download>Download VLC playlist (.m3u)</a>'
            '<a class="button phone-playlist" data-playlist="%s" data-platform="android" href="%s">Open in VLC — Android</a>'
            '<a class="button phone-playlist" data-playlist="%s" data-platform="ios" href="%s">Open in VLC — iPhone / iPad</a>'
            '<button type="button" data-copy-path="%s">Copy playlist link</button></div>'
            '<details><summary>Backup format and what is included</summary><p><a class="button" href="%s" download>Download VLC .xspf version</a></p>'
            '<p>One copy of each recording (checked by file size), using the link-shared copy the Study Hub already links. The last two are '
            'long screen recordings that run from the renal module into GI; they are at the end so the short videos come first. '
            'Left out: the adrenal (Addison and Cushing) video, and BPH/TURP, which is in the NUR 258 Exam 5 playlist.</p></details>'
            '<ol class="tracks">%s</ol></section><p id="copy-status" role="status" aria-live="polite"></p>'
            '<details id="copy-fallback"><summary>Link to copy manually</summary><label for="copy-value">Playlist or video URL</label>'
            '<textarea id="copy-value" readonly rows="4"></textarea></details>'
            '<footer><p>Original recordings: Simple Nursing. Duplicate check by file size: November 27, 2026.</p>'
            '<p class="actions"><a class="button" href="playlists.html">All playlists</a><a class="button" href="lectures.html#nur198-m9">NUR 198 Module 9 recordings</a></p></footer></main><script src="assets/exam4-playlists/player.js"></script>'
            '<script defer src="absn-top.js"></script></body></html>\n'
            % (n, n, M3U, M3U, M3U, M3U, M3U, M3U, XSPF, ''.join(lis)))
    open(PAGE, 'w', encoding='utf-8').write(page)
    print('%d tracks -> %s, %s, %s' % (n, M3U, XSPF, PAGE))


if __name__ == '__main__':
    main()
