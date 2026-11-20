"""Index actual visual and playable resources from the existing catalogs."""
import json,re
from pathlib import Path
from urllib.parse import urljoin,urlsplit,urlunsplit
from lxml import html

def clean(s):return re.sub(r'\s+',' ',s or '').strip()
def has_class(name):return f'contains(concat(" ",normalize-space(@class)," ")," {name} ")'

def build_resources(repo,base):
    root=Path(repo);pages=[];entries=[];seen=set();by_url={}
    def add(url,title,kind,keywords='',source=''):
        url=urljoin(base,url);parts=urlsplit(url)
        if parts.scheme not in ('https','http') or not title:return
        if any(x in url.lower() for x in ['zoom.us','cdn.fbsbx.com','downloads/']):return
        key=(url,kind,clean(title).lower())
        if key in seen:return
        seen.add(key)
        page_url=urlunsplit((parts.scheme,parts.netloc,parts.path,parts.query,''))
        if page_url not in by_url:
            by_url[page_url]=len(pages);pages.append({'s':'hub','u':page_url,'t':title,'k':kind})
        entries.append({'p':str(by_url[page_url]),'h':title,'a':parts.fragment,'t':clean(keywords),'k':kind,'source':source})
    tree=html.fromstring((root/'infographics.html').read_text(encoding='utf-8'))
    for card in tree.xpath('//*[@id="pool"]//div[@data-kind]'):
        if card.get('data-kind') not in ('infographic','sn','visual'):continue
        title=clean(' '.join(card.xpath('./h3//text()')))
        links=card.xpath('.//a[@href]');urls=[a.get('href') for a in links]
        # A guide with the picture and notes is more useful than a thumbnail.
        guides=[u for u in urls if '.html' in urlsplit(u).path and not u.startswith('#')]
        images=[u for u in urls if re.search(r'\.(webp|png|jpe?g|gif|pdf)$',urlsplit(u).path,re.I) and '/previews/' not in u]
        target=(guides or images or urls or [None])[0]
        if target:add(target,title,'infographic',card.get('data-kw','')+' '+card.get('data-cls','')+' '+card.get('data-mod',''),'Visual library')
    lib=html.fromstring((root/'lecture-library.html').read_text(encoding='utf-8'))
    for card in lib.xpath('//article[@data-s]'):
        play=card.xpath('.//a['+has_class('play')+']/@href')
        if play:add(play[0],clean(' '.join(card.xpath('./h4//text()'))),'video',card.get('data-s',''),'Lecture library')
    for name in ['lectures.html','podcasts.html']:
        if not (root/name).exists():continue
        doc=html.fromstring((root/name).read_text(encoding='utf-8'))
        for a in doc.xpath('//a['+has_class('rec')+'][@href]'):
            title=clean(a.text_content()).lstrip('▶️ ')
            ancestors=a.xpath('ancestor::*[@id][1]/@id')
            add(a.get('href'),title,'podcast' if name=='podcasts.html' else 'video',a.get('title','')+' '+' '.join(ancestors),name)
    for p in sorted(root.glob('spotify-*.html')):
        doc=html.fromstring(p.read_text(encoding='utf-8'))
        for a in doc.xpath('//a['+has_class('ep')+'][@href]'):
            title=clean(' '.join(a.xpath('.//*['+has_class('tt')+']//text()')))
            mods=a.xpath('ancestor::details[@id]/@id')
            add(a.get('href'),title,'podcast',clean(a.text_content())+' '+' '.join(mods),'Learn Nursing 101 · Spotify')
    result={'pages':pages,'entries':entries}
    (root/'resource-search.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    print('Resource search:',len(entries),'visual/video/podcast entries')
    return result
