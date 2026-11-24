#!/usr/bin/env python3
"""The pointer under each quiz question: where in the guides this exact item is taught.

Caroline, 24 Nov: instead of the "Open illustrated review" button (which opened a
page made for the quiz, study-reviews/quiz-topics/), she wants a pointer to the
place in her guides that teaches the exact item in the question - preferably an
already-established infographic, and only when it is very closely related.

assets/quiz-study/links.js reads assets/quiz-study/guide-pointers.json, which this
tool writes:   { "<question id>": [href, name, "picture" | "section" | "module"] }

Where a pointer comes from, first match wins:
  1. the question's own hand-set `card` in the quiz bank;
  2. tools/quiz-pointers.json - one decision per question, made by reading the
     question against the gallery's established pictures and the guide sections
     (helpers did this for every question on 24 Nov; correct an entry by hand and
     re-run --compile);
  3. the module page the question is filed under (MODULE in absn-lesson-links.js).

"Established" = a gallery card in infographics.html of kind infographic / sn /
visual, at the guide location the card itself names ("See it with the notes"),
or a headed section of a study page from search-index.json. Nothing under
assets/quiz-study/ or study-reviews/quiz-topics/ is ever a target.

  python3 tools/build-quiz-pointers.py --candidates DIR [--only-missing]
        write batch-NN.json (questions + shortlists) and catalog.json into DIR
  python3 tools/build-quiz-pointers.py --ingest DIR
        fold DIR/result-NN.json (helper decisions) into tools/quiz-pointers.json
  python3 tools/build-quiz-pointers.py --compile
        write assets/quiz-study/guide-pointers.json
  python3 tools/build-quiz-pointers.py --check [--verbose]
        exit 1 if guide-pointers.json is stale; pointers whose page or #anchor is
        missing are left out and counted (--verbose lists them)
"""
import collections, glob, hashlib, html, json, math, os, re, sys, unicodedata, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QS = os.path.join(ROOT, 'assets', 'quiz-study')
DECISIONS = os.path.join(ROOT, 'tools', 'quiz-pointers.json')
OUT = os.path.join(QS, 'guide-pointers.json')
SITE = 'https://arnold7777777.github.io/ABSN-Study-Hub/'
BATCH = 160
NEVER = ('assets/quiz-study/', 'study-reviews/quiz-topics/', 'study-reviews/radiation-simulation.html')


def read(rel):
    with open(os.path.join(ROOT, rel), encoding='utf-8') as f:
        return f.read()


# ---- the same normalising and hashing links.js does, so ids line up ---------
def normal(v):
    s = html.unescape(re.sub(r'<[^>]+>', ' ', str(v or '')))
    s = unicodedata.normalize('NFKD', s).lower()
    return re.sub(r'[^a-z0-9]', '', s)


def fnv(s):
    h = 2166136261
    for ch in s:
        h = ((h ^ ord(ch)) * 16777619) & 0xFFFFFFFF
    return format(h, 'x')


def plain(t):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', str(t or '')))).strip()


# ---- questions ---------------------------------------------------------------
ADDED = {}       # questions in the banks that Codex's catalog does not know yet: id -> (stem hash, label)


