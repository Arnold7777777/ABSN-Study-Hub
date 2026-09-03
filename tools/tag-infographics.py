#!/usr/bin/env python3
"""Give every infographic card a module and an exam tag.

565 of the 953 cards had no data-mod and 577 had no data-exam, so the module
and exam filters on infographics.html missed most of the library.

The module numbering is per course, and every course's real structure was read
off its own study guide rather than guessed:

  NUR 198  Exam 1 = M1-3, Exam 2 = M4-6, Exam 3 = M7-8, Exam 4 = M9-10,
           Exam 5 = M11-12, M13 musculoskeletal      (NUR-198-Study-Guide)
  NUR 175  Exam 1 = M1-3, Exam 2 = M4-7, Exam 3 = M8-10, Final = M11-13
           (EXAM_MAP in that repo's index.html)
  NUR 125  Exam 1 = M1-3, Exam 2 = M4-6, Exam 3 = M7-9, Exam 4 = M10-11,
           Final = M12-14                            (NUR-125-Fundamentals)
  Pharm    BIO 290V, Exam 1 = M1, Exam 2 = M2-3, Exam 3 = M4-5, Exam 4 = M6-7,
           Exam 5 = M8-9, Exam 6 = M10-11, Exam 7 = M12-13, Final = M14
           (this repo's own m*.html and exam*.html)

A card is matched on its title, its keywords and the path of the study page it
links to. Cards that already carry a module are left alone.
"""
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE = os.path.join(REPO, 'infographics.html')

# (module, exam, pattern) - first match wins, so put the specific rules first.
NUR198 = [
    ('M2',  'Exam 1', r'fluid|electrolyt|sodium|potassium|calcium|magnesium|phosph|chlorid|'
                      r'acid.?base|abg|acidosis|alkalosis|dehydrat|hypervolem|hypovolem|iv fluid|'
                      r'isotonic|hypertonic|hypotonic|infiltration|extravasation|central line|picc'),
    ('M3',  'Exam 1', r'periop|preop|postop|post.?op|anesthes|surg|conscious sedation|malignant hyperthermia|'
                      r'pain|analgesi|opioid|pca |burn|pressure (injury|ulcer)|wound|skin|integument|'
                      r'dressing|braden|cellulitis|psoriasis|eczema|melanoma|shingles|herpes'),
    ('M1',  'Exam 1', r'older adult|geriatr|aging|chronic illness|disabilit|delirium|dementia|polypharm|'
                      r'advance directive|palliative|hospice|end.of.life|falls|restraint'),
    ('M4 · M5 · M6', 'Exam 2',
                      r'respirat|pneumon|asthma|copd|tuberculos|\btb\b|pulmonary|lung|oxygen|hypox|'
                      r'trach|chest tube|ventilat|atelectas|pleural|pneumothorax|embolism|ards|'
                      r'bronch|spirometr|incentive|suction|nebuliz|inhaler|cystic fibrosis|apnea|epistaxis|sinus'),
    ('M7 · M8', 'Exam 3',
                      r'cardi|heart|angina|myocard|\bmi\b|infarct|ekg|ecg|arrhythm|dysrhythm|'
                      r'atrial|ventricular|bradycard|tachycard|defibrill|pacemaker|'
                      r'hypertens|blood pressure|\bbp\b|perfusion|shock|aneurysm|\bpad\b|\bpvd\b|'
                      r'dvt|varicose|valve|endocard|pericard|cabg|stent|lipid|cholesterol|statin|'
                      r'anticoagul|heparin|warfarin|digox|hemodynam|\bcvp\b'),
    ('M9',  'Exam 4', r'renal|kidney|nephr|dialys|glomerul|urinar|bladder|ureter|urethr|\buti\b|'
                      r'pyelonephr|cystitis|incontinen|retention|catheter|prostat|\bbph\b|'
                      r'creatinine|\bgfr\b|\bbun\b|urolith|calculi|stone'),
    ('M10', 'Exam 4', r'hepat|liver|cirrhos|jaundice|ascites|bilirubin|biliar|gallbladder|cholecyst|'
                      r'cholelith|pancrea|\berc?p\b|portal hypertension|esophageal varic|encephalopathy'),
    ('M11', 'Exam 5', r'esophag|stomach|gastr(?!oenter)|gerd|peptic|ulcer disease|\bpud\b|h\.? pylori|'
                      r'\begd\b|\bng tube\b|nasogastric|dumping|hiatal|oral cavity|salivar|'
                      r'dysphagia|enteral|\btpn\b|parenteral nutrition'),
    ('M12', 'Exam 5', r'colon|bowel|intestin|append|divertic|\bibd\b|crohn|ulcerative colitis|\bibs\b|'
                      r'celiac|ostomy|colostomy|ileostomy|hernia|hemorrhoid|anorect|fissure|'
                      r'obstruction|peritonitis|constipation|diarrh|\bcrc\b|colorectal|colonoscopy'),
    ('M13', 'Final',  r'musculoskelet|fracture|orthop|joint|arthrit|osteo|hip|knee|amputat|traction|'
                      r'cast |crutch|spinal|scoliosis|gout|lupus|fibromyalg|carpal|rotator|compartment'),
]

