/* absn-vprev.js - inline previews under the Visual references cards.

   Each card carries a closed <details class="vprev"> whose body names what to
   show (data-type: drive | img | page, data-src). Nothing is fetched until
   she opens one; then the iframe or image is built once and kept. The box is
   given its height before the content arrives, so the page does not jump
   under her while she reads (Caroline, 7 Oct 2026). */
(function(){
  'use strict';
  function build(box){
    if(box.getAttribute('data-built')) return;
    box.setAttribute('data-built','1');
    var type=box.getAttribute('data-type'), src=box.getAttribute('data-src'), open=box.getAttribute('data-open')||src;
    var el;
    if(type==='img'){
      el=document.createElement('img'); el.src=src; el.alt=''; el.loading='lazy'; el.decoding='async';
    } else {
      el=document.createElement('iframe'); el.src=src; el.loading='lazy';
      el.setAttribute('allow','autoplay'); el.setAttribute('title','Preview');
      el.setAttribute('referrerpolicy','no-referrer-when-downgrade');
    }
    box.appendChild(el);
    var note=document.createElement('p'); note.className='vprevnote';
    note.innerHTML='If nothing shows here, <a href="'+open.replace(/"/g,'&quot;')+'" target="_blank" rel="noopener">open it in a new tab &#8599;</a>.';
    box.appendChild(note);
  }
  document.addEventListener('toggle',function(e){
    var d=e.target;
    if(!d||!d.classList||!d.classList.contains('vprev')||!d.open) return;
    var box=d.querySelector('.vprevb'); if(box) build(box);
  },true);
  /* a card thumbnail borrowed from Drive that fails to load should not leave a blank plate */
  document.addEventListener('error',function(e){
    var img=e.target;
    if(img&&img.tagName==='IMG'&&/drive\.google\.com\/thumbnail/.test(img.src)){
      var wrap=img.closest('.igprev'); if(wrap) wrap.remove();
      var card=img.closest('.igcard'); if(card) card.classList.remove('hasprev');
    }
  },true);
})();
