"""Keep full illustrations beside Module 11 subjects without changing resource galleries."""
from collections import defaultdict
from pathlib import Path
from html import escape
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'tools/module11-inline-placements.json'
STYLE = '<link rel="stylesheet" href="assets/study-reviews/module-inline-visuals.css">'
PATTERN = re.compile(r'\n?<!-- module11-inline:[^>]+ -->.*?<!-- /module11-inline -->\n?', re.S)


def figure(item):
    esc = lambda s: escape(str(s), quote=True)
    source = f'<a href="{esc(item["source"])}">Source + context</a>' if item.get('source') else ''
    license = f'<a href="{esc(item["licenseHref"])}">{esc(item["license"])}</a>' if item.get('licenseHref') else ''
    return (f'<figure><a href="{esc(item["href"])}"><img src="{esc(item["src"])}" width="{item["width"]}" height="{item["height"]}" loading="lazy" decoding="async" alt="{esc(item["caption"])}"></a>'
            f'<figcaption>{esc(item["caption"])} <span class="miv-links"><a href="{esc(item["href"])}">Open full size</a>{source}{license}</span></figcaption></figure>')


def insert_at(text, target, placement):
    tag = re.search(r'<(?P<tag>details|h[2-6])\b[^>]*\bid="'+re.escape(target)+r'"[^>]*>', text)
    if not tag:
        raise ValueError('Missing subject: ' + target)
    name = tag['tag']
    if name.startswith('h'):
        return text.index('</'+name+'>', tag.end()) + len(name) + 3
    end_summary = text.index('</summary>', tag.end()) + len('</summary>')
    if placement == 'after-overview':
        # Only inspect the first body region; never cross into another subject.
        end_details = text.index('</details>', end_summary)
        body = text[end_summary:end_details]
        if 'class="dxbody"' in body and '</section>' in body:
            return end_summary + body.index('</section>') + len('</section>')
        first_p = re.search(r'<p\b[^>]*>.*?</p>', body, re.S)
        if first_p:
            return end_summary + first_p.end()
    return end_summary


def render(text, figures):
    text = PATTERN.sub('', text)
    groups = defaultdict(list)
    for item in figures:
        if not item.get('alreadyLargeInline'):
            groups[(item['targetId'], item['placement'])].append(item)
    for (target, placement), items in groups.items():
        block = ('\n<!-- module11-inline:'+target+' -->\n<div class="module-inline-visuals" aria-label="Illustrations for this subject">'
                 + ''.join(figure(item) for item in items) + '</div>\n<!-- /module11-inline -->\n')
        pos = insert_at(text, target, placement)
        text = text[:pos] + block + text[pos:]
    if STYLE not in text:
        text = text.replace('</head>', STYLE+'</head>')
    return text


if __name__ == '__main__':
    data = json.loads(DATA.read_text(encoding='utf-8'))
    path = ROOT / data['page']
    before = path.read_text(encoding='utf-8')
    after = render(before, data['figures'])
    if '--check' in sys.argv:
        if before != after:
            raise SystemExit('Module 11 inline illustrations are stale.')
    else:
        path.write_text(after, encoding='utf-8')
    print(f'{len(data["figures"])} full figures beside Module 11 subjects; original galleries preserved.')
