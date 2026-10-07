#!/usr/bin/env python3
"""Put every Visual-library card on the course and module pages it belongs to.

The library (infographics.html) is the single source of truth: each card there
carries data-cls (course) and data-mod (module, sometimes several). This tool
reads those tags and writes, for every module, a "Visual references" section
holding every card tagged to it, grouped by kind:

  * the 42 module pages get `<div class="slot filled" data-slot="visual">`
    straight after their hand-made Infographics slot;
  * nur258.html carries its modules inline, so it gets the same slot inside
    each `details.mod`;
  * nur234.html / nur235.html list modules as link rows, so each row gets a
    closed `<details class="modvis">` panel underneath it.

Caroline asked (6 Oct 2026) for the visual references to be "in their
appropriate classes and modules on the class and module study page", with
every section collapsible by default - hence the closed <details> groups.

Re-running is safe: the old block is removed and rebuilt from the library,
so after adding or re-tagging cards in infographics.html just run this again.

    python3 tools/wire-module-visuals.py          # write
    python3 tools/wire-module-visuals.py --check  # exit 1 if anything is stale

Markup rules the other tools depend on (do not "tidy" them away):
  * the slot opener is exactly `<div class="slot filled" data-slot="visual">`
    - tools/refresh-module-info-counts.py stops counting the Infographics slot
    at the next opener that matches `<div class="slot[^"]*" data-slot="…">`,
    so an extra attribute here would quietly inflate that count;
  * nothing in the generated block may contain class="lecall", class="rec",
    data-vidgroup (wire-module-videos.py), data-m=", <a class="modcard",
    <a class="modlec" (wire-module-decks.py's hub pass) or class="nav
    (refresh-nav-counts.py);
  * the block ends with `<!-- /visual-refs -->`, which is how it is found and
    replaced next time.
"""
import glob
import html
import os
import re
import sys
from collections import Counter, OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

BOARD = 'infographics.html'
END = '<!-- /visual-refs -->'
COURSES = ('NUR 234', 'NUR 235', 'NUR 258')
FOLD_TAG = '<script defer src="absn-fold.js"></script>'
VPREV_TAG = '<script defer src="absn-vprev.js"></script>'
DRIVE_ID = re.compile(r'drive\.google\.com/(?:file/d/|open\?id=|uc\?[^"]*id=)([A-Za-z0-9_-]{20,})')

# group order on the page, label, icon
KINDS = OrderedDict([
    ('infographic', ('Infographics', '&#128444;&#65039;')),
    ('visual',      ('Diagrams &amp; drills', '&#128200;')),
    ('sn',          ('Simple Nursing handouts', '&#128216;')),
    ('pdf',         ('Study guides &amp; PDFs', '&#128196;')),
    ('powerpoint',  ('PowerPoints', '&#128202;')),
    ('calc',        ('Dosage &amp; calculation', '&#129518;')),
])

SLOT_OPENER = re.compile(r'<div class="slot[^"]*"(?: id="[^"]*")? data-slot="[^"]+">')
OLD_SLOT = re.compile(r'\n?<div class="slot(?: filled)?" data-slot="visual">.*?' + re.escape(END), re.S)
OLD_PANEL = re.compile(r'\n?<details class="modvis" data-vismod="m\d+">.*?' + re.escape(END), re.S)
FORBIDDEN = ('class="lecall"', 'class="rec"', 'data-vidgroup', 'data-m="',
             '<a class="modcard"', '<a class="modlec"', 'class="nav')


# --------------------------------------------------------------------------
# reading the library
# --------------------------------------------------------------------------
def attr(tag, name):
    m = re.search(r'\b%s="([^"]*)"' % name, tag)
    return m.group(1) if m else ''


def balanced_end(s, start):
    """Index just past the </div> that closes the <div at `start`."""
    depth = 0
    for m in re.finditer(r'<div\b|</div>', s[start:]):
        depth += 1 if m.group(0) == '<div' else -1
        if depth == 0:
            return start + m.end()
    raise ValueError('unbalanced <div> at %d' % start)


