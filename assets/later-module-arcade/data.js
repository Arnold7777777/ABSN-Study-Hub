window.MODULE_ARCADE_DATA = {
  "version": "2026-10-08.1",
  "modules": [
    {
      "id": "nur234-m8",
      "course": "NUR 234",
      "module": 8,
      "topic": "Early Pregnancy Bleeding & Ectopic Pregnancy",
      "title": "Pregnancy Bleeding Detective",
      "icon": "🩺",
      "tagline": "Connect the location, bleeding pattern and warning signs.",
      "robot": {
        "src": "rustic-maya.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur234-m8.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur234-m8.html",
      "source": "../nur234-m8.html",
      "pairs": [
        {
          "category": "Location",
          "prompt": "Implantation outside the uterine cavity?",
          "answer": "Ectopic pregnancy",
          "id": "nur234-m8-p01"
        },
        {
          "category": "Location",
          "prompt": "Where does a tubal ectopic pregnancy implant?",
          "answer": "In a fallopian tube",
          "id": "nur234-m8-p02"
        },
        {
          "category": "Assessment",
          "prompt": "One-sided pelvic pain plus spotting in early pregnancy raises concern for what?",
          "answer": "Possible ectopic implantation",
          "id": "nur234-m8-p03"
        },
        {
          "category": "Assessment",
          "prompt": "Shoulder pain with a suspected ruptured ectopic may reflect what?",
          "answer": "Blood irritating the diaphragm",
          "id": "nur234-m8-p04"
        },
        {
          "category": "Emergency",
          "prompt": "Hypotension, tachycardia and fainting with pelvic pain suggest what?",
          "answer": "Hemorrhage with shock",
          "id": "nur234-m8-p05"
        },
        {
          "category": "Assessment",
          "prompt": "Which imaging test helps locate an early pregnancy?",
          "answer": "Transvaginal ultrasound",
          "id": "nur234-m8-p06"
        },
        {
          "category": "Follow-up",
          "prompt": "Which hormone is followed after ectopic treatment?",
          "answer": "Serial hCG",
          "id": "nur234-m8-p07"
        },
        {
          "category": "Medication",
          "prompt": "Which drug may treat a selected stable, unruptured ectopic?",
          "answer": "Methotrexate",
          "id": "nur234-m8-p08"
        },
        {
          "category": "Teaching",
          "prompt": "Which vitamin supplement needs review during methotrexate treatment?",
          "answer": "Folic acid",
          "id": "nur234-m8-p09"
        },
        {
          "category": "Access",
          "prompt": "Which access helps prepare for rapid fluids or blood if needed?",
          "answer": "Large-bore intravenous access",
          "id": "nur234-m8-p10"
        },
        {
          "category": "Bleeding",
          "prompt": "Classic painless late-pregnancy bleeding with a soft uterus?",
          "answer": "Placenta previa",
          "id": "nur234-m8-p11"
        },
        {
          "category": "Bleeding",
          "prompt": "Classic painful late-pregnancy bleeding with a tense uterus?",
          "answer": "Placental abruption",
          "id": "nur234-m8-p12"
        },
        {
          "category": "Safety",
          "prompt": "Suspected previa: which bedside exam is avoided until placental location is assessed?",
          "answer": "Digital vaginal examination",
          "id": "nur234-m8-p13"
        },
        {
          "category": "Assessment",
          "prompt": "Which organ's output can help reveal reduced perfusion?",
          "answer": "The kidneys: monitor urine output",
          "id": "nur234-m8-p14"
        },
        {
          "category": "Loss",
          "prompt": "Bleeding with a closed cervix and no passed tissue is called what?",
          "answer": "Threatened pregnancy loss",
          "id": "nur234-m8-p15"
        },
        {
          "category": "Communication",
          "prompt": "What familiar term can be used sensitively for spontaneous pregnancy loss?",
          "answer": "Miscarriage",
          "id": "nur234-m8-p16"
        },
        {
          "category": "Molar",
          "prompt": "Abnormal trophoblastic growth with grape-like vesicles?",
          "answer": "Hydatidiform mole",
          "id": "nur234-m8-p17"
        },
        {
          "category": "Molar",
          "prompt": "Why follow hCG after evacuation of a mole?",
          "answer": "Detect persistent trophoblastic disease",
          "id": "nur234-m8-p18"
        },
        {
          "category": "Molar",
          "prompt": "Why avoid pregnancy during the prescribed molar follow-up period?",
          "answer": "A new pregnancy can obscure the hCG trend",
          "id": "nur234-m8-p19"
        },
        {
          "category": "Molar",
          "prompt": "Which malignancy is a concern after molar pregnancy?",
          "answer": "Choriocarcinoma",
          "id": "nur234-m8-p20"
        },
        {
          "category": "Monitoring",
          "prompt": "What does weighing blood-soaked pads help estimate?",
          "answer": "Amount of blood loss",
          "id": "nur234-m8-p21"
        },
        {
          "category": "Assessment",
          "prompt": "What is the priority interpretation of bleeding with cramping at 10 weeks?",
          "answer": "Needs prompt pregnancy assessment",
          "id": "nur234-m8-p22"
        },
        {
          "category": "Risk",
          "prompt": "Which condition increases the risk of placental abruption?",
          "answer": "Maternal hypertension",
          "id": "nur234-m8-p23"
        },
        {
          "category": "Risk",
          "prompt": "Which injury can trigger placental separation?",
          "answer": "Blunt abdominal trauma",
          "id": "nur234-m8-p24"
        }
      ],
      "cases": [
        {
          "q": "A nurse reviews four clients in the early pregnancy clinic. Which client does the nurse assess first?",
          "opts": [
            "A client at 10 weeks with vaginal bleeding and cramping",
            "A client at 10 weeks reporting nausea in the mornings",
            "A client at 10 weeks reporting urinary frequency",
            "A client at 10 weeks who has not yet felt fetal movement"
          ],
          "ans": [
            0
          ],
          "why": "<b>First-trimester bleeding with cramping</b> is the priority finding, suggesting threatened miscarriage or ectopic pregnancy, and calls for ultrasound and hCG. Nausea, urinary frequency and absent fetal movement at 10 weeks are all expected.",
          "id": "nur234-m8-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "A client is discharged after methotrexate treatment for an unruptured ectopic pregnancy. Which statement indicates a need for further teaching?",
          "opts": [
            "I will keep taking my prenatal vitamin with folic acid",
            "I will return for repeat hCG levels until they are undetectable",
            "I will use reliable contraception for at least 3 months",
            "I will avoid intercourse until this has fully resolved"
          ],
          "ans": [
            0
          ],
          "why": "<b>Folic acid rescues the very cells methotrexate is killing</b>, so folic-acid-containing supplements are withheld here, even though folic acid is pushed everywhere else in maternity nursing. Serial hCG, 3 months of contraception and pelvic rest are all correct.",
          "id": "nur234-m8-q03",
          "type": "single",
          "sourceNumber": 3
        },
        {
          "q": "A nurse assesses a client with a suspected ectopic pregnancy. Which findings support this diagnosis? Select all that apply.",
          "opts": [
            "Sharp stabbing pain in one lower quadrant",
            "Painless bright red heavy bleeding",
            "Referred shoulder pain",
            "Scant vaginal spotting with a positive pregnancy test",
            "Uterus larger than expected for dates"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "Ectopic pregnancy presents with <b>unilateral sharp pain, adnexal tenderness, scant spotting with a positive test, and referred shoulder pain</b> when blood irritates the diaphragm. Painless bright red heavy bleeding suggests previa, and a uterus larger than dates suggests a molar pregnancy.",
          "id": "nur234-m8-q04",
          "type": "sata",
          "sourceNumber": 4
        },
        {
          "q": "A client arrives in the emergency department with a suspected unruptured ectopic pregnancy. She is alert with stable vital signs. Which action does the nurse take first?",
          "opts": [
            "Establish large-bore intravenous access",
            "Place her in Trendelenburg position",
            "Prepare her immediately for laparoscopic surgery",
            "Administer a folic acid supplement"
          ],
          "ans": [
            0
          ],
          "why": "<b>Large-bore IV access</b> comes first so fluids and blood can be given instantly if she ruptures, along with continuous vital signs and methotrexate as prescribed. Trendelenburg is not indicated, surgery is not automatic for an unruptured ectopic, and folic acid is contraindicated with methotrexate.",
          "id": "nur234-m8-q06",
          "type": "single",
          "sourceNumber": 6
        },
        {
          "q": "Which findings suggest a ruptured ectopic pregnancy requiring emergency care? Select all that apply.",
          "opts": [
            "Sudden severe one-sided pain",
            "Referred shoulder pain",
            "Blood pressure 88/50 mm Hg with a heart rate of 126/min",
            "Mild nausea in the morning",
            "Dizziness and syncope"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Rupture means intra-abdominal hemorrhage: pain, shock, and <b>referred shoulder pain</b> from blood irritating the diaphragm - a sign worth knowing because it seems unrelated to the pelvis. Morning nausea is ordinary early pregnancy.",
          "id": "nur234-m8-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A client is diagnosed with a hydatidiform mole. Which teaching points are correct? Select all that apply.",
          "opts": [
            "hCG levels will be followed until they are undetectable",
            "Pregnancy should be avoided for the recommended follow-up period",
            "There is a risk of choriocarcinoma",
            "The pregnancy can be carried to term with monitoring",
            "Reliable contraception is needed during follow-up"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "A molar pregnancy is <b>not a viable pregnancy</b> - it is evacuated. hCG is then tracked to zero because a <b>rising</b> hCG is how choriocarcinoma announces itself, and a new pregnancy would raise hCG and hide that signal. That is the entire reason contraception is required.",
          "id": "nur234-m8-q11",
          "type": "sata",
          "sourceNumber": 11
        },
        {
          "q": "A client at 34 weeks of gestation reports a sudden gush of bright red vaginal bleeding. She denies pain, and her uterus is soft and relaxed on palpation. Which action does the nurse take?",
          "opts": [
            "Perform a sterile vaginal examination to determine cervical dilation",
            "Withhold any vaginal examination and notify the provider",
            "Massage the fundus until it becomes firm",
            "Place the client in the Trendelenburg position"
          ],
          "ans": [
            1
          ],
          "why": "Painless bright red bleeding with a soft uterus points to <b>placenta previa</b>, and a vaginal exam can tear the placenta and cause catastrophic hemorrhage. Checking dilation feels like good assessment, but it is the one thing that is absolutely contraindicated here.",
          "id": "nur234-m8-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "A client admitted with placenta previa is being monitored. Her blood pressure and pulse are unchanged from admission, but her urine output has been steadily decreasing. How does the nurse interpret this finding?",
          "opts": [
            "It may reveal ongoing blood loss before the vital signs change",
            "It is an expected response to bed rest and requires no action",
            "It confirms the bleeding has stopped and perfusion is stable",
            "It indicates the client needs a vaginal exam to locate the bleeding source"
          ],
          "ans": [
            0
          ],
          "why": "In previa, <b>decreasing urine output can reveal blood loss before the vital signs do</b>, so it is an early warning rather than a benign finding. Stable vital signs are reassuring on the surface, which is exactly why relying on them here is the trap.",
          "id": "nur234-m8-q15",
          "type": "single",
          "sourceNumber": 15
        }
      ],
      "reflective": false
    },
    {
      "id": "nur234-m9",
      "course": "NUR 234",
      "module": 9,
      "topic": "Hypertensive Disorders & Magnesium Sulfate",
      "title": "Magnesium Safety Monitor",
      "icon": "🎛️",
      "tagline": "Watch the trend. Catch the safety clue.",
      "robot": {
        "src": "rustic-nurse.webp",
        "width": 427,
        "height": 512
      },
      "illustration": {
        "src": "nur234-m9.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur234-m9.html",
      "source": "../nur234-m9.html",
      "pairs": [
        {
          "category": "Disorders",
          "prompt": "New hypertension after 20 weeks without proteinuria or organ findings?",
          "answer": "Gestational hypertension",
          "id": "nur234-m9-p01"
        },
        {
          "category": "Disorders",
          "prompt": "Pregnancy hypertension with proteinuria or relevant organ involvement?",
          "answer": "Preeclampsia",
          "id": "nur234-m9-p02"
        },
        {
          "category": "Disorders",
          "prompt": "New seizures associated with preeclampsia?",
          "answer": "Eclampsia",
          "id": "nur234-m9-p03"
        },
        {
          "category": "HELLP",
          "prompt": "What does H in HELLP mean?",
          "answer": "Hemolysis",
          "id": "nur234-m9-p04"
        },
        {
          "category": "HELLP",
          "prompt": "What does EL in HELLP mean?",
          "answer": "Elevated liver enzymes",
          "id": "nur234-m9-p05"
        },
        {
          "category": "HELLP",
          "prompt": "What does LP in HELLP mean?",
          "answer": "Low platelets",
          "id": "nur234-m9-p06"
        },
        {
          "category": "Assessment",
          "prompt": "Persistent severe headache and visual changes require what?",
          "answer": "Prompt neurologic and obstetric reassessment",
          "id": "nur234-m9-p07"
        },
        {
          "category": "Assessment",
          "prompt": "Epigastric or right upper quadrant pain can signal involvement of which organ?",
          "answer": "Liver",
          "id": "nur234-m9-p08"
        },
        {
          "category": "Medication",
          "prompt": "What is magnesium sulfate's main role in severe preeclampsia?",
          "answer": "Seizure prevention",
          "id": "nur234-m9-p09"
        },
        {
          "category": "Medication",
          "prompt": "Which drug is the antidote for magnesium toxicity?",
          "answer": "Calcium gluconate",
          "id": "nur234-m9-p10"
        },
        {
          "category": "Monitoring",
          "prompt": "Which bedside reflex assessment matters during magnesium therapy?",
          "answer": "Deep tendon reflexes",
          "id": "nur234-m9-p11"
        },
        {
          "category": "Monitoring",
          "prompt": "Which breathing measurement is tracked during magnesium therapy?",
          "answer": "Respiratory rate",
          "id": "nur234-m9-p12"
        },
        {
          "category": "Monitoring",
          "prompt": "Why track urine output during magnesium therapy?",
          "answer": "Renal clearance affects magnesium accumulation",
          "id": "nur234-m9-p13"
        },
        {
          "category": "Safety",
          "prompt": "Absent reflexes during magnesium infusion raise what concern?",
          "answer": "Possible magnesium toxicity",
          "id": "nur234-m9-p14"
        },
        {
          "category": "Safety",
          "prompt": "What immediate medication action accompanies suspected magnesium toxicity?",
          "answer": "Stop the infusion and obtain urgent help",
          "id": "nur234-m9-p15"
        },
        {
          "category": "Support",
          "prompt": "What room environment reduces unnecessary stimulation?",
          "answer": "Quiet surroundings with dim lighting",
          "id": "nur234-m9-p16"
        },
        {
          "category": "Support",
          "prompt": "What protective plan is used for seizure risk?",
          "answer": "Seizure precautions",
          "id": "nur234-m9-p17"
        },
        {
          "category": "Medication",
          "prompt": "Which medication class treats elevated blood pressure?",
          "answer": "Antihypertensives",
          "id": "nur234-m9-p18"
        },
        {
          "category": "Preterm",
          "prompt": "Which antenatal corticosteroid promotes fetal lung maturation?",
          "answer": "Betamethasone",
          "id": "nur234-m9-p19"
        },
        {
          "category": "Preterm",
          "prompt": "Which beta-agonist may be used briefly to relax uterine muscle?",
          "answer": "Terbutaline",
          "id": "nur234-m9-p20"
        },
        {
          "category": "Monitoring",
          "prompt": "What maternal pulse change can occur with terbutaline?",
          "answer": "Tachycardia",
          "id": "nur234-m9-p21"
        },
        {
          "category": "Math",
          "prompt": "What time conversion comes before calculating mL per hour?",
          "answer": "Convert minutes to hours",
          "id": "nur234-m9-p22"
        },
        {
          "category": "Math",
          "prompt": "What is the pump-rate relationship?",
          "answer": "Volume divided by time in hours",
          "id": "nur234-m9-p23"
        },
        {
          "category": "Math",
          "prompt": "Study order: 100 mL over 30 minutes. Rate?",
          "answer": "200 mL/hr",
          "id": "nur234-m9-p24"
        }
      ],
      "cases": [
        {
          "q": "A client at 33 weeks has a BP of 162/112 and reports right upper quadrant pain. Which laboratory result best supports a diagnosis of HELLP syndrome?",
          "opts": [
            "Platelet count of 95,000/mm3",
            "Creatinine of 0.6 mg/dL",
            "Hemoglobin of 13.8 g/dL",
            "Uric acid of 3.1 mg/dL"
          ],
          "ans": [
            0
          ],
          "why": "HELLP is a <b>laboratory diagnosis</b>: hemolysis, elevated liver enzymes, and <b>platelets under 100,000</b>, so 95,000 qualifies. Creatinine is abnormal only above 1.1, making 0.6 normal, and hemoglobin falls in HELLP rather than rising as it does with the hemoconcentration of preeclampsia.",
          "id": "nur234-m9-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "Which laboratory findings define HELLP syndrome? Select all that apply.",
          "opts": [
            "Hemolysis",
            "Elevated liver enzymes",
            "Low platelets",
            "Elevated platelets",
            "Elevated hemoglobin"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "HELLP is its own acronym: <b>H</b>aemolysis, <b>E</b>levated <b>L</b>iver enzymes, <b>L</b>ow <b>P</b>latelets. It can occur with a blood pressure that is barely raised, which is why a pregnant client with right upper quadrant pain gets these labs regardless of how she looks.",
          "id": "nur234-m9-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "During a magnesium sulfate infusion, which medication does the nurse keep immediately available?",
          "opts": [
            "Calcium gluconate",
            "Naloxone",
            "Protamine sulfate",
            "Vitamin K"
          ],
          "ans": [
            0
          ],
          "why": "<b>Calcium gluconate</b> is the magnesium antidote and belongs at the bedside before the infusion starts, not fetched afterwards. Naloxone reverses opioids, protamine reverses heparin, vitamin K reverses warfarin - and pairing each drug with its antidote is worth a page in your own notes.",
          "id": "nur234-m9-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A client with severe preeclampsia is prescribed magnesium sulfate 4 g in 100 mL to infuse over 30 minutes. Which rate does the nurse program on the infusion pump?",
          "opts": [
            "50 mL/hr",
            "100 mL/hr",
            "200 mL/hr",
            "400 mL/hr"
          ],
          "ans": [
            2
          ],
          "why": "Volume divided by time in hours: <b>100 mL ÷ 0.5 hr = 200 mL/hr</b>. The tempting 100 mL/hr comes from entering the bag volume as though it ran over a full hour instead of 30 minutes.",
          "id": "nur234-m9-q11",
          "type": "single",
          "sourceNumber": 11
        },
        {
          "q": "A client at 26 weeks has a blood pressure of 146/92 mm Hg on two occasions 6 hours apart. There is no proteinuria and no other abnormal findings. Which condition does the nurse anticipate?",
          "opts": [
            "Gestational hypertension",
            "Chronic hypertension",
            "Preeclampsia",
            "Preeclampsia with severe features"
          ],
          "ans": [
            0
          ],
          "why": "New hypertension of <b>≥140/90 after 20 weeks on two occasions at least 4 hours apart with no proteinuria</b> is gestational hypertension, which resolves by 12 weeks postpartum. Preeclampsia is tempting because proteinuria is no longer required, but it still needs proteinuria <b>or</b> end-organ involvement, and this client has neither.",
          "id": "nur234-m9-q12",
          "type": "single",
          "sourceNumber": 12
        }
      ],
      "reflective": false
    },
    {
      "id": "nur234-m10",
      "course": "NUR 234",
      "module": 10,
      "topic": "Dysfunctional Labor, Uterine Rupture & Obstetric Drug Math",
      "title": "Labor Troubleshooting Lab",
      "icon": "💉",
      "tagline": "Keep the units visible, one calculation at a time.",
      "robot": {
        "src": "rustic-coach.webp",
        "width": 427,
        "height": 512
      },
      "illustration": {
        "src": "nur234-m10.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur234-m10.html",
      "source": "../nur234-m10.html",
      "pairs": [
        {
          "category": "Labor",
          "prompt": "Frequent, painful, poorly coordinated contractions describe what pattern?",
          "answer": "Hypertonic uterine activity",
          "id": "nur234-m10-p01"
        },
        {
          "category": "Labor",
          "prompt": "Why does the resting interval between contractions matter?",
          "answer": "It allows uteroplacental perfusion",
          "id": "nur234-m10-p02"
        },
        {
          "category": "Labor",
          "prompt": "Mismatch between fetal size and the maternal pelvis?",
          "answer": "Cephalopelvic disproportion",
          "id": "nur234-m10-p03"
        },
        {
          "category": "Emergency",
          "prompt": "Sudden tearing pain, loss of contractions and rising presenting part?",
          "answer": "Uterine rupture",
          "id": "nur234-m10-p04"
        },
        {
          "category": "Emergency",
          "prompt": "Why is fetal bradycardia with suspected rupture urgent?",
          "answer": "It may indicate compromised fetal oxygenation",
          "id": "nur234-m10-p05"
        },
        {
          "category": "Medication",
          "prompt": "Which infusion stimulates uterine contractions?",
          "answer": "Oxytocin",
          "id": "nur234-m10-p06"
        },
        {
          "category": "Medication",
          "prompt": "Which medication term means suppressing contractions?",
          "answer": "Tocolytic",
          "id": "nur234-m10-p07"
        },
        {
          "category": "Safety",
          "prompt": "Too many contractions during oxytocin infusion require what medication review?",
          "answer": "Stop the oxytocin infusion",
          "id": "nur234-m10-p08"
        },
        {
          "category": "Assessment",
          "prompt": "Which score describes cervical readiness for induction?",
          "answer": "Bishop score",
          "id": "nur234-m10-p09"
        },
        {
          "category": "Assessment",
          "prompt": "Cervical opening measured in centimeters?",
          "answer": "Dilation",
          "id": "nur234-m10-p10"
        },
        {
          "category": "Assessment",
          "prompt": "Cervical thinning measured as a percentage?",
          "answer": "Effacement",
          "id": "nur234-m10-p11"
        },
        {
          "category": "Assessment",
          "prompt": "Presenting part relative to the ischial spines?",
          "answer": "Station",
          "id": "nur234-m10-p12"
        },
        {
          "category": "Assisted birth",
          "prompt": "Required cervical state before vacuum-assisted birth?",
          "answer": "Fully dilated cervix",
          "id": "nur234-m10-p13"
        },
        {
          "category": "Assisted birth",
          "prompt": "Required membrane state before vacuum-assisted birth?",
          "answer": "Ruptured membranes",
          "id": "nur234-m10-p14"
        },
        {
          "category": "Assisted birth",
          "prompt": "Required descent status before assisted birth?",
          "answer": "Engaged presenting part",
          "id": "nur234-m10-p15"
        },
        {
          "category": "Assisted birth",
          "prompt": "Which organ is emptied before assisted vaginal birth?",
          "answer": "Urinary bladder",
          "id": "nur234-m10-p16"
        },
        {
          "category": "Cord",
          "prompt": "A pulsating cord below the presenting part indicates what?",
          "answer": "Umbilical cord prolapse",
          "id": "nur234-m10-p17"
        },
        {
          "category": "Cord",
          "prompt": "Why lift the presenting part off a prolapsed cord?",
          "answer": "Relieve cord compression",
          "id": "nur234-m10-p18"
        },
        {
          "category": "Shoulder",
          "prompt": "Head delivers then retracts against the perineum?",
          "answer": "Turtle sign",
          "id": "nur234-m10-p19"
        },
        {
          "category": "Shoulder",
          "prompt": "Maternal thigh hyperflexion for shoulder dystocia?",
          "answer": "McRoberts maneuver",
          "id": "nur234-m10-p20"
        },
        {
          "category": "Shoulder",
          "prompt": "Where is pressure applied during the shoulder dystocia maneuver?",
          "answer": "Above the pubic bone: suprapubic pressure",
          "id": "nur234-m10-p21"
        },
        {
          "category": "Math",
          "prompt": "How many milliunits are in one unit?",
          "answer": "1,000 milliunits",
          "id": "nur234-m10-p22"
        },
        {
          "category": "Math",
          "prompt": "How do mL per minute become mL per hour?",
          "answer": "Multiply by 60",
          "id": "nur234-m10-p23"
        },
        {
          "category": "Math",
          "prompt": "Study order: 3 mU/min; solution 20 mU/mL. Rate?",
          "answer": "9 mL/hr",
          "id": "nur234-m10-p24"
        }
      ],
      "cases": [
        {
          "q": "A provider prescribes oxytocin at 3 milliunits/min for labor augmentation. The pharmacy supplies 20 units of oxytocin in 1,000 mL of lactated Ringer's. How many mL/hr does the nurse set on the pump?",
          "opts": [
            "3 mL/hr",
            "9 mL/hr",
            "15 mL/hr",
            "30 mL/hr"
          ],
          "ans": [
            1
          ],
          "why": "20 units = 20,000 milliunits in 1,000 mL, so the bag is <b>20 milliunits/mL</b>. Then 3 milliunits/min divided by 20 milliunits/mL = 0.15 mL/min, and <b>0.15 x 60 = 9 mL/hr</b>. Skipping that final x60 leaves 0.15 and is the single most commonly missed step.",
          "id": "nur234-m10-q01",
          "type": "single",
          "sourceNumber": 1
        },
        {
          "q": "A client with severe preeclampsia is prescribed a magnesium sulfate loading dose of 6 g in 150 mL of D5W to infuse over 20 minutes. How many mL/hr does the nurse program?",
          "opts": [
            "150 mL/hr",
            "300 mL/hr",
            "450 mL/hr",
            "600 mL/hr"
          ],
          "ans": [
            2
          ],
          "why": "Rate equals volume divided by time <b>in hours</b>: 20 minutes = 20/60 = <b>0.333 hr</b>, so 150 divided by 0.333 = <b>450 mL/hr</b>. The same x60 conversion done as 150 x (60/20) gives 450; leaving time in minutes yields 7.5 and is the classic error.",
          "id": "nur234-m10-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "A client with a previous low transverse cesarean is in active labor when she reports sudden sharp abdominal pain. Her contractions stop, and the fetal heart rate drops to 90 bpm. Which action does the nurse take first?",
          "opts": [
            "Notify the provider immediately and prepare for surgery",
            "Reassure her that a pause between contractions is normal",
            "Encourage ambulation to restart the contraction pattern",
            "Increase the oxytocin infusion to reestablish labor"
          ],
          "ans": [
            0
          ],
          "why": "Sharp pain with <b>contractions ceasing and fetal bradycardia in a client with a uterine scar is rupture until proven otherwise</b>, a surgical emergency. Contractions stopping is not relief, and increasing oxytocin or ambulating wastes the minutes the fetus does not have.",
          "id": "nur234-m10-q03",
          "type": "single",
          "sourceNumber": 3
        },
        {
          "q": "A nurse performing a vaginal examination after rupture of membranes feels a pulsating cord in the vagina. Which action does the nurse take?",
          "opts": [
            "Gently replace the cord into the uterus",
            "Keep the gloved hand in place holding the presenting part off the cord",
            "Remove the hand and leave to call the provider",
            "Place the client flat and prepare for a vaginal birth"
          ],
          "ans": [
            1
          ],
          "why": "The nurse <b>keeps the gloved hand in place lifting the presenting part off the cord and does not leave the client</b>, calling for help while positioning her knee-chest or in Trendelenburg. Never push the cord back in, and cover a visible cord with warm sterile saline gauze.",
          "id": "nur234-m10-q06",
          "type": "single",
          "sourceNumber": 6
        },
        {
          "q": "A client in labor suddenly reports severe tearing abdominal pain, contractions stop, and the fetal presenting part retracts. What does the nurse suspect?",
          "opts": [
            "Precipitous labor",
            "Uterine rupture",
            "Normal transition",
            "Amniotic fluid embolism"
          ],
          "ans": [
            1
          ],
          "why": "<b>Pain, loss of contractions, and a presenting part that rises</b> is uterine rupture, and it is an immediate surgical emergency for mother and fetus. An amniotic fluid embolism presents instead with sudden dyspnea, cardiovascular collapse and DIC, without the tearing pain.",
          "id": "nur234-m10-q08",
          "type": "single",
          "sourceNumber": 8
        },
        {
          "q": "A provider prescribes oxytocin 2 milliunits/min. The bag contains 30 units in 500 mL. What rate in mL/hr does the nurse set?",
          "opts": [
            "1 mL/hr",
            "2 mL/hr",
            "4 mL/hr",
            "6 mL/hr"
          ],
          "ans": [
            1
          ],
          "why": "30 units in 500 mL is 30,000 milliunits in 500 mL, which is <b>60 milliunits per mL</b>. At 2 milliunits/min the client needs 120 milliunits/hr, and 120 ÷ 60 = <b>2 mL/hr</b>. Converting units to milliunits first is what keeps this from going wrong.",
          "id": "nur234-m10-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "Which findings indicate shoulder dystocia? Select all that apply.",
          "opts": [
            "The head delivers then retracts against the perineum",
            "The chin is difficult to deliver",
            "Delivery of the shoulders is delayed after the head",
            "Rapid uncomplicated delivery of the body",
            "External rotation does not occur"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "The <b>turtle sign</b> - the head delivering then pulling back - is the giveaway, and the shoulders will not follow. The response is <b>McRoberts</b> (hyperflexing the mother's thighs) and suprapubic pressure. <b>Never fundal pressure</b>, which drives the shoulder harder against the pubic bone.",
          "id": "nur234-m10-q11",
          "type": "sata",
          "sourceNumber": 11
        },
        {
          "q": "A provider plans a vacuum-assisted birth for a client with a prolonged second stage. Which conditions must be met before the procedure? Select all that apply.",
          "opts": [
            "The cervix is fully dilated",
            "The membranes are ruptured",
            "The presenting part is engaged",
            "The bladder is empty",
            "An epidural is in place"
          ],
          "ans": [
            0,
            1,
            2,
            3
          ],
          "why": "Forceps or vacuum requires a <b>fully dilated cervix, ruptured membranes, an engaged presenting part, and an empty bladder</b>, and the main indication is a prolonged second stage. Anesthesia is often present, which makes it the tempting fifth answer, but it is not one of the prerequisites.",
          "id": "nur234-m10-q16",
          "type": "sata",
          "sourceNumber": 16
        }
      ],
      "reflective": false
    },
    {
      "id": "nur234-m11",
      "course": "NUR 234",
      "module": 11,
      "topic": "Postpartum Assessment & Hemorrhage",
      "title": "Postpartum Rounds",
      "icon": "🛏️",
      "tagline": "Notice tone, position and bleeding on your postpartum rounds.",
      "robot": {
        "src": "rustic-alex.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur234-m11.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur234-m11.html",
      "source": "../nur234-m11.html",
      "pairs": [
        {
          "category": "Assessment",
          "prompt": "The upper portion of the uterus assessed after birth?",
          "answer": "Fundus",
          "id": "nur234-m11-p01"
        },
        {
          "category": "Assessment",
          "prompt": "A soft, boggy postpartum uterus suggests what?",
          "answer": "Uterine atony",
          "id": "nur234-m11-p02"
        },
        {
          "category": "Assessment",
          "prompt": "A high fundus displaced right suggests what contributor?",
          "answer": "Bladder distension",
          "id": "nur234-m11-p03"
        },
        {
          "category": "Assessment",
          "prompt": "Ongoing bright bleeding with a firm fundus suggests what?",
          "answer": "Genital tract trauma or laceration",
          "id": "nur234-m11-p04"
        },
        {
          "category": "Assessment",
          "prompt": "Severe focal perineal pressure with concealed bleeding suggests what?",
          "answer": "Hematoma",
          "id": "nur234-m11-p05"
        },
        {
          "category": "Recovery",
          "prompt": "The uterus returning toward its prepregnancy size?",
          "answer": "Involution",
          "id": "nur234-m11-p06"
        },
        {
          "category": "Recovery",
          "prompt": "Typical direction of the fundal trend during recovery?",
          "answer": "Downward toward the pelvis",
          "id": "nur234-m11-p07"
        },
        {
          "category": "Lochia",
          "prompt": "Early red postpartum discharge?",
          "answer": "Lochia rubra",
          "id": "nur234-m11-p08"
        },
        {
          "category": "Lochia",
          "prompt": "Later pinkish-brown postpartum discharge?",
          "answer": "Lochia serosa",
          "id": "nur234-m11-p09"
        },
        {
          "category": "Lochia",
          "prompt": "Late yellow-white postpartum discharge?",
          "answer": "Lochia alba",
          "id": "nur234-m11-p10"
        },
        {
          "category": "REEDA",
          "prompt": "R in the wound-assessment acronym?",
          "answer": "Redness",
          "id": "nur234-m11-p11"
        },
        {
          "category": "REEDA",
          "prompt": "First E in the wound-assessment acronym?",
          "answer": "Edema",
          "id": "nur234-m11-p12"
        },
        {
          "category": "REEDA",
          "prompt": "Second E in the wound-assessment acronym?",
          "answer": "Ecchymosis",
          "id": "nur234-m11-p13"
        },
        {
          "category": "REEDA",
          "prompt": "D in the wound-assessment acronym?",
          "answer": "Discharge",
          "id": "nur234-m11-p14"
        },
        {
          "category": "REEDA",
          "prompt": "A in the wound-assessment acronym?",
          "answer": "Approximation of wound edges",
          "id": "nur234-m11-p15"
        },
        {
          "category": "Medication",
          "prompt": "Suckling releases which uterine-contracting hormone?",
          "answer": "Oxytocin",
          "id": "nur234-m11-p16"
        },
        {
          "category": "Medication",
          "prompt": "Which uterotonic requires particular caution with hypertension?",
          "answer": "Methylergonovine",
          "id": "nur234-m11-p17"
        },
        {
          "category": "Breast",
          "prompt": "Tender red breast area with fever suggests what?",
          "answer": "Mastitis",
          "id": "nur234-m11-p18"
        },
        {
          "category": "Circulation",
          "prompt": "One warm, swollen, painful calf raises concern for what?",
          "answer": "Deep vein thrombosis",
          "id": "nur234-m11-p19"
        },
        {
          "category": "Mental health",
          "prompt": "Persistent low mood affecting function after birth suggests what?",
          "answer": "Postpartum depression",
          "id": "nur234-m11-p20"
        },
        {
          "category": "Mental health",
          "prompt": "Hallucinations or delusions after birth raise concern for what emergency?",
          "answer": "Postpartum psychosis",
          "id": "nur234-m11-p21"
        },
        {
          "category": "Support",
          "prompt": "What direct safety assessment is needed with severe postpartum mental symptoms?",
          "answer": "Ask about thoughts of harming self or baby",
          "id": "nur234-m11-p22"
        },
        {
          "category": "Monitoring",
          "prompt": "Saturating a pad rapidly requires what response?",
          "answer": "Immediate bleeding assessment and escalation",
          "id": "nur234-m11-p23"
        },
        {
          "category": "Comfort",
          "prompt": "Which water-based measure is taught for perineal soreness after the initial cold-care period?",
          "answer": "Warm sitz bath",
          "id": "nur234-m11-p24"
        }
      ],
      "cases": [
        {
          "q": "A client 3 hours postpartum has a firm midline fundus at the umbilicus, yet a steady trickle of bright red blood without clots continues. Which action does the nurse take?",
          "opts": [
            "Massage the fundus vigorously",
            "Inspect the perineum, vagina and cervix for a laceration",
            "Encourage her to void and reassess",
            "Document the finding as normal lochia rubra"
          ],
          "ans": [
            1
          ],
          "why": "A <b>firm fundus with continued bleeding means the uterus is not the source</b>, so look for a laceration or hematoma, classically a bright red continuous trickle without clots. Massage will not help a uterus that is already contracted, and this is not normal lochia.",
          "id": "nur234-m11-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "Thirty minutes after a vaginal birth, a client reports severe, unrelenting rectal and perineal pressure and pain. Which action does the nurse take first?",
          "opts": [
            "Administer the prescribed oral analgesic",
            "Inspect the perineum for a hematoma",
            "Apply a warm sitz bath",
            "Reposition her and dim the lights"
          ],
          "ans": [
            1
          ],
          "why": "Severe perineal pain shortly after birth means <b>assess for a hematoma before medicating or applying anything</b>, because assessment precedes intervention and circulation precedes comfort. Analgesia would mask an expanding concealed blood loss.",
          "id": "nur234-m11-q03",
          "type": "single",
          "sourceNumber": 3
        },
        {
          "q": "A client is 48 hours postpartum. Where does the nurse expect to find the fundus?",
          "opts": [
            "At the level of the umbilicus, midline",
            "About 2 cm below the umbilicus, midline",
            "About 2 cm above the umbilicus, midline",
            "Halfway between the umbilicus and the symphysis"
          ],
          "ans": [
            1
          ],
          "why": "The fundus rises to the umbilicus at about 1 hour, then descends roughly <b>1 cm per day</b>, so at 48 hours it should be about 2 cm below the umbilicus and midline. It reaches halfway to the symphysis by about day 6 and is no longer palpable after about 2 weeks.",
          "id": "nur234-m11-q05",
          "type": "single",
          "sourceNumber": 5
        },
        {
          "q": "Four weeks ago a client was started on an antidepressant and referred for counseling for postpartum depression. At the 6-week visit, which findings indicate the treatment plan is working?",
          "opts": [
            "She naps while the newborn sleeps and says she wakes up rested.",
            "She holds and feeds the newborn and describes her as fun to be around.",
            "She kept both follow-up visits and started going to a parent support group.",
            "She stopped the medication as soon as she started feeling better.",
            "She says the newborn would be better off being raised by someone else.",
            "She has lost 14 lb since the last visit and skips most meals."
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Sleeping when the newborn sleeps, warm talk about the baby, and follow-through on visits and support groups are the outcomes this plan is aiming for. Stopping the drug early is a common relapse trap; antidepressants are continued as prescribed even after the mood lifts. Saying the newborn belongs with someone else is rejection of the infant, and rapid weight loss with skipped meals is another red flag, so both mean the client is getting worse and needs the provider now. Ask her directly about thoughts of harming herself or the baby.",
          "id": "nur234-m11-q07",
          "type": "sata",
          "sourceNumber": 7
        },
        {
          "q": "Which findings in the postpartum period require immediate reporting? Select all that apply.",
          "opts": [
            "Saturating a perineal pad in under 15 minutes",
            "A unilateral warm, red, painful calf",
            "Temperature 38.4° C on day three",
            "Lochia rubra on day two",
            "A fundus that will not stay firm despite massage"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Pad saturation under 15 minutes and a fundus that will not firm up are <b>hemorrhage</b>. A hot painful calf suggests DVT, and pregnancy is a hypercoagulable state. A fever after the first 24 hours suggests infection. <b>Lochia rubra on day two is normal</b> - it progresses rubra, serosa, alba over weeks.",
          "id": "nur234-m11-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A client asks why she is having strong cramps while breastfeeding on day two. What is the nurse's best explanation?",
          "opts": [
            "\"This suggests a uterine infection.\"",
            "\"Suckling releases oxytocin, which contracts the uterus and reduces bleeding.\"",
            "\"You should stop breastfeeding until the cramping settles.\"",
            "\"This means the baby is not latching correctly.\""
          ],
          "ans": [
            1
          ],
          "why": "Afterpains are <b>the uterus doing its job</b>: suckling triggers oxytocin, the uterus clamps down, and bleeding drops. They are stronger in multiparas and with breastfeeding. Reframing them as useful rather than alarming is often all a client needs to keep going.",
          "id": "nur234-m11-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A client is 36 hours after a vaginal birth with an episiotomy and asks what will help her perineal soreness now. Which measure should the nurse recommend?",
          "opts": [
            "A warm sitz bath for 15–20 minutes",
            "An ice pack to the perineum for the next 24 hours",
            "Nothing until the provider orders an analgesic",
            "Alternating ice and heat every hour around the clock"
          ],
          "ans": [
            0
          ],
          "why": "Ice is used for the <b>first 24 hours</b>; after that the answer is a warm sitz bath for 15–20 minutes. Continuing ice at 36 hours is the standing distractor — reversing the ice-then-heat order is a classic trap.",
          "id": "nur234-m11-q11",
          "type": "single",
          "sourceNumber": 11
        },
        {
          "q": "A client with postpartum hemorrhage has an infusion of oxytocin 20 units in 1,000 mL of fluid running at 60 mL/hr. How many units of oxytocin is she receiving each hour?",
          "opts": [
            "0.12 units/hr",
            "1.2 units/hr",
            "12 units/hr",
            "20 units/hr"
          ],
          "ans": [
            1
          ],
          "why": "60 × 20 ÷ 1,000 = <b>1.2 units/hr</b>. The 12 units/hr option comes from misplacing the decimal, and 20 units/hr is the total in the bag rather than the hourly dose.",
          "id": "nur234-m11-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "Bleeding continues after fundal massage and after a postpartum client has emptied her bladder. The provider orders methylergonovine IM. The client's blood pressure is 168/98. Which action should the nurse take?",
          "opts": [
            "Administer the dose, since the bladder is already empty",
            "Withhold the dose and notify the provider",
            "Administer the dose and recheck the blood pressure in 15 minutes",
            "Delay all treatment and reassess the fundus in 30 minutes"
          ],
          "ans": [
            1
          ],
          "why": "Methylergonovine is <b>contraindicated in hypertension</b>, so the nurse holds it and notifies the provider. Giving it is tempting because the sequence is correct — bleeding persisting after the bladder is empty is exactly when this drug is used — but this client's blood pressure makes that specific drug unsafe.",
          "id": "nur234-m11-q13",
          "type": "single",
          "sourceNumber": 13
        }
      ],
      "reflective": false
    },
    {
      "id": "nur234-m12",
      "course": "NUR 234",
      "module": 12,
      "topic": "The Normal Newborn & Thermoregulation",
      "title": "Keep Baby Warm",
      "icon": "🧣",
      "tagline": "Find the four ways a newborn loses heat.",
      "robot": {
        "src": "rustic-sam.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur234-m12.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur234-m12.html",
      "source": "../nur234-m12.html",
      "pairs": [
        {
          "category": "Heat loss",
          "prompt": "Heat lost by touching a cold scale?",
          "answer": "Conduction",
          "id": "nur234-m12-p01"
        },
        {
          "category": "Heat loss",
          "prompt": "Heat lost as water dries from skin?",
          "answer": "Evaporation",
          "id": "nur234-m12-p02"
        },
        {
          "category": "Heat loss",
          "prompt": "Heat lost to a nearby cold window without contact?",
          "answer": "Radiation",
          "id": "nur234-m12-p03"
        },
        {
          "category": "Heat loss",
          "prompt": "Heat carried away by moving air?",
          "answer": "Convection",
          "id": "nur234-m12-p04"
        },
        {
          "category": "Prevention",
          "prompt": "How can wet-skin heat loss be reduced?",
          "answer": "Dry the newborn and replace wet linens",
          "id": "nur234-m12-p05"
        },
        {
          "category": "Prevention",
          "prompt": "How can scale-contact heat loss be reduced?",
          "answer": "Prepare a warm, padded weighing surface",
          "id": "nur234-m12-p06"
        },
        {
          "category": "Prevention",
          "prompt": "How can draft-related heat loss be reduced?",
          "answer": "Move away from air currents",
          "id": "nur234-m12-p07"
        },
        {
          "category": "Prevention",
          "prompt": "How can nearby-window heat loss be reduced?",
          "answer": "Place the bassinet away from cold surfaces",
          "id": "nur234-m12-p08"
        },
        {
          "category": "Physiology",
          "prompt": "What tissue supports newborn heat production?",
          "answer": "Brown fat",
          "id": "nur234-m12-p09"
        },
        {
          "category": "Physiology",
          "prompt": "Heat production without shivering is called what?",
          "answer": "Non-shivering thermogenesis",
          "id": "nur234-m12-p10"
        },
        {
          "category": "Assessment",
          "prompt": "Which score uses color, pulse, grimace, activity and respiration?",
          "answer": "Apgar",
          "id": "nur234-m12-p11"
        },
        {
          "category": "Assessment",
          "prompt": "Routine initial times for Apgar scoring?",
          "answer": "One and five minutes after birth",
          "id": "nur234-m12-p12"
        },
        {
          "category": "Assessment",
          "prompt": "Maximum total Apgar score?",
          "answer": "10 points",
          "id": "nur234-m12-p13"
        },
        {
          "category": "Scalp",
          "prompt": "Edema that crosses cranial suture lines?",
          "answer": "Caput succedaneum",
          "id": "nur234-m12-p14"
        },
        {
          "category": "Scalp",
          "prompt": "Subperiosteal blood collection limited by suture lines?",
          "answer": "Cephalohematoma",
          "id": "nur234-m12-p15"
        },
        {
          "category": "Skin",
          "prompt": "Bluish hands and feet with a pink central body?",
          "answer": "Acrocyanosis",
          "id": "nur234-m12-p16"
        },
        {
          "category": "Skin",
          "prompt": "Tiny white papules on the nose?",
          "answer": "Milia",
          "id": "nur234-m12-p17"
        },
        {
          "category": "Mouth",
          "prompt": "Small benign white cysts on the palate?",
          "answer": "Epstein pearls",
          "id": "nur234-m12-p18"
        },
        {
          "category": "Reflexes",
          "prompt": "Turning toward a cheek touch?",
          "answer": "Rooting reflex",
          "id": "nur234-m12-p19"
        },
        {
          "category": "Reflexes",
          "prompt": "Arms extend then draw inward with a startle?",
          "answer": "Moro reflex",
          "id": "nur234-m12-p20"
        },
        {
          "category": "Reflexes",
          "prompt": "Fingers close around an object placed in the palm?",
          "answer": "Palmar grasp",
          "id": "nur234-m12-p21"
        },
        {
          "category": "Assessment",
          "prompt": "A sunken fontanel can suggest what?",
          "answer": "Dehydration",
          "id": "nur234-m12-p22"
        },
        {
          "category": "Prophylaxis",
          "prompt": "Which injection supports clotting in the newborn?",
          "answer": "Vitamin K",
          "id": "nur234-m12-p23"
        },
        {
          "category": "Respiratory",
          "prompt": "Flaring, grunting and retractions indicate what?",
          "answer": "Increased work of breathing",
          "id": "nur234-m12-p24"
        }
      ],
      "cases": [
        {
          "q": "A newborn has a scalp swelling that crosses the suture lines and was present at birth. How does the nurse document this finding?",
          "opts": [
            "Cephalohematoma, which raises the risk of jaundice",
            "Caput succedaneum, which resolves in a few days",
            "Molding, which requires no documentation",
            "A subgaleal hemorrhage requiring immediate surgery"
          ],
          "ans": [
            1
          ],
          "why": "<b>Caput succedaneum crosses suture lines</b> and resolves within days; a cephalohematoma is bounded by sutures, does <b>not</b> cross them, and carries a higher jaundice risk as the blood breaks down. Whether it crosses the suture line is the entire discrimination.",
          "id": "nur234-m12-q01",
          "type": "single",
          "sourceNumber": 1
        },
        {
          "q": "A term newborn has just been delivered vaginally and is crying vigorously. Which action does the nurse take first?",
          "opts": [
            "Administer vitamin K in the vastus lateralis",
            "Dry the newborn thoroughly and remove the wet linens",
            "Apply erythromycin ointment to both eyes",
            "Obtain a rectal temperature"
          ],
          "ans": [
            1
          ],
          "why": "<b>Drying immediately</b> prevents evaporative heat loss, the largest immediate threat to a wet newborn, and cold stress drives oxygen demand, acidosis and hypoglycemia. Vitamin K and eye prophylaxis follow, and rectal temperatures are avoided in newborns.",
          "id": "nur234-m12-q03",
          "type": "single",
          "sourceNumber": 3
        },
        {
          "q": "A nurse examines a 12-hour-old newborn. Which findings are expected variations requiring no intervention? Select all that apply.",
          "opts": [
            "Acrocyanosis of the hands and feet",
            "Tiny white papules across the nose",
            "Jaundice of the face and sclerae",
            "Small white cysts on the hard palate",
            "A bulging anterior fontanel at rest"
          ],
          "ans": [
            0,
            1,
            3
          ],
          "why": "Acrocyanosis, milia and Epstein pearls are <b>normal newborn findings</b>. Jaundice appearing <b>before 24 hours is pathologic</b>, and a bulging fontanel at rest suggests increased intracranial pressure; both require reporting.",
          "id": "nur234-m12-q04",
          "type": "sata",
          "sourceNumber": 4
        },
        {
          "q": "A nurse assesses four newborns. Which finding requires immediate follow-up?",
          "opts": [
            "Respiratory rate of 54/min",
            "A pause in breathing lasting 25 seconds",
            "Apical pulse of 148 beats/min",
            "Axillary temperature of 37.0 C"
          ],
          "ans": [
            1
          ],
          "why": "Apnea lasting <b>more than 20 seconds is pathologic</b> and requires evaluation. Respirations of 30 to 60, an apical pulse of 110 to 160, and an axillary temperature of 36.5 to 37.5 C are all within normal newborn ranges.",
          "id": "nur234-m12-q05",
          "type": "single",
          "sourceNumber": 5
        },
        {
          "q": "A newborn's Apgar at 1 minute is: heart rate 130, weak irregular cry, some flexion, grimace to suction, body pink with blue hands and feet. What is the score?",
          "opts": [
            "5",
            "6",
            "7",
            "8"
          ],
          "ans": [
            1
          ],
          "why": "Heart rate over 100 scores <b>2</b>; a weak irregular cry <b>1</b>; some flexion <b>1</b>; grimace <b>1</b>; acrocyanosis (pink body, blue extremities) <b>1</b>. Total <b>6</b>. <b>Acrocyanosis is normal</b> in the first day and never scores 2, which is where most of the arithmetic goes wrong.",
          "id": "nur234-m12-q07",
          "type": "single",
          "sourceNumber": 7
        },
        {
          "q": "Which newborn findings are expected? Select all that apply.",
          "opts": [
            "Acrocyanosis in the first 24 hours",
            "Milia across the nose",
            "Molding of the head after vaginal birth",
            "Central cyanosis of the lips and tongue",
            "Mongolian spots on the lower back"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Acrocyanosis, milia, molding and Mongolian spots are all normal newborn findings that alarm parents and need explaining rather than treating. <b>Central cyanosis - the lips, tongue and trunk - is never normal</b> and means a cardiac or respiratory problem.",
          "id": "nur234-m12-q08",
          "type": "sata",
          "sourceNumber": 8
        },
        {
          "q": "Which nursing actions prevent newborn heat loss? Select all that apply.",
          "opts": [
            "Dry the newborn immediately and remove wet linens",
            "Place a hat on the head",
            "Place the newborn skin-to-skin with the mother",
            "Place the bassinet near an outside window",
            "Pre-warm surfaces before laying the newborn down"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Each action blocks one route: drying stops <b>evaporation</b>, a hat and skin-to-skin stop <b>radiation and convection</b>, pre-warming stops <b>conduction</b>. A window is a cold surface that pulls radiant heat away. Newborns cannot shiver, so they burn brown fat instead - which costs glucose and oxygen they cannot spare.",
          "id": "nur234-m12-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A nurse is preparing vitamin K for a newborn who is 45 minutes old and who is also due for the hepatitis B vaccine. Which action is correct?",
          "opts": [
            "Give 0.5-1 mg IM into the vastus lateralis, using a different thigh from the hepatitis B vaccine",
            "Give 0.5-1 mg IM into the deltoid, and give the hepatitis B vaccine at the same site",
            "Give the dose subcutaneously into the anterior thigh to spare the muscle",
            "Hold the dose until about day 7, when gut flora begin producing vitamin K"
          ],
          "ans": [
            0
          ],
          "why": "Vitamin K 0.5-1 mg is given <b>IM into the vastus lateralis</b>, in a <b>different thigh</b> from the hepatitis B vaccine. Waiting until day 7 is the tempting distractor, but the reason gut flora do not make vitamin K until about day 7 is exactly why the injection is given now.",
          "id": "nur234-m12-q11",
          "type": "single",
          "sourceNumber": 11
        },
        {
          "q": "A nurse is giving erythromycin eye ointment to a newborn shortly after birth. Which actions are correct? Select all that apply.",
          "opts": [
            "Apply the ointment to both lower conjunctival sacs",
            "Apply from the inner canthus toward the outer canthus",
            "Flush the eyes with sterile saline after applying the ointment",
            "Delay the ointment up to one hour so the parents can bond with the newborn",
            "Save the remaining ointment in the tube for a repeat dose"
          ],
          "ans": [
            0,
            1,
            3
          ],
          "why": "Erythromycin goes into <b>both lower conjunctival sacs</b>, applied <b>inner to outer canthus</b>, within 24 hours, and it may be delayed up to an hour for bonding. Saving the tube is the trap: it is a <b>single-dose</b> tube, and nothing in the routine calls for flushing the eyes afterward.",
          "id": "nur234-m12-q15",
          "type": "sata",
          "sourceNumber": 15
        }
      ],
      "reflective": false
    },
    {
      "id": "nur234-m13",
      "course": "NUR 234",
      "module": 13,
      "topic": "Newborn Feeding",
      "title": "Newborn Feeding Coach",
      "icon": "🍼",
      "tagline": "Practice helpful, responsive feeding conversations.",
      "robot": {
        "src": "rustic-jordan.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur234-m13.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur234-m13.html",
      "source": "../nur234-m13.html",
      "pairs": [
        {
          "category": "Feeding",
          "prompt": "First milk, rich in protective antibodies?",
          "answer": "Colostrum",
          "id": "nur234-m13-p01"
        },
        {
          "category": "Feeding",
          "prompt": "Milk stage between colostrum and mature milk?",
          "answer": "Transitional milk",
          "id": "nur234-m13-p02"
        },
        {
          "category": "Feeding",
          "prompt": "Which antibody is prominent in human milk?",
          "answer": "Secretory IgA",
          "id": "nur234-m13-p03"
        },
        {
          "category": "Cues",
          "prompt": "Turning toward the breast or cheek touch is which hunger cue?",
          "answer": "Rooting",
          "id": "nur234-m13-p04"
        },
        {
          "category": "Cues",
          "prompt": "Crying is an early or late hunger cue?",
          "answer": "Late hunger cue",
          "id": "nur234-m13-p05"
        },
        {
          "category": "Technique",
          "prompt": "First observation when breastfeeding is painful or ineffective?",
          "answer": "Latch and feeding technique",
          "id": "nur234-m13-p06"
        },
        {
          "category": "Technique",
          "prompt": "How is suction released before removing a baby from the breast?",
          "answer": "A clean finger at the corner of the mouth",
          "id": "nur234-m13-p07"
        },
        {
          "category": "Assessment",
          "prompt": "What should be followed over time to judge infant growth?",
          "answer": "Weight trend",
          "id": "nur234-m13-p08"
        },
        {
          "category": "Assessment",
          "prompt": "What diaper measure helps judge hydration?",
          "answer": "Wet diaper count",
          "id": "nur234-m13-p09"
        },
        {
          "category": "Assessment",
          "prompt": "What sound suggests milk transfer during a feed?",
          "answer": "Audible swallowing",
          "id": "nur234-m13-p10"
        },
        {
          "category": "Comfort",
          "prompt": "Painfully full breasts from milk accumulation?",
          "answer": "Engorgement",
          "id": "nur234-m13-p11"
        },
        {
          "category": "Comfort",
          "prompt": "What feeding pattern helps reduce milk stasis?",
          "answer": "Frequent effective milk removal",
          "id": "nur234-m13-p12"
        },
        {
          "category": "Maternal",
          "prompt": "Which hormone causes milk ejection?",
          "answer": "Oxytocin",
          "id": "nur234-m13-p13"
        },
        {
          "category": "Maternal",
          "prompt": "What postpartum uterine process does breastfeeding support?",
          "answer": "Uterine involution",
          "id": "nur234-m13-p14"
        },
        {
          "category": "Formula",
          "prompt": "Why avoid microwaving a bottle?",
          "answer": "Uneven heating can create hot spots",
          "id": "nur234-m13-p15"
        },
        {
          "category": "Formula",
          "prompt": "Why avoid propping a bottle?",
          "answer": "It interferes with safe, responsive feeding",
          "id": "nur234-m13-p16"
        },
        {
          "category": "Formula",
          "prompt": "What happens to formula left in a used bottle?",
          "answer": "Discard according to safe preparation guidance",
          "id": "nur234-m13-p17"
        },
        {
          "category": "Formula",
          "prompt": "Why hold the infant during bottle-feeding?",
          "answer": "Observe cues and support paced feeding",
          "id": "nur234-m13-p18"
        },
        {
          "category": "Teaching",
          "prompt": "Does a healthy young newborn need extra plain water?",
          "answer": "No supplemental water",
          "id": "nur234-m13-p19"
        },
        {
          "category": "Teaching",
          "prompt": "Typical daily breastfeeding frequency in early newborn care?",
          "answer": "At least 8–12 feeds per 24 hours",
          "id": "nur234-m13-p20"
        },
        {
          "category": "Math",
          "prompt": "To calculate mg per dose from a per-dose order, multiply what?",
          "answer": "Kilograms by mg/kg/dose",
          "id": "nur234-m13-p21"
        },
        {
          "category": "Math",
          "prompt": "Study order: 3.4 kg at 15 mg/kg/dose. Amount?",
          "answer": "51 mg per dose",
          "id": "nur234-m13-p22"
        },
        {
          "category": "Math",
          "prompt": "Study requirement: 4 kg at 100 kcal/kg/day. Total?",
          "answer": "400 kcal per day",
          "id": "nur234-m13-p23"
        },
        {
          "category": "Math",
          "prompt": "Study intake: 400 kcal/day at 20 kcal/oz, divided into 8 feeds?",
          "answer": "2.5 oz per feed",
          "id": "nur234-m13-p24"
        }
      ],
      "cases": [
        {
          "q": "A client 3 days postpartum has firm, painfully full breasts. She has been feeding her newborn about every 5 hours to let her breasts fill up. Which instruction does the nurse give?",
          "opts": [
            "Feed the newborn every 2 to 3 hours, at least 8 to 12 times a day",
            "Continue spacing feedings so the breasts can refill",
            "Pump and discard milk for 24 hours to reduce the swelling",
            "Bind the breasts and stop feeding until the fullness resolves"
          ],
          "ans": [
            0
          ],
          "why": "Engorgement results from <b>infrequent emptying</b>, so more frequent feeding is the treatment, not less. Spacing feedings, discarding milk and binding all worsen stasis; cold packs between feeds are comfort measures only, not the priority intervention.",
          "id": "nur234-m13-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "A newborn weighs 4 kg and requires 100 kcal/kg/day. Formula provides 20 kcal/oz and the newborn feeds 8 times daily. How many ounces does the newborn need per feeding?",
          "opts": [
            "1.5 oz",
            "2 oz",
            "2.5 oz",
            "3 oz"
          ],
          "ans": [
            2
          ],
          "why": "4 kg x 100 kcal/kg/day = <b>400 kcal/day</b>; 400 divided by 20 kcal/oz = <b>20 oz/day</b>; 20 oz divided by 8 feedings = <b>2.5 oz per feeding</b>. Stopping at the daily total instead of dividing by the number of feedings is the usual mistake.",
          "id": "nur234-m13-q03",
          "type": "single",
          "sourceNumber": 3
        },
        {
          "q": "A nurse evaluates whether a 5-day-old breastfed newborn is feeding adequately. Which findings indicate adequate intake? Select all that apply.",
          "opts": [
            "Six to eight wet diapers per day",
            "Sleeping 7 hours straight between feedings",
            "At least three loose yellow seedy stools per day",
            "Content and settled between feedings",
            "A 12% weight loss from birth weight"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "Adequate intake shows as <b>6 to 8 wet diapers, at least 3 stools daily in the first month, and contentment between feeds</b>, with birth weight regained by 10 to 14 days. Long sleep stretches at this age mean missed feedings, and expected weight loss is only 5 to 10%.",
          "id": "nur234-m13-q04",
          "type": "sata",
          "sourceNumber": 4
        },
        {
          "q": "A nurse teaches formula preparation to a new parent. Which statement indicates correct understanding?",
          "opts": [
            "I can microwave the bottle for 20 seconds to warm it",
            "I will refrigerate whatever he does not finish and use it at the next feeding",
            "I will warm the bottle in water and test it on my inner wrist",
            "I can prop the bottle on a blanket if I need both hands"
          ],
          "ans": [
            2
          ],
          "why": "Bottles are <b>warmed in water and tested on the inner wrist or arm</b>. Microwaving causes uneven heating and burns, formula left in the bottle is discarded because of bacterial growth, and propping a bottle risks aspiration.",
          "id": "nur234-m13-q05",
          "type": "single",
          "sourceNumber": 5
        },
        {
          "q": "Which instructions about storing expressed breast milk are correct? Select all that apply.",
          "opts": [
            "Refrigerated milk can be used within about four days",
            "Thawed milk must not be refrozen",
            "Warm milk in a bowl of warm water, not a microwave",
            "Milk left at room temperature is good for 24 hours",
            "Label each container with the date"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Roughly <b>4 hours out, 4 days in the fridge, 6 months in the freezer</b>. <b>A microwave is prohibited</b> - it heats unevenly and scalds the mouth, and it damages the immune proteins that make the milk worth expressing. Room temperature for 24 hours is far too long.",
          "id": "nur234-m13-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A client 3 weeks postpartum reports fever, flu-like aches, and a red wedge-shaped area on her left breast. She asks whether she should stop nursing on that side. Which response by the nurse is correct?",
          "opts": [
            "\"Stop nursing on that breast until the antibiotics are finished.\"",
            "\"Keep breastfeeding on both breasts while you take the prescribed antibiotics.\"",
            "\"Pump that breast and discard the milk until your fever is gone.\"",
            "\"Switch to formula for about 72 hours so the breast can rest.\""
          ],
          "ans": [
            1
          ],
          "why": "Mastitis is treated with antibiotics plus <b>continued</b> breastfeeding, because emptying the breast is part of the treatment. Resting the breast or discarding the milk sounds protective but leaves milk stagnant, which makes the infection worse.",
          "id": "nur234-m13-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A newborn weighs 3.4 kg. The provider prescribes a medication 15 mg/kg/dose q6h. How many milligrams will the nurse give per dose?",
          "opts": [
            "204 mg",
            "12.75 mg",
            "45 mg",
            "51 mg"
          ],
          "ans": [
            3
          ],
          "why": "Per dose means weight times the per-dose amount: 3.4 kg x 15 mg/kg/dose = <b>51 mg</b>. The \"q6h\" is a distractor when the question asks per dose; it would only be used to find the 24-hour total of 204 mg.",
          "id": "nur234-m13-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "A nurse makes a home visit to a client 5 days postpartum who is breastfeeding. Which statements by the client indicate correct understanding of newborn feeding? Select all that apply.",
          "opts": [
            "\"I will feed him when he roots or brings his hands to his mouth.\"",
            "\"I will wait until he is crying hard so I know he is really hungry.\"",
            "\"I will feed him at least 8 to 12 times in 24 hours.\"",
            "\"I will hold off on a pacifier until breastfeeding is established, around 3 to 4 weeks.\"",
            "\"I will offer him a bottle of water if he seems fussy between feeds.\""
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "Feed on cues such as rooting, hand-to-mouth, and sucking motions, at least 8-12 times in 24 hours, and delay pacifiers and supplemental formula until breastfeeding is established at about 3-4 weeks. Waiting for hard crying is the trap, since crying is a <b>late</b> cue, and no supplemental water is given with either feeding method.",
          "id": "nur234-m13-q15",
          "type": "sata",
          "sourceNumber": 15
        }
      ],
      "reflective": false
    },
    {
      "id": "nur234-m14",
      "course": "NUR 234",
      "module": 14,
      "topic": "The High-Risk Newborn & Course Review",
      "title": "Newborn Watch",
      "icon": "👶",
      "tagline": "Connect newborn findings with the next assessment concern.",
      "robot": {
        "src": "rustic-maya.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur234-m14.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur234-m14.html",
      "source": "../nur234-m14.html",
      "pairs": [
        {
          "category": "Respiratory",
          "prompt": "Which deficiency contributes to preterm respiratory distress syndrome?",
          "answer": "Insufficient surfactant",
          "id": "nur234-m14-p01"
        },
        {
          "category": "Respiratory",
          "prompt": "What is surfactant's role in alveoli?",
          "answer": "Reduce surface tension",
          "id": "nur234-m14-p02"
        },
        {
          "category": "Respiratory",
          "prompt": "Nasal flaring and intercostal retractions show what?",
          "answer": "Increased breathing effort",
          "id": "nur234-m14-p03"
        },
        {
          "category": "Respiratory",
          "prompt": "Why avoid oral feeding during marked respiratory distress?",
          "answer": "Aspiration risk",
          "id": "nur234-m14-p04"
        },
        {
          "category": "Respiratory",
          "prompt": "Inhalation of meconium-containing fluid may cause what?",
          "answer": "Meconium aspiration syndrome",
          "id": "nur234-m14-p05"
        },
        {
          "category": "Bilirubin",
          "prompt": "Yellow skin and sclerae reflect what pigment?",
          "answer": "Bilirubin",
          "id": "nur234-m14-p06"
        },
        {
          "category": "Bilirubin",
          "prompt": "Jaundice in the first 24 hours needs what?",
          "answer": "Prompt clinical evaluation",
          "id": "nur234-m14-p07"
        },
        {
          "category": "Bilirubin",
          "prompt": "Which light-based treatment lowers bilirubin?",
          "answer": "Phototherapy",
          "id": "nur234-m14-p08"
        },
        {
          "category": "Bilirubin",
          "prompt": "What is protected during overhead phototherapy?",
          "answer": "The newborn's eyes",
          "id": "nur234-m14-p09"
        },
        {
          "category": "Bilirubin",
          "prompt": "Which two observations matter during phototherapy?",
          "answer": "Temperature and hydration",
          "id": "nur234-m14-p10"
        },
        {
          "category": "Bilirubin",
          "prompt": "Why maintain effective feeding with jaundice?",
          "answer": "Support stooling and bilirubin elimination",
          "id": "nur234-m14-p11"
        },
        {
          "category": "Glucose",
          "prompt": "Why can an infant of a diabetic parent become hypoglycemic after birth?",
          "answer": "Insulin remains high after maternal glucose supply stops",
          "id": "nur234-m14-p12"
        },
        {
          "category": "Glucose",
          "prompt": "Why is a small-for-gestational-age infant vulnerable to low glucose?",
          "answer": "Limited energy stores",
          "id": "nur234-m14-p13"
        },
        {
          "category": "Glucose",
          "prompt": "How can cold stress affect glucose use?",
          "answer": "It increases energy consumption",
          "id": "nur234-m14-p14"
        },
        {
          "category": "Withdrawal",
          "prompt": "Hyperirritability and tremors after prenatal opioid exposure suggest what?",
          "answer": "Neonatal withdrawal",
          "id": "nur234-m14-p15"
        },
        {
          "category": "Withdrawal",
          "prompt": "What environment supports a withdrawing newborn?",
          "answer": "Low noise and dim lighting",
          "id": "nur234-m14-p16"
        },
        {
          "category": "Withdrawal",
          "prompt": "What comforting wrap can reduce excessive stimulation?",
          "answer": "Swaddling",
          "id": "nur234-m14-p17"
        },
        {
          "category": "GI",
          "prompt": "Prematurity, abdominal distension, bloody stool and feeding intolerance suggest what?",
          "answer": "Necrotizing enterocolitis",
          "id": "nur234-m14-p18"
        },
        {
          "category": "GI",
          "prompt": "What feeding response is needed when NEC is suspected?",
          "answer": "Stop feeds and obtain urgent evaluation",
          "id": "nur234-m14-p19"
        },
        {
          "category": "GI",
          "prompt": "Drooling, choking and cyanosis with a first feed suggest what anomaly?",
          "answer": "Esophageal atresia or tracheoesophageal fistula",
          "id": "nur234-m14-p20"
        },
        {
          "category": "Birth injury",
          "prompt": "Asymmetric Moro with an intact grasp can suggest what injury?",
          "answer": "Upper brachial plexus injury",
          "id": "nur234-m14-p21"
        },
        {
          "category": "Sleep",
          "prompt": "Recommended position for routine infant sleep?",
          "answer": "Supine: on the back",
          "id": "nur234-m14-p22"
        },
        {
          "category": "Sleep",
          "prompt": "Recommended infant sleep surface?",
          "answer": "Firm, flat and separate",
          "id": "nur234-m14-p23"
        },
        {
          "category": "Sleep",
          "prompt": "Which environmental exposure increases sleep-related risk?",
          "answer": "Tobacco smoke",
          "id": "nur234-m14-p24"
        }
      ],
      "cases": [
        {
          "q": "During the birth of a macrosomic newborn, the head delivers but the anterior shoulder does not. Which nursing action is appropriate?",
          "opts": [
            "Apply firm fundal pressure",
            "Assist into McRoberts position and apply suprapubic pressure",
            "Place the client flat with legs extended",
            "Pull downward on the fetal head"
          ],
          "ans": [
            1
          ],
          "why": "Shoulder dystocia is managed with the <b>McRoberts maneuver and suprapubic pressure</b>. <b>Fundal pressure is never used</b>, since it drives the shoulder harder against the symphysis and worsens the impaction; traction on the head risks brachial plexus injury.",
          "id": "nur234-m14-q03",
          "type": "single",
          "sourceNumber": 3
        },
        {
          "q": "A newborn is being treated for neonatal abstinence syndrome. Which interventions does the nurse include in the plan of care? Select all that apply.",
          "opts": [
            "Cluster care and keep the lights dim",
            "Swaddle the newborn snugly",
            "Place the crib in a brightly lit area for close observation",
            "Offer small, frequent, high-calorie feedings",
            "Provide vigorous stimulation to maintain alertness"
          ],
          "ans": [
            0,
            1,
            3
          ],
          "why": "NAS care is the <b>opposite of stimulation</b>: cluster care, dim lights, low noise, swaddling, non-nutritive sucking, and small frequent high-calorie feedings with the head elevated. Bright light and vigorous stimulation worsen the hyperirritability and tremors.",
          "id": "nur234-m14-q04",
          "type": "sata",
          "sourceNumber": 4
        },
        {
          "q": "Which newborns are at increased risk for hypoglycemia? Select all that apply.",
          "opts": [
            "An infant of a mother with diabetes",
            "A preterm newborn",
            "A newborn who is small for gestational age",
            "A term newborn feeding well at 8 hours",
            "A newborn with cold stress"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Risk comes from too much insulin or too little stored glucose. The <b>infant of a diabetic mother</b> has been making extra insulin against the mother's high sugars, and that insulin keeps working after the cord is cut. Preterm and SGA newborns lack glycogen stores, and cold stress burns through what they have.",
          "id": "nur234-m14-q08",
          "type": "sata",
          "sourceNumber": 8
        },
        {
          "q": "A newborn at 20 hours old has a total serum bilirubin of 14 mg/dL and visible jaundice of the face and chest. Which is the priority nursing action?",
          "opts": [
            "Reassure the parents that all newborns turn yellow",
            "Notify the provider, as jaundice in the first 24 hours is pathologic",
            "Place the newborn in indirect sunlight by a window",
            "Withhold feeds to reduce bilirubin production"
          ],
          "ans": [
            1
          ],
          "why": "<b>Jaundice within the first 24 hours is pathologic until proved otherwise</b> and suggests hemolysis, such as ABO or Rh incompatibility. Physiologic jaundice appears after day two. Sunlight through a window is not phototherapy, and withholding feeds is backwards - <b>feeding increases stooling, which is how bilirubin leaves the body</b>.",
          "id": "nur234-m14-q09",
          "type": "single",
          "sourceNumber": 9
        },
        {
          "q": "A newborn born at 28 weeks is receiving gavage feedings. On day 6 the abdomen is distended, a feeding is returned undigested, and the diaper contains bloody stool. Which action does the nurse take first?",
          "opts": [
            "Stop all feedings and report the findings",
            "Give the next feeding more slowly over a longer time",
            "Place the newborn prone and reassess the abdomen in 2 hours",
            "Change the newborn from gavage feedings to nipple feedings"
          ],
          "ans": [
            0
          ],
          "why": "A distended abdomen, bloody stool and feeding intolerance point to <b>NEC</b>, so all feeds are stopped immediately and reported — feeding a hypoxic gut makes the ischemia worse. Slowing the feeding or changing the route is still feeding, so it does not protect the gut.",
          "id": "nur234-m14-q11",
          "type": "single",
          "sourceNumber": 11
        },
        {
          "q": "After the birth of a macrosomic newborn complicated by shoulder dystocia, one arm lies flaccid with the elbow extended and the hand rotated inward, and the Moro reflex is absent on that side. Which additional finding does the nurse expect?",
          "opts": [
            "The grasp reflex is intact on the affected side",
            "The grasp reflex is absent on the affected side",
            "Crepitus is palpated over the clavicle on the affected side",
            "Both arms move symmetrically when the newborn is startled"
          ],
          "ans": [
            0
          ],
          "why": "In <b>Erb-Duchenne palsy</b> the arm is flaccid with an extended elbow and inward-rotated hand and the Moro is absent on that side, but the <b>grasp reflex remains intact</b>. Crepitus with limited motion points instead to a fractured clavicle, a different birth injury.",
          "id": "nur234-m14-q14",
          "type": "single",
          "sourceNumber": 14
        },
        {
          "q": "A newborn is delivered after a postterm pregnancy. Which findings does the nurse expect on the newborn assessment? Select all that apply.",
          "opts": [
            "Loose, peeling, leathery skin",
            "Long fingernails and abundant scalp hair",
            "Meconium staining of the skin and cord",
            "A high-pitched shrill cry with tremors and an exaggerated Moro",
            "Small palpebral fissures, a smooth philtrum and a thin upper lip"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "The <b>postmature</b> newborn looks wasted, with loose peeling leathery skin, long nails and hair, meconium staining, and an alert look like a 2-week-old. A shrill cry with tremors and an exaggerated Moro belongs to <b>neonatal abstinence syndrome</b>, and those facial features describe fetal alcohol syndrome.",
          "id": "nur234-m14-q15",
          "type": "sata",
          "sourceNumber": 15
        },
        {
          "q": "The nurse is giving discharge teaching to the parents of a healthy term newborn about reducing the risk of sudden infant death syndrome. Which instructions does the nurse include? Select all that apply.",
          "opts": [
            "Place the newborn on the back for every sleep",
            "Use a firm, flat sleep surface",
            "Keep the newborn away from smoke exposure",
            "Have the newborn sleep in the parents' bed for easier night feedings",
            "Position the newborn prone after feedings to prevent spitting up"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "SIDS risk reduction is <b>back to sleep</b> on a firm flat surface with no smoke exposure and <b>no co-sleeping</b>. Bed-sharing sounds convenient for night feedings and prone positioning sounds like reflux care, but both raise the risk rather than lowering it.",
          "id": "nur234-m14-q16",
          "type": "sata",
          "sourceNumber": 16
        }
      ],
      "reflective": false
    },
    {
      "id": "nur235-m8",
      "course": "NUR 235",
      "module": 8,
      "topic": "Respiratory",
      "title": "Pediatric Airway Clinic",
      "icon": "🫁",
      "tagline": "Follow the sounds and recognize a changing airway.",
      "robot": {
        "src": "rustic-nurse.webp",
        "width": 427,
        "height": 512
      },
      "illustration": {
        "src": "nur235-m8.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur235-m8.html",
      "source": "../nur235-m8.html",
      "pairs": [
        {
          "category": "Airway",
          "prompt": "High-pitched upper-airway sound?",
          "answer": "Stridor",
          "id": "nur235-m8-p01"
        },
        {
          "category": "Airway",
          "prompt": "Musical sound from narrowed lower airways?",
          "answer": "Wheeze",
          "id": "nur235-m8-p02"
        },
        {
          "category": "Croup",
          "prompt": "Barking cough with inspiratory stridor suggests what?",
          "answer": "Croup",
          "id": "nur235-m8-p03"
        },
        {
          "category": "Emergency",
          "prompt": "Drooling, dysphagia and tripod posture suggest what?",
          "answer": "Epiglottitis",
          "id": "nur235-m8-p04"
        },
        {
          "category": "Emergency",
          "prompt": "Which action is avoided in suspected epiglottitis?",
          "answer": "Forced throat inspection with a tongue blade",
          "id": "nur235-m8-p05"
        },
        {
          "category": "Support",
          "prompt": "What reduces agitation in a child with upper-airway obstruction?",
          "answer": "Caregiver presence and a position of comfort",
          "id": "nur235-m8-p06"
        },
        {
          "category": "Asthma",
          "prompt": "Rapid-acting bronchodilator commonly used for rescue?",
          "answer": "Albuterol",
          "id": "nur235-m8-p07"
        },
        {
          "category": "Asthma",
          "prompt": "Which inhaled class reduces ongoing airway inflammation?",
          "answer": "Inhaled corticosteroids",
          "id": "nur235-m8-p08"
        },
        {
          "category": "Asthma",
          "prompt": "What follows an inhaled corticosteroid dose?",
          "answer": "Rinse the mouth",
          "id": "nur235-m8-p09"
        },
        {
          "category": "Asthma",
          "prompt": "What is a spacer used for?",
          "answer": "Help deliver metered-dose inhaler medication",
          "id": "nur235-m8-p10"
        },
        {
          "category": "Asthma",
          "prompt": "How is peak flow compared between days?",
          "answer": "As a percentage of personal best",
          "id": "nur235-m8-p11"
        },
        {
          "category": "Asthma",
          "prompt": "Which of three peak-flow attempts is recorded?",
          "answer": "Highest reading",
          "id": "nur235-m8-p12"
        },
        {
          "category": "Asthma",
          "prompt": "Peak flow at 80–100% of personal best?",
          "answer": "Green zone",
          "id": "nur235-m8-p13"
        },
        {
          "category": "Asthma",
          "prompt": "Peak flow at 50–79% of personal best?",
          "answer": "Yellow zone",
          "id": "nur235-m8-p14"
        },
        {
          "category": "Asthma",
          "prompt": "Peak flow below 50% of personal best?",
          "answer": "Red zone",
          "id": "nur235-m8-p15"
        },
        {
          "category": "Emergency",
          "prompt": "Less wheezing with poor air movement and drowsiness means what?",
          "answer": "Possible worsening airflow obstruction",
          "id": "nur235-m8-p16"
        },
        {
          "category": "CF",
          "prompt": "Inheritance pattern of cystic fibrosis?",
          "answer": "Autosomal recessive",
          "id": "nur235-m8-p17"
        },
        {
          "category": "CF",
          "prompt": "Which test measures salt concentration to evaluate CF?",
          "answer": "Sweat chloride test",
          "id": "nur235-m8-p18"
        },
        {
          "category": "CF",
          "prompt": "When are pancreatic enzymes taken?",
          "answer": "With prescribed meals and snacks",
          "id": "nur235-m8-p19"
        },
        {
          "category": "CF",
          "prompt": "Which vitamin group may need replacement in CF?",
          "answer": "Fat-soluble vitamins A, D, E and K",
          "id": "nur235-m8-p20"
        },
        {
          "category": "Infection",
          "prompt": "Common viral cause of infant bronchiolitis?",
          "answer": "Respiratory syncytial virus",
          "id": "nur235-m8-p21"
        },
        {
          "category": "Care",
          "prompt": "What clears obstructing nasal secretions in an infant?",
          "answer": "Gentle nasal suction as indicated",
          "id": "nur235-m8-p22"
        },
        {
          "category": "Post-op",
          "prompt": "Repeated swallowing after tonsillectomy may mean what?",
          "answer": "Postoperative bleeding",
          "id": "nur235-m8-p23"
        },
        {
          "category": "Assessment",
          "prompt": "Retractions and accessory muscle use show what?",
          "answer": "Increased work of breathing",
          "id": "nur235-m8-p24"
        }
      ],
      "cases": [
        {
          "q": "A 3-year-old arrives with a temperature of 39.5 C, drooling, a muffled voice, and is sitting forward on his hands refusing to lie back. He has no cough. Which action should the nurse take first?",
          "opts": [
            "Inspect the throat with a tongue blade for exudate",
            "Obtain a throat culture",
            "Keep the child upright with the parent and ensure emergency airway equipment is at the bedside",
            "Position the child supine for a chest x-ray"
          ],
          "ans": [
            2
          ],
          "why": "High fever, drooling, muffled voice, tripod posture and <b>no cough</b> is epiglottitis — never use a tongue blade or inspect the throat, because it can trigger complete airway obstruction. Croup is the look-alike, but croup brings a barking cough with a low-grade fever.",
          "id": "nur235-m8-q01",
          "type": "single",
          "sourceNumber": 1
        },
        {
          "q": "A nurse is teaching the parents of a 7-year-old with cystic fibrosis. Which instructions should be included? Select all that apply.",
          "opts": [
            "Give pancreatic enzymes with every meal and snack",
            "Give the bronchodilator about 30 minutes before chest physiotherapy",
            "Schedule chest physiotherapy immediately after meals",
            "Restrict salt intake, especially during hot weather",
            "Provide a high-calorie, high-protein diet"
          ],
          "ans": [
            0,
            1,
            4
          ],
          "why": "Enzymes go with all food, the <b>bronchodilator comes before chest physiotherapy</b> to open airways first, and the diet is high-calorie and high-protein with fat-soluble vitamins A, D, E and K. CPT right after meals provokes vomiting, and these children need <b>extra</b> salt and fluid, not less.",
          "id": "nur235-m8-q03",
          "type": "sata",
          "sourceNumber": 3
        },
        {
          "q": "A 10-year-old with asthma has a personal best peak expiratory flow of 300 L/min. This morning her best of three blows is 180 L/min. Which action should the nurse instruct?",
          "opts": [
            "No change; she is in the green zone",
            "Use the rescue inhaler and follow the yellow zone action plan",
            "Go to the emergency department immediately for the red zone",
            "Repeat the readings and average all three"
          ],
          "ans": [
            1
          ],
          "why": "180 of 300 is 60% of personal best, which lands in the <b>yellow zone (50-79%)</b> — add the rescue medication. Green is 80-100% and red is under 50%, and the value used is the <b>best</b> of three blows, never the average.",
          "id": "nur235-m8-q04",
          "type": "single",
          "sourceNumber": 4
        },
        {
          "q": "A 5-year-old is 4 hours post tonsillectomy. Which finding most concerns the nurse?",
          "opts": [
            "Repeated swallowing while awake",
            "Complaints of throat pain rated 5 of 10",
            "A small amount of dark old blood in one emesis",
            "A temperature of 37.8 C"
          ],
          "ans": [
            0
          ],
          "why": "<b>Frequent swallowing is the classic sign of post-tonsillectomy hemorrhage</b> — blood trickling down the back of the throat before anyone sees it. Pain, a low-grade temperature and old dark blood are expected in the first hours; bright red bleeding and repeated swallowing are not.",
          "id": "nur235-m8-q06",
          "type": "single",
          "sourceNumber": 6
        },
        {
          "q": "A 3-year-old has a barking cough, inspiratory stridor and a low-grade fever, and is drooling minimally. Which condition does the nurse suspect?",
          "opts": [
            "Epiglottitis",
            "Croup (laryngotracheobronchitis)",
            "Asthma",
            "Cystic fibrosis"
          ],
          "ans": [
            1
          ],
          "why": "A <b>barking, seal-like cough with stridor and a mild fever</b> is croup, and it is viral and gradual. <b>Epiglottitis</b> is the emergency to rule out: sudden high fever, <b>drooling, dysphagia, distress and a tripod position</b> - and no barking cough. Confusing the two costs an airway.",
          "id": "nur235-m8-q07",
          "type": "single",
          "sourceNumber": 7
        },
        {
          "q": "A child is suspected of having epiglottitis. Which actions are appropriate? Select all that apply.",
          "opts": [
            "Keep the child calm and with the caregiver",
            "Prepare for emergency airway management",
            "Examine the throat with a tongue blade",
            "Allow a position of comfort, usually sitting forward",
            "Do not force the child to lie down"
          ],
          "ans": [
            0,
            1,
            3,
            4
          ],
          "why": "<b>Nothing goes in that throat.</b> A tongue blade can trigger complete laryngospasm and close the airway entirely. Keep the child calm, upright and undisturbed, with intubation equipment and skilled staff standing by. Crying and lying flat both worsen the obstruction.",
          "id": "nur235-m8-q08",
          "type": "sata",
          "sourceNumber": 8
        },
        {
          "q": "Which teaching is correct for a child prescribed an inhaled corticosteroid?",
          "opts": [
            "Use it as a rescue inhaler during an attack",
            "Rinse the mouth after each use to prevent oral thrush",
            "Use it only when symptoms occur",
            "Stop it once symptoms have improved"
          ],
          "ans": [
            1
          ],
          "why": "Inhaled corticosteroids are the <b>controller</b>, taken daily whether or not symptoms are present, and stopping when things improve is why children end up back in the hospital. <b>Rinsing prevents candidiasis</b>. The rescue inhaler is the short-acting beta-2 agonist.",
          "id": "nur235-m8-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A nurse is caring for a 4-year-old child hospitalized with bacterial pneumonia. Which of the following interventions is the nurse's priority?",
          "opts": [
            "Encourage the child to ambulate in the hall.",
            "Administer prescribed antipyretics for fever.",
            "Monitor oxygen saturation and administer oxygen as needed.",
            "Provide a high-calorie, high-protein diet."
          ],
          "ans": [
            2
          ],
          "why": "<b>Impaired gas exchange from alveolar inflammation is the primary concern in bacterial pneumonia</b>, so monitoring oxygenation and giving oxygen comes first under the ABCs. Fever control and nutrition are supportive, and ambulation is a longer-term recovery goal.",
          "id": "nur235-m8-q17",
          "type": "single",
          "sourceNumber": 17
        },
        {
          "q": "A nurse is teaching the parent of a child who has asthma and a new prescription for fluticasone/salmeterol (Advair HFA) via a metered-dose inhaler (MDI). Which of the following statements by the parent indicates a need for further teaching?",
          "opts": [
            "I will give my child a dose as soon as wheezing starts.",
            "My child should rinse his mouth after using the inhaler.",
            "My child should exhale completely before placing the inhaler in his mouth.",
            "If my child has difficulty breathing in the dose, he can use a spacer."
          ],
          "ans": [
            0
          ],
          "why": "<b>Advair is a combination corticosteroid and long-acting beta-2 agonist used for daily maintenance, not as a rescue inhaler</b> for acute wheezing; a short-acting drug like albuterol is used for that. Rinsing the mouth, exhaling fully before inhaling, and using a spacer are correct.",
          "id": "nur235-m8-q18",
          "type": "single",
          "sourceNumber": 18
        }
      ],
      "reflective": false
    },
    {
      "id": "nur235-m9",
      "course": "NUR 235",
      "module": 9,
      "topic": "Cardiac",
      "title": "Follow the Blood Flow",
      "icon": "🫀",
      "tagline": "Trace the blood and connect the cardiac clues.",
      "robot": {
        "src": "rustic-coach.webp",
        "width": 427,
        "height": 512
      },
      "illustration": {
        "src": "nur235-m9.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur235-m9.html",
      "source": "../nur235-m9.html",
      "pairs": [
        {
          "category": "Circulation",
          "prompt": "Normal flow from the right ventricle goes where?",
          "answer": "Pulmonary artery toward the lungs",
          "id": "nur235-m9-p01"
        },
        {
          "category": "Circulation",
          "prompt": "Normal flow from the left ventricle goes where?",
          "answer": "Aorta toward the body",
          "id": "nur235-m9-p02"
        },
        {
          "category": "Defects",
          "prompt": "Opening between the atria?",
          "answer": "Atrial septal defect",
          "id": "nur235-m9-p03"
        },
        {
          "category": "Defects",
          "prompt": "Opening between the ventricles?",
          "answer": "Ventricular septal defect",
          "id": "nur235-m9-p04"
        },
        {
          "category": "Defects",
          "prompt": "Persistent fetal connection between aorta and pulmonary artery?",
          "answer": "Patent ductus arteriosus",
          "id": "nur235-m9-p05"
        },
        {
          "category": "Defects",
          "prompt": "Narrowing of the aorta?",
          "answer": "Coarctation",
          "id": "nur235-m9-p06"
        },
        {
          "category": "Assessment",
          "prompt": "High arm pressure with weak femoral pulses suggests what?",
          "answer": "An upper-to-lower circulation obstruction",
          "id": "nur235-m9-p07"
        },
        {
          "category": "Assessment",
          "prompt": "Continuous machine-like murmur is associated with which vessel?",
          "answer": "Persistent ductus arteriosus",
          "id": "nur235-m9-p08"
        },
        {
          "category": "Tetralogy",
          "prompt": "Four defects including VSD, overriding aorta, RV hypertrophy and pulmonary stenosis?",
          "answer": "Tetralogy of Fallot",
          "id": "nur235-m9-p09"
        },
        {
          "category": "Tetralogy",
          "prompt": "Which position helps during a hypercyanotic spell?",
          "answer": "Knee-to-chest",
          "id": "nur235-m9-p10"
        },
        {
          "category": "Tetralogy",
          "prompt": "Why does knee-to-chest help a tet spell?",
          "answer": "It increases systemic vascular resistance",
          "id": "nur235-m9-p11"
        },
        {
          "category": "Medication",
          "prompt": "Drug used to maintain ductal patency in a duct-dependent lesion?",
          "answer": "Prostaglandin E1",
          "id": "nur235-m9-p12"
        },
        {
          "category": "Medication",
          "prompt": "Drug that may close a PDA in an appropriate preterm infant?",
          "answer": "Indomethacin",
          "id": "nur235-m9-p13"
        },
        {
          "category": "Medication",
          "prompt": "Pulse assessed before prescribed digoxin?",
          "answer": "Apical pulse for a full minute",
          "id": "nur235-m9-p14"
        },
        {
          "category": "Medication",
          "prompt": "What should happen after vomiting a digoxin dose?",
          "answer": "Never repeat a vomited dose",
          "id": "nur235-m9-p15"
        },
        {
          "category": "Medication",
          "prompt": "Vomiting with bradycardia during digoxin therapy suggests what?",
          "answer": "Possible digoxin toxicity",
          "id": "nur235-m9-p16"
        },
        {
          "category": "Heart failure",
          "prompt": "Sweating, tiring and poor growth during feeds suggest what?",
          "answer": "Increased cardiac workload",
          "id": "nur235-m9-p17"
        },
        {
          "category": "Heart failure",
          "prompt": "What feeding approach conserves infant energy?",
          "answer": "Smaller, more frequent prescribed feeds",
          "id": "nur235-m9-p18"
        },
        {
          "category": "Heart failure",
          "prompt": "What scheduling approach preserves rest?",
          "answer": "Cluster nursing care",
          "id": "nur235-m9-p19"
        },
        {
          "category": "Kawasaki",
          "prompt": "Prolonged fever with conjunctivitis, oral changes and peeling extremities?",
          "answer": "Kawasaki disease",
          "id": "nur235-m9-p20"
        },
        {
          "category": "Kawasaki",
          "prompt": "Which vessels need follow-up after Kawasaki disease?",
          "answer": "Coronary arteries",
          "id": "nur235-m9-p21"
        },
        {
          "category": "Kawasaki",
          "prompt": "Which immune therapy is used for Kawasaki disease?",
          "answer": "IV immunoglobulin",
          "id": "nur235-m9-p22"
        },
        {
          "category": "Inflammation",
          "prompt": "Migratory arthritis and carditis following group A strep?",
          "answer": "Acute rheumatic fever",
          "id": "nur235-m9-p23"
        },
        {
          "category": "Post-procedure",
          "prompt": "What circulation findings are compared after cardiac catheterization?",
          "answer": "Distal pulses, color and temperature",
          "id": "nur235-m9-p24"
        }
      ],
      "cases": [
        {
          "q": "A nurse is preparing to give digoxin to a 6-month-old with heart failure. Which actions are correct? Select all that apply.",
          "opts": [
            "Count the apical pulse for a full minute before the dose",
            "Mix the dose into a bottle of formula to reduce stomach upset",
            "Withhold the dose and notify the provider if the apical rate is below the ordered parameter",
            "Repeat the dose if the infant vomits within 15 minutes of taking it",
            "Report vomiting, poor feeding and bradycardia as possible toxicity"
          ],
          "ans": [
            0,
            2,
            4
          ],
          "why": "Digoxin is given on an empty stomach after a <b>full-minute apical pulse</b>, and it is held for bradycardia below the parameter. <b>A dose is never repeated after vomiting</b> — the amount absorbed is unknown, and repeating it risks toxicity, which shows as nausea, vomiting and bradycardia.",
          "id": "nur235-m9-q03",
          "type": "sata",
          "sourceNumber": 3
        },
        {
          "q": "A nurse obtains four-point blood pressures on a 6-year-old: right arm 118/76, left arm 116/74, right leg 82/50, left leg 80/48. Brachial pulses are bounding and femoral pulses are weak. Which defect do these findings suggest?",
          "opts": [
            "Atrial septal defect",
            "Patent ductus arteriosus",
            "Coarctation of the aorta",
            "Tetralogy of Fallot"
          ],
          "ans": [
            2
          ],
          "why": "An upper-to-lower <b>BP differential</b> with bounding arm pulses and weak femoral pulses is coarctation. PDA gives a continuous machinery murmur with bounding pulses and a widened pulse pressure but no arm-leg gradient, and ASD produces a soft systolic murmur without pulse changes.",
          "id": "nur235-m9-q05",
          "type": "single",
          "sourceNumber": 5
        },
        {
          "q": "A nurse hears a machine-like continuous murmur in an infant with a wide pulse pressure and bounding pulses. Which defect does this suggest?",
          "opts": [
            "Tetralogy of Fallot",
            "Patent ductus arteriosus",
            "Coarctation of the aorta",
            "Atrial septal defect"
          ],
          "ans": [
            1
          ],
          "why": "A <b>continuous machine-like murmur</b> with bounding pulses and a wide pulse pressure is a patent ductus arteriosus - blood runs from aorta to pulmonary artery throughout the cycle. <b>Coarctation</b> gives the opposite pattern: strong arms, weak legs, and a blood pressure gap between them.",
          "id": "nur235-m9-q07",
          "type": "single",
          "sourceNumber": 7
        },
        {
          "q": "An infant with tetralogy of Fallot has a hypercyanotic (tet) spell. What is the nurse's first action?",
          "opts": [
            "Place the infant in a knee-chest position",
            "Lay the infant flat and stimulate vigorously",
            "Give a rapid IV fluid bolus first",
            "Withhold oxygen to avoid closing the duct"
          ],
          "ans": [
            0
          ],
          "why": "<b>Knee-chest</b> raises systemic vascular resistance, which pushes blood back through the pulmonary circulation instead of shunting right to left. Older children squat instinctively for the same reason. Then calm the child, give oxygen and morphine as prescribed.",
          "id": "nur235-m9-q08",
          "type": "single",
          "sourceNumber": 8
        },
        {
          "q": "Which findings suggest heart failure in an infant? Select all that apply.",
          "opts": [
            "Diaphoresis during feeds",
            "Poor weight gain",
            "Tachypnoea at rest",
            "Feeding for 45 minutes and tiring",
            "Bounding femoral pulses with strong leg pressures"
          ],
          "ans": [
            0,
            1,
            2,
            3
          ],
          "why": "In an infant, <b>feeding is exercise</b> - so sweating, tiring and taking too long to feed are the earliest signs of heart failure, along with tachypnoea and poor growth. Weak or absent femoral pulses would be the abnormal finding, pointing at coarctation.",
          "id": "nur235-m9-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A child recovering from a streptococcal throat infection develops fever, migrating joint pain and a new murmur. What does the nurse suspect?",
          "opts": [
            "Kawasaki disease",
            "Acute rheumatic fever",
            "Infective endocarditis",
            "Juvenile idiopathic arthritis"
          ],
          "ans": [
            1
          ],
          "why": "Acute rheumatic fever follows an <b>untreated group A strep</b> infection by 2 to 3 weeks: migratory polyarthritis, carditis with a new murmur, chorea, and the skin signs. The reason strep throat gets antibiotics is precisely to prevent the <b>permanent valve damage</b> that follows.",
          "id": "nur235-m9-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A 4-month-old is admitted with a sustained heart rate of 240 beats/min. The infant is alert, well perfused, and has a stable blood pressure. Which intervention should the nurse expect to be attempted first?",
          "opts": [
            "Attempt vagal maneuvers",
            "Give adenosine by rapid IV push",
            "Prepare the infant for synchronized cardioversion",
            "Give the scheduled dose of digoxin early"
          ],
          "ans": [
            0
          ],
          "why": "For SVT the order is <b>vagal maneuvers first, then adenosine</b>. Adenosine is tempting because it is the drug associated with SVT, but in a stable child it comes only after vagal maneuvers have been tried.",
          "id": "nur235-m9-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "A 3-month-old with heart failure sweats and tires after a few minutes of feeding and is gaining weight poorly. Which nursing measures are appropriate? Select all that apply.",
          "opts": [
            "Offer smaller, more frequent feedings",
            "Use a higher-calorie formula",
            "Hold the infant upright for feedings",
            "Cluster nursing care to allow uninterrupted rest",
            "Encourage the infant to finish the full volume even if the feeding takes 45 minutes"
          ],
          "ans": [
            0,
            1,
            2,
            3
          ],
          "why": "An infant in heart failure tires and sweats with feeds, so <b>small, frequent, higher-calorie feeds given upright</b> plus clustered care conserve energy while still supplying calories. Pushing the infant to finish a long feeding is tempting because of the poor weight gain, but it increases the work of feeding instead of reducing it.",
          "id": "nur235-m9-q15",
          "type": "sata",
          "sourceNumber": 15
        },
        {
          "q": "A nurse is caring for a 10-month-old infant diagnosed with heart failure. Which of the following nursing interventions should the nurse implement to reduce cardiac workload?",
          "opts": [
            "Schedule small, low-calorie feedings every 2 hours.",
            "Allow the infant to cry for short periods of time to strengthen the heart.",
            "Organize care to allow for uninterrupted rest periods.",
            "Encourage active play to promote developmental milestones."
          ],
          "ans": [
            2
          ],
          "why": "<b>Clustering care and minimizing stimulation conserves energy and reduces oxygen demand and cardiac strain.</b> Crying and overfeeding increase stress on the heart, and active play adds workload rather than reducing it.",
          "id": "nur235-m9-q17",
          "type": "single",
          "sourceNumber": 17
        },
        {
          "q": "A nurse is assessing a 9-year-old child with a recent history of untreated streptococcal pharyngitis. Which of the following findings should the nurse recognize as a clinical manifestation of acute rheumatic fever?",
          "opts": [
            "Petechiae of the soft palate",
            "Subcutaneous nodules over the bony prominences",
            "Vesicular rash on the trunk",
            "Hyperactive deep tendon reflexes"
          ],
          "ans": [
            1
          ],
          "why": "<b>Firm, painless subcutaneous nodules over extensor surfaces are a major Jones criterion for acute rheumatic fever</b>, often associated with carditis. Palatal petechiae point to mononucleosis, ARF's rash is erythema marginatum rather than vesicular, and its movement disorder is chorea, not hyperreflexia.",
          "id": "nur235-m9-q18",
          "type": "single",
          "sourceNumber": 18
        },
        {
          "q": "A nurse is caring for a child who has bacterial endocarditis. The child is scheduled to receive moderate term antibiotic therapy and requires a peripherally inserted central catheter (PICC). Which of the following statements should the nurse include when teaching the child's parent?",
          "opts": [
            "\"The PICC line will last several weeks with proper care.\"",
            "\"The public health nurse will rotate the insertion site every 3 days.\"",
            "\"You will need to make certain the arm board is in place at all times.\"",
            "\"Your child will go to the operating room to have the line placed.\""
          ],
          "ans": [
            0
          ],
          "why": "Endocarditis needs <b>2 to 6 weeks</b> of IV antibiotics, and a PICC is chosen precisely because it <b>stays in for the whole course</b> with proper care. Each distractor describes something that is not a PICC: <b>rotating the site every 3 days</b> is the <b>peripheral IV</b> rule &mdash; a PICC that had to be re-sited that often would have no advantage at all. An <b>arm board</b> is not needed because the catheter is flexible; the arm is not immobilized and movement is not restricted. And a PICC is placed <b>at the bedside under local anesthetic</b> by trained personnel, <b>not in the operating room</b> &mdash; position is confirmed by X-ray before the first dose.",
          "id": "nur235-m9-q19",
          "type": "single",
          "sourceNumber": 19
        }
      ],
      "reflective": false
    },
    {
      "id": "nur235-m10",
      "course": "NUR 235",
      "module": 10,
      "topic": "Musculoskeletal",
      "title": "Cast & Traction Clinic",
      "icon": "🦴",
      "tagline": "Protect circulation, skin and movement.",
      "robot": {
        "src": "rustic-alex.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur235-m10.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur235-m10.html",
      "source": "../nur235-m10.html",
      "pairs": [
        {
          "category": "Bone",
          "prompt": "Incomplete fracture with bending on one side?",
          "answer": "Greenstick fracture",
          "id": "nur235-m10-p01"
        },
        {
          "category": "Bone",
          "prompt": "Compression injury that buckles the cortex?",
          "answer": "Buckle fracture",
          "id": "nur235-m10-p02"
        },
        {
          "category": "Bone",
          "prompt": "What area supports longitudinal bone growth?",
          "answer": "Growth plate",
          "id": "nur235-m10-p03"
        },
        {
          "category": "Assessment",
          "prompt": "What assessment is essential after casting?",
          "answer": "Distal neurovascular checks",
          "id": "nur235-m10-p04"
        },
        {
          "category": "Assessment",
          "prompt": "Pins-and-needles sensation is called what?",
          "answer": "Paresthesia",
          "id": "nur235-m10-p05"
        },
        {
          "category": "Assessment",
          "prompt": "Unusual pallor is a change in what?",
          "answer": "Skin color",
          "id": "nur235-m10-p06"
        },
        {
          "category": "Assessment",
          "prompt": "Coolness distal to an injury raises concern about what?",
          "answer": "Perfusion",
          "id": "nur235-m10-p07"
        },
        {
          "category": "Emergency",
          "prompt": "Severe pain out of proportion with tense swelling suggests what?",
          "answer": "Compartment syndrome",
          "id": "nur235-m10-p08"
        },
        {
          "category": "Emergency",
          "prompt": "Why report worsening cast pain despite analgesia?",
          "answer": "Pressure may threaten nerves and circulation",
          "id": "nur235-m10-p09"
        },
        {
          "category": "Cast",
          "prompt": "How is a wet plaster cast supported?",
          "answer": "With the palms of the hands",
          "id": "nur235-m10-p10"
        },
        {
          "category": "Cast",
          "prompt": "What is avoided when itching occurs under a cast?",
          "answer": "Inserting objects beneath the cast",
          "id": "nur235-m10-p11"
        },
        {
          "category": "Cast",
          "prompt": "Which exposure should a non-waterproof cast avoid?",
          "answer": "Water and moisture",
          "id": "nur235-m10-p12"
        },
        {
          "category": "Traction",
          "prompt": "How should prescribed traction weights hang?",
          "answer": "Freely, without resting on the floor",
          "id": "nur235-m10-p13"
        },
        {
          "category": "Traction",
          "prompt": "Who changes prescribed traction weight?",
          "answer": "Authorized clinical staff under the treatment plan",
          "id": "nur235-m10-p14"
        },
        {
          "category": "Hip",
          "prompt": "Abnormal hip development or instability in an infant?",
          "answer": "Developmental dysplasia of the hip",
          "id": "nur235-m10-p15"
        },
        {
          "category": "Hip",
          "prompt": "Which harness may treat early hip dysplasia?",
          "answer": "Pavlik harness",
          "id": "nur235-m10-p16"
        },
        {
          "category": "Hip",
          "prompt": "Who adjusts a Pavlik harness's straps?",
          "answer": "The treating team",
          "id": "nur235-m10-p17"
        },
        {
          "category": "Spine",
          "prompt": "Lateral spinal curvature with rotation?",
          "answer": "Scoliosis",
          "id": "nur235-m10-p18"
        },
        {
          "category": "Spine",
          "prompt": "Purpose of bracing during growth in selected scoliosis?",
          "answer": "Limit curve progression",
          "id": "nur235-m10-p19"
        },
        {
          "category": "Spine",
          "prompt": "Turning technique used after spinal fusion?",
          "answer": "Log rolling",
          "id": "nur235-m10-p20"
        },
        {
          "category": "Muscle",
          "prompt": "X-linked progressive muscle weakness with Gower sign?",
          "answer": "Duchenne muscular dystrophy",
          "id": "nur235-m10-p21"
        },
        {
          "category": "Muscle",
          "prompt": "Climbing up one's own legs to stand?",
          "answer": "Gower sign",
          "id": "nur235-m10-p22"
        },
        {
          "category": "Hip",
          "prompt": "Adolescent hip disorder that may present as knee pain?",
          "answer": "Slipped capital femoral epiphysis",
          "id": "nur235-m10-p23"
        },
        {
          "category": "Hip",
          "prompt": "Avascular necrosis of the childhood femoral head?",
          "answer": "Legg-Calvé-Perthes disease",
          "id": "nur235-m10-p24"
        }
      ],
      "cases": [
        {
          "q": "A 9-year-old had a long arm cast applied 6 hours ago. He now rates his pain 9 of 10, unrelieved by two doses of opioid, and his fingers are pale and tingling. Which action should the nurse take first?",
          "opts": [
            "Administer an additional dose of analgesic",
            "Elevate the arm and reassess in one hour",
            "Perform a neurovascular check and notify the provider immediately",
            "Apply ice over the cast at the elbow"
          ],
          "ans": [
            2
          ],
          "why": "<b>Pain that analgesia does not touch is compartment syndrome</b>, not an inadequate dose, and pallor with paresthesia adds two more of the 6 Ps. This is time-critical, so waiting an hour or giving more medication both delay the only thing that saves the limb.",
          "id": "nur235-m10-q01",
          "type": "single",
          "sourceNumber": 1
        },
        {
          "q": "A nurse is teaching the parents of a 10-year-old with Duchenne muscular dystrophy about protecting respiratory function. Which instructions should be included? Select all that apply.",
          "opts": [
            "Use a cough-assist device as prescribed",
            "Use nighttime BiPAP as prescribed",
            "Position the child prone for sleep to expand the chest",
            "Restrict fluids to reduce secretions",
            "Report respiratory infections promptly"
          ],
          "ans": [
            0,
            1,
            4
          ],
          "why": "Cough assist, nighttime BiPAP and prompt reporting of infections are the respiratory protections; positioning is upright or semi-Fowler, and <b>prone is avoided</b>. Fluids are kept adequate to <b>thin</b> secretions — restricting them thickens mucus and makes an already weak cough less effective.",
          "id": "nur235-m10-q03",
          "type": "sata",
          "sourceNumber": 3
        },
        {
          "q": "A child is in Buck's traction. Which findings require immediate action? Select all that apply.",
          "opts": [
            "Cool, pale toes with delayed capillary refill",
            "Numbness and tingling of the foot",
            "Weights resting on the floor",
            "Skin intact under the boot",
            "Pain unrelieved by prescribed analgesia"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Cold pale toes, numbness and pain out of proportion are <b>neurovascular compromise</b>, and unrelieved pain is the earliest sign of <b>compartment syndrome</b>. Traction weights must <b>hang free</b> - resting on the floor means no traction at all.",
          "id": "nur235-m10-q07",
          "type": "sata",
          "sourceNumber": 7
        },
        {
          "q": "A caregiver asks about care of a child in a new hip spica cast. Which instructions are correct? Select all that apply.",
          "opts": [
            "Keep the cast clean and dry, especially around the perineum",
            "Turn the child every 2 hours",
            "Use the crossbar to lift the child",
            "Check the skin at the cast edges",
            "Report any foul odor or drainage"
          ],
          "ans": [
            0,
            1,
            3,
            4
          ],
          "why": "Perineal care, frequent turning, edge checks and reporting odor all protect skin and catch infection. <b>The crossbar is never a handle</b> - it is a spacer, and lifting by it can break the cast or injure the child.",
          "id": "nur235-m10-q08",
          "type": "sata",
          "sourceNumber": 8
        },
        {
          "q": "Which finding in an adolescent with suspected scoliosis is most significant?",
          "opts": [
            "Complaints of back pain after sport",
            "Asymmetric rib hump on forward bending",
            "One shoe wearing faster than the other",
            "Preference for carrying a bag on one shoulder"
          ],
          "ans": [
            1
          ],
          "why": "The <b>Adams forward bend test</b> is the screening finding: a rib hump on one side means vertebral rotation, not just a curve. Uneven shoulders and hips support it. Back pain is not a typical presenting feature of idiopathic scoliosis and points elsewhere.",
          "id": "nur235-m10-q09",
          "type": "single",
          "sourceNumber": 9
        },
        {
          "q": "A 14-year-old is 1 day post spinal fusion for scoliosis. She tells the nurse she has a headache that gets worse when she sits up. What should the nurse do first?",
          "opts": [
            "Report the headache to the provider as a possible CSF leak",
            "Document it as expected discomfort after major spine surgery",
            "Sit her upright in a chair and dim the lights",
            "Turn her by lifting under her shoulders and hips"
          ],
          "ans": [
            0
          ],
          "why": "After spinal fusion, a <b>headache is asked about as a clue to a CSF leak</b>, so it is reported rather than treated as routine post-op discomfort. Turning her by lifting under the shoulders and hips is tempting as comfort care, but the child is <b>log rolled</b> after fusion to keep the spine aligned.",
          "id": "nur235-m10-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A 6-year-old is brought in with a limp that has been present for several weeks. He says his hip and knee ache but the limp itself is painless, and imaging shows avascular necrosis of the femoral head. Which nursing action does the nurse anticipate?",
          "opts": [
            "Limit weight bearing on the affected hip",
            "Encourage running and jumping to strengthen the hip",
            "Apply a Pavlik harness to hold the hip flexed and abducted",
            "Reassure the parents that a painless limp needs no follow-up"
          ],
          "ans": [
            0
          ],
          "why": "This is <b>Legg-Calve-Perthes</b>, avascular necrosis of the femoral head, and the care point is to <b>limit weight bearing</b> on that hip. The Pavlik harness is tempting because it is also a hip device, but it belongs to DDH in infants under 6 months, not to a school-age child with Perthes.",
          "id": "nur235-m10-q11",
          "type": "single",
          "sourceNumber": 11
        },
        {
          "q": "A plaster long leg cast has just been applied to a 5-year-old. Which action by the nurse is correct while the cast is still wet?",
          "opts": [
            "Support the cast with the palms of both hands when moving the leg",
            "Grip the cast with the fingertips to reposition the leg",
            "Cover the cast with a blanket to help it dry faster",
            "Tell the parents the cast will be fully dry in about 30 minutes"
          ],
          "ans": [
            0
          ],
          "why": "A wet plaster cast is <b>handled with the palms only</b>, because fingertips press dents into it that can create pressure points on the skin underneath. Telling the parents it dries in about 30 minutes is tempting, but that is fiberglass; <b>plaster takes 24 to 72 hours</b>.",
          "id": "nur235-m10-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "A 4-month-old who is not yet crawling or walking is brought to the emergency department with a spiral fracture of the femur. Which conclusion by the nurse is most appropriate?",
          "opts": [
            "This fracture pattern in a non-ambulatory infant is a red flag for abuse",
            "Spiral fractures are expected in infants because the periosteum is thick",
            "Open growth plates make this a common accidental injury at this age",
            "The finding is reassuring because infant bones heal quickly"
          ],
          "ans": [
            0
          ],
          "why": "A <b>spiral fracture, or any fracture in a non-ambulatory infant</b>, is an abuse red flag and must be investigated further. Thick periosteum and open growth plates are real features of pediatric bone and explain buckle and greenstick fractures and fast healing, but they do not explain a spiral fracture in a baby who cannot yet move himself.",
          "id": "nur235-m10-q13",
          "type": "single",
          "sourceNumber": 13
        },
        {
          "q": "A nurse is teaching the parent of a child with juvenile idiopathic arthritis (JIA) about home care. Which statement by the parent indicates a need for further teaching?",
          "opts": [
            "We will encourage our child to perform range-of-motion exercises daily.",
            "We will apply warm compresses to the joints before exercise.",
            "We will avoid giving our child NSAIDs because they can cause joint damage.",
            "We will schedule rest periods throughout the day to prevent fatigue."
          ],
          "ans": [
            2
          ],
          "why": "<b>NSAIDs are first-line treatment for JIA to reduce inflammation and pain</b> and do not cause joint damage when used appropriately. Daily range of motion prevents contractures, warm compresses reduce stiffness before activity, and rest periods prevent overexertion.",
          "id": "nur235-m10-q16",
          "type": "single",
          "sourceNumber": 16
        },
        {
          "q": "A nurse is assessing a client with juvenile idiopathic arthritis (JIA). Which finding should the nurse recognize as a potential complication of the disease?",
          "opts": [
            "Uveitis and vision changes",
            "Increased bone density",
            "Hyperthyroidism",
            "Frequent fractures due to brittle bones"
          ],
          "ans": [
            0
          ],
          "why": "<b>Uveitis, inflammation of the eye, is a serious complication of JIA that can cause vision loss if untreated</b>, so regular ophthalmology exams are essential. JIA reduces rather than increases bone strength, hyperthyroidism is unrelated, and frequent fractures are not a primary problem.",
          "id": "nur235-m10-q17",
          "type": "single",
          "sourceNumber": 17
        }
      ],
      "reflective": false
    },
    {
      "id": "nur235-m11",
      "course": "NUR 235",
      "module": 11,
      "topic": "Endocrine & Metabolic",
      "title": "Pediatric Hormone Detective",
      "icon": "🔋",
      "tagline": "Read the hormone pattern, one clue at a time.",
      "robot": {
        "src": "rustic-sam.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur235-m11.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur235-m11.html",
      "source": "../nur235-m11.html",
      "pairs": [
        {
          "category": "Thyroid",
          "prompt": "Low thyroid hormone with high TSH suggests what?",
          "answer": "Primary hypothyroidism",
          "id": "nur235-m11-p01"
        },
        {
          "category": "Thyroid",
          "prompt": "High thyroid hormone with low TSH suggests what?",
          "answer": "Hyperthyroidism",
          "id": "nur235-m11-p02"
        },
        {
          "category": "Thyroid",
          "prompt": "Newborn screening detects which treatable thyroid disorder?",
          "answer": "Congenital hypothyroidism",
          "id": "nur235-m11-p03"
        },
        {
          "category": "Medication",
          "prompt": "Replacement thyroid hormone?",
          "answer": "Levothyroxine",
          "id": "nur235-m11-p04"
        },
        {
          "category": "Assessment",
          "prompt": "Cold intolerance, constipation and slowed activity fit which pattern?",
          "answer": "Reduced thyroid activity",
          "id": "nur235-m11-p05"
        },
        {
          "category": "Assessment",
          "prompt": "Heat intolerance, tremor and a rapid pulse fit which pattern?",
          "answer": "Excess thyroid activity",
          "id": "nur235-m11-p06"
        },
        {
          "category": "Safety",
          "prompt": "Fever and sore throat on an antithyroid drug need what?",
          "answer": "Urgent evaluation for a blood-cell adverse effect",
          "id": "nur235-m11-p07"
        },
        {
          "category": "Calcium",
          "prompt": "Facial twitch after cheek tapping?",
          "answer": "Chvostek sign",
          "id": "nur235-m11-p08"
        },
        {
          "category": "Calcium",
          "prompt": "Carpal spasm during blood-pressure cuff inflation?",
          "answer": "Trousseau sign",
          "id": "nur235-m11-p09"
        },
        {
          "category": "Calcium",
          "prompt": "Chvostek and Trousseau signs suggest what?",
          "answer": "Hypocalcemia",
          "id": "nur235-m11-p10"
        },
        {
          "category": "Diabetes",
          "prompt": "Autoimmune destruction of pancreatic beta cells causes what?",
          "answer": "Type 1 diabetes",
          "id": "nur235-m11-p11"
        },
        {
          "category": "Diabetes",
          "prompt": "Excessive urination?",
          "answer": "Polyuria",
          "id": "nur235-m11-p12"
        },
        {
          "category": "Diabetes",
          "prompt": "Excessive thirst?",
          "answer": "Polydipsia",
          "id": "nur235-m11-p13"
        },
        {
          "category": "Diabetes",
          "prompt": "Excessive hunger?",
          "answer": "Polyphagia",
          "id": "nur235-m11-p14"
        },
        {
          "category": "Assessment",
          "prompt": "New bedwetting with thirst and weight loss needs what test?",
          "answer": "Blood glucose assessment",
          "id": "nur235-m11-p15"
        },
        {
          "category": "Insulin",
          "prompt": "In classic regular/NPH mixing, which is drawn first?",
          "answer": "Clear regular insulin before cloudy NPH",
          "id": "nur235-m11-p16"
        },
        {
          "category": "Insulin",
          "prompt": "Which rapid-acting insulin is coordinated closely with food?",
          "answer": "Lispro",
          "id": "nur235-m11-p17"
        },
        {
          "category": "Low glucose",
          "prompt": "Shakiness, pallor and sweating prompt what immediate measurement?",
          "answer": "Check glucose",
          "id": "nur235-m11-p18"
        },
        {
          "category": "Low glucose",
          "prompt": "What swallowing condition must be met before oral carbohydrate?",
          "answer": "Awake and able to swallow safely",
          "id": "nur235-m11-p19"
        },
        {
          "category": "Emergency",
          "prompt": "Ketones, acidosis and dehydration describe what crisis?",
          "answer": "Diabetic ketoacidosis",
          "id": "nur235-m11-p20"
        },
        {
          "category": "Emergency",
          "prompt": "Deep, rapid breathing in metabolic acidosis?",
          "answer": "Kussmaul respirations",
          "id": "nur235-m11-p21"
        },
        {
          "category": "Monitoring",
          "prompt": "Why watch potassium during insulin therapy?",
          "answer": "Insulin shifts potassium into cells",
          "id": "nur235-m11-p22"
        },
        {
          "category": "Growth",
          "prompt": "Hormone used for selected childhood growth deficiency?",
          "answer": "Somatropin",
          "id": "nur235-m11-p23"
        },
        {
          "category": "Growth",
          "prompt": "What limits further linear growth from growth hormone?",
          "answer": "Closure of growth plates",
          "id": "nur235-m11-p24"
        }
      ],
      "cases": [
        {
          "q": "A parent calls to report that her 13-year-old, who started propylthiouracil 3 weeks ago for Graves disease, now has a temperature of 38.6 C and a sore throat. Which action should the nurse take first?",
          "opts": [
            "Reassure the parent that this is a common viral illness",
            "Instruct her to hold the medication and bring the child for urgent evaluation",
            "Recommend acetaminophen and a recheck in 3 days",
            "Advise doubling the next dose to control the thyroid symptoms"
          ],
          "ans": [
            1
          ],
          "why": "Fever and sore throat on an antithyroid drug means <b>agranulocytosis until proven otherwise</b> — stop the drug and get urgent evaluation with a CBC. Note that <b>methimazole is preferred first-line in children</b> because of PTU hepatotoxicity, but the agranulocytosis warning applies to both.",
          "id": "nur235-m11-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "A 9-year-old with type 1 diabetes is pale, clammy and shaky. A fingerstick reads 54 mg/dL. She is alert and able to swallow. Which actions should the nurse take? Select all that apply.",
          "opts": [
            "Give 10 to 15 grams of a simple carbohydrate",
            "Recheck the glucose in 15 minutes",
            "Administer subcutaneous glucagon immediately",
            "Follow with a complex carbohydrate once the glucose normalizes",
            "Give the scheduled lispro dose now"
          ],
          "ans": [
            0,
            1,
            3
          ],
          "why": "Hypoglycemia is <b>cold and clammy</b>: 10-15 g of simple carbohydrate, recheck in 15 minutes, then a complex carb to hold the level. Glucagon is reserved for the child who is <b>unconscious or unable to swallow</b>, and giving rapid-acting insulin here would deepen the hypoglycemia.",
          "id": "nur235-m11-q03",
          "type": "sata",
          "sourceNumber": 3
        },
        {
          "q": "A 6-year-old with fatigue, constipation, weight gain and cold intolerance has a TSH of 9.2 mIU/L and a free T4 of 0.5 ng/dL. How should the nurse interpret these results?",
          "opts": [
            "Primary hypothyroidism",
            "Hyperthyroidism",
            "Normal thyroid function",
            "Graves disease"
          ],
          "ans": [
            0
          ],
          "why": "Primary hypothyroidism is <b>high TSH with low free T4</b>, and both values here are outside reference (TSH roughly 0.4-4.0 mIU/L, free T4 0.8-2.0 ng/dL). The symptoms match: hypothyroid means everything slows, while hyperthyroid is the mirror — heat intolerance, tachycardia, insomnia and diarrhea with a <b>low</b> TSH.",
          "id": "nur235-m11-q04",
          "type": "single",
          "sourceNumber": 4
        },
        {
          "q": "A 7-year-old boy has growth hormone deficiency confirmed by stimulation testing and is starting somatropin. Which of the following should the nurse include in the plan of care? (Select all that apply.)",
          "opts": [
            "Teach subcutaneous injection at bedtime with rotation of sites",
            "Measure and plot height and weight at every clinic visit",
            "Explain that injections continue until the growth plates close",
            "Ask about teasing and body image, and offer a counseling referral",
            "Give each dose intramuscularly into the vastus lateralis",
            "Plan to stop therapy as soon as he reaches the 50th percentile for height"
          ],
          "ans": [
            0,
            1,
            2,
            3
          ],
          "why": "Somatropin is a subcutaneous injection given into the abdomen, thigh, buttock, or upper arm, and sites are rotated to protect the tissue; it is never given IM. Serial height and weight plotted on the growth chart are how response is judged, so measurements at every visit are part of the plan. Therapy runs until the epiphyses close, not until an arbitrary percentile is reached. Short stature carries real social and body image strain, so the nurse asks about it directly and offers counseling instead of waiting for the family to bring it up.",
          "id": "nur235-m11-q07",
          "type": "sata",
          "sourceNumber": 7
        },
        {
          "q": "Which findings suggest new-onset type 1 diabetes in a child? Select all that apply.",
          "opts": [
            "Polyuria including new bedwetting",
            "Polydipsia",
            "Weight loss despite a good appetite",
            "Weight gain",
            "Fruity breath odor"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "The three P's plus <b>weight loss</b>: without insulin the cells starve while glucose spills into the urine. <b>New bedwetting in a previously dry child</b> is often what brings them in. Fruity breath means ketones and DKA is developing.",
          "id": "nur235-m11-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A 12-year-old admitted in DKA has a glucose of 386 mg/dL and a potassium of 5.6 mEq/L. Isotonic fluids are infusing and a continuous IV regular insulin drip is about to be started. What should the nurse anticipate?",
          "opts": [
            "The potassium will continue to climb until the glucose is corrected",
            "The insulin drip should be held until the potassium falls below 5.0 mEq/L",
            "The child has excess total body potassium and needs potassium restricted",
            "The potassium will fall once insulin is started, because total body potassium is already depleted"
          ],
          "ans": [
            3
          ],
          "why": "Without insulin, potassium stays <b>extracellular</b>, so the draw looks high even though total body potassium is <b>depleted</b>, and it falls once the insulin drip starts. Holding the insulin is the tempting error, but insulin is the treatment for DKA and this potassium is misleading, not a reason to delay.",
          "id": "nur235-m11-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "A parent is learning to draw up regular insulin and NPH insulin in the same syringe for her 10-year-old. Which action shows correct technique?",
          "opts": [
            "Draw up the cloudy NPH before the clear regular insulin",
            "Draw up the clear regular insulin before the cloudy NPH",
            "Use two separate syringes, because regular and NPH can never be mixed",
            "Substitute lispro for the regular insulin and give it right after the meal"
          ],
          "ans": [
            1
          ],
          "why": "The rule is <b>clear before cloudy</b>, so the regular insulin is drawn up before the NPH. Drawing the NPH first is the classic reversal and contaminates the regular vial with the cloudy suspension; lispro is also wrong here, since rapid-acting insulin is given <b>right before eating</b>, not after.",
          "id": "nur235-m11-q13",
          "type": "single",
          "sourceNumber": 13
        },
        {
          "q": "A 3-week-old was flagged on the newborn metabolic screen for congenital hypothyroidism. Which findings would support this diagnosis? Select all that apply.",
          "opts": [
            "Frequent loose stools",
            "Prolonged jaundice",
            "Poor feeding and sluggishness",
            "Tachycardia, tremor and weight loss",
            "A large tongue and a hoarse cry"
          ],
          "ans": [
            1,
            2,
            4
          ],
          "why": "Congenital hypothyroidism (low T3/T4 with a <b>high TSH</b>) shows up as prolonged jaundice, poor feeding, sluggishness, <b>constipation</b>, a large tongue and a hoarse cry, so loose stools do not fit. Tachycardia, tremor and weight loss is the opposite picture: it is the <b>hyperthyroid</b> presentation and also what too much levothyroxine looks like.",
          "id": "nur235-m11-q16",
          "type": "sata",
          "sourceNumber": 16
        },
        {
          "q": "A nurse is teaching a client who is prescribed propylthiouracil (PTU) for hyperthyroidism. Which of the following adverse effects should the nurse instruct the client to report immediately?",
          "opts": [
            "Mild nausea and hair loss",
            "Fever and sore throat",
            "Weight gain and cold intolerance",
            "Rash and headache"
          ],
          "ans": [
            1
          ],
          "why": "<b>Fever and sore throat can indicate agranulocytosis</b>, a serious adverse effect of PTU that requires stopping the drug and immediate medical evaluation. Mild nausea and hair loss are common, weight gain and cold intolerance suggest over-treatment into hypothyroidism but are not an emergency, and rash and headache are not urgent unless accompanied by systemic symptoms.",
          "id": "nur235-m11-q17",
          "type": "single",
          "sourceNumber": 17
        }
      ],
      "reflective": false
    },
    {
      "id": "nur235-m12",
      "course": "NUR 235",
      "module": 12,
      "topic": "Gastrointestinal",
      "title": "Tummy Trouble Detective",
      "icon": "🔎",
      "tagline": "Follow the GI clues from feeding to elimination.",
      "robot": {
        "src": "rustic-jordan.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur235-m12.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur235-m12.html",
      "source": "../nur235-m12.html",
      "pairs": [
        {
          "category": "Hydration",
          "prompt": "What calculation standardizes urine output to body size?",
          "answer": "mL divided by hours divided by kg",
          "id": "nur235-m12-p01"
        },
        {
          "category": "Hydration",
          "prompt": "Dry mucosa, few tears and reduced urine suggest what?",
          "answer": "Dehydration",
          "id": "nur235-m12-p02"
        },
        {
          "category": "Hydration",
          "prompt": "What does high urine specific gravity indicate?",
          "answer": "Concentrated urine",
          "id": "nur235-m12-p03"
        },
        {
          "category": "Hydration",
          "prompt": "Which trend is useful for fluid gain or loss?",
          "answer": "Daily weight",
          "id": "nur235-m12-p04"
        },
        {
          "category": "Hydration",
          "prompt": "What solution replaces water and electrolytes during appropriate oral rehydration?",
          "answer": "Oral rehydration solution",
          "id": "nur235-m12-p05"
        },
        {
          "category": "Math",
          "prompt": "120 mL urine over 6 hours in a 10 kg child equals what?",
          "answer": "2 mL/kg/hr",
          "id": "nur235-m12-p06"
        },
        {
          "category": "Math",
          "prompt": "Study order: 14 kg at 20 mL/kg. Volume?",
          "answer": "280 mL",
          "id": "nur235-m12-p07"
        },
        {
          "category": "Vomiting",
          "prompt": "Persistent loss of gastric acid can cause what imbalance?",
          "answer": "Metabolic alkalosis",
          "id": "nur235-m12-p08"
        },
        {
          "category": "Diarrhea",
          "prompt": "Bicarbonate loss in diarrhea can cause what imbalance?",
          "answer": "Metabolic acidosis",
          "id": "nur235-m12-p09"
        },
        {
          "category": "Pylorus",
          "prompt": "Young infant with projectile non-bilious vomiting?",
          "answer": "Pyloric stenosis",
          "id": "nur235-m12-p10"
        },
        {
          "category": "Pylorus",
          "prompt": "Classic abdominal finding with pyloric stenosis?",
          "answer": "Olive-shaped mass",
          "id": "nur235-m12-p11"
        },
        {
          "category": "Pylorus",
          "prompt": "Operation that opens the thickened pyloric muscle?",
          "answer": "Pyloromyotomy",
          "id": "nur235-m12-p12"
        },
        {
          "category": "Bowel",
          "prompt": "One bowel segment telescopes into another?",
          "answer": "Intussusception",
          "id": "nur235-m12-p13"
        },
        {
          "category": "Bowel",
          "prompt": "Episodic pain with knees drawn up and blood-mucus stool suggests what?",
          "answer": "A telescoping bowel obstruction",
          "id": "nur235-m12-p14"
        },
        {
          "category": "Bowel",
          "prompt": "What enema technique may reduce selected intussusception?",
          "answer": "Air or contrast enema",
          "id": "nur235-m12-p15"
        },
        {
          "category": "Hirschsprung",
          "prompt": "Absent enteric ganglion cells cause what condition?",
          "answer": "Hirschsprung disease",
          "id": "nur235-m12-p16"
        },
        {
          "category": "Hirschsprung",
          "prompt": "What test confirms absent ganglion cells?",
          "answer": "Rectal biopsy",
          "id": "nur235-m12-p17"
        },
        {
          "category": "Hirschsprung",
          "prompt": "Delayed meconium with distension raises concern for what?",
          "answer": "Congenital bowel obstruction",
          "id": "nur235-m12-p18"
        },
        {
          "category": "Appendix",
          "prompt": "Focal right lower quadrant inflammation?",
          "answer": "Appendicitis",
          "id": "nur235-m12-p19"
        },
        {
          "category": "Appendix",
          "prompt": "Where is classic appendiceal tenderness described?",
          "answer": "McBurney point",
          "id": "nur235-m12-p20"
        },
        {
          "category": "Emergency",
          "prompt": "Pain relief followed by rigidity and fever may suggest what?",
          "answer": "Appendiceal perforation",
          "id": "nur235-m12-p21"
        },
        {
          "category": "Celiac",
          "prompt": "Immune-mediated reaction to dietary gluten?",
          "answer": "Celiac disease",
          "id": "nur235-m12-p22"
        },
        {
          "category": "Celiac",
          "prompt": "Which grains are avoided in a gluten-free diet?",
          "answer": "Wheat, barley and rye",
          "id": "nur235-m12-p23"
        },
        {
          "category": "Teaching",
          "prompt": "Which preparation habit reduces infectious GI transmission?",
          "answer": "Handwashing before food preparation",
          "id": "nur235-m12-p24"
        }
      ],
      "cases": [
        {
          "q": "A 10-month-old has episodes of sudden inconsolable crying during which he draws his knees to his chest, and he appears completely normal between episodes. His diaper contains stool mixed with blood and mucus. Which action is the priority?",
          "opts": [
            "Reassure the parents that this is colic",
            "Notify the provider immediately; the findings suggest intussusception",
            "Begin an oral rehydration solution and reassess in 2 hours",
            "Apply a warm pack to the abdomen for comfort"
          ],
          "ans": [
            1
          ],
          "why": "Episodic severe pain with knees drawn up, currant jelly stool and a sausage-shaped mass is intussusception, which needs air or barium enema reduction. <b>The pain-free intervals make the child look completely well — that is the trap</b>, and it is why this gets mistaken for colic.",
          "id": "nur235-m12-q01",
          "type": "single",
          "sourceNumber": 1
        },
        {
          "q": "A mother brings her 8-month-old to the ED for sudden episodes of severe crying. Which findings should the nurse recognize as consistent with intussusception? (Select all that apply.)",
          "opts": [
            "Sudden episodes of severe abdominal pain with the legs drawn up to the chest, alternating with periods of calm",
            "Stools that appear red and jelly-like, mixed with mucus",
            "A sausage-shaped mass palpated in the abdomen",
            "Explosive, ribbon-like stools present since birth",
            "Projectile, nonbilious vomiting after every feeding",
            "Fever with a tender, distended abdomen"
          ],
          "ans": [
            0,
            1,
            2,
            5
          ],
          "why": "Episodic severe pain with the knees drawn to the chest, red currant jelly stools with mucus, a palpable sausage-shaped abdominal mass, and fever with abdominal tenderness and distention are the documented findings of intussusception from telescoping bowel and ischemia. Ribbon-like stools present since birth describe Hirschsprung disease from absent ganglion cells, and projectile nonbilious vomiting after every feeding is the hallmark of hypertrophic pyloric stenosis, not intussusception, so neither belongs in this select-all list.",
          "id": "nur235-m12-q07",
          "type": "sata",
          "sourceNumber": 7
        },
        {
          "q": "A 6-week-old has projectile non-bilious vomiting after feeds, is hungry immediately afterwards, and has a palpable olive-shaped mass in the right upper abdomen. What does the nurse suspect?",
          "opts": [
            "Intussusception",
            "Hypertrophic pyloric stenosis",
            "Gastro-esophageal reflux",
            "Volvulus"
          ],
          "ans": [
            1
          ],
          "why": "<b>Projectile non-bilious vomiting, a hungry infant and an olive-sized mass</b> is pyloric stenosis. The vomit is non-bilious because the obstruction sits <b>above</b> the bile duct. Repeated vomiting of stomach acid produces a <b>hypochloremic metabolic alkalosis</b>, which is what the labs will show.",
          "id": "nur235-m12-q08",
          "type": "single",
          "sourceNumber": 8
        },
        {
          "q": "Which findings suggest intussusception in an infant? Select all that apply.",
          "opts": [
            "Sudden episodes of severe crying with legs drawn up",
            "Currant-jelly stools",
            "A sausage-shaped abdominal mass",
            "Painless bright red rectal bleeding",
            "Vomiting"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Intussusception is <b>colicky pain in waves</b>, and between the waves the infant can look completely well - which is why it gets missed. <b>Currant-jelly stool</b> (blood and mucus) and a sausage-shaped mass complete the picture. Painless bright bleeding suggests a Meckel diverticulum instead.",
          "id": "nur235-m12-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A child has moderate dehydration from gastroenteritis. Which is the priority nursing assessment?",
          "opts": [
            "Daily weight and urine output",
            "Preference for solid foods",
            "Family history of bowel disease",
            "Immunization record"
          ],
          "ans": [
            0
          ],
          "why": "<b>Weight is the most sensitive measure of fluid loss in a child</b> - a percentage of body weight lost is a percentage of fluid lost - and urine output tells you whether the kidneys are still being perfused. In infants, count the diapers.",
          "id": "nur235-m12-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "Which instructions are correct for oral rehydration therapy at home? Select all that apply.",
          "opts": [
            "Give small amounts frequently",
            "Use a commercial oral rehydration solution",
            "Give apple juice and fizzy drinks freely",
            "Resume a normal diet once rehydrated",
            "Return if there are no wet diapers for 8 hours"
          ],
          "ans": [
            0,
            1,
            3,
            4
          ],
          "why": "Small frequent volumes stay down when a large one comes back up. <b>Juice and fizzy drinks make diarrhea worse</b> - the sugar load pulls water into the gut osmotically. Normal food is resumed early, and dry diapers mean it is time to come back.",
          "id": "nur235-m12-q11",
          "type": "sata",
          "sourceNumber": 11
        },
        {
          "q": "A 15 kg 4-year-old admitted with gastroenteritis has voided a total of 45 mL over the past 6 hours. What is the child's urine output in mL/kg/hr?",
          "opts": [
            "0.5 mL/kg/hr",
            "1 mL/kg/hr",
            "3 mL/kg/hr",
            "7.5 mL/kg/hr"
          ],
          "ans": [
            0
          ],
          "why": "The math is two steps: 45 mL divided by 6 hours is 7.5 mL/hr, then 7.5 divided by 15 kg is <b>0.5 mL/kg/hr</b> — half the normal pediatric output of 1 mL/kg/hr. Choosing 7.5 is the classic error of stopping after the first step and never dividing by the child's weight.",
          "id": "nur235-m12-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "A 3-month-old spits up a small amount after most feedings. She settles quickly, feeds eagerly, and has gained weight steadily along her growth curve. Which response by the nurse is most appropriate?",
          "opts": [
            "\"Any vomiting after feeding at this age points to pyloric stenosis.\"",
            "\"This is normal reflux — an infant who is comfortable and gaining weight is a happy spitter.\"",
            "\"This is GERD; poor weight gain is expected with reflux at this age.\"",
            "\"Arching and irritability with feeds are normal and will resolve on their own.\""
          ],
          "ans": [
            1
          ],
          "why": "A <b>happy spitter</b> who is gaining weight is normal reflux, not disease. The GERD answer is tempting because the behavior looks identical to a worried parent, but GERD is defined by <b>poor growth, forceful vomiting, arching, or respiratory symptoms</b> — none of which this baby has.",
          "id": "nur235-m12-q14",
          "type": "single",
          "sourceNumber": 14
        },
        {
          "q": "A 5-year-old is diagnosed with celiac disease by small intestine biopsy. Which statement by a parent indicates correct understanding of treatment?",
          "opts": [
            "\"She will avoid wheat, rye, and barley for the rest of her life.\"",
            "\"We can add wheat back once her symptoms have resolved.\"",
            "\"The diet is only needed until the intestine heals.\"",
            "\"Small amounts of barley are safe as long as she has no symptoms.\""
          ],
          "ans": [
            0
          ],
          "why": "Celiac disease is managed with a <b>lifelong</b> gluten-free diet avoiding wheat, rye, and barley; the small intestine biopsy that confirmed it is the gold standard for diagnosis. Resuming gluten once symptoms resolve is the tempting answer because the child looks well, but symptom relief does not mean the disease is gone.",
          "id": "nur235-m12-q15",
          "type": "single",
          "sourceNumber": 15
        },
        {
          "q": "A 2-year-old is scheduled for surgery for Hirschsprung disease. Which statements by the nurse about this child's condition and preoperative care are correct? Select all that apply.",
          "opts": [
            "\"The preoperative diet is high in protein and calories.\"",
            "\"Fiber is limited in the diet before surgery.\"",
            "\"The diagnosis was confirmed by a rectal biopsy showing absent ganglion cells.\"",
            "\"A high-fiber diet is encouraged to help him stool before surgery.\"",
            "\"Green, bilious emesis is not seen with this condition.\""
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Hirschsprung is confirmed by <b>rectal biopsy showing absent ganglion cells</b>, and the pre-op diet is <b>high-protein, high-calorie, and low-fiber</b>. Recommending high fiber is the tempting error carried over from ordinary constipation care, and bilious emesis with distention and no meconium in the first 24-48 hours is exactly how this condition presents.",
          "id": "nur235-m12-q17",
          "type": "sata",
          "sourceNumber": 17
        }
      ],
      "reflective": false
    },
    {
      "id": "nur235-m13",
      "course": "NUR 235",
      "module": 13,
      "topic": "Renal & Genitourinary",
      "title": "Kidney Clue Lab",
      "icon": "🧪",
      "tagline": "Put the urine, blood and history clues together.",
      "robot": {
        "src": "rustic-maya.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur235-m13.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur235-m13.html",
      "source": "../nur235-m13.html",
      "pairs": [
        {
          "category": "Anatomy",
          "prompt": "Opening of the urethra on the ventral penis?",
          "answer": "Hypospadias",
          "id": "nur235-m13-p01"
        },
        {
          "category": "Anatomy",
          "prompt": "Why defer circumcision with hypospadias?",
          "answer": "Foreskin may be needed for repair",
          "id": "nur235-m13-p02"
        },
        {
          "category": "Anatomy",
          "prompt": "Exposed bladder through an abdominal wall defect?",
          "answer": "Bladder exstrophy",
          "id": "nur235-m13-p03"
        },
        {
          "category": "Protection",
          "prompt": "What covers an exposed bladder to limit trauma and drying?",
          "answer": "A nonadherent protective dressing",
          "id": "nur235-m13-p04"
        },
        {
          "category": "Urine flow",
          "prompt": "Backward urine flow from bladder toward kidneys?",
          "answer": "Vesicoureteral reflux",
          "id": "nur235-m13-p05"
        },
        {
          "category": "Diagnostics",
          "prompt": "Which imaging test assesses reflux during voiding?",
          "answer": "Voiding cystourethrogram",
          "id": "nur235-m13-p06"
        },
        {
          "category": "Infection",
          "prompt": "Recurrent UTIs may prompt evaluation for what?",
          "answer": "Urinary tract structural or flow problems",
          "id": "nur235-m13-p07"
        },
        {
          "category": "Infection",
          "prompt": "Fever with flank pain suggests infection of which organ?",
          "answer": "Kidney: pyelonephritis",
          "id": "nur235-m13-p08"
        },
        {
          "category": "Teaching",
          "prompt": "What antibiotic instruction follows a prescribed UTI course?",
          "answer": "Complete the prescribed treatment",
          "id": "nur235-m13-p09"
        },
        {
          "category": "Enuresis",
          "prompt": "Involuntary nighttime wetting is called what?",
          "answer": "Nocturnal enuresis",
          "id": "nur235-m13-p10"
        },
        {
          "category": "Enuresis",
          "prompt": "What device alerts a child when wetting begins?",
          "answer": "Bedwetting alarm",
          "id": "nur235-m13-p11"
        },
        {
          "category": "Enuresis",
          "prompt": "What assessment comes before assuming uncomplicated enuresis?",
          "answer": "Check for medical and psychosocial causes",
          "id": "nur235-m13-p12"
        },
        {
          "category": "HUS",
          "prompt": "Hemolysis, low platelets and acute kidney injury?",
          "answer": "Hemolytic uremic syndrome",
          "id": "nur235-m13-p13"
        },
        {
          "category": "HUS",
          "prompt": "Which preceding illness is associated with Shiga-toxin HUS?",
          "answer": "Bloody diarrheal infection",
          "id": "nur235-m13-p14"
        },
        {
          "category": "Glomeruli",
          "prompt": "Tea-colored urine and hypertension after streptococcal infection?",
          "answer": "Poststreptococcal glomerulonephritis",
          "id": "nur235-m13-p15"
        },
        {
          "category": "Glomeruli",
          "prompt": "What does an ASO result help support?",
          "answer": "Evidence of recent streptococcal infection",
          "id": "nur235-m13-p16"
        },
        {
          "category": "Nephrotic",
          "prompt": "Heavy proteinuria with low serum albumin and edema?",
          "answer": "Nephrotic syndrome",
          "id": "nur235-m13-p17"
        },
        {
          "category": "Nephrotic",
          "prompt": "Why can low albumin promote edema?",
          "answer": "Reduced plasma oncotic pressure",
          "id": "nur235-m13-p18"
        },
        {
          "category": "Nephrotic",
          "prompt": "What urine appearance can accompany protein loss?",
          "answer": "Frothy urine",
          "id": "nur235-m13-p19"
        },
        {
          "category": "Renal",
          "prompt": "What potassium change can occur in acute kidney injury?",
          "answer": "Hyperkalemia",
          "id": "nur235-m13-p20"
        },
        {
          "category": "Renal",
          "prompt": "Why are ECG changes with high potassium urgent?",
          "answer": "Risk of dangerous dysrhythmias",
          "id": "nur235-m13-p21"
        },
        {
          "category": "Medication",
          "prompt": "Which common pain-drug class can harm renal perfusion?",
          "answer": "NSAIDs",
          "id": "nur235-m13-p22"
        },
        {
          "category": "Monitoring",
          "prompt": "What two trends help track fluid accumulation?",
          "answer": "Weight and intake/output",
          "id": "nur235-m13-p23"
        },
        {
          "category": "Math",
          "prompt": "18 mL/hour in a 12 kg toddler equals what?",
          "answer": "1.5 mL/kg/hr",
          "id": "nur235-m13-p24"
        }
      ],
      "cases": [
        {
          "q": "A newborn is admitted with bladder exstrophy. Which nursing actions are appropriate? Select all that apply.",
          "opts": [
            "Position the newborn supine",
            "Position the newborn prone to protect the bladder",
            "Cover the exposed bladder with a sterile transparent non-adherent dressing",
            "Apply dry gauze directly against the bladder mucosa",
            "Monitor and record urine output"
          ],
          "ans": [
            0,
            2,
            4
          ],
          "why": "Bladder exstrophy is positioned <b>supine, never prone</b>, with the bladder covered by a transparent non-adherent dressing; dry gauze sticks to the mucosa and injures it on removal. This is the deliberate <b>mirror image of myelomeningocele</b>, which is prone — the paired distractor shows up on exams constantly.",
          "id": "nur235-m13-q03",
          "type": "sata",
          "sourceNumber": 3
        },
        {
          "q": "A 12 kg toddler is 6 hours post surgical repair for vesicoureteral reflux. The goal urine output is greater than 1.5 mL/kg/hr. Which hourly output meets the goal?",
          "opts": [
            "6 mL/hr",
            "12 mL/hr",
            "18 mL/hr",
            "20 mL/hr"
          ],
          "ans": [
            3
          ],
          "why": "1.5 mL/kg/hr x 12 kg = 18 mL/hr, and the goal is <b>greater than</b> that, so only 20 mL/hr qualifies — 18 exactly meets but does not exceed the threshold. The high target flushes the repair; pink-tinged urine is expected afterward, but clots are not.",
          "id": "nur235-m13-q04",
          "type": "single",
          "sourceNumber": 4
        },
        {
          "q": "The parents of a newborn with hypospadias ask whether he can be circumcised before discharge. Which response is correct?",
          "opts": [
            "\"Circumcision is delayed because the foreskin tissue is used for the surgical repair.\"",
            "\"Circumcision is done now to reduce the risk of urinary infection.\"",
            "\"Circumcision is never done in boys with this condition.\"",
            "\"Circumcision is delayed only until the swelling goes down.\""
          ],
          "ans": [
            0
          ],
          "why": "In hypospadias the urethral meatus opens on the <b>ventral surface</b>, and the foreskin is needed as graft tissue, so circumcision is deferred until after the repair. Post-operatively the catheter typically stays 5 to 10 days, with oxybutynin for bladder spasms.",
          "id": "nur235-m13-q06",
          "type": "single",
          "sourceNumber": 6
        },
        {
          "q": "A child with nephrotic syndrome is admitted. Which findings does the nurse expect? Select all that apply.",
          "opts": [
            "Massive proteinuria",
            "Generalized edema including periorbital swelling",
            "Hypoalbuminemia",
            "Grossly bloody urine",
            "Hyperlipidemia"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Nephrotic syndrome leaks <b>protein</b>: heavy proteinuria, low albumin, edema as oncotic pressure falls, and a compensatory rise in lipids. <b>Gross hematuria points to glomerulonephritis</b> instead - that is the pair these questions separate. Periorbital swelling on waking is often the first thing a parent notices.",
          "id": "nur235-m13-q07",
          "type": "sata",
          "sourceNumber": 7
        },
        {
          "q": "A child is admitted with a suspected Wilms tumor. Which nursing action is essential?",
          "opts": [
            "Palpate the abdominal mass each shift to track its size",
            "Post a sign at the bedside not to palpate the abdomen",
            "Encourage vigorous activity",
            "Place the child prone for comfort"
          ],
          "ans": [
            1
          ],
          "why": "<b>Do not palpate the abdomen.</b> Handling a Wilms tumor can rupture the capsule and seed malignant cells across the abdomen. A sign goes above the bed so no one does it out of habit - one of the few nursing interventions that is entirely about <b>not</b> doing something.",
          "id": "nur235-m13-q09",
          "type": "single",
          "sourceNumber": 9
        },
        {
          "q": "A 4-year-old with nephrotic syndrome is responding to corticosteroids. Her mother tells the nurse she plans to stop the medication as soon as the swelling is gone. Which response by the nurse is correct?",
          "opts": [
            "\"Stopping the steroid once the edema is gone is the right plan.\"",
            "\"Stop the steroid now and restart it if the swelling comes back.\"",
            "\"The steroid dose has to be tapered and is never stopped abruptly, even after the edema resolves.\"",
            "\"The steroid can be stopped as long as she stays on a low-salt diet.\""
          ],
          "ans": [
            2
          ],
          "why": "Corticosteroids are the <b>mainstay</b> of nephrotic syndrome and must be <b>tapered, never stopped abruptly</b>. Resolving edema shows the drug is working, not that it can be discontinued, so stopping when the swelling disappears is the classic wrong answer. A low-salt diet and albumin are supportive measures and do not substitute for the taper.",
          "id": "nur235-m13-q11",
          "type": "single",
          "sourceNumber": 11
        },
        {
          "q": "An infant is 3 days post-op following hypospadias repair with a urinary catheter in place. Which finding should the nurse report to the surgeon immediately?",
          "opts": [
            "Pink-tinged urine in the drainage bag",
            "Clots in the urinary drainage",
            "Bladder spasms that are relieved by oxybutynin",
            "The catheter still in place on postoperative day 3"
          ],
          "ans": [
            1
          ],
          "why": "<b>Pink-tinged urine is expected</b> after the repair, but <b>clots are not</b> and are reported because they can obstruct drainage and threaten the repair. The catheter is meant to stay in <b>5-10 days</b>, so day 3 is expected, and oxybutynin is the expected treatment for bladder spasms.",
          "id": "nur235-m13-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "The nurse is teaching the parents of a 5-year-old girl who is being treated for a urinary tract infection. Which instructions should be included? Select all that apply.",
          "opts": [
            "Wipe from front to back after toileting",
            "Dress her in cotton underwear",
            "Avoid bubble baths",
            "Stop the antibiotic once the fever and burning resolve",
            "Limit her fluid intake to reduce the urge to void"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Prevention teaching for pediatric UTI is <b>wipe front to back, cotton underwear, no bubble baths, full and frequent bladder emptying, and plenty of fluids</b> — girls are already at higher risk from a shorter urethra. Stopping the antibiotic when symptoms improve is the tempting error: the <b>full course must be completed</b>, and restricting fluids works against flushing the bladder.",
          "id": "nur235-m13-q14",
          "type": "sata",
          "sourceNumber": 14
        }
      ],
      "reflective": false
    },
    {
      "id": "nur235-m14",
      "course": "NUR 235",
      "module": 14,
      "topic": "Comprehensive Final Review",
      "title": "Pediatric Final Shift",
      "icon": "🏁",
      "tagline": "Revisit familiar connections from across your pediatric modules.",
      "robot": {
        "src": "rustic-nurse.webp",
        "width": 427,
        "height": 512
      },
      "illustration": {
        "src": "nur235-m14.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur235-m14.html",
      "source": "../nur235-m14.html",
      "pairs": [
        {
          "id": "nur235-m14-p01",
          "category": "M4 review · Development",
          "prompt": "What is Erikson’s school-age task?",
          "answer": "Industry versus inferiority",
          "sourceModule": "nur235-m4",
          "sourcePath": "nur235-m4.html"
        },
        {
          "id": "nur235-m14-p02",
          "category": "M4 review · Development",
          "prompt": "What is Erikson’s adolescent task?",
          "answer": "Identity versus role confusion",
          "sourceModule": "nur235-m4",
          "sourcePath": "nur235-m4.html"
        },
        {
          "id": "nur235-m14-p03",
          "category": "M4 review · Development",
          "prompt": "What is Piaget’s school-age thinking stage?",
          "answer": "Concrete operational thinking",
          "sourceModule": "nur235-m4",
          "sourcePath": "nur235-m4.html"
        },
        {
          "id": "nur235-m14-p04",
          "category": "M5 review · Red cells",
          "prompt": "Which anemia is usually microcytic and hypochromic?",
          "answer": "Iron deficiency anemia",
          "sourceModule": "nur235-m5",
          "sourcePath": "nur235-m5.html"
        },
        {
          "id": "nur235-m14-p05",
          "category": "M5 review · Red cells",
          "prompt": "Which vitamin deficiencies can produce macrocytic anemia?",
          "answer": "Vitamin B12 or folate deficiency",
          "sourceModule": "nur235-m5",
          "sourcePath": "nur235-m5.html"
        },
        {
          "id": "nur235-m14-p06",
          "category": "M5 review · Iron",
          "prompt": "What improves absorption of an iron supplement?",
          "answer": "Vitamin C",
          "sourceModule": "nur235-m5",
          "sourcePath": "nur235-m5.html"
        },
        {
          "id": "nur235-m14-p07",
          "category": "M6 review · Allergy",
          "prompt": "What is the first-line medication for anaphylaxis?",
          "answer": "Intramuscular epinephrine",
          "sourceModule": "nur235-m6",
          "sourcePath": "nur235-m6.html"
        },
        {
          "id": "nur235-m14-p08",
          "category": "M6 review · Allergy",
          "prompt": "What immune mechanism underlies an immediate type I allergy?",
          "answer": "IgE-mediated hypersensitivity",
          "sourceModule": "nur235-m6",
          "sourcePath": "nur235-m6.html"
        },
        {
          "id": "nur235-m14-p09",
          "category": "M6 review · Allergy",
          "prompt": "Which hypersensitivity type is delayed and cell mediated?",
          "answer": "Type IV hypersensitivity",
          "sourceModule": "nur235-m6",
          "sourcePath": "nur235-m6.html"
        },
        {
          "id": "nur235-m14-p10",
          "category": "M7 review · Assessment",
          "prompt": "What is an early sign of neurologic deterioration?",
          "answer": "A change in level of consciousness",
          "sourceModule": "nur235-m7",
          "sourcePath": "nur235-m7.html"
        },
        {
          "id": "nur235-m14-p11",
          "category": "M7 review · ICP",
          "prompt": "What resting fontanel finding can suggest increased infant ICP?",
          "answer": "A bulging fontanel",
          "sourceModule": "nur235-m7",
          "sourcePath": "nur235-m7.html"
        },
        {
          "id": "nur235-m14-p12",
          "category": "M7 review · ICP",
          "prompt": "What head measurement trend matters in suspected hydrocephalus?",
          "answer": "Increasing head circumference",
          "sourceModule": "nur235-m7",
          "sourcePath": "nur235-m7.html"
        },
        {
          "category": "M8 review · Airway",
          "prompt": "High-pitched upper-airway sound?",
          "answer": "Stridor",
          "id": "nur235-m14-p13",
          "sourceModule": "nur235-m8",
          "sourcePath": "nur235-m8.html"
        },
        {
          "category": "M8 review · Airway",
          "prompt": "Musical sound from narrowed lower airways?",
          "answer": "Wheeze",
          "id": "nur235-m14-p14",
          "sourceModule": "nur235-m8",
          "sourcePath": "nur235-m8.html"
        },
        {
          "category": "M9 review · Circulation",
          "prompt": "Normal flow from the right ventricle goes where?",
          "answer": "Pulmonary artery toward the lungs",
          "id": "nur235-m14-p15",
          "sourceModule": "nur235-m9",
          "sourcePath": "nur235-m9.html"
        },
        {
          "category": "M9 review · Circulation",
          "prompt": "Normal flow from the left ventricle goes where?",
          "answer": "Aorta toward the body",
          "id": "nur235-m14-p16",
          "sourceModule": "nur235-m9",
          "sourcePath": "nur235-m9.html"
        },
        {
          "category": "M10 review · Bone",
          "prompt": "Incomplete fracture with bending on one side?",
          "answer": "Greenstick fracture",
          "id": "nur235-m14-p17",
          "sourceModule": "nur235-m10",
          "sourcePath": "nur235-m10.html"
        },
        {
          "category": "M10 review · Bone",
          "prompt": "Compression injury that buckles the cortex?",
          "answer": "Buckle fracture",
          "id": "nur235-m14-p18",
          "sourceModule": "nur235-m10",
          "sourcePath": "nur235-m10.html"
        },
        {
          "category": "M11 review · Thyroid",
          "prompt": "Low thyroid hormone with high TSH suggests what?",
          "answer": "Primary hypothyroidism",
          "id": "nur235-m14-p19",
          "sourceModule": "nur235-m11",
          "sourcePath": "nur235-m11.html"
        },
        {
          "category": "M11 review · Thyroid",
          "prompt": "High thyroid hormone with low TSH suggests what?",
          "answer": "Hyperthyroidism",
          "id": "nur235-m14-p20",
          "sourceModule": "nur235-m11",
          "sourcePath": "nur235-m11.html"
        },
        {
          "category": "M12 review · Hydration",
          "prompt": "What calculation standardizes urine output to body size?",
          "answer": "mL divided by hours divided by kg",
          "id": "nur235-m14-p21",
          "sourceModule": "nur235-m12",
          "sourcePath": "nur235-m12.html"
        },
        {
          "category": "M12 review · Hydration",
          "prompt": "Dry mucosa, few tears and reduced urine suggest what?",
          "answer": "Dehydration",
          "id": "nur235-m14-p22",
          "sourceModule": "nur235-m12",
          "sourcePath": "nur235-m12.html"
        },
        {
          "category": "M13 review · Anatomy",
          "prompt": "Opening of the urethra on the ventral penis?",
          "answer": "Hypospadias",
          "id": "nur235-m14-p23",
          "sourceModule": "nur235-m13",
          "sourcePath": "nur235-m13.html"
        },
        {
          "category": "M13 review · Anatomy",
          "prompt": "Why defer circumcision with hypospadias?",
          "answer": "Foreskin may be needed for repair",
          "id": "nur235-m14-p24",
          "sourceModule": "nur235-m13",
          "sourcePath": "nur235-m13.html"
        }
      ],
      "cases": [
        {
          "q": "A nurse receives report on four children. Which child should the nurse assess first?",
          "opts": [
            "A 3-year-old with croup who has a barking cough and is resting calmly on a parent's lap",
            "A 6-year-old with asthma who has audible wheezing and accessory muscle use at rest",
            "A 10-year-old who is 1 day post appendectomy and rates incisional pain 5 of 10",
            "A 4-month-old whose anterior fontanel bulges while she is crying hard"
          ],
          "ans": [
            1
          ],
          "why": "Airway and breathing outrank everything, and <b>accessory muscle use at rest is active respiratory distress</b>. The croup child is calm, post-op pain of 5 is expected, and a fontanel that bulges only with crying is normal — <b>bulging at rest</b> is what suggests raised ICP.",
          "id": "nur235-m14-q01",
          "type": "single",
          "sourceNumber": 1
        },
        {
          "q": "A child weighs 25 kg. Using the Holliday-Segar method, what is the 24-hour maintenance fluid volume?",
          "opts": [
            "1,250 mL",
            "1,500 mL",
            "1,600 mL",
            "2,500 mL"
          ],
          "ans": [
            2
          ],
          "why": "1,000 mL for the first 10 kg, 500 mL for kg 11-20, then 20 mL/kg for the remaining 5 kg = 100 mL, totaling <b>1,600 mL/day</b> (about 67 mL/hr on a pump). 1,500 forgets the last step and 2,500 wrongly applies 100 mL/kg to the whole weight.",
          "id": "nur235-m14-q04",
          "type": "single",
          "sourceNumber": 4
        },
        {
          "q": "A nurse assesses a 3-month-old with a large ventricular septal defect. Which finding most suggests early heart failure?",
          "opts": [
            "Diaphoresis and fatigue during feedings",
            "Strong bounding peripheral pulses",
            "A resting heart rate of 88",
            "A sudden 2-pound weight loss overnight"
          ],
          "ans": [
            0
          ],
          "why": "<b>Sweating with feeding is the classic early sign</b> in infant heart failure, along with tachycardia at rest, poor weight gain, feeding intolerance and hepatomegaly. Expect <b>weak</b> peripheral pulses and tachycardia rather than bradycardia; infants fail to gain weight rather than dropping it suddenly.",
          "id": "nur235-m14-q05",
          "type": "single",
          "sourceNumber": 5
        },
        {
          "q": "A nurse is preparing to give an IM injection to a hospitalized 14-month-old and an oral medication to a young infant. Which actions are appropriate? (Select all that apply.)",
          "opts": [
            "Use the vastus lateralis muscle for the IM injection",
            "Verify the child's identity using two identifiers from the ID band, confirmed by the caregiver",
            "Mix the prescribed oral antibiotic into a full bottle of infant formula so the infant will not taste it",
            "Apply lidocaine-prilocaine cream to the injection site 30-60 minutes beforehand",
            "Offer the toddler a real choice of which leg will receive the injection",
            "Give a high-risk medication after checking the dose alone rather than with a second nurse"
          ],
          "ans": [
            0,
            1,
            3,
            4
          ],
          "why": "The vastus lateralis is the preferred IM site in infants and small children because of its larger, better-developed muscle mass, and verifying identity with two identifiers plus caregiver confirmation is standard for infants and nonverbal children who cannot state their own name and birth date. Applying topical anesthetic 30-60 minutes before an injection and offering the toddler a real choice such as which leg receives it support atraumatic, developmentally appropriate care. Medication should never be mixed into a full bottle of formula because the infant may not finish it and receive an incomplete dose, and high-risk medications require two-nurse verification rather than a single nurse checking alone.",
          "id": "nur235-m14-q07",
          "type": "sata",
          "sourceNumber": 7
        },
        {
          "q": "A nurse receives report on four children. Which one does the nurse assess first?",
          "opts": [
            "A 3-year-old with croup who has a barking cough and no stridor at rest",
            "A 6-year-old with asthma whose chest is now silent",
            "An 8-year-old with a fracture reporting pain of 5 out of 10",
            "A 2-year-old with gastroenteritis who has had three wet diapers today"
          ],
          "ans": [
            1
          ],
          "why": "A <b>silent chest in asthma means air is not moving</b> - it is the most dangerous finding on the list and it looks quieter than the others. Croup without stridor at rest is stable, the fracture pain is manageable, and three wet diapers say the toddler is still perfusing.",
          "id": "nur235-m14-q08",
          "type": "single",
          "sourceNumber": 8
        },
        {
          "q": "Which statements about pediatric medication dosing are correct? Select all that apply.",
          "opts": [
            "Doses are usually calculated by weight in kilograms",
            "The calculated dose must be checked against the safe range before giving",
            "Oral liquids are measured in an oral syringe, not a kitchen spoon",
            "A dose above the safe range may be given if the child is large for age",
            "Two nurses independently check high-alert medications"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Weight-based dosing, a safe-range check before every dose, oral syringes, and independent double-checks on high-alert drugs. A dose <b>above the safe range is never given on the nurse's judgment</b> - it is questioned with the prescriber, and that refusal is the safeguard the whole system rests on.",
          "id": "nur235-m14-q10",
          "type": "sata",
          "sourceNumber": 10
        },
        {
          "q": "A 6-year-old receiving chemotherapy has an absolute neutrophil count of 320 and a new fever. Which action is the priority?",
          "opts": [
            "Obtain cultures and administer antibiotics within the hour",
            "Give acetaminophen and recheck the temperature in two hours",
            "Place the child in protective isolation and continue to monitor",
            "Hold further action until the provider makes morning rounds"
          ],
          "ans": [
            0
          ],
          "why": "An ANC <b>under 500</b> with fever is an emergency, and the first action is <b>cultures plus antibiotics within the hour</b>. Protective isolation is the tempting answer because it belongs to neutropenic care, but it only prevents new exposure and does nothing about the infection already underway.",
          "id": "nur235-m14-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "A 4-year-old admitted for surgery tells the nurse, \"I'm in the hospital because I was bad.\" Which response is most appropriate?",
          "opts": [
            "Explain in simple, truthful words why he is here and reassure him the hospital is not a punishment",
            "Tell him that if he behaves well he will be able to go home sooner",
            "Tell him not to worry about it and offer him a toy",
            "Give a detailed explanation of the operation, including the equipment that will be used"
          ],
          "ans": [
            0
          ],
          "why": "A preschooler is working through <b>initiative versus guilt</b> and needs simple truth plus the explicit reassurance that hospitalization <b>is not a punishment</b>. The detailed explanation is tempting because honesty is the right instinct, but that depth of information fits a school-age child who is seeking competence, not a 4-year-old.",
          "id": "nur235-m14-q13",
          "type": "single",
          "sourceNumber": 13
        },
        {
          "q": "A 12 kg toddler with gastroenteritis voids a total of 216 mL of urine over 6 hours. What is this child's urine output in mL/kg/hr?",
          "opts": [
            "1.5 mL/kg/hr",
            "3 mL/kg/hr",
            "6 mL/kg/hr",
            "18 mL/kg/hr"
          ],
          "ans": [
            1
          ],
          "why": "Divide by weight, then by hours: 216 mL divided by 12 kg is 18 mL/kg, and 18 divided by 6 hours is <b>3 mL/kg/hr</b>. Choosing 18 is the usual error, because that number is the output per kilogram for the whole 6 hours, not the <b>hourly</b> rate.",
          "id": "nur235-m14-q14",
          "type": "single",
          "sourceNumber": 14
        },
        {
          "q": "A nurse is reviewing first-year growth and development with the parents of a newborn. Which of the nurse's teaching points are accurate? Select all that apply.",
          "opts": [
            "Birth weight usually doubles by about 6 months of age",
            "Birth weight usually triples by about 12 months of age",
            "The anterior fontanelle usually closes between 12 and 18 months",
            "The anterior fontanelle usually closes by 6 months of age",
            "Birth weight usually quadruples by about 12 months of age"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "The three numbers to keep are weight <b>doubling at 6 months</b>, <b>tripling at 12 months</b>, and anterior fontanelle closure at <b>12 to 18 months</b>. Closing the fontanelle at 6 months is the tempting error because it pairs with the 6-month weight milestone, but the anterior fontanelle stays open well into the second year.",
          "id": "nur235-m14-q15",
          "type": "sata",
          "sourceNumber": 15
        }
      ],
      "reflective": false
    },
    {
      "id": "nur258-m8",
      "course": "NUR 258",
      "module": 8,
      "topic": "Traumatic, Infectious, Oncologic & Degenerative Neuro",
      "title": "Neuro Clue Rooms",
      "icon": "🧠",
      "tagline": "Notice the time course, weakness and changes in attention.",
      "robot": {
        "src": "rustic-coach.webp",
        "width": 427,
        "height": 512
      },
      "illustration": {
        "src": "nur258-m8.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur258-module-08-neuro-trauma-infection-oncology-degenerative.html",
      "source": "../nur258-module-08-neuro-trauma-infection-oncology-degenerative.html",
      "pairs": [
        {
          "category": "Head injury",
          "prompt": "Blood between skull and dura?",
          "answer": "Epidural hematoma",
          "id": "nur258-m8-p01"
        },
        {
          "category": "Head injury",
          "prompt": "Blood between dura and arachnoid?",
          "answer": "Subdural hematoma",
          "id": "nur258-m8-p02"
        },
        {
          "category": "Head injury",
          "prompt": "A lucid interval after trauma can suggest what?",
          "answer": "Expanding epidural bleeding",
          "id": "nur258-m8-p03"
        },
        {
          "category": "Assessment",
          "prompt": "Bruising behind the ear after head trauma?",
          "answer": "Battle sign",
          "id": "nur258-m8-p04"
        },
        {
          "category": "Assessment",
          "prompt": "Periorbital bruising after head trauma?",
          "answer": "Raccoon eyes",
          "id": "nur258-m8-p05"
        },
        {
          "category": "Spinal cord",
          "prompt": "Temporary loss of reflexes below a spinal injury?",
          "answer": "Spinal shock",
          "id": "nur258-m8-p06"
        },
        {
          "category": "Spinal cord",
          "prompt": "Hypotension with bradycardia after high spinal injury?",
          "answer": "Neurogenic shock",
          "id": "nur258-m8-p07"
        },
        {
          "category": "Spinal cord",
          "prompt": "Severe hypertension, headache and flushing with a high spinal lesion?",
          "answer": "Autonomic dysreflexia",
          "id": "nur258-m8-p08"
        },
        {
          "category": "Spinal cord",
          "prompt": "Common trigger checked early in autonomic dysreflexia?",
          "answer": "Bladder distension or blocked drainage",
          "id": "nur258-m8-p09"
        },
        {
          "category": "Position",
          "prompt": "What turning method preserves spinal alignment?",
          "answer": "Log rolling",
          "id": "nur258-m8-p10"
        },
        {
          "category": "Airway",
          "prompt": "Which airway maneuver is used when cervical injury is suspected?",
          "answer": "Jaw thrust",
          "id": "nur258-m8-p11"
        },
        {
          "category": "Meninges",
          "prompt": "Inflammation of the membranes around brain and spinal cord?",
          "answer": "Meningitis",
          "id": "nur258-m8-p12"
        },
        {
          "category": "CSF",
          "prompt": "Cloudy CSF with low glucose and high protein suggests what?",
          "answer": "Bacterial meningitis pattern",
          "id": "nur258-m8-p13"
        },
        {
          "category": "CSF",
          "prompt": "Which procedure samples cerebrospinal fluid?",
          "answer": "Lumbar puncture",
          "id": "nur258-m8-p14"
        },
        {
          "category": "Neuro",
          "prompt": "Central nervous system demyelinating disease?",
          "answer": "Multiple sclerosis",
          "id": "nur258-m8-p15"
        },
        {
          "category": "Neuro",
          "prompt": "Fatigable skeletal muscle weakness with ptosis?",
          "answer": "Myasthenia gravis",
          "id": "nur258-m8-p16"
        },
        {
          "category": "Medication",
          "prompt": "Which drug improves neuromuscular transmission in myasthenia?",
          "answer": "Pyridostigmine",
          "id": "nur258-m8-p17"
        },
        {
          "category": "Neuro",
          "prompt": "Progressive ascending weakness after an infection?",
          "answer": "Guillain-Barré syndrome",
          "id": "nur258-m8-p18"
        },
        {
          "category": "Neuro",
          "prompt": "Tremor, rigidity and bradykinesia suggest what?",
          "answer": "Parkinson disease",
          "id": "nur258-m8-p19"
        },
        {
          "category": "Neuro",
          "prompt": "Progressive motor neuron loss with relatively preserved sensation?",
          "answer": "Amyotrophic lateral sclerosis",
          "id": "nur258-m8-p20"
        },
        {
          "category": "Cognition",
          "prompt": "Acute, fluctuating inattention and confusion?",
          "answer": "Delirium",
          "id": "nur258-m8-p21"
        },
        {
          "category": "Cognition",
          "prompt": "Chronic progressive cognitive decline?",
          "answer": "Dementia",
          "id": "nur258-m8-p22"
        },
        {
          "category": "Assessment",
          "prompt": "Drooping eyelids are called what?",
          "answer": "Ptosis",
          "id": "nur258-m8-p23"
        },
        {
          "category": "Care",
          "prompt": "Why coordinate meals with peak strength in myasthenia?",
          "answer": "Support safer chewing and swallowing",
          "id": "nur258-m8-p24"
        }
      ],
      "cases": [
        {
          "q": "A client with a T4 spinal cord injury has BP 208/112, HR 48, a pounding headache and flushing above the injury. What does the nurse do first?",
          "opts": [
            "Administer the prescribed antihypertensive",
            "Sit the client upright",
            "Check for a fecal impaction",
            "Lay the client flat and elevate the legs"
          ],
          "ans": [
            1
          ],
          "why": "In autonomic dysreflexia the first action is to <b>sit her up</b>, which uses gravity to drop the blood pressure immediately, then find and remove the trigger - check the bladder before the bowel. Antihypertensives are an adjunct, not the first move, and lying flat worsens the hypertension.",
          "id": "nur258-m8-q01",
          "type": "single",
          "sourceNumber": 1
        },
        {
          "q": "On the first day after spinal surgery, which finding does the nurse report immediately?",
          "opts": [
            "Blood pressure drifting from 122/78 to 110/70",
            "Pain rated 4 then 5 then 4",
            "Progressive left leg weakness now unable to lift the leg",
            "Requesting a second pillow"
          ],
          "ans": [
            2
          ],
          "why": "<b>Progressive motor loss distal to the surgical site is the concerning trend</b> and suggests cord compromise. Small BP drift and pain oscillating between 4 and 5 are noise - trend items reward spotting the finding that moves in one direction.",
          "id": "nur258-m8-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "A client is admitted with suspected bacterial meningitis. Which nursing actions are appropriate? Select all that apply.",
          "opts": [
            "Initiate droplet precautions",
            "Place the client in a negative-pressure room with N95 use",
            "Elevate the head of the bed 30 degrees",
            "Assess for a petechial rash on the trunk and extremities",
            "Keep the room brightly lit for frequent neuro checks"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "Bacterial (meningococcal) meningitis needs <b>droplet precautions, HOB at 30 degrees, and monitoring for a petechial rash with a falling LOC</b>. Negative pressure and N95 belong to airborne conditions, and photophobia makes a bright room actively unkind.",
          "id": "nur258-m8-q04",
          "type": "sata",
          "sourceNumber": 4
        },
        {
          "q": "A client is placed in a halo device. Which nursing action is the priority?",
          "opts": [
            "Perform neurovascular checks of all extremities",
            "Loosen the vest bars slightly for comfort",
            "Use the vest bars to reposition the client in bed",
            "Clean the pin sites with an alcohol-based solution"
          ],
          "ans": [
            0
          ],
          "why": "The priority is <b>neurovascular checks of all extremities</b> - the device exists to protect the cord, and circulation and function tell you it is doing so. Never lift or turn a client by the vest bars, never remove the device, and keep a wrench taped to the vest for emergency CPR access.",
          "id": "nur258-m8-q06",
          "type": "single",
          "sourceNumber": 6
        },
        {
          "q": "A client with a spinal cord injury at T4 suddenly develops a pounding headache, flushing above the injury, and a blood pressure of 202/110 mm Hg. Which action does the nurse take first?",
          "opts": [
            "Sit the client upright",
            "Administer the prescribed antihypertensive",
            "Check for a kinked urinary catheter",
            "Notify the provider"
          ],
          "ans": [
            0
          ],
          "why": "This is <b>autonomic dysreflexia</b>, and it can stroke the client within minutes. <b>Sitting upright is first</b> because gravity alone drops the blood pressure immediately and costs nothing. Then find and remove the trigger - a blocked catheter is the commonest, followed by impaction and skin pressure. Drugs come after position and trigger removal.",
          "id": "nur258-m8-q07",
          "type": "single",
          "sourceNumber": 7
        },
        {
          "q": "A client with Parkinson's disease is prescribed carbidopa-levodopa. Which client statement needs correction?",
          "opts": [
            "\"My urine and sweat may darken.\"",
            "\"I will take it with a high-protein meal so it does not upset my stomach.\"",
            "\"I should stand up slowly.\"",
            "\"It may take several weeks before I notice a real difference.\""
          ],
          "ans": [
            1
          ],
          "why": "<b>Dietary protein competes with levodopa for absorption</b>, so a high-protein meal blunts the dose - clients are taught to separate them. Darkened urine and sweat are harmless, orthostatic hypotension is real and common, and the full effect does take weeks.",
          "id": "nur258-m8-q09",
          "type": "single",
          "sourceNumber": 9
        },
        {
          "q": "A client is admitted with suspected bacterial meningitis. Which actions are priorities? Select all that apply.",
          "opts": [
            "Place the client on droplet precautions",
            "Give the prescribed antibiotic as soon as cultures are drawn",
            "Keep the room bright to help with orientation",
            "Assess neurological status frequently",
            "Position for comfort and reduce stimulation"
          ],
          "ans": [
            0,
            1,
            3,
            4
          ],
          "why": "Bacterial meningitis needs <b>droplet precautions</b> and antibiotics <b>within the hour</b> - delay costs lives, so cultures are drawn fast and the drug is not held for results. Photophobia is a hallmark, so the room is kept <b>dark and quiet</b>, not bright.",
          "id": "nur258-m8-q10",
          "type": "sata",
          "sourceNumber": 10
        },
        {
          "q": "A client with a suspected cervical spinal cord injury from a diving accident stops breathing while the nurse is at the bedside. Which action does the nurse take first?",
          "opts": [
            "Apply a cervical collar before addressing the airway",
            "Log roll the client onto a backboard",
            "Open the airway with a jaw thrust",
            "Open the airway with a head-tilt chin-lift"
          ],
          "ans": [
            2
          ],
          "why": "With a suspected spinal cord injury the airway is opened with a <b>jaw thrust</b>, which does not move the neck. The head-tilt chin-lift is the familiar maneuver and is exactly what must be avoided here, because extending the cervical spine can worsen the cord injury; collar and backboard follow the ABCs, not precede them.",
          "id": "nur258-m8-q12",
          "type": "single",
          "sourceNumber": 12
        },
        {
          "q": "A client admitted with Guillain-Barre syndrome after a recent infection now has weakness that has ascended from the feet to the upper thighs. Which assessment is the priority?",
          "opts": [
            "Pulse oximetry readings",
            "Vital capacity",
            "Deep tendon reflexes in the legs",
            "Ability to ambulate safely"
          ],
          "ans": [
            1
          ],
          "why": "Guillain-Barre ascends, so the threat is that the paralysis reaches the diaphragm and ventilation fails; <b>vital capacity</b> is what detects that early. Pulse oximetry looks like the respiratory answer, but oxygen saturation falls late — after respiratory failure is already underway.",
          "id": "nur258-m8-q13",
          "type": "single",
          "sourceNumber": 13
        },
        {
          "q": "A client is brought to the emergency department after a motorcycle crash. Which findings would lead the nurse to suspect a basilar skull fracture? Select all that apply.",
          "opts": [
            "Bradycardia with hypotension",
            "Bruising behind the ear",
            "A ring of clear fluid around blood on the head dressing",
            "Pain when the flexed knee is straightened",
            "Bruising around both eyes"
          ],
          "ans": [
            1,
            2,
            4
          ],
          "why": "Battle's sign (bruising behind the ear), raccoon eyes and the <b>halo sign</b> — CSF ringing the blood on the dressing — are the three findings of a basilar skull fracture. Bradycardia with hypotension is neurogenic shock from lost sympathetic tone, and pain on straightening the flexed knee is Kernig's sign of meningitis.",
          "id": "nur258-m8-q15",
          "type": "sata",
          "sourceNumber": 15
        }
      ],
      "reflective": false
    },
    {
      "id": "nur258-m9",
      "course": "NUR 258",
      "module": 9,
      "topic": "Hematologic Disorders",
      "title": "Blood Lab Detective",
      "icon": "🩸",
      "tagline": "Explore cells, clotting and blood-test patterns.",
      "robot": {
        "src": "rustic-alex.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur258-m9.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur258-module-09-hematologic-disorders.html",
      "source": "../nur258-module-09-hematologic-disorders.html",
      "pairs": [
        {
          "category": "Cells",
          "prompt": "What does MCV describe?",
          "answer": "Average red blood cell size",
          "id": "nur258-m9-p01"
        },
        {
          "category": "Iron",
          "prompt": "Low ferritin with high TIBC suggests what?",
          "answer": "Iron deficiency",
          "id": "nur258-m9-p02"
        },
        {
          "category": "Size",
          "prompt": "Small red cells are called what?",
          "answer": "Microcytic",
          "id": "nur258-m9-p03"
        },
        {
          "category": "Size",
          "prompt": "Large red cells are called what?",
          "answer": "Macrocytic",
          "id": "nur258-m9-p04"
        },
        {
          "category": "B12",
          "prompt": "Macrocytic anemia with neurologic findings suggests what deficiency?",
          "answer": "Vitamin B12",
          "id": "nur258-m9-p05"
        },
        {
          "category": "Folate",
          "prompt": "Which other vitamin deficiency can cause megaloblastic anemia?",
          "answer": "Folate",
          "id": "nur258-m9-p06"
        },
        {
          "category": "Marrow",
          "prompt": "Marrow failure affecting several blood-cell lines?",
          "answer": "Aplastic anemia",
          "id": "nur258-m9-p07"
        },
        {
          "category": "Hemolysis",
          "prompt": "Premature destruction of red blood cells?",
          "answer": "Hemolytic anemia",
          "id": "nur258-m9-p08"
        },
        {
          "category": "Sickle cell",
          "prompt": "Which test characterizes abnormal hemoglobin?",
          "answer": "Hemoglobin electrophoresis",
          "id": "nur258-m9-p09"
        },
        {
          "category": "Sickle cell",
          "prompt": "Pain from blocked small vessels is called what?",
          "answer": "Vaso-occlusive crisis",
          "id": "nur258-m9-p10"
        },
        {
          "category": "Transfusion",
          "prompt": "Repeated transfusions can accumulate which mineral?",
          "answer": "Iron",
          "id": "nur258-m9-p11"
        },
        {
          "category": "Transfusion",
          "prompt": "New fever, chills and flank pain during transfusion require what first action?",
          "answer": "Stop the transfusion",
          "id": "nur258-m9-p12"
        },
        {
          "category": "Platelets",
          "prompt": "Low platelet count is called what?",
          "answer": "Thrombocytopenia",
          "id": "nur258-m9-p13"
        },
        {
          "category": "Platelets",
          "prompt": "Pinpoint nonblanching skin hemorrhages?",
          "answer": "Petechiae",
          "id": "nur258-m9-p14"
        },
        {
          "category": "HIT",
          "prompt": "Platelet fall with thrombosis risk after heparin exposure?",
          "answer": "Heparin-induced thrombocytopenia",
          "id": "nur258-m9-p15"
        },
        {
          "category": "Factors",
          "prompt": "Clotting factor VIII deficiency?",
          "answer": "Hemophilia A",
          "id": "nur258-m9-p16"
        },
        {
          "category": "Factors",
          "prompt": "Clotting factor IX deficiency?",
          "answer": "Hemophilia B",
          "id": "nur258-m9-p17"
        },
        {
          "category": "Coagulation",
          "prompt": "Widespread clotting with consumption of platelets and factors?",
          "answer": "Disseminated intravascular coagulation",
          "id": "nur258-m9-p18"
        },
        {
          "category": "Cells",
          "prompt": "Overproduction of red cells with hyperviscosity?",
          "answer": "Polycythemia vera",
          "id": "nur258-m9-p19"
        },
        {
          "category": "Cells",
          "prompt": "Low neutrophils increase risk of what?",
          "answer": "Infection",
          "id": "nur258-m9-p20"
        },
        {
          "category": "Cancer",
          "prompt": "Abnormal leukocyte proliferation in the marrow?",
          "answer": "Leukemia",
          "id": "nur258-m9-p21"
        },
        {
          "category": "Lymphoma",
          "prompt": "Which cells are associated with classic Hodgkin lymphoma?",
          "answer": "Reed-Sternberg cells",
          "id": "nur258-m9-p22"
        },
        {
          "category": "Myeloma",
          "prompt": "What does C in CRAB stand for?",
          "answer": "Elevated calcium",
          "id": "nur258-m9-p23"
        },
        {
          "category": "Myeloma",
          "prompt": "What does B in CRAB stand for?",
          "answer": "Bone lesions",
          "id": "nur258-m9-p24"
        }
      ],
      "cases": [
        {
          "q": "Fifteen minutes into a transfusion a client has chills, fever and flank pain. What does the nurse do first?",
          "opts": [
            "Notify the provider",
            "Stop the transfusion",
            "Slow the rate and reassess in 15 minutes",
            "Administer the prescribed antipyretic"
          ],
          "ans": [
            1
          ],
          "why": "For any suspected reaction the sequence is <b>stop the transfusion, keep the line open with 0.9 percent NS on new tubing, stay with the client, then notify</b>. Slowing the rate keeps incompatible blood going in, and notifying first delays the one action that stops the exposure.",
          "id": "nur258-m9-q01",
          "type": "single",
          "sourceNumber": 1
        },
        {
          "q": "A client with immune thrombocytopenia has four findings. Which one does the nurse act on first?",
          "opts": [
            "Scattered petechiae over both shins",
            "A nosebleed that lasted 10 minutes and stopped",
            "Severe headache with vomiting",
            "Bruising on the forearms"
          ],
          "ans": [
            2
          ],
          "why": "<b>Severe headache with vomiting in a thrombocytopenic client means intracranial hemorrhage until proven otherwise.</b> Petechiae and a nosebleed that has already stopped are expected findings that can wait.",
          "id": "nur258-m9-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "On day 7 of heparin therapy a client's platelets drop from 220,000 to 90,000 in 48 hours. Which actions does the nurse take? Select all that apply.",
          "opts": [
            "Stop the heparin",
            "Administer vitamin K",
            "Obtain daily platelet counts",
            "Start warfarin immediately",
            "Assess for signs of thrombosis"
          ],
          "ans": [
            0,
            2,
            4
          ],
          "why": "This is HIT: <b>stop the heparin, follow daily platelet counts, notify, and assess for clot</b>, because HIT clots as well as bleeds. Vitamin K is warfarin's antidote, and starting warfarin now is contraindicated - the falling platelet count makes bleeding look like the only risk, which is the trap.",
          "id": "nur258-m9-q04",
          "type": "sata",
          "sourceNumber": 4
        },
        {
          "q": "A client develops respiratory distress during a transfusion. Which finding distinguishes TACO from TRALI?",
          "opts": [
            "Fever and chills",
            "Crackles, jugular venous distention and hypertension",
            "Urticaria and itching",
            "Hemoglobinuria and flank pain"
          ],
          "ans": [
            1
          ],
          "why": "<b>TACO shows fluid-overload signs - crackles, JVD, hypertension - while TRALI produces respiratory distress without them.</b> The discriminator is overload, not the presence of dyspnea, which both share.",
          "id": "nur258-m9-q05",
          "type": "single",
          "sourceNumber": 5
        },
        {
          "q": "A client is receiving a unit of packed red blood cells. Fifteen minutes in, the client reports low back pain and chills, and the urine turns dark. What is the nurse's first action?",
          "opts": [
            "Slow the transfusion and continue observing",
            "Stop the transfusion and keep the line open with normal saline",
            "Give the prescribed antihistamine",
            "Obtain a urine specimen for analysis"
          ],
          "ans": [
            1
          ],
          "why": "Back pain, chills and dark urine early in a transfusion mean an <b>acute hemolytic reaction</b>. <b>Stop the blood, keep the vein open with saline through new tubing</b>, then notify and investigate. Slowing it is not enough - every further milliliter adds hemolysis. Antihistamines treat mild allergic reactions, which is a different picture.",
          "id": "nur258-m9-q07",
          "type": "single",
          "sourceNumber": 7
        },
        {
          "q": "Which laboratory findings would the nurse expect in iron-deficiency anemia? Select all that apply.",
          "opts": [
            "Low ferritin",
            "Microcytic, hypochromic red cells",
            "Elevated total iron-binding capacity",
            "Macrocytic red cells",
            "Low mean corpuscular volume"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Iron deficiency makes cells <b>small and pale</b> - low MCV, low ferritin - and the body raises its iron-binding capacity trying to catch more. <b>Macrocytic</b> cells point the other way, to <b>B12 or folate</b> deficiency, and separating those two anemias is worth a mark on every hematology exam.",
          "id": "nur258-m9-q08",
          "type": "sata",
          "sourceNumber": 8
        },
        {
          "q": "A client has disseminated intravascular coagulation. Which findings does the nurse expect? Select all that apply.",
          "opts": [
            "Prolonged PT and aPTT",
            "Low platelet count",
            "Elevated D-dimer",
            "Elevated fibrinogen",
            "Bleeding from IV sites with simultaneous clotting"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "DIC is the paradox: <b>clotting and bleeding at once</b>. Clotting consumes platelets and factors, so counts fall and times lengthen; the clot breakdown raises D-dimer. <b>Fibrinogen falls, not rises</b> - it is being used up - and that is the option most often chosen wrongly.",
          "id": "nur258-m9-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A client with sickle cell disease is admitted in vaso-occlusive crisis. Which interventions are appropriate? Select all that apply.",
          "opts": [
            "IV fluids",
            "Prescribed opioid analgesia on a schedule",
            "Supplemental oxygen if hypoxic",
            "Cold compresses to painful joints",
            "Assessment for infection"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Crisis care is <b>hydration, oxygenation and real pain control</b> - these clients are chronically undertreated for pain, and scheduled dosing beats chasing it. Infection is a common trigger. <b>Cold causes vasoconstriction and worsens sickling</b>; warmth is applied instead.",
          "id": "nur258-m9-q10",
          "type": "sata",
          "sourceNumber": 10
        },
        {
          "q": "A client admitted with polycythemia vera has a ruddy face, splenomegaly, and reports intense itching after a warm shower. Which nursing action is the priority?",
          "opts": [
            "Institute bleeding precautions because of the high cell counts",
            "Prepare to transfuse a unit of packed red blood cells",
            "Administer subcutaneous epoetin alfa as prescribed",
            "Encourage fluids and ambulation to reduce the risk of clot formation"
          ],
          "ans": [
            3
          ],
          "why": "In polycythemia vera the marrow <b>overproduces</b> red cells, so the blood is thick and the nursing priority is clot prevention while therapeutic phlebotomy remains the mainstay of treatment. Transfusion and epoetin alfa treat anemia — the opposite problem — and this client's risk is clotting, not bleeding.",
          "id": "nur258-m9-q14",
          "type": "single",
          "sourceNumber": 14
        },
        {
          "q": "A client admitted with leukemia has a platelet count of 18,000/mm³. Which interventions does the nurse include in the plan of care? Select all that apply.",
          "opts": [
            "Give ibuprofen as needed for bone pain",
            "Provide an electric razor for shaving",
            "Give scheduled medications by the intramuscular route",
            "Administer a stool softener to prevent straining",
            "Provide a soft toothbrush for oral care"
          ],
          "ans": [
            1,
            3,
            4
          ],
          "why": "Thrombocytopenia precautions are an electric razor, a soft toothbrush, stool softeners to prevent straining, and checking stool for occult blood; a count under 20,000 is a significant bleeding risk. <b>NSAIDs, aspirin, and heparin are avoided</b>, and injections and IV sticks are minimized rather than used routinely — ibuprofen looks reasonable for bone pain but it worsens bleeding.",
          "id": "nur258-m9-q15",
          "type": "sata",
          "sourceNumber": 15
        }
      ],
      "reflective": false
    },
    {
      "id": "nur258-m10",
      "course": "NUR 258",
      "module": 10,
      "topic": "Oncologic Disorders & End-of-Life Care",
      "title": "Oncology & Comfort Care Rounds",
      "icon": "🎗️",
      "tagline": "Take time for comfort, communication and patient goals.",
      "robot": {
        "src": "rustic-sam.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur258-m10.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur258-module-10-oncology-end-of-life.html",
      "source": "../nur258-module-10-oncology-end-of-life.html",
      "pairs": [
        {
          "category": "Cancer",
          "prompt": "Tissue sample examined for diagnosis?",
          "answer": "Biopsy",
          "id": "nur258-m10-p01"
        },
        {
          "category": "Cancer",
          "prompt": "How abnormal cells look under the microscope?",
          "answer": "Grade",
          "id": "nur258-m10-p02"
        },
        {
          "category": "Cancer",
          "prompt": "Extent of cancer and its spread?",
          "answer": "Stage",
          "id": "nur258-m10-p03"
        },
        {
          "category": "TNM",
          "prompt": "T describes what?",
          "answer": "Primary tumor",
          "id": "nur258-m10-p04"
        },
        {
          "category": "TNM",
          "prompt": "N describes what?",
          "answer": "Regional lymph nodes",
          "id": "nur258-m10-p05"
        },
        {
          "category": "TNM",
          "prompt": "M describes what?",
          "answer": "Distant metastasis",
          "id": "nur258-m10-p06"
        },
        {
          "category": "Prevention",
          "prompt": "Reducing exposure before disease develops?",
          "answer": "Primary prevention",
          "id": "nur258-m10-p07"
        },
        {
          "category": "Prevention",
          "prompt": "Screening to detect disease early?",
          "answer": "Secondary prevention",
          "id": "nur258-m10-p08"
        },
        {
          "category": "Prevention",
          "prompt": "Reducing complications of established disease?",
          "answer": "Tertiary prevention",
          "id": "nur258-m10-p09"
        },
        {
          "category": "Radiation",
          "prompt": "Treatment delivered from a machine outside the body?",
          "answer": "External beam radiation",
          "id": "nur258-m10-p10"
        },
        {
          "category": "Radiation",
          "prompt": "Radioactive source placed in or near the tumor?",
          "answer": "Brachytherapy",
          "id": "nur258-m10-p11"
        },
        {
          "category": "Chemo",
          "prompt": "Drug leaking from a vessel into tissue?",
          "answer": "Extravasation",
          "id": "nur258-m10-p12"
        },
        {
          "category": "Chemo",
          "prompt": "First infusion action with suspected vesicant extravasation?",
          "answer": "Stop the infusion",
          "id": "nur258-m10-p13"
        },
        {
          "category": "Chemo",
          "prompt": "Painful inflammation of the oral mucosa?",
          "answer": "Stomatitis",
          "id": "nur258-m10-p14"
        },
        {
          "category": "Chemo",
          "prompt": "Treatment-associated hair loss?",
          "answer": "Alopecia",
          "id": "nur258-m10-p15"
        },
        {
          "category": "Marrow",
          "prompt": "Reduction of red cells, white cells and platelets?",
          "answer": "Pancytopenia",
          "id": "nur258-m10-p16"
        },
        {
          "category": "Emergency",
          "prompt": "Rapid cell breakdown releasing potassium, phosphate and uric acid?",
          "answer": "Tumor lysis syndrome",
          "id": "nur258-m10-p17"
        },
        {
          "category": "Emergency",
          "prompt": "Facial and upper-body swelling from impaired venous return?",
          "answer": "Superior vena cava syndrome",
          "id": "nur258-m10-p18"
        },
        {
          "category": "Emergency",
          "prompt": "New back pain and neurologic changes in cancer raise concern for what?",
          "answer": "Spinal cord compression",
          "id": "nur258-m10-p19"
        },
        {
          "category": "Transplant",
          "prompt": "Donor immune cells attacking recipient tissues?",
          "answer": "Graft-versus-host disease",
          "id": "nur258-m10-p20"
        },
        {
          "category": "Care goals",
          "prompt": "Symptom relief that may accompany disease-directed treatment?",
          "answer": "Palliative care",
          "id": "nur258-m10-p21"
        },
        {
          "category": "Care goals",
          "prompt": "Care focused on comfort near the end of life?",
          "answer": "Hospice care",
          "id": "nur258-m10-p22"
        },
        {
          "category": "Communication",
          "prompt": "What should guide discussions about treatment burdens and benefits?",
          "answer": "The patient's goals and values",
          "id": "nur258-m10-p23"
        },
        {
          "category": "Communication",
          "prompt": "A written record of future care preferences?",
          "answer": "Advance directive",
          "id": "nur258-m10-p24"
        }
      ],
      "cases": [
        {
          "q": "A client receiving curative chemotherapy asks about palliative care. Which response is accurate?",
          "opts": [
            "Palliative care can begin now, alongside your treatment",
            "Palliative care starts only when treatment stops working",
            "Palliative care requires a prognosis of 6 months or less",
            "Palliative care and hospice are the same program"
          ],
          "ans": [
            0
          ],
          "why": "<b>Palliative care runs alongside curative treatment at any stage; hospice requires a terminal prognosis of about 6 months or less and a shift away from curative treatment.</b> Conflating the two is asked constantly.",
          "id": "nur258-m10-q05",
          "type": "single",
          "sourceNumber": 5
        },
        {
          "q": "Two days after starting chemotherapy for a bulky lymphoma, which lab pattern indicates tumor lysis syndrome?",
          "opts": [
            "Low potassium, low phosphorus, high calcium, low uric acid",
            "High potassium, high phosphorus, low calcium, high uric acid",
            "High potassium, low phosphorus, high calcium, normal uric acid",
            "Normal potassium, high phosphorus, high calcium, high uric acid"
          ],
          "ans": [
            1
          ],
          "why": "Lysed cells dump <b>potassium, phosphorus and uric acid up, with calcium down</b> as phosphate binds it, risking arrhythmias and AKI. Prevention and treatment are aggressive IV fluids plus allopurinol or rasburicase - methotrexate is chemotherapy, not a treatment.",
          "id": "nur258-m10-q06",
          "type": "single",
          "sourceNumber": 6
        },
        {
          "q": "A nurse is caring for a client who has an absolute neutrophil count of 400/mm3 following chemotherapy. Which actions should the nurse take? (Select all that apply.)",
          "opts": [
            "Place the client in a private room",
            "Have the client wear a mask when leaving the room for transport",
            "Assign the client a roommate who is also immunosuppressed",
            "Perform hand hygiene before and after every client contact",
            "Take a rectal temperature to obtain the most accurate reading",
            "Report a temperature above 37.8° C (100° F) to the provider immediately"
          ],
          "ans": [
            0,
            1,
            3,
            5
          ],
          "why": "Neutropenic precautions include a private room, a mask for transport, strict hand hygiene, and avoiding unnecessary invasive procedures, with any fever above 37.8° C (100° F) reported to the provider immediately. Assigning a roommate who is also immunosuppressed increases cross-infection risk rather than reducing it, and a rectal temperature is an invasive procedure that risks mucosal trauma and introducing infection in a neutropenic client, so it should be avoided.",
          "id": "nur258-m10-q07",
          "type": "sata",
          "sourceNumber": 7
        },
        {
          "q": "A client receiving chemotherapy has an absolute neutrophil count of 400/mm³. Which instruction is most important?",
          "opts": [
            "Avoid crowds and anyone who is unwell",
            "Use a soft toothbrush and an electric razor",
            "Increase dietary iron",
            "Rest frequently throughout the day"
          ],
          "ans": [
            0
          ],
          "why": "An ANC under 500 is <b>severe neutropenia</b>, and infection is what kills these clients - a fever becomes an emergency. Soft toothbrush and electric razor are the <b>thrombocytopenia</b> precautions, and rest addresses anemia. Matching the precaution to the cell line that is low is the skill being tested.",
          "id": "nur258-m10-q08",
          "type": "single",
          "sourceNumber": 8
        },
        {
          "q": "Which statements about a client's advance directive are correct? Select all that apply.",
          "opts": [
            "It takes effect only when the client cannot make decisions",
            "The client may revoke it at any time",
            "A durable power of attorney names a decision maker",
            "It requires a provider's approval to be valid",
            "A DNR order means comfort care is withdrawn"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "An advance directive is the client's voice when they no longer have one, and it is <b>revocable at any time</b> by the client, not the provider. <b>A DNR is not 'do not treat'</b> - pain control, positioning, hygiene and dignity all continue, and that misunderstanding causes real suffering.",
          "id": "nur258-m10-q09",
          "type": "sata",
          "sourceNumber": 9
        },
        {
          "q": "A client near the end of life develops noisy, gurgling respirations. Which nursing action is most appropriate?",
          "opts": [
            "Perform deep suctioning every hour",
            "Reposition to a side-lying position and give the prescribed antimuscarinic",
            "Increase IV fluids to thin the secretions",
            "Withhold all sedation so the client stays alert"
          ],
          "ans": [
            1
          ],
          "why": "So-called death rattle distresses the <b>family</b> more than the client. Repositioning plus an antimuscarinic such as glycopyrrolate reduces secretions. <b>Deep suctioning is traumatic and ineffective</b>, and extra fluid makes it worse.",
          "id": "nur258-m10-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A client with metastatic breast cancer reports new, persistent mid-back pain that started yesterday. She has full strength in both legs and is walking without difficulty. Which action should the nurse take first?",
          "opts": [
            "Notify the provider immediately about the new back pain",
            "Give the ordered acetaminophen and reassess in an hour",
            "Document the pain and report it if leg weakness develops",
            "Apply a heating pad and place the client on bed rest"
          ],
          "ans": [
            0
          ],
          "why": "New back pain is the <b>first sign of spinal cord compression</b>, and it appears before any weakness, so reporting it now is what gets steroids and radiation started while she can still walk. Medicating and waiting for weakness is the tempting choice, but by the time weakness or bowel and bladder changes appear the paralysis may be permanent.",
          "id": "nur258-m10-q11",
          "type": "single",
          "sourceNumber": 11
        },
        {
          "q": "A client is midway through a course of external beam radiation to the chest. Which statement by the client tells the nurse that more teaching is needed?",
          "opts": [
            "\"I dry the treated skin by rubbing it briskly with a towel.\"",
            "\"I wear a hat and stay out of the sun in the middle of the day.\"",
            "\"I do not put lotions or ointments on the area unless the provider orders them.\"",
            "\"My grandchildren can sit on my lap because I am not radioactive.\""
          ],
          "ans": [
            0
          ],
          "why": "<b>Skin protection is the priority</b> with external beam radiation, so treated skin is patted dry and never rubbed with a towel. The statement about the grandchildren sounds like a dangerous mistake, but it is correct teaching: external beam clients are not radioactive, and only a client with a brachytherapy source in place emits radiation.",
          "id": "nur258-m10-q17",
          "type": "single",
          "sourceNumber": 17
        },
        {
          "q": "A client receiving chemotherapy reports a sore, burning mouth and says he is eating very little because food hurts and tastes strange. Which interventions should the nurse include in the plan of care? Select all that apply.",
          "opts": [
            "Rinse the mouth with normal saline or a sodium bicarbonate solution",
            "Apply the ordered topical anesthetic before meals",
            "Offer cold or room-temperature foods in small, frequent, nutrient-dense portions",
            "Rinse with an alcohol-based mouthwash after every meal",
            "Encourage citrus juices and salty broths to stimulate the appetite"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Saline or bicarbonate rinses, a topical anesthetic before meals, and small frequent cold or room-temperature meals soothe inflamed mucosa and are the best tolerated. An <b>alcohol-based mouthwash</b> is the classic wrong answer because it dries and burns broken mucosa, and acidic or salty items are avoided for the same reason.",
          "id": "nur258-m10-q19",
          "type": "sata",
          "sourceNumber": 19
        }
      ],
      "reflective": true
    },
    {
      "id": "nur258-m11",
      "course": "NUR 258",
      "module": 11,
      "topic": "Reproductive Disorders",
      "title": "Reproductive Care Clinic",
      "icon": "📋",
      "tagline": "Connect reproductive symptoms with respectful assessment.",
      "robot": {
        "src": "rustic-jordan.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur258-m11.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur258-module-11-reproductive-disorders.html",
      "source": "../nur258-module-11-reproductive-disorders.html",
      "pairs": [
        {
          "category": "Anatomy",
          "prompt": "Uterine lining-like tissue outside the uterus?",
          "answer": "Endometriosis",
          "id": "nur258-m11-p01"
        },
        {
          "category": "Symptoms",
          "prompt": "Painful menstruation?",
          "answer": "Dysmenorrhea",
          "id": "nur258-m11-p02"
        },
        {
          "category": "Symptoms",
          "prompt": "Pain with intercourse?",
          "answer": "Dyspareunia",
          "id": "nur258-m11-p03"
        },
        {
          "category": "Symptoms",
          "prompt": "Pain with defecation?",
          "answer": "Dyschezia",
          "id": "nur258-m11-p04"
        },
        {
          "category": "Infection",
          "prompt": "Upper reproductive tract infection that can cause tubal scarring?",
          "answer": "Pelvic inflammatory disease",
          "id": "nur258-m11-p05"
        },
        {
          "category": "Endocrine",
          "prompt": "Hyperandrogenism with ovulatory dysfunction may indicate what?",
          "answer": "Polycystic ovary syndrome",
          "id": "nur258-m11-p06"
        },
        {
          "category": "Medication",
          "prompt": "GnRH agonist used in selected endometriosis treatment?",
          "answer": "Leuprolide",
          "id": "nur258-m11-p07"
        },
        {
          "category": "Safety",
          "prompt": "Why monitor bone health with prolonged estrogen suppression?",
          "answer": "Risk of reduced bone density",
          "id": "nur258-m11-p08"
        },
        {
          "category": "Breast",
          "prompt": "Noninvasive cancer confined to breast ducts?",
          "answer": "Ductal carcinoma in situ",
          "id": "nur258-m11-p09"
        },
        {
          "category": "Breast",
          "prompt": "Orange-peel breast skin is called what?",
          "answer": "Peau d'orange",
          "id": "nur258-m11-p10"
        },
        {
          "category": "Nodes",
          "prompt": "First draining node evaluated for tumor spread?",
          "answer": "Sentinel lymph node",
          "id": "nur258-m11-p11"
        },
        {
          "category": "Nodes",
          "prompt": "Swelling from impaired lymph drainage after node treatment?",
          "answer": "Lymphedema",
          "id": "nur258-m11-p12"
        },
        {
          "category": "Imaging",
          "prompt": "What is avoided on the axilla on mammography day?",
          "answer": "Deodorant, lotion and powder",
          "id": "nur258-m11-p13"
        },
        {
          "category": "Ovary",
          "prompt": "Persistent bloating and early satiety can suggest which cancer?",
          "answer": "Ovarian cancer",
          "id": "nur258-m11-p14"
        },
        {
          "category": "Marker",
          "prompt": "CA-125 is mainly useful for what role in known ovarian cancer?",
          "answer": "Monitoring disease and treatment response",
          "id": "nur258-m11-p15"
        },
        {
          "category": "Uterus",
          "prompt": "Postmenopausal bleeding requires evaluation of which lining?",
          "answer": "Endometrium",
          "id": "nur258-m11-p16"
        },
        {
          "category": "Surgery",
          "prompt": "Removal of the uterus?",
          "answer": "Hysterectomy",
          "id": "nur258-m11-p17"
        },
        {
          "category": "Prostate",
          "prompt": "Benign enlargement obstructing urine flow?",
          "answer": "Benign prostatic hyperplasia",
          "id": "nur258-m11-p18"
        },
        {
          "category": "Prostate",
          "prompt": "Endoscopic resection through the urethra?",
          "answer": "TURP",
          "id": "nur258-m11-p19"
        },
        {
          "category": "Drainage",
          "prompt": "Why use continuous bladder irrigation after selected prostate surgery?",
          "answer": "Maintain drainage and limit clot obstruction",
          "id": "nur258-m11-p20"
        },
        {
          "category": "Math",
          "prompt": "How is true urine output estimated during bladder irrigation?",
          "answer": "Total drainage minus irrigant instilled",
          "id": "nur258-m11-p21"
        },
        {
          "category": "Assessment",
          "prompt": "Suprapubic pressure with failure to void suggests what?",
          "answer": "Urinary retention",
          "id": "nur258-m11-p22"
        },
        {
          "category": "Emergency",
          "prompt": "Sudden severe unilateral testicular pain raises concern for what?",
          "answer": "Testicular torsion",
          "id": "nur258-m11-p23"
        },
        {
          "category": "Safety",
          "prompt": "New fever, redness and foul drainage after surgery suggest what?",
          "answer": "Postoperative infection",
          "id": "nur258-m11-p24"
        }
      ],
      "cases": [
        {
          "q": "A nurse is calculating intake and output for a client with continuous bladder irrigation. Which is correct?",
          "opts": [
            "Count the irrigant as intake and all drainage as output",
            "Subtract the irrigant volume so it is not counted in intake or output",
            "Count only half the irrigant as intake",
            "Count the irrigant as output only"
          ],
          "ans": [
            1
          ],
          "why": "<b>The irrigant is not counted in I&O</b> - it goes in and comes right back out, so including it invents both intake and urine that never existed. Subtract the irrigation volume from total drainage to get true urine output.",
          "id": "nur258-m11-q05",
          "type": "single",
          "sourceNumber": 5
        },
        {
          "q": "A client taking sildenafil for erectile dysfunction should avoid which medication?",
          "opts": [
            "Acetaminophen",
            "Amoxicillin",
            "Nitroglycerin",
            "Ibuprofen"
          ],
          "ans": [
            2
          ],
          "why": "PDE5 inhibitors - recognize the <b>-afil</b> ending - are contraindicated with <b>nitrates</b> such as nitroglycerin and amyl nitrate, and cause additive hypotension with doxazosin. Acetaminophen and amoxicillin were specifically named as safe.",
          "id": "nur258-m11-q06",
          "type": "single",
          "sourceNumber": 6
        },
        {
          "q": "A 17-year-old client arrives in the emergency department with sudden severe left scrotal pain, swelling, and nausea, and the left testicle appears high-riding. Symptoms began 2 hours ago. Which action should the nurse take first?",
          "opts": [
            "Notify the provider immediately and prepare the client for surgical evaluation",
            "Apply ice, elevate the scrotum, and reassess the client in a few hours",
            "Teach the client to perform a monthly testicular self-exam after a warm shower",
            "Collect a urine specimen and anticipate treatment for an infection"
          ],
          "ans": [
            0
          ],
          "why": "Sudden severe unilateral pain with swelling, nausea and a high-riding testicle points to <b>testicular torsion</b>, a true surgical emergency with roughly a <b>6-hour window</b> to save the testicle. Waiting and reassessing is the tempting choice but torsion is never a watch-and-see problem, and self-exam teaching or urine testing only delays the surgery that saves the organ.",
          "id": "nur258-m11-q09",
          "type": "single",
          "sourceNumber": 9
        },
        {
          "q": "A 62-year-old client who completed menopause 10 years ago reports a week of vaginal spotting. She has been taking tamoxifen for 3 years. Which response by the nurse is most appropriate?",
          "opts": [
            "Report the bleeding to the provider today, because bleeding after menopause is never normal",
            "Explain that occasional light spotting is common in the years after menopause",
            "Reassure her that spotting is an expected side effect of tamoxifen and needs no follow-up",
            "Arrange a CA-125 blood test to screen her for a reproductive cancer"
          ],
          "ans": [
            0
          ],
          "why": "<b>Postmenopausal bleeding is always abnormal and always referred</b> — it is exactly why endometrial cancer tends to be caught earlier than ovarian cancer. Tamoxifen is a reason for higher suspicion, not reassurance, because it raises endometrial cancer risk by stimulating uterine estrogen receptors, and CA-125 tracks known disease and is <b>not a screening test</b>.",
          "id": "nur258-m11-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A client with benign prostatic hyperplasia is started on tamsulosin and tells the nurse he already gets up two or three times each night to urinate. Which instruction is the priority?",
          "opts": [
            "Sit on the side of the bed for a moment before standing when you get up at night",
            "Expect this medication to shrink your prostate within about a week",
            "Take an over-the-counter antihistamine at bedtime to reduce nighttime trips",
            "Stop taking the medication as soon as your urine stream improves"
          ],
          "ans": [
            0
          ],
          "why": "Tamsulosin relaxes the bladder outlet and causes <b>orthostatic hypotension</b>, which is most dangerous during nighttime voiding, so fall prevention is the priority teaching. Shrinking the prostate is finasteride's effect and takes up to 6 months, and <b>antihistamines worsen retention in BPH</b> rather than helping.",
          "id": "nur258-m11-q11",
          "type": "single",
          "sourceNumber": 11
        }
      ],
      "reflective": false
    },
    {
      "id": "nur258-m12",
      "course": "NUR 258",
      "module": 12,
      "topic": "Disaster, Mass Casualty & Emergency Nursing",
      "title": "Disaster Triage Desk",
      "icon": "🚑",
      "tagline": "Practice adult START decisions with complete scenario clues.",
      "robot": {
        "src": "rustic-maya.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur258-m12.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur258-module-12-disaster-emergency-nursing.html",
      "source": "../nur258-module-12-disaster-emergency-nursing.html",
      "pairs": [
        {
          "category": "Setting",
          "prompt": "Which triage setting uses resource-limited disaster tags?",
          "answer": "Mass-casualty incident",
          "id": "nur258-m12-p01"
        },
        {
          "category": "Setting",
          "prompt": "Which five-level scale is used in many emergency departments?",
          "answer": "Emergency Severity Index",
          "id": "nur258-m12-p02"
        },
        {
          "category": "Tags",
          "prompt": "Immediate treatment category?",
          "answer": "Red tag",
          "id": "nur258-m12-p03"
        },
        {
          "category": "Tags",
          "prompt": "Delayed treatment category?",
          "answer": "Yellow tag",
          "id": "nur258-m12-p04"
        },
        {
          "category": "Tags",
          "prompt": "Minor or walking-wounded category?",
          "answer": "Green tag",
          "id": "nur258-m12-p05"
        },
        {
          "category": "Tags",
          "prompt": "In adult START, still apneic after airway repositioning?",
          "answer": "Black tag",
          "id": "nur258-m12-p06"
        },
        {
          "category": "START",
          "prompt": "R in RPM assesses what?",
          "answer": "Respirations",
          "id": "nur258-m12-p07"
        },
        {
          "category": "START",
          "prompt": "P in RPM assesses what?",
          "answer": "Perfusion",
          "id": "nur258-m12-p08"
        },
        {
          "category": "START",
          "prompt": "M in RPM assesses what?",
          "answer": "Mental status",
          "id": "nur258-m12-p09"
        },
        {
          "category": "Survey",
          "prompt": "A in the primary survey?",
          "answer": "Airway with cervical spine protection",
          "id": "nur258-m12-p10"
        },
        {
          "category": "Survey",
          "prompt": "B in the primary survey?",
          "answer": "Breathing",
          "id": "nur258-m12-p11"
        },
        {
          "category": "Survey",
          "prompt": "C in the primary survey?",
          "answer": "Circulation and hemorrhage control",
          "id": "nur258-m12-p12"
        },
        {
          "category": "Survey",
          "prompt": "D in the primary survey?",
          "answer": "Disability: neurologic status",
          "id": "nur258-m12-p13"
        },
        {
          "category": "Survey",
          "prompt": "E in the primary survey?",
          "answer": "Exposure with temperature protection",
          "id": "nur258-m12-p14"
        },
        {
          "category": "History",
          "prompt": "A in AMPLE?",
          "answer": "Allergies",
          "id": "nur258-m12-p15"
        },
        {
          "category": "History",
          "prompt": "M in AMPLE?",
          "answer": "Medications",
          "id": "nur258-m12-p16"
        },
        {
          "category": "History",
          "prompt": "P in AMPLE?",
          "answer": "Past medical history",
          "id": "nur258-m12-p17"
        },
        {
          "category": "History",
          "prompt": "L in AMPLE?",
          "answer": "Last meal",
          "id": "nur258-m12-p18"
        },
        {
          "category": "History",
          "prompt": "E in AMPLE?",
          "answer": "Events surrounding the injury",
          "id": "nur258-m12-p19"
        },
        {
          "category": "Chest",
          "prompt": "Pressurized pleural air compromising breathing and circulation?",
          "answer": "Tension pneumothorax",
          "id": "nur258-m12-p20"
        },
        {
          "category": "Crush",
          "prompt": "Which muscle pigment can injure the kidneys after major crush injury?",
          "answer": "Myoglobin",
          "id": "nur258-m12-p21"
        },
        {
          "category": "Heat",
          "prompt": "Severe hyperthermia with altered mental status?",
          "answer": "Heat stroke",
          "id": "nur258-m12-p22"
        },
        {
          "category": "Cold",
          "prompt": "Why handle a severely hypothermic patient gently?",
          "answer": "The cold myocardium is vulnerable to dysrhythmias",
          "id": "nur258-m12-p23"
        },
        {
          "category": "Poisoning",
          "prompt": "Why can a normal pulse oximeter reading mislead after smoke exposure?",
          "answer": "It may not reveal carbon monoxide poisoning",
          "id": "nur258-m12-p24"
        }
      ],
      "cases": [
        {
          "q": "A client rescued from a house fire has headache and dizziness, and SpO2 reads 98 percent on room air. What does the nurse do?",
          "opts": [
            "Document the normal saturation and continue monitoring",
            "Apply 100 percent oxygen by non-rebreather and obtain a carboxyhemoglobin level",
            "Apply 2 L by nasal cannula and recheck in an hour",
            "Prepare for immediate intubation"
          ],
          "ans": [
            1
          ],
          "why": "In carbon monoxide poisoning the <b>pulse oximeter is worthless</b> - the probe cannot distinguish oxyhemoglobin from carboxyhemoglobin, so it reads 98 percent on a poisoned client. Treatment is <b>100 percent oxygen by non-rebreather</b> plus a blood carboxyhemoglobin level; symptoms are mostly neurologic.",
          "id": "nur258-m12-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "A nurse in the emergency department is assessing a client. Which findings should prompt the nurse to further screen for possible human trafficking? (Select all that apply.)",
          "opts": [
            "Multiple bruises and burns in various stages of healing",
            "The client appears frightened and avoids eye contact while a companion answers all the questions",
            "Unexplained abdominal pain and a frightened demeanor",
            "The client arrives with a well-documented, consistent medical history",
            "Blunt abdominal trauma and periorbital bruising",
            "The client requests a routine follow-up appointment in 2 weeks"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Trafficking red flags include bruises, burns, or fractures in various stages of healing, a frightened or agitated demeanor with unexplained abdominal pain or headache, blunt abdominal trauma with black eyes, and a controlling companion who answers all questions for the client. A well-documented, consistent history and a routine follow-up request are unremarkable, reassuring findings that do not raise trafficking concern.",
          "id": "nur258-m12-q07",
          "type": "sata",
          "sourceNumber": 7
        },
        {
          "q": "During a mass casualty incident using START triage, a client is breathing at 34 breaths per minute with a capillary refill of 4 seconds and cannot follow simple commands. Which category applies?",
          "opts": [
            "Green - minor",
            "Yellow - delayed",
            "Red - immediate",
            "Black - expectant"
          ],
          "ans": [
            2
          ],
          "why": "START tags <b>red</b> for a respiratory rate over 30, capillary refill over 2 seconds or absent radial pulse, or inability to follow commands - and this client fails all three. Red means <b>treatable now and will die without it</b>. Black is reserved for those without spontaneous respiration after the airway is opened.",
          "id": "nur258-m12-q08",
          "type": "single",
          "sourceNumber": 8
        },
        {
          "q": "A client admitted after a motor vehicle crash suddenly becomes severely short of breath. The nurse notes a deviated trachea, absent breath sounds on the right, and unequal chest rise. Which action does the nurse anticipate first?",
          "opts": [
            "Prepare for immediate needle decompression",
            "Send the client for a stat chest x-ray to confirm the diagnosis",
            "Set up for chest tube insertion and wait for the provider",
            "Place the client in high-Fowler's position and apply a nonrebreather mask"
          ],
          "ans": [
            0
          ],
          "why": "Tension pneumothorax is diagnosed by <b>assessment</b>, not imaging, and needle decompression comes first, with the chest tube after. Waiting for the x-ray or for the chest tube setup delays the one intervention that relieves the pressure now.",
          "id": "nur258-m12-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A hospital-wide disaster alert is announced and the charge nurse must free medical-surgical beds. Which clients does the nurse identify as appropriate for early discharge? Select all that apply.",
          "opts": [
            "A client who required needle decompression two hours ago",
            "A client already awaiting discharge paperwork",
            "A client whose chest tube water seal is bubbling continuously",
            "A day-surgery client who is awake and ambulating",
            "A stable client with a well-controlled chronic condition"
          ],
          "ans": [
            1,
            3,
            4
          ],
          "why": "The clients discharged first are the <b>most stable</b> - those already awaiting discharge, day-surgery clients, and stable chronic clients. Continuous water-seal bubbling signals an air leak and the post-decompression client is still unstable, so neither is stable enough to leave despite having a plan of care that looks routine.",
          "id": "nur258-m12-q15",
          "type": "sata",
          "sourceNumber": 15
        }
      ],
      "reflective": false
    },
    {
      "id": "nur258-m13",
      "course": "NUR 258",
      "module": 13,
      "topic": "Shock & MODS",
      "title": "Shock Pattern Lab",
      "icon": "📈",
      "tagline": "Learn the four mechanisms behind poor perfusion.",
      "robot": {
        "src": "rustic-nurse.webp",
        "width": 427,
        "height": 512
      },
      "illustration": {
        "src": "nur258-m13.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur258-module-13-shock-mods.html",
      "source": "../nur258-module-13-shock-mods.html",
      "pairs": [
        {
          "category": "Mechanism",
          "prompt": "Shock from loss of circulating volume?",
          "answer": "Hypovolemic",
          "id": "nur258-m13-p01"
        },
        {
          "category": "Mechanism",
          "prompt": "Shock from cardiac pump failure?",
          "answer": "Cardiogenic",
          "id": "nur258-m13-p02"
        },
        {
          "category": "Mechanism",
          "prompt": "Shock from physical blockage of circulation?",
          "answer": "Obstructive",
          "id": "nur258-m13-p03"
        },
        {
          "category": "Mechanism",
          "prompt": "Shock involving loss of vascular tone?",
          "answer": "Distributive",
          "id": "nur258-m13-p04"
        },
        {
          "category": "Subtypes",
          "prompt": "Distributive shock associated with infection?",
          "answer": "Septic shock",
          "id": "nur258-m13-p05"
        },
        {
          "category": "Subtypes",
          "prompt": "Distributive shock from a severe allergic reaction?",
          "answer": "Anaphylactic shock",
          "id": "nur258-m13-p06"
        },
        {
          "category": "Subtypes",
          "prompt": "Distributive shock following loss of sympathetic tone?",
          "answer": "Neurogenic shock",
          "id": "nur258-m13-p07"
        },
        {
          "category": "Clues",
          "prompt": "Bradycardia with hypotension after a high spinal injury suggests what?",
          "answer": "Loss of sympathetic cardiovascular control",
          "id": "nur258-m13-p08"
        },
        {
          "category": "Clues",
          "prompt": "Major hemorrhage with poor perfusion indicates loss of what?",
          "answer": "Intravascular volume",
          "id": "nur258-m13-p09"
        },
        {
          "category": "Clues",
          "prompt": "Myocardial injury with pulmonary congestion suggests failure of what?",
          "answer": "The heart's pumping function",
          "id": "nur258-m13-p10"
        },
        {
          "category": "Obstruction",
          "prompt": "Pressurized air in the pleural space is what obstructive cause?",
          "answer": "Tension pneumothorax",
          "id": "nur258-m13-p11"
        },
        {
          "category": "Obstruction",
          "prompt": "Fluid compressing the heart is called what?",
          "answer": "Cardiac tamponade",
          "id": "nur258-m13-p12"
        },
        {
          "category": "Obstruction",
          "prompt": "Large thrombus blocking pulmonary circulation?",
          "answer": "Pulmonary embolism",
          "id": "nur258-m13-p13"
        },
        {
          "category": "Monitoring",
          "prompt": "Which calculated pressure reflects average arterial pressure?",
          "answer": "MAP",
          "id": "nur258-m13-p14"
        },
        {
          "category": "Monitoring",
          "prompt": "Which blood marker is trended in tissue hypoperfusion?",
          "answer": "Lactate",
          "id": "nur258-m13-p15"
        },
        {
          "category": "Monitoring",
          "prompt": "What output helps track renal perfusion?",
          "answer": "Urine output",
          "id": "nur258-m13-p16"
        },
        {
          "category": "Monitoring",
          "prompt": "What does new confusion require during shock assessment?",
          "answer": "Prompt reassessment of perfusion and other causes",
          "id": "nur258-m13-p17"
        },
        {
          "category": "Medication",
          "prompt": "First-line medication for anaphylaxis?",
          "answer": "Epinephrine",
          "id": "nur258-m13-p18"
        },
        {
          "category": "Medication",
          "prompt": "Common first-line vasopressor in septic shock?",
          "answer": "Norepinephrine",
          "id": "nur258-m13-p19"
        },
        {
          "category": "Medication",
          "prompt": "Which drug may treat norepinephrine extravasation under protocol?",
          "answer": "Phentolamine",
          "id": "nur258-m13-p20"
        },
        {
          "category": "Infection",
          "prompt": "What samples help identify the organism before antibiotics when feasible without delay?",
          "answer": "Blood cultures",
          "id": "nur258-m13-p21"
        },
        {
          "category": "MODS",
          "prompt": "Progressive dysfunction in multiple organ systems?",
          "answer": "Multiple organ dysfunction syndrome",
          "id": "nur258-m13-p22"
        },
        {
          "category": "Stages",
          "prompt": "The body's early attempt to maintain perfusion?",
          "answer": "Compensatory response",
          "id": "nur258-m13-p23"
        },
        {
          "category": "Evaluation",
          "prompt": "What determines whether resuscitation is helping?",
          "answer": "Serial clinical and perfusion trends",
          "id": "nur258-m13-p24"
        }
      ],
      "cases": [
        {
          "q": "A client in cardiogenic shock has troponin I 2.9, BNP 157, crackles, SpO2 88 percent on 4 L and urine output 15 mL/hr. Which intervention improves cardiac output?",
          "opts": [
            "A 2 L isotonic fluid bolus",
            "An inotropic infusion",
            "Sublingual nitroglycerin",
            "A unit of packed red blood cells"
          ],
          "ans": [
            1
          ],
          "why": "Cardiogenic shock is pump failure, so the answer is <b>inotropes</b>, not volume - large boluses flood lungs that are already crackling. Nitroglycerin while hypotensive turns an 80 into a 60.",
          "id": "nur258-m13-q02",
          "type": "single",
          "sourceNumber": 2
        },
        {
          "q": "A deteriorating client in shock has PaO2 58, PaCO2 80 and pH 7.31. Which action does the nurse anticipate?",
          "opts": [
            "Increase the nasal cannula to 15 L/min",
            "Prepare for intubation and mechanical ventilation",
            "Give sodium bicarbonate",
            "Begin incentive spirometry every hour"
          ],
          "ans": [
            1
          ],
          "why": "Hypoxemia with a PaCO2 of 80 and falling pH means ventilatory failure, so the answer is <b>intubate</b> - preoxygenate at 100 percent, sedate before paralyzing, and continue sedation after. Cranking a nasal cannula to 15 L/min is not an answer; it cannot fix a ventilation problem.",
          "id": "nur258-m13-q06",
          "type": "single",
          "sourceNumber": 6
        },
        {
          "q": "A client in septic shock is receiving norepinephrine through a peripheral IV while central access is being arranged. The nurse finds the site pale, swollen and cool with the infusion running. Which action does the nurse anticipate?",
          "opts": [
            "Administering phentolamine to reverse the extravasation",
            "Applying warm compresses and continuing the infusion at that site",
            "Flushing the line with saline and resuming the norepinephrine",
            "Increasing the norepinephrine rate to maintain the MAP"
          ],
          "ans": [
            0
          ],
          "why": "<b>Phentolamine reverses norepinephrine extravasation</b>, and the drug belongs in a central line titrated to MAP. Continuing or restarting the infusion at that site is the trap: norepinephrine causes tissue injury, and prolonged use is also associated with <b>digital necrosis</b>.",
          "id": "nur258-m13-q12",
          "type": "single",
          "sourceNumber": 12
        }
      ],
      "reflective": false
    },
    {
      "id": "nur258-m14",
      "course": "NUR 258",
      "module": 14,
      "topic": "Final Exam Review",
      "title": "Final Shift Challenge",
      "icon": "🏁",
      "tagline": "Bring earlier concepts together for a focused review.",
      "robot": {
        "src": "rustic-coach.webp",
        "width": 427,
        "height": 512
      },
      "illustration": {
        "src": "nur258-m14.svg",
        "width": 360,
        "height": 310
      },
      "path": "nur258-module-14-final-review.html",
      "source": "../nur258-module-14-final-review.html",
      "pairs": [
        {
          "id": "nur258-m14-p01",
          "category": "M4 review · TBSA",
          "prompt": "What percentage is the entire adult head and neck?",
          "answer": "9 percent",
          "sourceModule": "nur258-m4",
          "sourcePath": "nur258-module-04-burns.html"
        },
        {
          "id": "nur258-m14-p02",
          "category": "M4 review · TBSA",
          "prompt": "What percentage is one entire adult leg?",
          "answer": "18 percent",
          "sourceModule": "nur258-m4",
          "sourcePath": "nur258-module-04-burns.html"
        },
        {
          "id": "nur258-m14-p03",
          "category": "M4 review · TBSA",
          "prompt": "What percentage is the adult perineum?",
          "answer": "1 percent",
          "sourceModule": "nur258-m4",
          "sourcePath": "nur258-module-04-burns.html"
        },
        {
          "id": "nur258-m14-p04",
          "category": "M5 review · Adrenal",
          "prompt": "What hormone is deficient in primary adrenal insufficiency?",
          "answer": "Cortisol",
          "sourceModule": "nur258-m5",
          "sourcePath": "nur258-module-05-endocrine-disorders.html"
        },
        {
          "id": "nur258-m14-p05",
          "category": "M5 review · Adrenal",
          "prompt": "What mineralocorticoid can also be deficient in Addison’s disease?",
          "answer": "Aldosterone",
          "sourceModule": "nur258-m5",
          "sourcePath": "nur258-module-05-endocrine-disorders.html"
        },
        {
          "id": "nur258-m14-p06",
          "category": "M5 review · Adrenal",
          "prompt": "What blood pressure pattern fits Addison’s disease?",
          "answer": "Low blood pressure",
          "sourceModule": "nur258-m5",
          "sourcePath": "nur258-module-05-endocrine-disorders.html"
        },
        {
          "id": "nur258-m14-p07",
          "category": "M6 review · Pancreas",
          "prompt": "Which pancreatic cells make insulin?",
          "answer": "Beta cells",
          "sourceModule": "nur258-m6",
          "sourcePath": "nur258-module-06-diabetes.html"
        },
        {
          "id": "nur258-m14-p08",
          "category": "M6 review · Pancreas",
          "prompt": "Which pancreatic cells make glucagon?",
          "answer": "Alpha cells",
          "sourceModule": "nur258-m6",
          "sourcePath": "nur258-module-06-diabetes.html"
        },
        {
          "id": "nur258-m14-p09",
          "category": "M6 review · Hormones",
          "prompt": "What is insulin’s main glucose effect?",
          "answer": "Promotes glucose uptake and storage",
          "sourceModule": "nur258-m6",
          "sourcePath": "nur258-module-06-diabetes.html"
        },
        {
          "id": "nur258-m14-p10",
          "category": "M7 review · ICP",
          "prompt": "What is an early sign of rising intracranial pressure?",
          "answer": "A subtle change in level of consciousness",
          "sourceModule": "nur258-m7",
          "sourcePath": "nur258-module-07-neurologic-cerebrovascular.html"
        },
        {
          "id": "nur258-m14-p11",
          "category": "M7 review · ICP",
          "prompt": "What is Cushing’s triad?",
          "answer": "Bradycardia, irregular breathing and widened pulse pressure",
          "sourceModule": "nur258-m7",
          "sourcePath": "nur258-module-07-neurologic-cerebrovascular.html"
        },
        {
          "id": "nur258-m14-p12",
          "category": "M7 review · ICP",
          "prompt": "Is Cushing’s triad an early or late warning sign?",
          "answer": "A late deterioration sign",
          "sourceModule": "nur258-m7",
          "sourcePath": "nur258-module-07-neurologic-cerebrovascular.html"
        },
        {
          "category": "M8 review · Head injury",
          "prompt": "Blood between skull and dura?",
          "answer": "Epidural hematoma",
          "id": "nur258-m14-p13",
          "sourceModule": "nur258-m8",
          "sourcePath": "nur258-module-08-neuro-trauma-infection-oncology-degenerative.html"
        },
        {
          "category": "M8 review · Head injury",
          "prompt": "Blood between dura and arachnoid?",
          "answer": "Subdural hematoma",
          "id": "nur258-m14-p14",
          "sourceModule": "nur258-m8",
          "sourcePath": "nur258-module-08-neuro-trauma-infection-oncology-degenerative.html"
        },
        {
          "category": "M9 review · Cells",
          "prompt": "What does MCV describe?",
          "answer": "Average red blood cell size",
          "id": "nur258-m14-p15",
          "sourceModule": "nur258-m9",
          "sourcePath": "nur258-module-09-hematologic-disorders.html"
        },
        {
          "category": "M9 review · Iron",
          "prompt": "Low ferritin with high TIBC suggests what?",
          "answer": "Iron deficiency",
          "id": "nur258-m14-p16",
          "sourceModule": "nur258-m9",
          "sourcePath": "nur258-module-09-hematologic-disorders.html"
        },
        {
          "category": "M10 review · Cancer",
          "prompt": "Tissue sample examined for diagnosis?",
          "answer": "Biopsy",
          "id": "nur258-m14-p17",
          "sourceModule": "nur258-m10",
          "sourcePath": "nur258-module-10-oncology-end-of-life.html"
        },
        {
          "category": "M10 review · Cancer",
          "prompt": "How abnormal cells look under the microscope?",
          "answer": "Grade",
          "id": "nur258-m14-p18",
          "sourceModule": "nur258-m10",
          "sourcePath": "nur258-module-10-oncology-end-of-life.html"
        },
        {
          "category": "M11 review · Anatomy",
          "prompt": "Uterine lining-like tissue outside the uterus?",
          "answer": "Endometriosis",
          "id": "nur258-m14-p19",
          "sourceModule": "nur258-m11",
          "sourcePath": "nur258-module-11-reproductive-disorders.html"
        },
        {
          "category": "M11 review · Symptoms",
          "prompt": "Painful menstruation?",
          "answer": "Dysmenorrhea",
          "id": "nur258-m14-p20",
          "sourceModule": "nur258-m11",
          "sourcePath": "nur258-module-11-reproductive-disorders.html"
        },
        {
          "category": "M12 review · Setting",
          "prompt": "Which triage setting uses resource-limited disaster tags?",
          "answer": "Mass-casualty incident",
          "id": "nur258-m14-p21",
          "sourceModule": "nur258-m12",
          "sourcePath": "nur258-module-12-disaster-emergency-nursing.html"
        },
        {
          "category": "M12 review · Setting",
          "prompt": "Which five-level scale is used in many emergency departments?",
          "answer": "Emergency Severity Index",
          "id": "nur258-m14-p22",
          "sourceModule": "nur258-m12",
          "sourcePath": "nur258-module-12-disaster-emergency-nursing.html"
        },
        {
          "category": "M13 review · Mechanism",
          "prompt": "Shock from loss of circulating volume?",
          "answer": "Hypovolemic",
          "id": "nur258-m14-p23",
          "sourceModule": "nur258-m13",
          "sourcePath": "nur258-module-13-shock-mods.html"
        },
        {
          "category": "M13 review · Mechanism",
          "prompt": "Shock from cardiac pump failure?",
          "answer": "Cardiogenic",
          "id": "nur258-m14-p24",
          "sourceModule": "nur258-m13",
          "sourcePath": "nur258-module-13-shock-mods.html"
        }
      ],
      "cases": [
        {
          "q": "A drip is ordered at 5 mcg/kg/min for a client weighing 154 lb. The bag contains 400 mg in 250 mL. What rate does the nurse program?",
          "opts": [
            "8.2 mL/hr",
            "13.1 mL/hr",
            "21 mL/hr",
            "26.3 mL/hr"
          ],
          "ans": [
            1
          ],
          "why": "154 divided by 2.2 = 70 kg; 70 x 5 = 350 mcg/min = 21,000 mcg/hr = 21 mg/hr; the bag is 1.6 mg/mL, so 21 divided by 1.6 = <b>13.1 mL/hr</b>. Answering 21 means stopping at mg/hr and never converting to volume - round only at the very end.",
          "id": "nur258-m14-q03",
          "type": "single",
          "sourceNumber": 3
        },
        {
          "q": "Which are steps of the Clinical Judgment Measurement Model? Select all that apply.",
          "opts": [
            "Recognize cues",
            "Chart by exception",
            "Analyze cues",
            "Prioritize hypotheses",
            "Delegate to unlicensed personnel"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "The six steps are <b>recognize cues, analyze cues, prioritize hypotheses, generate solutions, take action and evaluate outcomes</b>, and they head every module review list. Charting and delegation are nursing activities, not steps of the model.",
          "id": "nur258-m14-q04",
          "type": "sata",
          "sourceNumber": 4
        },
        {
          "q": "Fifteen minutes into a unit of packed red blood cells, a client develops chills, flank pain, and a rising temperature. Which action does the nurse take first?",
          "opts": [
            "Stop the transfusion and infuse normal saline through new tubing",
            "Slow the transfusion and continue to monitor the client closely",
            "Flush the existing tubing with saline and restart the unit",
            "Leave the line running and notify the provider and blood bank"
          ],
          "ans": [
            0
          ],
          "why": "The module rule for a transfusion reaction is <b>STOP, saline, new tubing</b>. Slowing the rate or flushing the old tubing is tempting because it seems to buy time, but both keep blood reaching the client, which is exactly what must stop first.",
          "id": "nur258-m14-q09",
          "type": "single",
          "sourceNumber": 9
        },
        {
          "q": "Minutes after a new IV medication is started, a client develops lip and tongue swelling, wheezing, and widespread hives. Which action does the nurse take first?",
          "opts": [
            "Recheck the blood pressure before acting",
            "Apply oxygen and raise the head of the bed",
            "Administer epinephrine IM",
            "Notify the provider and obtain a full allergy history"
          ],
          "ans": [
            2
          ],
          "why": "For anaphylaxis the module states <b>epinephrine IM first</b>. Rechecking the blood pressure looks right to a student applying assess-before-intervene, but that rule is set aside when it is an emergency with an obvious action.",
          "id": "nur258-m14-q10",
          "type": "single",
          "sourceNumber": 10
        },
        {
          "q": "A client admitted after a head injury was alert on arrival but now needs repeated prompting to answer questions. Vital signs are unchanged from baseline. Which action does the nurse take first?",
          "opts": [
            "Document the finding and reassess later in the shift",
            "Report the change in level of consciousness to the provider",
            "Recheck the vital signs and act only if they change",
            "Let the client rest and attribute the change to fatigue"
          ],
          "ans": [
            1
          ],
          "why": "A change in <b>level of consciousness is the earliest sign of rising ICP</b>, so it is reported now. Waiting for the vital signs to change is the trap: unchanged values inside the normal range are reassuring-looking distractors, not evidence that nothing is wrong.",
          "id": "nur258-m14-q11",
          "type": "single",
          "sourceNumber": 11
        }
      ],
      "reflective": false
    }
  ],
  "images": {
    "rustic-coach": {
      "src": "rustic-coach.webp",
      "width": 427,
      "height": 512
    },
    "rustic-nurse": {
      "src": "rustic-nurse.webp",
      "width": 427,
      "height": 512
    },
    "rustic-sam": {
      "src": "rustic-sam.webp",
      "width": 760,
      "height": 760
    },
    "rustic-maya": {
      "src": "rustic-maya.webp",
      "width": 760,
      "height": 760
    },
    "rustic-jordan": {
      "src": "rustic-jordan.webp",
      "width": 760,
      "height": 760
    },
    "rustic-alex": {
      "src": "rustic-alex.webp",
      "width": 760,
      "height": 760
    },
    "rustic-alert": {
      "src": "rustic-alert.webp",
      "width": 498,
      "height": 512
    },
    "medical-mosaic": {
      "src": "medical-mosaic.webp",
      "width": 1600,
      "height": 900
    }
  }
};
