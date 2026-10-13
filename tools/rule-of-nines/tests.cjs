const assert=require('node:assert/strict'),C=require('./src/core.js');
assert.equal(C.regions.length,15);assert.equal(C.selectedTotal(C.regions.map(r=>r.id)),100);
for(const [id,n] of Object.entries({rightArm:9,leftArm:9,rightLeg:18,leftLeg:18,head:9,frontTrunk:18,backTrunk:18}))assert.equal(C.selectedTotal(C.groups[id]),n,id);
assert.equal(C.cases.length,40);assert.equal(new Set(C.cases.map(q=>q.id)).size,40);
for(const q of C.cases){assert.equal(C.total(q.parts),q.answer,q.id);assert(q.answer>0&&q.answer<=100);if(q.mapEligible)assert.equal(C.selectedTotal(q.parts.map(p=>p.id)),q.answer);}
const expected={'arm-front-trunk':27,'both-whole-legs':36,'both-front-legs':18,'head-front-arm':9,'back-front-arm':22.5,'leg-whole-head':27,'both-back-arms':9,'chest-back-leg':18,'perineum-leg':19,'front-trunk-front-legs':36,'back-head-back-leg':13.5,'whole-arms-chest':27,'half-chest':4.5,'half-front-leg':4.5,'half-whole-arm':4.5,'fraction-plus-arm':13.5,'exclude-superficial':18,'include-superficial-partial':13.5,'head-perineum':10,'mixed-depth-fraction':13.5};
for(const [id,n] of Object.entries(expected))assert.equal(C.byCase[id].answer,n,id);
assert.throws(()=>C.total([...C.parts(['chest']),...C.parts(['chest'])]));
assert.equal(C.selectedTotal(['chest','chest']),9);
for(const [input,n] of [['22.5',22.5],['22.5%',22.5],['22,5',22.5],[' 9 % ',9],['0',0],['100',100]])assert.equal(C.parseAnswer(input),n);
for(const input of ['',' ','abc','1e1','Infinity','-1','101','9 + 9','22..5','%'])assert.equal(C.parseAnswer(input),null,input);
assert.equal(C.round('basics').length,6);assert.equal(C.round('mixed','map').length,6);assert.equal(C.round('challenge','map').every(q=>q.mapEligible),true);
assert.equal(C.mapMatches(['arm_rf','arm_rb'],C.byCase['whole-right-arm']),true);assert.equal(C.mapMatches(['head_f','head_b'],C.byCase['whole-right-arm']),false);
assert.equal(C.mapMatches(['arm_rf','arm_rf'],C.byCase['whole-right-arm']),false);
assert.deepEqual(C.remember(['whole-right-arm'],'whole-right-arm',true,false),[]);assert.deepEqual(C.remember(['whole-right-arm'],'whole-right-arm',true,true),['whole-right-arm']);
assert.deepEqual(C.remember([],'whole-right-arm',false,false),['whole-right-arm']);
console.log('PASS: 40 cases, 100% whole-body sum, 20 independent calculation answers, fraction/depth handling, input validation, map identity and review rules.');
