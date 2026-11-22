#!/usr/bin/env python3
"""Build transcript pages from supplied SRT files without changing caption text."""
from pathlib import Path
import html, importlib.util, json, re

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('lecture_styles', ROOT/'tools/build-lecture-transcripts.py')
styles = importlib.util.module_from_spec(spec)
spec.loader.exec_module(styles)

def main():
    for item in json.loads((ROOT/'tools/supplied-transcripts.json').read_text(encoding='utf-8')):
        slug = item['slug']
        raw = (ROOT/f'files/transcripts/{slug}.srt').read_text(encoding='utf-8-sig')
        segments = []
        for block in re.split(r'\n\s*\n', raw.strip()):
            lines = block.splitlines()
            if len(lines) < 3:
                continue
            match = re.match(r'(\d+):(\d+):(\d+),(\d+) -->', lines[1])
            if not match:
                raise ValueError('Invalid SRT timecode')
            h, m, s, ms = map(int, match.groups())
            segments.append({'from': ((h*60+m)*60+s)*1000+ms, 'text': ' '.join(lines[2:])})
        chunks, chunk, length = [], [], 0
        for seg in segments:
            if chunk and length+len(seg['text']) > 450:
                chunks.append(chunk); chunk=[]; length=0
            chunk.append(seg); length += len(seg['text'])+1
        if chunk:
            chunks.append(chunk)
        stamp = styles.stamp
        body = '\n'.join(f'<section class="passage" id="t{c[0]["from"]}-{i}"><h3>{stamp(c[0]["from"])}</h3><p>{html.escape(" ".join(s["text"] for s in c))}</p></section>' for i,c in enumerate(chunks))
        title, meta = html.escape(item['title']), html.escape(item['meta'])
        fid = item['id']
        page = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} · Supplied transcript | NUR 234</title><style>{styles.STYLE}</style></head><body><main>
<header><p class="eyebrow">NUR 234 · Buhler course resources</p><h1>{title}</h1><p class="meta">{meta}</p></header>
<div class="actions"><a class="button" href="https://drive.google.com/file/d/{fid}/view" target="_blank" rel="noopener">Watch recording</a><a class="button" href="../nur234-m11.html">Postpartum module</a><a class="button" href="../nur234-m12.html#buhler-week-12">Buhler Week 12 resources</a><a class="button" href="../files/transcripts/{slug}.txt" download>Download transcript</a><a class="button" href="../files/transcripts/{slug}.srt" download>Download original subtitles</a></div>
<aside class="note"><strong>Supplied transcript.</strong> Caption wording and timestamps are preserved. Check unclear wording against the recording.</aside>
<div class="finder"><label for="find">Find words in this transcript</label><input id="find" type="search" placeholder="For example: hemorrhage" autocomplete="off"><p id="matches" role="status">{len(chunks)} timestamped passages</p></div>
<h2>Transcript</h2>{body}<p class="source">Source: the Chapter 25 recording and subtitle file supplied by Caroline.</p></main><script>{styles.SCRIPT}</script><script defer src="../absn-top.js"></script></body></html>'''
        (ROOT/f'transcripts/{slug}.html').write_text(page, encoding='utf-8')
        (ROOT/f'files/transcripts/{slug}.txt').write_text(item['title']+'\n'+item['meta']+'\nSupplied captions; wording and timestamps preserved.\n\n'+'\n\n'.join(f'[{stamp(s["from"])}] {s["text"]}' for s in segments),encoding='utf-8')
        print(f'{slug}: {len(segments)} captions, {len(chunks)} searchable passages')

if __name__ == '__main__':
    main()