def load_questions():
    cat = json.loads(read('assets/quiz-study/question-links.json'))
    items, keys = cat['items'], cat['keys']
    ADDED.clear()
    fb = {}
    for f in sorted(glob.glob(os.path.join(QS, 'feedback-*.json'))):
        with open(f, encoding='utf-8') as fh:
            fb.update(json.load(fh))
    stems = {}
    for f in glob.glob(os.path.join(ROOT, 'study-reviews', 'quiz-topics', 'review-*.html')):
        with open(f, encoding='utf-8') as fh:
            for m in re.finditer(r'<article id="q-([0-9a-f]+)"><h2>(.*?)</h2>', fh.read(), re.S):
                stems[m.group(1)] = plain(m.group(2))
    qs = {}
    for qid, row in items.items():
        r = fb.get(qid) or {}
        stem = plain(r.get('prompt')) or stems.get(qid, '')
        if not stem:
            continue
        label = row[1] if row[1] != 'Question review' else ''
        qs[qid] = {'id': qid, 'stem': stem, 'answers': [plain(a) for a in r.get('answers') or []],
                   'why': plain(r.get('why')), 'label': label, 'course': '', 'mod': '', 'card': None}

    def ids_for(text):
        hit = keys.get(fnv(normal(text)))
        return hit if isinstance(hit, list) else ([hit] if hit else [])

    def bank(rel, course=None):
        s = read(rel)
        m = re.search(r'<script\b[^>]*id="qbank"[^>]*>(.*?)</script>', s, re.S)
        if m:
            d = json.loads(m.group(1))
        else:
            d = json.loads(s[s.index('=') + 1:].rstrip().rstrip(';'))
        rows = [(wk, q) for wk, v in d.items() for q in v] if isinstance(d, dict) else [(None, q) for q in d]
        for wk, q in rows:
            hit = ids_for(q.get('q'))
            fresh = not hit and q.get('q') and isinstance(q.get('opts') or q.get('o'), list)
            if fresh:
                # a question added after the catalog was made: give it an id so links.js can find it
                hit = [hashlib.md5(normal(q['q']).encode()).hexdigest()[:14]]
                ADDED[hit[0]] = (fnv(normal(q['q'])), plain(q.get('topic') or ''))
            if len(hit) == 1 and hit[0] not in qs and (fresh or hit[0] in items) and q.get('q'):
                # ... or one this tool added on an earlier run: the catalog has its id but no text
                opts = q.get('opts') or q.get('o') or []
                ans = q.get('ans') if q.get('ans') is not None else q.get('correct')
                ans = ans if isinstance(ans, list) else [ans]
                qs[hit[0]] = {'id': hit[0], 'stem': plain(q['q']), 'answers': [plain(opts[i]) for i in ans if isinstance(i, int) and i < len(opts)],
                              'why': plain(q.get('why') or q.get('r')), 'label': plain(q.get('topic') or ''), 'course': '', 'mod': '', 'card': None}
            if len(hit) != 1 or hit[0] not in qs:
                continue
            e = qs[hit[0]]
            c = course or q.get('course') or ''
            w = wk or q.get('week') or q.get('wk') or ''
            if c and not e['course']:
                e['course'], e['mod'] = c, str(w)
            if q.get('card') and not e['card']:
                e['card'] = [q['card'], plain(q.get('cardLabel') or '')]
            if not e['label'] and q.get('topic'):
                e['label'] = plain(q['topic'])

    bank('nur234-quiz.html', 'NUR234')
    bank('nur235-quiz.html', 'NUR235')
    bank('nur258-quiz.html', 'NUR258')
    bank('nur258-qbank.js', 'NUR258')
    bank('super-mega-quiz.html')
    return qs


# ---- the established material ------------------------------------------------
STOP = set('''a an the of and or to in on for with by is are was be as at from that this which what who how why when
should would does do nurse client patient following nursing care simple original pdf source handout study page
infographic nur module exam visual atlas plate vs versus guide overview notes all select apply most best first
priority action finding statement indicates has have about their not after before during will can may type
these those into than then them they its his her your you child adult year old reports report include includes
tell tells says ask asks new one two three four more less also each any other being been were had did'''.split())


def toks(t):
    out = []
    for w in re.findall(r'[a-z][a-z0-9]+', plain(t).lower()):
        if w in STOP or len(w) < 3:
            continue
        out.append(re.sub(r'(ies|es|s)$', '', w) if len(w) > 4 else w)
    return out


def page_title(rel, cache={}):
    if rel not in cache:
        try:
            m = re.search(r'<title>(.*?)</title>', read(rel)[:4000], re.S)
            t = plain(m.group(1)) if m else rel
        except OSError:
            t = rel
        t = re.split(r'\s[·|]\s(?:NG-\d+|Nursing Field Notes|ABSN Study Hub)', t)[0]
        cache[rel] = t.strip() or rel
    return cache[rel]


