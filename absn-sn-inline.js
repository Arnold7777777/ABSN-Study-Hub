/* Event delegation also supports the infographic library's filtered cards. */
(function(){
  'use strict';
  document.addEventListener('click',function(event){
    var target=event.target.closest('.sn-inline-zoom,.sn-inline-image');
    if(!target||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    var figure=target.closest('.sn-inline');
    if(!figure)return;
    event.preventDefault();
    var enlarged=figure.classList.toggle('is-enlarged');
    var button=figure.querySelector('.sn-inline-zoom');
    button.setAttribute('aria-pressed',String(enlarged));
    button.textContent=enlarged?'Fit preview to page':'Enlarge preview here';
    var hint=figure.querySelector('.sn-inline-zoom-hint');
    if(!hint){hint=document.createElement('span');hint.className='sn-inline-zoom-hint';hint.textContent='Scroll within the image to read it.';figure.querySelector('figcaption').appendChild(hint);}
    hint.hidden=!enlarged;
    var image=figure.querySelector('.sn-inline-image');
    image.setAttribute('aria-label',enlarged?'Fit infographic preview to page':'Enlarge infographic preview here');
    var viewport=figure.querySelector('.sn-inline-viewport');
    viewport.scrollTop=0;viewport.scrollLeft=0;
  });
})();