NUR175 = [
    ('M1',  'Exam 1', r'neurobiolog|neurotransmit|foundation|psychopharm|milieu'),
    ('M2',  'Exam 1', r'theor(y|ies)|therapy|treatment setting|milieu|group therapy|cbt|freud|erikson|maslow'),
    ('M3',  'Exam 1', r'therapeutic (relationship|communication)|boundar|transference|nontherapeutic|rapport'),
    ('M4',  'Exam 2', r'mental status exam|\bmse\b|response to illness|assessment tool|coping|defense mechanism'),
    ('M5',  'Exam 2', r'legal|ethic|commitment|competen|confidential|hipaa|grief|loss|bereave|restraint|seclusion'),
    ('M6',  'Exam 2', r'anger|hostilit|aggress|violence|abuse|neglect|de.?escalat|human traffick'),
    ('M7',  'Exam 2', r'trauma|stressor|\bptsd\b|anxiet|panic|phobi|gad\b|dissociat'),
    ('M8',  'Exam 3', r'\bocd\b|obsessive|schizophren|psychosis|psychotic|hallucinat|delusion|'
                      r'antipsychot|\beps\b|tardive|neuroleptic'),
    ('M9',  'Exam 3', r'mood|depress|bipolar|mania|manic|suicid|\bssri\b|\bmaoi\b|tricyclic|lithium|'
                      r'\bect\b|\btms\b|personality disorder|borderline|antisocial|narciss'),
    ('M10', 'Exam 3', r'addict|substance|alcohol|withdraw|opioid use|naloxone|disulfiram|'
                      r'eating disorder|anorexi|bulimi|binge'),
    ('M11', 'Final',  r'somatic symptom|conversion|factitious|malinger|neurodevelopment|autism|\badhd\b'),
    ('M12', 'Final',  r'disruptive|conduct disorder|oppositional|cognitive disorder|alzheimer|dementia|delirium'),
    ('M13', 'Final',  r'psychopharmacolog|anxiolytic|benzodiazep|mood stabiliz|antidepress'),
]

