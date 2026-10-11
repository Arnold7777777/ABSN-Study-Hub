#!/usr/bin/env python3
"""Give every hand-written infographic card on the course and module pages a picture.

The "Infographics" boxes on the module pages (data-slot="info") and a few hub
lists hold <a class="igcard"> links. Most carry a preview image; 435 did not,
and showed only a title and "Open matching infographics ->" or "opens in
Drive ->" over an empty box. Caroline asked (11 Oct) for a preview of the
infographic itself on every one of them.

Each card is matched to the Visual library (infographics.html), which already
has a preview for nearly everything:
  1. a Drive link      -> the gallery card with the same Drive file id
  2. a page on the site -> the gallery card that links to that page, or the
                           page's own screenshot in img/previews/
  3. a gallery search  -> the gallery card whose title matches the card's
     (infographics.html?q=...)  title; the card is then pointed straight at
                           that infographic instead of at a search

  python3 tools/add-igcard-previews.py           # write
  python3 tools/add-igcard-previews.py --check   # report, change nothing
  python3 tools/add-igcard-previews.py --list    # show what is still unmatched

Re-run it after adding hand-written cards. Generated slots (Visual references,
decks) are written with their previews already and are not touched.
"""
import glob
import html
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

CARD = re.compile(r'<a class="igcard(?P<cls>[^"]*)"(?P<attrs>[^>]*)>(?P<body>.*?)</a>', re.S)
DRIVE = re.compile(r'drive\.google\.com/file/d/([\w-]{20,})')
IMG = re.compile(r'<img [^>]*>')

# cards whose target is not in the gallery and has no picture of its own;
# their previews were made by hand on 11 Oct (first slide, first PDF page, a
# drawn page of the Word document's questions)
EXTRA = {
    '1DJwx7Or7yN0VWnEO-s1d8ycdNfWkZcAhRKRuDEW26Ek': 'img/previews/nur258-exam1-classmate-slides.webp',
    '1-9mc4pCoO3U0RelTSXvh6jAHSMRq4lnt': 'img/previews/nur235-extra-peds-dosage-practice.webp',
    'img/infographics/illustrated-infectious-disease-drug-guide.pdf': 'img/previews/illustrated-infectious-disease-drug-guide-pdf.webp',
}
# gallery titles that differ from the card's only by a file-name suffix
ALIAS = {'hormone list 3 of 3 v2': 'hormone list 3 of 3 2',
         'diabetes pharmacology and surgery': 'diabetes ii'}


def attr(tag, name):
    m = re.search(r'\b%s="([^"]*)"' % name, tag)
    return m.group(1) if m else ''


def norm(t):
    t = html.unescape(re.sub(r'<[^>]+>', ' ', t)).lower()
    t = t.replace('&', ' and ')
    return re.sub(r'[^a-z0-9]+', ' ', t).strip()


def gallery():
    s = open('infographics.html', encoding='utf-8').read()
    p0 = s.index('<div id="pool" hidden>')
    by_id, by_href, by_title = {}, {}, {}
    for c in re.split(r'(?=<div class="card)', s[p0:])[1:]:
        im = next((t for t in IMG.findall(c) if 'img/previews/' in attr(t, 'src')), None)
        if not im:
            continue
        pic = dict(src=attr(im, 'src'), w=attr(im, 'width'), h=attr(im, 'height'))
        if not (pic['w'] and pic['h']):
            continue
        hrefs = [html.unescape(h) for h in re.findall(r'href="([^"]+)"', c)]
        title = re.search(r'<h3>(.*?)</h3>', c, re.S)
        title = title.group(1) if title else ''
        main = hrefs[0] if hrefs else ''
        pic['title'] = title
        pic['main'] = main
        for h in hrefs:
            d = DRIVE.search(h)
            if d:
                by_id.setdefault(d.group(1), pic)
            elif not re.match(r'^[a-z]+:', h) and '.html' in h:
                by_href.setdefault(h.split('#')[0], pic)
        if title:
            by_title.setdefault(norm(title), pic)
    return by_id, by_href, by_title


def own_shot(path):
    """img/previews/<path with / _ . as ->.webp - the page screenshots."""
    slug = re.sub(r'[/_.]+', '-', path.lower())
    f = 'img/previews/%s.webp' % slug
    if os.path.exists(f):
        try:
            from PIL import Image
            w, h = Image.open(f).size
        except Exception:
            return None
        return dict(src=f, w=str(w), h=str(h), title='', main=path)
    return None


def size_of(f):
    from PIL import Image
    w, h = Image.open(f).size
    return str(w), str(h)


def picture(f):
    if not os.path.exists(f):
        return None
    if f.endswith('.svg'):
        return None
    w, h = size_of(f)
    return dict(src=f, w=w, h=h, title='', main='')


