// New exercises use the same concepts as the linked course modules.
window.MODULE_ARCADE_CHALLENGES = {
 'nur234-m4': {kind:'gtpal',title:'Build the prenatal history',intro:'Enter one number in each box. Count pregnancies separately from living children.',rounds:[
 {clue:'Currently pregnant. One child born at 39 weeks, one at 34 weeks, and one loss at 10 weeks. Both children are living.',answer:[4,1,1,1,2],why:'The current pregnancy adds to G. The two births add one T and one P. The early loss adds one A. There are two living children.'},
 {clue:'Currently pregnant for the second time. The first pregnancy produced twins at 38 weeks. Both twins are living.',answer:[2,1,0,0,2],why:'Twins count as one pregnancy and one term delivery, but two living children.'},
 {clue:'Currently pregnant. Previous pregnancies: one birth at 32 weeks and two losses at 8 and 12 weeks. The child is living.',answer:[4,0,1,2,1],why:'Four pregnancies includes the current pregnancy. There is one preterm delivery, two early losses and one living child.'}]},
 'nur234-m5':{kind:'sort',title:'Build a safer grocery basket',intro:'Choose what to do with each item. Use the preparation clue as well as the food name.',categories:['Ready for the basket','Heat before eating','Leave this one out'],rounds:[
 {clue:'🥣 Pasteurized yogurt',answer:0,why:'Pasteurized dairy is a safer choice than unpasteurized dairy.'},
 {clue:'🥪 Cold deli turkey straight from the package',answer:1,why:'The course teaches heating deli meats until steaming hot.'},
 {clue:'🐟 Swordfish',answer:2,why:'Swordfish is a high-mercury fish named in this module.'},
 {clue:'🥦 Washed vegetables, cooked until tender',answer:0,why:'A prepared vegetable is a useful part of a balanced diet.'},
 {clue:'🧀 Soft cheese labeled “unpasteurized”',answer:2,why:'Unpasteurized foods increase foodborne infection risk.'},
 {clue:'🌱 Raw sprouts',answer:2,why:'The course includes raw sprouts among foods to avoid.'},
 {clue:'🥪 Deli meat heated until steaming hot',answer:0,why:'The preparation changes this food choice.'}]},
 'nur234-m6':{kind:'order',title:'Put the birth shift in order',intro:'Tap the events in order. You can undo a choice before checking.',rounds:[
 {clue:'Arrange the four stages of labor.',items:['Labor onset to complete dilation','Complete dilation to birth of the baby','Birth of the baby to delivery of placenta','Immediate postpartum recovery'],why:'Stage 1 dilates; stage 2 delivers the baby; stage 3 delivers the placenta; stage 4 is recovery.'},
 {clue:'Arrange the cardinal movements as taught in this course.',items:['Engagement','Descent','Flexion','Internal rotation','Extension','External rotation','Expulsion'],why:'Use the course sequence to follow the passenger through the passage. Descent also continues across several movements.'}]},
 'nur234-m7':{kind:'trace',title:'Read the rhythm',intro:'Compare the top heartbeat line with the lower contraction curve. These are simplified teaching sketches, not diagnostic monitor strips.',categories:['Early → head compression','Late → placental insufficiency','Variable → cord compression','Acceleration → reassuring rise'],rounds:[
 {clue:'The gradual dip mirrors the contraction.',trace:'early',answer:0,why:'The fall, nadir and recovery follow the contraction. The classic association is head compression.'},
 {clue:'The gradual dip reaches its lowest point after the contraction peaks.',trace:'late',answer:1,why:'The lag is the clue. The classic association is uteroplacental insufficiency.'},
 {clue:'The dip is abrupt and its timing differs from the contraction.',trace:'variable',answer:2,why:'An abrupt variable deceleration is associated with cord compression.'},
 {clue:'The heart rate rises above the baseline.',trace:'acceleration',answer:3,why:'An acceleration is generally a reassuring feature; assessment still includes the whole tracing.'}]},
 'nur235-m4':{kind:'sort',title:'Match the developmental approach',intro:'Choose the stage that best fits each teaching strategy or developmental task.',categories:['School age','Adolescence'],rounds:[
 {clue:'💬 “Let me show you the dressing supplies. You can choose which hand holds the tape.”',answer:0,why:'Concrete demonstration and limited choices support a school-age child.'},
 {clue:'💬 “Let’s talk privately about your concerns, then decide what you want help explaining to your family.”',answer:1,why:'Privacy and participation are important in adolescent care.'},
 {clue:'🧩 Build a daily task chart and celebrate mastering a new skill.',answer:0,why:'Mastery supports industry rather than inferiority.'},
 {clue:'🔭 Discuss hypothetical outcomes and ask the learner to reason through alternatives.',answer:1,why:'Formal operational thinking supports abstract and hypothetical reasoning.'},
 {clue:'📚 Explain a procedure using specific, visible examples.',answer:0,why:'Concrete operational thinking works well with tangible examples.'},
 {clue:'🧭 Explore personal values, roles and future goals.',answer:1,why:'Identity formation is an adolescent developmental task.'}]},
 'nur235-m5':{kind:'sort',title:'Follow the blood-cell clue',intro:'Select the condition most directly described by the clue.',categories:['Iron deficiency','Sickle cell disease','Hemophilia A','ITP','Leukemia'],rounds:[
 {clue:'🔬 Small, pale red blood cells; teaching includes oral iron and vitamin C.',answer:0,why:'Microcytic, hypochromic cells fit iron deficiency.'},
 {clue:'🩸 Hemoglobin disorder with painful vaso-occlusive episodes.',answer:1,why:'Sickling can obstruct small vessels and produce severe pain.'},
 {clue:'🧬 Factor VIII deficiency with bleeding into joints.',answer:2,why:'Hemophilia A is a factor VIII deficiency.'},
 {clue:'🟣 Petechiae and low platelets after a viral illness.',answer:3,why:'This is the course’s immune thrombocytopenia pattern.'},
 {clue:'🧫 Abnormal marrow cells with pallor, infection risk and easy bruising.',answer:4,why:'Marrow disruption in leukemia affects red cells, white cells and platelets.'}]},
 'nur235-m6':{kind:'sort',title:'Prepare the pediatric room',intro:'Choose the precaution or protective action that matches the stated situation.',categories:['Airborne + contact','Droplet precautions','IM epinephrine first','Lukewarm bath + emollient'],rounds:[
 {clue:'🫧 A child is admitted with suspected varicella.',answer:0,why:'The course specifies airborne and contact precautions for varicella.'},
 {clue:'😷 An infant has paroxysmal coughing followed by an inspiratory whoop.',answer:1,why:'Pertussis requires droplet precautions.'},
 {clue:'🚨 Hives, lip swelling and stridor begin after eating peanuts.',answer:2,why:'This is anaphylaxis; intramuscular epinephrine is the first-line medication.'},
 {clue:'🧴 A family asks for daily care tips for itchy atopic dermatitis.',answer:3,why:'Gentle bathing followed promptly by emollient helps protect the skin barrier.'}]},
 'nur235-m7':{kind:'sort',title:'Watch for the neuro pattern',intro:'Read the observation, then connect it to the most likely course concept.',categories:['Increased ICP','Bacterial meningitis CSF','Absence seizure','Myelomeningocele care','Postictal recovery'],rounds:[
 {clue:'👶 A resting infant has a bulging fontanel and increasing head circumference.',answer:0,why:'These findings are clues to increased intracranial pressure.'},
 {clue:'🧪 Cloudy fluid, high white cells, high protein and low glucose.',answer:1,why:'That is the bacterial CSF profile taught in the module.'},
 {clue:'👀 Brief staring spells interrupt activity.',answer:2,why:'Brief staring spells are the characteristic absence pattern.'},
 {clue:'🛏️ Prone position and a sterile saline-moistened dressing over an exposed sac.',answer:3,why:'Protect the sac from pressure, drying and contamination.'},
 {clue:'💤 A monitored child is sleepy while recovering after a seizure.',answer:4,why:'Sleepiness can occur in the postictal period. Continue assessment during recovery.'}]},
 'nur258-m4':{kind:'burn',title:'Map the adult burn',intro:'Select the named whole regions, then check their total. Front and back of the trunk are separate. This exercise uses adult proportions.',rounds:[
 {clue:'Select the entire anterior trunk and both entire arms.',regions:['front','armR','armL'],answer:36,why:'Anterior trunk 18% + right arm 9% + left arm 9% = 36%.'},
 {clue:'Select the entire head and neck, one entire leg, and the perineum.',regions:['head','legR','perineum'],allowEitherLeg:true,answer:28,why:'Head and neck 9% + one leg 18% + perineum 1% = 28%.'},
 {clue:'Select the entire posterior trunk and both entire legs.',regions:['back','legR','legL'],answer:54,why:'Posterior trunk 18% + right leg 18% + left leg 18% = 54%.'},
 {clue:'Course formula exercise: 75 kg, 36% TBSA. At the moment of injury, what total volume does the traditional Parkland formula estimate for 24 hours?',numeric:10800,unit:'mL',why:'4 × 75 × 36 = 10,800 mL. This is a course calculation, not an individualized fluid order.'},
 {clue:'Using that 10,800 mL example, what volume belongs in the first eight hours from the time of injury?',numeric:5400,unit:'mL',why:'Half of 10,800 is 5,400 mL. The clock starts at the burn, not hospital arrival.'}]},
 'nur258-m5':{kind:'sort',title:'Set the hormone control panel',intro:'Use the whole cluster of clues to identify the pattern.',categories:['Addison’s disease','Cushing’s syndrome','Diabetes insipidus','SIADH','Hypothyroidism','Hyperthyroidism'],rounds:[
 {clue:'⬇️ Low blood pressure, low glucose, high potassium and hyperpigmentation.',answer:0,why:'This is the primary adrenal insufficiency pattern in the course.'},
 {clue:'🟣 Moon face, central obesity, thin limbs and easy bruising.',answer:1,why:'These are characteristic cortisol-excess findings.'},
 {clue:'💧 Large volumes of very dilute urine with thirst.',answer:2,why:'Reduced ADH activity leads to water loss in DI.'},
 {clue:'🧪 Low serum sodium with concentrated urine.',answer:3,why:'Excess ADH retains water and can dilute serum sodium.'},
 {clue:'❄️ Cold intolerance, constipation, fatigue and a slow pulse.',answer:4,why:'The pattern is slowed thyroid activity.'},
 {clue:'🌡️ Heat intolerance, tremor, diarrhea and a rapid pulse.',answer:5,why:'The pattern is excess thyroid activity.'}]},
 'nur258-m6':{kind:'glucose',title:'Read the glucose station',intro:'The number is only part of the decision. Always read the swallowing, symptom and treatment context.',categories:['15 g fast carbohydrate; recheck in 15 min','No oral intake; emergency treatment','Check potassium before crisis insulin','Follow the individualized sick-day plan'],rounds:[
 {clue:'Awake, shaky and able to swallow safely.',reading:'58',unit:'mg/dL',answer:0,why:'The current module uses the 15–15 approach for an awake person who can safely swallow.'},
 {clue:'Unresponsive and unable to swallow safely.',reading:'42',unit:'mg/dL',answer:1,why:'No food or drink by mouth. Obtain emergency help and use glucagon or IV glucose according to the care setting and plan.'},
 {clue:'A person with DKA is about to begin insulin therapy.',reading:'DKA',unit:'safety checkpoint',answer:2,why:'Insulin shifts potassium into cells. Potassium must be assessed and low levels addressed under the protocol.'},
 {clue:'Type 1 diabetes, illness and poor intake. Which plan category applies?',reading:'SICK',unit:'day plan',answer:3,why:'Essential basal insulin continues with individualized guidance, monitoring and prompt escalation for warning signs.'}]},
 'nur258-m7':{kind:'numbers',title:'Run the neuro checks',intro:'Use the displayed values. These are study calculations, not treatment targets.',rounds:[
 {clue:'MAP = 70 mmHg. ICP = 22 mmHg. Calculate cerebral perfusion pressure.',answer:48,unit:'mmHg',formula:'CPP = MAP − ICP',why:'70 − 22 = 48 mmHg. A rising ICP reduces the pressure available for cerebral perfusion.'},
 {clue:'MAP = 90 mmHg. ICP = 15 mmHg. Calculate cerebral perfusion pressure.',answer:75,unit:'mmHg',formula:'CPP = MAP − ICP',why:'90 − 15 = 75 mmHg.'},
 {clue:'GCS components: eye opening 3, verbal response 4, motor response 5. Find the total.',answer:12,unit:'points',formula:'GCS = eye + verbal + motor',why:'3 + 4 + 5 = 12. Record the components as well as the total.'},
 {clue:'GCS components: eye opening 4, verbal response 5, motor response 6. Find the total.',answer:15,unit:'points',formula:'GCS = eye + verbal + motor',why:'4 + 5 + 6 = 15, the maximum total score.'}]}
};
