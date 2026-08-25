/* absn-speak.js - a speaker button on every card that is mostly words.

   Caroline reads this site magnified, and some of these cards are long. A card
   she can listen to is a card she does not have to track a line at a time.

   Everything here is the browser's own speech synthesiser. Nothing is sent
   anywhere, nothing is downloaded, and it works offline.

   What gets a button, and what does not:

     A card has to be MOSTLY TEXT. Her diagrams live in <svg>, and reading one
     aloud produces a list of axis labels in the order they happen to appear in
     the markup, which is worse than useless. So a card whose drawing is bigger
     than its prose is left alone - she said as much herself.

     A card has to be worth listening to. Under ~90 characters it is faster to
     read than to press a button and wait.

   Where the button goes matters more than it sounds. Absolutely positioning it
   in a corner means it lands on top of a heading the moment the heading wraps,
   which on a phone is most of the time. So it goes INSIDE the card's heading
   where there is one - it flows with the text, wraps with it, and cannot
   collide with anything. Cards with no heading get it as their first child.

   Medical text does not read aloud well without help. "BP 140/90" comes out as
   "bee pee one hundred forty slash ninety" and "IV" is read as the Roman
   numeral four. The small dictionary below fixes the ones that actually appear
   on these pages. It is deliberately short: every entry is a chance to mangle
   something, so only high-frequency, unambiguous cases are in it. */
