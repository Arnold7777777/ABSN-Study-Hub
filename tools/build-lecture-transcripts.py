#!/usr/bin/env python3
"""Render timestamped lecture transcripts from reviewed automatic captions.

Source segments live in tools/lecture-transcripts/<slug>.json. Short sections
keep every spoken passage within the site's per-heading search-index limit.
"""
from pathlib import Path
import json,html,re

ROOT=Path(__file__).resolve().parent.parent
REG=json.loads((ROOT/'tools/lecture-transcripts.json').read_text(encoding='utf-8'))
STYLE='''
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#100e20;color:#f6f0fb;font:18px/1.65 system-ui,sans-serif;overflow-wrap:anywhere}main{max-width:900px;margin:auto;padding:28px 18px 70px}h1{font-size:clamp(1.8rem,5vw,2.8rem);line-height:1.18;color:#f7d991}h2{color:#a8e9da}a{color:#b6edee}a:focus-visible,input:focus-visible{outline:3px solid #ffdb85;outline-offset:4px}.eyebrow{color:#cdb9ed;font-weight:750}.meta{color:#d5d1e0}.actions{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}.button{display:inline-flex;align-items:center;min-height:48px;padding:10px 15px;border-radius:12px;border:1px solid #8bc6c0;background:#163936;color:#f2fff9;text-decoration:none;font-weight:700}.note{padding:16px 20px;border-left:4px solid #c8a4ee;border-radius:10px;background:#29213d}.finder{margin:25px 0;padding:18px;background:#152b40;border:1px solid #748da7;border-radius:14px}.finder label{display:block;font-weight:750;margin-bottom:8px}.finder input{width:100%;min-height:48px;font:inherit;padding:9px 12px;border:1px solid #abc4d5;border-radius:8px;background:#0c1928;color:#fff}.finder p{margin:8px 0 0;font-size:16px}.passage{margin:22px 0;padding:18px 20px;border-radius:14px;background:#211a32;border:1px solid #504361}.passage h3{margin:0 0 8px;font-size:16px;color:#ebcb89}.passage p{margin:0}mark{background:#f9d57c;color:#19142b;border-radius:3px;padding:0 2px}[hidden]{display:none!important}.source{font-size:16px;color:#d5d1e0}@media(max-width:400px){main{padding:20px 12px 60px}.passage{padding:14px}.actions a{width:100%}}@media print{body{background:#fff;color:#111}.finder,.actions,nav{display:none}.passage{background:#fff;border-color:#ccc;break-inside:avoid}h1,h2,.passage h3{color:#111}}
'''
SCRIPT='''
const query=document.getElementById('find'),status=document.getElementById('matches'),blocks=[...document.querySelectorAll('.passage')];
const original=blocks.map(b=>b.querySelector('p').textContent);
query.addEventListener('input',()=>{const q=query.value.trim().toLocaleLowerCase();let n=0;blocks.forEach((b,i)=>{const p=b.querySelector('p'),text=original[i],low=text.toLocaleLowerCase();b.hidden=!!q&&!low.includes(q);if(b.hidden)return;n++;p.replaceChildren();if(!q){p.textContent=text;return;}let start=0,at;while((at=low.indexOf(q,start))!==-1){p.append(document.createTextNode(text.slice(start,at)));const m=document.createElement('mark');m.textContent=text.slice(at,at+q.length);p.append(m);start=at+q.length;}p.append(document.createTextNode(text.slice(start)));});status.textContent=q?`${n} matching passages`:`${blocks.length} timestamped passages`;});
'''
def stamp(ms):
    seconds=int(ms/1000);return f'{seconds//60:02}:{seconds%60:02}'
def main():
    out=ROOT/'transcripts';out.mkdir(exist_ok=True)
    for f in REG:
        path=ROOT/'tools/lecture-transcripts'/f'{f["slug"]}.json'
        data=json.loads(path.read_text(encoding='utf-8'))
        chunks=[];chunk=[];length=0
        for seg in data['segments']:
            text=seg['text'].strip()
            # Very long decoder segments are divided without changing their text.
            pieces=re.findall(r'.{1,440}(?:\s|$)',text) if len(text)>460 else [text]
            for piece in pieces:
                piece=piece.strip()
                if chunk and length+len(piece)+1>470:
                    chunks.append(chunk);chunk=[];length=0
                chunk.append({'from':seg['from'],'text':piece});length+=len(piece)+1
        if chunk:chunks.append(chunk)
        body='\n'.join(f'<section class="passage" id="t{c[0]["from"]}-{i}"><h3>{stamp(c[0]["from"])}</h3><p>{html.escape(" ".join(s["text"] for s in c))}</p></section>' for i,c in enumerate(chunks))
        title=f'{f["title"]} — Halecka lecture transcript'
        downloads='../files/transcripts/'+f['slug']
        filename=html.escape(f['file'][:-4],quote=True)
        doc=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)} | NUR 258</title><meta name="description" content="Timestamped NUR 258 lecture transcript: {html.escape(f['title'],quote=True)}, Dr. Dana Halecka, {f['date']}."><style>{STYLE}</style></head><body>
<main><header><p class="eyebrow">NUR 258 · Module {f['module']} · Fall 2026</p><h1>{html.escape(f['title'])}</h1><p class="meta">Dr. Dana Halecka · {f['date']} · Recording length {f['duration']}</p></header>
<div class="actions"><a class="button" href="https://drive.google.com/file/d/{f['id']}/view" target="_blank" rel="noopener">▶ Watch recording</a><a class="button" href="../{f['module_page']}">Module {f['module']} study guide</a><a class="button" href="{downloads}.txt" download="{filename}.txt">Download transcript</a><a class="button" href="{downloads}.srt" download="{filename}.srt">Download VLC subtitles</a></div>
<aside class="note"><strong>Automatic transcript.</strong> Medical terms were spot-checked; some words may still be misheard. Confirm unclear wording with the recording and your course materials. Long silent sections were removed. Timestamps and subtitles match the edited recording.</aside>
<div class="finder"><label for="find">Find words in this transcript</label><input id="find" type="search" placeholder="For example: {html.escape(f.get('example','nursing care'),quote=True)}" autocomplete="off"><p id="matches" role="status">{len(chunks)} timestamped passages</p></div>
<h2>Lecture transcript</h2>{body}
<p class="source">Source: Caroline’s uploaded lecture recording. Automatically transcribed, with limited terminology corrections. This is a transcript of the class discussion, including its questions and examples.</p></main><script>{SCRIPT}</script></body></html>'''
        (out/f'{f["slug"]}.html').write_text(doc,encoding='utf-8')
        print(f'{f["slug"]}: {len(chunks)} searchable passages')
if __name__=='__main__':main()