NUR125 = [
    ('M2',  'Exam 1', r'medication admin|drug calculation|dosage|six rights|injection|\bim\b|subcutaneous|'
                      r'\bz.?track\b|insulin pen|oral med|route'),
    ('M3',  'Exam 1', r'infection control|asepsis|hand hygiene|handwash|isolation|precaution|ppe|'
                      r'sterile|post.?mortem|\bhai\b|chain of infection|surgical asepsis'),
    ('M1',  'Exam 1', r'foundation|nursing process|adpie|scope of practice|delegation|documentation|'
                      r'sbar|handoff|clinical judgment|critical thinking|vital sign|assessment technique'),
    ('M5',  'Exam 2', r'skin integrity|pressure (injury|ulcer)|wound|braden|dressing|debride|drain'),
    ('M4',  'Exam 2', r'safety|mobility|fall|restraint|transfer|body mechanic|range of motion|ambulat|'
                      r'immobilit|assistive device|gait belt'),
    ('M6',  'Exam 2', r'hygiene|bed.?making|bath|oral care|perineal care|denture'),
    ('M7',  'Exam 3', r'oxygenat|sterile technique|respiratory (care|assessment)|suction|incentive spirometer|'
                      r'nasal cannula|oxygen delivery'),
    ('M8',  'Exam 3', r'urinary|catheter|specimen|urinalysis|void|output'),
    ('M9',  'Exam 3', r'bowel|ostomy|enema|constipation|diarrh|nutrition|\bnpo\b|feeding|dysphagia|\btpn\b|bmi'),
    ('M10', 'Exam 4', r'sensory|vision|hearing|deaf|blind|aphasia|neuro.?check'),
    ('M11', 'Exam 4', r'client education|teaching|communication|health literacy|cultural|interpreter'),
    ('M12', 'Final',  r'palliative|hospice|end.of.life|grief|advance directive|\bdnr\b|post.?mortem'),
    ('M13', 'Final',  r'rest|sleep|insomnia|therapeutic environment|circadian'),
    ('M14', 'Final',  r'pain management|analgesi|complementary|nonpharmacolog|acupunct|massage'),
]

PHARM = [
    ('M2',  'Exam 2', r'antibiotic|anti.?infective|penicillin|cephalosporin|macrolide|tetracyclin|'
                      r'aminoglycos|fluoroquinolon|sulfonamide|vancomycin|antifungal|antiviral|'
                      r'antitubercul|isoniazid|rifampin|metronidazole|antimalarial|anthelmint'),
    ('M3',  'Exam 2', r'immunomodulat|antineoplast|chemotherap|immunosuppress|vaccine|immuniz|'
                      r'corticosteroid|biologic|monoclonal|methotrexate|cyclosporin'),
    ('M4',  'Exam 3', r'\bnsaid|acetaminophen|opioid|morphine|analgesi|inflammat|aspirin|ibuprofen|'
                      r'naloxone|substance use|alcohol|nicotine|gout|colchicine|allopurinol'),
    ('M5',  'Exam 3', r'antidepress|\bssri\b|\bsnri\b|\bmaoi\b|tricyclic|lithium|antipsychot|'
                      r'benzodiazep|anxiolytic|mood stabiliz|stimulant|adhd|sedative|hypnotic'),
    ('M6',  'Exam 4', r'bisphosphon|osteoporos|calcium supplement|bone|dermatolog|acne|psoriasis|'
                      r'topical|antihistamine cream|skin disorder'),
    ('M7',  'Exam 4', r'autonomic|cholinerg|anticholinerg|adrenerg|beta.?blocker|alpha|'
                      r'sympatho|parasympatho|atropine|epinephrine|muscarinic|neuromuscular blocker'),
    ('M8',  'Exam 5', r'endocrin|insulin|diabet|thyroid|levothyroxine|methimazole|corticoster|'
                      r'glucocortic|growth hormone|\badh\b|desmopressin|oral hypoglycemic|metformin'),
    ('M9',  'Exam 5', r'antihypertens|ace inhibitor|\barb\b|calcium channel|nitrate|nitroglycerin|'
                      r'antianginal|statin|lipid|cholesterol'),
    ('M10', 'Exam 6', r'antiarrhythm|digox|amiodarone|anticoagul|heparin|warfarin|antiplatelet|'
                      r'thrombolytic|clopidogrel|heart failure drug|inotrop'),
    ('M11', 'Exam 6', r'diuretic|furosemide|thiazide|spironolactone|iv fluid|electrolyte replacement|'
                      r'poison|antidote|overdose|activated charcoal|toxicit'),
    ('M12', 'Exam 7', r'bronchodilat|albuterol|inhaled|respiratory drug|antitussive|decongestant|'
                      r'expectorant|montelukast|eye drop|ophthalmic|otic|glaucoma drug|timolol'),
    ('M13', 'Exam 7', r'antacid|proton pump|\bppi\b|omeprazole|h2 blocker|ranitidine|famotidine|'
                      r'antiemetic|ondansetron|laxative|antidiarrheal|gi stimulant|sucralfate'),
    ('M14', 'Final',  r'reproductive|contracept|oxytocin|tocolytic|magnesium sulfate|estrogen|'
                      r'testosterone|erectile|finasteride|tamsulosin|fertility'),
    ('M1',  'Exam 1', r'pharmacokinetic|pharmacodynamic|introduction to pharmacolog|herbal|supplement|'
                      r'drug class|half.?life|first.?pass|therapeutic index|black box'),
]


