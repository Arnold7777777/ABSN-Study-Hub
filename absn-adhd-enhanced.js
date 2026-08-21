(function(){
  'use strict';

  var file=decodeURIComponent((location.pathname.split('/').pop()||'index.html')).toLowerCase();
  var excluded={
    'leadership-community-ethics.html':1,
    'leadership-community-ethics.before-3d-illustrations.html':1,
    'game-pharmacology-review.html':1
  };
  if(excluded[file]) return;

  function familyFor(name){
    if(name==='index.html') return 'index';
    if(/^m\d+\.html$/.test(name)) return 'module';
    if(/^exam\d+\.html$/.test(name)||name==='final.html') return 'exam';
    if(/^nur(234|235|258)-m\d+\.html$/.test(name)) return 'coursemod';
    if(/^nur(234|235|258)\.html$/.test(name)) return 'course';
    if(/-quiz\.html$/.test(name)||name==='super-mega-quiz.html'||name==='pharmacology-new.html') return 'quiz';
    if(name.indexOf('podcast')>-1) return 'podcast';
    if(name==='pharmacology.html'||name==='physiology.html') return 'guide';
    return 'general';
  }

  var family=familyFor(file);
  document.body.classList.add('adhd-upgraded');
  document.body.setAttribute('data-adhd-family',family);

  function element(tag,className,text){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(text!==undefined) node.textContent=text;
    return node;
  }
  function count(selector){return document.querySelectorAll(selector).length;}
  function plural(number,singular,pluralWord){return number+' '+(number===1?singular:(pluralWord||singular+'s'));}

  var configs={
    index:{
      image:'absn-hub-robot-team.webp',alt:'Friendly nurse robots organize pharmacology, maternal-newborn, pediatric, adult-health, leadership, podcast, and quiz learning stations.',
      kicker:'Your whole program · one calm pathway',title:'Choose one small win',
      lede:'Use the hub as a menu, not a mountain. Pick the way you want to study right now, then stop when that small goal is finished.',
      path:[['Choose','one course or topic'],['Learn','one short section'],['Retrieve','answer from memory'],['Reset','pause, then return']]
    },
    module:{
      image:'absn-pharm-robot-path.webp',alt:'Pharmacist nurse robot teaches medication movement, metabolism, excretion, effectiveness, and adverse-effect safety.',
      kicker:'Medication study buddy',title:'Mechanism → clue → safe action',
      lede:'Each dense card is now a separate focus bite. Predict the answer, open the card, and finish with the safety rule.',
      path:[['Mechanism','what the drug changes'],['Clue','assessment or laboratory pattern'],['Action','dose, timing, or intervention'],['Safety','adverse effect and teaching']]
    },
    exam:{
      image:'absn-pharm-robot-path.webp',alt:'Pharmacist nurse robot teaches medication movement, metabolism, excretion, effectiveness, and adverse-effect safety.',
      kicker:'Exam review buddy',title:'Recall before you reveal',
      lede:'Work one card at a time. Say the mechanism and priority aloud before opening the explanation, then compare your answer.',
      path:[['Predict','answer from memory'],['Reveal','open one card'],['Connect','link clue to mechanism'],['Protect','name the safety rule']]
    },
    course:{
      image:'absn-clinical-robot-team.webp',alt:'Nurse robots connect maternal-newborn, pediatric, and adult-health clinical learning with a shared safety pathway.',
      kicker:'Clinical course navigator',title:'One module. One chunk. One patient priority.',
      lede:'These books already contain small learning chunks. The new focus and roomy-text tools help you stay inside one idea without losing the course structure.',
      path:[['Orient','choose the exam and module'],['Notice','assessment and trend'],['Prioritize','first nursing action'],['Recheck','response and teaching']]
    },
    coursemod:{
      image:'absn-clinical-robot-team.webp',alt:'Nurse robots connect maternal-newborn, pediatric, and adult-health clinical learning with a shared safety pathway.',
      kicker:'One week, one page',title:'Everything for this module, and nothing from any other.',
      lede:'This is a single week on its own page, so there is room for the whole story: the brief, the chunks, the diagrams, the templates and the questions. When you are done here, the arrow at the bottom takes you to the next week.',
      path:[['Read the brief','the one idea first'],['Open one chunk','stay inside it'],['Study the visual','picture before words'],['Answer the questions','then check why']]
    },
    quiz:{
      image:'absn-quiz-podcast-robots.webp',alt:'Two nurse robots use a calm podcast station and a colorful quiz station connected by a focus-and-break timer.',
      kicker:'Low-stress retrieval practice',title:'Set up a quiz you can actually finish',
      lede:'Choose a narrow topic, a question style, and a realistic count. Check the rationale before moving on; the goal is learning, not speed.',
      path:[['Scope','pick course or topic'],['Style','choose question format'],['Count','set a small session'],['Review','read every rationale']]
    },
    podcast:{
      image:'absn-quiz-podcast-robots.webp',alt:'Two nurse robots use a calm podcast station and a colorful quiz station connected by a focus-and-break timer.',
      kicker:'Listen with a purpose',title:'One episode, one takeaway',
      lede:'Choose one topic, listen for the main pattern, then pause and say the priority point in your own words before starting another episode.',
      path:[['Choose','one episode'],['Listen','for the main pattern'],['Pause','say it in your own words'],['Recall','name one priority action']]
    },
    resource:{
      image:'absn-pharm-robot-path.webp',alt:'Pharmacist nurse robot teaches medication movement, metabolism, excretion, effectiveness, and adverse-effect safety.',
      kicker:'Resource library navigator',title:'Open only the resource you need',
      lede:'Use the filters first, then open one week or folder. The focus tool can close neighboring sections so the library stays visually quiet.',
      path:[['Filter','choose type or topic'],['Open','one folder or week'],['Use','one resource'],['Mark','save the next step']]
    },
    guide:{
      image:'absn-pharm-robot-path.webp',alt:'Pharmacist nurse robot teaches medication movement, metabolism, excretion, effectiveness, and adverse-effect safety.',
      kicker:'Written study guide',title:'One section at a time',
      lede:'Everything is collapsed on purpose. Open one section, read the big idea, and stop there if that is all you have room for today. The tables underneath are for when you have more.',
      path:[['Open','one section'],['Read','the big idea first'],['Check','the comparison table'],['Recall','say it from memory']]
    },
    general:{
      image:'absn-hub-robot-team.webp',alt:'Friendly nurse robots organize a colorful nursing learning command center.',
      kicker:'Study navigator',title:'One focused step at a time',
      lede:'Use the roomy-text and focus tools to reduce visual load while keeping the original information and links intact.',
      path:[['Choose','one topic'],['Learn','one small section'],['Recall','say it from memory'],['Reset','take a short pause']]
    }
  };

  /* The module quiz is rendered from a JSON block after this script runs, so
     counting .qz here would always say zero. Count the bank instead. */
  function bankCount(){
    var el=document.getElementById('qbank'); if(!el) return '0';
    try{ var b=JSON.parse(el.textContent);
         return String(Array.isArray(b)?b.length
                : Object.keys(b).reduce(function(n,k){return n+(b[k]||[]).length;},0)); }
    catch(e){ return '0'; }
  }

  function pageStats(){
    if(family==='index') return [[count('.tile'),'destinations'],['4','study modes'],['1','next step']];
    if(family==='module'||family==='exam') return [[count('.card[data-t]'),'focus cards'],[count('table'),'tables'],[count('li'),'fact bullets']];
    if(family==='course') return [[count('.exsec'),'exam groups'],[count('.modcard'),'module pages'],[count('.card,.mcard'),'orientation cards']];
    if(family==='coursemod') return [[count('details.chunk,details.altchunk'),'study chunks'],[count('.vcard,.vtw,.vfig,.mcard,figure'),'visual panels'],[bankCount(),'questions']];
    if(family==='quiz') return [['1','question bank'],[count('.fbtn'),'filter choices'],[count('button'),'controls']];
    if(family==='podcast') return [[count('.ep,.pod'),'episodes'],[count('.topic'),'topic groups'],[count('a'),'resource links']];
    if(family==='guide') return [[count('details'),'sections'],[count('.card,.it'),'key points'],[count('table,.items'),'reference tables']];
    if(family==='resource') return [[count('details'),'folders'],[count('.f'),'files'],[count('a'),'resource links']];
    return [[count('section,details'),'sections'],[count('li'),'fact bullets'],[count('a'),'links']];
  }

  function buildGuide(){
    var config=configs[family]||configs.general;
    var guide=element('section','adhd-guide');guide.setAttribute('data-adhd-ui','');
    guide.setAttribute('aria-labelledby','adhdGuideTitle');
    var media=element('div','adhd-guide-media');
    var image=document.createElement('img');image.src=config.image;image.alt=config.alt;image.loading=family==='index'?'eager':'lazy';
    media.appendChild(image);
    var copy=element('div','adhd-guide-copy');
    copy.appendChild(element('p','adhd-kicker',config.kicker));
    var heading=element('h2','',config.title);heading.id='adhdGuideTitle';copy.appendChild(heading);
    copy.appendChild(element('p','',config.lede));
    var stats=element('div','adhd-guide-stats');
    pageStats().forEach(function(item){var card=element('div','adhd-guide-stat');card.appendChild(element('b','',String(item[0])));card.appendChild(element('span','',item[1]));stats.appendChild(card);});
    copy.appendChild(stats);
    var path=element('div','adhd-mini-path');
    config.path.forEach(function(item){var step=element('div','adhd-path-step');step.appendChild(element('b','',item[0]));step.appendChild(element('span','',item[1]));path.appendChild(step);});
    copy.appendChild(path);guide.append(media,copy);return guide;
  }

  function placeGuide(guide){
    if(family==='index'){
      var hero=document.querySelector('.hero');
      if(hero) hero.insertAdjacentElement('afterend',guide); else document.body.insertBefore(guide,document.body.firstChild);
      return;
    }
    var heading=document.querySelector('h1');
    var top=heading&&(heading.closest('header')||heading);
    if(top&&top.parentNode) top.insertAdjacentElement('afterend',guide);
    else {
      var wrap=document.querySelector('.wrap,main,.container')||document.body;
      wrap.insertBefore(guide,wrap.firstChild);
    }
  }

  function buildIndexAtlas(){
    if(family!=='index') return;
    var atlas=element('section','adhd-index-atlas');atlas.setAttribute('data-adhd-ui','');
    atlas.appendChild(element('h2','','Four ways to use this hub'));
    atlas.appendChild(element('p','','You do not need to use every resource in one sitting. Choose the study mode that matches your attention and energy right now.'));
    var route=element('div','adhd-route');
    [['1','Learn','Open a course, module, or visual guide.'],['2','Practice','Use a small quiz set and read the rationales.'],['3','Listen','Choose one podcast and name one takeaway.'],['4','Mix','Use the Super Mega Quiz after focused review.']].forEach(function(item){
      var card=element('div','adhd-route-card');card.appendChild(element('span','num',item[0]));card.appendChild(element('b','',item[1]));card.appendChild(element('span','',item[2]));route.appendChild(card);
    });
    atlas.appendChild(route);
    var guide=document.querySelector('.adhd-guide');if(guide)guide.insertAdjacentElement('afterend',atlas);
    var clear=document.querySelector('.ssr,#ssClear,[title*="Clear"]');if(clear&&!clear.getAttribute('aria-label'))clear.setAttribute('aria-label','Clear search');
  }

  function buildQuizRoadmap(){
    if(family!=='quiz') return;
    var roadmap=element('section','adhd-quiz-roadmap');roadmap.setAttribute('data-adhd-ui','');roadmap.setAttribute('aria-label','Four-step quiz setup');
    [['1 · Scope','Choose the narrowest useful course, exam, week, or topic.'],['2 · Style','Select the question format you want to practice.'],['3 · Count','Pick a session size that fits your attention today.'],['4 · Review','Check the rationale before moving to the next item.']].forEach(function(item){var box=element('div','');box.appendChild(element('b','',item[0]));box.appendChild(element('span','',item[1]));roadmap.appendChild(box);});
    var guide=document.querySelector('.adhd-guide');if(guide)guide.insertAdjacentElement('afterend',roadmap);
  }

  /* A page that ships its own hero (the NUR 258 module pages set
     #ple-course-start) does not want a second one generated above it. */
  var guide=null;
  if(!document.getElementById('ple-course-start')){guide=buildGuide();placeGuide(guide);}
  buildIndexAtlas();buildQuizRoadmap();

  var targets=[];
  var cardCounter=0;
  function cardTitle(card,index){
    var candidates=[':scope > .nm',':scope > h3',':scope > .tag',':scope > .lab',':scope > .hook'];
    var pieces=[];
    candidates.forEach(function(selector){
      var found=card.querySelector(selector);var value=found&&(found.textContent||'').replace(/\s+/g,' ').trim();
      if(value&&value.length<150&&pieces.indexOf(value)<0&&pieces.length<2)pieces.push(value);
    });
    var title=pieces.join(' · ')||('Study card '+(index+1));
    return title.length>145?title.slice(0,142)+'…':title;
  }
  function setCardOpen(card,on){
    var body=card.querySelector(':scope > .adhd-card-body');var button=card.querySelector(':scope > .adhd-card-toggle');
    if(!body||!button)return;body.hidden=!on;card.classList.toggle('adhd-open',on);button.setAttribute('aria-expanded',on?'true':'false');
    var icon=button.querySelector('.adhd-card-icon');if(icon)icon.textContent=on?'−':'＋';
  }
  function enhanceCard(card,index){
    if(card.querySelector(':scope > .adhd-card-toggle'))return;
    var title=cardTitle(card,index);var body=element('div','adhd-card-body');body.id='adhdCardBody'+index;
    while(card.firstChild)body.appendChild(card.firstChild);
    var button=element('button','adhd-card-toggle');button.type='button';button.setAttribute('aria-controls',body.id);
    button.appendChild(element('span','adhd-card-num',String(index+1).padStart(2,'0')));
    var titleBox=element('span','adhd-card-title',title);titleBox.appendChild(element('small','adhd-card-cue','tap to reveal this study bite'));button.appendChild(titleBox);
    button.appendChild(element('span','adhd-card-icon','＋'));
    card.append(button,body);card.classList.add('adhd-focus-target');
    var startOpen=card.classList.contains('big')||index===0;setCardOpen(card,startOpen);
    button.addEventListener('click',function(){
      var willOpen=body.hidden;
      if(willOpen&&document.body.classList.contains('adhd-focus-on'))targets.forEach(function(other){if(other!==card&&other.classList.contains('card'))setTargetOpen(other,false);});
      setCardOpen(card,willOpen);updateTools();
    });
    targets.push(card);
  }
  if(family==='module'||family==='exam')document.querySelectorAll('.card[data-t]').forEach(function(card){enhanceCard(card,cardCounter++);});

  function enhanceTopic(topic,index){
    if(topic.querySelector(':scope > .adhd-card-toggle'))return;
    var source=topic.querySelector(':scope > h2,:scope > h3,:scope > .n,:scope > .title');
    var title=(source&&source.textContent||'Podcast topic '+(index+1)).replace(/\s+/g,' ').trim();
    var body=element('div','adhd-card-body');body.id='adhdTopicBody'+index;while(topic.firstChild)body.appendChild(topic.firstChild);
    var button=element('button','adhd-card-toggle');button.type='button';button.setAttribute('aria-controls',body.id);
    button.appendChild(element('span','adhd-card-num',String(index+1).padStart(2,'0')));
    var titleBox=element('span','adhd-card-title',title);titleBox.appendChild(element('small','adhd-card-cue','open this listening group'));button.appendChild(titleBox);button.appendChild(element('span','adhd-card-icon','＋'));
    topic.append(button,body);topic.classList.add('adhd-focus-target','card');setCardOpen(topic,index===0);
    button.addEventListener('click',function(){var willOpen=body.hidden;if(willOpen&&document.body.classList.contains('adhd-focus-on'))targets.forEach(function(other){if(other!==topic)setTargetOpen(other,false);});setCardOpen(topic,willOpen);updateTools();});targets.push(topic);
  }
  if(family==='podcast')document.querySelectorAll('.topic').forEach(enhanceTopic);

  if(family==='course'||family==='coursemod')document.querySelectorAll('details.chunk,details.altchunk').forEach(function(item){item.classList.add('adhd-focus-target');targets.push(item);});
  if(family==='resource')document.querySelectorAll('details.fold,details.wk').forEach(function(item){item.classList.add('adhd-focus-target');targets.push(item);});

  function targetIsOpen(target){return target.tagName==='DETAILS'?target.open:target.classList.contains('adhd-open');}
  function setTargetOpen(target,on){if(target.tagName==='DETAILS')target.open=on;else setCardOpen(target,on);}
  function targetVisible(target){var style=getComputedStyle(target);return !target.hidden&&style.display!=='none'&&style.visibility!=='hidden';}

  targets.forEach(function(target){
    if(target.tagName==='DETAILS')target.addEventListener('toggle',function(){
      if(target.open&&document.body.classList.contains('adhd-focus-on'))targets.forEach(function(other){if(other!==target&&other.parentElement===target.parentElement)setTargetOpen(other,false);});
      updateTools();
    });
  });

  var tools=element('div','');tools.id='adhdStudyTools';tools.setAttribute('data-adhd-ui','');tools.setAttribute('aria-label','ADHD-friendly study controls');
  var roomy=element('button','','A＋ Roomy');roomy.type='button';roomy.title='Increase text size and spacing';roomy.setAttribute('aria-pressed','false');tools.appendChild(roomy);
  roomy.addEventListener('click',function(){var on=document.body.classList.toggle('adhd-roomy');roomy.setAttribute('aria-pressed',on?'true':'false');roomy.textContent=on?'A− Standard':'A＋ Roomy';try{localStorage.setItem('absnAdhdRoomy',on?'1':'0');}catch(error){}});
  try{if(localStorage.getItem('absnAdhdRoomy')==='1')roomy.click();}catch(error){}

  var focus=null,openAll=null,chunkCount=null;
  if(targets.length){
    focus=element('button','','◎ Focus one');focus.type='button';focus.title='Keep only one neighboring study chunk open';focus.setAttribute('aria-pressed','false');tools.appendChild(focus);
    focus.addEventListener('click',function(){var on=document.body.classList.toggle('adhd-focus-on');focus.setAttribute('aria-pressed',on?'true':'false');focus.textContent=on?'◎ Focus ON':'◎ Focus one';try{localStorage.setItem('absnAdhdFocus',on?'1':'0');}catch(error){}});
    try{if(localStorage.getItem('absnAdhdFocus')==='1')focus.click();}catch(error){}
    openAll=element('button','','＋ Open chunks');openAll.type='button';openAll.title='Open or close the enhanced study chunks currently available';tools.appendChild(openAll);
    openAll.addEventListener('click',function(){var visible=targets.filter(targetVisible);var shouldOpen=visible.some(function(target){return !targetIsOpen(target);});visible.forEach(function(target){setTargetOpen(target,shouldOpen);});updateTools();});
    chunkCount=element('span','');chunkCount.id='adhdChunkCount';tools.appendChild(chunkCount);
  }
  document.body.appendChild(tools);

  function updateTools(){
    if(!targets.length||!openAll||!chunkCount)return;
    var visible=targets.filter(targetVisible);var open=visible.filter(targetIsOpen).length;
    openAll.textContent=open===visible.length&&visible.length?'− Close chunks':'＋ Open chunks';
    chunkCount.textContent=open+' / '+visible.length+' open';
  }
  updateTools();

  if(family==='module'||family==='exam'){
    var search=document.querySelector('input[type="search"],#q');
    if(search)search.addEventListener('input',function(){setTimeout(function(){if(!search.value.trim()){updateTools();return;}targets.forEach(function(card){if(targetVisible(card))setTargetOpen(card,true);});updateTools();},0);});
  }

  /* Keep our instructional UI visible if an older global skim tool marks prose. */
  var skimStyle=document.createElement('style');
  skimStyle.textContent='body.skimOn [data-adhd-ui].skimHide,body.skimOn [data-adhd-ui] .skimHide{display:block!important}';
  document.head.appendChild(skimStyle);
})();