def load_pictures():
    s = read('infographics.html')
    starts = [m.start() for m in re.finditer(r'<div class="card[^"]*"[^>]*data-kind="', s)] + [len(s)]
    seen, pics = set(), []
    for a, b in zip(starts, starts[1:]):
        c = s[a:b]
        kind = re.search(r'data-kind="([^"]*)"', c).group(1)
        if kind not in ('infographic', 'sn', 'visual'):
            continue
        h = re.search(r'<h[34][^>]*>(.*?)</h[34]>', c, re.S)
        if not h:
            continue
        hrefs = [html.unescape(x) for x in re.findall(r'href="([^"]+)"', c)]
        if any(n in x for x in hrefs for n in NEVER):
            continue
        go = [(html.unescape(x), plain(t)) for x, t in re.findall(r'<a class="go" href="([^"]+)"[^>]*>(.*?)</a>', c, re.S)]
        target = next((x for x, t in go if 'notes' in t or 'study page' in t), None)
        if not target:
            target = next((x for x in hrefs if '.html' in x and not x.startswith('http')), None)
        if not target or target.startswith('http'):
            continue          # a picture with no place in a guide is not a pointer into the guides
        title = plain(h.group(1))
        key = (title.lower(), target)
        if key in seen:
            continue
        seen.add(key)
        kw = (re.search(r'data-kw="([^"]*)"', c) or [0, ''])[1]
        cls = (re.search(r'data-cls="([^"]*)"', c) or [0, ''])[1]
        mod = (re.search(r'data-mod="([^"]*)"', c) or [0, ''])[1]
        pics.append({'href': target, 'name': title, 'where': ' '.join(x for x in (cls, mod) if x),
                     'tt': toks(title), 'kt': toks(kw)})
    return pics


SKIP_PAGE = re.compile(r'^(study-reviews/quiz-topics/|study-reviews/radiation-simulation|games/|transcripts/|assets/|'
                       r'course-materials/|.*quiz|game-|lecture|playlists|podcasts|spotify-|infographics|index\.html$|'
                       r'study-coverage|exam-calendar|nur234-flashcards|super-mega|pharmacology-new|nur\d+-slides|nur\d+-podcasts|'
                       r'nur234\.html|nur235\.html|nur258\.html|study-reviews/index|study-reviews/.*final-simple|nur235-content-mastery)')


def load_sections():
    si = json.loads(read('search-index.json'))
    pages = [p['u'].replace(SITE, '') for p in si['pages']]
    hub = [p.get('s') == 'hub' for p in si['pages']]
    seen, secs = set(), []
    whole = collections.defaultdict(list)
    for e in si['entries']:
        pi = int(e['p'])
        rel = pages[pi]
        if not hub[pi] or rel.startswith('http') or SKIP_PAGE.search(rel) or not e.get('h'):
            continue
        whole[rel].append(plain(e['h']))
        if not e.get('a'):
            continue
        key = (rel, e['a'])
        if key in seen:
            continue
        seen.add(key)
        head = re.sub(r'^[^\w(]+', '', plain(e['h'])).strip()
        if len(head) < 3:
            continue
        secs.append({'href': rel + '#' + e['a'], 'name': head, 'where': page_title(rel),
                     'tt': toks(head), 'kt': toks(e.get('t', ''))[:120]})
    for rel, heads in whole.items():      # the page as a whole, for a question about its whole subject
        if re.search(r'(^|/)NG-\d|^pediatric-visuals/|^visual-mnemonics/|^more/|^neuro/|^cardio/|^thalassemia/', rel):
            t = page_title(rel)
            secs.append({'href': rel, 'name': t, 'where': 'whole page', 'tt': toks(t), 'kt': toks(' '.join(heads))[:120]})
    return secs


