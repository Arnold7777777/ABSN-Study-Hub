/* Standalone progressive study games. No dependencies, accounts, requests or analytics. */
(() => {
'use strict';
const DATA=window.MODULE_ARCADE_DATA, LABS=window.MODULE_ARCADE_CHALLENGES;
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const same=(a,b)=>a.length===b.length&&[...a].sort().every((v,i)=>v===[...b].sort()[i]);
const image=(a,alt,cls='')=>`<img class="${cls}" src="../assets/early-module-arcade/images/${esc(a.src)}" width="${a.width}" height="${a.height}" alt="${esc(alt)}" loading="lazy">`;
let mod,progress,storageOK=true,mode='match',matchFilter='all',caseFilter='all',pairCount=4;
let round=[],matched=new Set(),left=null,right=null,roundMiss=new Set(),elapsed=0,timerOn=false;
let caseRound=[],caseIndex=0,casePicked=[],caseChecked=false,caseCorrect=0;
let labIndex=0,labDone=false,labWrong=false,labScore=0,ordered=[],selectedRegions=[];
function readProgress(id){
 let p={pairs:{},cases:{},labs:{}};
 try{const v=JSON.parse(localStorage.getItem('absn-early-arcade-v1:'+id)||'null');if(v&&typeof v==='object'&&!Array.isArray(v))for(const k of ['pairs','cases','labs'])if(v[k]&&typeof v[k]==='object'&&!Array.isArray(v[k]))p[k]=v[k];}
 catch(e){storageOK=false;}return p;
}
function save(){try{localStorage.setItem('absn-early-arcade-v1:'+mod.id,JSON.stringify(progress));}catch(e){storageOK=false;showStorageNote();}}
function showStorageNote(){const e=$('#storage-note');if(e&&!storageOK)e.hidden=false;}
function entry(kind,id){const raw=progress[kind][id];if(!raw||typeof raw!=='object'||!Number.isFinite(raw.seen)||!Number.isFinite(raw.correct))progress[kind][id]={seen:0,correct:0,needsReview:false};return progress[kind][id];}
function practiced(kind,items){return items.filter(p=>entry(kind,p.id).correct>0).length;}
function source(){return `<p class="source-link">📖 <a href="../${esc(mod.path)}">Review this course module</a></p>`;}
function feedback(text,good){const e=$('#feedback');e.className='feedback '+(good===true?'good':good===false?'retry':'');e.innerHTML=text;}
function focusHeading(selector){const e=$(selector);if(e){e.setAttribute('tabindex','-1');e.focus({preventScroll:true});}}
function stopWatch(){timerOn=false;elapsed=0;}
setInterval(()=>{if(timerOn&&mode==='match'&&!document.hidden&&matched.size<round.length){elapsed++;const e=$('#clock');if(e)e.textContent=formatTime(elapsed);}},1000);
function formatTime(s){return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
function sanitizeRationale(raw){const t=document.createElement('template');let value=String(raw);if(!/<[a-z][\s\S]*>/i.test(value)){const sentences=value.split(/(?<=[.!?])\s+(?=[A-Z“\"])/);let chunks=[];for(let i=0;i<sentences.length;i+=2)chunks.push('<p>'+esc(sentences.slice(i,i+2).join(' '))+'</p>');value=chunks.join('');}t.innerHTML=value;const allowed=['B','STRONG','I','EM','UL','OL','LI','P','BR','SUB','SUP'];const walk=n=>{if(n.nodeType===3)return esc(n.textContent);if(n.nodeType!==1)return '';const inner=[...n.childNodes].map(walk).join('');if(['SCRIPT','STYLE','IFRAME'].includes(n.tagName))return '';return allowed.includes(n.tagName)?`<${n.tagName.toLowerCase()}>${inner}</${n.tagName.toLowerCase()}>`:inner;};return [...t.content.childNodes].map(walk).join('');}
function hub(){
 mod=null;stopWatch();document.title='Modules 1–3 Arcade · ABSN Study Hub';
 $('#main').innerHTML=`<section class="hero"><div><p class="eyebrow">Modules 1–3 · Three courses</p><h1>Little rounds.<br>Big connections.</h1><p>Match a clue. Meet a patient. Try a visual challenge. Your copper crew is ready when you are.</p><div class="pills"><span class="pill">216 matching prompts</span><span class="pill">${DATA.modules.reduce((n,m)=>n+m.cases.length,0)} case questions</span><span class="pill">Untimed by default</span></div></div>${image(DATA.images['rustic-coach'],'Rustic copper robot holding a study book')}</section><h2 id="choose-heading">Choose your next study stop</h2><div class="course-filters" aria-label="Filter games by course">${['All courses','NUR 234','NUR 235','NUR 258'].map((v,i)=>`<button data-course="${v}" aria-pressed="${!i}">${v}</button>`).join('')}</div><section id="game-grid" class="game-grid" aria-labelledby="choose-heading"></section>`;
 const totalCases=DATA.modules.reduce((sum,m)=>sum+m.cases.length,0);$('.hero .pills').children[1].textContent=totalCases+' case questions';
 const cards=filter=>{$('#game-grid').innerHTML=DATA.modules.filter(m=>filter==='All courses'||m.course===filter).map(m=>`<article class="game-card"><div class="card-art"><span class="symbol" aria-hidden="true">${m.icon}</span>${image(m.robot,'Copper robot study companion')}</div><div class="card-body"><p class="eyebrow">${m.course} · Module ${m.module}</p><h2>${esc(m.title)}</h2><p>${esc(m.tagline)}</p><p class="counts">24 matches · ${m.cases.length} cases · visual challenge</p><a class="play" href="?module=${m.id}">Play this module →</a></div></article>`).join('');};cards('All courses');
 $$('[data-course]').forEach(b=>b.onclick=()=>{$$('[data-course]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));cards(b.dataset.course);});
}
function modulePage(){
 document.title=mod.title+' · ABSN Study Hub';progress=readProgress(mod.id);
 $('#main').innerHTML=`<div class="toolbar"><label class="module-switch">Jump to a module<select id="module-select">${DATA.modules.map(m=>`<option value="${m.id}" ${m.id===mod.id?'selected':''}>${m.course} · M${m.module} · ${esc(m.topic)}</option>`).join('')}</select></label></div><section class="module-head"><div><p class="eyebrow">${mod.course} · Module ${mod.module}</p><h1>${mod.icon} ${esc(mod.title)}</h1><p class="topic">${esc(mod.topic)}</p><p>${esc(mod.tagline)}</p></div>${image(mod.robot,'Your rustic copper study companion')}</section><p id="storage-note" class="storage-warning" hidden>Browser storage is unavailable. You can play, but progress may not survive closing this page.</p><div class="mode-tabs" aria-label="Choose a game mode"><button data-mode="match" aria-pressed="true">🧩 Match</button><button data-mode="cases" aria-pressed="false">🩺 Case rounds</button><button data-mode="lab" aria-pressed="false">🔎 Visual challenge</button></div><section class="panel" id="game" aria-label="Game board"></section><details class="panel study-picture"><summary>🖼️ Open the module’s illustrated study aid</summary>${image(mod.illustration,mod.illustrationAlt||('Illustrated reference for '+mod.topic))}<p class="source-link"><a href="../assets/early-module-arcade/images/${esc(mod.illustration.src)}" target="_blank" rel="noopener">Open the full-size study picture ↗</a></p><p class="small">${esc(mod.illustrationAlt)}</p>${source()}</details><details class="panel"><summary>📖 How to play & saved progress</summary><p><strong>Match:</strong> Choose a question on the left and its answer on the right, in either order. Use Tab and Enter or Space on a keyboard. No dragging is needed.</p><p><strong>Case rounds:</strong> Five independent questions per round, or fewer if your review list is shorter. Select every correct choice when asked. Check your answer to read the course explanation.</p><p><strong>Visual challenge:</strong> Try the module’s hands-on exercise. You can retry without a countdown.</p><p>Each matching bank contains 24 prompts. New rounds favor items you have practiced least. “Needs practice” collects mistakes; a clean match or correct case answer on a later attempt clears that item.</p><p>Progress belongs to this browser and device. It does not sync to Google Drive. Switching modes starts a fresh round and retains completed items.</p><p class="small">Matching prompts and visual exercises are condensed from the linked module. Selected case questions and answer keys are retained from the module’s source bank. These games are study practice, not clinical decision tools.</p>${source()}${mod.id==='nur258-m4'?'<p><a href="burn-clinic.html">Visit the original Burn Clinic game →</a></p>':''}<button id="reset-progress" class="ghost">Reset this module’s game progress</button></details>`;
 $('#module-select').onchange=e=>{location.search='?module='+encodeURIComponent(e.target.value);};
 $$('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;stopWatch();$$('[data-mode]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(mode==='match')renderMatch();else if(mode==='cases')startCases();else startLab();focusHeading('#game-title');});
 $('#reset-progress').onclick=()=>{if(window.confirm('Reset matching, case and challenge progress for this module only?')){progress={pairs:{},cases:{},labs:{}};save();mode='match';modulePage();}};
 showStorageNote();renderMatch();
}
function chooseItems(kind,items,filter,count){let pool=items.filter(p=>filter==='missed'?entry(kind,p.id).needsReview:filter==='new'?entry(kind,p.id).seen===0:true);return shuffle(pool).sort((a,b)=>entry(kind,a.id).seen-entry(kind,b.id).seen).slice(0,count);}
function renderMatch(){
 if(mod.reflective)timerOn=false;
 round=chooseItems('pairs',mod.pairs,matchFilter,pairCount);matched=new Set();left=null;right=null;roundMiss=new Set();elapsed=0;
 const n=practiced('pairs',mod.pairs);
 $('#game').innerHTML=`<div class="game-intro"><div><h2 id="game-title">Match the connection</h2><p>Tap a question, then its answer. Work through a few at a time.</p></div><span class="stat" id="bank-stat">${n} / 24 matched</span></div><div class="progress-track" aria-hidden="true"><span id="bank-progress" style="width:${n/24*100}%"></span></div><div class="toolbar"><label>Round size<select id="pair-count"><option value="4">4 pairs</option><option value="6">6 pairs</option><option value="8">8 pairs</option></select></label><label>Practice pool<select id="match-filter"><option value="all">All 24 prompts</option><option value="new">Not tried yet</option><option value="missed">Needs practice</option></select></label><label class="check"><input id="timer" type="checkbox" ${timerOn?'checked':''}> Optional stopwatch <span id="clock">0:00</span></label></div><div id="match-board"></div><div id="feedback" class="feedback" role="status" aria-live="polite" aria-atomic="true"></div><div class="actions"><button id="next-round" class="primary" disabled>Next round →</button><span id="round-stat" class="small">0 / ${round.length} pairs this round</span></div>${source()}`;
 $('#pair-count').value=String(pairCount);$('#match-filter').value=matchFilter;
 $('#pair-count').onchange=e=>{pairCount=Number(e.target.value);renderMatch();};$('#match-filter').onchange=e=>{matchFilter=e.target.value;renderMatch();};$('#timer').onchange=e=>{timerOn=e.target.checked;};if(mod.reflective){$('#timer').closest('label').hidden=true;}
 $('#next-round').onclick=()=>{renderMatch();focusHeading('#game-title');};
 if(!round.length){$('#match-board').innerHTML=`<div class="empty-state">${image(DATA.images['rustic-coach'],'')}<h3>${matchFilter==='missed'?'Your review list is clear.':'You have tried every prompt.'}</h3><p>Choose “All 24 prompts” to keep practicing.</p><button id="all-prompts" class="primary">Practice all prompts</button></div>`;$('#all-prompts').onclick=()=>{matchFilter='all';renderMatch();};return;}
 const make=(p,side)=>`<button class="match-card ${side==='right'?'answer':''}" data-side="${side}" data-id="${p.id}" aria-pressed="false">${side==='left'?`<span class="category">${esc(p.category)}</span>`:''}${esc(side==='left'?p.prompt:p.answer)}</button>`;
 $('#match-board').innerHTML=`<div class="matching"><div class="column"><p class="column-title">QUESTIONS</p>${round.map(p=>make(p,'left')).join('')}</div><div class="column"><p class="column-title">ANSWERS</p>${shuffle(round).map(p=>make(p,'right')).join('')}</div></div>`;
 $$('.match-card').forEach(b=>b.onclick=()=>pickPair(b));
}
function pickPair(b){
 const side=b.dataset.side,id=b.dataset.id;
 if(side==='left')left=left===id?null:id;else right=right===id?null:id;
 $$('.match-card').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.side==='left'?x.dataset.id===left:x.dataset.id===right)));
 if(!left||!right)return;
 if(left===right){
  const p=round.find(p=>p.id===left),s=entry('pairs',left);s.seen++;s.correct++;if(!roundMiss.has(left))s.needsReview=false;matched.add(left);
  $$(`.match-card[data-id="${left}"]`).forEach(x=>{x.classList.add('matched');x.disabled=true;x.setAttribute('aria-pressed','false');});
  feedback(`<strong>✓ Connected.</strong> ${esc(p.answer)}${p.sourceModule?`<p class="review-origin">Review connection from ${esc(p.sourceModule.toUpperCase())} · <a href="../${esc(p.sourcePath)}">Original module</a></p>`:""}${roundMiss.has(left)?'<p class="small">Saved for another practice round.</p>':''}`,true);
  $('#round-stat').textContent=`${matched.size} / ${round.length} pairs this round`;
  const n=practiced('pairs',mod.pairs);$('#bank-stat').textContent=`${n} / 24 matched`;$('#bank-progress').style.width=n/24*100+'%';
  if(matched.size===round.length){$('#next-round').disabled=false;feedback(`<strong>✓ Round complete.</strong> ${roundMiss.size?'Your missed connections are saved in “Needs practice.”':'Every connection matched on the first try.'}${timerOn?` <span class="small">Stopwatch: ${formatTime(elapsed)}.</span>`:''}`,true);$('#next-round').focus({preventScroll:true});}
  else {const next=$('.match-card[data-side="left"]:not(:disabled)');if(next)next.focus({preventScroll:true});}
 }else{
  for(const id of [left,right]){const s=entry('pairs',id);s.seen++;s.needsReview=true;roundMiss.add(id);}
  feedback('<strong>Try another connection.</strong> These two do not match. Both concepts are saved for more practice.',false);
 }
 left=right=null;$$('.match-card').forEach(x=>x.setAttribute('aria-pressed','false'));save();
}
function startCases(){caseRound=chooseItems('cases',mod.cases,caseFilter,5);caseIndex=0;caseCorrect=0;renderCase();}
function renderCase(){
 casePicked=[];caseChecked=false;
 if(!caseRound.length){$('#game').innerHTML=`<h2 id="game-title">Your case review list is clear.</h2><p>Try another round from the full bank.</p><button id="all-cases" class="primary">All case questions</button>`;$('#all-cases').onclick=()=>{caseFilter='all';startCases();};return;}
 if(caseIndex>=caseRound.length){
  $('#game').innerHTML=`<div class="empty-state">${image(mod.robot,'')}<p class="eyebrow">Case round complete</p><h2 id="game-title">A little practice adds up.</h2><p class="summary-number">${caseCorrect} / ${caseRound.length}</p><p>Correct on this attempt. Missed questions stay in your review pool.</p><div class="actions"><button id="more-cases" class="primary">Another case round →</button><button id="missed-cases">Practice missed cases</button></div></div>${source()}`;
  $('#more-cases').onclick=()=>{caseFilter='all';startCases();focusHeading('#game-title');};$('#missed-cases').onclick=()=>{caseFilter='missed';startCases();focusHeading('#game-title');};return;
 }
 const q=caseRound[caseIndex],multi=q.type==='sata'||q.ans.length>1;
 $('#game').innerHTML=`<div class="game-intro"><div><h2 id="game-title">Case rounds</h2><p>A new patient or situation each question.</p></div><span class="stat">${practiced('cases',mod.cases)} / ${mod.cases.length} answered correctly</span></div><div class="toolbar"><label>Practice pool<select id="case-filter"><option value="all">All ${mod.cases.length} cases</option><option value="missed">Needs practice</option></select></label></div><div class="score-line"><span>Question ${caseIndex+1} of ${caseRound.length}</span><strong>${multi?'Select all that apply':'Select one answer'}</strong></div><h3 class="case-stem" id="case-question">${esc(q.q)}</h3><div class="options" role="group" aria-labelledby="case-question">${q.opts.map((o,i)=>`<button class="option" data-option="${i}" aria-pressed="false"><span class="letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${esc(o)}<span class="result-tag"></span></span></button>`).join('')}</div><button id="check-case" class="primary" disabled>Check answer</button><div id="feedback" class="feedback" role="status" aria-live="polite" aria-atomic="true"></div><button id="next-case" class="primary" hidden>${caseIndex===caseRound.length-1?'See round results':'Next question →'}</button><p class="source-link">Course source question ${q.sourceNumber} · <a href="../${esc(mod.path)}">Review module</a></p>`;
 $('#case-filter').value=caseFilter;$('#case-filter').onchange=e=>{caseFilter=e.target.value;startCases();};
 $$('.option').forEach(b=>b.onclick=()=>{if(caseChecked)return;const i=Number(b.dataset.option);if(multi)casePicked=casePicked.includes(i)?casePicked.filter(n=>n!==i):[...casePicked,i];else casePicked=[i];$$('.option').forEach(x=>x.setAttribute('aria-pressed',String(casePicked.includes(Number(x.dataset.option)))));$('#check-case').disabled=!casePicked.length;});
 $('#check-case').onclick=()=>{
  if(caseChecked)return;caseChecked=true;const good=same(casePicked,q.ans),s=entry('cases',q.id);s.seen++;s.needsReview=!good;if(good){s.correct++;caseCorrect++;}save();
  $$('.option').forEach(b=>{const i=Number(b.dataset.option),correct=q.ans.includes(i),picked=casePicked.includes(i);b.disabled=true;if(correct)b.classList.add('correct');else if(picked)b.classList.add('incorrect');$('.result-tag',b).textContent=correct?(picked?'✓ Correct · selected':'✓ Correct · not selected'):(picked?'✗ Selected · not correct':'');});
  feedback(`<strong>${good?'✓ Correct.':'Review this connection.'}</strong><div>${sanitizeRationale(q.why)}</div>`,good);$('#check-case').hidden=true;$('#next-case').hidden=false;
 };
 $('#next-case').onclick=()=>{caseIndex++;renderCase();focusHeading('#game-title');};
}
const regions=[['head','Head + neck',9],['armR','Right arm',9],['armL','Left arm',9],['front','Anterior trunk',18],['back','Posterior trunk',18],['legR','Right leg',18],['legL','Left leg',18],['perineum','Perineum',1]];
function traceSVG(kind){
 const paths={early:'M75 65 H170 C210 65 235 120 275 120 S340 65 375 65 H585',late:'M75 65 H240 C280 65 305 120 345 120 S410 65 445 65 H585',variable:'M75 65 H365 L385 125 L405 65 H585',acceleration:'M75 85 H185 C210 85 225 40 250 40 S290 85 320 85 H585'};
 const description={early:'The fetal heart rate dip is centered over the contraction peak.',late:'The fetal heart rate dip is shifted to the right of the contraction peak.',variable:'A sharp V-shaped fetal heart rate dip occurs after the contraction peak.',acceleration:'The fetal heart rate rises above its baseline.'}[kind];
 return `<svg class="trace" viewBox="0 0 640 270" role="img" aria-label="${description}"><text x="20" y="25">Fetal heart rate</text><path class="guide" d="M75 85 H590 M275 35 V240"/><path d="${paths[kind]}" fill="none" stroke="#89ebdc" stroke-width="4"/><text x="20" y="170">Contraction</text><path d="M75 235 H160 C205 235 225 185 275 185 S345 235 385 235 H585" fill="none" stroke="#e4bcff" stroke-width="4"/><text x="220" y="262">Time →</text></svg>`;
}
function bodySVG(){return `<svg viewBox="0 0 420 390" role="img" aria-label="Adult front and back region diagrams; choose labeled region buttons beside the diagram."><text x="67" y="20">FRONT</text><text x="283" y="20">BACK</text>${[0,210].map((x,k)=>`<g transform="translate(${x},25)"><circle data-region="head" class="part" cx="100" cy="35" r="24"/><rect data-region="${k?'back':'front'}" class="part" x="61" y="68" width="78" height="125" rx="20"/><rect data-region="${k?'armL':'armR'}" class="part" x="25" y="76" width="27" height="135" rx="13"/><rect data-region="${k?'armR':'armL'}" class="part" x="148" y="76" width="27" height="135" rx="13"/><rect data-region="${k?'legL':'legR'}" class="part" x="62" y="205" width="33" height="135" rx="15"/><rect data-region="${k?'legR':'legL'}" class="part" x="105" y="205" width="33" height="135" rx="15"/><path data-region="perineum" class="part" d="M84 193 H116 L100 211 Z"/><text x="83" y="133">${k?'Back':'Front'}</text></g>`).join('')}</svg>`;}
function startLab(){labIndex=0;labScore=0;renderLab();}
function renderLab(){
 const lab=LABS[mod.id];labDone=false;labWrong=false;ordered=[];selectedRegions=[];
 if(labIndex>=lab.rounds.length){$('#game').innerHTML=`<div class="empty-state">${image(mod.robot,'')}<p class="eyebrow">Challenge complete</p><h2 id="game-title">You connected the clues.</h2><p class="summary-number">${labScore} / ${lab.rounds.length}</p><p>Correct on the first try. Every exercise is available again.</p><button id="repeat-lab" class="primary">Play the challenge again</button></div>${lab.reference?`<p class="source-link"><a href="${esc(lab.reference)}" target="_blank" rel="noopener">Adult START reference</a></p>`:""}${source()}`;$('#repeat-lab').onclick=()=>{startLab();focusHeading('#game-title');};return;}
 const r=lab.rounds[labIndex],kind=r.kind||lab.kind,categories=r.categories||lab.categories;
 const art=r.diagram?image({src:r.diagram+'.svg',width:360,height:260},r.diagramAlt||('Labeled teaching schematic for '+mod.topic)):'';
 $('#game').innerHTML=`<div class="game-intro"><div><h2 id="game-title">${esc(lab.title)}</h2><p>${esc(lab.intro)}</p></div><span class="stat">${labIndex+1} / ${lab.rounds.length}</span></div><div class="mission-clue">${kind==='glucose'?`<div class="big-number">${esc(r.reading)}</div><p class="small">${esc(r.unit)}</p>`:''}${esc(r.clue)}</div>${art?`<figure class="lab-visual">${art}<figcaption>Simplified teaching diagram · not to scale</figcaption></figure>`:""}<div id="lab-board"></div><div id="feedback" class="feedback" role="status" aria-live="polite" aria-atomic="true"></div><button id="next-lab" class="primary" hidden>${labIndex===lab.rounds.length-1?'See challenge results':'Next challenge →'}</button>${lab.reference?`<p class="source-link"><a href="${esc(lab.reference)}" target="_blank" rel="noopener">Adult START reference</a></p>`:""}${source()}`;
 $('#next-lab').onclick=()=>{labIndex++;renderLab();focusHeading('#game-title');};
 const board=$('#lab-board');
 if(kind==='gtpal'){
  board.innerHTML=`<form id="lab-form"><div class="field-grid">${['G','T','P','A','L'].map(x=>`<label>${x}<input aria-label="${x}" name="${x}" type="number" min="0" max="30" step="1" inputmode="numeric" required></label>`).join('')}</div><div class="actions"><button class="primary">Check history</button></div></form>`;
  $('#lab-form').onsubmit=e=>{e.preventDefault();if(labDone)return;const values=$$('input',board).map(x=>Number(x.value));finishLab(values.every((v,i)=>v===r.answer[i]),r.why);};
 }else if(kind==='numbers'||r.numeric!==undefined){
  board.innerHTML=`${r.formula?`<p class="pill">${esc(r.formula)}</p>`:''}<form id="lab-form"><label for="numeric-answer">Your answer (${esc(r.unit)})</label><div class="actions"><input id="numeric-answer" class="number-answer" type="number" min="0" step="any" inputmode="decimal" required><button class="primary">Check calculation</button></div></form>${r.numeric!==undefined?'<p class="small">Traditional 4 mL Parkland course exercise. Actual fluids are prescribed and adjusted to patient response.</p>':''}`;
  $('#lab-form').onsubmit=e=>{e.preventDefault();if(!labDone)finishLab(Number($('#numeric-answer').value)===(r.numeric??r.answer),r.why);};
 }else if(kind==='order'){
  board.innerHTML=`<p class="small">Your sequence</p><div id="sequence" class="sorted-list" aria-live="polite"></div><div class="tile-row" id="order-tiles">${shuffle(r.items.map((t,i)=>({t,i}))).map(o=>`<button data-order="${o.i}">${esc(o.t)}</button>`).join('')}</div><div class="actions"><button id="undo-order">Undo last choice</button><button id="check-order" class="primary" disabled>Check sequence</button></div>`;
  const update=()=>{$('#sequence').innerHTML=ordered.map((i,n)=>`<span>${n+1}. ${esc(r.items[i])}</span>`).join('');$$('[data-order]').forEach(b=>b.disabled=ordered.includes(Number(b.dataset.order)));$('#undo-order').disabled=!ordered.length;$('#check-order').disabled=ordered.length!==r.items.length;};
  $$('[data-order]').forEach(b=>b.onclick=()=>{ordered.push(Number(b.dataset.order));update();});$('#undo-order').onclick=()=>{ordered.pop();update();};$('#check-order').onclick=()=>{finishLab(ordered.every((v,i)=>v===i),r.why);};update();
 }else if(kind==='burn'){
  board.innerHTML=`<div class="body-lab">${bodySVG()}<div><p class="small">Select whole regions. The patient’s right is on the left of the front view.</p><div class="body-buttons">${regions.map(([id,label,pct])=>`<button data-region-button="${id}" aria-pressed="false">${label}<br><strong>${pct}%</strong></button>`).join('')}</div></div></div><p class="readout" id="tbsa" role="status">Selected total: 0%</p><button id="check-burn" class="primary" disabled>Check selected regions</button>`;
  $$('[data-region-button]').forEach(b=>b.onclick=()=>{const id=b.dataset.regionButton;selectedRegions=selectedRegions.includes(id)?selectedRegions.filter(x=>x!==id):[...selectedRegions,id];$$('[data-region-button]').forEach(x=>x.setAttribute('aria-pressed',String(selectedRegions.includes(x.dataset.regionButton))));$$('[data-region]').forEach(x=>x.classList.toggle('selected',selectedRegions.includes(x.dataset.region)));$('#tbsa').textContent='Selected total: '+regions.filter(v=>selectedRegions.includes(v[0])).reduce((s,v)=>s+v[2],0)+'%';$('#check-burn').disabled=!selectedRegions.length;});
  $('#check-burn').onclick=()=>{const alt=r.allowEitherLeg?r.regions.map(x=>x==='legR'?'legL':x):r.regions;finishLab(same(selectedRegions,r.regions)||same(selectedRegions,alt),r.why);};
 }else{
  board.innerHTML=`${kind==='trace'?traceSVG(r.trace):''}<div class="lab-choices">${categories.map((c,i)=>`<button data-lab-option="${i}">${esc(c)}</button>`).join('')}</div>`;
  $$('[data-lab-option]').forEach(b=>b.onclick=()=>{const good=Number(b.dataset.labOption)===r.answer;finishLab(good,r.why);if(!good){b.setAttribute('aria-pressed','true');b.disabled=true;}});
 }
}
function finishLab(good,why){
 if(labDone)return;
 if(good){labDone=true;if(!labWrong)labScore++;const s=entry('labs','step-'+labIndex);s.seen++;s.correct++;s.needsReview=labWrong;save();feedback('<strong>✓ Connected.</strong> '+esc(why),true);
  $$('button,input',$('#lab-board')).forEach(b=>b.disabled=true);$('#next-lab').hidden=false;$('#next-lab').focus({preventScroll:true});
 }else{labWrong=true;feedback('<strong>Try again.</strong> Check the clue and your selection. You can keep working on this one.',false);}
}
// A bad or absent module query safely returns to the complete arcade.
const requested=new URLSearchParams(location.search).get('module');mod=DATA.modules.find(m=>m.id===requested);if(mod)modulePage();else hub();
})();