# NUR 234 and NUR 235 module pages name their own exam blocks:
#   NUR 234  Exam 1 = M1-4, Exam 2 = M5-7, Exam 3 = M8-10, Exam 4 = M11-14
#   NUR 235  Exam 1 = M1-4, Exam 2 = M5-7, Exam 3 = M8-9, Exam 4 = M10-13,
#            M14 is the comprehensive final review
NUR234 = [
    ('M1',  'Exam 1', r'contracept|reproductive life planning|family planning|sterilization|iud|'
                      r'reproductive anatomy|menstrual|female cycle|infertilit'),
    ('M2',  'Exam 1', r'conception|fertiliz|implantation|fetal development|placenta(?! previa)|'
                      r'embryo|amniotic|umbilical cord|teratogen|torch'),
    ('M3',  'Exam 1', r'physiologic change|psychological change|discomfort of pregnancy|'
                      r'presumptive|probable|positive sign|gtpal|gravida|para'),
    ('M4',  'Exam 1', r'prenatal|antepartum|fetal surveillance|nonstress|biophysical|amniocentesis|'
                      r'ultrasound|leopold|fundal height|quickening'),
    ('M5',  'Exam 2', r'nutrition in pregnancy|weight gain|folic acid|health promotion|exercise in pregnancy|'
                      r'gestational diabetes'),
    ('M6',  'Exam 2', r'labor|birth|stages of labor|contraction|cervical (dilation|change)|'
                      r'rupture of membranes|srom|effacement|station|the five p'),
    ('M7',  'Exam 2', r'fetal monitor|deceleration|variability|veal chop|epidural|analgesia in labor|'
                      r'comfort measure|nitrous'),
    ('M8',  'Exam 3', r'early pregnancy bleeding|ectopic|molar|abortion|miscarriage|previa|abruption|'
                      r'hyperemesis'),
    ('M9',  'Exam 3', r'hypertensive disorder|preeclampsia|eclampsia|hellp|magnesium sulfate'),
    ('M10', 'Exam 3', r'dysfunctional labor|uterine rupture|obstetric drug math|induction|cesarean|'
                      r'forceps|vacuum|shoulder dystocia|cord prolapse|preterm labor|tocolytic|'
                      r'oxytocin|tachysystole|obstetric emergenc'),
    ('M11', 'Exam 4', r'postpartum|fundus|lochia|involution|hemorrhage|mastitis|perineal care|'
                      r'rhogam|postpartum depression|psychosis'),
    ('M12', 'Exam 4', r'normal newborn|thermoregulation|apgar|newborn assessment|cold stress|'
                      r'circumcision|reflex|caput|cephalhematoma'),
    ('M13', 'Exam 4', r'newborn feeding|breastfeed|latch|formula|colostrum|engorgement|lactation'),
    ('M14', 'Exam 4', r'high.?risk newborn|preterm|rds|nec|hyperbilirubin|jaundice|phototherapy|'
                      r'neonatal abstinence|nas|meconium|sga|lga|course review'),
]