def read_cards():
    s = open(BOARD, encoding='utf-8').read()
    p0 = s.index('<div id="pool" hidden>')
    pool = s[p0:balanced_end(s, p0)]
    cards = []
    pos = 0
    while True:
        m = re.compile(r'<div class="card[^"]*"[^>]*>').search(pool, pos)
        if not m:
            break
        end = balanced_end(pool, m.start())
        block = pool[m.start():end]
        pos = end
        head = m.group(0)
        kind = attr(head, 'data-kind')
        cls = html.unescape(attr(head, 'data-cls')).strip()
        mods = [x.strip() for x in html.unescape(attr(head, 'data-mod')).split('·')]
        mods = [x for x in mods if x]
        title = re.search(r'<h3>(.*?)</h3>', block, re.S)
        title = title.group(1).strip() if title else '(untitled)'
        badges = re.findall(r'<span class="cb( cls)?">(.*?)</span>', block, re.S)
        kind_label = next((b for c, b in reversed(badges) if not c), '')
        plinks = [(attr(t, 'class'), attr(t, 'href'), body)
                  for t, body in re.findall(r'(<a class="plink[^"]*"[^>]*>)(.*?)</a>', block, re.S)]
        img = None
        for _c, _h, body in plinks:
            im = re.search(r'<img [^>]*>', body)
            if im and 'img/previews/' in im.group(0):
                t = im.group(0)
                img = (attr(t, 'src'), attr(t, 'alt'), attr(t, 'width'), attr(t, 'height'))
                break
        gos = re.findall(r'<a class="go" href="([^"]+)"[^>]*>(.*?)</a>', block, re.S)
        dl = re.search(r'<a class="deckdl" href="([^"]+)"', block)
        cards.append(dict(idx=len(cards), kind=kind, cls=cls, mods=mods, title=title,
                          label=kind_label, plinks=plinks, img=img, gos=gos,
                          deckdl=dl.group(1) if dl else ''))
    return cards


# --------------------------------------------------------------------------
# which page a (course, module) pair lives on
# --------------------------------------------------------------------------
def module_page(cls, mod):
    if not re.fullmatch(r'M\d{1,2}', mod):
        return None
    n = int(mod[1:])
    if cls == 'NUR 234':
        return 'nur234-m%d.html' % n
    if cls == 'NUR 235':
        return 'nur235-m%d.html' % n
    if cls == 'NUR 258':
        hits = glob.glob('nur258-module-%02d-*.html' % n)
        assert len(hits) == 1, (cls, mod, hits)
        return hits[0]
    return None


HUB = {'NUR 234': 'nur234.html', 'NUR 235': 'nur235.html', 'NUR 258': 'nur258.html'}


# --------------------------------------------------------------------------
# building the markup
# --------------------------------------------------------------------------
def primary_link(c, page):
    """(href, where-text, external?) for the card's one tap target."""
    kind = c['kind']
    href, where = '', ''
    if kind == 'infographic':
        for h, text in c['gos']:
            if 'See it with the notes' in text:
                href, where = h, 'With the notes'
                break
    if not href and kind in ('sn', 'pdf', 'powerpoint', 'calc'):
        for cl, h, _b in c['plinks']:
            if 'deckplate' in cl and 'drive.google.com/file/' in h:
                href = h
                break
        if not href and c['deckdl']:
            m = re.search(r'[?&]id=([^&]+)', html.unescape(c['deckdl']))
            if m:
                href = 'https://drive.google.com/file/d/%s/view' % m.group(1)
    if not href and c['plinks']:
        href = c['plinks'][0][1]
    if not href:
        return None
    if href.startswith(page + '#'):
        href = href[len(page):]
    if not where:
        if href.startswith('#'):
            where = 'On this page'
        elif 'drive.google.com' in href or 'docs.google.com' in href:
            where = 'Opens in Drive'
        elif href.startswith('img/') or re.search(r'\.(webp|png|jpe?g|gif)$', href, re.I):
            where = 'Full-size image'
        elif href.endswith('.html') or '.html#' in href:
            where = 'Study page'
        elif href.startswith('http'):
            where = 'Opens the link'
        else:
            where = 'Opens the file'
    external = href.startswith('http') or where == 'Full-size image' or href.endswith('.pdf')
    return href, where, external


