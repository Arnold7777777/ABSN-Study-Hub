"""Index actual visual and playable resources from the existing catalogs."""
import json,re
from pathlib import Path
from urllib.parse import urljoin,urlsplit,urlunsplit
from lxml import html

def clean(s):return re.sub(r'\s+',' ',s or '').strip()
def has_class(name):return f'contains(concat(" ",normalize-space(@class)," ")," {name} ")'

def build_resources(repo,base):
    root=Path(repo);pages=[];entries=[];seen=set();by_url={}
    def drive_thumb(url):
        # Drive's own still frame for a video, as the slide-deck cards use; the box keeps
        # its size and shows a placeholder if Drive has none to give.
        m=re.search(r'/file/d/([\w-]{20,})|[?&]id=([\w-]{20,})',url or '')
        fid=m and (m.group(1) or m.group(2))
        return ('https://drive.google.com/thumbnail?id=%s&sz=w480'%fid) if fid else ''
    def add(url,title,kind,keywords='',source='',img='',iw=0,ih=0):
        url=urljoin(base,url);parts=urlsplit(url)
        if parts.scheme not in ('https','http') or not title:return
        if any(x in url.lower() for x in ['zoom.us','cdn.fbsbx.com','downloads/']):return
        key=(url,kind,clean(title).lower())
        if key in seen:return
        seen.add(key)
        page_url=urlunsplit((parts.scheme,parts.netloc,parts.path,parts.query,''))
        if page_url not in by_url:
            by_url[page_url]=len(pages);pages.append({'s':'hub','u':page_url,'t':title,'k':kind})
        entry={'p':str(by_url[page_url]),'h':title,'a':parts.fragment,'t':clean(keywords),'k':kind,'source':source}
        # a picture for the result card (Caroline, 24 Nov: "shows a preview of images and lectures")
        if img:
            entry['i']=img
            if iw and ih: entry['iw'],entry['ih']=int(iw),int(ih)
        entries.append(entry)
    tree=html.fromstring((root/'infographics.html').read_text(encoding='utf-8'))
    for card in tree.xpath('//*[@id="pool"]//div[@data-kind]'):
        if card.get('data-kind') not in ('infographic','sn','visual'):continue
        title=clean(' '.join(card.xpath('./h3//text()')))
        links=card.xpath('.//a[@href]');urls=[a.get('href') for a in links]
        # A guide with the picture and notes is more useful than a thumbnail.
        guides=[u for u in urls if '.html' in urlsplit(u).path and not u.startswith('#')]
        images=[u for u in urls if re.search(r'\.(webp|png|jpe?g|gif|pdf)$',urlsplit(u).path,re.I) and '/previews/' not in u]
        target=(guides or images or urls or [None])[0]
        im=(card.xpath('.//img[@src]') or [None])[0]
        pic=im.get('src') if im is not None else ''
        if pic and not re.match(r'(https?:)?//',pic): pic=pic.lstrip('./')
        dims=((im.get('width') or '0'),(im.get('height') or '0')) if im is not None else ('0','0')
        dims=tuple(int(d) if str(d).isdigit() else 0 for d in dims)
        if target:add(target,title,'infographic',card.get('data-kw','')+' '+card.get('data-cls','')+' '+card.get('data-mod',''),'Visual library',pic,*dims)
    lib=html.fromstring((root/'lecture-library.html').read_text(encoding='utf-8'))
    for card in lib.xpath('//article[@data-s]'):
        play=card.xpath('.//a['+has_class('play')+']/@href')
        if play:
            audio=card.get('data-kind')=='audio' or re.search(r'\.(m4a|mp3|wav|ogg)\b',card.get('data-s',''),re.I)
            add(play[0],clean(' '.join(card.xpath('./h4//text()'))),'video',card.get('data-s',''),'Lecture library',
                '' if audio else drive_thumb(play[0]))
    for name in ['lectures.html','podcasts.html']:
        if not (root/name).exists():continue
        doc=html.fromstring((root/name).read_text(encoding='utf-8'))
        for a in doc.xpath('//a['+has_class('rec')+'][@href]'):
            title=clean(a.text_content()).lstrip('▶️ ')
            ancestors=a.xpath('ancestor::*[@id][1]/@id')
            kind='podcast' if name=='podcasts.html' else 'video'
            audio=re.search(r'\.(m4a|mp3|wav|ogg)$',a.get('title',''),re.I) or 'Listen' in title[:8]
            add(a.get('href'),title,kind,a.get('title','')+' '+' '.join(ancestors),name,
                '' if (kind=='podcast' or audio) else drive_thumb(a.get('href')))
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