NUR235 = [
    ('M1',  'Exam 1', r'intro to pediatric|pediatric nursing|atraumatic|family.?centered|'
                      r'pediatric medication|pediatric dosage|pain in children|hospitalized child'),
    ('M2',  'Exam 1', r'infant|0.?1 year|sids|colic|failure to thrive|infant nutrition'),
    ('M3',  'Exam 1', r'toddler|preschool|poisoning|lead exposure|ingestion|temper tantrum|toilet train'),
    ('M4',  'Exam 1', r'school.?age|adolescen|puberty|growth.{0,12}development|erikson|milestone|'
                      r'immuniz|vaccine schedule'),
    ('M5',  'Exam 2', r'hematolog|anemia|sickle cell|hemophilia|leukemia|neoplasm|childhood cancer|'
                      r'wilms|neuroblastoma|retinoblastoma|thalassem|itp'),
    ('M6',  'Exam 2', r'immune|infectious disease|communicable|skin|burn|rash|eczema|impetigo|'
                      r'hiv in children|kawasaki'),
    ('M7',  'Exam 2', r'neurolog|neuromuscular|seizure|meningitis|spina bifida|hydrocephalus|'
                      r'cerebral palsy|muscular dystrophy|reye|increased icp|head injury|tay.?sachs'),
    ('M8',  'Exam 3', r'respiratory|asthma|croup|epiglottitis|bronchiolitis|rsv|cystic fibrosis|'
                      r'tonsill|tracheostomy|otitis media'),
    ('M9',  'Exam 3', r'cardiac|congenital heart|tetralogy|vsd|asd|patent ductus|'
                      r'coarctation|rheumatic fever|heart defect'),
    ('M10', 'Exam 4', r'musculoskelet|scoliosis|fracture in children|clubfoot|hip dysplasia|'
                      r'legg.?calve|osteogenesis'),
    ('M11', 'Exam 4', r'endocrine|metabolic|type 1 diabetes|dka|growth hormone|precocious|'
                      r'congenital hypothyroid|pku|galactosem'),
    ('M12', 'Exam 4', r'gastrointestinal|pyloric stenosis|intussusception|cleft|hirschsprung|'
                      r'gastroenteritis|dehydration in children|appendicitis in children|'
                      r'esophageal atresia|tef'),
    ('M13', 'Exam 4', r'renal|genitourinary|nephrotic|glomerulonephritis|enuresis|vesicoureteral|'
                      r'cryptorchid|hypospadias|uti in children|wilms tumor'),
    ('M14', 'Final',  r'comprehensive|final review|blueprint|clinical mastery|ecosystem|dashboard'),
]


# NUR 198's own module list is organised by body system, so the card's category
# is a far better first signal than its keywords. Matching on keywords alone put
# "Fracture" in the perioperative module (it says "surg"), calcium channel
# blockers in the electrolyte module, and heart-defect surgery in with the skin
# disorders. Resolve by system, then use keywords only to choose within it.
NUR198_BY_CAT = {
    'CARDIO':          ('M7 · M8', 'Exam 3'),
    'RESPIRATORY':     ('M4 · M5 · M6', 'Exam 2'),
    'MUSCULOSKELETAL': ('M13', 'Final'),
    'SKIN + WOUND':    ('M3', 'Exam 1'),
    'NEURO':           ('M1', 'Exam 1'),
    'ENDOCRINE':       ('M1', 'Exam 1'),
    'IMMUNE':          ('M1', 'Exam 1'),
}
HEPATOBILIARY = (r'hepat|liver|cirrhos|jaundice|ascites|bilirubin|biliar|gallbladder|'
                 r'cholecyst|cholelith|pancrea|\bercp\b|portal hypertension|esophageal varic')