class Index:
    """Weighted word overlap: a word in the title counts three times a word in the body."""

    def __init__(self, docs):
        self.docs = docs
        self.post = collections.defaultdict(list)
        df = collections.Counter()
        for i, d in enumerate(docs):
            w = collections.Counter()
            for t in d['tt']:
                w[t] += 3
            for t in set(d['kt']):
                w[t] += 1
            d['_n'] = math.sqrt(8 + len(w))
            for t, v in w.items():
                self.post[t].append((i, v))
                df[t] += 1
        n = len(docs)
        self.idf = {t: math.log(1 + (n - c + .5) / (c + .5)) for t, c in df.items()}
        self.cap = n * .2

    def top(self, strong, weak, k, topic=()):
        sc = collections.Counter()
        for words, f in ((strong, 1.0), (weak, .35), (topic, 1.0)):
            for t in set(words):
                p = self.post.get(t)
                if not p or len(p) > self.cap:
                    continue
                for i, v in p:
                    sc[i] += f * v * self.idf[t]
        return [i for i, _ in sorted(((i, v / self.docs[i]['_n']) for i, v in sc.items()),
                                     key=lambda x: -x[1])[:k]]


def decisions():
    if os.path.exists(DECISIONS):
        with open(DECISIONS, encoding='utf-8') as f:
            return json.load(f)
    return {}


def candidates(out, only_missing):
    os.makedirs(out, exist_ok=True)
    qs = load_questions()
    pics, secs = load_pictures(), load_sections()
    pi, sx = Index(pics), Index(secs)
    done = decisions() if only_missing else {}
    todo = [q for q in qs.values() if not q['card'] and q['id'] not in done]
    todo.sort(key=lambda q: (q['course'], q['mod'].zfill(2), q['label'], q['stem']))
    cat = {'P': [[p['href'], p['name'], p['where']] for p in pics],
           'S': [[s['href'], s['name'], s['where']] for s in secs]}
    with open(os.path.join(out, 'catalog.json'), 'w', encoding='utf-8') as f:
        json.dump(cat, f, ensure_ascii=False)
    with open(os.path.join(out, 'pictures.txt'), 'w', encoding='utf-8') as f:
        for i, p in enumerate(pics):
            f.write('P%d\t%s%s\n' % (i, p['name'], (' [' + p['where'] + ']') if p['where'] else ''))
    n = 0
    for b in range(0, len(todo), BATCH):
        rows = []
        for q in todo[b:b + BATCH]:
            strong = toks(q['stem'] + ' ' + ' '.join(q['answers']))
            weak, topic = toks(q['why']), toks(q['label'])
            rows.append({'id': q['id'], 'course': (q['course'] + (' M' + q['mod'] if q['mod'] else '')).strip(),
                         'topic': q['label'], 'q': q['stem'][:420], 'answer': ' / '.join(q['answers'])[:260],
                         'pictures': ['P%d %s%s' % (i, pics[i]['name'], (' [' + pics[i]['where'] + ']') if pics[i]['where'] else '')
                                      for i in pi.top(strong, weak, 6, topic)],
                         'sections': ['S%d %s - %s' % (i, secs[i]['name'][:90], secs[i]['where'][:60])
                                      for i in sx.top(strong, weak, 6, topic)]})
        with open(os.path.join(out, 'batch-%02d.json' % n), 'w', encoding='utf-8') as f:
            json.dump(rows, f, ensure_ascii=False, indent=0)
        n += 1
    print('%d questions (%d with a hand-set card, %d to judge) · %d pictures · %d sections · %d batches in %s'
          % (len(qs), sum(1 for q in qs.values() if q['card']), len(todo), len(pics), len(secs), n, out))


def ingest(src):
    with open(os.path.join(src, 'catalog.json'), encoding='utf-8') as f:
        cat = json.load(f)
    dec = decisions()
    kinds = collections.Counter()
    for f in sorted(glob.glob(os.path.join(src, 'result-*.json'))):
        with open(f, encoding='utf-8') as fh:
            rows = json.load(fh)
        for qid, pick in rows.items():
            pick = (pick or '').strip()
            m = re.fullmatch(r'([PS])(\d+)', pick)
            if not m or int(m.group(2)) >= len(cat[m.group(1)]):
                dec[qid] = None
                kinds['none'] += 1
                continue
            href, name, where = cat[m.group(1)][int(m.group(2))]
            dec[qid] = ['picture' if m.group(1) == 'P' else 'section', href, name, where]
            kinds[dec[qid][0]] += 1
    with open(DECISIONS, 'w', encoding='utf-8') as f:
        json.dump(dec, f, ensure_ascii=False, indent=0, sort_keys=True)
    print('ingested', dict(kinds), '· total decisions', len(dec))


