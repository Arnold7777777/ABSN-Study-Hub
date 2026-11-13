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
  const feedbackFiles=new Map();
  function sourceChoices(container){
    return Array.from(container.querySelectorAll('.opt,.option[data-option],label:has(input[type="radio"]),label:has(input[type="checkbox"])')).map(el=>{
      const copy=(el.querySelector('.otxt')||el).cloneNode(true);
      copy.querySelectorAll('.letter,.result-tag,.box,input,.choice-letter').forEach(x=>x.remove());
      return {el,text:copy.textContent.trim().replace(/^[A-H][.)]\s+/i,'')};
    });
  }
  function choiceFeedback(id,area,rationale){
    if(!rationale||!rationale.textContent.trim()||rationale.closest('[hidden]')||!rationale.getClientRects().length)return;
    if(rationale.querySelector('.quiz-choice-review')?.dataset.id===id)return;
    const q=active.get(area);
    if(q && ['bowtie','matching','dropdown','highlight'].includes(q.type)){
      const rows=[];
      if(q.type==='bowtie' && q.answer)for(const [key,list,label] of [['cond',q.cond,'Condition'],['action',q.actions,'Nursing actions'],['param',q.params,'Parameters to monitor']]){
        if(list&&q.answer[key])rows.push([label,list.filter((_,i)=>q.answer[key].includes(i)),list.filter((_,i)=>!q.answer[key].includes(i))]);
      }
      if(q.type==='matching' && q.right)for(const pair of q.pairs||[])rows.push([pair.left,[q.right[pair.answer]],[]]);
      if(q.type==='dropdown')for(const [i,gap] of (q.gaps||[]).entries())rows.push(['Blank '+(i+1),[gap.options[gap.answer]],gap.options.filter((_,n)=>n!==gap.answer)]);
      if(q.type==='highlight'){const cues=(q.tokens||[]).filter(t=>t.text&&t.text.trim().length>6);rows.push(['Cues to highlight',cues.filter(t=>t.pick).map(t=>t.text),cues.filter(t=>!t.pick).map(t=>t.text)]);}
      if(rows.length){const panel=document.createElement('section');panel.className='quiz-choice-review';panel.dataset.id=id;
        for(const [label,right,remaining] of rows){const h=document.createElement('strong');h.className='choice-heading';h.textContent=label;panel.append(h);
          const a=document.createElement('p');a.textContent='Correct: '+right.join(' · ');panel.append(a);if(remaining.length){const b=document.createElement('p');b.textContent='Not selected here: '+remaining.join(' · ');panel.append(b);}}
        rationale.append(panel);return;}
    }
    const key=id[0];
    if(!feedbackFiles.has(key)){
      feedbackFiles.set(key,null);
      fetch(new URL('assets/quiz-study/feedback-'+key+'.json',base)).then(r=>r.ok?r.json():Promise.reject(r.status))
        .then(rows=>{feedbackFiles.set(key,rows);schedule();}).catch(()=>{feedbackFiles.delete(key);});
      return;
    }
    const row=feedbackFiles.get(key)?.[id];
    if(!row)return;
    const shown=sourceChoices(area);
    const order=shown.map(v=>row.choices.findIndex(item=>normal(item)===normal(v.text)));
    if(order.length!==row.choices.length||order.includes(-1)||new Set(order).size!==order.length)return;
    const panel=document.createElement('section');panel.className='quiz-choice-review';panel.dataset.id=id;
    const heading=(parent,text)=>{const el=document.createElement('strong');el.className='choice-heading';el.textContent=text;parent.append(el);};
    const line=(parent,text)=>{const el=document.createElement('p');el.textContent=text;parent.append(el);};
    const correct=new Set(row.answers.map(normal)),wrong=[];
    const letters=order.map((_,i)=>String.fromCharCode(65+i));
    order.forEach((index,i)=>{
      const el=shown[i].el;
      if(el.matches('button')&&!el.querySelector('.letter,.choice-letter')){
        const prefix=document.createElement('span');prefix.className='choice-letter';prefix.textContent=letters[i]+'. ';el.prepend(prefix);
      }
      if(!correct.has(normal(row.choices[index])))wrong.push(i);
    });
    heading(panel,'Correct '+(correct.size===1?'answer':'answers'));
    order.forEach((index,i)=>{if(correct.has(normal(row.choices[index])))line(panel,letters[i]+'. '+row.choices[index]);});
    line(panel,row.why);
    if(wrong.length){
      heading(panel,'Incorrect '+(wrong.length===1?'answer':'answers'));
      const list=document.createElement('ol');list.type='A';
      const shared=[];
      wrong.forEach(i=>{
        const index=order[i],item=document.createElement('li');item.value=i+1;
        const title=document.createElement('b');title.textContent=row.choices[index];item.append(title);
        if(row.options[index])line(item,row.options[index]);else shared.push(letters[i]);
        list.append(item);
      });
      panel.append(list);
      if(shared.length){
        const note=document.createElement('div');note.className='choice-shared';
        heading(note,'Reasoning for '+shared.join(', '));line(note,'The course explains these choices together in the clinical rationale above.');panel.append(note);
      }
    }
    const verdict=rationale.querySelector(':scope > b,:scope > strong');
    const mark=verdict&&/^[✓✗✕✘]|^correct[.!]|^not quite/i.test(verdict.textContent.trim())?verdict.cloneNode(true):null;
    const controls=[...rationale.children].filter(el=>el.matches('a,button,img,picture')||el.querySelector('a,button,img,picture'));rationale.replaceChildren();if(mark)rationale.append(mark);for(const el of controls)if(el!==verdict)rationale.append(el);
    rationale.append(panel);
  }

  function build(area,strings,before,rationale=null){
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
    choiceFeedback(id,area,rationale);
    let bar=before?before.nextElementSibling:area.querySelector(':scope > .quiz-study-links');
    if(!bar||!bar.classList.contains('quiz-study-links')){
      bar=document.createElement('div');bar.className='quiz-study-links';
      if(before)before.insertAdjacentElement('afterend',bar);else area.appendChild(bar);
    }
    if(bar.dataset.question===id)return;
    bar.dataset.question=id;bar.replaceChildren();
    const make=(href,label)=>{const a=document.createElement('a');a.target='_blank';a.rel='noopener';a.href=href;a.textContent=label;bar.appendChild(a);};
    make(new URL(row[0],base),'Open illustrated review');
    bar.firstChild.setAttribute('aria-label','Open illustrated review · '+row[1]);
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
      build(c,str,point||null,rationale);
    }
    for(const el of document.querySelectorAll(prompts)){
      const c=el.closest('#card,#qbox,#quiz-card');
      if(c&&active.has(c))continue;
      if(el.closest('.quiz-study-links'))continue;
      const parent=el.closest('.q,.qcard,.quizcard,.quiz-card,article,fieldset')||el.parentElement;
      const rat=parent.querySelector('.rationale,.rat,.feedback,#rationaleText');
      build(parent,[el.textContent,...(rat?[rat.textContent]:[])],el,rat);
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