UPPER_GI = (r'esophag|stomach|gastr(?!oenter)|gerd|peptic|ulcer disease|\bpud\b|h\.? pylori|'
            r'\begd\b|\bng tube\b|nasogastric|dumping|hiatal|oral cavity|salivar|dysphagia|'
            r'enteral|\btpn\b|parenteral nutrition')
LOWER_GI = (r'colon|bowel|intestin|append|divertic|\bibd\b|crohn|ulcerative colitis|\bibs\b|'
            r'celiac|ostomy|hernia|hemorrhoid|anorect|fissure|obstruction|peritonitis|'
            r'constipation|diarrh|colorectal|colonoscopy')
RENAL = (r'renal|kidney|nephr|dialys|glomerul|urinar|bladder|ureter|urethr|\buti\b|'
         r'pyelonephr|cystitis|incontinen|retention|catheter|prostat|\bbph\b|'
         r'creatinine|\bgfr\b|\bbun\b|urolith|calculi|stone|uremi')
PERIOP = (r'periop|preop|postop|post.?op|anesthes|surg|sedation|malignant hyperthermia|'
          r'pain|analgesi|opioid|\bpca\b|burn|wound|dressing|drain|pressure (injury|ulcer)')
ACIDBASE = r'acid.?base|\babg\b|acidosis|alkalosis|compensation'


def nur198(text, cat):
    """Module and exam for a NUR 198 card, system first."""
    if cat == 'GI':
        if re.search(HEPATOBILIARY, text):
            return 'M10', 'Exam 4'
        if re.search(UPPER_GI, text):
            return 'M11', 'Exam 5'
        if re.search(LOWER_GI, text):
            return 'M12', 'Exam 5'
        return 'M11 · M12', 'Exam 5'
    if cat == 'RENAL + FLUID':
        return ('M9', 'Exam 4') if re.search(RENAL, text) else ('M2', 'Exam 1')
    if cat == 'NURSING CORE':
        if re.search(ACIDBASE + r'|fluid|electrolyt|sodium|potassium|calcium|magnesium', text):
            return 'M2', 'Exam 1'
        return ('M3', 'Exam 1') if re.search(PERIOP, text) else ('M1', 'Exam 1')
    if cat == 'RESPIRATORY' and re.search(ACIDBASE, text):
        return 'M2', 'Exam 1'          # ABGs are taught in the acid-base module
    if cat in NUR198_BY_CAT:
        return NUR198_BY_CAT[cat]
    if cat == 'PHARMACOLOGY':
        for m, e, pat in NUR198:       # drug cards genuinely span the modules
            if re.search(pat, text):
                return m, e
    return 'M1', 'Exam 1'


