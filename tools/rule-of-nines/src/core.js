(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Nines=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const regions=[
    ['head_f','Front of head and neck',4.5,'front','head'],['head_b','Back of head and neck',4.5,'back','head'],
    ['arm_rf','Front of right arm',4.5,'front','arm'],['arm_lf','Front of left arm',4.5,'front','arm'],
    ['arm_rb','Back of right arm',4.5,'back','arm'],['arm_lb','Back of left arm',4.5,'back','arm'],
    ['chest','Chest',9,'front','trunk'],['abdomen','Abdomen',9,'front','trunk'],
    ['upper_back','Upper back',9,'back','trunk'],['lower_back','Lower back, including buttocks',9,'back','trunk'],
    ['leg_rf','Front of right leg',9,'front','leg'],['leg_lf','Front of left leg',9,'front','leg'],
    ['leg_rb','Back of right leg',9,'back','leg'],['leg_lb','Back of left leg',9,'back','leg'],
    ['perineum','Perineum — counted once',1,'front','perineum']
  ].map(([id,name,value,side,group])=>({id,name,value,side,group}));
  const byId=Object.fromEntries(regions.map(r=>[r.id,r]));
  const groups={rightArm:['arm_rf','arm_rb'],leftArm:['arm_lf','arm_lb'],rightLeg:['leg_rf','leg_rb'],leftLeg:['leg_lf','leg_lb'],head:['head_f','head_b'],frontTrunk:['chest','abdomen'],backTrunk:['upper_back','lower_back']};
  const parts=(ids,fraction=1,depth='partial')=>ids.map(id=>({id,fraction,depth}));
  function breakdown(items){return items.map(p=>{if(!byId[p.id]||!Number.isFinite(p.fraction)||p.fraction<=0||p.fraction>1||!['partial','full','superficial'].includes(p.depth))throw Error('Invalid region coverage');return {...p,...byId[p.id],contribution:p.depth==='superficial'?0:byId[p.id].value*p.fraction};});}
  function total(items){if(new Set(items.map(p=>p.id)).size!==items.length)throw Error('A surface may only be counted once');return breakdown(items).reduce((n,p)=>n+p.contribution,0);}
  function selectedTotal(ids){return [...new Set(ids)].reduce((n,id)=>{if(!byId[id])throw Error('Unknown region');return n+byId[id].value;},0);}
  function parseAnswer(raw){let s=String(raw).trim().replace(/\s*%\s*$/,'').replace(',','.');if(!/^\d+(?:\.\d+)?$/.test(s))return null;const n=Number(s);return Number.isFinite(n)&&n>=0&&n<=100?n:null;}
  const cases=[];
  function add(id,level,prompt,ids,tip){const items=typeof ids[0]==='string'?parts(ids):ids;cases.push({id,level,prompt,parts:items,answer:total(items),tip,mapEligible:items.every(p=>p.fraction===1&&p.depth!=='superficial')});}
  regions.forEach(r=>add('single-'+r.id,'basics',`The entire ${r.name.toLowerCase().replace(' — counted once','')} has a partial-thickness burn. What percentage of adult TBSA is burned?`,[r.id],r.group==='arm'?'One surface of an arm is half of the whole arm: 9 ÷ 2 = 4.5%.':r.group==='leg'?'One surface of a leg is half of the whole leg: 18 ÷ 2 = 9%.':r.group==='perineum'?'The perineum is 1% total. It is not counted separately on the front and back.':r.group==='head'?'The whole head and neck is 9%; one surface is 4.5%.':'The chest and abdomen are separate 9% regions. Upper and lower back are also separate 9% regions.'));
  add('whole-right-arm','basics','The entire right arm, front and back, has partial-thickness burns. Calculate adult TBSA.',groups.rightArm,'A whole arm includes both surfaces: 4.5 + 4.5 = 9%.');
  add('whole-left-leg','basics','The entire left leg, front and back, has partial-thickness burns. Calculate adult TBSA.',groups.leftLeg,'A whole leg includes both surfaces: 9 + 9 = 18%.');
  add('whole-head','basics','The entire head and neck, front and back, has partial-thickness burns. Calculate adult TBSA.',groups.head,'Do not confuse one side of the head and neck with the whole region.');
  add('front-trunk','basics','The entire anterior trunk (chest and abdomen) has partial-thickness burns. Calculate adult TBSA.',groups.frontTrunk,'Chest 9% + abdomen 9% = anterior trunk 18%.');
  add('back-trunk','basics','The entire posterior trunk, including buttocks, has partial-thickness burns. Calculate adult TBSA.',groups.backTrunk,'The buttocks are included in the posterior trunk. Do not add them again.');
  add('arm-front-trunk','mixed','Partial-thickness burns cover the entire right arm (front and back) and the entire anterior trunk. Calculate adult TBSA.',[...groups.rightArm,...groups.frontTrunk],'Separate whole limbs from single surfaces before adding.');
  add('both-whole-legs','mixed','Both entire legs, front and back, have partial-thickness burns. Calculate adult TBSA.',[...groups.rightLeg,...groups.leftLeg],'Each whole leg is 18%. Both entire legs are 36%.');
  add('both-front-legs','mixed','Only the entire front of each leg has partial-thickness burns. Calculate adult TBSA.',['leg_rf','leg_lf'],'Two front surfaces are 9 + 9, not 18 + 18.');
  add('head-front-arm','mixed','Partial-thickness burns cover the entire front of the head and neck and the entire front of the right arm. Calculate adult TBSA.',['head_f','arm_rf'],'Two 4.5% surfaces combine to 9%.');
  add('back-front-arm','mixed','Partial-thickness burns cover the entire posterior trunk and the entire front of the left arm. Calculate adult TBSA.',['upper_back','lower_back','arm_lf'],'Use 18% for the posterior trunk and 4.5% for one arm surface.');
  add('leg-whole-head','mixed','Partial-thickness burns cover the entire right leg and the entire head and neck, including front and back of both regions. Calculate adult TBSA.',[...groups.rightLeg,...groups.head],'Whole leg 18% + whole head and neck 9%.');
  add('both-back-arms','mixed','Partial-thickness burns cover the entire back of both arms. Calculate adult TBSA.',['arm_rb','arm_lb'],'Each posterior arm surface is 4.5%.');
  add('chest-back-leg','mixed','Partial-thickness burns cover the entire chest and the entire back of the left leg. Calculate adult TBSA.',['chest','leg_lb'],'Chest alone is 9%; it does not include the abdomen.');
  add('perineum-leg','mixed','Partial-thickness burns cover the perineum and the entire left leg, front and back. Calculate adult TBSA.',['perineum',...groups.leftLeg],'Add the perineum’s 1% once.');
  add('front-trunk-front-legs','mixed','Partial-thickness burns cover the entire anterior trunk and the entire front of both legs. Calculate adult TBSA.',['chest','abdomen','leg_rf','leg_lf'],'Anterior trunk is 18%; each anterior leg is 9%.');
  add('back-head-back-leg','mixed','Partial-thickness burns cover the entire back of the head and neck and the entire back of the right leg. Calculate adult TBSA.',['head_b','leg_rb'],'Keep the head’s 4.5% separate from the leg’s 9%.');
  add('whole-arms-chest','mixed','Partial-thickness burns cover both entire arms (front and back) and the entire chest. Calculate adult TBSA.',[...groups.rightArm,...groups.leftArm,'chest'],'Both whole arms total 18%. Add only the chest’s 9%.');
  add('half-chest','challenge','A partial-thickness burn covers exactly half of the chest. The abdomen is unaffected. Calculate adult TBSA.',parts(['chest'],0.5),'Half of the chest means half of 9%, not half of the entire 18% anterior trunk.');
  add('half-front-leg','challenge','A partial-thickness burn covers exactly half of the front of the right leg. Calculate adult TBSA.',parts(['leg_rf'],0.5),'First choose the surface (front leg = 9%), then multiply by one half.');
  add('half-whole-arm','challenge','Partial-thickness burns cover exactly half of each surface of the right arm: half of the front and half of the back. Calculate adult TBSA.',parts(groups.rightArm,0.5),'Each half-surface contributes 4.5 × 0.5 = 2.25%. Add both halves.');
  add('fraction-plus-arm','challenge','Partial-thickness burns cover half of the front of the right leg and the entire left arm, front and back. Calculate adult TBSA.',[...parts(['leg_rf'],0.5),...parts(groups.leftArm)],'Half of 9% is 4.5%. A whole arm is 9%.');
  add('exclude-superficial','challenge','The entire anterior trunk has partial-thickness burns. The entire right arm has only superficial epidermal redness, with no partial-thickness injury. Calculate the TBSA included in burn-size estimation.',[...parts(groups.frontTrunk),...parts(groups.rightArm,1,'superficial')],'Superficial epidermal burns are excluded. Partial-thickness burns are included.');
  add('include-superficial-partial','challenge','The entire front of the left arm has superficial partial-thickness burns, and the entire back of the right leg has full-thickness burns. Calculate adult TBSA.',[...parts(['arm_lf']),...parts(['leg_rb'],1,'full')],'“Superficial partial-thickness” still counts. Do not confuse it with superficial epidermal injury.');
  add('head-perineum','challenge','Partial-thickness burns cover the entire head and neck, front and back, plus the perineum. Calculate adult TBSA.',[...groups.head,'perineum'],'The perineum is a single 1% region, not 1% on each side.');
  add('mixed-depth-fraction','challenge','Partial-thickness burns cover half of the abdomen. Full-thickness burns cover the entire back of the left leg. The entire chest has only superficial epidermal redness. Calculate included adult TBSA.',[...parts(['abdomen'],0.5),...parts(['leg_lb'],1,'full'),...parts(['chest'],1,'superficial')],'Multiply the abdomen’s 9% by one half, include the 9% leg surface, and exclude superficial epidermal redness.');
  const byCase=Object.fromEntries(cases.map(q=>[q.id,q]));
  function shuffle(a,rng=Math.random){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function round(level,mode='calculate',misses=[],rng=Math.random){const pool=mode==='review'?misses.map(id=>byCase[id]).filter(Boolean):cases.filter(q=>q.level===level&&(mode!=='map'||q.mapEligible));return shuffle(pool,rng).slice(0,6);}
  function remember(misses,id,correct,help){const s=new Set(misses.filter(id=>byCase[id]));if(correct&&!help)s.delete(id);else if(byCase[id])s.add(id);return [...s];}
  function mapMatches(selected,q){const expected=q.parts.map(p=>p.id);return new Set(selected).size===selected.length&&selected.length===expected.length&&selected.every(id=>expected.includes(id));}
  return {regions,byId,groups,cases,byCase,parts,breakdown,total,selectedTotal,parseAnswer,round,remember,mapMatches};
});
