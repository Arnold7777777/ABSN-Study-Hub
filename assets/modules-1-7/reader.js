/* Source-preserving reading presentation; loaded after the site's own helpers.
   Installed by tools/wire-module-reader.py. Each replacement carries its image's
   w/h so the box is reserved before the picture arrives (no page jump). */
(()=>{'use strict';
function run(){
 const body=document.body;if(!body.classList.contains('sr-module')||document.getElementById('sr-board'))return;
 const scope=document.querySelector('.modbody,details.mod>.body')||document.querySelector('.page-main');if(!scope)return;
 const config=JSON.parse(document.getElementById('sr-config')?.textContent||'{}');
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const el=(tag,cls,text)=>{let n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const short=(s,n=76)=>{const t=s.trim().replace(/\s+/g,' ').replace(/^[▸▶➤\s]+/u,'');return t.length>n?t.slice(0,n).replace(/\s+\S*$/,'')+'…':t;};
 const id=(node,prefix)=>{if(!node.id)node.id=prefix;return node.id;};
 let idx=0;$$('figure, .vfig',scope).forEach(n=>id(n,'sr-figure-'+(++idx)));
 // The source remains in the HTML. Only designated legacy clinical images change.
 const sourceKey=value=>{if(!value)return '';try{const u=new URL(value,location.href);return u.pathname.includes('/ABSN-Study-Hub/')?u.pathname.split('/ABSN-Study-Hub/')[1]:value;}catch{return value;}};
 $$('img',scope).forEach(img=>{
  const original=sourceKey(img.getAttribute('src'));const rep=(config.replacements||{})[original];if(!rep)return;
  if(img.closest('.igprev')){img.src=rep.image;img.alt=rep.title;const a=img.closest('a');if(a&&a.getAttribute('href')===original)a.href=rep.page;return;}
  const figure=img.closest('figure');const target=img.closest('a')||img;
  const replacement=el('div','sr-replacement');replacement.dataset.srOriginalGraphic=original;
  const title=el('h3','',rep.title);replacement.append(title);
  if(rep.image){const a=el('a');a.href=rep.image;a.target='_blank';a.rel='noopener';const image=el('img');image.src=rep.image;image.alt=rep.alt||rep.title;image.loading='lazy';if(rep.w){image.width=rep.w;image.height=rep.h;}a.append(image);replacement.append(a);}
  if(rep.note)replacement.append(el('p','sr-note',rep.note));const a=el('a','sr-visual-link','🖼️ Open illustrated study card & course labels');a.href=rep.page;a.target='_blank';a.rel='noopener';replacement.append(a);
  target.replaceWith(replacement);if(figure)figure.dataset.srReplaced='true';
 });
 // Inline clinical drawings are replaced using the stable original SVG order.
 const originalSvgs=$$('svg[data-sr-inline]',scope);
 originalSvgs.forEach((svg,i)=>{const rep=(config.inline||[]).find(r=>r.inline_id===svg.getAttribute('data-sr-inline'));if(!rep)return;
  if(rep.mini){const cue=el('span','sr-molecule-cue',rep.abbr||'🧬');cue.setAttribute('role','img');cue.setAttribute('aria-label',rep.label||'Molecular study cue');svg.replaceWith(cue);return;}
  const panel=el('div','sr-replacement');panel.dataset.srOriginalInline=rep.label||'';
  panel.append(el('h3','',rep.title));
  if(rep.image){const a=el('a');a.href=rep.image;a.target='_blank';a.rel='noopener';const im=el('img');im.src=rep.image;im.alt=rep.alt||rep.title;im.loading='lazy';if(rep.w){im.width=rep.w;im.height=rep.h;}a.append(im);panel.append(a);}
  if(rep.note)panel.append(el('p','sr-note',rep.note));const link=el('a','sr-visual-link','🖼️ Open readable diagram & course labels');link.href=rep.page;link.target='_blank';link.rel='noopener';panel.append(link);svg.replaceWith(panel);
 });
 // Reuse the user's preferred rustic coach for the dynamically inserted robots.
 $$('#moduleHeroRobot,.ple-high-robot').forEach(host=>{const im=el('img');im.src=config.robot;im.alt='Rustic copper robot study coach';im.loading='lazy';im.style.cssText='display:block;width:100%;max-width:110px;height:auto;object-fit:contain';host.replaceChildren(im);});
 // Update resource-card destinations, thumbnails and lazy preview sources as well.
 $$('a[href]',scope).forEach(a=>{const rep=(config.replacements||{})[sourceKey(a.getAttribute('href'))];if(!rep)return;a.href=rep.page;const im=$('img',a);if(im){im.src=rep.image;im.alt=rep.title;}});
 $$('[data-src],[data-open]',scope).forEach(n=>{for(const attr of ['data-src','data-open']){const rep=(config.replacements||{})[sourceKey(n.getAttribute(attr))];if(!rep)continue;n.setAttribute(attr,attr==='data-src'?rep.image:rep.page);if(attr==='data-src')n.setAttribute('data-type','img');}});
 // Descriptive disclosure labels; all original learning items stay inside.
 $$('.chunk:not(.altchunk)',scope).forEach((chunk,i)=>{
  const s=$(':scope>summary',chunk);if(!s||!/Show \d+ more|Hide these \d+/i.test(s.textContent))return;
  const points=$$('li',chunk).filter(li=>!li.parentElement.closest('li'));
  const bits=points.slice(0,3).map(li=>{const b=$('b,strong',li);return short((b||li).textContent,42).replace(/[.:—–,;]+$/,'');}).filter(Boolean);
  const title=(config.chunkTitles||[])[i]||bits.slice(0,2).join(' · ')||'Course study points';
  s.replaceChildren(document.createTextNode('🧩 '+title));s.append(el('span','sr-chunk-count',points.length+' course points · open to read'));
 });
 // Long lists keep their original LI elements, words, order and child-list nesting.
 $$('.mcard ul,.altrow ul,.dxsec ul',scope).filter(ul=>!ul.closest('li')).forEach(ul=>{
  const lis=[...ul.children].filter(n=>n.tagName==='LI');if(lis.length<=5)return;
  const frag=document.createDocumentFragment();for(let i=0;i<lis.length;i+=4){const box=el('div','sr-list-run');const list=el('ul');lis.slice(i,i+4).forEach(li=>list.append(li));box.append(list);frag.append(box);}ul.replaceWith(frag);
 });
 // Small simple comparison tables get a phone layout; complex span tables stay scrollable.
 $$('table',scope).forEach(table=>{
  if(table.querySelector('[rowspan],[colspan],input,button')||table.rows.length<2)return;
  const first=[...table.rows[0].cells];if(first.length<2||first.length>4||!first.some(c=>c.tagName==='TH'))return;
  const rows=[...table.rows].slice(1);if(!rows.every(r=>r.cells.length===first.length))return;
  const wrap=el('div','sr-mobile-table'),original=el('div','sr-table-original'),cards=el('div','sr-table-cards');
  table.before(wrap);original.append(table);wrap.append(original,cards);
  rows.forEach(row=>{const card=el('article');card.append(el('h4','',row.cells[0].textContent));const dl=el('dl');for(let i=1;i<first.length;i++){dl.append(el('dt','',first[i].textContent));const dd=el('dd');[...row.cells[i].childNodes].forEach(n=>dd.append(n.cloneNode(true)));dl.append(dd);}card.append(dl);cards.append(card);});
  cards.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
 });
 // Improve heading levels after the original quiz/folding helpers have initialized.
 [...scope.children].forEach(n=>{const h=$(':scope>h4,:scope>h5,:scope>details.fold>summary>h4,:scope>details.fold>summary>h5',n);if(h){h.setAttribute('role','heading');h.setAttribute('aria-level','2');}});
 const board=el('section','sr-board');board.id='sr-board';board.setAttribute('aria-labelledby','sr-board-title');const h=el('h2','','🧭 Choose one place to start');h.id='sr-board-title';board.append(h);
 const route=el('nav','sr-route');route.setAttribute('aria-label','Module study sections');board.append(route);
 const destinations=[['⭐ Exam points','.mcard.hy'],['💡 Core concepts','.vbrief,#visual-guides'],['🩺 Conditions','details.dx,.dxlead'],['📚 Course notes','.mcard.ati,.mcard.lsc,.mcard.txbk'],['🧠 Mind map','[data-slot="mindmap"]'],['🎥 Resources','[data-slot="deck"],#resources'],['📋 Templates','[data-slot="alt"]'],['🎯 Practice','[data-slot="quiz"],#quiz']];
 destinations.forEach(([label,sel],i)=>{const target=$(sel,scope);if(!target)return;const a=el('a','',label);a.href='#'+id(target,'sr-section-'+i);route.append(a);});
 const controls=el('div','sr-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label','Reading controls');board.append(controls);
 const open=el('button','','＋ Open all study sections'),close=el('button','','− Close study sections'),larger=el('button','','A+ Larger text'),status=el('span','sr-status','');[open,close,larger].forEach(b=>b.type='button');larger.setAttribute('aria-pressed','false');status.setAttribute('aria-live','polite');controls.append(open,close,larger,status);
 const details=()=>$$('details',scope);
 function clearReadingFilters(){if(body.matches('.ple-bite-on,.ple-high-on,.focus-bite,.focus-high'))$('#pleShowAll,.fbAll')?.click();const search=$('#moduleSearch');if(search?.value){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));}}
 function expand(value){clearReadingFilters();details().forEach(d=>d.open=value);const outer=scope.closest('details.mod');if(outer)outer.open=true;status.textContent=value?'All study sections open':'Study sections closed';}
 open.addEventListener('click',()=>expand(true));close.addEventListener('click',()=>expand(false));larger.addEventListener('click',()=>{const active=larger.getAttribute('aria-pressed')!=='true';body.style.setProperty('--sr-size',active?'22px':'18px');larger.setAttribute('aria-pressed',String(active));larger.textContent=active?'A Standard text':'A+ Larger text';status.textContent=active?'Larger reading text on':'Standard reading text';});
 const header=$('.wrap>header,.ple-module-hero,.page-main>.hero');if(header)header.after(board);else scope.before(board);
 const skip=el('a','sr-skip','Skip to study choices');skip.href='#sr-board';body.prepend(skip);
 // Keep optional old tools functional, but out of the first-screen reading path.
 const options=el('details','sr-options');options.append(el('summary','','🤖 More study tools & your robot guide'));
 $$('.adhd-guide,.ple-module-choices,.ple-module-actions,.ple-module-bar,.focusbar,#adhdStudyTools,.study-rail,#navBtns').forEach(n=>{if(!n.closest('.sr-options'))options.append(n);});if(options.children.length>1)board.after(options);
 // A small visual index points to actual pictures in this module; no unrelated covers.
 const images=$$('figure img,.rv-figure img,.sr-replacement img',scope).filter(im=>!im.closest('.igcard,.igprev,.absn-robot')).filter((im,i,all)=>all.findIndex(o=>o.src===im.src)===i).slice(0,6);
 if(images.length){const shelf=el('details','sr-shelf');shelf.append(el('summary','','🖼️ Find a picture · '+images.length+' visual shortcuts'));const grid=el('div','sr-shelf-grid');shelf.append(grid);images.forEach((im,i)=>{const target=im.closest('figure,.rv-figure,.sr-replacement')||im.parentElement;const a=el('a','sr-shelf-card');a.href='#'+id(target,'sr-picture-'+i);const thumb=el('img');thumb.src=im.src;thumb.alt='';thumb.loading='lazy';const label=el('span');label.append(el('strong','',short(im.alt||'Study illustration',70)),document.createTextNode('Open in this module →'));a.append(thumb,label);grid.append(a);});board.append(shelf);}
 // Explicit zoom links preserve whole-figure fit at phone width.
 $$('figure',scope).forEach(f=>{if($('.sr-visual-link',f))return;const im=$('img',f);if(!im)return;const a=el('a','sr-zoom','↗ Open full-size diagram');a.href=im.src;a.target='_blank';a.rel='noopener';f.append(a);});
 function reveal(target){if(!target)return;clearReadingFilters();for(let n=target;n;n=n.parentElement){if(n.tagName==='DETAILS')n.open=true;if(n.hidden&&n.classList.contains('adhd-card-body'))n.hidden=false;}const fold=$(':scope>details.fold',target);if(fold)fold.open=true;}
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;let target;try{target=document.getElementById(decodeURIComponent(a.hash.slice(1)));}catch{return;}if(!target)return;reveal(target);requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'auto'}));});
 if(location.hash){let target=document.getElementById(decodeURIComponent(location.hash.slice(1)));reveal(target);}
 let printState;window.addEventListener('beforeprint',()=>{printState=details().map(d=>[d,d.open]);expand(true);});window.addEventListener('afterprint',()=>{printState?.forEach(([d,on])=>d.open=on);});
 body.dataset.srReady='true';window.dispatchEvent(new CustomEvent('sr:ready'));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
