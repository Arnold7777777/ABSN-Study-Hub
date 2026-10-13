(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.InsulinQuest=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const families=[
    {id:'rapid',name:'Rapid-acting',short:'Rapid',tag:'The early peak',cue:'Rapid rushes in.',onset:'About 15 minutes',peak:'About 1–2 hours',duration:'About 3–4 hours',onsetMin:[15,15],peakMin:[60,120],durationMin:[180,240]},
    {id:'regular',name:'Regular / short-acting',short:'Regular',tag:'The next peak',cue:'Regular follows rapid.',onset:'About 30–60 minutes',peak:'About 2–4 hours',duration:'About 5–8 hours',onsetMin:[30,60],peakMin:[120,240],durationMin:[300,480]},
    {id:'nph',name:'NPH / intermediate-acting',short:'NPH',tag:'The later, broad peak',cue:'NPH: a later, wider window.',onset:'About 1–2 hours',peak:'About 4–12 hours',duration:'About 12–18 hours',onsetMin:[60,120],peakMin:[240,720],durationMin:[720,1080]},
    {id:'long',name:'Long-acting',short:'Long',tag:'No pronounced peak',cue:'Long stays level.',onset:'About 1–2 hours',peak:'No pronounced peak',duration:'About 24 hours',onsetMin:[60,120],peakMin:null,durationMin:[1440,1440]}
  ];
  const byId=Object.fromEntries(families.map(f=>[f.id,f]));
  function clock(min,withDay=true){if(!Number.isFinite(min)||min<0)throw new Error('Time must be nonnegative minutes.');const day=Math.floor(min/1440),m=min%1440,h=Math.floor(m/60),n=m%60;return `${h%12||12}:${String(n).padStart(2,'0')} ${h<12?'AM':'PM'}${withDay?(day===0?' · same day':day===1?' · next day':` · day +${day}`):''}`;}
  function range(start,end){return clock(start)+' → '+clock(end);}
  function hours(min){return min/60;}
  function peakWindow(familyId,dose){const f=byId[familyId];if(!f||!Number.isFinite(dose)||dose<0||dose>=1440)throw new Error('Invalid practice time.');return f.peakMin?f.peakMin.map(x=>dose+x):null;}
  function shuffle(items,rng=Math.random){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  const facts=[];
  const EXTRA={onset:['About 2–4 hours','About 4–6 hours'],peak:['About 6–8 hours'],duration:['About 36 hours']};
  const labels={onset:'start working',peak:'have its strongest effect',duration:'keep working'};
  families.forEach(f=>['onset','peak','duration'].forEach(field=>{
    const pool=[...new Set(families.map(x=>x[field]))];for(const extra of (EXTRA[field]||[]))if(pool.length<4&&!pool.includes(extra))pool.push(extra);
    facts.push({id:`${f.id}-${field}`,kind:'recall',family:f.id,field,kicker:field.toUpperCase(),prompt:`In this practice chart, ${field==='duration'?'how long':'when'} does ${f.short==='Long'?'long-acting insulin':f.name.toLowerCase().replace('nph','NPH')+' insulin'} ${labels[field]}?`,answer:f[field],options:pool,hint:`Onset = starts. Peak = strongest. Duration = stays. ${f.cue}`,explanation:field==='peak'&&f.id==='long'?'Long-acting insulin has no pronounced peak in this chart. It can still cause hypoglycemia.':`${f.name}: ${field} is ${f[field].toLowerCase()}. ${f.cue}`});
  }));
  facts.push(
    {id:'meaning-onset',kind:'recall',kicker:'WORD MATCH',prompt:'Which word means when insulin begins to work?',answer:'Onset',options:['Onset','Peak','Duration','Dose time'],hint:'Think: starts.',explanation:'Onset is the delay from administration until insulin begins to work.'},
    {id:'meaning-peak',kind:'recall',kicker:'WORD MATCH',prompt:'Which word means the time of strongest insulin effect?',answer:'Peak',options:['Peak','Onset','Duration','Dose time'],hint:'Think: strongest.',explanation:'Peak describes the strongest effect. It is not the first moment insulin starts working.'},
    {id:'meaning-duration',kind:'recall',kicker:'WORD MATCH',prompt:'Which word means the total time insulin continues to work?',answer:'Duration',options:['Duration','Onset','Peak','Dose time'],hint:'Think: stays.',explanation:'Duration is how long insulin remains active. Count it from administration; do not add onset first.'},
    {id:'peak-ladder',kind:'recall',kicker:'THE PEAK PATTERN',prompt:'Which sequence matches rapid → regular → NPH peaks in this chart?',answer:'1–2 h → 2–4 h → 4–12 h',options:['1–2 h → 2–4 h → 4–12 h','2–4 h → 1–2 h → 4–12 h','4–12 h → 2–4 h → 1–2 h','15 min → 30–60 min → 1–2 h'],hint:'Rapid first, regular next, NPH later and wider.',explanation:'The peak ladder is 1–2, then 2–4, then 4–12 hours. The minutes in the last option describe onset instead.'},
    {id:'risk-anytime',kind:'recall',kicker:'KEEP THE IDEA STRAIGHT',prompt:'Does “no pronounced peak” mean no risk of low blood glucose?',answer:'No. Hypoglycemia can still occur.',options:['No. Hypoglycemia can still occur.','Yes. Low glucose is impossible.','Only the first 15 minutes matter.','Only NPH can cause low glucose.'],hint:'A flatter action profile is still active insulin.',explanation:'Low blood glucose can occur outside a peak window and with long-acting insulin. A practice clock does not define a safe monitoring window.'},
    {id:'count-from-dose',kind:'recall',kicker:'CLOCK RULE',prompt:'Where do you start counting the hours to a peak?',answer:'From the administration time',options:['From the administration time','From the end of onset','From the previous meal','From the end of duration'],hint:'The dose time is your zero on the timeline.',explanation:'Add the peak interval directly to the administration time. Do not add onset and then add peak again.'},
    {id:'which-nph',kind:'recall',family:'nph',kicker:'NAME THAT PATTERN',prompt:'Which type has the broad 4–12-hour peak in this practice chart?',answer:'NPH / intermediate-acting',options:families.map(f=>f.name),hint:'Its peak is later and much wider than rapid or regular.',explanation:'NPH is intermediate-acting. Its broad peak may extend into overnight hours after an evening dose.'},
    {id:'which-long',kind:'recall',family:'long',kicker:'NAME THAT PATTERN',prompt:'Which type has no pronounced peak in this four-type chart?',answer:'Long-acting',options:families.map(f=>f.name),hint:'Think of a flatter background effect.',explanation:'Long-acting insulin has no pronounced peak here. The exact onset and duration depend on the product.'}
  );
  function clockQuestion(familyId,dose,id){
    const f=byId[familyId],w=peakWindow(familyId,dose);
    if(!w)return {id,kind:'clock',family:familyId,dose,kicker:'PEAK CLOCK',prompt:`Long-acting insulin is given at ${clock(dose,false)}. Which peak window fits this chart?`,answer:'No pronounced peak to calculate',options:['No pronounced peak to calculate',range(dose+60,dose+120),range(dose+120,dose+180),range(dose+240,dose+720)],hint:'Check whether this type has a peak before doing arithmetic.',explanation:'Long-acting has no pronounced peak in this practice chart, so there is no single peak window to calculate. Its duration is a different concept.'};
    const answer=range(...w),candidates=[range(w[0]+60,w[1]+60),range(w[0]+720,w[1]+720),range(dose,dose+f.peakMin[1]),range(w[0]+120,w[1]+120)];
    const options=[answer,...[...new Set(candidates)].filter(x=>x!==answer).slice(0,3)];
    return {id,kind:'clock',family:familyId,dose,kicker:'PEAK CLOCK',prompt:`${f.short} insulin is given at ${clock(dose,false)}. What is the expected peak window using this chart?`,answer,options,hint:`${f.short} peaks ${hours(f.peakMin[0])}–${hours(f.peakMin[1])} hours after administration. Add each number separately to ${clock(dose,false)}.`,explanation:`Start: ${clock(dose,false)} + ${hours(f.peakMin[0])} h = ${clock(w[0])}. End: ${clock(dose,false)} + ${hours(f.peakMin[1])} h = ${clock(w[1])}. Count forward from the dose time, not from onset.`};
  }
  const clockCases=[['rapid',450],['regular',480],['nph',480],['nph',1200],['rapid',1410],['regular',1350],['nph',840],['regular',660],['rapid',720],['nph',90],['regular',30],['rapid',1080],['long',1260],['regular',1170],['nph',1110],['rapid',690]];
  const clocks=clockCases.map((x,i)=>clockQuestion(x[0],x[1],`clock-${i+1}`));
  const bank=[...facts,...clocks],questions=Object.fromEntries(bank.map(q=>[q.id,q]));
  function makeRound(mode,misses=[],rng=Math.random){let list;if(mode==='review')list=misses.map(id=>questions[id]).filter(Boolean);else list=bank.filter(q=>q.kind===mode);return shuffle(list,rng).slice(0,mode==='clock'?6:8).map(q=>({...q,options:shuffle(q.options,rng)}));}
  function recordMiss(misses,id,correct,hinted){const set=new Set(misses.filter(x=>questions[x]));if(correct&&!hinted)set.delete(id);else set.add(id);return [...set];}
  return {families,byId,bank,questions,clock,range,peakWindow,shuffle,makeRound,recordMiss,clockQuestion};
});
