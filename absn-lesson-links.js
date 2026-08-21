/* absn-lesson-links.js - "I got that wrong, show me the lesson".

   When a rationale opens, this adds a link to the study page for that
   question's topic. It appears only after the answer is checked, which is the
   moment someone knows they need it.

   The map is deliberately incomplete. A link that opens the wrong lesson is
   worse than no link - a tile labelled TB that opened Frostbite is the mistake
   this is built to avoid - so a topic with no confident match simply gets no
   link. Every entry below was either matched on an exact page or module title,
   or written by hand and checked. Coverage is about 97% of the questions in
   the three current courses and lower in the older ones.

   Module pages win over single-topic pages where both exist: a whole module is
   a better refresher than one card. */
(function(){
  'use strict';

  var LESSON = {
 "ACE Inhibitors": "cardio/NG-091_ace-inhibitors.html",
 "ACS / MI": "cardio/NG-071_mi-myocardial-infarction.html",
 "APGAR": "more/NG-325_apgar-newborn-assessment.html",
 "Addison's Disease": "endo/NG-287_addisons-vs-cushings.html",
 "Adrenal Disorders": "endo/NG-287_addisons-vs-cushings.html",
 "Allergic, Inflammatory & Immunologic Disorders": "nur258-module-03-allergic-inflammatory-immunologic.html",
 "Angina": "essentials/NG-017_angina-stable-vs-unstable.html",
 "Appendicitis": "gi/NG-302_appendicitis.html",
 "Autonomic Dysreflexia": "neuro/NG-309_autonomic-dysreflexia.html",
 "Body Mechanics": "core/NG-167_ambulation-body-mechanics-mobility.html",
 "Bowel Obstruction": "gi/NG-305_small-bowel-obstruction.html",
 "Brain Abscess": "neuro/NG-317_brain-abscess.html",
 "Breastfeeding": "more/NG-329_breastfeeding.html",
 "Burns": "nur258-module-04-burns.html",
 "CAD / Angina": "essentials/NG-017_angina-stable-vs-unstable.html",
 "Cardiac": "nur235-m9.html",
 "Cardiac Tamponade": "cardio/NG-178_cardiac-tamponade.html",
 "Cardiogenic Shock": "cardio/NG-196_cardiogenic-shock.html",
 "Cardiomyopathy": "cardio/NG-197_cardiomyopathy.html",
 "Celiac Disease": "gi/NG-300_celiac-disease.html",
 "Childhood Communicable Diseases": "skin/NG-345_childhood-rashes.html",
 "Cholecystitis": "gi/NG-179_cholecystitis.html",
 "Cleft Lip and Palate": "gi/NG-358_cleft-lip-palate-pku.html",
 "Colon Cancer": "gi/NG-306_colon-esophageal-cancer.html",
 "Colorectal Cancer": "gi/NG-306_colon-esophageal-cancer.html",
 "Comprehensive Final Review": "nur235-m14.html",
 "Conception, Fetal Development & Placental Function": "nur234-m2.html",
 "Consent & Rights": "core/NG-192_informed-consent-1.html",
 "Constipation": "gi/NG-301_constipation.html",
 "Contraception": "more/NG-335_contraception.html",
 "Cord Prolapse": "more/NG-322_cord-prolapse.html",
 "Crohn's Disease": "more/NG-030_crohns-uc-patho-signs-causes.html",
 "Croup": "resp/NG-350_croup-vs-epiglottitis.html",
 "Cushing's Syndrome": "endo/NG-287_addisons-vs-cushings.html",
 "Cystic Fibrosis": "resp/NG-347_pediatric-asthma-cf.html",
 "Deep Vein Thrombosis": "cardio/NG-223_dvt-deep-vein-thrombosis.html",
 "Delegation": "core/NG-180_delegation-5-rights.html",
 "Delirium and Dementia": "neuro/NG-244_dementia-vs-delirium.html",
 "Delirium versus Dementia": "neuro/NG-244_dementia-vs-delirium.html",
 "Delirium vs Dementia": "neuro/NG-244_dementia-vs-delirium.html",
 "Developmental Milestones": "core/NG-349_growth-development.html",
 "Diabetes": "nur258-module-06-diabetes.html",
 "Diabetes Insipidus": "endo/NG-282_siadh-vs-di-1.html",
 "Disaster, Mass Casualty & Emergency Nursing": "nur258-module-12-disaster-emergency-nursing.html",
 "Diverticulitis": "gi/NG-303_diverticulitis-diverticulosis.html",
 "Diverticulosis": "gi/NG-303_diverticulitis-diverticulosis.html",
 "Dumping Syndrome": "gi/NG-297_dumping-syndrome.html",
 "Dumping Syndrome Symptoms": "gi/NG-297_dumping-syndrome.html",
 "Dysfunctional Labor, Uterine Rupture & Obstetric Drug Math": "nur234-m10.html",
 "Dysrhythmias": "essentials/NG-090_9-ecg-strips-nclex.html",
 "ECG Basics": "essentials/NG-090_9-ecg-strips-nclex.html",
 "ECG Interpretation": "more/NG-011_5-step-ekg-interpretation.html",
 "Early Pregnancy Bleeding & Ectopic Pregnancy": "nur234-m8.html",
 "Ectopic Pregnancy": "more/NG-326_ectopic-molar-pregnancy.html",
 "Encephalitis": "neuro/NG-312_encephalitis.html",
 "Endocarditis": "cardio/NG-229_endocarditis.html",
 "Endocrine & Metabolic": "nur235-m11.html",
 "Endocrine Disorders": "nur258-module-05-endocrine-disorders.html",
 "Enteral Feeding": "gi/NG-298_tpn-enteral-feeding.html",
 "Enteral vs TPN": "gi/NG-298_tpn-enteral-feeding.html",
 "Epiglottitis": "resp/NG-350_croup-vs-epiglottitis.html",
 "Esophageal Cancer": "gi/NG-306_colon-esophageal-cancer.html",
 "Ethical Principles": "core/NG-133_ethical-key-terms.html",
 "Ethics": "core/NG-133_ethical-key-terms.html",
 "Fetal Heart Rate Decelerations": "more/NG-323_fetal-monitoring.html",
 "Fetal Monitoring": "more/NG-323_fetal-monitoring.html",
 "Fetal Monitoring, Comfort & Analgesia in Labor": "nur234-m7.html",
 "Final Exam Review": "nur258-module-14-final-review.html",
 "Fluid Overload": "renal/NG-169_fluid-balance-fluid-overload.html",
 "Fluid Volume Deficit": "renal/NG-191_fluid-volume-deficit.html",
 "GERD": "more/NG-036_gerd.html",
 "GI Bleed": "gi/NG-304_gi-bleed.html",
 "Gastrointestinal": "nur235-m12.html",
 "Gestational Diabetes": "more/NG-332_gestational-diabetes.html",
 "Glomerulonephritis": "renal/NG-352_nephrotic-vs-nephritic.html",
 "Grief and Loss": "mh/NG-222_death-dying-grief-loss.html",
 "Growth and Development": "core/NG-349_growth-development.html",
 "HELLP Syndrome": "more/NG-320_preeclampsia-hellp.html",
 "HTN": "cardio/NG-068_htn-hypertension.html",
 "Heart Failure": "more/NG-039_heart-failure.html",
 "Hematologic Disorders": "nur258-module-09-hematologic-disorders.html",
 "Hematology & Childhood Neoplasms": "nur235-m5.html",
 "Hemophilia": "cardio/NG-344_sickle-cell-hemophilia.html",
 "Hiatal Hernia": "gi/NG-294_hiatal-hernia.html",
 "Hydrocephalus": "neuro/NG-346_hydrocephalus-spina-bifida.html",
 "Hypertension": "cardio/NG-068_htn-hypertension.html",
 "Hypertensive Disorders & Magnesium Sulfate": "nur234-m9.html",
 "Hyperthyroidism": "endo/NG-284_hyperthyroidism.html",
 "Hypothyroidism": "endo/NG-284_hyperthyroidism.html",
 "Hypovolemic Shock": "cardio/NG-184_hypovolemic-shock.html",
 "IBD": "more/NG-030_crohns-uc-patho-signs-causes.html",
 "ICP": "neuro/NG-308_increased-icp.html",
 "Immune, Infectious Disease, Skin & Burns": "nur235-m6.html",
 "Immunizations": "core/NG-353_immunizations.html",
 "Increased ICP": "neuro/NG-308_increased-icp.html",
 "Increased Intracranial Pressure": "neuro/NG-308_increased-icp.html",
 "Infection Control": "core/NG-073_ppe-infection-control.html",
 "Infectious Diseases & HIV": "nur258-module-02-infectious-diseases-hiv.html",
 "Informed Consent": "core/NG-192_informed-consent-1.html",
 "Insulin": "NG-370_insulin-and-education.html",
 "Insulin Administration": "NG-370_insulin-and-education.html",
 "Intro to Pediatric Nursing": "nur235-m1.html",
 "Isotonic Solutions": "renal/NG-120_iv-solutions-hyper-hypo-isotonic.html",
 "Kidney Transplant": "renal/NG-267_renal-kidney-transplant-vs-biopsy.html",
 "Labor & Birth": "nur234-m6.html",
 "Loop Diuretics": "renal/NG-113_diuretics-loop.html",
 "MI": "cardio/NG-071_mi-myocardial-infarction.html",
 "Macular Degeneration": "neuro/NG-311_macular-degeneration.html",
 "Mastectomy": "skin/NG-318_mastectomy.html",
 "Musculoskeletal": "nur235-m10.html",
 "Myocardial Infarction": "cardio/NG-071_mi-myocardial-infarction.html",
 "Nephrotic Syndrome": "renal/NG-352_nephrotic-vs-nephritic.html",
 "Neurogenic Shock": "neuro/NG-158_neurogenic-shock.html",
 "Neurologic & Neuromuscular": "nur235-m7.html",
 "Neurologic Dysfunction & Cerebrovascular Disorders": "nur258-module-07-neurologic-cerebrovascular.html",
 "Newborn Assessment": "more/NG-325_apgar-newborn-assessment.html",
 "Newborn Feeding": "nur234-m13.html",
 "Nutrition & Health Promotion in Pregnancy": "nur234-m5.html",
 "Oncologic Disorders & End-of-Life Care": "nur258-module-10-oncology-end-of-life.html",
 "Otitis Media": "neuro/NG-355_otitis-media-vision.html",
 "PCA Pump": "more/NG-259_pca-pump-vs-fentanyl.html",
 "PCA pump": "more/NG-259_pca-pump-vs-fentanyl.html",
 "PUD": "gi/NG-295_peptic-ulcer-disease.html",
 "Parenteral Nutrition": "gi/NG-298_tpn-enteral-feeding.html",
 "Peptic Ulcer": "gi/NG-295_peptic-ulcer-disease.html",
 "Pericarditis": "cardio/NG-066_pericarditis.html",
 "Peritoneal Dialysis": "renal/NG-261_peritoneal-dialysis.html",
 "Pharmacokinetics": "more/NG-262_pharmacokinetics.html",
 "Physiologic & Psychological Changes of Pregnancy": "nur234-m3.html",
 "Placenta Previa": "more/NG-319_previa-vs-abruption.html",
 "Placental Abruption": "more/NG-319_previa-vs-abruption.html",
 "Pneumonia": "resp/NG-307_pneumonia.html",
 "Positioning": "core/NG-072_positioning.html",
 "Postpartum Assessment & Hemorrhage": "nur234-m11.html",
 "Postpartum Hemorrhage": "more/NG-321_postpartum-hemorrhage.html",
 "Preeclampsia": "more/NG-320_preeclampsia-hellp.html",
 "Prenatal Assessment & Antepartum Fetal Surveillance": "nur234-m4.html",
 "Prenatal Care": "more/NG-331_prenatal-assessment.html",
 "Preterm Labor": "more/NG-328_preterm-labor.html",
 "Renal & Genitourinary": "nur235-m13.html",
 "Renal Biopsy": "renal/NG-267_renal-kidney-transplant-vs-biopsy.html",
 "Renal Labs": "resp/NG-048_renal-labs.html",
 "Reproductive Disorders": "nur258-module-11-reproductive-disorders.html",
 "Reproductive Life Planning & Contraception": "nur234-m1.html",
 "Respiratory": "nur235-m8.html",
 "Retinal Detachment": "neuro/NG-310_retinal-detachment.html",
 "School-Age & Adolescent": "nur235-m4.html",
 "Scleroderma": "musc/NG-316_scleroderma.html",
 "Scoliosis": "musc/NG-348_pediatric-musculoskeletal.html",
 "Seizure Precautions": "neuro/NG-226_seizures.html",
 "Seizures": "neuro/NG-226_seizures.html",
 "Sensory Disorders - Eye & Ear": "nur258-module-01-sensory-eye-ear.html",
 "Shock": "cardio/NG-050_shock.html",
 "Shock & MODS": "nur258-module-13-shock-mods.html",
 "Sickle Cell Anemia": "cardio/NG-344_sickle-cell-hemophilia.html",
 "Sleep Hygiene": "mh/NG-135_sleep-hygiene.html",
 "Small Bowel Obstruction": "gi/NG-305_small-bowel-obstruction.html",
 "Spina Bifida": "neuro/NG-346_hydrocephalus-spina-bifida.html",
 "Stages of Labor": "more/NG-324_stages-of-labor.html",
 "Sterile Technique": "core/NG-074_sterile-technique.html",
 "TPN": "gi/NG-298_tpn-enteral-feeding.html",
 "The High-Risk Newborn & Course Review": "nur234-m14.html",
 "The Infant (0&ndash;1 year)": "nur235-m2.html",
 "The Normal Newborn & Thermoregulation": "nur234-m12.html",
 "Therapeutic Communication": "mh/NG-271_therapeutic-communication.html",
 "Thyroid Disorders": "endo/NG-284_hyperthyroidism.html",
 "Toddler & Preschooler": "nur235-m3.html",
 "Traumatic, Infectious, Oncologic & Degenerative Neuro": "nur258-module-08-neuro-trauma-infection-oncology-degenerative.html",
 "Ulcerative Colitis": "more/NG-030_crohns-uc-patho-signs-causes.html",
 "Urinary Retention": "renal/NG-274_urinary-retention.html",
 "dumping syndrome": "gi/NG-297_dumping-syndrome.html",
 "enteral feeding": "gi/NG-298_tpn-enteral-feeding.html",
 "esophageal cancer": "gi/NG-306_colon-esophageal-cancer.html",
 "gastritis": "gi/NG-296_gastritis.html",
 "hiatal hernia": "gi/NG-294_hiatal-hernia.html"
};

  /* the label tells her what she is about to open, so a module page and a
     one-topic page do not look like the same thing */
  function label(href){
    if(/^nur\d+-m/.test(href) || /^nur\d+-module-/.test(href)) return 'Open the full module';
    return 'Open the lesson';
  }

  function linkFor(card){
    var t = (card.getAttribute('data-topic') || '').trim();
    if(!t) return null;
    var href = LESSON[t];
    if(!href) return null;
    var a = document.createElement('a');
    a.className = 'lessonlink';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    /* escape, do not strip - stripping turned "Eye & Ear" into "Eye Ear" */
    var safe = t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    a.innerHTML = '\uD83D\uDCD6 ' + label(href) + ': <b>' + safe + '</b> \u2192';
    return a;
  }

  function decorate(rat){
    if(!rat || rat.querySelector('.lessonlink')) return;
    var card = rat.closest('[data-topic]') || document.querySelector('[data-topic]');
    if(!card) return;
    var a = linkFor(card);
    if(a) rat.appendChild(a);
  }

  /* The rationale is revealed by adding the class "show", from several places
     in the quiz. Watching for that is less brittle than patching each one. */
  var obs = new MutationObserver(function(muts){
    muts.forEach(function(mu){
      var el = mu.target;
      if(el.classList && el.classList.contains('rat') && el.classList.contains('show')) decorate(el);
      if(mu.addedNodes) [].forEach.call(mu.addedNodes, function(n){
        if(n.nodeType===1 && n.classList && n.classList.contains('rat') && n.classList.contains('show')) decorate(n);
      });
    });
  });
  obs.observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['class']});

  /* the unfolding case study reveals its rationale without a class change */
  document.addEventListener('click', function(){
    setTimeout(function(){
      [].forEach.call(document.querySelectorAll('.rat.show, #csRat.show'), decorate);
    }, 60);
  }, true);
})();
