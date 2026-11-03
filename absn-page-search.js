/* Search rendered study text without rewriting it or disturbing quiz state. */
(function(){
  'use strict';
  var script=document.currentScript;
  var base=new URL('.',script.src);
  function boot(){
    if(document.getElementById('absnPageSearch')||document.getElementById('siteSearch'))return;
    var css=document.createElement('link');css.rel='stylesheet';css.href=new URL('absn-page-search.css',base).href;document.head.appendChild(css);
    var box=document.createElement('section');box.id='absnPageSearch';box.setAttribute('data-absn-keep','');box.setAttribute('data-adhd-ui','');box.setAttribute('aria-label','Search this page or the Study Hub');
    box.innerHTML='<form role="search" aria-label="Find text on this page"><label for="apsQuery">Search this page or the Study Hub</label><input id="apsQuery" type="search" placeholder="Enter a topic or phrase" autocomplete="off" maxlength="160" aria-describedby="apsHint"><div class="aps-actions"><button class="aps-submit" type="submit">Find on this page</button><button class="aps-hub" type="button">Search the Study Hub</button></div></form><p id="apsHint" class="aps-hint">Page search includes collapsed sections. Hub search finds related pages. Words inside pictures and PDFs are not searched here.</p><p class="aps-status" role="status" aria-live="polite"></p><div class="aps-actions aps-nav" hidden><button type="button" class="aps-prev">Previous</button><button type="button" class="aps-next">Next</button><button type="button" class="aps-clear">Clear</button></div><ol class="aps-results" aria-label="Matching passages"></ol><button type="button" class="aps-more" hidden>Show more matches</button>';
    var heading=document.querySelector('h1');
    var top=heading&&(heading.closest('header')||heading);
    if(top&&top.parentNode&&!top.closest('details'))top.insertAdjacentElement('afterend',box);
    else {var nav=document.querySelector('nav.absn-back.top');if(nav)nav.insertAdjacentElement('afterend',box);else document.body.prepend(box);}
    var input=box.querySelector('input'),status=box.querySelector('.aps-status'),list=box.querySelector('.aps-results'),nav=box.querySelector('.aps-nav'),more=box.querySelector('.aps-more');
    var scope=document.querySelector('.modbody')||document.querySelector('main,.wrap,.container')||document.body;
    var hits=[],at=-1,shown=6,target=null,lastQuery='',limit=250;
    var canHighlight=!!(window.CSS&&CSS.highlights&&window.Highlight);
    var skip='script,style,noscript,template,svg,canvas,iframe,form,nav,button,input,textarea,select,[aria-hidden="true"],#absnPageSearch,#absnDrawer,#adhdStudyTools,.adhd-guide,.adhd-orient,.qwhy[hidden],#rat:not(.show),.qmark';
    function reset(){
      if(canHighlight){CSS.highlights.delete('absn-page-match');CSS.highlights.delete('absn-page-active');}
      if(target)target.classList.remove('absn-find-target');target=null;hits=[];at=-1;shown=6;list.replaceChildren();more.hidden=true;nav.hidden=true;status.textContent='';
    }
    function groups(){
      var map=new Map(),walk=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT),node;
      while((node=walk.nextNode())){
        var parent=node.parentElement;if(!parent||parent.closest(skip)||!node.textContent)continue;
        var hidden=parent.closest('[hidden]');if(hidden&&!hidden.classList.contains('adhd-card-body'))continue;
        var block=parent.closest('p,li,td,th,h1,h2,h3,h4,h5,h6,figcaption,summary,label,blockquote,dt,dd')||parent;
        if(!map.has(block))map.set(block,{el:block,text:'',nodes:[]});
        var group=map.get(block);group.nodes.push({node:node,start:group.text.length});group.text+=node.textContent;
      }
      return Array.from(map.values());
    }
    function makeRange(group,start,end){
      var range=document.createRange(),a,b;
      group.nodes.forEach(function(n){if(n.start<=start)a=n;if(n.start<end)b=n;});
      range.setStart(a.node,start-a.start);range.setEnd(b.node,end-b.start);return range;
    }
    function labelFor(el){
      var section=el.closest('.mcard,.slot,.card,section,article,details');
      var h=section&&section.querySelector('h2,h3,h4,h5,h6,summary');
      var clean=h&&h.cloneNode(true);if(clean)clean.querySelectorAll('button,.fold-chev,.cnt').forEach(function(n){n.remove();});
      return (clean?clean.textContent:document.title).replace(/\s+/g,' ').trim().slice(0,100);
    }
    function paint(){
      list.replaceChildren();
      hits.slice(0,shown).forEach(function(hit,i){
        var li=document.createElement('li'),button=document.createElement('button'),title=document.createElement('strong'),snippet=document.createElement('span');button.type='button';
        title.textContent=(i+1)+'. '+labelFor(hit.el);snippet.textContent=hit.snippet;
        button.append(title,snippet);button.addEventListener('click',function(){visit(i);});li.appendChild(button);list.appendChild(li);
      });more.hidden=shown>=hits.length;
    }
    function visit(i){
      if(!hits.length)return;
      at=(i+hits.length)%hits.length;var hit=hits[at];
      if(!hit.el.isConnected){search();return;}
      /* Let the owning controls reset their modes, keeping their state in sync. */
      if(document.body.matches('.focus-high,.focus-bite')){var all=document.querySelector('.fbAll');if(all)all.click();}
      var show=document.querySelector('#pleShowAll');if(show&&document.body.matches('.ple-high-on,.ple-bite-on'))show.click();
      for(var e=hit.el;e&&e!==document.body;e=e.parentElement){
        if(e.tagName==='DETAILS')e.open=true;
        if(e.classList.contains('adhd-focus-target')&&e.tagName!=='DETAILS'&&!e.classList.contains('adhd-open')){var toggle=e.querySelector(':scope>.adhd-card-toggle');if(toggle)toggle.click();}
      }
      if(target)target.classList.remove('absn-find-target');target=hit.el;target.classList.add('absn-find-target');
      if(canHighlight)CSS.highlights.set('absn-page-active',new Highlight(hit.range));
      status.textContent='Match '+(at+1)+' of '+hits.length+(hits.length===limit?'+':'')+' for “'+lastQuery+'”.';
      requestAnimationFrame(function(){hit.el.scrollIntoView({block:'center',behavior:'auto'});});
    }
    function search(){
      var q=input.value.trim();reset();lastQuery=q;
      if(q.length<2){status.textContent='Enter at least 2 characters.';input.focus();return;}
      var escaped=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s+');
      var re=new RegExp(escaped,'gi'),ranges=[];
      groups().some(function(group){
        re.lastIndex=0;var m;
        while((m=re.exec(group.text))){
          var range=makeRange(group,m.index,m.index+m[0].length);
          var before=Math.max(0,m.index-65),after=Math.min(group.text.length,m.index+m[0].length+100);
          hits.push({el:group.el,range:range,snippet:(before?'…':'')+group.text.slice(before,after).replace(/\s+/g,' ')+(after<group.text.length?'…':'')});ranges.push(range);
          if(hits.length>=limit)return true;
        }return false;
      });
      nav.hidden=false;box.querySelector('.aps-prev').disabled=!hits.length;box.querySelector('.aps-next').disabled=!hits.length;
      status.textContent=hits.length?hits.length+(hits.length===limit?'+':'')+' matches for “'+q+'”. Choose a passage below.':'No matches on this page for “'+q+'”. Try fewer words or search the Study Hub.';
      if(canHighlight&&ranges.length)CSS.highlights.set('absn-page-match',new Highlight(...ranges));
      paint();
    }
    box.querySelector('form').addEventListener('submit',function(e){e.preventDefault();search();});
    box.querySelector('.aps-hub').addEventListener('click',function(){
      var q=input.value.trim();if(q.length<2){status.textContent='Enter at least 2 characters to search the Study Hub.';input.focus();return;}
      var destination=new URL('index.html',base);destination.searchParams.set('q',q);destination.hash='siteSearch';location.href=destination.href;
    });
    box.querySelector('.aps-clear').addEventListener('click',function(){input.value='';lastQuery='';reset();input.focus();});
    box.querySelector('.aps-next').addEventListener('click',function(){visit(at+1);});
    box.querySelector('.aps-prev').addEventListener('click',function(){visit(at<0?hits.length-1:at-1);});
    more.addEventListener('click',function(){shown+=6;paint();});
    input.addEventListener('input',function(){if(input.value.trim()!==lastQuery){reset();status.textContent=input.value.trim()?'Choose where to search.':'';}});
    input.addEventListener('keydown',function(e){if(e.key==='Escape'){input.value='';reset();}});
    document.addEventListener('keydown',function(e){if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.target.closest('input,textarea,select,[contenteditable="true"]')){e.preventDefault();input.focus({preventScroll:true});box.scrollIntoView({block:'center'});}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
