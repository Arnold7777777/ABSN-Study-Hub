window.MODULE_ARCADE_DATA = {
  "version": "2026-10-08",
  "modules": [
    {
      "id": "nur234-m1",
      "course": "NUR 234",
      "module": 1,
      "topic": "Reproductive Life Planning & Contraception",
      "title": "Contraception Counseling Desk",
      "icon": "🧭",
      "tagline": "Match the method to the goal, then spot the teaching clue.",
      "robot": {
        "src": "rustic-maya.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur234-m1.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "Four method cards: a condom, T-shaped copper IUD, combined-pill pack and a symbolic permanently interrupted pathway.",
      "path": "nur234-m1.html",
      "source": "../nur234-m1.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur234-m1-p01",
          "category": "Planning",
          "prompt": "The first question in reproductive life planning",
          "answer": "What does the client want, and when?"
        },
        {
          "id": "nur234-m1-p02",
          "category": "Methods",
          "prompt": "Two long-acting reversible contraceptive options",
          "answer": "IUD and implant"
        },
        {
          "id": "nur234-m1-p03",
          "category": "Protection",
          "prompt": "Contraceptive method that also reduces STI transmission",
          "answer": "Condom"
        },
        {
          "id": "nur234-m1-p04",
          "category": "Protection",
          "prompt": "A condom plus another contraceptive method",
          "answer": "Dual protection"
        },
        {
          "id": "nur234-m1-p05",
          "category": "Estrogen",
          "prompt": "Clot history that raises concern with combined hormonal contraception",
          "answer": "Previous DVT or pulmonary embolism"
        },
        {
          "id": "nur234-m1-p06",
          "category": "Estrogen",
          "prompt": "Migraine feature that makes estrogen contraception a poor choice",
          "answer": "Aura"
        },
        {
          "id": "nur234-m1-p07",
          "category": "Estrogen",
          "prompt": "The two hormones in combined oral contraceptives",
          "answer": "Estrogen and progestin"
        },
        {
          "id": "nur234-m1-p08",
          "category": "Mechanism",
          "prompt": "The main event that combined pills suppress",
          "answer": "Ovulation"
        },
        {
          "id": "nur234-m1-p09",
          "category": "Teaching",
          "prompt": "Mnemonic for serious combined-pill warning signs",
          "answer": "ACHES"
        },
        {
          "id": "nur234-m1-p10",
          "category": "ACHES",
          "prompt": "The A in ACHES",
          "answer": "Abdominal pain"
        },
        {
          "id": "nur234-m1-p11",
          "category": "ACHES",
          "prompt": "The C in ACHES",
          "answer": "Chest pain or shortness of breath"
        },
        {
          "id": "nur234-m1-p12",
          "category": "ACHES",
          "prompt": "The H in ACHES",
          "answer": "Severe headache"
        },
        {
          "id": "nur234-m1-p13",
          "category": "ACHES",
          "prompt": "The E in ACHES",
          "answer": "Eye or vision changes"
        },
        {
          "id": "nur234-m1-p14",
          "category": "ACHES",
          "prompt": "The S in ACHES",
          "answer": "Severe leg pain"
        },
        {
          "id": "nur234-m1-p15",
          "category": "IUD",
          "prompt": "Hormone-free intrauterine contraceptive",
          "answer": "Copper IUD"
        },
        {
          "id": "nur234-m1-p16",
          "category": "IUD",
          "prompt": "An anatomic problem that can prevent safe IUD placement",
          "answer": "A distorted uterine cavity"
        },
        {
          "id": "nur234-m1-p17",
          "category": "Injection",
          "prompt": "What to avoid at the depot medroxyprogesterone injection site",
          "answer": "Massaging or rubbing the site"
        },
        {
          "id": "nur234-m1-p18",
          "category": "Barrier",
          "prompt": "Minimum diaphragm time after intercourse in this module",
          "answer": "Leave it in place at least 6 hours"
        },
        {
          "id": "nur234-m1-p19",
          "category": "Barrier",
          "prompt": "A life event that calls for diaphragm refitting",
          "answer": "Birth or a significant weight change"
        },
        {
          "id": "nur234-m1-p20",
          "category": "Fertility",
          "prompt": "Thin, clear, stretchy cervical mucus",
          "answer": "Spinnbarkeit"
        },
        {
          "id": "nur234-m1-p21",
          "category": "Fertility",
          "prompt": "Direction of basal body temperature after ovulation",
          "answer": "A small rise"
        },
        {
          "id": "nur234-m1-p22",
          "category": "Permanent methods",
          "prompt": "How tubal ligation should be counseled",
          "answer": "As permanent contraception"
        },
        {
          "id": "nur234-m1-p23",
          "category": "Vasectomy",
          "prompt": "What is needed before relying on a vasectomy",
          "answer": "Confirmation of sterility by follow-up semen testing"
        },
        {
          "id": "nur234-m1-p24",
          "category": "Emergency contraception",
          "prompt": "What emergency contraception does not do",
          "answer": "Terminate an established pregnancy"
        }
      ],
      "cases": [
        {
          "q": "A client who uses a diaphragm calls reporting a temperature of 102.4 F, vomiting, dizziness, and a diffuse sunburn-like rash. She states the diaphragm has been in place since last night. Which instruction does the nurse give first?",
          "type": "single",
          "opts": [
            "Take the leftover antibiotic in her medicine cabinet",
            "Remove the diaphragm now, then come in to be seen",
            "Drink extra fluids and recheck her temperature in 2 hours",
            "Schedule a refitting appointment for later this week"
          ],
          "ans": [
            1
          ],
          "why": "Suspected toxic shock with a barrier device means <b>remove the device first</b>, then treat. Antibiotics are needed but come after the source is out, and no self-medicating with leftover drugs.",
          "id": "nur234-m1-q01",
          "sourceNumber": 1
        },
        {
          "q": "A nurse reviews warning signs with a client starting combined oral contraceptives. Which findings should the client report immediately? Select all that apply.",
          "type": "sata",
          "opts": [
            "Severe pain in one calf",
            "Mild breast tenderness in the first cycle",
            "Sudden severe headache",
            "Chest pain with shortness of breath",
            "A 2 lb weight gain over one month"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "ACHES = <b>A</b>bdominal pain, <b>C</b>hest pain or dyspnea, <b>H</b>eadache (severe), <b>E</b>ye or vision change, <b>S</b>evere leg pain. Mild breast tenderness and small weight changes are expected adaptation, not thromboembolic warning signs.",
          "id": "nur234-m1-q02",
          "sourceNumber": 2
        },
        {
          "q": "A client returns for her depot medroxyprogesterone acetate injection. Which statement indicates a need for further teaching?",
          "type": "single",
          "opts": [
            "I need my next shot in about 11 to 13 weeks",
            "I will rub the site afterward so it absorbs better",
            "It may take up to 18 months to get pregnant after I stop",
            "I should keep up my calcium and weight-bearing exercise"
          ],
          "ans": [
            1
          ],
          "why": "Massaging the site <b>speeds absorption and shortens the coverage period</b>, so the client must not rub it. The 11 to 13 week interval and the delayed return of fertility up to 18 months are both correct.",
          "id": "nur234-m1-q03",
          "sourceNumber": 3
        },
        {
          "q": "A client who is exclusively breastfeeding her 3-week-old asks about contraception. Which method does the nurse identify as most appropriate?",
          "type": "single",
          "opts": [
            "Combined oral contraceptive pill",
            "Contraceptive vaginal ring",
            "Progestin-only pill",
            "Combined transdermal patch"
          ],
          "ans": [
            2
          ],
          "why": "Breastfeeding calls for the <b>progestin-only pill</b>, the lactation-safe oral option that can start immediately after birth. The vaginal ring is the trap: it is not estrogen-free, it delivers estrogen plus progestin just like the pill and patch.",
          "id": "nur234-m1-q04",
          "sourceNumber": 4
        },
        {
          "q": "Four clients ask about an intrauterine device. Which client has a true contraindication to IUD placement?",
          "type": "single",
          "opts": [
            "A client who smokes one pack of cigarettes daily",
            "A client with fibroids distorting the uterine cavity",
            "A client with chronic hypertension controlled on labetalol",
            "A client with a history of deep vein thrombosis"
          ],
          "ans": [
            1
          ],
          "why": "A <b>structural uterine anomaly</b>, such as a congenital malformation or fibroids distorting the cavity, risks malposition, expulsion and perforation. Smoking, hypertension and VTE history restrict <b>estrogen</b> methods; those two lists are different and must not be swapped.",
          "id": "nur234-m1-q05",
          "sourceNumber": 5
        },
        {
          "q": "A nurse triages four phone messages. Which client does the nurse call back first?",
          "type": "single",
          "opts": [
            "A client with an IUD in place who reports a positive home pregnancy test",
            "A client who forgot one combined pill and took two the next morning",
            "A client whose vaginal ring was out for 2 hours during a shower",
            "A client reporting spotting in the third month of a progestin-only pill"
          ],
          "ans": [
            0
          ],
          "why": "Pregnancy with an IUD in place is <b>high risk for ectopic</b> and must be reported immediately. The ring may be out up to 3 hours without loss of protection, missed-pill catch-up dosing is standard, and breakthrough spotting on a progestin-only pill is expected.",
          "id": "nur234-m1-q06",
          "sourceNumber": 6
        },
        {
          "q": "A client asks how combined oral contraceptives prevent pregnancy. Which explanation is most accurate?",
          "type": "single",
          "opts": [
            "They destroy sperm on contact in the vagina",
            "They suppress ovulation and thicken cervical mucus",
            "They prevent implantation only after fertilisation",
            "They permanently stop the ovaries from working"
          ],
          "ans": [
            1
          ],
          "why": "Combined pills work mainly by <b>suppressing the LH surge so ovulation does not happen</b>, with thickened cervical mucus and a thinned endometrium as backup. Nothing about them is permanent - fertility returns after stopping, which is a common worry worth addressing directly.",
          "pharm": 1,
          "topic": "Reproductive Life Planning…",
          "icon": "🌸",
          "topicFull": "Reproductive Life Planning & Contraception",
          "card": "more/NG-335_contraception.html",
          "cardLabel": "Contraception & Reproductive Life Planning",
          "id": "nur234-m1-q08",
          "sourceNumber": 8
        },
        {
          "q": "Which findings are contraindications to combined hormonal contraception? Select all that apply.",
          "type": "sata",
          "opts": [
            "History of deep vein thrombosis",
            "Migraine with aura",
            "Smoking at age 36",
            "Well-controlled asthma",
            "History of breast cancer"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Combined pills raise clotting risk, so a clot history, <b>migraine with aura</b> (a stroke risk marker) and <b>smoking over age 35</b> all rule them out, as does an estrogen-sensitive cancer. Asthma is unrelated. A progestin-only method is the usual alternative.",
          "topic": "Reproductive Life Planning…",
          "icon": "🌸",
          "topicFull": "Reproductive Life Planning & Contraception",
          "card": "more/NG-335_contraception.html",
          "cardLabel": "Contraception & Reproductive Life Planning",
          "id": "nur234-m1-q09",
          "sourceNumber": 9
        },
        {
          "q": "A client using a copper intrauterine device asks what to expect. Which statements are accurate? Select all that apply.",
          "type": "sata",
          "opts": [
            "Periods may be heavier and more crampy at first",
            "It contains no hormones",
            "It can be used as emergency contraception within 5 days",
            "It protects against sexually transmitted infections",
            "The client should feel for the strings monthly"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "The copper IUD is <b>hormone-free</b>, is the most effective emergency contraception when placed within 5 days, and typically makes periods heavier early on. Clients check the strings monthly for expulsion. <b>No IUD protects against infection</b> - only barriers do, and this gets missed constantly.",
          "topic": "Reproductive Life Planning…",
          "icon": "🌸",
          "topicFull": "Reproductive Life Planning & Contraception",
          "card": "more/NG-335_contraception.html",
          "cardLabel": "Contraception & Reproductive Life Planning",
          "id": "nur234-m1-q10",
          "sourceNumber": 10
        },
        {
          "q": "A client is being taught about tubal ligation. Which statement indicates a need for further teaching?",
          "type": "single",
          "opts": [
            "\"This should be considered permanent.\"",
            "\"I will still have periods.\"",
            "\"If I change my mind, it can easily be reversed.\"",
            "\"It does not protect me from infections.\""
          ],
          "ans": [
            2
          ],
          "why": "Sterilization is counseled as <b>permanent</b>. Reversal is surgery, is often unsuccessful, and is rarely covered - so a client who is banking on reversal has not given informed consent to what she is actually choosing. Menstruation continues because the ovaries and uterus are untouched.",
          "topic": "Reproductive Life Planning…",
          "icon": "🌸",
          "topicFull": "Reproductive Life Planning & Contraception",
          "card": "more/NG-335_contraception.html",
          "cardLabel": "Contraception & Reproductive Life Planning",
          "id": "nur234-m1-q11",
          "sourceNumber": 11
        },
        {
          "q": "A client comes to the clinic 2 days after unprotected intercourse and asks about emergency contraception. Which statements should the nurse include in teaching? Select all that apply.",
          "type": "sata",
          "opts": [
            "Emergency contraception can be used up to 5 days afterward, but sooner is better.",
            "A copper IUD placed within 5 days is the most effective form of emergency contraception.",
            "If your period has not started within 21 days, take a pregnancy test.",
            "This will end a pregnancy that is already established.",
            "Emergency contraception only works if it is used within 24 hours."
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Emergency contraception works <b>up to 5 days</b> out, a copper IUD within that window is the most effective option, and no period within <b>21 days</b> calls for a pregnancy test. It does <b>not</b> terminate an established pregnancy, and the 24-hour claim wrongly narrows the real 5-day window.",
          "id": "nur234-m1-q16",
          "sourceNumber": 16
        },
        {
          "q": "A client is learning fertility awareness methods to plan a pregnancy. Which statements by the client indicate correct understanding? Select all that apply.",
          "type": "sata",
          "opts": [
            "My temperature should rise about 0.4 to 0.8 degrees F after I ovulate.",
            "Around ovulation my cervical mucus becomes thin, clear, and stretchy.",
            "I ovulate about 14 days after the first day of my last period.",
            "I ovulate about 14 days before my next period is due.",
            "I subtract 11 days from my shortest cycle to find my first fertile day."
          ],
          "ans": [
            0,
            1,
            3
          ],
          "why": "Basal body temperature rises <b>0.4 to 0.8 degrees F</b> after ovulation, mucus becomes thin, clear, and stretchy (<b>spinnbarkeit</b>), and ovulation occurs about <b>14 days before the next period starts</b> — not 14 days after the last one, which is the classic trap. For calendar math the first fertile day is the <b>shortest cycle minus 18</b>; minus 11 is applied to the longest cycle for the last fertile day.",
          "id": "nur234-m1-q17",
          "sourceNumber": 17
        }
      ]
    },
    {
      "id": "nur234-m2",
      "course": "NUR 234",
      "module": 2,
      "topic": "Conception, Fetal Development & Placental Function",
      "title": "Placenta Delivery Routes",
      "icon": "🧬",
      "tagline": "Follow the cord, connect the hormones and rebuild early development.",
      "robot": {
        "src": "rustic-maya.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur234-m2.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "The umbilical vein points from placenta to fetus; two arteries point back. A cord cross-section shows three vessels inside jelly. A fetus is surrounded by amniotic fluid.",
      "path": "nur234-m2.html",
      "source": "../nur234-m2.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur234-m2-p01",
          "category": "Development",
          "prompt": "Usual site of fertilization",
          "answer": "Ampulla of the fallopian tube"
        },
        {
          "id": "nur234-m2-p02",
          "category": "Development",
          "prompt": "The single cell formed when sperm and ovum unite",
          "answer": "Zygote"
        },
        {
          "id": "nur234-m2-p03",
          "category": "Development",
          "prompt": "Developmental structure that implants in the uterus",
          "answer": "Blastocyst"
        },
        {
          "id": "nur234-m2-p04",
          "category": "Development",
          "prompt": "Formation of the organs during the embryonic period",
          "answer": "Organogenesis"
        },
        {
          "id": "nur234-m2-p05",
          "category": "Development",
          "prompt": "The developing baby from about week 9 after fertilization",
          "answer": "Fetus"
        },
        {
          "id": "nur234-m2-p06",
          "category": "Exposure",
          "prompt": "An exposure capable of disrupting fetal development",
          "answer": "Teratogen"
        },
        {
          "id": "nur234-m2-p07",
          "category": "Placenta",
          "prompt": "The organ that exchanges oxygen, nutrients and wastes",
          "answer": "Placenta"
        },
        {
          "id": "nur234-m2-p08",
          "category": "Placenta",
          "prompt": "Why medications and alcohol still need review in pregnancy",
          "answer": "The placenta is not a complete toxin barrier"
        },
        {
          "id": "nur234-m2-p09",
          "category": "Cord",
          "prompt": "Normal umbilical cord vessel count",
          "answer": "Two arteries and one vein"
        },
        {
          "id": "nur234-m2-p10",
          "category": "Cord",
          "prompt": "Vessel carrying oxygenated blood toward the fetus",
          "answer": "Umbilical vein"
        },
        {
          "id": "nur234-m2-p11",
          "category": "Cord",
          "prompt": "Vessels carrying blood away from the fetus to the placenta",
          "answer": "Umbilical arteries"
        },
        {
          "id": "nur234-m2-p12",
          "category": "Cord",
          "prompt": "Gelatinous material protecting the cord vessels",
          "answer": "Wharton's jelly"
        },
        {
          "id": "nur234-m2-p13",
          "category": "Fluid",
          "prompt": "What cushions the fetus and allows movement",
          "answer": "Amniotic fluid"
        },
        {
          "id": "nur234-m2-p14",
          "category": "Fetal shunts",
          "prompt": "Shortcut that bypasses much of the liver",
          "answer": "Ductus venosus"
        },
        {
          "id": "nur234-m2-p15",
          "category": "Fetal shunts",
          "prompt": "Opening allowing flow from the right to left atrium",
          "answer": "Foramen ovale"
        },
        {
          "id": "nur234-m2-p16",
          "category": "Fetal shunts",
          "prompt": "Connection from pulmonary artery to aorta",
          "answer": "Ductus arteriosus"
        },
        {
          "id": "nur234-m2-p17",
          "category": "Hormones",
          "prompt": "Hormone that maintains the corpus luteum early in pregnancy",
          "answer": "hCG"
        },
        {
          "id": "nur234-m2-p18",
          "category": "Hormones",
          "prompt": "Placental hormone linked to maternal insulin resistance",
          "answer": "hPL"
        },
        {
          "id": "nur234-m2-p19",
          "category": "Hormones",
          "prompt": "Hormone responsible for milk synthesis",
          "answer": "Prolactin"
        },
        {
          "id": "nur234-m2-p20",
          "category": "Hormones",
          "prompt": "Hormone associated with contractions and milk ejection",
          "answer": "Oxytocin"
        },
        {
          "id": "nur234-m2-p21",
          "category": "Hormones",
          "prompt": "Hormone associated with cervical softening",
          "answer": "Relaxin"
        },
        {
          "id": "nur234-m2-p22",
          "category": "Assessment",
          "prompt": "Maternal awareness of fetal movement",
          "answer": "Quickening"
        },
        {
          "id": "nur234-m2-p23",
          "category": "Assessment",
          "prompt": "Course timing for fetal heart tones heard by Doppler",
          "answer": "About 10–12 weeks of gestation"
        },
        {
          "id": "nur234-m2-p24",
          "category": "Fertility workup",
          "prompt": "The inexpensive, least invasive initial fertility study in the module",
          "answer": "Semen analysis"
        }
      ],
      "cases": [
        {
          "q": "A client at 6 weeks of gestation is upset that the nurse could not find the fetal heartbeat with a Doppler. Which response is accurate?",
          "type": "single",
          "opts": [
            "Heart tones are usually audible by Doppler at 10 to 12 weeks",
            "Heart tones should have been audible by 4 weeks, so an ultrasound is needed today",
            "Heart tones are not audible by any method until quickening at 16 weeks",
            "Heart tones are audible only after the lungs mature at 34 weeks"
          ],
          "ans": [
            0
          ],
          "why": "Doppler detects fetal heart tones at <b>10 to 12 weeks</b>, so absence at 6 weeks is expected. Four weeks is a standing distractor, and the other options confuse the quickening and lung maturity numbers with the Doppler number.",
          "id": "nur234-m2-q01",
          "sourceNumber": 1
        },
        {
          "q": "A nursing student asks which substances the placenta itself produces. Which hormones does the nurse identify? Select all that apply.",
          "type": "sata",
          "opts": [
            "Human chorionic gonadotropin",
            "Human placental lactogen",
            "Surfactant",
            "Progesterone",
            "Follicle-stimulating hormone"
          ],
          "ans": [
            0,
            1,
            3
          ],
          "why": "The placenta transports oxygen and nutrients and secretes <b>hCG, hPL, estrogen and progesterone</b>. Surfactant is made by fetal lung cells and FSH comes from the anterior pituitary, not the placenta.",
          "id": "nur234-m2-q02",
          "sourceNumber": 2
        },
        {
          "q": "A client at 5 weeks of gestation asks whether her medications could harm the baby. Which statement reflects the period of greatest risk for major structural defects?",
          "type": "single",
          "opts": [
            "The last 4 weeks before birth, when the fetus gains the most weight",
            "Approximately weeks 3 through 8, during organogenesis",
            "The second trimester, once quickening begins",
            "Only after 34 weeks, when the lungs finish maturing"
          ],
          "ans": [
            1
          ],
          "why": "The embryonic period of roughly <b>weeks 3 to 8 is organogenesis</b> and the peak window of teratogen vulnerability; the fetal period begins at week 9. Later exposures may affect growth and function but rarely cause major structural malformations.",
          "id": "nur234-m2-q03",
          "sourceNumber": 3
        },
        {
          "q": "A nurse teaches about early pregnancy events. Which statement is correct?",
          "type": "single",
          "opts": [
            "Fertilization occurs in the uterine fundus and implantation follows within 24 hours",
            "Fertilization occurs in the ampulla of the fallopian tube and implantation occurs 6 to 10 days later",
            "Fertilization occurs in the ovary and implantation occurs at 3 weeks",
            "Fertilization occurs in the cervix and implantation occurs at 14 days"
          ],
          "ans": [
            1
          ],
          "why": "Fertilization takes place in the <b>outer third, or ampulla</b>, of the tube; the zygote travels 3 to 5 days and implants <b>6 to 10 days</b> after fertilization. Implantation within 12 to 24 hours would signal an ectopic or otherwise abnormal implantation.",
          "id": "nur234-m2-q05",
          "sourceNumber": 5
        },
        {
          "q": "A couple has been unable to conceive after 14 months. Both partners are 32 years old and healthy. Which diagnostic study does the nurse anticipate first?",
          "type": "single",
          "opts": [
            "Hysterosalpingography",
            "Diagnostic laparoscopy",
            "Semen analysis",
            "Endometrial biopsy"
          ],
          "ans": [
            2
          ],
          "why": "The workup starts with <b>semen analysis</b> because it is the cheapest and least invasive test. Hysterosalpingography follows and requires screening for iodinated contrast allergy first; laparoscopy is invasive and far later in the sequence.",
          "id": "nur234-m2-q06",
          "sourceNumber": 6
        },
        {
          "q": "A client's last menstrual period began on 10 March. Using Naegele's rule, what is the estimated date of birth?",
          "type": "single",
          "opts": [
            "3 December",
            "17 December",
            "3 January",
            "17 January"
          ],
          "ans": [
            1
          ],
          "why": "Naegele's rule: <b>first day of the last period, minus 3 months, plus 7 days</b>. 10 March minus 3 months is 10 December; plus 7 days is <b>17 December</b>. Doing it in that order avoids the year confusion that catches people out.",
          "topic": "Conception, Fetal Development…",
          "icon": "🌸",
          "topicFull": "Conception, Fetal Development & Placental Function",
          "card": "more/NG-331_prenatal-assessment.html",
          "cardLabel": "Prenatal Assessment, GTPAL & Dating",
          "id": "nur234-m2-q07",
          "sourceNumber": 7
        },
        {
          "q": "A nurse is explaining fetal circulation. Which structure carries oxygenated blood to the fetus?",
          "type": "single",
          "opts": [
            "Umbilical arteries",
            "Umbilical vein",
            "Ductus arteriosus",
            "Foramen ovale"
          ],
          "ans": [
            1
          ],
          "why": "This one is backwards from everything else you have learned: the <b>umbilical vein carries oxygenated blood to the fetus</b>, and the two umbilical arteries carry deoxygenated blood away. A normal cord has <b>three vessels</b> - two arteries and one vein - and a two-vessel cord prompts a look for renal anomalies.",
          "topic": "Conception, Fetal Development…",
          "icon": "🌸",
          "topicFull": "Conception, Fetal Development & Placental Function",
          "card": "more/NG-334_fetal-development.html",
          "cardLabel": "Conception, Fetal Development & the Placenta",
          "id": "nur234-m2-q09",
          "sourceNumber": 9
        },
        {
          "q": "A client pregnant for the third time reports feeling light fluttering low in her abdomen at 15 weeks of gestation. Which response by the nurse is most appropriate?",
          "type": "single",
          "opts": [
            "\"Fetal movement is not felt before 20 weeks, so this is most likely intestinal gas.\"",
            "\"Quickening is felt high in the abdomen near the ribs, so we should evaluate this further.\"",
            "\"That is quickening. A woman who has been pregnant before often recognizes it as early as 14 to 16 weeks.\"",
            "\"Movement this early is abnormal and requires an ultrasound today.\""
          ],
          "ans": [
            2
          ],
          "why": "Quickening is felt at <b>16 to 20 weeks in a first pregnancy but as early as 14 to 16 weeks in a multigravida</b>, because she already recognizes the sensation, and it is described as light fluttering low in the abdomen. The 20-week answer is tempting because that number belongs to a first pregnancy, not to a woman on her third.",
          "id": "nur234-m2-q10",
          "sourceNumber": 10
        },
        {
          "q": "Immediately after a birth, the nurse inspects the cut end of the umbilical cord and counts one artery and one vein. Which action should the nurse take?",
          "type": "single",
          "opts": [
            "Document the finding as the expected AVA cord",
            "Notify the provider and anticipate evaluation of the newborn for kidney anomalies",
            "Reassure the parents that one artery is enough because the vein is the vessel carrying oxygen",
            "Anticipate a heart defect because the ductus arteriosus has failed to close"
          ],
          "ans": [
            1
          ],
          "why": "A normal cord is <b>AVA: two arteries and one vein</b>, so a two-vessel cord is abnormal and prompts a check for <b>kidney anomalies</b>. Documenting it as expected is the trap for a student who recalls only that the single vein carries the oxygenated blood; that fact is true, but it does not make a missing artery normal.",
          "id": "nur234-m2-q13",
          "sourceNumber": 13
        },
        {
          "q": "A client at 28 weeks of gestation asks why her heart seems to beat faster than it used to. Which statements about expected cardiovascular and renal changes should the nurse include? Select all that apply.",
          "type": "sata",
          "opts": [
            "Blood volume drops slightly during pregnancy to lower the workload on the heart.",
            "Heart rate climbs about 20% over the client's baseline.",
            "Total urine output roughly doubles because filtration in the kidneys increases.",
            "Blood volume increases by 30% to 50%.",
            "Glomerular filtration rate rises while total urine output stays about the same."
          ],
          "ans": [
            1,
            3,
            4
          ],
          "why": "Pregnancy raises <b>blood volume 30% to 50%</b> and heart rate about <b>20%</b> over baseline, which is what the client is feeling. The seductive error is assuming a higher <b>GFR</b> must mean far more urine; filtration rises but <b>total urine output stays about the same</b>, and blood volume rises rather than falls.",
          "id": "nur234-m2-q15",
          "sourceNumber": 15
        }
      ]
    },
    {
      "id": "nur234-m3",
      "course": "NUR 234",
      "module": 3,
      "topic": "Physiologic & Psychological Changes of Pregnancy",
      "title": "Pregnancy Sign Detective",
      "icon": "🔎",
      "tagline": "Sort the evidence and work out the obstetric history.",
      "robot": {
        "src": "rustic-maya.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur234-m3.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "Client-reported nausea, a positive hCG test, a fetus on ultrasound and five separate GTPAL counters illustrate different kinds of evidence.",
      "path": "nur234-m3.html",
      "source": "../nur234-m3.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur234-m3-p01",
          "category": "Signs",
          "prompt": "Subjective pregnancy findings reported by the client",
          "answer": "Presumptive signs"
        },
        {
          "id": "nur234-m3-p02",
          "category": "Signs",
          "prompt": "Objective pregnancy findings that are not definitive",
          "answer": "Probable signs"
        },
        {
          "id": "nur234-m3-p03",
          "category": "Signs",
          "prompt": "Evidence of the fetus itself",
          "answer": "Positive signs"
        },
        {
          "id": "nur234-m3-p04",
          "category": "Named signs",
          "prompt": "Softening of the cervix",
          "answer": "Goodell's sign"
        },
        {
          "id": "nur234-m3-p05",
          "category": "Named signs",
          "prompt": "Bluish discoloration of the cervix",
          "answer": "Chadwick's sign"
        },
        {
          "id": "nur234-m3-p06",
          "category": "Named signs",
          "prompt": "Softening of the lower uterine segment",
          "answer": "Hegar's sign"
        },
        {
          "id": "nur234-m3-p07",
          "category": "Signs",
          "prompt": "How a positive hCG pregnancy test is classified",
          "answer": "A probable sign, not definitive proof of a fetus"
        },
        {
          "id": "nur234-m3-p08",
          "category": "Signs",
          "prompt": "An imaging finding that is a positive sign of pregnancy",
          "answer": "Fetal visualization on ultrasound"
        },
        {
          "id": "nur234-m3-p09",
          "category": "History",
          "prompt": "G in GTPAL",
          "answer": "Gravida: all pregnancies, including the current one"
        },
        {
          "id": "nur234-m3-p10",
          "category": "History",
          "prompt": "T in GTPAL",
          "answer": "Term births at 37 weeks or later"
        },
        {
          "id": "nur234-m3-p11",
          "category": "History",
          "prompt": "P in GTPAL",
          "answer": "Preterm births from 20 weeks through 36 weeks 6 days"
        },
        {
          "id": "nur234-m3-p12",
          "category": "History",
          "prompt": "A in GTPAL",
          "answer": "Pregnancy losses before 20 weeks"
        },
        {
          "id": "nur234-m3-p13",
          "category": "History",
          "prompt": "L in GTPAL",
          "answer": "Children currently living"
        },
        {
          "id": "nur234-m3-p14",
          "category": "History",
          "prompt": "How one delivery of living twins affects T or P and L",
          "answer": "One birth event, two living children"
        },
        {
          "id": "nur234-m3-p15",
          "category": "Dating",
          "prompt": "The date used to begin Naegele's rule",
          "answer": "First day of the last menstrual period"
        },
        {
          "id": "nur234-m3-p16",
          "category": "Dating",
          "prompt": "Naegele's rule calculation",
          "answer": "Subtract 3 months, add 7 days, adjust the year"
        },
        {
          "id": "nur234-m3-p17",
          "category": "Circulation",
          "prompt": "Why hematocrit may decrease physiologically in pregnancy",
          "answer": "Plasma increases more than red-cell mass"
        },
        {
          "id": "nur234-m3-p18",
          "category": "Circulation",
          "prompt": "Mechanism of supine hypotensive syndrome",
          "answer": "The uterus compresses the inferior vena cava"
        },
        {
          "id": "nur234-m3-p19",
          "category": "Position",
          "prompt": "First positioning action for supine hypotensive symptoms",
          "answer": "Turn the client onto the left side"
        },
        {
          "id": "nur234-m3-p20",
          "category": "Digestion",
          "prompt": "Hormonal effect associated with reflux and constipation",
          "answer": "Progesterone relaxes smooth muscle"
        },
        {
          "id": "nur234-m3-p21",
          "category": "Skin",
          "prompt": "The dark line down the abdomen",
          "answer": "Linea nigra"
        },
        {
          "id": "nur234-m3-p22",
          "category": "Skin",
          "prompt": "Pregnancy-related facial hyperpigmentation",
          "answer": "Melasma"
        },
        {
          "id": "nur234-m3-p23",
          "category": "Skin",
          "prompt": "Pregnancy stretch marks",
          "answer": "Striae gravidarum"
        },
        {
          "id": "nur234-m3-p24",
          "category": "Psychology",
          "prompt": "Mixed feelings early in pregnancy",
          "answer": "Ambivalence"
        }
      ],
      "cases": [
        {
          "q": "A nurse assesses a client who believes she is pregnant. Which findings are positive signs of pregnancy? Select all that apply.",
          "type": "sata",
          "opts": [
            "Fetal heart tones heard by the examiner",
            "Amenorrhea for 10 weeks",
            "Fetal outline visualized on ultrasound",
            "A bluish discoloration of the cervix",
            "Fetal movement palpated by the nurse"
          ],
          "ans": [
            0,
            2,
            4
          ],
          "why": "Only <b>three findings prove a fetus exists</b>: audible fetal heart tones, visualization on ultrasound, and fetal movement felt by an examiner. Amenorrhea is presumptive and Chadwick sign is probable, because neither is produced only by pregnancy.",
          "id": "nur234-m3-q01",
          "sourceNumber": 1
        },
        {
          "q": "A client at 34 weeks of gestation becomes pale, diaphoretic and lightheaded while lying flat for an examination. Her BP is 86/52. Which action does the nurse take first?",
          "type": "single",
          "opts": [
            "Turn her onto her left side",
            "Administer oxygen by face mask",
            "Obtain a 12-lead electrocardiogram",
            "Increase the IV infusion rate"
          ],
          "ans": [
            0
          ],
          "why": "This is supine hypotensive syndrome from the uterus compressing the vena cava, and <b>turning her to the left lateral position</b> restores venous return immediately. Oxygen and fluids may follow, but repositioning fixes the cause and costs nothing.",
          "id": "nur234-m3-q02",
          "sourceNumber": 2
        },
        {
          "q": "A client gives birth at 38 weeks and 2 days of gestation. Using ACOG definitions, how does the nurse document this birth?",
          "type": "single",
          "opts": [
            "Preterm",
            "Early term",
            "Full term",
            "Late term"
          ],
          "ans": [
            1
          ],
          "why": "ACOG defines <b>early term as 37 0/7 through 38 6/7</b> weeks, full term as 39 0/7 through 40 6/7, late term as 41 0/7 through 41 6/7, and post-term at 42 0/7 or beyond. Calling 38 2/7 full term is the common error.",
          "id": "nur234-m3-q03",
          "sourceNumber": 3
        },
        {
          "q": "A provider documents softening of the lower uterine segment in a client at 9 weeks of gestation. How does the nurse classify this finding?",
          "type": "single",
          "opts": [
            "A presumptive sign, because the client reports it",
            "A probable sign, because the examiner observes it",
            "A positive sign, because it confirms a fetus",
            "A danger sign requiring immediate ultrasound"
          ],
          "ans": [
            1
          ],
          "why": "Hegar sign is <b>probable</b>: the examiner observes it, but a non-pregnant condition could also produce it. Presumptive signs are subjective and reported by the client, and only fetal heart tones, ultrasound, or palpated fetal movement are positive.",
          "id": "nur234-m3-q04",
          "sourceNumber": 4
        },
        {
          "q": "A client is pregnant now. She previously delivered twins at 38 weeks who are both alive and well, and had a miscarriage at 11 weeks. How does the nurse record her parity?",
          "type": "single",
          "opts": [
            "Para 1",
            "Para 2",
            "Para 3",
            "Para 0"
          ],
          "ans": [
            0
          ],
          "why": "Parity counts <b>pregnancies carried to 20 weeks or beyond, not babies</b>, so a twin birth at term is para 1. The miscarriage at 11 weeks did not reach 20 weeks and does not add to parity, though a stillbirth would count.",
          "id": "nur234-m3-q05",
          "sourceNumber": 5
        },
        {
          "q": "A nurse reviews vital signs on four clients in the prenatal clinic. Which finding requires follow-up first?",
          "type": "single",
          "opts": [
            "A client at 36 weeks with a BP of 86/50",
            "A client at 20 weeks whose BP has fallen from her first-trimester baseline",
            "A client at 32 weeks whose pulse is 12 beats/min above her baseline",
            "A client at 28 weeks with a hemoglobin of 11.2 g/dL"
          ],
          "ans": [
            0
          ],
          "why": "Blood pressure normally trends <b>down in the first two trimesters and back to baseline at term</b>, so hypotension at 36 weeks is unexpected. A pulse rise of 10 to 15/min by about 32 weeks and mild dilutional hemoglobin changes are expected.",
          "id": "nur234-m3-q06",
          "sourceNumber": 6
        },
        {
          "q": "Which findings are presumptive signs of pregnancy? Select all that apply.",
          "type": "sata",
          "opts": [
            "Amenorrhea",
            "Nausea and vomiting",
            "Fetal heart tones heard by Doppler",
            "Breast tenderness",
            "Quickening"
          ],
          "ans": [
            0,
            1,
            3,
            4
          ],
          "why": "The three levels are the exam's favorite: <b>presumptive</b> is what the woman feels (amenorrhea, nausea, breast changes, quickening) and can have other causes; <b>probable</b> is what the examiner observes (Goodell's, Chadwick's, Hegar's, a positive pregnancy test); <b>positive</b> is the fetus itself - heard, seen, or felt moving by the examiner.",
          "topic": "Physiologic & Psychological…",
          "icon": "🤰",
          "topicFull": "Physiologic & Psychological Changes of Pregnancy",
          "card": "more/NG-331_prenatal-assessment.html",
          "cardLabel": "Prenatal Assessment, GTPAL & Dating",
          "id": "nur234-m3-q07",
          "sourceNumber": 7
        },
        {
          "q": "A client at 30 weeks reports dizziness when lying flat on her back. What is the nurse's best action?",
          "type": "single",
          "opts": [
            "Turn the client onto her left side",
            "Place the client in Trendelenburg",
            "Administer oxygen by mask and continue supine",
            "Have the client sit fully upright and hold her breath"
          ],
          "ans": [
            0
          ],
          "why": "This is <b>supine hypotensive syndrome</b>: the gravid uterus compresses the inferior vena cava, venous return falls, and cardiac output with it. <b>Turning to the side lifts the uterus off the vena cava</b> and fixes it in seconds. Left is taught by convention, but any lateral tilt works.",
          "topic": "Physiologic & Psychological…",
          "icon": "🤰",
          "topicFull": "Physiologic & Psychological Changes of Pregnancy",
          "id": "nur234-m3-q08",
          "sourceNumber": 8
        },
        {
          "q": "Which physiologic changes are expected in normal pregnancy? Select all that apply.",
          "type": "sata",
          "opts": [
            "Blood volume increases about 40 to 50%",
            "A physiologic anemia from plasma diluting red cells",
            "A resting heart rate rise of 10 to 15 beats per minute",
            "A rise in blood pressure through the second trimester",
            "Slowed gastric emptying"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Plasma rises faster than red cell mass, so the hematocrit falls without true anemia. Progesterone relaxes smooth muscle, so the stomach empties slowly - hence the reflux and the aspiration risk in labor. <b>Blood pressure normally falls</b> in the second trimester and returns to baseline by term; a rise is the abnormal finding you are screening for.",
          "topic": "Physiologic & Psychological…",
          "icon": "🤰",
          "topicFull": "Physiologic & Psychological Changes of Pregnancy",
          "id": "nur234-m3-q09",
          "sourceNumber": 9
        },
        {
          "q": "A client at 28 weeks of gestation asks the nurse why her provider said her blood count was low but did not start an iron supplement. Which explanation by the nurse is most accurate?",
          "type": "single",
          "opts": [
            "Your body gives most of its red blood cells to the fetus during this trimester.",
            "This is an early iron deficiency, and supplements will be started at your next visit.",
            "Your plasma volume rises 40 to 50 percent, so your blood is more dilute, not deficient.",
            "Your cardiac output drops in pregnancy, which lowers the red cells in circulation."
          ],
          "ans": [
            2
          ],
          "why": "Cardiac output rises 25-50% and plasma volume rises 40-50%, so hemoglobin looks lower from <b>dilution</b> - the physiologic anemia of pregnancy. Calling it iron deficiency is the trap: it is a dilutional change, not a deficiency, and should not be treated as one without labs.",
          "id": "nur234-m3-q10",
          "sourceNumber": 10
        },
        {
          "q": "A nurse palpates the fundus of a pregnant client and finds it midway between the symphysis pubis and the umbilicus. Which gestational age does this finding best support?",
          "type": "single",
          "opts": [
            "12 weeks",
            "16 weeks",
            "20 weeks",
            "36 weeks"
          ],
          "ans": [
            1
          ],
          "why": "The fundus sits just above the symphysis at 12 weeks, <b>midway to the umbilicus at 16 weeks</b>, and reaches the xiphoid by 36 weeks. Twelve weeks tempts students because that is when the fundus first becomes palpable, but at that point it is at the symphysis, not midway up.",
          "id": "nur234-m3-q11",
          "sourceNumber": 11
        },
        {
          "q": "A client reports that her last menstrual period began on June 8 and that her cycles are regular at 28 days. Using Nagele's rule, which estimated date of delivery should the nurse calculate?",
          "type": "single",
          "opts": [
            "March 1",
            "March 8",
            "March 15",
            "September 15"
          ],
          "ans": [
            2
          ],
          "why": "Nagele's rule is LMP minus 3 months, plus 7 days, plus 1 year: June 8 becomes March 8, then <b>March 15</b>. March 8 is the common miss because the 7 days are left off. Because the rule assumes a regular 28-day cycle, the date is an estimate, not a promise.",
          "id": "nur234-m3-q12",
          "sourceNumber": 12
        },
        {
          "q": "A client at 8 weeks of gestation tells the nurse that some days she is delighted about the pregnancy and other days she wishes it had not happened. Which response by the nurse is most appropriate?",
          "type": "single",
          "opts": [
            "Mixed feelings this early are common and usually settle before the third trimester.",
            "Feelings like these mean you are rejecting the pregnancy, so I will arrange a referral.",
            "Most women feel torn like this right up until the birth, so try not to think about it.",
            "Feeling this way this early usually means the pregnancy was not planned."
          ],
          "ans": [
            0
          ],
          "why": "Ambivalence early in pregnancy is <b>normal</b> and usually resolves before the third trimester. Treating it as rejection of the pregnancy is the tempting choice, but it turns an expected psychological change into pathology and shuts down the client's disclosure.",
          "id": "nur234-m3-q13",
          "sourceNumber": 13
        }
      ]
    },
    {
      "id": "nur235-m1",
      "course": "NUR 235",
      "module": 1,
      "topic": "Intro to Pediatric Nursing",
      "title": "Pediatric Comfort Coach",
      "icon": "🧸",
      "tagline": "Practice comfort, communication and small calculation rounds.",
      "robot": {
        "src": "rustic-sam.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur235-m1.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "A caregiver rocks a supported child, a child watches bubbles, a child imagines a landscape, and an infant is supported in a tucked position.",
      "path": "nur235-m1.html",
      "source": "../nur235-m1.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur235-m1-p01",
          "category": "Care",
          "prompt": "Pediatric care that includes the child and caregivers as partners",
          "answer": "Family-centered care"
        },
        {
          "id": "nur235-m1-p02",
          "category": "Assessment",
          "prompt": "Order that improves cooperation during a toddler examination",
          "answer": "Least invasive parts first"
        },
        {
          "id": "nur235-m1-p03",
          "category": "Assessment",
          "prompt": "Two uncomfortable examination areas often left until last",
          "answer": "Ears and throat"
        },
        {
          "id": "nur235-m1-p04",
          "category": "Consent",
          "prompt": "Person who explains the procedure and obtains informed consent",
          "answer": "The responsible provider"
        },
        {
          "id": "nur235-m1-p05",
          "category": "Consent",
          "prompt": "Nurse's role when witnessing consent",
          "answer": "Verify understanding and witness the signature"
        },
        {
          "id": "nur235-m1-p06",
          "category": "Consent",
          "prompt": "Best next step when a parent still does not understand a procedure",
          "answer": "Ask the provider to explain before signing"
        },
        {
          "id": "nur235-m1-p07",
          "category": "Medication",
          "prompt": "Weight unit used for pediatric medication calculations",
          "answer": "Kilograms"
        },
        {
          "id": "nur235-m1-p08",
          "category": "Medication",
          "prompt": "Usual IM site for an infant",
          "answer": "Vastus lateralis"
        },
        {
          "id": "nur235-m1-p09",
          "category": "Pain",
          "prompt": "Behavioral pain tool for a child who cannot self-report",
          "answer": "FLACC"
        },
        {
          "id": "nur235-m1-p10",
          "category": "Pain",
          "prompt": "The five observations represented by FLACC",
          "answer": "Face, Legs, Activity, Cry, Consolability"
        },
        {
          "id": "nur235-m1-p11",
          "category": "Pain",
          "prompt": "Picture-based self-report pain scale",
          "answer": "Wong-Baker FACES"
        },
        {
          "id": "nur235-m1-p12",
          "category": "Pain",
          "prompt": "Self-report pain scale suited to a cognitively able older child",
          "answer": "Numeric 0–10 scale"
        },
        {
          "id": "nur235-m1-p13",
          "category": "Comfort",
          "prompt": "Bubbles, a video or a game during care",
          "answer": "Distraction"
        },
        {
          "id": "nur235-m1-p14",
          "category": "Comfort",
          "prompt": "Imagining and describing a pleasant scene",
          "answer": "Guided imagery"
        },
        {
          "id": "nur235-m1-p15",
          "category": "Comfort",
          "prompt": "Well-supported, slow rhythmic rocking of a young child",
          "answer": "Relaxation"
        },
        {
          "id": "nur235-m1-p16",
          "category": "Comfort",
          "prompt": "Swaddling or facilitated tucking for an infant",
          "answer": "Containment"
        },
        {
          "id": "nur235-m1-p17",
          "category": "Comfort",
          "prompt": "Massage, pressure or another skin-based comfort measure",
          "answer": "Cutaneous stimulation"
        },
        {
          "id": "nur235-m1-p18",
          "category": "Procedures",
          "prompt": "Place for painful procedures that preserves the bed as a safe space",
          "answer": "Treatment room"
        },
        {
          "id": "nur235-m1-p19",
          "category": "Procedures",
          "prompt": "Age-appropriate preparation using safe equipment and a doll",
          "answer": "Medical play"
        },
        {
          "id": "nur235-m1-p20",
          "category": "Safety",
          "prompt": "Why normal pediatric blood pressure does not exclude shock",
          "answer": "Hypotension can be a late finding"
        },
        {
          "id": "nur235-m1-p21",
          "category": "Communication",
          "prompt": "How to explain a procedure to a preschooler",
          "answer": "Short, concrete, honest words close to the event"
        },
        {
          "id": "nur235-m1-p22",
          "category": "Adolescent care",
          "prompt": "Two supports especially important for an adolescent",
          "answer": "Privacy and peer contact"
        },
        {
          "id": "nur235-m1-p23",
          "category": "Tube feeding",
          "prompt": "Initial confirmation of feeding-tube location in the module",
          "answer": "Radiographic confirmation"
        },
        {
          "id": "nur235-m1-p24",
          "category": "Positioning",
          "prompt": "Position during posterior iliac crest marrow aspiration in this course",
          "answer": "Prone, with access to the back of the hip"
        }
      ],
      "cases": [
        {
          "q": "A nurse is preparing to instill antibiotic otic drops in an 18-month-old. The bottle has just come out of the refrigerator. Which action should the nurse take first?",
          "type": "single",
          "opts": [
            "Warm the bottle to room temperature by rolling it between the hands",
            "Pull the pinna up and back and instill the drops",
            "Massage the tragus to move the drops inward",
            "Position the child supine with the head flat"
          ],
          "ans": [
            0
          ],
          "why": "Cold drops in the canal cause pain and vertigo, so warming comes before positioning or instilling. Pulling the pinna <b>up and back</b> is also wrong for this child: the direction is down and back under age 3 and only flips up and back at 3 years.",
          "id": "nur235-m1-q01",
          "sourceNumber": 1
        },
        {
          "q": "A nurse brings a surgical consent form to the parent of a 4-year-old scheduled for a myringotomy. The parent says, \"I still do not really know what they are going to do to her ears.\" Which action should the nurse take first?",
          "type": "single",
          "opts": [
            "Explain the myringotomy procedure to the parent in simple terms",
            "Notify the provider that the parent needs the procedure explained before signing",
            "Witness the signature and document the parent's question",
            "Ask the child life specialist to prepare the child for surgery"
          ],
          "ans": [
            1
          ],
          "why": "The provider obtains consent; the nurse witnesses the signature and verifies understanding by teach-back. Those are <b>different verbs on purpose</b> — explaining the procedure herself is the nurse stepping into the provider's role.",
          "id": "nur235-m1-q02",
          "sourceNumber": 2
        },
        {
          "q": "A nurse is choosing a pain scale for a 4-year-old who is alert, talking about his cartoon, and can point to pictures. Which tool is most appropriate?",
          "type": "single",
          "opts": [
            "FLACC behavioral scale",
            "Wong-Baker FACES scale",
            "0-to-10 numeric rating scale",
            "Whichever scale the parent prefers"
          ],
          "ans": [
            1
          ],
          "why": "Wong-Baker FACES is for age 3 and up; FLACC covers 0-3 years when the child cannot self-report, and the numeric scale starts around 5 if the child is cognitively able. The choice is driven by <b>whether the child can self-report</b>, not by how much pain the nurse thinks is present.",
          "id": "nur235-m1-q03",
          "sourceNumber": 3
        },
        {
          "q": "A 5-year-old is recovering in the procedure area after conscious sedation for a bone marrow aspiration. Which actions should the nurse include? Select all that apply.",
          "type": "sata",
          "opts": [
            "Position the child side-lying",
            "Keep the child NPO until the gag reflex has returned",
            "Place the child prone so secretions drain freely",
            "Assist the child to the bathroom as soon as he is arousable",
            "Maintain continuous respiratory rate, heart rate and SpO2 monitoring"
          ],
          "ans": [
            0,
            1,
            4
          ],
          "why": "Lateral/side-lying is the airway-protective recovery position, NPO holds until the gag reflex returns, and continuous cardiorespiratory monitoring stays on. <b>Prone is rejected for obstruction risk</b>, and no ambulation is allowed until protective reflexes and full alertness return. This is about recovery from sedation &mdash; during the aspiration itself, ATI positions the client prone for the posterior iliac crest.",
          "id": "nur235-m1-q04",
          "sourceNumber": 4
        },
        {
          "q": "A child weighs 16 kg. Using the Holliday-Segar method, how many milliliters of maintenance fluid should this child receive in 24 hours?",
          "type": "single",
          "opts": [
            "1,250 mL",
            "1,300 mL",
            "1,600 mL",
            "1,800 mL"
          ],
          "ans": [
            1
          ],
          "why": "100 mL/kg for the first 10 kg = 1,000 mL, then 50 mL/kg for kg 11-20 = 6 x 50 = 300 mL, totaling <b>1,300 mL/day</b>. 1,600 comes from misapplying the over-20-kg step, and 1,800 comes from using 100 mL/kg throughout.",
          "id": "nur235-m1-q05",
          "sourceNumber": 5
        },
        {
          "q": "A nurse has inserted a nasogastric feeding tube in a 2-year-old. Which finding confirms correct placement before the feeding is started?",
          "type": "single",
          "opts": [
            "Auscultation of an air bolus over the epigastrium",
            "Aspiration of gastric contents with an acidic pH",
            "Radiographic confirmation of tube position",
            "The external tube length matches the measured mark"
          ],
          "ans": [
            2
          ],
          "why": "<b>X-ray is the gold standard for confirming any feeding tube placement.</b> The air-bolus whoosh is unreliable, and pH and external length are supporting checks between feedings, not initial confirmation.",
          "id": "nur235-m1-q06",
          "sourceNumber": 6
        },
        {
          "type": "sata",
          "week": "1",
          "step": "action",
          "topic": "Intro to Pediatric Nursing",
          "q": "A 4-year-old boy is admitted for IV antibiotics, and his peripheral IV will be started in 30 minutes. Which of the following actions should the nurse take now? (Select all that apply.)",
          "opts": [
            "Explain what will happen in short, concrete words just before the start",
            "Let him handle safe equipment and practice the steps on a doll",
            "Ask his caregiver to stay with him during the IV start",
            "Start the IV in his own hospital bed so he does not have to move",
            "Promise him that the IV start will not hurt at all",
            "Tell him the IV is what happens to children who refuse their medicine"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Preschoolers think in magical, literal terms and fear bodily harm, so preparation is simple, concrete, and given close to the event rather than hours ahead. Handling the equipment and rehearsing on a doll turns a frightening procedure into something he has some control over, and the caregiver's presence lowers his stress more than any distraction the nurse can offer. Painful procedures are done in a treatment room so the bed stays a safe place. Never promise no pain, because a child this age takes the words literally and will not trust the nurse afterward, and never frame a procedure as a punishment for behavior.",
          "src": "ATI ch 10 Hospitalization, Illness, and Play",
          "icon": "📘",
          "topicFull": "Intro to Pediatric Nursing",
          "id": "nur235-m1-q07",
          "sourceNumber": 7
        },
        {
          "q": "A nurse is preparing a 4-year-old for an IV insertion. Which approach is most developmentally appropriate?",
          "type": "single",
          "opts": [
            "Explain the procedure in detail two days beforehand",
            "Explain it in simple terms just before, and let the child hold a doll or handle equipment",
            "Tell the child it will not hurt at all",
            "Explain it only to the parent, not the child"
          ],
          "ans": [
            1
          ],
          "why": "Preschoolers have <b>no useful sense of time</b>, so preparation happens shortly before - hours, not days - and they learn through play. <b>Never promise it will not hurt</b>: a preschooler already fears bodily harm, and one broken promise costs you every procedure after it.",
          "topic": "Intro to Pediatric Nursing",
          "icon": "📘",
          "topicFull": "Intro to Pediatric Nursing",
          "id": "nur235-m1-q08",
          "sourceNumber": 8
        },
        {
          "q": "Which techniques help when assessing a toddler? Select all that apply.",
          "type": "sata",
          "opts": [
            "Perform the least invasive parts first",
            "Keep the caregiver present",
            "Examine the ears and throat last",
            "Undress the child completely at the start",
            "Let the child handle the stethoscope"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Toddlers cooperate on their own terms: <b>quiet-to-invasive order</b>, caregiver in reach, ears and throat last because they are the worst part, and letting them touch the equipment turns it from a threat into an object. Undressing completely at the start hands away their sense of control immediately.",
          "topic": "Intro to Pediatric Nursing",
          "icon": "📘",
          "topicFull": "Intro to Pediatric Nursing",
          "id": "nur235-m1-q09",
          "sourceNumber": 9
        },
        {
          "q": "According to Erikson, which psychosocial task belongs to the school-age child?",
          "type": "single",
          "opts": [
            "Trust versus mistrust",
            "Autonomy versus shame and doubt",
            "Industry versus inferiority",
            "Identity versus role confusion"
          ],
          "ans": [
            2
          ],
          "why": "The order is <b>trust (infant), autonomy (toddler), initiative (preschool), industry (school age), identity (adolescent)</b>. School-agers need to <b>make and finish things</b>, which is why hospitalization that interrupts school and projects hits them so hard.",
          "topic": "Intro to Pediatric Nursing",
          "icon": "📘",
          "topicFull": "Intro to Pediatric Nursing",
          "card": "core/NG-349_growth-development.html",
          "cardLabel": "Growth, Development & Erikson",
          "id": "nur235-m1-q10",
          "sourceNumber": 10
        },
        {
          "q": "A 2-year-old admitted with several days of vomiting and diarrhea has a heart rate of 168, respirations of 38, and a blood pressure of 90/58. The parent says he has gone from fussy to quiet and floppy. Which interpretation is most accurate?",
          "type": "single",
          "opts": [
            "The blood pressure is within normal limits for a toddler, so shock can be ruled out",
            "The tachycardia and the change in behavior are early signs of deterioration",
            "The quiet, floppy behavior is reassuring compared with a child who is screaming",
            "Bradycardia and hypotension would be expected before any other change appears"
          ],
          "ans": [
            1
          ],
          "why": "Tachycardia is the <b>very first compensation</b> in a child, and a change in behavior counts as a vital sign, so both findings point to deterioration. The tempting answer is the normal blood pressure, but in children blood pressure falls <b>last</b> — a normal BP never rules out shock, and hypotension with bradycardia are pre-arrest, not early, signs.",
          "id": "nur235-m1-q11",
          "sourceNumber": 11
        },
        {
          "q": "A 6-month-old who weighs 8 kg has voided a total of 12 mL over the past 4 hours. Which conclusion should the nurse draw about this infant's urine output?",
          "type": "single",
          "opts": [
            "About 0.4 mL/kg/hr, which is below the expected range for an infant",
            "About 1.5 mL/kg/hr, which is within the expected range for an infant",
            "Adequate, because it meets the 0.5 mL/kg/hr minimum expected at every age",
            "Impossible to evaluate without a 24-hour urine collection"
          ],
          "ans": [
            0
          ],
          "why": "12 mL over 4 hours is 3 mL/hr, and 3 divided by 8 kg is about <b>0.4 mL/kg/hr</b> — below the infant expectation of 1–3 mL/kg/hr. The tempting choice is the 0.5 mL/kg/hr figure, but that is the standard for an older <b>child</b>; applying it to an infant would falsely reassure the nurse that output is fine.",
          "id": "nur235-m1-q13",
          "sourceNumber": 13
        },
        {
          "q": "A nurse is preparing to obtain a blood specimen by femoral venipuncture from a toddler. In which position should the nurse place the child?",
          "type": "single",
          "opts": [
            "Supine with the legs in a frog position",
            "Side-lying with the knees drawn up toward the abdomen",
            "Sitting upright and leaning forward over a pillow",
            "Semi-recumbent with the head and chest elevated"
          ],
          "ans": [
            0
          ],
          "why": "Femoral venipuncture needs the <b>groin</b> exposed, so the child lies <b>supine with the legs frog-legged</b> — thighs abducted, knees out to the side, hips rotated outward. That widens the femoral vein at the inguinal crease and moves the artery off it. The other three are real positions for other procedures: <b>side-lying knees-to-chest</b> and <b>flexed sitting</b> are both lumbar puncture, and <b>semi-recumbent</b> is gavage or tube feeding.",
          "id": "nur235-m1-q17",
          "sourceNumber": 17
        },
        {
          "q": "A nurse is planning to implement relaxation strategies with a young child prior to a painful procedure. Which of the following actions should the nurse take?",
          "type": "single",
          "opts": [
            "Rock the child in long rhythmic movements.",
            "Ask the child to hold his breath and then blow it out slowly.",
            "Ask the child to describe a pleasurable event.",
            "Bounce the child gently while holding him upright."
          ],
          "ans": [
            0
          ],
          "why": "Relaxation in a <b>young child</b> is <b>physical, not verbal</b>: sit with them in a <b>well-supported position</b> such as against your chest, then <b>rock or sway in long, wide, rhythmic movements</b>. <b>Bouncing is not the answer</b> &mdash; fast, jerky motion stimulates rather than settles. <b>Describing a pleasurable event</b> is <b>guided imagery</b>, which needs enough language and imagination to be a school-age technique. <b>Holding a breath and blowing it out</b> is a breathing technique &mdash; and a toddler cannot reliably do it on command anyway. <b>A note on that last one:</b> most nursing sources file coached breathing under <i>relaxation</i>, while this question's rationale calls it <i>distraction</i>. Do not spend the question arguing the label &mdash; sort by <b>what a child that age can actually do</b>, and you land on the rocking either way.",
          "id": "nur235-m1-q19",
          "sourceNumber": 19
        },
        {
          "q": "A nurse is caring for four children admitted to a pediatric unit. Which child is at greatest risk for a stress reaction to hospitalization?",
          "type": "single",
          "opts": [
            "A 2-year-old admitted through the emergency department for the first time, whose parent is visibly anxious",
            "A 9-year-old admitted for a planned tonsillectomy who toured the unit last week",
            "A 6-month-old whose parent is rooming in and who has had two brief previous admissions",
            "A 16-year-old admitted for a sports injury whose friends have been visiting"
          ],
          "ans": [
            0
          ],
          "why": "The risk factors <b>stack</b>, and this child has most of them. <b>Age 6 months to about 3&ndash;4 years</b> is the peak-vulnerability window &mdash; old enough to miss the parent, too young to understand why. Add a <b>first hospitalization</b> that was <b>unplanned</b> (no preparation, no rehearsal) and an <b>anxious parent</b>, whom a toddler reads and mirrors. The 9-year-old had <b>preparation</b> and a planned admission. The 6-month-old has a <b>parent rooming in</b> and <b>prior experience</b>, both protective. The adolescent has <b>peer support</b>, which is what that age needs most. Calming the parent is an intervention for the child.",
          "id": "nur235-m1-q20",
          "sourceNumber": 20
        }
      ]
    },
    {
      "id": "nur235-m2",
      "course": "NUR 235",
      "module": 2,
      "topic": "The Infant (0–1 year)",
      "title": "Nursery Safety Sweep",
      "icon": "🍼",
      "tagline": "Build trust, find the safer sleep space and connect infant development.",
      "robot": {
        "src": "rustic-sam.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur235-m2.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "Setup A shows back sleeping on a bare firm flat surface. Setup B includes a pillow and loose blanket. Other panels depict a hidden toy and an upward growth trend.",
      "path": "nur235-m2.html",
      "source": "../nur235-m2.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur235-m2-p01",
          "category": "Development",
          "prompt": "Erikson's psychosocial stage in infancy",
          "answer": "Trust versus mistrust"
        },
        {
          "id": "nur235-m2-p02",
          "category": "Development",
          "prompt": "Piaget's stage in infancy",
          "answer": "Sensorimotor"
        },
        {
          "id": "nur235-m2-p03",
          "category": "Development",
          "prompt": "Knowing that an object still exists when hidden",
          "answer": "Object permanence"
        },
        {
          "id": "nur235-m2-p04",
          "category": "Behavior",
          "prompt": "Distress triggered by an unfamiliar person",
          "answer": "Stranger anxiety"
        },
        {
          "id": "nur235-m2-p05",
          "category": "Behavior",
          "prompt": "Distress triggered by a caregiver leaving",
          "answer": "Separation anxiety"
        },
        {
          "id": "nur235-m2-p06",
          "category": "Trust",
          "prompt": "A caregiving action that builds infant trust",
          "answer": "Consistently responding to needs"
        },
        {
          "id": "nur235-m2-p07",
          "category": "Growth",
          "prompt": "Expected birth-weight multiplier by about 12 months",
          "answer": "Three times birth weight"
        },
        {
          "id": "nur235-m2-p08",
          "category": "Growth",
          "prompt": "Course window for birth weight to approximately double",
          "answer": "About 4–6 months"
        },
        {
          "id": "nur235-m2-p09",
          "category": "Assessment",
          "prompt": "What a sunken fontanel can suggest",
          "answer": "Dehydration"
        },
        {
          "id": "nur235-m2-p10",
          "category": "Assessment",
          "prompt": "What a bulging fontanel at rest can suggest",
          "answer": "Increased intracranial pressure"
        },
        {
          "id": "nur235-m2-p11",
          "category": "Reflexes",
          "prompt": "Turning toward a cheek stimulus to find a nipple",
          "answer": "Rooting reflex"
        },
        {
          "id": "nur235-m2-p12",
          "category": "Reflexes",
          "prompt": "An involuntary grasp when a finger touches the palm",
          "answer": "Palmar grasp reflex"
        },
        {
          "id": "nur235-m2-p13",
          "category": "Reflexes",
          "prompt": "The infant startle response",
          "answer": "Moro reflex"
        },
        {
          "id": "nur235-m2-p14",
          "category": "Feeding",
          "prompt": "Tongue-thrust response that must fade for solid-food readiness",
          "answer": "Extrusion reflex"
        },
        {
          "id": "nur235-m2-p15",
          "category": "Sleep",
          "prompt": "Position used to start every infant sleep",
          "answer": "Supine: on the back"
        },
        {
          "id": "nur235-m2-p16",
          "category": "Sleep",
          "prompt": "Recommended infant sleep surface",
          "answer": "Firm, flat and bare"
        },
        {
          "id": "nur235-m2-p17",
          "category": "Sleep",
          "prompt": "Sharing a room while keeping separate sleep surfaces",
          "answer": "Room-sharing without bed-sharing"
        },
        {
          "id": "nur235-m2-p18",
          "category": "Feeding",
          "prompt": "Food avoided before 12 months because of botulism risk",
          "answer": "Honey"
        },
        {
          "id": "nur235-m2-p19",
          "category": "Feeding",
          "prompt": "Milk not used as the main drink before 12 months",
          "answer": "Cow's milk"
        },
        {
          "id": "nur235-m2-p20",
          "category": "Feeding",
          "prompt": "Supplement commonly needed by breastfed infants",
          "answer": "Vitamin D"
        },
        {
          "id": "nur235-m2-p21",
          "category": "Feeding",
          "prompt": "General timing for complementary foods when developmentally ready",
          "answer": "Around 6 months"
        },
        {
          "id": "nur235-m2-p22",
          "category": "Safety",
          "prompt": "Whole grapes, nuts and popcorn share this danger",
          "answer": "Choking hazard"
        },
        {
          "id": "nur235-m2-p23",
          "category": "Assessment",
          "prompt": "How long to count the quiet infant's apical pulse",
          "answer": "One full minute"
        },
        {
          "id": "nur235-m2-p24",
          "category": "Development",
          "prompt": "A change more concerning than a skill that is merely emerging slowly",
          "answer": "Loss of a previously acquired skill"
        }
      ],
      "cases": [
        {
          "q": "A nurse observes a parent settle a 2-month-old for a nap prone on a soft quilt with crib bumpers in place. Which action should the nurse take first?",
          "type": "single",
          "opts": [
            "Document the observation in the record",
            "Reposition the infant supine on a bare, firm mattress",
            "Ask the parent why she prefers the prone position",
            "Plan to teach safe sleep at the discharge visit"
          ],
          "ans": [
            1
          ],
          "why": "Safe sleep is supine in a bare, firm crib with no co-sleeping, and an unsafe sleep surface is an active airway risk — remove it now, then teach. <b>Teaching later does not protect the infant currently in the crib.</b>",
          "id": "nur235-m2-q02",
          "sourceNumber": 2
        },
        {
          "q": "A nurse assesses a 2-week-old at a well-child visit. Which findings require follow-up? Select all that apply.",
          "type": "sata",
          "opts": [
            "Bluish discoloration around the mouth while the infant cries hard",
            "Blue discoloration of the lips and tongue while the infant rests quietly",
            "A soft, rounded, protuberant abdomen",
            "A firm, distended abdomen with absent bowel sounds",
            "Scattered petechiae across the trunk and extremities"
          ],
          "ans": [
            1,
            3,
            4
          ],
          "why": "Circumoral cyanosis can be benign, but <b>central cyanosis of the lips and tongue is always abnormal</b>. A protuberant abdomen is normal while a firm distended one is not, and petechiae limited to the face right after delivery are expected while generalized petechiae are not.",
          "id": "nur235-m2-q03",
          "sourceNumber": 3
        },
        {
          "q": "A nurse is teaching the mother of an exclusively breastfed 5-month-old. Which statement indicates a need for further teaching?",
          "type": "single",
          "opts": [
            "\"Breast milk gives her everything she needs, so she does not need any supplement.\"",
            "\"Breast milk and formula both provide about 20 calories per ounce.\"",
            "\"I will start iron-fortified cereal around 6 months, once she has good head control.\"",
            "\"I will introduce only one new food every 3 to 5 days.\""
          ],
          "ans": [
            0
          ],
          "why": "Breast milk requires <b>vitamin D supplementation</b>, and its iron stores run out by 4-6 months, so the no-supplement statement is the wrong one. The other three statements are all accurate as written.",
          "id": "nur235-m2-q05",
          "sourceNumber": 5
        },
        {
          "q": "A 7-month-old plays contentedly on her mother's lap but bursts into tears and turns her face away each time the unfamiliar nurse leans toward her. She settles immediately when the mother takes her back. Which phenomenon does this behavior demonstrate?",
          "type": "single",
          "opts": [
            "Separation anxiety",
            "Stranger anxiety",
            "Failure to establish trust",
            "Delayed social development"
          ],
          "ans": [
            1
          ],
          "why": "The distress is triggered by the <b>unfamiliar person</b>, not by the mother leaving, which makes it stranger anxiety (6-8 months). Separation anxiety (4-8 months) is protest when the caregiver leaves; the two overlap in age, so the behavior described is what decides the answer.",
          "id": "nur235-m2-q06",
          "sourceNumber": 6
        },
        {
          "q": "A caregiver asks when to start solid foods. What is the nurse's best response?",
          "type": "single",
          "opts": [
            "At 2 months",
            "At about 6 months, when the infant can sit with support and has lost the extrusion reflex",
            "At 3 months, starting with cow's milk",
            "Whenever the infant sleeps through the night"
          ],
          "ans": [
            1
          ],
          "why": "Readiness is developmental, not calendar-based: around <b>6 months</b>, sitting with support, good head control, and the <b>extrusion reflex gone</b> so food is not pushed back out. <b>Cow's milk is withheld until 12 months</b> - it causes occult GI bleeding and iron deficiency.",
          "topic": "The Infant (0-1 year)",
          "icon": "📘",
          "topicFull": "The Infant (0&ndash;1 year)",
          "id": "nur235-m2-q07",
          "sourceNumber": 7
        },
        {
          "q": "Which findings in a 6-month-old require follow-up? Select all that apply.",
          "type": "sata",
          "opts": [
            "Persistent Moro reflex",
            "Not rolling over in either direction",
            "Absent social smile",
            "Sitting with support",
            "No pincer grasp"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "By 6 months the <b>Moro reflex should be gone</b>, the infant should roll both ways and smile socially. Sitting with support is <b>on time</b>, and the <b>pincer grasp is not expected until about 9 to 10 months</b> - flagging it at 6 months is a false alarm.",
          "topic": "The Infant (0-1 year)",
          "icon": "📘",
          "topicFull": "The Infant (0&ndash;1 year)",
          "id": "nur235-m2-q08",
          "sourceNumber": 8
        },
        {
          "q": "Which are correct instructions for safe infant sleep? Select all that apply.",
          "type": "sata",
          "opts": [
            "Place the infant on the back to sleep",
            "Use a firm mattress with no soft bedding",
            "Room-share without bed-sharing",
            "Use bumper pads to prevent injury",
            "Keep the room free of smoke exposure"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Back to sleep, firm flat surface, own sleep space in the caregiver's room, no smoke. <b>Bumper pads, pillows, blankets and soft toys all raise the risk of suffocation</b> - the old instinct to pad the crib is exactly what the guidance reversed.",
          "topic": "The Infant (0-1 year)",
          "icon": "📘",
          "topicFull": "The Infant (0&ndash;1 year)",
          "id": "nur235-m2-q09",
          "sourceNumber": 9
        },
        {
          "q": "A nurse performs a reflex assessment on a 7-month-old at a well-child visit. Which finding should the nurse report to the provider?",
          "type": "single",
          "opts": [
            "A brisk symmetric Moro response when the infant is startled",
            "Fanning of the toes when the sole of the foot is stroked",
            "Curling of the toes when the ball of the foot is touched",
            "No stepping movements when the infant is held upright over a firm surface"
          ],
          "ans": [
            0
          ],
          "why": "The Moro reflex should disappear by about <b>6 months</b>, so its persistence at 7 months is the finding that needs follow-up. Toe fanning (Babinski) is expected until about 1 year and the plantar grasp until 8-9 months, and the stepping reflex normally disappears around 6 weeks, so none of those are abnormal here.",
          "id": "nur235-m2-q12",
          "sourceNumber": 12
        },
        {
          "q": "A nurse enters the room to obtain vital signs on a sleeping 3-month-old. Which action should the nurse take first?",
          "type": "single",
          "opts": [
            "Auscultate the apical pulse for a full minute while the infant is still quiet",
            "Wake and undress the infant so that an accurate temperature can be obtained",
            "Palpate the radial pulse for 30 seconds and double the result",
            "Apply the blood pressure cuff, then count the respiratory rate"
          ],
          "ans": [
            0
          ],
          "why": "Heart and respiratory rates are counted <b>before the infant is disturbed</b>, and the apical pulse is auscultated for a <b>full minute</b> because infant rhythms are irregular. Waking and undressing the infant first seems efficient but drives the rate up and makes the numbers useless.",
          "id": "nur235-m2-q13",
          "sourceNumber": 13
        },
        {
          "q": "A 9-month-old is admitted to the pediatric unit and cries hard every time his mother steps away from the bedside. Which nursing actions support this infant's psychosocial development? Select all that apply.",
          "type": "sata",
          "opts": [
            "Encourage the mother to room in with the infant",
            "Respond promptly when the infant cries",
            "Keep the mother at the bedside during painful procedures",
            "Ask the mother to slip out quietly while the infant is distracted",
            "Limit the mother's visits so the infant learns to settle himself"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "The infant is in Erikson's <b>trust versus mistrust</b> stage, and trust is built by needs being met consistently, so the nursing answer is to keep the parent present and respond promptly. Leaving without saying goodbye or limiting visits looks like it spares the infant protest, but it undermines trust and worsens separation anxiety.",
          "id": "nur235-m2-q15",
          "sourceNumber": 15
        },
        {
          "q": "A nurse is assessing a 2-week-old infant during a well-baby checkup. When the nurse places a finger in the infant's palm, the infant tightly grasps the finger. How should the nurse interpret this finding?",
          "type": "single",
          "opts": [
            "This is an expected palmar grasp reflex for the infant's age.",
            "This is an abnormal reflex that requires immediate neurological evaluation.",
            "This is a sign of seizure activity and should be reported.",
            "This is a voluntary movement indicating development of fine motor skills."
          ],
          "ans": [
            0
          ],
          "why": "<b>The palmar grasp reflex is present at birth and normally disappears around 3 to 4 months</b>, so a tight grasp at 2 weeks is expected. Reflexes are involuntary, not fine motor skill, and reflexive grasping does not indicate seizure activity.",
          "topic": "Newborn reflexes",
          "src": "LSC exam prep recording (Dr Hansen), Exam 1",
          "id": "nur235-m2-q16",
          "sourceNumber": 16
        },
        {
          "q": "A nurse is assessing a 9-month-old infant during a routine well-child visit. Which of the following findings should the nurse identify as an expected developmental milestone?",
          "type": "single",
          "opts": [
            "Pulling to a standing position while holding on to furniture",
            "Using a spoon independently to feed self",
            "Walking up and down stairs with assistance",
            "Speaking in short two-word sentences"
          ],
          "ans": [
            0
          ],
          "why": "<b>By 9 months an infant can pull up to stand and may begin cruising along furniture.</b> Independent spoon use occurs closer to 18 months, stairs with assistance around 2 years, and two-word sentences around 24 months.",
          "topic": "Infant developmental milestones",
          "src": "LSC exam prep recording (Dr Hansen), Exam 1",
          "id": "nur235-m2-q17",
          "sourceNumber": 17
        },
        {
          "q": "The nurse is performing assessments on several pediatric clients during well-child visits. Which findings should the nurse identify as expected developmental milestones? Select all that apply.",
          "type": "sata",
          "opts": [
            "A 2-month-old infant turns head toward the sound of a rattle.",
            "A 6-month-old infant sits steadily without support.",
            "A 15-month-old toddler walks with one hand held.",
            "An 18-month-old toddler scribbles spontaneously with a crayon.",
            "A 3-year-old child rides a tricycle.",
            "A 4-year-old child ties shoelaces independently."
          ],
          "ans": [
            0,
            2,
            3,
            4
          ],
          "why": "By 2 months an infant turns toward sound, by 15 months walks with one hand held, an 18-month-old scribbles, and <b>by 3 years a child can pedal a tricycle</b>. Sitting steadily without support happens around 8 months, not 6, and tying shoelaces is expected around age 5, not 4.",
          "topic": "Developmental milestones across ages",
          "src": "LSC exam prep recording (Dr Hansen), Exam 1",
          "id": "nur235-m2-q18",
          "sourceNumber": 18
        },
        {
          "q": "A nurse is teaching the parent of an infant about food allergens. Which of the following foods should the nurse include as being the most common food allergy in children?",
          "type": "single",
          "opts": [
            "Cow's milk",
            "Wheat bread",
            "Corn syrup",
            "Eggs"
          ],
          "ans": [
            0
          ],
          "why": "<b>Cow's milk protein is the most common food allergy in children</b> — it is usually the first foreign protein an infant meets in quantity, and most children outgrow it by school age. <b>Eggs</b> are a close second and a genuine common allergen, but not the most common. <b>Wheat</b> is a recognized allergen and far less common. <b>Corn syrup</b> is a sugar, not a protein, so it is not a typical allergen at all.",
          "id": "nur235-m2-q19",
          "sourceNumber": 19
        },
        {
          "q": "A nurse is preparing to administer immunizations to a 2-month-old infant. Which of the following pairs of vaccines should the nurse anticipate giving at this visit?",
          "type": "single",
          "opts": [
            "Haemophilus influenzae type b (Hib) and inactivated poliovirus (IPV)",
            "Measles, mumps, rubella (MMR) and varicella",
            "Measles, mumps, rubella (MMR) and tetanus, diphtheria, acellular pertussis (Tdap)",
            "Hepatitis A and live attenuated influenza (LAIV)"
          ],
          "ans": [
            0
          ],
          "why": "The 2-month visit is <b>DTaP, Hib, IPV, pneumococcal conjugate and rotavirus</b> (oral), with hepatitis B if it is due &mdash; so <b>Hib + IPV</b> is the pair that fits. Everything else is the wrong age: <b>MMR and varicella</b> are first given at <b>12&ndash;15 months</b>, <b>hepatitis A</b> starts at <b>12&ndash;23 months</b>, and <b>LAIV</b> (the nasal flu vaccine) is from <b>age 2</b>. <b>Tdap</b> is the adolescent booster at <b>11&ndash;12 years</b> &mdash; note that the infant series uses <b>DTaP</b>, the full-strength childhood formulation. Hib prevents a bacterial disease, not seasonal flu.",
          "id": "nur235-m2-q20",
          "sourceNumber": 20
        }
      ]
    },
    {
      "id": "nur235-m3",
      "course": "NUR 235",
      "module": 3,
      "topic": "Toddler & Preschooler",
      "title": "Playroom Choices",
      "icon": "🧱",
      "tagline": "Read the play scene and choose words that fit the child.",
      "robot": {
        "src": "rustic-sam.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur235-m3.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "Two children use separate blocks in scene A and share blocks in scene B. Two colored cups represent limited choices. Circle, square and triangle form the shape ladder.",
      "path": "nur235-m3.html",
      "source": "../nur235-m3.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur235-m3-p01",
          "category": "Development",
          "prompt": "Erikson's toddler stage",
          "answer": "Autonomy versus shame and doubt"
        },
        {
          "id": "nur235-m3-p02",
          "category": "Development",
          "prompt": "Erikson's preschool stage",
          "answer": "Initiative versus guilt"
        },
        {
          "id": "nur235-m3-p03",
          "category": "Play",
          "prompt": "Playing beside another child with separate toys",
          "answer": "Parallel play"
        },
        {
          "id": "nur235-m3-p04",
          "category": "Play",
          "prompt": "Playing together loosely without a strongly organized goal",
          "answer": "Associative play"
        },
        {
          "id": "nur235-m3-p05",
          "category": "Thinking",
          "prompt": "Believing one's thoughts caused illness or a procedure",
          "answer": "Magical thinking"
        },
        {
          "id": "nur235-m3-p06",
          "category": "Thinking",
          "prompt": "Giving feelings or life to objects",
          "answer": "Animism"
        },
        {
          "id": "nur235-m3-p07",
          "category": "Thinking",
          "prompt": "Difficulty seeing a situation from another person's viewpoint",
          "answer": "Egocentrism"
        },
        {
          "id": "nur235-m3-p08",
          "category": "Toddler care",
          "prompt": "Two acceptable options instead of an open-ended yes/no question",
          "answer": "Limited choices"
        },
        {
          "id": "nur235-m3-p09",
          "category": "Toddler care",
          "prompt": "A repeated routine that helps a toddler feel secure",
          "answer": "Ritualism"
        },
        {
          "id": "nur235-m3-p10",
          "category": "Toddler care",
          "prompt": "The toddler tendency to say no",
          "answer": "Negativism"
        },
        {
          "id": "nur235-m3-p11",
          "category": "Stress",
          "prompt": "Returning to an earlier behavior during hospitalization",
          "answer": "Regression"
        },
        {
          "id": "nur235-m3-p12",
          "category": "Separation",
          "prompt": "Crying and resisting when the caregiver leaves",
          "answer": "Protest phase"
        },
        {
          "id": "nur235-m3-p13",
          "category": "Separation",
          "prompt": "Quiet withdrawal following prolonged separation",
          "answer": "Despair phase"
        },
        {
          "id": "nur235-m3-p14",
          "category": "Separation",
          "prompt": "Seeming indifference after prolonged separation",
          "answer": "Detachment phase"
        },
        {
          "id": "nur235-m3-p15",
          "category": "Nutrition",
          "prompt": "Normal decrease in toddler appetite as growth slows",
          "answer": "Physiologic anorexia"
        },
        {
          "id": "nur235-m3-p16",
          "category": "Preschool care",
          "prompt": "Response to “I am sick because I was bad”",
          "answer": "Explain that illness is not punishment"
        },
        {
          "id": "nur235-m3-p17",
          "category": "Preschool care",
          "prompt": "A way to rehearse care with dolls and safe equipment",
          "answer": "Therapeutic medical play"
        },
        {
          "id": "nur235-m3-p18",
          "category": "Sleep",
          "prompt": "A predictable way to settle before bed",
          "answer": "A consistent quiet bedtime routine"
        },
        {
          "id": "nur235-m3-p19",
          "category": "Language",
          "prompt": "Expected phrase pattern around age 2 in this module",
          "answer": "Two-word combinations"
        },
        {
          "id": "nur235-m3-p20",
          "category": "Motor",
          "prompt": "Wheeled toy skill associated with about age 3",
          "answer": "Pedaling a tricycle"
        },
        {
          "id": "nur235-m3-p21",
          "category": "Fine motor",
          "prompt": "First shape in the course's circle–square–triangle ladder",
          "answer": "Copying a circle"
        },
        {
          "id": "nur235-m3-p22",
          "category": "Safety",
          "prompt": "Storage that reduces access to medicines and cleaners",
          "answer": "Locked storage out of reach"
        },
        {
          "id": "nur235-m3-p23",
          "category": "Safety",
          "prompt": "What must never be induced after a corrosive ingestion",
          "answer": "Vomiting"
        },
        {
          "id": "nur235-m3-p24",
          "category": "Ear assessment",
          "prompt": "Pinna direction for the 4-year-old in this module",
          "answer": "Up and back"
        }
      ],
      "cases": [
        {
          "q": "A parent calls to report that her 2-year-old swallowed a mouthful of drain cleaner about 10 minutes ago. The child is crying, alert, and drooling. Which instruction should the nurse give first?",
          "type": "single",
          "opts": [
            "Give syrup of ipecac to induce vomiting",
            "Give a glass of milk to neutralize the chemical",
            "Do not induce vomiting; call poison control and bring the child in now",
            "Give activated charcoal from the home first aid kit"
          ],
          "ans": [
            2
          ],
          "why": "<b>Never induce vomiting after a corrosive ingestion</b> — the caustic re-injures the esophagus on the way back up. Neutralizing agents and charcoal are not the home management for corrosives either.",
          "id": "nur235-m3-q01",
          "sourceNumber": 1
        },
        {
          "q": "A 4-year-old scheduled for a tonsillectomy tells the nurse, \"I have to get an operation because I was bad.\" Which nursing response is the priority?",
          "type": "single",
          "opts": [
            "\"That is silly, nobody gets surgery for being bad.\"",
            "\"Would you like to play with this puppet while we wait?\"",
            "\"Surgery is never a punishment. You did nothing wrong, and the operation will help your sore throats.\"",
            "\"Your mom and dad can explain it to you later.\""
          ],
          "ans": [
            2
          ],
          "why": "Preschoolers use magical thinking and interpret illness or a procedure as <b>punishment</b>, so the intervention is direct reassurance, not just distraction. Offering the puppet is tempting because play is appropriate for this age, but it leaves the guilt uncorrected.",
          "id": "nur235-m3-q02",
          "sourceNumber": 2
        },
        {
          "q": "At a 30-month well-child visit, a parent reports her son uses about 15 recognizable words and has never put two words together. Which response is most appropriate?",
          "type": "single",
          "opts": [
            "\"That is within the expected range; many children talk later.\"",
            "\"This is normal dysfluency and should not be corrected.\"",
            "\"He should have about 50 words and be using two- to three-word phrases by now, so I will arrange a developmental evaluation.\"",
            "\"Read to him daily and we will recheck at age 4.\""
          ],
          "ans": [
            2
          ],
          "why": "Expect roughly <b>50 words by 30 months</b> and two- to three-word phrases by age 2, so this is a real delay that needs referral. Normal dysfluency is stuttering-type hesitancy in a preschooler with adequate vocabulary, which is not what is described.",
          "id": "nur235-m3-q05",
          "sourceNumber": 5
        },
        {
          "q": "In the playroom, two 2-year-olds sit beside each other, each pushing a separate truck and neither sharing or coordinating with the other. A parent asks whether her child is antisocial. Which response is correct?",
          "type": "single",
          "opts": [
            "\"This is parallel play and it is exactly what we expect at 2.\"",
            "\"This is associative play, which is typical for toddlers.\"",
            "\"This suggests he may need a social skills evaluation.\"",
            "\"Encourage him to share the truck so he learns cooperation now.\""
          ],
          "ans": [
            0
          ],
          "why": "Toddlers play <b>parallel</b> — alongside but not with each other; associative play belongs to the preschooler. Pushing a 2-year-old to share also collides with autonomy versus shame and doubt, the stage this child is working through.",
          "id": "nur235-m3-q06",
          "sourceNumber": 6
        },
        {
          "q": "A 2-year-old has a temper tantrum in the clinic waiting room. What is the nurse's best guidance to the caregiver?",
          "type": "single",
          "opts": [
            "Give in to the request to end the tantrum quickly",
            "Stay calm, keep the child safe, and ignore the behavior without giving attention to it",
            "Punish the child immediately",
            "Explain in detail why the behavior is wrong"
          ],
          "ans": [
            1
          ],
          "why": "Tantrums are <b>normal at this age</b> - autonomy running ahead of language. Staying calm and withholding attention removes the payoff; giving in teaches that tantrums work. A long explanation is beyond a 2-year-old and is itself attention.",
          "topic": "Toddler & Preschooler",
          "icon": "📘",
          "topicFull": "Toddler & Preschooler",
          "card": "core/NG-349_growth-development.html",
          "cardLabel": "Growth, Development & Erikson",
          "id": "nur235-m3-q07",
          "sourceNumber": 7
        },
        {
          "q": "Which nursing measures address a preschooler's fears about hospitalization? Select all that apply.",
          "type": "sata",
          "opts": [
            "Use bandages after procedures",
            "Allow choices where real choices exist",
            "Correct magical thinking that illness is a punishment",
            "Perform painful procedures in the child's own bed",
            "Encourage medical play"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Preschoolers fear <b>bodily mutilation</b>, so a plaster over a puncture genuinely reassures. They also believe illness is punishment, so saying plainly that it is not is a real intervention. <b>Painful procedures are done in a treatment room</b>, never in bed - the bed must stay safe.",
          "topic": "Toddler & Preschooler",
          "icon": "📘",
          "topicFull": "Toddler & Preschooler",
          "id": "nur235-m3-q08",
          "sourceNumber": 8
        },
        {
          "q": "A toddler is admitted and cries inconsolably, then becomes quiet and withdrawn and turns away from the parent on visiting. How does the nurse interpret this?",
          "type": "single",
          "opts": [
            "The child has adjusted well",
            "This is the despair and detachment of separation anxiety",
            "The child is developing autism",
            "The child is being manipulative"
          ],
          "ans": [
            1
          ],
          "why": "Separation anxiety runs <b>protest, despair, detachment</b>. The quiet, withdrawn stage is often mistaken for settling in, and the turning-away is the most misread sign of all - it is <b>not</b> improvement, and caregivers need to be told so they do not stop visiting.",
          "topic": "Toddler & Preschooler",
          "icon": "📘",
          "topicFull": "Toddler & Preschooler",
          "id": "nur235-m3-q09",
          "sourceNumber": 9
        },
        {
          "q": "A 4-year-old hospitalized for 3 days has started wetting the bed and asking for a bottle, although he was fully toilet trained at home. His mother is embarrassed and asks the nurse what she is doing wrong. Which response by the nurse is best?",
          "type": "single",
          "opts": [
            "\"Remind him each time that big boys use the toilet, and hold his fluids after dinner until he stays dry.\"",
            "\"Losing skills he already had is a warning sign, so I will ask the provider to order developmental testing.\"",
            "\"Regression like this is a normal reaction to the stress of being in the hospital, and it usually fades once he is home in his own routine.\"",
            "\"Praise him on the mornings he is dry and take away a favorite toy on the mornings he is not.\""
          ],
          "ans": [
            2
          ],
          "why": "Regression under stress is <b>normal</b>, and the nursing action is to normalize it to the parents rather than treat it. Retraining him with reminders and fluid restriction is tempting because it looks like active teaching, but it treats an expected stress response as a problem and adds shame.",
          "id": "nur235-m3-q10",
          "sourceNumber": 10
        },
        {
          "q": "A nurse is preparing to visualize the tympanic membrane of a 4-year-old admitted with a suspected ear infection. How should the nurse position the pinna for this assessment?",
          "type": "single",
          "opts": [
            "Pull the pinna down and back",
            "Pull the pinna up and back",
            "Pull the pinna down and forward",
            "Hold the pinna straight out from the head without pulling"
          ],
          "ans": [
            1
          ],
          "why": "The ear assessment technique flips to <b>up and back after age 3</b>, and this child is 4. Down and back is the tempting answer because it is the technique for the younger child, and students often carry it across the whole pediatric age range.",
          "id": "nur235-m3-q11",
          "sourceNumber": 11
        },
        {
          "q": "A nurse admits a 5-year-old for a minor procedure and reviews the baseline vital signs. Which set of findings falls within the expected range for a child this age?",
          "type": "single",
          "opts": [
            "Heart rate 132, respiratory rate 28",
            "Heart rate 110, respiratory rate 32",
            "Heart rate 62, respiratory rate 16",
            "Heart rate 96, respiratory rate 22"
          ],
          "ans": [
            3
          ],
          "why": "The preschooler range is <b>HR 70-120 and RR 20-25</b>, so 96 and 22 are both expected. A heart rate of 132 with a respiratory rate of 28 is the trap: those numbers sit inside the toddler ranges (HR 80-140, RR 25-30) and look normal to a student who has not separated the two age groups.",
          "id": "nur235-m3-q12",
          "sourceNumber": 12
        },
        {
          "q": "A nurse performs developmental screening on a 24-month-old at a well-child visit. Which findings are expected for this age? Select all that apply.",
          "type": "sata",
          "opts": [
            "Pedals a tricycle",
            "Runs and kicks a ball",
            "Jumps in place with both feet",
            "Feeds himself using a spoon",
            "Puts two words together into short phrases"
          ],
          "ans": [
            1,
            3,
            4
          ],
          "why": "At <b>24 months</b> the child runs and kicks a ball, uses a spoon, and speaks in 2-word phrases. Jumping with both feet and riding a tricycle are the tempting choices because they come only a little later, at about 2.5 years and 3 years, so a student who half-remembers the sequence pulls them forward.",
          "id": "nur235-m3-q14",
          "sourceNumber": 14
        },
        {
          "q": "A hospitalized 2-year-old screams and pushes the cup away at every medication time and keeps pulling at his IV dressing. Which nursing approaches are appropriate for this child? Select all that apply.",
          "type": "sata",
          "opts": [
            "Ask \"Will you take your medicine now?\" before each dose so he feels included",
            "Offer a choice between two acceptable options, such as \"Do you want the pink cup or the blue cup?\"",
            "Give a detailed explanation of how the medicine works and rely on it to gain his cooperation",
            "Keep his home routines and rituals in place around care times",
            "If he has a tantrum, keep him safe and ignore the behavior itself"
          ],
          "ans": [
            1,
            3,
            4
          ],
          "why": "A toddler's need is <b>control</b>, met by limited choices, preserved routines, and ignoring tantrum behavior while keeping the child safe, since attention reinforces it. An open question like \"Will you take your medicine?\" sounds respectful but hands a negativistic toddler the word \"no,\" and a detailed explanation is what a preschooler needs, not a 2-year-old.",
          "id": "nur235-m3-q15",
          "sourceNumber": 15
        },
        {
          "q": "The nurse is teaching the parent of a 4-year-old preschooler about promoting healthy sleep. Which statement by the parent indicates an appropriate intervention?",
          "type": "single",
          "opts": [
            "I will allow my child to watch cartoons in bed until they fall asleep.",
            "I will encourage a consistent bedtime routine with reading before bed.",
            "I will let my child decide their bedtime since they need independence.",
            "I will offer my child an energy drink in the afternoon to help them stay active."
          ],
          "ans": [
            1
          ],
          "why": "<b>Preschoolers benefit from a consistent bedtime routine such as quiet reading</b>, which fosters security and good sleep hygiene. Screen time before bed disturbs sleep, parents should structure the sleep schedule, and caffeinated energy drinks are unsafe for children.",
          "topic": "Preschooler sleep hygiene",
          "src": "LSC exam prep recording (Dr Hansen), Exam 1",
          "id": "nur235-m3-q17",
          "sourceNumber": 17
        },
        {
          "q": "A nurse is providing teaching to the parents of a 4-year-old child about fine motor development. Which of the following tasks should the nurse include in the teaching as an expected finding for this age group?",
          "type": "single",
          "opts": [
            "Copies a circle",
            "Cuts foods using a table knife",
            "Begins writing in cursive",
            "Prints first and last name clearly"
          ],
          "ans": [
            0
          ],
          "why": "<b>Copying a circle</b> is the only one a 4-year-old can do. It is a <b>3-year</b> skill, and that is the trap &mdash; the question asks for an <b>expected finding</b>, not the newest skill, and children do not lose skills. The shape ladder is <b>circle at 3, square at 4, triangle at 5</b>, diamond around 6&ndash;7. Everything else here comes later: <b>printing first and last name</b> is about <b>5</b>, <b>cutting food with a table knife</b> is about <b>6&ndash;7</b> (spreading with a knife comes first, at 5), and <b>cursive</b> is about <b>8</b>. Work by elimination &mdash; rule out anything that comes after the age in the stem, and what is left is the answer.",
          "id": "nur235-m3-q18",
          "sourceNumber": 18
        },
        {
          "q": "A nurse in the emergency department is caring for a 12-year-old child who has ingested bleach. Which of the following statements by the nurse indicates an understanding of this ingestion?",
          "type": "single",
          "opts": [
            "\"Injury by a corrosive liquid is more extensive than by a corrosive solid.\"",
            "\"The absence of oral burns excludes the possibility of esophageal burns.\"",
            "\"Treatment focuses on neutralization of the chemical.\"",
            "\"Immediate administration of activated charcoal is warranted.\""
          ],
          "ans": [
            0
          ],
          "why": "A <b>liquid</b> corrosive does not stick, so more is swallowed and it <b>coats</b> as it goes &mdash; larger area of contact, more extensive esophageal and often gastric injury. A <b>solid or granule</b> adheres to the mouth and upper esophagus, which hurts at once and tends to limit how much goes down. The other three are the classic traps: a <b>clean mouth proves nothing</b>, because oral and pharyngeal burns do not reliably accompany esophageal ones &mdash; children who looked fine have had severe injury on endoscopy. <b>Neutralizing is never done</b>: a weak acid on an alkali is an <b>exothermic</b> reaction, adding a thermal burn to the chemical one. And <b>activated charcoal is contraindicated</b> for corrosives &mdash; it does not bind them and it coats the mucosa so the damage cannot be seen on endoscopy. Airway first, keep them NPO, endoscopy stages the burn.",
          "id": "nur235-m3-q19",
          "sourceNumber": 19
        }
      ]
    },
    {
      "id": "nur258-m1",
      "course": "NUR 258",
      "module": 1,
      "topic": "Sensory Disorders — Eye & Ear",
      "title": "Vision & Hearing Detective",
      "icon": "👁️",
      "tagline": "Identify the pattern, protect the senses and catch urgent clues.",
      "robot": {
        "src": "rustic-jordan.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur258-m1.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "Panel A masks the periphery; B masks the center; C is hazy; D shows a dark curtain over part of the scene. Simplified visual-field teaching patterns.",
      "path": "nur258-module-01-sensory-eye-ear.html",
      "source": "../nur258-module-01-sensory-eye-ear.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur258-m1-p01",
          "category": "Glaucoma",
          "prompt": "Gradual, painless loss of peripheral vision",
          "answer": "Open-angle glaucoma"
        },
        {
          "id": "nur258-m1-p02",
          "category": "Emergency",
          "prompt": "Sudden severe eye pain with halos and vomiting",
          "answer": "Acute angle-closure glaucoma"
        },
        {
          "id": "nur258-m1-p03",
          "category": "Emergency",
          "prompt": "Painless flashes, floaters and a curtain across vision",
          "answer": "Retinal detachment"
        },
        {
          "id": "nur258-m1-p04",
          "category": "Lens",
          "prompt": "Gradual cloudy vision and glare from a clouded lens",
          "answer": "Cataract"
        },
        {
          "id": "nur258-m1-p05",
          "category": "Retina",
          "prompt": "Disorder associated with loss of central vision",
          "answer": "Macular degeneration"
        },
        {
          "id": "nur258-m1-p06",
          "category": "Monitoring",
          "prompt": "Home grid used to notice new wavy lines",
          "answer": "Amsler grid"
        },
        {
          "id": "nur258-m1-p07",
          "category": "Testing",
          "prompt": "Measurement of intraocular pressure",
          "answer": "Tonometry"
        },
        {
          "id": "nur258-m1-p08",
          "category": "Testing",
          "prompt": "Formal visual-field testing",
          "answer": "Perimetry"
        },
        {
          "id": "nur258-m1-p09",
          "category": "Medication",
          "prompt": "Ophthalmic beta blocker that can affect pulse and blood pressure",
          "answer": "Timolol"
        },
        {
          "id": "nur258-m1-p10",
          "category": "Medication",
          "prompt": "Technique that reduces systemic absorption of eye drops",
          "answer": "Punctal occlusion at the inner canthus"
        },
        {
          "id": "nur258-m1-p11",
          "category": "Eye drops",
          "prompt": "Target location for an eye drop",
          "answer": "Conjunctival sac"
        },
        {
          "id": "nur258-m1-p12",
          "category": "Eye drops",
          "prompt": "Why different drops are spaced apart",
          "answer": "To avoid washing the first medication away"
        },
        {
          "id": "nur258-m1-p13",
          "category": "Eye drops",
          "prompt": "What contaminates an eye-drop tip",
          "answer": "Touching the lashes or eye"
        },
        {
          "id": "nur258-m1-p14",
          "category": "Medication",
          "prompt": "Drug class requiring caution with angle-closure glaucoma",
          "answer": "Anticholinergics"
        },
        {
          "id": "nur258-m1-p15",
          "category": "Hearing",
          "prompt": "Hearing loss from blocked sound transmission",
          "answer": "Conductive hearing loss"
        },
        {
          "id": "nur258-m1-p16",
          "category": "Hearing",
          "prompt": "Hearing loss from hair-cell or nerve damage",
          "answer": "Sensorineural hearing loss"
        },
        {
          "id": "nur258-m1-p17",
          "category": "Hearing",
          "prompt": "Age-related hearing loss",
          "answer": "Presbycusis"
        },
        {
          "id": "nur258-m1-p18",
          "category": "Hearing",
          "prompt": "Ringing or other sound without an external source",
          "answer": "Tinnitus"
        },
        {
          "id": "nur258-m1-p19",
          "category": "Balance",
          "prompt": "Sensation of spinning",
          "answer": "Vertigo"
        },
        {
          "id": "nur258-m1-p20",
          "category": "Inner ear",
          "prompt": "Vertigo, tinnitus and fluctuating hearing loss together",
          "answer": "Ménière's disease"
        },
        {
          "id": "nur258-m1-p21",
          "category": "Safety",
          "prompt": "Immediate concern during an acute vertigo episode",
          "answer": "Fall prevention"
        },
        {
          "id": "nur258-m1-p22",
          "category": "Medication",
          "prompt": "Aminoglycoside and loop-diuretic pair linked to ototoxicity",
          "answer": "Gentamicin and furosemide"
        },
        {
          "id": "nur258-m1-p23",
          "category": "Outer ear",
          "prompt": "Ear condition with pain on tragus or pinna movement",
          "answer": "Otitis externa"
        },
        {
          "id": "nur258-m1-p24",
          "category": "Communication",
          "prompt": "Helpful approach when a sentence is not understood",
          "answer": "Face the client, reduce noise and rephrase"
        }
      ],
      "cases": [
        {
          "q": "Four clients arrive in the eye clinic. Which does the nurse see first?",
          "type": "single",
          "opts": [
            "A client with gradual painless loss of side vision over 2 years",
            "A client with sudden severe eye pain, halos, vomiting, a fixed dilated pupil and a hazy cornea",
            "A client with a clouded lens and worsening night glare",
            "A client with wavy lines on an Amsler grid at home"
          ],
          "ans": [
            1
          ],
          "why": "Acute closed-angle glaucoma presents as fixed dilated pupil, hazy cornea and pain with vomiting, and it is a <b>surgical emergency</b> - pressure must come down or vision is lost. The gradual painless peripheral loss is chronic open-angle glaucoma: serious, but managed with lifelong drops, not tonight.",
          "id": "nur258-m1-q01",
          "sourceNumber": 1
        },
        {
          "q": "A client with labyrinthitis has vomited 4 times in 3 hours and is dizzy. Which assessment is the priority?",
          "type": "single",
          "opts": [
            "Fluid and electrolyte status",
            "Effectiveness of the vestibular suppressant",
            "Tympanic membrane appearance",
            "Ability to ambulate to the bathroom"
          ],
          "ans": [
            0
          ],
          "why": "Once vomiting is repetitive the problem stops being vestibular and becomes volume: <b>fluid and electrolyte assessment is the priority</b>. Reaching for meclizine treats the dizziness the client came in with, not the dehydration she has developed since.",
          "id": "nur258-m1-q02",
          "sourceNumber": 2
        },
        {
          "q": "A client is prescribed two different ophthalmic drops in the same eye. Which instruction is correct?",
          "type": "single",
          "opts": [
            "Instill both drops back to back, then blink several times",
            "Wait 5 to 10 minutes between the two drops and press the inner canthus for 2 minutes",
            "Wait 30 seconds between drops and wipe the eye from outer to inner canthus",
            "Wait 30 minutes between drops and keep the eye closed for 10 minutes"
          ],
          "ans": [
            1
          ],
          "why": "Different drops need <b>5 to 10 minutes</b> apart so the first is not washed out, and occluding the inner canthus for <b>2 minutes</b> blocks systemic absorption through the nasolacrimal duct. Back-to-back instillation simply flushes the first drug away.",
          "id": "nur258-m1-q03",
          "sourceNumber": 3
        },
        {
          "q": "Which findings are risk factors for glaucoma? Select all that apply.",
          "type": "sata",
          "opts": [
            "Long-term corticosteroid use",
            "Wearing corrective lenses",
            "Thin central cornea",
            "Daily vitamin A supplement",
            "High myopia"
          ],
          "ans": [
            0,
            2,
            4
          ],
          "why": "The risk list is family history, age over 60, diabetes, hypertension, <b>corticosteroid use, thin central cornea and high myopia</b>. Corrective lenses, vitamin A and sunglasses were named explicitly as non-risks - refraction and nutrition do not raise intraocular pressure.",
          "id": "nur258-m1-q04",
          "sourceNumber": 4
        },
        {
          "q": "A client is receiving IV gentamicin along with scheduled furosemide. What is the nurse's priority action?",
          "type": "single",
          "opts": [
            "Increase oral fluid intake to protect the kidneys",
            "Monitor for early hearing loss and report it so the dose can be adjusted",
            "Teach the client to avoid loud environments during therapy",
            "Request that the furosemide be given at bedtime"
          ],
          "ans": [
            1
          ],
          "why": "Aminoglycoside plus loop diuretic is the ototoxic pairing to memorize, and the priority is to <b>detect early hearing loss and report it so the dose can change</b>. Pushing fluids and avoiding noise sound protective but do nothing about drug-induced cochlear damage.",
          "id": "nur258-m1-q05",
          "sourceNumber": 5
        },
        {
          "q": "A client reports a painless curtain moving across her visual field that started this morning. A new nurse offers her a routine appointment next week. How should the nurse respond?",
          "type": "single",
          "opts": [
            "Agree, since painless vision changes are not urgent",
            "Arrange immediate evaluation; retinal detachment is an emergency despite being painless",
            "Instruct her to patch the eye and rest at home for 24 hours",
            "Tell her this is expected with cataract formation"
          ],
          "ans": [
            1
          ],
          "why": "A painless curtain across the vision is <b>retinal detachment - an emergency</b>, and it is the one eye condition that may require face-down (prone) positioning for about 2 weeks post-op. The trap is equating absence of pain with absence of urgency.",
          "id": "nur258-m1-q06",
          "sourceNumber": 6
        },
        {
          "type": "sata",
          "week": "1",
          "step": "action",
          "topic": "Sensory Disorders - Eye & Ear",
          "q": "A client with Meniere's disease is having an acute attack of vertigo with nausea and nystagmus. Which actions should the nurse take right now? (Select all that apply.)",
          "opts": [
            "Dim the lights and lower the noise level in the room.",
            "Raise the side rails and keep the client in bed until the attack passes.",
            "Walk the client to the bathroom now so the client does not become incontinent.",
            "Give the prescribed meclizine and antiemetic.",
            "Offer strong coffee to help the client stay alert.",
            "Coach the client to turn the head slowly and avoid sudden position changes."
          ],
          "ans": [
            0,
            1,
            3,
            5
          ],
          "why": "During an attack the nurse controls the environment and prevents falls, so dim quiet surroundings, raised rails, bed rest, and slow head movement are the immediate actions. Meclizine settles the vestibular symptoms and an antiemetic treats the vomiting. Walking a client who has active vertigo and nystagmus is how falls happen, so elimination needs are met at the bedside. Caffeine is a trigger that worsens inner-ear symptoms rather than helping.",
          "src": "ATI ch 14 Middle and Inner Ear Disorders",
          "icon": "👁️",
          "topicFull": "Sensory Disorders - Eye & Ear",
          "pharm": 1,
          "id": "nur258-m1-q07",
          "sourceNumber": 7
        },
        {
          "q": "A client is scheduled for cataract surgery on the right eye. Which statement by the client tells the nurse the teaching was understood?",
          "type": "single",
          "opts": [
            "\"I will bend at the waist to pick things up so I do not strain my back.\"",
            "\"I will avoid lifting anything heavier than about 10 pounds and will not strain on the toilet.\"",
            "\"I should expect sharp pain in the eye for the first two days.\"",
            "\"I can sleep on my right side as long as I use a soft pillow.\""
          ],
          "ans": [
            1
          ],
          "why": "Everything after cataract surgery is about <b>keeping intraocular pressure down</b>: no heavy lifting, no straining, no bending at the waist, and sleeping on the <b>unaffected</b> side. Bending and side-lying on the operative eye both raise pressure. <b>Sharp pain is never expected</b> - it suggests hemorrhage or increased pressure and must be reported at once.",
          "topic": "Sensory Disorders - Eye & Ear",
          "icon": "👁️",
          "topicFull": "Sensory Disorders - Eye & Ear",
          "id": "nur258-m1-q08",
          "sourceNumber": 8
        },
        {
          "q": "An older client with presbycusis is admitted. Which nursing actions support communication? Select all that apply.",
          "type": "sata",
          "opts": [
            "Face the client and make sure your mouth is visible",
            "Lower the pitch of your voice",
            "Shout to be sure you are heard",
            "Reduce background noise before starting",
            "Rephrase rather than simply repeating a sentence that was not understood"
          ],
          "ans": [
            0,
            1,
            3,
            4
          ],
          "why": "Presbycusis takes the <b>high frequencies first</b>, so lowering pitch helps and shouting does not - shouting raises pitch and distorts the face, destroying the lip-reading cues the client is relying on. Facing the client, cutting background noise and rephrasing all give the brain a second route to the meaning.",
          "topic": "Sensory Disorders - Eye & Ear",
          "icon": "👁️",
          "topicFull": "Sensory Disorders - Eye & Ear",
          "id": "nur258-m1-q10",
          "sourceNumber": 10
        },
        {
          "q": "A client reports vertigo, tinnitus, and a sense of fullness in one ear, with episodes lasting hours. Which instruction is the priority for safety?",
          "type": "single",
          "opts": [
            "Increase dietary sodium to maintain fluid balance",
            "Sit or lie down immediately when an attack begins and do not drive",
            "Perform vigorous head-turning exercises during an attack",
            "Irrigate the ear canal with warm water twice daily"
          ],
          "ans": [
            1
          ],
          "why": "Ménière's disease brings on vertigo without warning; the danger is <b>falling or crashing a car</b>, so the client stops moving and does not drive. Sodium is <b>restricted</b>, not increased, because it worsens endolymph volume. Head movement makes an attack worse, and irrigation has no role.",
          "topic": "Sensory Disorders - Eye & Ear",
          "icon": "👁️",
          "topicFull": "Sensory Disorders - Eye & Ear",
          "id": "nur258-m1-q11",
          "sourceNumber": 11
        },
        {
          "q": "Which findings in a client with open-angle glaucoma should the nurse expect? Select all that apply.",
          "type": "sata",
          "opts": [
            "Gradual loss of peripheral vision",
            "Sudden severe eye pain with vomiting",
            "Intraocular pressure above 21 mm Hg",
            "Increased cup-to-disc ratio on examination",
            "Central vision loss with straight lines appearing wavy"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "Open-angle glaucoma is the <b>silent</b> one: pressure creeps up, the optic disc cups, and <b>peripheral</b> vision goes first, which is why it is often found on a routine exam. Sudden pain with vomiting is <b>closed-angle</b> glaucoma, an emergency. Central loss with wavy lines is <b>macular degeneration</b>.",
          "topic": "Sensory Disorders - Eye & Ear",
          "icon": "👁️",
          "topicFull": "Sensory Disorders - Eye & Ear",
          "id": "nur258-m1-q12",
          "sourceNumber": 12
        },
        {
          "q": "A client with a history of closed-angle glaucoma is admitted for hip surgery. The pre-op orders include scopolamine for nausea. What is the nurse's priority action?",
          "type": "single",
          "opts": [
            "Hold the dose and contact the prescriber before it is given",
            "Give the dose and recheck the pupils in one hour",
            "Give the dose along with the client's beta-blocker eye drops",
            "Hold the dose only if the client begins to report eye pain"
          ],
          "ans": [
            0
          ],
          "why": "Scopolamine is an <b>anticholinergic</b>, and anticholinergics dilate the pupil, which jams the drainage angle shut and spikes the pressure, so they are contraindicated in closed-angle glaucoma. Waiting for eye pain is tempting but that pain <b>is</b> the acute attack, and the drops do not protect against a drug that is already dilating the pupil.",
          "id": "nur258-m1-q13",
          "sourceNumber": 13
        },
        {
          "q": "A client with macular degeneration calls the clinic and reports that the straight lines on her home Amsler grid look wavy today, though her side vision is unchanged. Which response by the nurse is best?",
          "type": "single",
          "opts": [
            "\"Come in to be evaluated - new wavy lines can mean wet macular degeneration, which is treated with anti-VEGF injections.\"",
            "\"That is expected as central vision fades; keep checking the grid and call in a month.\"",
            "\"Stop using the grid; it only screens for rising eye pressure.\"",
            "\"Your peripheral vision is intact, so no follow-up is needed right now.\""
          ],
          "ans": [
            0
          ],
          "why": "The whole point of the home Amsler grid is that <b>wavy lines</b> catch a change early, and wet macular degeneration is treated with anti-VEGF injections. Calling the change expected is tempting because macular degeneration does take central vision, but intact peripheral vision is the normal pattern of this disease and is not a reason to delay evaluation.",
          "id": "nur258-m1-q15",
          "sourceNumber": 15
        },
        {
          "q": "A 78-year-old client is admitted after finishing a long course of IV gentamicin. He worked 30 years in a factory without hearing protection and also has impacted cerumen and a history of otosclerosis. Which factors put him at risk for permanent hearing loss? Select all that apply.",
          "type": "sata",
          "opts": [
            "The prolonged course of gentamicin",
            "Thirty years of loud occupational noise",
            "His age of 78",
            "The impacted cerumen in the canal",
            "The history of otosclerosis"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Sensorineural loss damages the hair cells or nerve and is <b>usually permanent</b>; its causes are noise, age, and ototoxic drugs such as aminoglycosides like gentamicin. Cerumen and otosclerosis are tempting because they clearly affect hearing, but they are <b>conductive</b> problems - sound cannot get in - and conductive loss is often fixable.",
          "id": "nur258-m1-q18",
          "sourceNumber": 18
        }
      ]
    },
    {
      "id": "nur258-m2",
      "course": "NUR 258",
      "module": 2,
      "topic": "Infectious Diseases & HIV",
      "title": "Isolation Station",
      "icon": "🛡️",
      "tagline": "Choose the precautions and connect HIV enzymes with their jobs.",
      "robot": {
        "src": "rustic-jordan.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur258-m2.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "Airborne room with inward airflow and N95, a procedure mask for droplet precautions, a protective gown for contact precautions, and standard precautions for every client.",
      "path": "nur258-module-02-infectious-diseases-hiv.html",
      "source": "../nur258-module-02-infectious-diseases-hiv.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur258-m2-p01",
          "category": "Infection control",
          "prompt": "Precautions used for every client",
          "answer": "Standard precautions"
        },
        {
          "id": "nur258-m2-p02",
          "category": "Airborne",
          "prompt": "Room airflow used for suspected infectious pulmonary TB",
          "answer": "Negative pressure"
        },
        {
          "id": "nur258-m2-p03",
          "category": "Airborne",
          "prompt": "Respiratory protection worn by staff entering a TB room",
          "answer": "Fit-tested N95 or equivalent respirator"
        },
        {
          "id": "nur258-m2-p04",
          "category": "Transport",
          "prompt": "Mask worn by a TB client during necessary transport",
          "answer": "Surgical or procedure mask"
        },
        {
          "id": "nur258-m2-p05",
          "category": "Droplet",
          "prompt": "Transmission-based precaution associated with influenza",
          "answer": "Droplet precautions"
        },
        {
          "id": "nur258-m2-p06",
          "category": "Contact",
          "prompt": "Transmission-based precaution associated with C. difficile",
          "answer": "Contact precautions"
        },
        {
          "id": "nur258-m2-p07",
          "category": "C. difficile",
          "prompt": "Hand-cleaning method emphasized in this module",
          "answer": "Soap and water"
        },
        {
          "id": "nur258-m2-p08",
          "category": "C. difficile",
          "prompt": "Environmental cleaning approach directed at spores",
          "answer": "A sporicidal product such as an appropriate bleach solution"
        },
        {
          "id": "nur258-m2-p09",
          "category": "Devices",
          "prompt": "Strongest first prevention of device-related infection",
          "answer": "Avoid unnecessary device placement"
        },
        {
          "id": "nur258-m2-p10",
          "category": "Devices",
          "prompt": "Daily question to ask about an indwelling catheter or line",
          "answer": "Is this device still needed?"
        },
        {
          "id": "nur258-m2-p11",
          "category": "HIV",
          "prompt": "Immune cell primarily targeted by HIV",
          "answer": "CD4 T-helper cell"
        },
        {
          "id": "nur258-m2-p12",
          "category": "HIV",
          "prompt": "Laboratory measurement used to follow viral suppression",
          "answer": "Viral load"
        },
        {
          "id": "nur258-m2-p13",
          "category": "HIV",
          "prompt": "Laboratory count reflecting immune status",
          "answer": "CD4 count"
        },
        {
          "id": "nur258-m2-p14",
          "category": "Treatment",
          "prompt": "Combination medication treatment for HIV",
          "answer": "Antiretroviral therapy: ART"
        },
        {
          "id": "nur258-m2-p15",
          "category": "Treatment",
          "prompt": "A major consequence of inconsistent ART use",
          "answer": "Drug resistance and treatment failure"
        },
        {
          "id": "nur258-m2-p16",
          "category": "Exposure",
          "prompt": "First local action after a needlestick",
          "answer": "Wash the site with soap and water"
        },
        {
          "id": "nur258-m2-p17",
          "category": "Exposure",
          "prompt": "Medication prevention after a potential HIV exposure",
          "answer": "Post-exposure prophylaxis: PEP"
        },
        {
          "id": "nur258-m2-p18",
          "category": "Exposure",
          "prompt": "Latest routine start window for HIV PEP in this module",
          "answer": "Within 72 hours, as soon as possible"
        },
        {
          "id": "nur258-m2-p19",
          "category": "Exposure",
          "prompt": "Usual HIV PEP course duration",
          "answer": "28 days"
        },
        {
          "id": "nur258-m2-p20",
          "category": "HIV biology",
          "prompt": "Enzyme that converts viral RNA to DNA",
          "answer": "Reverse transcriptase"
        },
        {
          "id": "nur258-m2-p21",
          "category": "HIV biology",
          "prompt": "Enzyme that inserts viral DNA into host DNA",
          "answer": "Integrase"
        },
        {
          "id": "nur258-m2-p22",
          "category": "HIV biology",
          "prompt": "Enzyme that cuts viral proteins into working parts",
          "answer": "Protease"
        },
        {
          "id": "nur258-m2-p23",
          "category": "Medication",
          "prompt": "TB medicine that can turn body fluids orange-red",
          "answer": "Rifampin"
        },
        {
          "id": "nur258-m2-p24",
          "category": "Transmission",
          "prompt": "Examples that do not spread HIV",
          "answer": "Hugging and sharing utensils"
        }
      ],
      "cases": [
        {
          "q": "A nurse sustains a needlestick from a client who is HIV positive. What does the nurse do first?",
          "type": "single",
          "opts": [
            "Report the exposure to the charge nurse",
            "Wash the site with soap and water",
            "Draw a baseline HIV antibody test",
            "Begin post-exposure prophylaxis"
          ],
          "ans": [
            1
          ],
          "why": "The sequence taught is <b>wash with soap and water first</b>, then report, start PEP and draw baseline labs. Rushing to PEP feels more urgent, but the first act reduces the inoculum still on the skin.",
          "id": "nur258-m2-q01",
          "sourceNumber": 1
        },
        {
          "q": "Which action most effectively prevents both CLABSI and CAUTI?",
          "type": "single",
          "opts": [
            "Use full sterile technique at insertion",
            "Do not place the device unless it is truly necessary",
            "Change the dressing every 7 days",
            "Prefer the femoral site for central access"
          ],
          "ans": [
            1
          ],
          "why": "The single most effective action is <b>not placing the device at all unless it is necessary</b>; sterile insertion is the runner-up. Femoral lines infect far more than subclavian, so that option is wrong twice over.",
          "id": "nur258-m2-q02",
          "sourceNumber": 2
        },
        {
          "q": "A nurse is exposed to HIV and asks about prophylaxis timing. Which response is correct?",
          "type": "single",
          "opts": [
            "Start within 72 hours at the latest and continue for 28 days",
            "Start within 7 days and continue for 14 days",
            "Start only if the baseline test is positive, then continue for 6 weeks",
            "Start immediately and continue until the viral load is undetectable"
          ],
          "ans": [
            0
          ],
          "why": "PEP is started as soon as possible, ideally within hours, and <b>never beyond 72 hours</b>, then continued a full <b>28 days</b>. Waiting for a baseline result wastes the window - the baseline draw documents pre-exposure status, it does not gate treatment.",
          "id": "nur258-m2-q06",
          "sourceNumber": 6
        },
        {
          "type": "sata",
          "week": "2",
          "step": "solutions",
          "topic": "Infectious Diseases & HIV",
          "q": "A nurse is teaching a client who has HIV about ways to reduce the risk of opportunistic infection. Which statements by the client indicate a correct understanding of the teaching? (Select all that apply.)",
          "opts": [
            "“I will wash my hands frequently throughout the day.”",
            "“I will avoid changing my cat's litter box.”",
            "“I will stop my antiretroviral therapy once my viral load is undetectable.”",
            "“I will keep my influenza and pneumococcal vaccinations up to date.”",
            "“I will eat soft-cooked eggs and rare beef for extra protein.”",
            "“I will avoid crowds and people who are currently sick.”"
          ],
          "ans": [
            0,
            1,
            3,
            5
          ],
          "why": "Frequent hand hygiene, avoiding litter box duty (toxoplasmosis exposure), staying current on immunizations, and avoiding crowds and sick contacts all lower infection risk for a client with HIV. Antiretroviral therapy must be continued exactly as prescribed and never stopped, even when the viral load becomes undetectable, because stopping allows the virus to rebound and increases drug-resistance risk. Undercooked eggs and rare meat carry a foodborne-illness risk that an immunocompromised client should avoid, not seek out.",
          "src": "ATI Adult Med-Surg ch 86 (HIV/AIDS)",
          "icon": "🦠",
          "topicFull": "Infectious Diseases & HIV",
          "id": "nur258-m2-q07",
          "sourceNumber": 7
        },
        {
          "q": "Which statements about HIV transmission are accurate? Select all that apply.",
          "type": "sata",
          "opts": [
            "A client with a sustained undetectable viral load does not transmit HIV sexually",
            "HIV is transmitted by sharing drinking glasses",
            "Breast milk can transmit HIV",
            "Standard precautions are used for all clients regardless of HIV status",
            "A negative antibody test three weeks after exposure rules out infection"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "<b>Undetectable equals untransmittable</b> for sexual transmission - a central teaching point and a powerful reason for adherence. Breast milk does transmit. Standard precautions apply to everyone, which is exactly why they are called standard. HIV is <b>not</b> spread by casual contact, and a test at three weeks is inside the window period, so it rules out nothing.",
          "topic": "Infectious Diseases & HIV",
          "icon": "🦠",
          "topicFull": "Infectious Diseases & HIV",
          "id": "nur258-m2-q09",
          "sourceNumber": 9
        },
        {
          "q": "A nurse is caring for a client on airborne precautions for tuberculosis. Which actions are correct? Select all that apply.",
          "type": "sata",
          "opts": [
            "Place the client in a negative-pressure room",
            "Wear a fit-tested N95 respirator to enter",
            "Have the client wear a surgical mask when transported out of the room",
            "Wear a surgical mask instead of a respirator if the client is masked",
            "Keep the room door closed"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Airborne precautions are <b>negative pressure, door closed, N95 for staff</b>. The direction of the masks is the part people reverse: <b>staff wear the respirator, the client wears a surgical mask</b> when they must leave the room. A surgical mask does not protect the nurse from droplet nuclei.",
          "topic": "Infectious Diseases & HIV",
          "icon": "🦠",
          "topicFull": "Infectious Diseases & HIV",
          "card": "NG-364_tuberculosis-pharmacology.html",
          "cardLabel": "Tuberculosis — Pharmacology",
          "id": "nur258-m2-q10",
          "sourceNumber": 10
        },
        {
          "q": "A client taking rifampin for tuberculosis reports orange-red urine. What is the nurse's best response?",
          "type": "single",
          "opts": [
            "\"Stop the medication and come in to be seen today.\"",
            "\"This is expected with rifampin. It also stains soft contact lenses permanently.\"",
            "\"That suggests kidney damage; we will check your creatinine.\"",
            "\"Drink more water and the color will clear within a day.\""
          ],
          "ans": [
            1
          ],
          "why": "Orange-red discoloration of urine, sweat and tears is a <b>harmless, expected</b> rifampin effect - but it <b>permanently stains soft contact lenses</b>, which is the part clients are never told. What does need reporting on rifampin is hepatotoxicity: jaundice, dark urine with pale stools, right upper quadrant pain.",
          "pharm": 1,
          "topic": "Infectious Diseases & HIV",
          "icon": "🦠",
          "topicFull": "Infectious Diseases & HIV",
          "card": "NG-364_tuberculosis-pharmacology.html",
          "cardLabel": "Tuberculosis — Pharmacology",
          "id": "nur258-m2-q11",
          "sourceNumber": 11
        },
        {
          "q": "A client admitted with Clostridioides difficile has had profuse watery diarrhea for two days. Which problem does the nurse address first?",
          "type": "single",
          "opts": [
            "Dehydration",
            "Electrolyte imbalance",
            "Perianal skin breakdown",
            "Poor nutritional intake"
          ],
          "ans": [
            0
          ],
          "why": "In C. diff the priority problem is <b>dehydration</b>, and electrolytes come second. Electrolyte imbalance is tempting because it comes from the same fluid loss, but it is ranked after dehydration, and hydration is assessed before antibiotics are given.",
          "id": "nur258-m2-q12",
          "sourceNumber": 12
        },
        {
          "q": "A nurse is caring for a mechanically ventilated client and is reviewing the unit's ventilator-associated pneumonia prevention measures. Which intervention is correct?",
          "type": "single",
          "opts": [
            "Elevate the head of the bed at least 30 degrees",
            "Suction the airway every 2 hours on a set schedule",
            "Keep the client flat while the endotracheal tube is in place",
            "Limit oral care to once every 24 hours"
          ],
          "ans": [
            0
          ],
          "why": "VAP prevention is <b>head of bed at least 30 degrees</b>. Scheduled <b>q2h suctioning</b> is the classic wrong answer — it looks proactive, but routine suctioning traumatizes the trachea rather than preventing pneumonia.",
          "id": "nur258-m2-q13",
          "sourceNumber": 13
        },
        {
          "q": "A client with HIV has been taking antiretroviral therapy for three months and asks how the team will know the medication is working. Which laboratory value does the nurse identify?",
          "type": "single",
          "opts": [
            "Viral load",
            "White blood cell count",
            "Absolute neutrophil count",
            "CD4 count"
          ],
          "ans": [
            0
          ],
          "why": "<b>Viral load</b> is what tracks how well ART is working, and therapy lowers it. CD4 is the tempting choice because it is the monitoring lab for HIV itself and rises with treatment, but response to therapy is judged by viral load; WBC is not the HIV monitoring lab at all.",
          "id": "nur258-m2-q15",
          "sourceNumber": 15
        },
        {
          "q": "A client is admitted with Clostridioides difficile after a recent course of antibiotics. Which actions does the nurse take? Select all that apply.",
          "type": "sata",
          "opts": [
            "Perform hand hygiene with soap and water rather than an alcohol-based rub",
            "Clean the room and equipment with a bleach solution",
            "Initiate contact precautions in a private room",
            "Place the client in a negative-pressure room with the door closed",
            "Use an alcohol-based hand rub after removing gloves"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "C. diff calls for <b>soap and water</b>, <b>bleach</b> cleaning, and <b>contact precautions</b> in a private room, because alcohol gel does not kill C. diff spores. A negative-pressure room with the door closed belongs to airborne precautions (TB, measles, varicella); with contact precautions the door may stay open.",
          "id": "nur258-m2-q16",
          "sourceNumber": 16
        },
        {
          "q": "A nurse is caring for a client with a subclavian central line. Which actions reduce the client's risk of a central line-associated bloodstream infection? Select all that apply.",
          "type": "sata",
          "opts": [
            "Scrub the hub with friction for 15 seconds before every access",
            "Scrub the chlorhexidine prep for a full 2 minutes at each dressing change",
            "Change the transparent dressing every 7 days, or sooner if it is damp, loose or soiled",
            "Review the line every day and remove it as soon as it is no longer needed",
            "Avoid drawing blood from the central line, because drawing blood is what causes CLABSI",
            "Ask the provider for a femoral site instead of the subclavian site"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "<b>Scrub the hub 15 seconds</b> with friction, change the transparent dressing <b>every 7 days</b> (gauze every 2 days, either one sooner if damp, loose or soiled), and <b>pull the line the day it stops being needed</b> — that last one prevents more infections than any technique.<br><br><b>Why 2 minutes is wrong here:</b> the chlorhexidine–alcohol prep has two times, and the site decides which one. <b>Dry site</b> (chest, arm, abdomen — so a <b>subclavian</b> line) = <b>30 seconds</b> of back-and-forth friction. <b>Moist site</b> (groin, axilla — a <b>femoral</b> line) = <b>2 minutes</b>. Either way, let it <b>dry completely</b>; the drying is what kills, not the wiping. This client has a subclavian line, so 30 seconds.<br><br>Drawing blood from the line does not itself cause CLABSI — <b>poor technique at the hub</b> does. And femoral is the <b>highest</b>-infection site, not a request you would make.",
          "id": "nur258-m2-q17",
          "sourceNumber": 17
        }
      ]
    },
    {
      "id": "nur258-m3",
      "course": "NUR 258",
      "module": 3,
      "topic": "Allergic, Inflammatory & Immunologic Disorders",
      "title": "Immune Response Lab",
      "icon": "🧪",
      "tagline": "Decode ACID, recognize reactions and connect care with the mechanism.",
      "robot": {
        "src": "rustic-jordan.webp",
        "width": 760,
        "height": 760
      },
      "illustration": {
        "src": "nur258-m3.svg",
        "width": 730,
        "height": 530
      },
      "illustrationAlt": "A shows IgE and a mast cell releasing mediators; B shows antibodies targeting a cell; C shows complexes depositing in tissue; D shows a T-cell response.",
      "path": "nur258-module-03-allergic-inflammatory-immunologic.html",
      "source": "../nur258-module-03-allergic-inflammatory-immunologic.html",
      "reflective": false,
      "pairs": [
        {
          "id": "nur258-m3-p01",
          "category": "Hypersensitivity",
          "prompt": "Immediate allergy involving IgE and mast cells",
          "answer": "Type I"
        },
        {
          "id": "nur258-m3-p02",
          "category": "Hypersensitivity",
          "prompt": "Antibody reaction directed against a cell or tissue target",
          "answer": "Type II"
        },
        {
          "id": "nur258-m3-p03",
          "category": "Hypersensitivity",
          "prompt": "Deposited antigen–antibody complexes causing inflammation",
          "answer": "Type III"
        },
        {
          "id": "nur258-m3-p04",
          "category": "Hypersensitivity",
          "prompt": "Delayed reaction mediated by T cells",
          "answer": "Type IV"
        },
        {
          "id": "nur258-m3-p05",
          "category": "Memory cue",
          "prompt": "The four words represented by ACID",
          "answer": "Allergic, Cytotoxic, Immune complex, Delayed"
        },
        {
          "id": "nur258-m3-p06",
          "category": "Emergency",
          "prompt": "First-line medication for anaphylaxis",
          "answer": "Intramuscular epinephrine"
        },
        {
          "id": "nur258-m3-p07",
          "category": "Emergency",
          "prompt": "Hives plus lip or tongue swelling require this priority assessment",
          "answer": "Airway assessment"
        },
        {
          "id": "nur258-m3-p08",
          "category": "Infusion",
          "prompt": "Immediate action when the infusing drug is the suspected trigger",
          "answer": "Stop the offending infusion and summon help"
        },
        {
          "id": "nur258-m3-p09",
          "category": "Allergy history",
          "prompt": "What to ask before accepting an allergy label at face value",
          "answer": "What exactly happened with the medication?"
        },
        {
          "id": "nur258-m3-p10",
          "category": "Latex",
          "prompt": "Environmental precaution for a client with latex allergy",
          "answer": "Latex-free supplies throughout the stay"
        },
        {
          "id": "nur258-m3-p11",
          "category": "Latex",
          "prompt": "Fruit examples associated with latex cross-reactivity",
          "answer": "Banana, avocado and kiwi"
        },
        {
          "id": "nur258-m3-p12",
          "category": "SLE",
          "prompt": "Facial rash extending across the cheeks and nose",
          "answer": "Butterfly or malar rash"
        },
        {
          "id": "nur258-m3-p13",
          "category": "SLE",
          "prompt": "A common environmental trigger to reduce",
          "answer": "Sun and ultraviolet exposure"
        },
        {
          "id": "nur258-m3-p14",
          "category": "SLE",
          "prompt": "Kidney involvement caused by systemic lupus",
          "answer": "Lupus nephritis"
        },
        {
          "id": "nur258-m3-p15",
          "category": "SLE",
          "prompt": "Urine finding that can signal renal involvement",
          "answer": "Proteinuria"
        },
        {
          "id": "nur258-m3-p16",
          "category": "Rheumatoid arthritis",
          "prompt": "Typical joint distribution",
          "answer": "Symmetric involvement"
        },
        {
          "id": "nur258-m3-p17",
          "category": "Rheumatoid arthritis",
          "prompt": "Characteristic morning stiffness pattern",
          "answer": "Prolonged, often more than an hour"
        },
        {
          "id": "nur258-m3-p18",
          "category": "Medication safety",
          "prompt": "Methotrexate schedule used for rheumatoid arthritis",
          "answer": "Weekly, not daily"
        },
        {
          "id": "nur258-m3-p19",
          "category": "Medication safety",
          "prompt": "Supplement often prescribed with methotrexate",
          "answer": "Folic acid"
        },
        {
          "id": "nur258-m3-p20",
          "category": "Gout",
          "prompt": "Long-term medication that lowers uric acid",
          "answer": "Allopurinol"
        },
        {
          "id": "nur258-m3-p21",
          "category": "Gout",
          "prompt": "A medication used for acute gout inflammation",
          "answer": "Colchicine"
        },
        {
          "id": "nur258-m3-p22",
          "category": "Raynaud's",
          "prompt": "Classic color sequence during an episode",
          "answer": "White, blue, then red"
        },
        {
          "id": "nur258-m3-p23",
          "category": "Raynaud's",
          "prompt": "An exposure that can trigger vasospasm",
          "answer": "Cold"
        },
        {
          "id": "nur258-m3-p24",
          "category": "Fibromyalgia",
          "prompt": "Core non-drug measures for widespread pain and poor sleep",
          "answer": "Low-impact exercise and sleep hygiene"
        }
      ],
      "cases": [
        {
          "q": "Ten minutes into an IV infusion a client reports itching and dizziness. BP is 86/52, HR 118, RR 24. What does the nurse do first?",
          "type": "single",
          "opts": [
            "Stop the infusion",
            "Obtain a set of vital signs and recheck in 5 minutes",
            "Administer the prescribed antihistamine",
            "Place the client in Trendelenburg"
          ],
          "ans": [
            0
          ],
          "why": "This is type I (IgE-mediated) hypersensitivity, and the first action is to <b>stop the offending infusion</b> before any drug is given. Reaching for diphenhydramine while the antigen keeps running lets the reaction progress to anaphylaxis.",
          "id": "nur258-m3-q01",
          "sourceNumber": 1
        },
        {
          "q": "A client's chart lists a penicillin allergy. What does the nurse do first before the prescribed antibiotic is given?",
          "type": "single",
          "opts": [
            "Hold the dose and document the allergy",
            "Ask the client to describe exactly what happened when she took penicillin",
            "Notify the provider that the client is allergic",
            "Give the dose slowly with epinephrine at the bedside"
          ],
          "ans": [
            1
          ],
          "why": "First <b>clarify what actually happened</b> - many reported allergies are GI upset, not immune reactions. If the answer is rash, itching or swelling, then notify the provider before giving the drug.",
          "id": "nur258-m3-q02",
          "sourceNumber": 2
        },
        {
          "q": "Which findings support a type I hypersensitivity reaction? Select all that apply.",
          "type": "sata",
          "opts": [
            "Blood pressure 86/52",
            "Temperature 37.3 C",
            "Heart rate 118",
            "Generalized itching",
            "Oxygen saturation 96 percent on room air"
          ],
          "ans": [
            0,
            2,
            3
          ],
          "why": "The cues scored as relevant were <b>hypotension, tachycardia, itching, dizziness, diarrhea and RR 24</b>, and about 90 percent of anaphylaxis includes urticaria or rash. Temp 37.3 and SpO2 96 percent are inside normal limits and were scored as not indicative - normal values are distractors.",
          "id": "nur258-m3-q04",
          "sourceNumber": 4
        },
        {
          "q": "A client has widespread pain, fatigue and poor sleep. ESR, CRP and ANA are all normal. Which condition does this pattern support?",
          "type": "single",
          "opts": [
            "Rheumatoid arthritis",
            "Systemic lupus erythematosus",
            "Fibromyalgia",
            "Serum sickness"
          ],
          "ans": [
            2
          ],
          "why": "<b>Fibromyalgia is not inflammatory, so ESR, CRP and ANA are normal</b> - that is the fastest way to separate it from RA and lupus, which show abnormal labs. Management is low-impact exercise, sleep hygiene and duloxetine, pregabalin or milnacipran, not opioids.",
          "id": "nur258-m3-q06",
          "sourceNumber": 6
        },
        {
          "q": "A client is having an anaphylactic reaction. Which action does the nurse take first?",
          "type": "single",
          "opts": [
            "Administer intramuscular epinephrine",
            "Start an IV of normal saline",
            "Administer IV diphenhydramine",
            "Obtain a set of vital signs"
          ],
          "ans": [
            0
          ],
          "why": "<b>Epinephrine first, intramuscular, into the vastus lateralis</b> - it is the only drug that reverses the airway and vascular collapse. Antihistamines and steroids are adjuncts that work far too slowly to save the airway, and stopping to take vital signs delays the one thing that matters.",
          "pharm": 1,
          "topic": "Allergic, Inflammatory…",
          "icon": "🦠",
          "topicFull": "Allergic, Inflammatory & Immunologic Disorders",
          "id": "nur258-m3-q07",
          "sourceNumber": 7
        },
        {
          "q": "Which findings suggest a systemic lupus erythematosus flare rather than stable disease? Select all that apply.",
          "type": "sata",
          "opts": [
            "New proteinuria",
            "Butterfly rash worsening after a beach day",
            "Weight loss with fever",
            "Blood pressure 118/74 mm Hg",
            "New joint pain and swelling"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "A flare shows as <b>new organ involvement</b> - proteinuria means lupus nephritis, the complication that decides prognosis - plus fever, weight loss, worsening rash and arthritis. <b>Sun exposure is a classic trigger</b>, which is why sunscreen is a daily prescription, not a comfort measure. A normal blood pressure is reassuring, not a flare sign.",
          "topic": "Allergic, Inflammatory…",
          "icon": "🦠",
          "topicFull": "Allergic, Inflammatory & Immunologic Disorders",
          "id": "nur258-m3-q08",
          "sourceNumber": 8
        },
        {
          "q": "A client with rheumatoid arthritis asks how it differs from osteoarthritis. Which features belong to rheumatoid arthritis? Select all that apply.",
          "type": "sata",
          "opts": [
            "Symmetric joint involvement",
            "Morning stiffness lasting more than an hour",
            "Fatigue, low-grade fever and weight loss",
            "Pain that worsens through the day with use",
            "Heberden's nodes at the distal finger joints"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Rheumatoid arthritis is a <b>systemic autoimmune</b> disease: symmetric, prolonged morning stiffness, and whole-body symptoms. Osteoarthritis is <b>mechanical wear</b>: asymmetric, worse with use through the day, brief stiffness, and <b>Heberden's nodes</b> at the distal joints. Getting this pair straight answers a large number of exam items.",
          "topic": "Allergic, Inflammatory…",
          "icon": "🦠",
          "topicFull": "Allergic, Inflammatory & Immunologic Disorders",
          "card": "musc/NG-163_rheumatoid-arthritis.html",
          "cardLabel": "Rheumatoid Arthritis",
          "id": "nur258-m3-q09",
          "sourceNumber": 9
        },
        {
          "q": "A client starting methotrexate for rheumatoid arthritis needs teaching. Which instructions are correct? Select all that apply.",
          "type": "sata",
          "opts": [
            "Take folic acid as prescribed",
            "Avoid alcohol",
            "Report sore throat, mouth ulcers or unusual bruising",
            "Take the dose every day at bedtime",
            "Use reliable contraception"
          ],
          "ans": [
            0,
            1,
            2,
            4
          ],
          "why": "Methotrexate for arthritis is <b>weekly, not daily</b> - a daily dose is a well-documented fatal medication error. Folic acid reduces the side effects, alcohol compounds the liver toxicity, sore throat and ulcers signal bone-marrow suppression, and the drug is <b>teratogenic</b>.",
          "pharm": 1,
          "topic": "Allergic, Inflammatory…",
          "icon": "🦠",
          "topicFull": "Allergic, Inflammatory & Immunologic Disorders",
          "card": "musc/NG-163_rheumatoid-arthritis.html",
          "cardLabel": "Rheumatoid Arthritis",
          "id": "nur258-m3-q10",
          "sourceNumber": 10
        },
        {
          "q": "A client admitted with widespread hives that appeared shortly after a meal tells the nurse it is \"just a rash.\" Which action does the nurse take first?",
          "type": "single",
          "opts": [
            "Inspect the lips, tongue and airway",
            "Apply a cool compress to the hives",
            "Give the ordered oral antihistamine",
            "Document the size and location of the hives"
          ],
          "ans": [
            0
          ],
          "why": "Urticaria can be the <b>opening act of anaphylaxis</b>, so the lips, tongue and airway are assessed before the rash is called minor. The ordered antihistamine is the tempting choice, but antihistamines never rescue an airway and giving it first delays finding swelling.",
          "id": "nur258-m3-q11",
          "sourceNumber": 11
        },
        {
          "q": "A client with systemic lupus erythematosus is seen for a follow-up visit. Which finding does the nurse report to the provider first?",
          "type": "single",
          "opts": [
            "Butterfly rash across the cheeks and nose",
            "Rising BUN and creatinine with BP 160/98 and dark frothy urine",
            "Fatigue and joint pain between flares",
            "Skin that reddens quickly after an hour of gardening"
          ],
          "ans": [
            1
          ],
          "why": "Rising BUN and creatinine with hypertension and dark frothy urine point to <b>lupus nephritis</b>, the complication that determines survival. The butterfly rash is the tempting pick because it looks dramatic, but it is an expected finding in lupus and calls for sun-protection teaching, not an urgent report.",
          "id": "nur258-m3-q13",
          "sourceNumber": 13
        },
        {
          "q": "A client admitted with Raynaud's phenomenon is being taught how to limit attacks. Which statement shows correct understanding?",
          "type": "single",
          "opts": [
            "My fingers will turn red first, then blue, then white",
            "Heat brings these attacks on, so I will avoid hot water",
            "I will wear gloves in cold places, including the freezer aisle at the store",
            "When an attack starts I should run cold water over my hands"
          ],
          "ans": [
            2
          ],
          "why": "Cold triggers the vasospasm, so gloves belong in any cold environment, including the freezer aisle. The color-sequence option is tempting because the three colors are right, but the order is reversed: it is <b>white, then blue, then red</b>.",
          "id": "nur258-m3-q14",
          "sourceNumber": 14
        },
        {
          "q": "A client admitted for surgery reports a latex allergy. Which statements does the nurse include in teaching? Select all that apply.",
          "type": "sata",
          "opts": [
            "Latex-free supplies will be used for your whole stay, not only in the operating room",
            "Tell us if bananas, avocados, kiwi or chestnuts have ever made you itch or swell",
            "Report itching, or any swelling of your lips or tongue, right away",
            "These precautions can stop once you are back in your room after surgery",
            "An antihistamine before contact makes latex exposure safe for you"
          ],
          "ans": [
            0,
            1,
            2
          ],
          "why": "Latex allergy calls for a <b>latex-free environment for the entire stay</b>, and latex cross-reacts with banana, avocado, kiwi and chestnut, so those foods are worth asking about. Limiting precautions to the procedure is the tempting error, and premedicating does not make exposure safe — antihistamines never rescue an airway.",
          "id": "nur258-m3-q16",
          "sourceNumber": 16
        }
      ]
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
