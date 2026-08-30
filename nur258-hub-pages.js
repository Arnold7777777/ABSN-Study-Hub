(function(){
  'use strict';
  var pages=[
    ['nur258-module-01-sensory-eye-ear.html','👁️','Sensory Disorders — Eye & Ear','Exam 1','pressure · vision · hearing'],
    ['nur258-module-02-infectious-diseases-hiv.html','🛡️','Infectious Diseases & HIV','Exam 1','isolation · exposure · immunity'],
    ['nur258-module-03-allergic-inflammatory-immunologic.html','🌿','Allergic, Inflammatory & Immunologic Disorders','Exam 1','allergy · inflammation · anaphylaxis'],
    ['nur258-module-04-burns.html','🔥','Burns','Exam 2','airway · depth · fluids'],
    ['nur258-module-05-endocrine-disorders.html','⚖️','Endocrine Disorders','Exam 2','hormones · patterns · crises'],
    ['nur258-module-06-diabetes.html','💧','Diabetes','Exam 2','glucose · insulin · emergencies'],
    ['nur258-module-07-neurologic-cerebrovascular.html','🧠','Neurologic & Cerebrovascular Disorders','Exam 3','stroke · ICP · neuro checks'],
    ['nur258-module-08-neuro-trauma-infection-oncology-degenerative.html','🧩','Complex Neuro','Exam 3','trauma · infection · tumors · degeneration'],
    ['nur258-module-09-hematologic-disorders.html','🩸','Hematologic Disorders','Exam 4','cells · clotting · transfusion'],
    ['nur258-module-10-oncology-end-of-life.html','🎗️','Oncology & End-of-Life Care','Exam 4','treatment · complications · comfort'],
    ['nur258-module-11-reproductive-disorders.html','🌸','Reproductive Disorders','Exam 5','conditions · procedures · teaching'],
    ['nur258-module-12-disaster-emergency-nursing.html','🚑','Disaster & Emergency Nursing','Exam 5','triage · trauma · toxins'],
    ['nur258-module-13-shock-mods.html','⚡','Shock & MODS','Final','perfusion · shock types · organ failure'],
    ['nur258-module-14-final-review.html','🏁','Final Exam Review','Final','priorities · calculations · cumulative review']
  ];
  var tones=['#9d7cff','#25d8bc','#f66ac1','#ff9255','#b58aff','#56baff','#7184ff','#a17dff','#ff667f','#db72ef','#ff82b6','#ff9861','#ff5d65','#31cbb2'];
  var style=document.createElement('style');style.id='nur258HubPagesCss';style.textContent='\
    .ple-page-library{margin-top:18px;padding:18px;border:2px solid rgba(255,255,255,.25);border-radius:22px;background:linear-gradient(145deg,rgba(12,23,58,.96),rgba(36,25,80,.94));box-shadow:0 18px 42px rgba(0,0,0,.34)}\
    .ple-page-library-head{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center;margin-bottom:13px}.ple-page-library-head>span{display:grid;place-items:center;width:54px;height:54px;border-radius:16px;background:linear-gradient(135deg,#ffd166,#f472b6);font-size:1.75rem}.ple-page-library h3{margin:0;font:950 1.4rem/1.15 "Trebuchet MS",Verdana,sans-serif}.ple-page-library-head p{margin:4px 0 0;color:#dce7ff;font-weight:700}\
    .ple-module-page-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ple-module-page-card{--tone:#8b5cf6;position:relative;display:grid;grid-template-columns:50px minmax(0,1fr) auto;gap:10px;align-items:center;min-height:106px;padding:13px;border:2px solid rgba(255,255,255,.2);border-left:8px solid var(--tone);border-radius:16px;background:rgba(6,14,40,.76);color:#fff;text-decoration:none;box-shadow:0 9px 21px rgba(0,0,0,.23)}.ple-module-page-card:hover{transform:translateY(-2px);border-color:#fff;background:rgba(26,39,88,.92)}.ple-module-page-card .ico{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:color-mix(in srgb,var(--tone) 42%,#10182e);font-size:1.55rem}.ple-module-page-card b{display:block;font:950 1rem/1.25 "Trebuchet MS",Verdana,sans-serif}.ple-module-page-card small{display:block;margin-top:4px;color:#cddaf4;font-weight:700;line-height:1.35}.ple-module-page-card .tag{align-self:start;padding:4px 7px;border-radius:999px;background:var(--tone);color:#07101f;font:950 .78rem/1.2 Verdana,sans-serif}.ple-module-page-card .arrow{position:absolute;right:12px;bottom:8px;color:#fff;font-weight:950}\
    .ple-module-launch{position:relative!important;display:flex!important;align-items:center;gap:7px;flex-wrap:wrap;margin:0 0 13px!important;padding:10px!important}.ple-module-launch .ple-bite-status{margin-right:auto}.ple-module-launch a,.ple-module-launch button{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:8px 10px;border:1px solid rgba(255,255,255,.28);border-radius:11px;background:#24335f;color:#fff;text-decoration:none;font:900 .76rem/1.15 Verdana,sans-serif;cursor:pointer}.ple-module-launch a{background:#0f6a61}.ple-module-launch .ple-high-only-btn{background:#76510e}.ple-module-launch button:hover,.ple-module-launch a:hover{outline:3px solid #ffd166;outline-offset:2px}.ple-bite-mode>.body>.ple-module-launch .ple-bite-prev,.ple-bite-mode>.body>.ple-module-launch .ple-bite-next,.ple-bite-mode>.body>.ple-module-launch .ple-bite-stop{display:inline-flex}.ple-bite-mode>.body>.ple-module-launch .ple-bite-start{display:none}\
    details.mod.ple-bite-mode details.chunk:not(.ple-bite-current):not(.ple-bite-path){display:none!important}details.mod.ple-bite-mode details.chunk.ple-bite-path{display:block!important}details.mod.ple-bite-mode details.chunk.ple-bite-current{display:block!important;outline:4px solid #ffd166;outline-offset:3px}\
    @media(max-width:720px){.ple-module-page-grid{grid-template-columns:1fr}.ple-page-library{padding:12px}.ple-module-page-card{grid-template-columns:43px minmax(0,1fr);min-height:100px}.ple-module-page-card .tag{position:absolute;right:8px;top:8px}.ple-module-page-card b{padding-right:48px}.ple-module-launch a,.ple-module-launch button{flex:1 1 42%}.ple-module-launch .ple-bite-status{width:100%;margin:0}}\
    @media(min-width:600px) and (max-width:900px){.ple-module-page-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ple-module-page-card{grid-template-columns:43px minmax(0,1fr)}.ple-module-page-card .tag{position:absolute;right:8px;top:8px}.ple-module-page-card b{padding-right:48px}}';document.head.appendChild(style);

  var dashboard=document.querySelector('.ple-dashboard');
  if(dashboard&&!document.getElementById('pleModulePageLibrary')){
    var section=document.createElement('section');section.className='ple-page-library';section.id='pleModulePageLibrary';section.setAttribute('data-adhd-ui','');section.innerHTML='<div class="ple-page-library-head"><span aria-hidden="true">📚</span><div><h3>Open one module as its own page</h3><p>Each page keeps all the content, but gives you “Exam spotlight,” “One bite,” and “Show everything” views. Links open in a new tab.</p></div></div><div class="ple-module-page-grid">'+pages.map(function(page,index){return '<a class="ple-module-page-card ple-btn-module" style="--tone:'+tones[index]+'" href="'+page[0]+'" target="_blank" rel="noopener"><span class="ico" aria-hidden="true">'+page[1]+'</span><span><b>M'+(index+1)+' · '+page[2]+'</b><small>'+page[4]+'</small></span><span class="tag">'+page[3]+'</span><span class="arrow" aria-hidden="true">open ↗</span></a>';}).join('')+'</div>';
    dashboard.appendChild(section);
  }

  [].slice.call(document.querySelectorAll('details.mod')).forEach(function(mod,index){
    var moduleBody=mod.querySelector(':scope > .body');if(!moduleBody||moduleBody.querySelector('.ple-module-launch'))return;
    var chunks=[].slice.call(mod.querySelectorAll('details.chunk')),current=0,biteOn=false,highOn=false;
    var bar=document.createElement('nav');bar.className='ple-bite-nav ple-module-launch ple-high-branch';bar.setAttribute('aria-label','Module '+(index+1)+' study views');bar.innerHTML='<strong>🧩 Choose how much to see</strong><span class="ple-bite-status">Everything visible</span><a href="'+pages[index][0]+'" target="_blank" rel="noopener">↗ Own page</a><a href="'+pages[index][0]+'?high=1" target="_blank" rel="noopener">⭐ Spotlight page</a><button type="button" class="ple-high-only-btn" aria-pressed="false">⭐ High yield</button><button type="button" class="ple-bite-start">🧩 One bite</button><button type="button" class="ple-bite-prev">← Previous</button><button type="button" class="ple-bite-next">Next →</button><button type="button" class="ple-bite-stop">📚 Show all</button>';
    moduleBody.insertBefore(bar,moduleBody.firstChild);
    var status=bar.querySelector('.ple-bite-status'),high=mod.querySelector('.mcard.hy');if(high)high.classList.add('ple-high-branch');
    if(high&&!high.querySelector('.ple-high-badge')){var heading=high.querySelector('h4');if(heading)heading.insertAdjacentHTML('beforeend','<span class="ple-high-badge">EXAM SPOTLIGHT</span>');}
    function clear(){chunks.forEach(function(chunk){chunk.classList.remove('ple-bite-current','ple-bite-path');});}
    function mark(){
      clear();if(!chunks.length)return;current=Math.max(0,Math.min(current,chunks.length-1));var item=chunks[current];item.classList.add('ple-bite-current');item.open=true;var parent=item.parentElement;while(parent&&parent!==mod){if(parent.matches&&parent.matches('details.chunk')){parent.classList.add('ple-bite-path');parent.open=true;}parent=parent.parentElement;}status.textContent='Bite '+(current+1)+' of '+chunks.length;item.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
    }
    function setBite(on){biteOn=!!on;mod.classList.toggle('ple-bite-mode',biteOn);if(biteOn){setHigh(false);mark();}else{clear();status.textContent=highOn?(high.querySelectorAll('li').length+' exam facts'):'Everything visible';}}
    function setHigh(on){highOn=!!on;mod.classList.toggle('ple-high-only',highOn);var button=bar.querySelector('.ple-high-only-btn');button.setAttribute('aria-pressed',String(highOn));button.textContent=highOn?'⭐ High yield: ON':'⭐ High yield';if(highOn){biteOn=false;mod.classList.remove('ple-bite-mode');clear();if(high){[].slice.call(high.querySelectorAll('details')).forEach(function(d){d.open=true;});status.textContent=high.querySelectorAll('li').length+' exam facts';high.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}}else status.textContent='Everything visible';}
    bar.querySelector('.ple-bite-start').addEventListener('click',function(){setBite(true);});
    bar.querySelector('.ple-bite-prev').addEventListener('click',function(){current=(current-1+chunks.length)%chunks.length;mark();});
    bar.querySelector('.ple-bite-next').addEventListener('click',function(){current=(current+1)%chunks.length;mark();});
    bar.querySelector('.ple-bite-stop').addEventListener('click',function(){setBite(false);setHigh(false);});
    bar.querySelector('.ple-high-only-btn').addEventListener('click',function(){setHigh(!highOn);});
  });
})();
