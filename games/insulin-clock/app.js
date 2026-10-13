(() => {
  'use strict';
  const C = window.InsulinQuest;
  const main = document.getElementById('main');
  const key = 'insulin-clock-quest-v1';
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  let saved = {misses:[],rounds:0}, storageOK = true;
  try { const old = JSON.parse(localStorage.getItem(key) || 'null'); if(old) saved={misses:[...new Set(Array.isArray(old.misses)?old.misses.filter(id=>C.questions[id]):[])],rounds:Number.isSafeInteger(old.rounds)&&old.rounds>=0?old.rounds:0}; } catch { storageOK=false; }
  let view='home', family='rapid', session=null, labFamily='nph', labTime='20:00';
  function save() { try { localStorage.setItem(key,JSON.stringify(saved)); } catch { storageOK=false; } badge(); }
  function badge() { document.getElementById('review-count').textContent=saved.misses.length; }
  function focusMain() { main.focus({preventScroll:true}); window.scrollTo({top:0,behavior:'instant'}); }
  function button(label,action,cls='primary',extra='') { return `<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`; }
  function strip() { return `<div class="pattern-strip">${C.families.map(f=>`<div style="--family:var(--${f.id})"><small>${f.short}</small><strong>${f.peakMin?f.peakMin.map(x=>x/60).join('–')+' h':'No peak'}</strong><span>${f.peakMin?'APPROXIMATE PEAK':'NO PRONOUNCED PEAK'}</span></div>`).join('')}</div>`; }
  function nav() { document.querySelectorAll('[data-nav]').forEach(b=>{const active=b.dataset.nav===view;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});badge(); }
  function home() {
    main.innerHTML=`<section class="hero"><div class="hero-copy"><p class="eyebrow">A LITTLE PRACTICE. A CLEARER PATTERN.</p><h1>Make insulin<br><em>timing click.</em></h1><p>Remember when it starts, when it’s strongest, and how long it stays. Then turn peak ranges into real clock times.</p><div class="actions">${button('Learn the pattern →','learn')}${button('Try clock practice','clock','secondary')}</div><p class="stats-line">36 questions · hints when you need them · no countdown</p></div><div class="hero-art"><p class="art-title">YOUR CLOCK, ONE STEP AT A TIME</p>${heroClock()}<div class="example-time"><div><span>NPH given at</span><strong>8:00 PM</strong></div><span class="arrow" aria-hidden="true">→</span><div><span>Peak · 4–12 hours later</span><strong>12:00–8:00 AM</strong><span>next day</span></div></div></div></section>${strip()}<p class="memory-line"><b>Onset starts. Peak is strongest. Duration stays.</b> Learn one pattern, then try one question.</p><p class="end-note">Ranges from your NUR 258 Module 6 insulin table. ${button('See the practice chart','reference','text-button')}</p>`;
  }
  function heroClock() {
    const marks=Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<line x1="${160+99*Math.sin(a)}" y1="${136-99*Math.cos(a)}" x2="${160+106*Math.sin(a)}" y2="${136-106*Math.cos(a)}" stroke="#66768c" stroke-width="2"/>`;}).join('');
    return `<svg viewBox="0 0 320 270" role="img" aria-label="A clock showing eight o’clock"><circle cx="160" cy="136" r="121" fill="#101d33" stroke="#455c74" stroke-width="2"/><circle cx="160" cy="136" r="116" fill="none" stroke="#78e4d1" stroke-width="3" stroke-dasharray="120 610" transform="rotate(-90 160 136)"/>${marks}<g fill="#b9c5d5" text-anchor="middle" font-size="15" font-family="system-ui"><text x="160" y="59">12</text><text x="242" y="142">3</text><text x="160" y="223">6</text><text x="78" y="142">9</text></g><line x1="160" y1="136" x2="160" y2="73" stroke="#78e4d1" stroke-width="5" stroke-linecap="round"/><line x1="160" y1="136" x2="112" y2="164" stroke="#ffd47c" stroke-width="7" stroke-linecap="round"/><circle cx="160" cy="136" r="7" fill="#f5f2e9"/><text x="205" y="193" fill="#ffd47c" text-anchor="middle" font-size="12" font-family="system-ui">PM</text></svg>`;
  }
  function learn() {
    const f=C.byId[family];
    main.innerHTML=`<div class="section-head"><div><p class="eyebrow">01 / LEARN THE PATTERN</p><h2>Three words. Four rhythms.</h2><p>Start with what each word means. Pick an insulin type to connect the three timings.</p></div></div><div class="defs"><div class="def"><strong>Onset = starts</strong><span>Time until it begins working.</span></div><div class="def"><strong>Peak = strongest</strong><span>Time of its strongest effect.</span></div><div class="def"><strong>Duration = stays</strong><span>How long its action lasts.</span></div></div><div class="family-tabs" role="group" aria-label="Choose an insulin type">${C.families.map(x=>`<button data-family="${x.id}" class="${family===x.id?'selected':''}" aria-pressed="${family===x.id}" style="--family:var(--${x.id})">${x.short}</button>`).join('')}</div><section class="family-card" style="--family:var(--${f.id})" aria-live="polite"><p class="eyebrow" style="color:var(--family)">${f.tag}</p><h3>${f.name}</h3><p class="cue">${f.cue}</p><div class="facts">${['onset','peak','duration'].map(field=>`<div class="fact"><span>${field[0].toUpperCase()+field.slice(1)}</span><strong>${f[field]}</strong></div>`).join('')}</div><p class="end-note">${f.id==='long'?'No pronounced peak does not mean no hypoglycemia risk. Exact duration varies by product.':'These times are counted from administration. Do not add onset to the peak range.'}</p></section>${strip()}<div class="actions">${button('Play 8 recall questions →','start-recall')}${button('Practice clock times','clock','secondary')}</div>`;
  }
  function worked(familyId,time) {
    const f=C.byId[familyId], w=C.peakWindow(familyId,time);
    if(!w) return `<div class="note"><b>No pronounced peak to calculate.</b><br>Long-acting has a flatter action profile in this chart. Its roughly 24-hour duration is a different idea.</div>`;
    return `<div class="equations"><div class="equation">START · ${C.clock(time,false)} + ${f.peakMin[0]/60} h<b>${C.clock(w[0])}</b></div><div class="equation">END · ${C.clock(time,false)} + ${f.peakMin[1]/60} h<b>${C.clock(w[1])}</b></div></div>${timeline(time,w,f.id)}<p class="end-note">Count each end of the peak range from the administration time. Midnight begins the next day.</p>`;
  }
  function timeline(time,w,id) {
    const max=w[1]-time, x=v=>50+(v-time)/max*580;
    const midnight=(Math.floor(time/1440)+1)*1440;
    const mid=midnight>time&&midnight<w[1]?`<line x1="${x(midnight)}" y1="26" x2="${x(midnight)}" y2="85" stroke="#ffd47c" stroke-dasharray="4 4"/><text x="${x(midnight)}" y="104" text-anchor="middle" fill="#ffd47c" font-size="13">midnight</text>`:'';
    return `<svg class="timeline" viewBox="0 0 680 118" aria-hidden="true"><line x1="50" y1="56" x2="630" y2="56" stroke="#4c6179" stroke-width="6"/><line x1="${x(w[0])}" y1="56" x2="630" y2="56" stroke="var(--${id})" stroke-width="12" stroke-linecap="round"/>${mid}<circle cx="50" cy="56" r="6" fill="#f5f2e9"/><g fill="#b9c5d5" font-size="14" font-family="system-ui"><text x="50" y="26" text-anchor="middle">Given</text><text x="${(x(w[0])+630)/2}" y="26" text-anchor="middle">Peak window</text><text x="50" y="84" text-anchor="middle">+0 h</text><text x="${x(w[0])}" y="84" text-anchor="middle">+${(w[0]-time)/60} h</text><text x="630" y="84" text-anchor="middle">+${max/60} h</text></g></svg>`;
  }
  function clockIntro() {
    main.innerHTML=`<div class="section-head"><div><p class="eyebrow">02 / CLOCK CHALLENGE</p><h2>Add hours. Keep the day straight.</h2><p>Peak math starts at the time insulin is given. Add the first number, then the second.</p></div></div><div class="clock-intro"><section class="clock-lab"><h3>The two-step trick</h3><p>For NPH, the practice peak is <b>4–12 hours</b> after administration.</p><div class="def"><strong>1. Add 4 hours</strong><span>That gives the beginning of the peak window.</span></div><br><div class="def"><strong>2. Add 12 hours</strong><span>Start at the original time again. That gives the end.</span></div><div class="note"><b>8 PM + 4 h = midnight.</b><br><b>8 PM + 12 h = 8 AM, next day.</b><br>Do not add onset first.</div><div class="actions">${button('Play 6 clock questions →','start-clock')}</div></section><section class="clock-lab"><h3>Try a time</h3><p>Change the type or time and watch both ends of the window move.</p><div class="controls"><label>Insulin type<select id="lab-family">${C.families.map(f=>`<option value="${f.id}" ${f.id===labFamily?'selected':''}>${f.short}</option>`).join('')}</select></label><label>Given at<input id="lab-time" type="time" value="${labTime}" required></label></div><div class="lab-result" id="lab-result" aria-live="polite"></div></section></div>`;
    labUpdate();
  }
  function labUpdate() {
    const el=document.getElementById('lab-result');if(!el)return;
    if(!/^\d{2}:\d{2}$/.test(labTime)){el.innerHTML='<p>Choose a complete time to see the window.</p>';return;}
    const [h,m]=labTime.split(':').map(Number),t=h*60+m;
    if(h>23||m>59){el.innerHTML='<p>Choose a valid time.</p>';return;}
    el.innerHTML=`<h3>${C.byId[labFamily].short} · ${C.clock(t,false)}</h3>${worked(labFamily,t)}`;
  }
  function start(mode) {
    const questions=C.makeRound(mode,saved.misses);
    if(!questions.length){go('review');return;}
    session={mode,questions,index:0,results:[],hinted:false,answered:false,selected:null,shown:false};
    view=mode==='review'?'review':mode;nav();question();focusMain();
  }
  function question() {
    const q=session.questions[session.index],f=C.byId[q.family];
    const answerPart=session.answered?feedback(q):'';
    main.innerHTML=`<div class="round-top"><span>${session.mode==='clock'?'Clock challenge':session.mode==='review'?'Your practice list':'Quick recall'} · Question ${session.index+1} of ${session.questions.length}</span><span>No rush. Think it through.</span></div><div class="progress" role="progressbar" aria-label="Questions completed" aria-valuenow="${session.index+(session.answered?1:0)}" aria-valuemin="0" aria-valuemax="${session.questions.length}"><span style="width:${100*(session.index+(session.answered?1:0))/session.questions.length}%"></span></div><section class="question-card"><p class="eyebrow">${q.kicker}</p>${f?`<span class="chip" style="--family:var(--${f.id})">${f.name}</span>`:''}<h2>${esc(q.prompt)}</h2><div class="choices" role="group" aria-label="Answer choices">${q.options.map((v,i)=>`<button data-choice="${i}" class="choice ${session.answered?(v===q.answer?'correct':i===session.selected?'incorrect':''):''}" ${session.answered?'disabled':''}><span class="letter" aria-hidden="true">${session.answered&&v===q.answer?'✓':String.fromCharCode(65+i)}</span><span>${esc(v)}${session.answered&&v===q.answer?'<small class="choice-state">Correct answer</small>':session.answered&&i===session.selected?'<small class="choice-state">Your answer · try this again</small>':''}</span></button>`).join('')}</div>${!session.answered?`<div class="question-tools">${button(session.hinted?'Hint shown':'Give me a hint','hint','text-button',session.hinted?'disabled':'')}${button('Teach me this one','reveal','text-button')}</div>`:''}${session.hinted?`<div class="hint" role="note"><b>Hint:</b> ${esc(q.hint)}</div>`:''}${answerPart}</section>`;
  }
  function feedback(q) {
    const r=session.results.at(-1),good=r.correct&&!r.help;
    return `<div class="feedback ${good?'':'retry'}" id="feedback" tabindex="-1" role="region" aria-label="Answer explanation"><h3>${good?'You’ve got it.':r.correct?'Correct—with a little support.':'Let’s make this one stick.'}</h3>${!r.correct?`<p class="answer-label">Answer: ${esc(q.answer)}</p>`:''}<p>${esc(q.explanation)}</p>${q.kind==='clock'?`<div class="worked">${worked(q.family,q.dose)}</div>`:''}<div class="next-row"><span>${good?'Recalled without help.':storageOK?'Saved to your practice list.':'Added to this session’s practice list.'}</span>${button(session.index===session.questions.length-1?'See my progress →':'Next question →','next')}</div></div>`;
  }
  function answer(index,shown=false) {
    if(!session||session.answered)return;
    const q=session.questions[session.index],correct=!shown&&q.options[index]===q.answer;
    session.answered=true;session.selected=index;session.shown=shown;
    session.results.push({id:q.id,correct,help:session.hinted||shown});
    saved.misses=C.recordMiss(saved.misses,q.id,correct,session.hinted||shown);save();question();
    document.getElementById('feedback').focus({preventScroll:true});document.getElementById('feedback').scrollIntoView({block:'nearest',behavior:'instant'});
  }
  function next() {
    if(!session||!session.answered)return;
    if(session.index+1===session.questions.length){saved.rounds++;save();summary();focusMain();return;}
    session.index++;session.answered=false;session.hinted=false;session.selected=null;session.shown=false;question();focusMain();
  }
  function summary() {
    const clean=session.results.filter(r=>r.correct&&!r.help).length,help=session.results.filter(r=>r.correct&&r.help).length,total=session.questions.length;
    main.innerHTML=`<section class="summary"><p class="eyebrow">ROUND COMPLETE</p><h2>${clean===total?'That pattern is clicking.':'Every repeat helps it stick.'}</h2><div class="score">${clean}<small> / ${total}</small></div><p>Recalled correctly without help this round.</p><div class="session-recap"><span>${help} correct with a hint</span><span>${total-clean-help} to revisit</span><span>${saved.rounds} round${saved.rounds===1?'':'s'} completed</span></div><p class="note">${saved.misses.length?`${saved.misses.length} question${saved.misses.length===1?' is':'s are'} waiting in your practice list. A correct answer without hints clears that question.`:'Your practice list is clear. Try another round to keep the pattern fresh.'}</p><div class="actions">${button('Play another round','again')}${saved.misses.length?button('Practice missed questions','start-review','secondary'):button('Try clock practice','clock','secondary')}</div><p class="end-note">${storageOK?'Your practice list is saved in this browser.':'Browser storage is unavailable; your list lasts for this session.'}</p></section>`;
  }
  function review() {
    if(!saved.misses.length){main.innerHTML=`<section class="empty"><span class="empty-icon" aria-hidden="true">✧</span><p class="eyebrow">YOUR PRACTICE LIST</p><h2>A fresh start.</h2><p>Questions you miss or answer with help will land here. Answer one correctly without a hint to clear it.</p><div class="actions">${button('Play quick recall','start-recall')}${button('Try clock questions','start-clock','secondary')}</div></section>`;return;}
    main.innerHTML=`<div class="section-head"><div><p class="eyebrow">YOUR PRACTICE LIST</p><h2>A little more practice.</h2><p>These questions need another visit. Correct answers without hints clear them from this list.</p></div>${button('Practice these →','start-review')}</div><p class="subtle">${saved.misses.length} saved · up to 8 per round · ${storageOK?'saved in this browser':'available for this session'}</p><div class="review-list">${saved.misses.map(id=>{const q=C.questions[id];return `<article class="review-item"><div><small>${q.kicker}</small><p>${esc(q.prompt)}</p></div></article>`;}).join('')}</div>`;
  }
  function go(nextView) { view=nextView;session=null;nav();if(view==='home')home();else if(view==='learn')learn();else if(view==='clock')clockIntro();else if(view==='review')review();else start('recall');focusMain(); }
  function reference() { if(session&&!session.answered){session.hinted=true;question();}document.getElementById('reference').showModal(); }
  document.getElementById('reference-body').innerHTML=`<p class="subtle">Use this same chart for every question in the game. Looking during a question counts as using a hint.</p><div class="table-wrap"><table><caption class="sr-only">Approximate insulin onset, peak and duration for this game</caption><thead><tr><th scope="col">Type</th><th scope="col">Onset</th><th scope="col">Peak</th><th scope="col">Duration</th></tr></thead><tbody>${C.families.map(f=>`<tr><th scope="row" style="color:var(--${f.id})">${f.short}</th><td>${f.onset}</td><td>${f.peak}</td><td>${f.duration}</td></tr>`).join('')}</tbody></table></div><div class="note"><b>Clock rule:</b> administration time + peak interval. Do not add onset first.</div><p class="end-note">Ranges from your NUR 258 Module 6 insulin table, the one your exam uses. Product references vary a little. Hypoglycemia can happen outside peak windows and with long-acting insulin.</p>`;
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');
    if(e.target.closest('.brand')){e.preventDefault();go('home');return;}
    if(!b||b.disabled)return;
    if(b.dataset.nav){go(b.dataset.nav);return;}
    if(b.dataset.family){family=b.dataset.family;learn();document.querySelector(`[data-family="${family}"]`).focus();return;}
    if(b.dataset.choice!==undefined){answer(Number(b.dataset.choice));return;}
    if(b.dataset.close){document.getElementById(b.dataset.close).close();return;}
    if(b.id==='reference-open'||b.dataset.action==='reference'){reference();return;}
    if(b.id==='sources-open'){document.getElementById('sources').showModal();return;}
    const a=b.dataset.action;
    if(['home','learn','clock','review'].includes(a))go(a);
    else if(a?.startsWith('start-'))start(a.slice(6));
    else if(a==='hint'&&session&&!session.answered){session.hinted=true;question();main.querySelector('.hint').scrollIntoView({block:'nearest'});main.querySelector('[data-action="reveal"]').focus({preventScroll:true});}
    else if(a==='reveal')answer(null,true);
    else if(a==='next')next();
    else if(a==='again')start(session.mode);
  });
  document.addEventListener('change',e=>{if(e.target.id==='lab-family'){labFamily=e.target.value;labUpdate();}if(e.target.id==='lab-time'){labTime=e.target.value;labUpdate();}});
  nav();home();
})();
