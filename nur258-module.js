(function(){
  'use strict';

  var body=document.body;
  var moduleNumber=Number(body.getAttribute('data-module')||1);
  var mod=document.querySelector('details.mod');
  var live=document.getElementById('pleModuleLive');
  var stateKey='nur258ModuleReaderV1';
  var state={font:18,roomy:false};
  try{state=Object.assign(state,JSON.parse(localStorage.getItem(stateKey)||'{}'));}catch(e){}

  function announce(message){if(live){live.textContent='';setTimeout(function(){live.textContent=message;},20);}}
  function save(){try{localStorage.setItem(stateKey,JSON.stringify(state));}catch(e){}}
  function smooth(){return matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';}
  function escapeHtml(value){return String(value).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}

  function robotSvg(index,small){
    var palettes=[
      ['#f472b6','#8b5cf6','#bff7ee','#ffd166'],['#2dd4bf','#2563eb','#dbeafe','#ff8fab'],
      ['#f59e0b','#db2777','#fff2a8','#67e8f9'],['#60a5fa','#7c3aed','#d9f99d','#f9a8d4']
    ];
    var p=palettes[(index-1)%palettes.length],kind=(index-1)%4;
    var antenna=kind===0?'<path d="M110 51V22" stroke="'+p[3]+'" stroke-width="9" stroke-linecap="round"/><circle cx="110" cy="17" r="12" fill="'+p[3]+'" stroke="#fff" stroke-width="4"/>':kind===1?'<path d="M85 52L63 26M135 52l22-26" stroke="'+p[3]+'" stroke-width="9" stroke-linecap="round"/><circle cx="60" cy="23" r="10" fill="'+p[3]+'"/><circle cx="160" cy="23" r="10" fill="'+p[3]+'"/>':kind===2?'<path d="M110 51C110 27 151 36 151 10" fill="none" stroke="'+p[3]+'" stroke-width="9" stroke-linecap="round"/><circle cx="151" cy="11" r="10" fill="'+p[3]+'"/>':'<path d="M110 50V29M93 29h34" stroke="'+p[3]+'" stroke-width="9" stroke-linecap="round"/><circle cx="93" cy="29" r="8" fill="'+p[3]+'"/><circle cx="127" cy="29" r="8" fill="'+p[3]+'"/>';
    var eyes=kind===2?'<circle cx="85" cy="96" r="12" fill="#07101f"/><path d="M126 96h22" stroke="#07101f" stroke-width="10" stroke-linecap="round"/>':'<circle cx="83" cy="96" r="12" fill="#07101f"/><circle cx="137" cy="96" r="12" fill="#07101f"/><circle cx="79" cy="91" r="4" fill="#fff"/><circle cx="133" cy="91" r="4" fill="#fff"/>';
    var prop=['<path d="M44 202l-23 20" stroke="#ffd166" stroke-width="13" stroke-linecap="round"/><circle cx="18" cy="225" r="20" fill="none" stroke="#ffd166" stroke-width="8"/><path d="M4 241l-14 16" stroke="#ffd166" stroke-width="9" stroke-linecap="round"/>','<path d="M176 196h31v49h-31z" fill="#f8fafc" stroke="#07101f" stroke-width="6"/><path d="M184 208h16m-16 11h16m-16 11h11" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>','<path d="M32 208q28-26 54 0v42q-28-18-54 0Z" fill="#fff" stroke="#07101f" stroke-width="6"/><path d="M59 204v43" stroke="'+p[1]+'" stroke-width="5"/>','<path d="M176 210h40M196 190v40" stroke="#ffd166" stroke-width="12" stroke-linecap="round"/>'][kind];
    return '<svg viewBox="-20 0 250 285" role="img" aria-label="Colorful three-dimensional robot study guide">'+
      '<defs><linearGradient id="botBody'+index+(small?'s':'')+'" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+p[0]+'"/><stop offset="1" stop-color="'+p[1]+'"/></linearGradient><linearGradient id="botFace'+index+(small?'s':'')+'"><stop stop-color="#ffffff"/><stop offset="1" stop-color="'+p[2]+'"/></linearGradient><filter id="botShadow'+index+(small?'s':'')+'"><feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#000" flood-opacity=".45"/></filter></defs>'+antenna+
      '<g filter="url(#botShadow'+index+(small?'s':'')+')"><ellipse cx="110" cy="266" rx="79" ry="14" fill="#020617" opacity=".45"/><rect x="31" y="47" width="158" height="115" rx="49" fill="url(#botBody'+index+(small?'s':'')+')" stroke="#fff" stroke-width="7"/><rect x="50" y="70" width="120" height="66" rx="28" fill="url(#botFace'+index+(small?'s':'')+')" stroke="#07101f" stroke-width="6"/>'+eyes+'<path d="M84 119q26 21 52 0" fill="none" stroke="#07101f" stroke-width="6" stroke-linecap="round"/><rect x="59" y="156" width="103" height="94" rx="31" fill="url(#botBody'+index+(small?'s':'')+')" stroke="#fff" stroke-width="7"/><circle cx="110" cy="186" r="14" fill="'+p[3]+'" stroke="#fff" stroke-width="5"/><path d="M62 179q-35 3-40 34M160 179q35 3 39 34" fill="none" stroke="'+p[0]+'" stroke-width="19" stroke-linecap="round"/><circle cx="22" cy="217" r="13" fill="'+p[3]+'" stroke="#fff" stroke-width="4"/><circle cx="199" cy="217" r="13" fill="'+p[3]+'" stroke="#fff" stroke-width="4"/><path d="M80 247v17M141 247v17" stroke="'+p[1]+'" stroke-width="16" stroke-linecap="round"/>'+prop+'</g></svg>';
  }

  var robot=document.getElementById('moduleHeroRobot');
  if(robot)robot.innerHTML=robotSvg(moduleNumber,false);

  function cueFor(text){
    if(/complication|warning|emergency|red flag|never|contraindicat|urgent|danger/i.test(text))return ['🚨','danger'];
    if(/drug|medication|pharm|insulin|antibiotic|antidote|therapy/i.test(text))return ['💊','meds'];
    if(/lab|diagnos|test|value|monitor|imaging|confirm/i.test(text))return ['🧪','labs'];
    if(/priority|first|intervention|nursing action|management|treatment|what you do/i.test(text))return ['🎯','priority'];
    if(/teach|education|discharge|home|patient|prevention/i.test(text))return ['💬','teach'];
    if(/sign|symptom|assessment|manifest|finding|presentation|shows up/i.test(text))return ['🩺','assess'];
    return ['✨','idea'];
  }
  var chunks=mod?[].slice.call(mod.querySelectorAll('details.chunk')):[];
  var biteFallback=false;
  if(mod&&!chunks.length){chunks=[].slice.call(mod.querySelectorAll(':scope > .body > .mcard, :scope > .body > .slot, :scope > .body > .vbrief, :scope > .body > .vtw'));biteFallback=true;chunks.forEach(function(chunk){chunk.classList.add('ple-bite-section');});}
  chunks.forEach(function(chunk){
    var summary=chunk.querySelector(':scope > summary');if(!summary||summary.querySelector('.ple-chunk-icon'))return;
    /* If the label already carries its own emoji, a second guessed one only contradicts it. */
    var label=summary.querySelector('.cklab');
    if(label&&/^\p{Extended_Pictographic}/u.test((label.textContent||'').trim()))return;
    var cue=cueFor((summary.textContent||'')+' '+(chunk.textContent||'').slice(0,180));
    var icon=document.createElement('span');icon.className='ple-chunk-icon';icon.setAttribute('aria-hidden','true');icon.textContent=cue[0];
    summary.insertBefore(icon,summary.firstChild);chunk.classList.add('ple-chunk-'+cue[1]);
  });

  var high=mod&&mod.querySelector('.mcard.hy');
  if(high){
    var highRobot=document.createElement('div');highRobot.className='ple-high-robot';highRobot.setAttribute('aria-hidden','true');highRobot.innerHTML=robotSvg(moduleNumber+1,true);high.appendChild(highRobot);
    var factCount=high.querySelectorAll('li').length;
    high.setAttribute('aria-label','Exam spotlight with '+factCount+' high-yield facts');
    [].slice.call(high.querySelectorAll('details.chunk')).forEach(function(chunk){
      var summary=chunk.querySelector(':scope > summary'),n=chunk.querySelectorAll('li').length;if(!summary)return;
      var shut=summary.querySelector('.ckshut'),open=summary.querySelector('.ckopen');
      if(shut)shut.textContent='Open '+n+' exam fact'+(n===1?'':'s');
      if(open)open.textContent='Close these '+n+' facts';
    });
  }

  var biteIndex=0,biteOn=false,highOn=false;
  var status=document.getElementById('pleActionStatus');
  var biteButton=document.getElementById('pleBiteToggle');
  var highButton=document.getElementById('pleHighToggle');
  function clearBiteClasses(){chunks.forEach(function(c){c.classList.remove('ple-bite-current','ple-bite-path');});}
  function markBite(){
    clearBiteClasses();if(!chunks.length)return;
    biteIndex=Math.max(0,Math.min(biteIndex,chunks.length-1));var current=chunks[biteIndex];current.classList.add('ple-bite-current');current.open=true;
    var parent=current.parentElement;
    while(parent&&parent!==mod){if(parent.matches&&parent.matches('details.chunk')){parent.classList.add('ple-bite-path');parent.open=true;}parent=parent.parentElement;}
    if(status)status.textContent='Bite '+(biteIndex+1)+' of '+chunks.length;
    current.scrollIntoView({behavior:smooth(),block:'center'});
  }
  function setBite(on){
    biteOn=!!on;body.classList.toggle('ple-bite-on',biteOn);body.classList.toggle('ple-bite-fallback',biteOn&&biteFallback);if(biteButton){biteButton.setAttribute('aria-pressed',String(biteOn));biteButton.textContent=biteOn?'🧩 One bite: ON':'🧩 One bite';}
    if(biteOn){highOn=false;body.classList.remove('ple-high-on');if(highButton){highButton.setAttribute('aria-pressed','false');highButton.textContent='⭐ Exam spotlight';}markBite();announce('One-bite study mode on. Showing bite '+(biteIndex+1)+' of '+chunks.length+'.');}
    else{clearBiteClasses();if(status)status.textContent='Everything is visible';announce('One-bite study mode off.');}
  }
  function setHigh(on){
    highOn=!!on;body.classList.toggle('ple-high-on',highOn);if(highButton){highButton.setAttribute('aria-pressed',String(highOn));highButton.textContent=highOn?'⭐ Spotlight: ON':'⭐ Exam spotlight';}
    if(highOn){setBite(false);highOn=true;body.classList.add('ple-high-on');if(highButton){highButton.setAttribute('aria-pressed','true');highButton.textContent='⭐ Spotlight: ON';}if(mod)mod.open=true;[].slice.call(high?high.querySelectorAll('details'):[]).forEach(function(d){d.open=true;});if(status)status.textContent=(high?high.querySelectorAll('li').length:0)+' exam facts';if(high)high.scrollIntoView({behavior:smooth(),block:'start'});announce('Exam spotlight mode on. Only the highest-yield facts are visible.');}
    else{if(status)status.textContent='Everything is visible';announce('Exam spotlight mode off.');}
  }
  if(biteButton)biteButton.addEventListener('click',function(){setBite(!biteOn);});
  if(highButton)highButton.addEventListener('click',function(){setHigh(!highOn);});
  var prevBite=document.getElementById('pleBitePrev'),nextBite=document.getElementById('pleBiteNext'),allButton=document.getElementById('pleShowAll');
  if(prevBite)prevBite.addEventListener('click',function(){if(!biteOn)setBite(true);else{biteIndex=(biteIndex-1+chunks.length)%chunks.length;markBite();}});
  if(nextBite)nextBite.addEventListener('click',function(){if(!biteOn)setBite(true);else{biteIndex=(biteIndex+1)%chunks.length;markBite();}});
  if(allButton)allButton.addEventListener('click',function(){setBite(false);setHigh(false);if(mod){mod.open=true;[].slice.call(mod.querySelectorAll('details.chunk')).forEach(function(d){d.open=true;});}if(status)status.textContent='All sections are open';announce('All sections are open.');});
  [].slice.call(document.querySelectorAll('[data-ple-action]')).forEach(function(button){button.addEventListener('click',function(){var action=button.getAttribute('data-ple-action');if(action==='high')setHigh(true);else if(action==='bite')setBite(true);else if(allButton)allButton.click();});});

  var textUp=document.getElementById('pleTextUp'),textDown=document.getElementById('pleTextDown'),roomy=document.getElementById('pleRoomy');
  document.documentElement.style.fontSize=Math.max(16,Math.min(23,Number(state.font)||18))+'px';body.classList.toggle('ple-roomy',!!state.roomy);if(roomy)roomy.setAttribute('aria-pressed',String(!!state.roomy));
  if(textUp)textUp.addEventListener('click',function(){state.font=Math.min(23,(Number(state.font)||18)+1);document.documentElement.style.fontSize=state.font+'px';save();announce('Text size '+state.font+' pixels.');});
  if(textDown)textDown.addEventListener('click',function(){state.font=Math.max(16,(Number(state.font)||18)-1);document.documentElement.style.fontSize=state.font+'px';save();announce('Text size '+state.font+' pixels.');});
  if(roomy)roomy.addEventListener('click',function(){state.roomy=!state.roomy;body.classList.toggle('ple-roomy',state.roomy);roomy.setAttribute('aria-pressed',String(state.roomy));save();announce(state.roomy?'Roomy spacing on.':'Roomy spacing off.');});

  var search=document.getElementById('moduleSearch');
  if(search&&mod){
    var bodyChildren=[].slice.call(mod.querySelector('.body').children);
    search.addEventListener('input',function(){
      var term=search.value.trim().toLowerCase();if(term&&(biteOn||highOn)){setBite(false);setHigh(false);}
      var matches=0;bodyChildren.forEach(function(node){var hit=!term||(node.textContent||'').toLowerCase().indexOf(term)>-1;node.hidden=!hit;if(hit&&term){matches++;[].slice.call(node.querySelectorAll('details')).forEach(function(d){d.open=true;});}});
      if(status)status.textContent=term?(matches+' matching sections'):'Everything is visible';
    });
  }

  function renderQuiz(){
    /* ABSN_QBANK is the generic name; NUR258_QBANK is kept because that is what
     the NUR 258 pages already load. Same shape, same reader. */
    var bank=window.ABSN_QBANK||window.NUR258_QBANK;
    if(!mod||!bank)return;var qs=bank[String(moduleNumber)]||[];var slot=mod.querySelector('.slot[data-slot="quiz"]');if(!slot||!qs.length)return;
    slot.classList.add('filled');var empty=slot.querySelector('.empty');if(empty)empty.remove();var intro=slot.querySelector('p');if(intro){intro.classList.add('ple-quiz-intro');intro.textContent='Choose an answer, then check it. The explanation teaches both the right answer and the distractor.';}
    var heading=slot.querySelector('h4');if(heading)heading.innerHTML='🎯 Knowledge check <span class="cnt">'+qs.length+'</span>';
    var score=document.createElement('p');score.className='qscore';score.textContent=qs.length+' questions';slot.appendChild(score);
    qs.forEach(function(q,qi){
      var multi=q.type==='sata',card=document.createElement('div');card.className='qz';card.dataset.ans=JSON.stringify(q.ans||[]);
      var options=(q.opts||[]).map(function(option,oi){return '<label data-i="'+oi+'"><input type="'+(multi?'checkbox':'radio')+'" name="module'+moduleNumber+'q'+qi+'" value="'+oi+'"><span>'+escapeHtml(option)+'</span></label>';}).join('');
      card.innerHTML='<div><span class="qnum">Q'+(qi+1)+'</span>'+(multi?'<span class="qtype">Select all that apply</span>':'')+'</div><p class="qq">'+escapeHtml(q.q)+'</p>'+options+'<div><button type="button" class="qbtn">Check my answer</button><span class="qmark"></span></div><div class="qwhy" hidden><b>Why:</b> '+(q.why||'')+'</div>';
      card.querySelector('.qbtn').addEventListener('click',function(){
        var answers=JSON.parse(card.dataset.ans),picked=[].slice.call(card.querySelectorAll('input:checked')).map(function(input){return Number(input.value);});if(!picked.length){announce('Choose at least one answer first.');return;}
        [].slice.call(card.querySelectorAll('label')).forEach(function(label){var oi=Number(label.dataset.i),correct=answers.indexOf(oi)>-1,chosen=picked.indexOf(oi)>-1;label.classList.remove('right','wrong');if(correct)label.classList.add('right');else if(chosen)label.classList.add('wrong');});
        var right=answers.length===picked.length&&answers.every(function(a){return picked.indexOf(a)>-1;});var mark=card.querySelector('.qmark');mark.textContent=right?'Correct':'Not quite';mark.className='qmark '+(right?'ok':'no');card.querySelector('.qwhy').hidden=false;card.dataset.done=right?'ok':'no';
        var done=slot.querySelectorAll('.qz[data-done]').length,ok=slot.querySelectorAll('.qz[data-done="ok"]').length;score.textContent=ok+' of '+done+' answered correctly';announce(right?'Correct answer.':'Not quite. Read the explanation, then try the next question.');
      });slot.appendChild(card);
    });
  }
  renderQuiz();

  if(mod)mod.open=true;
  var params=new URLSearchParams(location.search);if(params.get('high')==='1')setTimeout(function(){setHigh(true);},80);
})();