def inline_preview(c, href):
    """(type, src) for the card's 'Preview here' box, or None.

    Caroline asked (7 Oct 2026) for every visual reference to be viewable
    without leaving the module page: Drive files embed through Drive's own
    /preview viewer, an infographic shows its full plate, a study page is
    framed. The box stays closed until she opens it, and absn-vprev.js only
    builds the iframe or image then, so a page with sixty cards loads nothing
    extra."""
    m = DRIVE_ID.search(html.unescape(href))
    if m:
        return 'drive', 'https://drive.google.com/file/d/%s/preview' % m.group(1)
    for _cl, h, _b in c['plinks']:
        if h.startswith('img/') and re.search(r'\.(webp|png|jpe?g|gif)$', h, re.I):
            return 'img', h
    if re.search(r'\.(webp|png|jpe?g|gif)$', href, re.I) and not href.startswith('http'):
        return 'img', href
    if (href.endswith('.html') or '.html#' in href) and not href.startswith('http'):
        return 'page', href
    return None


def card_html(c, page):
    pl = primary_link(c, page)
    if not pl:
        return ''
    href, where, external = pl
    label, icon = KINDS[c['kind']]
    sub = '%s &middot; %s &rarr;' % (c['label'] or label, where)
    tgt = ' target="_blank" rel="noopener"' if external else ''
    if c['img']:
        src, alt, w, h = c['img']
        prev = ('<span class="igprev"><img src="%s" alt="%s" loading="lazy" decoding="async"'
                ' width="%s" height="%s"></span>' % (src, alt, w, h))
        cls = 'igcard hasprev'
    else:
        # no thumbnail of our own: Drive renders one for any shared file
        m = DRIVE_ID.search(html.unescape(href))
        if m:
            prev = ('<span class="igprev"><img src="https://drive.google.com/thumbnail?id=%s&amp;sz=w760" '
                    'alt="" loading="lazy" decoding="async" width="760" height="428" referrerpolicy="no-referrer"></span>'
                    % m.group(1))
            cls = 'igcard hasprev'
        else:
            prev, cls = '', 'igcard'
    card = ('<a class="%s" href="%s"%s>%s<span class="igico" aria-hidden="true">%s</span>'
            '<span class="ignm">%s<span class="igsub">%s</span></span></a>'
            % (cls, href, tgt, prev, icon, c['title'], sub))
    # Under every card: a closed inline preview and an open-in-new-tab link,
    # both 44px tall (Caroline, 7 Oct 2026: previews for all of them, collapsed
    # by default, and the option to open in a new tab).
    ip = inline_preview(c, href)
    acts = ''
    if ip:
        acts += ('<details class="vprev"><summary><span aria-hidden="true">&#128065;&#65039;</span> Preview here</summary>'
                 '<div class="vprevb" data-type="%s" data-src="%s" data-open="%s"></div></details>' % (ip[0], ip[1], href))
    acts += '<a class="vnew" href="%s" target="_blank" rel="noopener">&#8599; New tab</a>' % href
    return '<div class="vcell">%s<div class="vact">%s</div></div>' % (card, acts)


def groups_html(cards, page):
    out, total = [], 0
    for kind, (label, icon) in KINDS.items():
        ks = [card_html(c, page) for c in cards if c['kind'] == kind]
        ks = [k for k in ks if k]
        if not ks:
            continue
        total += len(ks)
        out.append('<details class="vgrp" data-kind="%s"><summary><span class="vgi" aria-hidden="true">%s</span>'
                   '%s <span class="cnt">%d</span><span class="vgchev" aria-hidden="true">&#9656;</span></summary>'
                   '<div class="shgrid iggrid">%s</div></details>' % (kind, icon, label, len(ks), ''.join(ks)))
    return ''.join(out), total


