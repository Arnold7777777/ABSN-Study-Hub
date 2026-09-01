/* absn-focus.js - two ways to make a module page smaller.

   One bite   shows a single chunk at a time and steps through them, so the
              page stops being a wall and becomes a sequence.
   Spotlight  shows only the high-yield card, which is the answer to "I have
              twenty minutes before the exam, what do I read".

   Both are off by default and either one turns the other off - two reduced
   views at once would be a third view nobody asked for. ?high=1 and ?bite=1
   open the page straight into that mode, so a link can point at it.

   Same two modes as the NUR 258 module pages, so all three courses behave
   the same way. */
(function(){
  'use strict';
  var body = document.querySelector('.modbody');
  if(!body) return;

  var chunks = [].slice.call(body.querySelectorAll('details.chunk'));
  var high   = body.querySelector('.mcard.hy');
  if(!chunks.length && !high) return;

  /* the high-yield card is where Spotlight sends you, so it must not also be
     one of the bites - you would meet it twice */
  if(high) chunks = chunks.filter(function(c){ return !high.contains(c); });

  var facts = high ? high.querySelectorAll('li').length : 0;

  /* ---- the control bar ------------------------------------------------ */
  var bar = document.createElement('nav');
  bar.className = 'focusbar';
  bar.setAttribute('aria-label','How much of this module to show');
  bar.innerHTML =
    '<strong class="fbttl">🧩 How much do you want to see?</strong>' +
    (high ? '<button type="button" class="fbtn fbHigh" aria-pressed="false">' +
            '⭐ Exam spotlight</button>' : '') +
    (chunks.length ? '<button type="button" class="fbtn fbBite" aria-pressed="false">' +
            '🧩 One bite</button>' +
            '<button type="button" class="fbtn fbPrev">← Back</button>' +
            '<button type="button" class="fbtn fbNext">Next →</button>' : '') +
    '<button type="button" class="fbtn fbAll">📚 Show everything</button>' +
    '<span class="fbstat" role="status" aria-live="polite">Everything is visible</span>';

  var firstNav = body.parentNode.querySelector('.modbar');
  if(firstNav && firstNav.nextSibling) firstNav.parentNode.insertBefore(bar, firstNav.nextSibling);
  else body.parentNode.insertBefore(bar, body);

  var bHigh = bar.querySelector('.fbHigh'), bBite = bar.querySelector('.fbBite'),
      bPrev = bar.querySelector('.fbPrev'), bNext = bar.querySelector('.fbNext'),
      bAll  = bar.querySelector('.fbAll'),  stat  = bar.querySelector('.fbstat');

  var at = 0, biteOn = false, highOn = false;

  function smooth(){
    return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }

  /* ---- one bite -------------------------------------------------------- */
  function clearBite(){
    chunks.forEach(function(c){ c.classList.remove('bite-now'); });
    [].forEach.call(body.children, function(el){ el.classList.remove('bite-host'); });
  }

  /* the top-level block the bite lives inside - it stays visible so the bite
     keeps its heading, its color and its context */
  function hostOf(el){
    while(el && el.parentNode !== body) el = el.parentNode;
    return el;
  }
  function markBite(scroll){
    clearBite();
    if(!chunks.length) return;
    at = Math.max(0, Math.min(at, chunks.length - 1));
    var c = chunks[at];
    c.classList.add('bite-now');
    c.open = true;
    var host = hostOf(c);
    if(host) host.classList.add('bite-host');
    stat.textContent = 'Bite ' + (at + 1) + ' of ' + chunks.length;
    if(scroll !== false) c.scrollIntoView({behavior:smooth(), block:'center'});
  }
  function setBite(on, scroll){
    biteOn = !!on;
    document.body.classList.toggle('focus-bite', biteOn);
    if(bBite){
      bBite.setAttribute('aria-pressed', String(biteOn));
      bBite.textContent = biteOn ? '🧩 One bite: ON' : '🧩 One bite';
    }
    if(biteOn){ setHigh(false); biteOn = true; document.body.classList.add('focus-bite'); markBite(scroll); }
    else { clearBite(); stat.textContent = 'Everything is visible'; }
  }

  /* ---- spotlight ------------------------------------------------------- */
  function setHigh(on, scroll){
    highOn = !!on;
    document.body.classList.toggle('focus-high', highOn);
    if(bHigh){
      bHigh.setAttribute('aria-pressed', String(highOn));
      bHigh.textContent = highOn ? '⭐ Spotlight: ON' : '⭐ Exam spotlight';
    }
    if(highOn){
      setBite(false);
      highOn = true; document.body.classList.add('focus-high');
      if(bHigh){ bHigh.setAttribute('aria-pressed','true'); bHigh.textContent = '⭐ Spotlight: ON'; }
      [].forEach.call(high.querySelectorAll('details'), function(d){ d.open = true; });
      stat.textContent = facts + ' exam facts';
      if(scroll !== false) high.scrollIntoView({behavior:smooth(), block:'start'});
    } else if(!biteOn){
      stat.textContent = 'Everything is visible';
    }
  }

  if(bHigh) bHigh.addEventListener('click', function(){ setHigh(!highOn); });
  if(bBite) bBite.addEventListener('click', function(){ setBite(!biteOn); });
  if(bPrev) bPrev.addEventListener('click', function(){
    if(!biteOn) return setBite(true);
    at = (at - 1 + chunks.length) % chunks.length; markBite();
  });
  if(bNext) bNext.addEventListener('click', function(){
    if(!biteOn) return setBite(true);
    at = (at + 1) % chunks.length; markBite();
  });
  bAll.addEventListener('click', function(){ setBite(false); setHigh(false); });

  /* arrow keys step through the bites once a mode button has focus, so the
     whole thing is usable without aiming at a small target */
  bar.addEventListener('keydown', function(e){
    if(!biteOn) return;
    if(e.key === 'ArrowRight'){ e.preventDefault(); bNext.click(); }
    else if(e.key === 'ArrowLeft'){ e.preventDefault(); bPrev.click(); }
  });

  /* a link can open the page already narrowed */
  try{
    var p = new URLSearchParams(location.search);
    if(p.get('high') === '1') setHigh(true);
    else if(p.get('bite') === '1') setBite(true);
  }catch(e){}
})();
