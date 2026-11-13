(function(){
  'use strict';
  const base=new URL('../../',document.currentScript.src);
  const sheet=document.createElement('link');
  sheet.rel='stylesheet';sheet.href=new URL('assets/quiz-study/links.css',base);document.head.appendChild(sheet);
  const plain=document.createElement('textarea');
  function normal(value){
    plain.innerHTML=String(value||'').replace(/<[^>]+>/g,' ');
    return plain.value.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'');
  }
  function hash(s){
    let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);
    return (h>>>0).toString(16);
  }
  function texts(q){
    if(!q)return [];
    return [q.q,q.prompt,q.question,q.stem,q.stemTitle,q.caseTitle,q.why,q.r,q.rationale,q.explanation,q.exp,q.tip].filter(s=>typeof s==='string'&&s);
  }
  function unique(items){
    const seen=new Set();
    return items.filter(item=>{
      const q=item.q&&typeof item.q==='object'?item.q:item;
      const input=q.q||q.prompt||q.question||q.stem||q.caseTitle;
      if(!input)return true;
      const a=hash(normal(input)), reason=q.why||q.r||q.rationale||q.explanation||q.exp||q.tip||'';
      const correct=q.ans??q.correct??q.answer??q.a;
      const choices=q.opts||q.options||q.o||q.c;
      const picked=Array.isArray(choices)&&correct!==undefined?([].concat(correct).map(i=>normal(choices[i])).sort().join(',')):'';
      const full=a+'-'+hash(normal(reason));
      const groups=window.quizStudyGroups||{};
      const key=groups[full]||groups[a]||(full+'-'+picked+'-'+(picked?'':JSON.stringify(correct??q.pairs??q.steps??'')));
      if(seen.has(key))return false;
      seen.add(key);return true;
    });
  }
  let catalog,scheduled=false;
  const active=new WeakMap();
  function use(card,q){if(card){active.set(card,q);schedule();}}
  window.quizStudy={unique,use};
  const prompts='.csq,#case-question,.qtext,.q-text,.qstem,#quiz-question,.question-title,#questionPrompt,#questionText,#caseHeading,#escapeQuestion,.q>h3,.q>h4,.q-stem,.quiz-q';
  function choicesFor(str){
    const k=normal(str);const values=[k];
    values.push(k.replace(/^\d+(?=[a-z])/,'').replace(/selectallthatapply$/,''));
    for(const v of values){
      const hit=catalog.keys[hash(v)];if(hit)return Array.isArray(hit)?hit:[hit];
    }
    return [];
  }
  function build(area,strings,before){
    let candidates=null;
    for(const s of strings){
      const hits=choicesFor(s);if(!hits.length)continue;
      if(candidates===null)candidates=hits;else {const narrowed=candidates.filter(k=>hits.includes(k));if(narrowed.length)candidates=narrowed;}
      if(candidates.length===1)break;
    }
    if(candidates&&candidates.length>1){
      const keys=strings.map(s=>hash(normal(s)));
      for(const a of keys){
        const id=keys.map(b=>catalog.exact[a+'-'+b]).find(id=>candidates.includes(id));
        if(id){candidates=[id];break;}
      }
    }
    if(!candidates||candidates.length!==1)return;
    const id=candidates[0],row=catalog.items[id];if(!row)return;
    let bar=before?before.nextElementSibling:area.querySelector(':scope > .quiz-study-links');
    if(!bar||!bar.classList.contains('quiz-study-links')){
      bar=document.createElement('div');bar.className='quiz-study-links';
      if(before)before.insertAdjacentElement('afterend',bar);else area.appendChild(bar);
    }
    if(bar.dataset.question===id)return;
    bar.dataset.question=id;bar.replaceChildren();
    const make=(href,label)=>{const a=document.createElement('a');a.target='_blank';a.rel='noopener';a.href=href;a.textContent=label;bar.appendChild(a);};
    make(new URL(row[0],base),'Study infographic');
    bar.firstChild.setAttribute('aria-label','Study infographic · '+row[1]);
    if(row[2])make(row[2][0],'Watch · '+row[2][1]);
  }
  function scan(){
    scheduled=false;if(!catalog||!document.body)return;
    const cards=document.querySelectorAll('#card,#qbox,#quiz-card');
    for(const c of cards){
      const q=active.get(c);if(!q)continue;
      const step=c.querySelector('.csq');const rationale=c.querySelector('#csRat.show,.rat.show');
      const promptsOnCard=[...c.querySelectorAll(prompts)];
      const str=[...(step?[step.textContent]:[]),...texts(q),...(rationale?[rationale.textContent]:[])];
      // The link is available before checking and travels with the current question.
      if(!promptsOnCard.length&&!rationale&&!c.querySelector('.opt,.dcunit,.ngn,.btgrid,.gaps,select'))continue;
      const point=rationale||step||promptsOnCard.at(-1);
      if(rationale)c.querySelectorAll('.quiz-study-links').forEach(bar=>{if(bar.previousElementSibling!==rationale)bar.remove();});
      build(c,str,point||null);
    }
    for(const el of document.querySelectorAll(prompts)){
      const c=el.closest('#card,#qbox,#quiz-card');
      if(c&&active.has(c))continue;
      if(el.closest('.quiz-study-links'))continue;
      const parent=el.closest('.q,.qcard,.quizcard,.quiz-card,article,fieldset')||el.parentElement;
      const rat=parent.querySelector('.rationale,.rat,.feedback,#rationaleText');
      build(parent,[el.textContent,...(rat?[rat.textContent]:[])],el);
    }
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(scan);}}
  function start(){
    if(!document.body)return;
    new MutationObserver(changes=>{
      if(changes.some(c=>!c.target.closest?.('.quiz-study-links')&&(!c.addedNodes.length||[...c.addedNodes].some(n=>!n.classList?.contains('quiz-study-links')))))schedule();
    }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
    fetch(new URL('assets/quiz-study/question-links.json',base)).then(r=>{if(!r.ok)throw Error(r.status);return r.json();}).then(d=>{catalog=d;schedule();}).catch(()=>{});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