def library_link(cls, mod):
    return 'infographics.html?cls=%s&amp;mod=%s' % (cls.replace(' ', '%20'), mod)


def slot_html(cls, mod, cards, page):
    body, n = groups_html(cards, page)
    if not n:
        return ('<div class="slot" data-slot="visual"><h4>&#128444;&#65039; Visual references '
                '<span class="cnt">0</span></h4><p>Nothing in the Visual library is tagged %s &middot; %s yet.</p>'
                '<p class="vgall"><a class="vgalla" href="infographics.html?cls=%s">&#128450;&#65039; Browse the %s library &rarr;</a></p>'
                '</div>%s' % (cls, mod, cls.replace(' ', '%20'), cls, END))
    return ('<div class="slot filled" data-slot="visual"><h4>&#128444;&#65039; Visual references '
            '<span class="cnt">%d</span></h4><p>Everything in the Visual library tagged %s &middot; %s, grouped by type. '
            'Tap a group to open it; tap a card to open the file or page.</p>%s'
            '<p class="vgall"><a class="vgalla" href="%s">&#128450;&#65039; See all %d in the Visual library &rarr;</a></p>'
            '</div>%s' % (n, cls, mod, body, library_link(cls, mod), n, END))


def panel_html(cls, mod, mttl, cards, page):
    body, n = groups_html(cards, page)
    m = mod.lower()
    if not n:
        return ('<details class="modvis" data-vismod="%s"><summary><span class="vgi" aria-hidden="true">&#128444;&#65039;</span>'
                '%s visual references <span class="cnt">0</span><span class="vgchev" aria-hidden="true">&#9656;</span></summary>'
                '<div class="modvisb"><p>Nothing in the Visual library is tagged %s &middot; %s yet.</p></div></details>%s'
                % (m, mod, cls, mod, END))
    return ('<details class="modvis" data-vismod="%s"><summary><span class="vgi" aria-hidden="true">&#128444;&#65039;</span>'
            '%s visual references <span class="cnt">%d</span><span class="vgchev" aria-hidden="true">&#9656;</span></summary>'
            '<div class="modvisb"><p>Every card in the Visual library tagged %s &middot; %s%s, grouped by type. '
            'Tap a group to open it.</p>%s<p class="vgall"><a class="vgalla" href="%s">&#128450;&#65039; See all %d in the Visual library &rarr;</a></p>'
            '</div></details>%s' % (m, mod, n, cls, mod, (' &middot; ' + mttl) if mttl else '', body,
                                    library_link(cls, mod), n, END))


# --------------------------------------------------------------------------
# placing the markup
# --------------------------------------------------------------------------
def insert_after_info(seg, block):
    """Put `block` right before the slot opener that follows the Infographics slot."""
    i = seg.find('data-slot="info">')
    if i < 0:
        raise ValueError('no info slot')
    m = SLOT_OPENER.search(seg, i + 1)
    if not m:
        raise ValueError('no slot after info')
    j = m.start()
    pre = '' if seg[j - 1] == '\n' else '\n'
    return seg[:j] + pre + block + '\n' + seg[j:]


def strip_old(s):
    s = OLD_SLOT.sub('', s)
    s = OLD_PANEL.sub('', s)
    return s


def wire_module_page(page, cls, mod, cards):
    s = open(page, encoding='utf-8').read()
    t = strip_old(s)
    t = insert_after_info(t, slot_html(cls, mod, cards, page))
    if 'absn-fold.js' not in t:
        k = t.rfind('</body>')
        t = t[:k] + FOLD_TAG + '\n' + t[k:]
    return s, with_vprev(t)


def with_vprev(t):
    if 'absn-vprev.js' in t:
        return t
    k = t.rfind('</body>')
    return t[:k] + VPREV_TAG + '\n' + t[k:]


