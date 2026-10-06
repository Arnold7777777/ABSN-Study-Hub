/* absn-fold.js - every block on a module page starts closed.

   Caroline asked (6 Oct 2026) for all sections to be collapsible by default:
   the brief, the high-yield card, the ATI/LSC/trap cards, every resource slot.
   Each direct child of the module body gets a native <details> INSIDE it, so
   the child itself stays where it is - absn-focus.js (One bite / Spotlight),
   nur258-module.js (search, bite fallback, Spotlight) and the tools in tools/
   all key on those direct children and keep working untouched.

   Why native <details>: keyboard and aria come free, find-in-page auto-opens
   a closed one, and the existing modes already call details.open = true on
   whatever they reveal. Nothing is remembered between visits: closed by
   default means closed on every load, and the Open-all bar is the escape hatch.

   Must be the last script on the page: absn-module.js / nur258-module.js have
   put the quiz in by then, absn-diagrams.js has measured its SVGs while they
   were still visible, and nur258-module.js has taken its snapshot of the body's
   children. */
(function(){
  'use strict';
  var body = document.querySelector('.modbody') || document.querySelector('details.mod > .body');
  if(!body) return;

  var SKIP = 'nav,script,style,details,.foldbar,.rdg,.absn-robot,.focusbar,.ple-chunk-tip';
  var LABEL = [
    ['vbrief','\u{1F3A8} Visual brief'], ['hy','⭐ High-yield'], ['ati','\u{1F4D5} ATI'],
    ['lsc','\u{1F393} LSC'], ['trap','⚠️ Traps'], ['txbk','\u{1F4DA} Textbook'],
    ['dxlead','\u{1F5FA}️ Disorder cards'], ['dxsec','\u{1F5BC}️ What these look like'],
    ['vidfig','\u{1F3AC} Video'], ['ownfig','\u{1F5BC}️ Figure']
  ];

  function labelFor(el, i){
    var h = el.querySelector(':scope>h2,:scope>h3,:scope>h4,:scope>h5,:scope>h6');
    if(h) return {node:h};
    var cap = el.querySelector(':scope>figcaption,figcaption');
    if(cap && cap.textContent.trim()) return {text:cap.textContent.trim()};
    for(var k = 0; k < LABEL.length; k++) if(el.classList.contains(LABEL[k][0])) return {text:LABEL[k][1]};
    var img = el.querySelector('img[alt]');
    if(img && img.alt) return {text:'\u{1F5BC}️ ' + img.alt};
    return {text:'Section ' + (i + 1)};
  }

  function fold(el, i){
    if(el.matches(SKIP) || el.querySelector(':scope>details.fold')) return;
    if(!el.textContent.trim() && !el.querySelector('img,svg,video,iframe')) return;
    var d = document.createElement('details'); d.className = 'fold';
    var s = document.createElement('summary'); s.className = 'fold-h';
    var L = labelFor(el, i);
    if(L.node){ L.node.style.setProperty('margin', '0', 'important'); s.appendChild(L.node); }
    else { var sp = document.createElement('span'); sp.className = 'fold-lbl'; sp.textContent = L.text; s.appendChild(sp); }
    var ch = document.createElement('span'); ch.className = 'fold-chev'; ch.setAttribute('aria-hidden', 'true'); ch.textContent = '▸';
    s.appendChild(ch);
    d.appendChild(s);
    while(el.firstChild) d.appendChild(el.firstChild);
    el.appendChild(d);
    el.classList.add('folded');
  }
  [].slice.call(body.children).forEach(fold);

  var folds = [].slice.call(body.querySelectorAll(':scope>*>details.fold'));
  if(!folds.length) return;

  /* ---- the bar ---------------------------------------------------------- */
  var bar = document.createElement('div');
  bar.className = 'foldbar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Open or close every section');
  bar.innerHTML = '<button type="button" class="foldOpen">⤵️ Open all sections</button>' +
                  '<button type="button" class="foldClose">⤴️ Close all sections</button>' +
                  '<span class="foldstat" role="status" aria-live="polite">' + folds.length + ' sections · tap one to open it</span>';
  body.insertBefore(bar, body.firstChild);
  var stat = bar.querySelector('.foldstat');
  function count(){
    var n = folds.filter(function(d){ return d.open; }).length;
    stat.textContent = n ? (n + ' of ' + folds.length + ' sections open') : (folds.length + ' sections · tap one to open it');
  }
  function openAll(){ folds.forEach(function(d){ d.open = true; }); count(); }
  function closeAll(){ folds.forEach(function(d){ d.open = false; }); sync(); count(); }
  bar.querySelector('.foldOpen').addEventListener('click', openAll);
  bar.querySelector('.foldClose').addEventListener('click', closeAll);

  /* ---- revealing what another feature just pointed at ------------------- */
  function reveal(t){
    if(!t) return;
    var own = t.querySelector && t.querySelector(':scope>details.fold');
    if(own) own.open = true;
    for(var e = t; e && e !== body; e = e.parentElement) if(e.tagName === 'DETAILS') e.open = true;
    count();
  }
  function sync(){
    var b = document.body.classList, hy = body.querySelector('.mcard.hy');
    if(hy && (b.contains('focus-high') || b.contains('ple-high-on'))) reveal(hy);
    var cur = body.querySelector('.bite-now,.ple-bite-current,.bite-host');
    if(cur) reveal(cur);
  }
  function byHash(){
    if(!location.hash) return;
    var t = null;
    try{ t = document.getElementById(decodeURIComponent(location.hash.slice(1))); }catch(e){}
    if(t && body.contains(t)){ reveal(t); requestAnimationFrame(function(){ t.scrollIntoView({block:'start'}); }); }
  }
  /* toggle does not bubble, so listen in the capture phase. A <details open>
     written in the markup fires one toggle of its own once parsing is done,
     which can land after this script ran - that one must not open its fold,
     or the page would arrive half-open. */
  var parsedOpen = new WeakSet();
  [].forEach.call(body.querySelectorAll('details[open]:not(.fold)'), function(d){ parsedOpen.add(d); });
  document.addEventListener('toggle', function(e){
    var t = e.target;
    if(!t || !t.open || !body.contains(t)) return;
    if(parsedOpen.has(t)){ parsedOpen.delete(t); return; }
    if(!t.classList.contains('fold')) reveal(t);
    else { count(); window.dispatchEvent(new CustomEvent('absn:reveal')); }
  }, true);
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if(a){
      var t = null;
      try{ t = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); }catch(x){}
      if(t && body.contains(t)) reveal(t);
    }
    if(e.target.closest && e.target.closest('#pleShowAll,.fbAll')) openAll();
    setTimeout(sync, 0);
  });
  /* the search on NUR 258 module pages hides non-matching blocks; open the ones left standing */
  var search = document.querySelector('#moduleSearch,.ple-module-actions input[type="search"],.ple-module-actions input');
  if(search) search.addEventListener('input', function(){
    var term = (search.value || '').trim();
    if(!term) return;
    folds.forEach(function(d){ if(!d.parentElement.hidden) d.open = true; });
    count();
  });
  window.addEventListener('hashchange', byHash);
  byHash(); sync(); count();

  /* print cannot open a closed <details>, so open them for the print and put them back */
  var before = null;
  window.addEventListener('beforeprint', function(){ before = folds.map(function(d){ return d.open; }); openAll(); });
  window.addEventListener('afterprint', function(){ if(before) folds.forEach(function(d, i){ d.open = before[i]; }); before = null; sync(); count(); });
})();