def module_map():
    s = read('absn-lesson-links.js')
    i = s.index('var MODULE')
    body = s[s.index('{', i):s.index('};', i)]
    return {k: [href, plain(label)] for k, href, label in
            re.findall(r'"([A-Z]+\d*:\d+)"\s*:\s*\[\s*"([^"]+)"\s*,\s*"([^"]*)"\s*\]', body)}


def build():
    qs = load_questions()
    dec = decisions()
    mods = module_map()
    out, kinds = {}, collections.Counter()
    for qid, q in sorted(qs.items()):
        d = dec.get(qid)
        if q['card']:
            href, name = q['card']
            row = [href, name or page_title(href.split('#')[0]), 'section']
        elif d:
            head = re.sub(r'(\s+Open)?\s+Close$|\s+\d+ parts$', '', d[2]).strip()   # fold-button text the index picked up
            if len(head) > 72:
                head = head[:72].rsplit(' ', 1)[0] + '…'
            where = d[3] if d[3] != 'whole page' else ''
            name = head + ((' · ' + where) if where and where.lower() not in head.lower() else '')
            row = [d[1], name, d[0]]
        else:
            m = mods.get('%s:%s' % (q['course'], q['mod']))
            if not m:
                kinds['none'] += 1
                continue
            row = [m[0], m[1], 'module']
        if any(n in row[0] for n in NEVER):
            kinds['none'] += 1
            continue
        out[qid] = row
        kinds[row[2]] += 1
    return out, kinds


def anchors(rel, cache={}):
    if rel not in cache:
        try:
            s = read(rel)
            cache[rel] = set(re.findall(r'\b(?:id|name)="([^"]+)"', s))
        except OSError:
            cache[rel] = None
    return cache[rel]


def bad_targets(out):
    bad = []
    for qid, (href, name, kind) in out.items():
        rel, _, frag = href.partition('#')
        ids = anchors(urllib.parse.unquote(rel.split('?')[0]))
        if ids is None:
            bad.append((qid, href, 'no such page'))
        elif frag and frag not in ids:
            bad.append((qid, href, 'no such anchor'))
    return bad


def main():
    a = sys.argv[1:]
    if a[:1] == ['--candidates']:
        return candidates(a[1], '--only-missing' in a)
    if a[:1] == ['--ingest']:
        return ingest(a[1])
    out, kinds = build()
    bad = bad_targets(out)
    # A pointer whose page or #anchor cannot be found here is left out (that includes pages on the
    # sibling sites, which this repo cannot check). Listed so a renamed anchor gets noticed.
    for qid, href, why in bad:
        out.pop(qid, None)
    if '--verbose' in a:
        for qid, href, why in bad:
            print('LEFT OUT', qid, href, why)
    text = json.dumps(out, ensure_ascii=False, separators=(',', ':'), sort_keys=True)
    if a[:1] == ['--check']:
        stale = not os.path.exists(OUT) or open(OUT, encoding='utf-8').read() != text
        print('%d pointers %s · %d left out (target not found) · %s' % (len(out), dict(kinds), len(bad), 'STALE' if stale else 'current'))
        sys.exit(1 if stale else 0)
    if a[:1] == ['--compile']:
        if ADDED:      # tell links.js about questions newer than Codex's catalog
            cat = json.loads(read('assets/quiz-study/question-links.json'))
            n = 0
            for qid, (h, label) in ADDED.items():
                if qid in out and qid not in cat['items'] and h not in cat['keys']:
                    cat['items'][qid] = ['', label or 'Question review', None]
                    cat['keys'][h] = qid
                    n += 1
            if n:
                with open(os.path.join(QS, 'question-links.json'), 'w', encoding='utf-8') as f:
                    json.dump(cat, f, ensure_ascii=False, separators=(',', ':'))
                print('added %d new question(s) to question-links.json' % n)
        with open(OUT, 'w', encoding='utf-8') as f:
            f.write(text)
        print('wrote %d pointers %s · dropped %d with a missing target' % (len(out), dict(kinds), len(bad)))
        return
    print(__doc__)


if __name__ == '__main__':
    main()