def hero(path, frag=''):
    """The page's own first raster picture (inside #frag if given), saved as a
    760px preview in img/previews/ so the card does not pull the full plate."""
    if not os.path.exists(path):
        return None
    s = open(path, encoding='utf-8').read()
    if frag:
        i = s.find('id="%s"' % frag)
        if i < 0:
            return None
        s = s[i:i + 6000]
    for t in IMG.findall(s):
        src = os.path.normpath(os.path.join(os.path.dirname(path), attr(t, 'src')))
        if not os.path.exists(src):
            continue
        if src.endswith('.svg'):
            if attr(t, 'width') and attr(t, 'height'):
                return dict(src=src, w=attr(t, 'width'), h=attr(t, 'height'), title='', main='')
            continue
        slug = re.sub(r'[/_.]+', '-', (path + ('-' + frag if frag else '')).lower())
        dst = 'img/previews/%s.webp' % slug
        if not os.path.exists(dst):
            from PIL import Image
            im = Image.open(src)
            W, H = im.size
            sc = min(1.0, 760 / max(W, H))
            im.convert('RGB').resize((round(W * sc), round(H * sc)), Image.LANCZOS) \
              .save(dst, 'WEBP', quality=82, method=6)
        return picture(dst)
    return None


def resolve(page, href, name, idx):
    by_id, by_href, by_title = idx
    h = html.unescape(href)
    for key, f in EXTRA.items():
        if key in h:
            return picture(f), None
    t = norm(name)
    if t in ALIAS:
        name = ALIAS[t]
    d = DRIVE.search(h)
    if d:
        return by_id.get(d.group(1)) or by_title.get(norm(name)), None
    if h.startswith('infographics.html'):
        pic = by_title.get(norm(name))
        return pic, (pic['main'] if pic else None)
    if h.startswith('#'):
        return hero(page, h[1:]), None
    if re.match(r'^[a-z]+:', h) or '.html' not in h:
        return by_title.get(norm(name)), None
    path = os.path.normpath(os.path.join(os.path.dirname(page), h.split('#')[0]))
    return (by_href.get(path) or own_shot(path) or by_title.get(norm(name)) or hero(path)), None


def subtitle_for(target):
    if DRIVE.search(target):
        return 'Opens in Drive &rarr;'
    if target.startswith('img/') or target.endswith('.webp'):
        return 'Infographic &middot; opens full size &rarr;'
    return 'Open the study page &rarr;'


def fix(page, s, idx, report):
    out, pos, n = [], 0, 0
    for m in CARD.finditer(s):
        attrs, body = m.group('attrs'), m.group('body')
        href = attr(attrs, 'href')
        if 'hasprev' in m.group('cls'):
            # already has a picture; only a card that still opens a gallery
            # search is pointed at its own infographic (with that one's picture)
            if not href.startswith('infographics.html') or 'Open matching infographics' not in body:
                continue
            body = re.sub(r'<span class="igprev">.*?</span>', '', body, count=1, flags=re.S)
        name = re.search(r'<span class="ignm">(.*?)<span', body, re.S)
        name = name.group(1) if name else body
        pic, retarget = resolve(page, href, name, idx)
        if not pic and 'hasprev' in m.group('cls'):
            continue
        if not pic:
            report.append((page, href, html.unescape(re.sub(r'<[^>]+>', '', name)).strip()))
            continue
        alt = 'Preview of %s' % (re.sub(r'<[^>]+>', '', name).strip() or 'the infographic')
        rel = os.path.relpath(pic['src'], os.path.dirname(page) or '.')
        prev = ('<span class="igprev"><img src="%s" alt="%s" loading="lazy" decoding="async" '
                'width="%s" height="%s"></span>') % (rel, alt.replace('"', '&quot;'), pic['w'], pic['h'])
        new_attrs = attrs
        new_body = prev + body
        if retarget:
            t = os.path.relpath(retarget, os.path.dirname(page) or '.') if not re.match(r'^[a-z]+:', retarget) else retarget
            new_attrs = attrs.replace('href="%s"' % href, 'href="%s"' % html.escape(t, quote=True))
            new_body = re.sub(r'<span class="igsub">Open matching infographics[^<]*</span>',
                              '<span class="igsub">%s</span>' % subtitle_for(retarget), new_body)
        out.append(s[pos:m.start()])
        cls = m.group('cls') if 'hasprev' in m.group('cls') else m.group('cls') + ' hasprev'
        out.append('<a class="igcard%s"%s>%s</a>' % (cls, new_attrs, new_body))
        pos = m.end()
        n += 1
    out.append(s[pos:])
    return ''.join(out), n


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ''
    idx = gallery()
    report, total, files = [], 0, 0
    for page in sorted(glob.glob('*.html') + glob.glob('*/*.html')):
        if page == 'infographics.html':
            continue
        s = open(page, encoding='utf-8').read()
        if 'class="igcard' not in s:
            continue
        new, n = fix(page, s, idx, report)
        if n:
            total += n
            files += 1
            if mode not in ('--check', '--list'):
                open(page, 'w', encoding='utf-8').write(new)
    verb = 'would add' if mode in ('--check', '--list') else 'added'
    print('%s %d previews in %d files; %d cards still without a match' % (verb, total, files, len(report)))
    if mode == '--list':
        for r in report:
            print('  %-50s %-60s %s' % r)
    if mode == '--check' and total:
        sys.exit(1)


if __name__ == '__main__':
    main()