(function () {
  'use strict';

  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance !== 'function') return;

  var CARD_SEL = [
    '.card', '.mcard', '.vcard', '.rc', '.phase', '.qa',
    '.tip', '.mn', '.trap', '.recallcard', '.altrow'
  ].join(',');

  var MIN_CHARS = 90;
  var RATE = 0.95;

  /* --- making it sound like a person reading a chart ------------------- */
  var WORDS = [
    [/\bBP\b/g, 'blood pressure'],
    [/\bHR\b/g, 'heart rate'],
    [/\bRR\b/g, 'respiratory rate'],
    [/\bLOC\b/g, 'level of consciousness'],
    [/\bIV\b/g, 'intravenous'],
    [/\bIM\b/g, 'intramuscular'],
    [/\bPO\b/g, 'by mouth'],
    [/\bNPO\b/g, 'nothing by mouth'],
    [/\bSubQ\b/gi, 'subcutaneous'],
    [/\bNG\b/g, 'N G'],
    [/\bI&O\b/g, 'intake and output'],
    [/\bhx\b/gi, 'history'],
    [/\bs\/s\b/gi, 'signs and symptoms']
  ];
  var UNITS = [
    [/(\d)\s*mcg\b/g, '$1 micrograms'],
    [/(\d)\s*mg\b/g, '$1 milligrams'],
    [/(\d)\s*mL\b/g, '$1 milliliters'],
    [/(\d)\s*kcal\b/g, '$1 kilocalories'],
    [/(\d)\s*mEq\b/g, '$1 milliequivalents'],
    [/(\d)\s*mmHg\b/g, '$1 millimeters of mercury'],
    [/(\d)\s*kg\b/g, '$1 kilograms'],
    [/(\d)\s*cm\b/g, '$1 centimeters'],
    [/(\d)\s*hr\b/g, '$1 hours'],
    [/(\d)\s*min\b/g, '$1 minutes']
  ];

  function speakable(el) {
    var clone = el.cloneNode(true);
    [].forEach.call(clone.querySelectorAll('svg,.absn-speak,script,style'), function (n) {
      n.parentNode.removeChild(n);
    });
    var t = clone.textContent || '';
    t = t.replace(/\s+/g, ' ').trim();
    /* 140/90 is said "over", not "slash" */
    t = t.replace(/(\d)\s*\/\s*(\d)/g, '$1 over $2');
    t = t.replace(/°\s*F\b/g, ' degrees Fahrenheit');
    t = t.replace(/°\s*C\b/g, ' degrees Celsius');
    t = t.replace(/\bq(\d+)\s*h\b/gi, 'every $1 hours');
    UNITS.forEach(function (p) { t = t.replace(p[0], p[1]); });
    WORDS.forEach(function (p) { t = t.replace(p[0], p[1]); });
    /* arrows carry meaning on these pages */
    t = t.replace(/→|->/g, ' leads to ');
    t = t.replace(/↑/g, ' increased ').replace(/↓/g, ' decreased ');
    return t.replace(/\s+/g, ' ').trim();
  }

  /* A card whose picture outweighs its prose is not worth reading aloud. */
  function mostlyPicture(el) {
    var svgs = el.querySelectorAll('svg');
    if (!svgs.length) return false;
    var svgArea = 0, i, r;
    for (i = 0; i < svgs.length; i++) {
      r = svgs[i].getBoundingClientRect();
      svgArea += r.width * r.height;
    }
    r = el.getBoundingClientRect();
    var area = r.width * r.height;
    return area > 0 && svgArea / area > 0.45;
  }

  var current = null;   /* the button that is speaking, if any */

  function stop() {
    try { window.speechSynthesis.cancel(); } catch (e) {}
    hideStrip();
    if (current) {
      current.setAttribute('aria-pressed', 'false');
      current.classList.remove('on');
      var c = current.closest(CARD_SEL);
      if (c) c.classList.remove('absn-reading');
      current = null;
    }
  }

  /* Follow-along. The synthesiser reports the character index of each word as it
     reaches it, so a strip under the card can show the sentence being spoken with
     that word marked - her eyes get to rest on a line instead of hunting for it.
     Highlighting inside the card itself would mean rewriting her markup mid-read,
     which risks breaking every other script that holds a reference into it. A
     separate strip cannot break anything. */
  var strip = null;
  function showStrip(card) {
    hideStrip();
    strip = document.createElement('div');
    strip.className = 'absn-follow';
    strip.setAttribute('aria-hidden', 'true');
    /* Fixed, not inside the card. Appending it to the card grew the card mid-read
       and pushed everything below it down the page - the exact layout jump the
       repo notes warn about. Pinned to the bottom it behaves like subtitles:
       nothing moves, and it stays with her if she scrolls. */
    document.body.appendChild(strip);
  }
  function hideStrip() {
    if (strip && strip.parentNode) strip.parentNode.removeChild(strip);
    strip = null;
  }
  function paintStrip(text, at) {
    if (!strip) return;
    /* a boundary can land on the space before a word; step onto the word itself
       or the highlight comes out empty */
    while (at < text.length && text.charAt(at) === ' ') at++;
    /* the sentence around the word, so there is context either side */
    var from = text.lastIndexOf('.', at - 1) + 1;
    var to = text.indexOf('.', at);
    if (to < 0) to = text.length;
    var end = text.indexOf(' ', at);
    if (end < 0) end = to;
    strip.innerHTML =
      esc(text.slice(from, at)) +
      '<mark>' + esc(text.slice(at, end)) + '</mark>' +
      esc(text.slice(end, to));
  }
  function esc(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function play(btn, card) {
    stop();
    var text = speakable(card);
    if (!text) return;
    var u = new SpeechSynthesisUtterance(text);
    u.rate = RATE;
    u.lang = document.documentElement.lang || 'en-US';
    u.onend = stop;
    u.onerror = stop;
    showStrip(card);
    u.onboundary = function (e) {
      if (e.name && e.name !== 'word') return;
      paintStrip(text, e.charIndex || 0);
    };
    current = btn;
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('on');
    card.classList.add('absn-reading');
    try { window.speechSynthesis.speak(u); } catch (e) { stop(); }
  }

  function style() {
    var s = document.createElement('style');
    s.textContent =
      '.absn-speak{display:inline-flex;align-items:center;justify-content:center;' +
      ' gap:5px;min-width:44px;min-height:44px;padding:6px 10px;margin:0 0 0 8px;' +
      ' vertical-align:middle;border-radius:11px;cursor:pointer;' +
      ' background:rgba(255,255,255,.16);color:inherit;' +
      ' border:1px solid rgba(255,255,255,.34);' +
      ' font:900 .8rem/1 "Segoe UI",system-ui,sans-serif}' +
      '.absn-speak:hover{background:rgba(255,255,255,.32)}' +
      '.absn-speak:focus-visible{outline:3px solid #ffd76a;outline-offset:2px}' +
      '.absn-speak.on{background:#12b886;border-color:#fff;color:#fff}' +
      '.absn-reading{outline:2px dashed rgba(18,184,134,.9);outline-offset:3px}' +
      '.absn-follow{position:fixed;left:12px;right:12px;bottom:78px;z-index:99998;' +
      ' max-width:900px;margin:0 auto;padding:12px 15px;border-radius:14px;' +
      ' background:rgba(8,5,18,.95);border:1px solid rgba(255,255,255,.34);' +
      ' box-shadow:0 10px 34px rgba(0,0,0,.6);' +
      ' -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);' +
      ' font:700 1.05rem/1.5 "Segoe UI",system-ui,sans-serif;color:#fff;' +
      ' min-height:2.6em;max-height:28vh;overflow:auto;overflow-wrap:break-word}' +
      '@media (max-width:520px){.absn-follow{bottom:74px;font-size:1rem}}' +
      '.absn-follow mark{background:#ffc233;color:#231a02;padding:1px 4px;' +
      ' border-radius:5px;font-weight:900}' +
      '@media print{.absn-speak{display:none}}';
    document.head.appendChild(s);
  }

  function decorate(card) {
    if (card.dataset.absnSpeak) return;
    if (card.closest('.absn-speak')) return;
    /* never nest: if an ancestor card already has one, this is part of it */
    var up = card.parentElement && card.parentElement.closest(CARD_SEL);
    if (up && up.dataset.absnSpeak === '1') return;

    var text = speakable(card);
    if (text.length < MIN_CHARS) { card.dataset.absnSpeak = 'skip'; return; }
    /* no box yet means it is inside something closed - leave it undecided so the
       next rescan can judge it properly rather than writing it off now */
    if (!card.getBoundingClientRect().height) return;
    if (mostlyPicture(card)) { card.dataset.absnSpeak = 'skip'; return; }

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'absn-speak';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Listen to this card');
    btn.title = 'Listen to this card';
    btn.innerHTML = '<span aria-hidden="true">🔊</span>';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (current === btn) { stop(); return; }
      play(btn, card);
    });

    var head = card.querySelector('h1,h2,h3,h4,h5,h6');
    if (head && card.contains(head)) head.appendChild(btn);
    else card.insertBefore(btn, card.firstChild);
    card.dataset.absnSpeak = '1';
  }

  function scan() {
    [].forEach.call(document.querySelectorAll(CARD_SEL), decorate);
  }

  /* Most of a module page lives inside collapsed <details>. Those cards exist in
     the DOM but have no box until she opens one, so the picture-vs-prose test
     cannot judge them and a scan on a timer misses them entirely. Rescan after
     anything is clicked - debounced, because she clicks a lot. */
  var pending = null;
  function rescanSoon() {
    clearTimeout(pending);
    pending = setTimeout(scan, 180);
  }

  function init() {
    style();
    scan();
    /* module pages build their cards after load, so look again a few times */
    setTimeout(scan, 600);
    setTimeout(scan, 1800);
    setTimeout(scan, 4000);
    document.addEventListener('click', rescanSoon, true);
    document.addEventListener('toggle', rescanSoon, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* speech that outlives the page is a genuinely unpleasant surprise */
  window.addEventListener('pagehide', stop);
  window.addEventListener('beforeunload', stop);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
  });
})();