# Which exam each module sits under, for cards that already had a module but no
# exam. Read from each course's own pages, same as the rules above.
EXAM_OF = {
    'NUR 198': {'M1': 'Exam 1', 'M2': 'Exam 1', 'M3': 'Exam 1', 'M4': 'Exam 2', 'M5': 'Exam 2',
                'M6': 'Exam 2', 'M7': 'Exam 3', 'M8': 'Exam 3', 'M9': 'Exam 4', 'M10': 'Exam 4',
                'M11': 'Exam 5', 'M12': 'Exam 5', 'M13': 'Final'},
    'NUR 175': {'M1': 'Exam 1', 'M2': 'Exam 1', 'M3': 'Exam 1', 'M4': 'Exam 2', 'M5': 'Exam 2',
                'M6': 'Exam 2', 'M7': 'Exam 2', 'M8': 'Exam 3', 'M9': 'Exam 3', 'M10': 'Exam 3',
                'M11': 'Final', 'M12': 'Final', 'M13': 'Final'},
    'NUR 125': {'M1': 'Exam 1', 'M2': 'Exam 1', 'M3': 'Exam 1', 'M4': 'Exam 2', 'M5': 'Exam 2',
                'M6': 'Exam 2', 'M7': 'Exam 3', 'M8': 'Exam 3', 'M9': 'Exam 3', 'M10': 'Exam 4',
                'M11': 'Exam 4', 'M12': 'Final', 'M13': 'Final', 'M14': 'Final'},
    'NUR 234': {f'M{i}': e for i, e in
                [(1,'Exam 1'),(2,'Exam 1'),(3,'Exam 1'),(4,'Exam 1'),(5,'Exam 2'),(6,'Exam 2'),
                 (7,'Exam 2'),(8,'Exam 3'),(9,'Exam 3'),(10,'Exam 3'),(11,'Exam 4'),(12,'Exam 4'),
                 (13,'Exam 4'),(14,'Exam 4')]},
    'NUR 235': {f'M{i}': e for i, e in
                [(1,'Exam 1'),(2,'Exam 1'),(3,'Exam 1'),(4,'Exam 1'),(5,'Exam 2'),(6,'Exam 2'),
                 (7,'Exam 2'),(8,'Exam 3'),(9,'Exam 3'),(10,'Exam 4'),(11,'Exam 4'),(12,'Exam 4'),
                 (13,'Exam 4'),(14,'Final')]},
    'NUR 258': {f'M{i}': e for i, e in
                [(1,'Exam 1'),(2,'Exam 1'),(3,'Exam 1'),(4,'Exam 2'),(5,'Exam 2'),(6,'Exam 2'),
                 (7,'Exam 3'),(8,'Exam 3'),(9,'Exam 4'),(10,'Exam 4'),(11,'Exam 5'),(12,'Exam 5'),
                 (13,'Exam 5'),(14,'Final')]},
    'Pharmacology': {'M1': 'Exam 1', 'M2': 'Exam 2', 'M3': 'Exam 2', 'M4': 'Exam 3', 'M5': 'Exam 3',
                     'M6': 'Exam 4', 'M7': 'Exam 4', 'M8': 'Exam 5', 'M9': 'Exam 5', 'M10': 'Exam 6',
                     'M11': 'Exam 6', 'M12': 'Exam 7', 'M13': 'Exam 7', 'M14': 'Final'},
}

RULES = { 'NUR 234': NUR234, 'NUR 235': NUR235, 'NUR 175': NUR175, 'NUR 125': NUR125, 'Pharmacology': PHARM}

# Last resort when nothing matched: the card's body-system category still says
# which block of the course it belongs to.
BY_CAT = {
    'NUR 198': {'RENAL + FLUID': ('M9', 'Exam 4'), 'CARDIO': ('M7 · M8', 'Exam 3'),
                'RESPIRATORY': ('M4 · M5 · M6', 'Exam 2'),
                'GI': ('M11 · M12', 'Exam 5'), 'MUSCULOSKELETAL': ('M13', 'Final'),
                'SKIN + WOUND': ('M3', 'Exam 1'), 'NURSING CORE': ('M1', 'Exam 1'),
                'ENDOCRINE': ('M1', 'Exam 1'), 'NEURO': ('M1', 'Exam 1'),
                'IMMUNE': ('M1', 'Exam 1')},
    'NUR 175': {'MENTAL HEALTH': ('M9', 'Exam 3'), 'PHARMACOLOGY': ('M13', 'Final'),
                'NURSING CORE': ('M4', 'Exam 2'), 'NEURO': ('M12', 'Final')},
    'NUR 125': {'NURSING CORE': ('M1', 'Exam 1'), 'SKIN + WOUND': ('M5', 'Exam 2'),
                'RENAL + FLUID': ('M8', 'Exam 3'), 'GI': ('M9', 'Exam 3'),
                'RESPIRATORY': ('M7', 'Exam 3'), 'MUSCULOSKELETAL': ('M4', 'Exam 2'),
                'CARDIO': ('M1', 'Exam 1'), 'NEURO': ('M10', 'Exam 4'),
                'MENTAL HEALTH': ('M11', 'Exam 4'), 'PHARMACOLOGY': ('M2', 'Exam 1')},
    'NUR 234': {'MATERNAL': ('M14', 'Exam 4')},
    'NUR 235': {'PEDS': ('M14', 'Final')},
    'Pharmacology': {'PHARMACOLOGY': ('M1', 'Exam 1'), 'CARDIO': ('M9', 'Exam 5'),
                     'RENAL + FLUID': ('M11', 'Exam 6'), 'MENTAL HEALTH': ('M5', 'Exam 3'),
                     'ENDOCRINE': ('M8', 'Exam 5'), 'RESPIRATORY': ('M12', 'Exam 7'),
                     'GI': ('M13', 'Exam 7'), 'SKIN + WOUND': ('M6', 'Exam 4'),
                     'MUSCULOSKELETAL': ('M6', 'Exam 4'), 'NEURO': ('M7', 'Exam 4'),
                     'NURSING CORE': ('M1', 'Exam 1'), 'MATERNAL': ('M14', 'Final'),
                     'PEDS': ('M1', 'Exam 1')},
}

