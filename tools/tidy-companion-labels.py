#!/usr/bin/env python3
"""Make the companion pages' course-label panels readable (Caroline, 8 Oct:
"needs indents on the bullets, maybe not so spaced out between lines. It just
does not make sense").

Codex's companion pages (assets/modules-1-7/visuals/*.html) list every text
label from an old diagram as its own <p>, in drawing order: the panel title
again, then "normal", "sickled", "TRIGGER", "→ oxygen"... Each <details
class="source-panel"> made only of plain <p> labels is rewritten as:
  * the repeated title line dropped (it is the panel's summary already)
  * an all-caps short label  -> a small subheading (.lab-h); back-to-back
    subheadings (column headers) join with " · "
  * a line starting "→" / "=" -> joined onto the line it answers
  * everything else          -> an indented bullet list (.lab-list)
Every label's text and its <span data-source-text> wrapper is kept.
Styles live at the end of visuals.css. Idempotent: tidied panels are skipped.
    python3 tools/tidy-companion-labels.py
"""
import glob, html, os, re, sys
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
def txt(h): return ' '.join(html.unescape(re.sub(r'<[^>]+>','',h)).split())
PANEL=re.compile(r'(<details class="source-panel"[^>]*><summary>)(.*?)(</summary>)(.*?)(</details>)',re.S)
tot=0; pages=0
for f in sorted(glob.glob('assets/modules-1-7/visuals/*.html')):
    s=open(f,encoding='utf-8').read()
    def fix(m):
        global tot
        body=m.group(4)
        if 'class="lab-' in body: return m.group(0)
        ps=re.findall(r'<p>(.*?)</p>',body,re.S)
        if not ps or re.sub(r'\s*<p>.*?</p>\s*','',body,flags=re.S).strip(): return m.group(0)  # only plain p panels
        S=txt(m.group(2)); items=[]
        for p in ps:
            t=txt(p)
            if not items and t==S: continue
            if items and re.match(r'^(→|->|=)',t) and items[-1][0]=='li':
                items[-1][1]+=' '+p.strip(); continue
            letters=re.sub(r'[^A-Za-z]','',t)
            kind='h' if letters and letters==letters.upper() and len(t)<=48 and not re.search(r'\d{2,}',t) else 'li'
            items.append([kind,p.strip()])
        out=[];open_ul=False
        for k,h in items:
            if k=='h':
                if open_ul: out.append('</ul>'); open_ul=False
                out.append('<p class="lab-h">%s</p>'%h)
            else:
                if not open_ul: out.append('<ul class="lab-list">'); open_ul=True
                out.append('<li>%s</li>'%h)
        if open_ul: out.append('</ul>')
        tot+=1
        return m.group(1)+m.group(2)+m.group(3)+''.join(out)+m.group(5)
    t=PANEL.sub(fix,s)
    if t!=s: open(f,'w',encoding='utf-8').write(t); pages+=1
print(tot,'panels tidied on',pages,'pages')
n=0
for f in glob.glob('assets/modules-1-7/visuals/*.html'):
    s=open(f,encoding='utf-8').read(); t=s
    rx=re.compile(r'<p class="lab-h">(.*?)</p><p class="lab-h">(.*?)</p>',re.S)
    while True:
        u=rx.sub(lambda m:'<p class="lab-h">%s &middot; %s</p>'%(m.group(1),m.group(2)),t)
        if u==t: break
        t=u
    if t!=s: open(f,'w',encoding='utf-8').write(t); n+=1
