"""Check source-list coverage, substantive cards, links, and preserved guide assets."""
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re
import subprocess
from bs4 import BeautifulSoup
from concise_guides import ROOT, MAP, topics_for

errors = []
cache = {}
tracked = set(subprocess.check_output(['git', 'ls-files'], cwd=ROOT, text=True).splitlines())


def check(condition, message):
    if not condition:
        errors.append(message)


def doc(path):
    if path not in cache:
        cache[path] = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
    return cache[path]


def local_link(url, base, context):
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc:
        return
    target = (base.parent / unquote(parsed.path)).resolve() if parsed.path else base
    if not target.exists():
        try: in_git = target.relative_to(ROOT).as_posix() in tracked
        except ValueError: in_git = False
        check(in_git, f'{context}: missing {url}')
        return
    if parsed.fragment and target.suffix == '.html':
        check(doc(target).find(id=unquote(parsed.fragment)) is not None, f'{context}: missing anchor {url}')


coverage = doc(ROOT / 'study-coverage.html')
for course in MAP:
    data = json.loads((ROOT / 'tools' / f'concise-topics-{course}.json').read_text(encoding='utf-8'))
    topics = data['topics']
    ids = [t['id'] for t in topics]
    check(len(ids) == len(set(ids)), f'{course}: duplicate content IDs')
    check(set(int(t['module']) for t in topics) == set(range(1, 14)), f'{course}: incomplete modules')
    for t in topics:
        check(re.fullmatch(r'[a-zA-Z0-9_-]+', t['id']), f'{course}: unsafe ID {t["id"]}')
        for field in ['title', 'recognize', 'act', 'remember', 'source']:
            check(isinstance(t.get(field), str) and bool(t[field].strip()), f'{t["id"]}: empty {field}')
        for field in ['recognize', 'act', 'remember']:
            check(len(t[field].split()) >= 4, f'{t["id"]}: insufficient {field}')
        local_link(t['source'], ROOT / 'index.html', t['id'])
    if data.get('checklist'):
        expected = Counter((int(x['module']), x['label']) for x in data['checklist'])
        actual = Counter((int(t['module']), label) for t in topics for label in t.get('covers', [t['title']]))
        check(not expected - actual, f'{course}: uncovered checklist entries {list((expected - actual).elements())}')
    if course == '234':
        check(Counter(t['module'] for t in topics) == Counter(dict(enumerate([3, 9, 5, 7, 9, 14, 3, 6, 13, 20, 13, 9, 19], 1))), '234: official 130-topic count mismatch')
    if course == '235':
        check(Counter(t['module'] for t in topics) == Counter(dict(enumerate([6, 9, 9, 9, 8, 17, 10, 13, 13, 14, 9, 13, 10], 1))), '235: expanded original review checklist mismatch')
    for exam in list(MAP[course]) + ['F']:
        filename = f'nur{course}-'+('final' if exam == 'F' else 'exam'+exam)+'-simple.html'
        path = ROOT / 'study-reviews' / filename
        soup = doc(path)
        cards = soup.select('.sg-reader .sg-topic')
        expected_ids = [t['id'] for t in topics_for(course, exam)]
        check([c['id'] for c in cards] == expected_ids, f'{filename}: card order/coverage mismatch')
        for card in cards:
            check(len(card.select('.sg-facts > li')) == 3, f'{filename}#{card["id"]}: missing essentials')
            check(card.select_one('.sg-visuals img') is not None, f'{filename}#{card["id"]}: missing memory visual')
        ids_on_page = [el['id'] for el in soup.select('[id]')]
        check(len(ids_on_page) == len(set(ids_on_page)), f'{filename}: duplicate HTML IDs')
        for el in soup.select('.sg-reader [href],.sg-reader img[src]'):
            local_link(el.get('href', el.get('src')), path, filename)
        for img in soup.select('.sg-reader img'):
            check(img.get('width') and img.get('height') and img.get('alt'), f'{filename}: image without dimensions/alt')
        # Existing course links and pictures must survive the new concise layer.
        old = BeautifulSoup(subprocess.check_output(['git', 'show', 'HEAD:study-reviews/'+filename], cwd=ROOT).decode('utf-8'), 'html.parser')
        for tag, attr in [('a', 'href'), ('img', 'src')]:
            old_values = {el[attr] for el in old.select(f'{tag}[{attr}]')}
            new_values = {el[attr] for el in soup.select(f'{tag}[{attr}]')}
            check(not old_values - new_values, f'{filename}: removed existing {attr}: {old_values-new_values}')
        print(f'{filename}: {len(cards)} concise cards')
    words = [sum(len(t[k].split()) for k in ('recognize', 'act', 'remember')) for t in topics]
    print(f'NUR{course}: {len(topics)} unique cards; {sum(words)/len(words):.0f} mean words; {max(words)} maximum; {sum(bool(t.get("sn")) for t in topics)} matching handouts')
if errors:
    print('\n'.join(errors))
    raise SystemExit(1)
print('PASS: complete module coverage, source anchors, images, concise cards, and preserved original resources.')