CARDSTART = re.compile(r'<div class="card[^"]*"[^>]*data-kind="[^"]*"[^>]*>')


def attr(card, key):
    m = re.search('data-' + key + r'="([^"]*)"', card)
    return m.group(1) if m else ''


def searchable(card):
    title = re.search(r'<h3>(.*?)</h3>', card, re.S)
    bits = [title.group(1) if title else '', attr(card, 'kw')]
    bits += re.findall(r'href="((?!http)[^"]+)"', card)
    return re.sub(r'<[^>]+>', ' ', ' '.join(bits)).lower()


def main():
    s = open(PAGE, encoding='utf-8').read()
    starts = [m.start() for m in CARDSTART.finditer(s)] + [len(s)]
    chunks = [s[starts[i]:starts[i + 1]] for i in range(len(starts) - 1)]

    tagged = 0
    filled = 0
    unmatched = []
    out = [s[:starts[0]]]
    for chunk in chunks:
        head_end = chunk.index('>') + 1
        head = chunk[:head_end]
        if attr(head, 'mod'):
            # already placed in a module, but the exam may still be blank
            if not attr(head, 'exam'):
                e = EXAM_OF.get(attr(head, 'cls'), {}).get(attr(head, 'mod'), '')
                if e:
                    head2 = head.replace('data-exam=""', f'data-exam="{e}"')
                    out.append(head2 + chunk[head_end:])
                    filled += 1
                    continue
            out.append(chunk)
            continue
        cls = attr(head, 'cls')
        rules = RULES.get(cls)
        text = searchable(chunk)
        mod = exam = ''
        if cls == 'NUR 198':
            mod, exam = nur198(text, attr(head, 'cat'))
        elif rules:
            for m, e, pat in rules:
                if re.search(pat, text):
                    mod, exam = m, e
                    break
            if not mod:
                mod, exam = BY_CAT.get(cls, {}).get(attr(head, 'cat'), ('', ''))
        if not mod:
            unmatched.append((cls, attr(head, 'cat'), text[:60]))
            out.append(chunk)
            continue
        new = head.replace('data-mod=""', f'data-mod="{mod}"')
        if not attr(head, 'exam'):
            new = new.replace('data-exam=""', f'data-exam="{exam}"')
        out.append(new + chunk[head_end:])
        tagged += 1

    if '--dry-run' not in sys.argv:
        open(PAGE, 'w', encoding='utf-8').write(''.join(out))
    print(f'tagged {tagged} cards, filled {filled} missing exams; '
          f'{len(unmatched)} still without a module')
    for u in unmatched[:20]:
        print('   ', u)


main()
