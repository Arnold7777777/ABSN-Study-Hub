(() => {
  'use strict';
  const data = JSON.parse(document.getElementById('learning-data').textContent);
  const root = document.getElementById('learning-app');
  const byId = new Map(data.questions.map(q => [q.id, q]));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let answers = {}, group = null, queue = [], cursor = 0, sessionOnly = false;
  try {
    const saved = JSON.parse(localStorage.getItem(data.storageKey) || '{}');
    if (saved.version === data.version && saved.answers && typeof saved.answers === 'object') {
      for (const [id, value] of Object.entries(saved.answers)) {
        if (byId.has(id) && Number.isInteger(value) && value >= 0 && value < byId.get(id).options.length) answers[id] = value;
      }
    }
  } catch { sessionOnly = true; }
  function save() {
    try { localStorage.setItem(data.storageKey, JSON.stringify({version:data.version,answers})); }
    catch { sessionOnly = true; }
  }
  const has = id => Object.prototype.hasOwnProperty.call(answers,id);
  const correct = id => has(id) && answers[id] === byId.get(id).correct;
  const done = ids => ids.filter(has).length;
  const score = ids => ids.filter(correct).length;
  const status = () => `<p class="save-note">${sessionOnly ? 'Progress is kept for this session; browser storage is unavailable.' : 'Progress saves in this browser. No account or patient information is used.'}</p>`;
  function focusTitle() { const el=root.querySelector('[data-focus]'); if(el)el.focus({preventScroll:true}); root.scrollIntoView({block:'start',behavior:'instant'}); }
  function home(focus=true) {
    group=null; queue=[];
    root.innerHTML=`<div class="app-heading"><div><p class="eyebrow">${data.type==='game'?'Clinic board':'Practice options'}</p><h2 tabindex="-1" data-focus>${data.type==='game'?'Choose a patient':'Choose your practice set'}</h2></div><span class="status-chip">${done(data.questions.map(q=>q.id))} / ${data.questions.length} completed</span></div>
      <div class="case-grid">${data.groups.map((g,i)=>`<button class="case-card" data-group="${esc(g.id)}"><span class="case-number">${String(i+1).padStart(2,'0')}</span><strong>${esc(g.title)}</strong><span>${esc(g.subtitle)}</span><span class="case-progress">${done(g.items)} / ${g.items.length} ${data.type==='game'?'decisions':'questions'} reviewed</span>${done(g.items)===g.items.length?`<span class="badge">${g.badge?esc(g.badge)+' · ':''}Completed · ${score(g.items)}/${g.items.length} correct</span>`:''}</button>`).join('')}</div>
      ${status()}<button class="quiet" data-reset>Reset saved progress</button>`;
    root.querySelectorAll('[data-group]').forEach(b=>b.addEventListener('click',()=>start(b.dataset.group)));
    root.querySelector('[data-reset]').addEventListener('click',()=>{if(confirm('Reset only the saved progress for this activity?')){answers={};save();home();}});
    if(focus)focusTitle();
  }
  function start(id,custom=null) {
    group=data.groups.find(g=>g.id===id); if(!group)return;
    queue=custom || [...group.items];
    const unfinished=queue.findIndex(id=>!has(id));
    cursor=unfinished<0?0:unfinished; render();
  }
  function sources(q) {
    return `<details class="sources"><summary>Sources and context</summary><ul>${q.sources.map(k=>data.sources[k]).filter(Boolean).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a></li>`).join('')}</ul></details>`;
  }
  function feedback(q) {
    const right=correct(q.id);
    return `<div class="feedback ${right?'is-correct':'is-review'}" tabindex="-1" id="feedback" role="status"><h3>${right?'Correct':'Review this decision'}</h3>${!right?`<p><strong>Best answer:</strong> ${esc(q.options[q.correct])}</p>`:''}<p>${esc(q.explanation)}</p></div>${sources(q)}`;
  }
  function render() {
    const q=byId.get(queue[cursor]), answered=has(q.id);
    root.innerHTML=`<div class="app-heading"><button class="quiet" data-home>${data.type==='game'?'← Clinic board':'← Practice sets'}</button><span class="status-chip">${cursor+1} / ${queue.length}</span></div>
      <div class="progress-track" role="progressbar" aria-label="${data.type==='game'?'Decisions':'Questions'} reviewed" aria-valuemin="0" aria-valuemax="${queue.length}" aria-valuenow="${done(queue)}"><span style="width:${done(queue)/queue.length*100}%"></span></div>
      <p class="eyebrow">${esc(group.title)} · ${esc(q.topic)}</p>${q.context?`<aside class="patient-note"><strong>Patient chart</strong><p>${esc(q.context)}</p></aside>`:''}
      <h2 class="question-title" tabindex="-1" data-focus>${esc(q.prompt)}</h2>
      <form id="answer-form"><fieldset ${answered?'disabled':''}><legend class="sr-only">Choose one answer</legend><div class="choices">${q.options.map((o,i)=>`<label class="choice ${answered&&i===q.correct?'choice-correct':''} ${answered&&i===answers[q.id]&&i!==q.correct?'choice-review':''}"><input type="radio" name="answer" value="${i}" ${answered&&answers[q.id]===i?'checked':''}><span><b class="choice-letter">${String.fromCharCode(65+i)}</b>${esc(o)}${answered&&i===q.correct?'<small>Best answer</small>':''}${answered&&answers[q.id]===i&&i!==q.correct?'<small>Your answer</small>':''}</span></label>`).join('')}</div></fieldset>
      ${answered?'':`<button class="primary" type="submit" id="check-answer" disabled>${data.type==='game'?'Make this decision':'Check answer'}</button>`}</form>
      ${answered?feedback(q):'<p class="instruction">Select one answer. The explanation appears after you check it.</p>'}
      <div class="question-actions"><button class="quiet" data-back ${cursor===0?'disabled':''}>Previous</button>${answered?`<button class="primary" data-next>${cursor===queue.length-1?'See results':'Continue →'}</button>`:''}</div>${status()}`;
    root.querySelector('[data-home]').addEventListener('click',()=>home());
    root.querySelector('[data-back]').addEventListener('click',()=>{cursor--;render();});
    root.querySelector('[data-next]')?.addEventListener('click',()=>{if(cursor<queue.length-1){cursor++;render();}else results();});
    const form=root.querySelector('form');
    if(!answered){
      form.addEventListener('change',()=>root.querySelector('#check-answer').disabled=false);
      form.addEventListener('submit',e=>{e.preventDefault();const choice=new FormData(form).get('answer');if(choice===null||has(q.id))return;answers[q.id]=Number(choice);save();render();root.querySelector('#feedback').focus({preventScroll:false});});
    }
    focusTitle();
  }
  function results() {
    const missed=queue.filter(id=>!correct(id));
    root.innerHTML=`<p class="eyebrow">${esc(group.title)} · Complete</p><h2 tabindex="-1" data-focus>${score(queue)} of ${queue.length} correct</h2><p>${data.type==='game'?'You completed this patient’s learning pathway.':'You reviewed this practice set.'} ${missed.length?'Use the review below, then retry the decisions you missed.':'Every answer in this round is correct.'}</p>
      ${group.badge?`<div class="earned-badge">${esc(group.badge)}<span>Learning pathway completed</span></div>`:''}
      <div class="question-actions">${missed.length?'<button class="primary" data-retry>Retry missed</button>':''}<button class="quiet" data-replay>Start this set again</button><button class="quiet" data-home>${data.type==='game'?'Clinic board':'Practice sets'}</button></div>
      <h3>Review your decisions</h3><ol class="review-list">${queue.map(id=>{const q=byId.get(id);return `<li><details><summary>${correct(id)?'Correct':'Review'} · ${esc(q.topic)}</summary><p>${esc(q.prompt)}</p><p><strong>Your answer:</strong> ${esc(q.options[answers[id]]||'Not answered')}</p><p><strong>Best answer:</strong> ${esc(q.options[q.correct])}</p><p>${esc(q.explanation)}</p></details></li>`;}).join('')}</ol>${status()}`;
    root.querySelector('[data-home]').addEventListener('click',()=>home());
    root.querySelector('[data-retry]')?.addEventListener('click',()=>{missed.forEach(id=>delete answers[id]);save();start(group.id,missed);});
    root.querySelector('[data-replay]').addEventListener('click',()=>{const ids=[...group.items],id=group.id;ids.forEach(id=>delete answers[id]);save();start(id);});
    focusTitle();
  }
  home(false);
})();