def wire_258_hub(by_mod):
    page = 'nur258.html'
    s = open(page, encoding='utf-8').read()
    t = strip_old(s)
    for n in range(1, 15):
        mod = 'M%d' % n
        i = t.find('data-m="m%d"' % n)
        j = t.find('data-m="m%d"' % (n + 1), i)
        j = j if j > 0 else len(t)
        seg = insert_after_info(t[i:j], slot_html('NUR 258', mod, by_mod.get(mod, []), page))
        t = t[:i] + seg + t[j:]
    return s, with_vprev(t)


def wire_link_hub(cls, by_mod):
    page = HUB[cls]
    stem = page[:-5]
    s = open(page, encoding='utf-8').read()
    t = strip_old(s)
    for n in range(1, 15):
        mod = 'M%d' % n
        key = '<div class="modrow"><a class="modcard" href="%s-m%d.html"' % (stem, n)
        i = t.find(key)
        if i < 0:
            raise ValueError('%s: no module row for %s' % (page, mod))
        end = balanced_end(t, i)
        row = t[i:end]
        mt = re.search(r'<span class="mttl">(.*?)(?:<span class="todo">.*?</span>)?</span>', row, re.S)
        mttl = re.sub(r'<[^>]+>', '', mt.group(1)).strip() if mt else ''
        block = panel_html(cls, mod, mttl, by_mod.get(mod, []), page)
        t = t[:end] + '\n' + block + t[end:]
    return s, with_vprev(t)


# --------------------------------------------------------------------------
def main():
    check = '--check' in sys.argv
    cards = read_cards()
    placements = {}          # page -> (cls, mod, [cards])
    hub = {c: {} for c in COURSES}
    skipped = Counter()
    for c in cards:
        if c['cls'] not in COURSES:
            skipped['course %s' % (c['cls'] or '(none)')] += 1
            continue
        for mod in c['mods']:
            page = module_page(c['cls'], mod)
            if not page:
                skipped['%s %s' % (c['cls'], mod)] += 1
                continue
            placements.setdefault(page, (c['cls'], mod, []))[2].append(c)
            hub[c['cls']].setdefault(mod, []).append(c)
    # every module page gets a slot, cards or not
    for cls in COURSES:
        for n in range(1, 15):
            page = module_page(cls, 'M%d' % n)
            placements.setdefault(page, (cls, 'M%d' % n, []))

    changes, stale = [], []
    results = []
    for page in sorted(placements):
        cls, mod, cs = placements[page]
        results.append((page, cls, mod, cs))
    outputs = []
    for page, cls, mod, cs in results:
        s, t = wire_module_page(page, cls, mod, cs)
        outputs.append((page, s, t, len(cs)))
    s, t = wire_258_hub(hub['NUR 258'])
    outputs.append(('nur258.html', s, t, sum(len(v) for v in hub['NUR 258'].values())))
    for cls in ('NUR 234', 'NUR 235'):
        s, t = wire_link_hub(cls, hub[cls])
        outputs.append((HUB[cls], s, t, sum(len(v) for v in hub[cls].values())))

    for page, s, t, n in outputs:
        for bad in FORBIDDEN:
            new_only = t.count(bad) - s.count(bad)
            assert new_only <= 0, (page, bad)
        state = 'ok' if s == t else ('stale' if END in s else 'added')
        print('%-58s %-5s %4d cards' % (page, state, n))
        if s != t:
            stale.append(page)
            if not check:
                open(page, 'w', encoding='utf-8').write(t)
                changes.append(page)
    if skipped:
        print('skipped (no page here): ' + ', '.join('%s x%d' % kv for kv in sorted(skipped.items())))
    print('%d cards in the library; %d page placements' % (len(cards), sum(n for _p, _s, _t, n in outputs) - sum(
        n for p, _s, _t, n in outputs if p in HUB.values())))
    if check:
        print('%d file(s) stale' % len(stale))
        sys.exit(1 if stale else 0)
    print('%d file(s) written' % len(changes))


if __name__ == '__main__':
    main()
