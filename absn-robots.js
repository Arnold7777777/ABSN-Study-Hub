/* absn-robots.js - put the robot buddies where they help and nowhere else.

   Caroline likes robots, so they are here to make the site hers rather than
   to carry information. The rules from the pack's own README, kept:

     never over words or controls        (each one sits in its own space)
     alt="" when decorative              (all of these are)
     pointer-events:none                 (they cannot block a link)
     prefers-reduced-motion respected    (robot-buddies.css handles it)

   Nothing here is load-bearing: if an image 404s or the CSS is missing, the
   page reads exactly as it did before.

   All nineteen are in the cast. The one on a given page is picked from the
   page's own path, so it is different from page to page but the SAME every
   time she opens that page - a buddy belongs to a topic, it does not shuffle
   under her while she reads. Random would have been easier and worse.

   Some robots are pinned to a meaning rather than left to the rotation:
   the alert buddy guards warnings, the celebration buddy waits at the end of
   a quiz, and the two abductees only turn up when a search found nothing.
*/
(function () {
  'use strict';

  var BASE = (function () {
    /* the same ../ depth this script itself was loaded with */
    var s = document.querySelector('script[src*="absn-robots.js"]');
    var src = s ? s.getAttribute('src') : '';
    return src.replace(/absn-robots\.js.*$/, '') + 'robots/';
  })();

  /* peek: designed as head-and-hands, so they lean over an edge.
     stand: whole figures, so they stand beside things instead. */
  var CAST = [
    { f: '01-glossy-awesomeo-card-peeker.png',        a: 'peek',      pose: 'peek'  },
    { f: '05-rustic-awesomeo-card-peeker.png',        a: 'peek',      pose: 'peek'  },
    { f: '02-glossy-nurse-buddy.png',                 a: 'wave',      pose: 'stand' },
    { f: '06-rustic-nurse-buddy.png',                 a: 'wave',      pose: 'stand' },
    { f: '03-glossy-study-coach.png',                 a: 'bob',       pose: 'stand' },
    { f: '07-rustic-study-coach.png',                 a: 'bob',       pose: 'stand' },
    { f: '09-rustic-goku-inspired-cosplay.png',       a: 'power',     pose: 'stand' },
    { f: '10-rustic-vegeta-inspired-cosplay.png',     a: 'power',     pose: 'stand' },
    { f: '11-rustic-broly-inspired-cosplay.png',      a: 'power',     pose: 'stand' },
    { f: '12-rustic-cowboy-buddy.png',                a: 'tip',       pose: 'stand' },
    { f: '13-rustic-melodic-death-metal-buddy.png',   a: 'guitar',    pose: 'stand' },
    { f: '14-rustic-black-metal-buddy.png',           a: 'guitar',    pose: 'stand' },
    { f: '15-rustic-abbath-inspired-stage-buddy.png', a: 'guitar',    pose: 'stand' },
    { f: '16-terminator-esque-friendly-buddy.png',    a: 'scan',      pose: 'stand' },
    { f: '17-number-five-ish-scrapyard-buddy.png',    a: 'curious',   pose: 'stand' }
  ];

  var PINNED = {
    alert:     { f: '08-rustic-safety-alert-buddy.png',  a: 'alert',     pose: 'stand' },
    celebrate: { f: '04-glossy-celebration-buddy.png',   a: 'celebrate', pose: 'stand' },
    abducted:  { f: '18-rustic-robot-alien-abduction.png', a: 'ufo',     pose: 'stand' },
    cow:       { f: '19-cow-robot-alien-abduction.png',  a: 'ufo',       pose: 'stand' }
  };

  /* a small stable hash of the path, so the same page always gets the same
     buddy and neighbouring pages get different ones */
  function pick() {
    var s = location.pathname, h = 0;
    for (var i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return CAST[Math.abs(h) % CAST.length];
  }

  function css() {
    if (document.getElementById('absnRobotCss')) return;
    var l = document.createElement('link');
    l.id = 'absnRobotCss';
    l.rel = 'stylesheet';
    l.href = BASE + 'robot-buddies.css';
    document.head.appendChild(l);

    var s = document.createElement('style');
    s.id = 'absnRobotTweaks';
    /* The pack's .robot-card assumes a cream card with dark ink. This site is
       jewel tones over a photograph, so only the peeker positioning idea is
       reused. No backdrop-filter anywhere. */
    s.textContent =
      '.absn-robot{pointer-events:none;user-select:none;display:block}' +
      '.absn-robot-peek{position:absolute;right:14px;top:0;width:clamp(64px,11vw,104px);' +
      ' transform:translateY(-52%);z-index:3;' +
      ' filter:drop-shadow(0 8px 7px rgba(0,0,0,.45))}' +
      /* a whole figure would look decapitated hanging off an edge, so it
         stands on the block instead of leaning over it */
      '.absn-robot-stand{position:absolute;right:12px;top:8px;width:clamp(56px,9vw,88px);' +
      ' z-index:3;filter:drop-shadow(0 8px 7px rgba(0,0,0,.45))}' +
      '.absn-robot-side{width:clamp(58px,9vw,86px);float:right;margin:0 0 6px 12px;' +
      ' filter:drop-shadow(0 6px 6px rgba(0,0,0,.4))}' +
      '.absn-robot-big{width:clamp(90px,20vw,150px);margin:6px auto 2px;' +
      ' filter:drop-shadow(0 8px 8px rgba(0,0,0,.45))}' +
      /* the Watch block text must not run under a standing robot */
      '.absn-watch.has-robot h2,.absn-watch.has-robot .wsub{padding-right:104px}' +
      '@media (max-width:560px){.absn-watch.has-robot h2,' +
      ' .absn-watch.has-robot .wsub{padding-right:72px}}' +
      '@media print{.absn-robot{display:none}}';
    document.head.appendChild(s);
  }

  function img(spec, cls) {
    var a = document.createElement('img');
    a.className = 'absn-robot robot-buddy robot-anim--' + spec.a + ' ' + cls;
    a.src = BASE + spec.f;
    a.alt = '';                  /* decorative - it says nothing the text does not */
    a.setAttribute('aria-hidden', 'true');
    a.loading = 'lazy';
    a.decoding = 'async';
    /* a missing image should leave no gap and no broken icon */
    a.onerror = function () { if (a.parentNode) a.parentNode.removeChild(a); };
    return a;
  }

  function place(host, spec, cls, needsFrame) {
    if (!host || host.querySelector('.absn-robot')) return;
    if (needsFrame && window.getComputedStyle(host).position === 'static') {
      host.style.position = 'relative';
    }
    host.insertBefore(img(spec, cls), host.firstChild);
  }

  function go() {
    var did = false;

    /* 1. the Watch block - this page's own buddy, whoever that is */
    var watch = document.querySelector('.absn-watch');
    if (watch && !watch.querySelector('.absn-robot')) {
      css();
      var me = pick();
      watch.classList.add('has-robot');
      place(watch, me, me.pose === 'peek' ? 'absn-robot-peek' : 'absn-robot-stand', true);
      did = true;
    }

    /* 2. the exam spotlight card - a coach, matched to the page's finish */
    var hy = document.querySelector('.mcard.hy');
    if (hy && !hy.querySelector('.absn-robot')) {
      css();
      var glossy = pick().f.indexOf('glossy') > -1;
      place(hy, glossy ? CAST[4] : CAST[5], 'absn-robot-side', false);
      did = true;
    }

    /* 3. warnings - the buddy holding the amber sign */
    var warn = document.querySelector('.card.ruby, .card.garnet');
    if (warn && /🚨/.test(warn.textContent) && !warn.querySelector('.absn-robot')) {
      css();
      place(warn, PINNED.alert, 'absn-robot-side', false);
      did = true;
    }

    /* 4. the end of a quiz */
    var done = document.querySelector('.done');
    if (done && !done.querySelector('.absn-robot')) {
      css();
      place(done, PINNED.celebrate, 'absn-robot-big', false);
      did = true;
    }

    /* 5. a search that found nothing - the robot has been abducted */
    var empty = document.querySelector('.empty');
    if (empty && empty.offsetParent !== null && !empty.querySelector('.absn-robot')) {
      css();
      place(empty, /nothing matches/i.test(empty.textContent) ? PINNED.abducted : PINNED.cow,
            'absn-robot-big', false);
      did = true;
    }

    return did;
  }

  /* the Watch block and the quiz panels are built by other scripts, so try
     again once they have run */
  function boot() { go(); setTimeout(go, 400); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () { setTimeout(go, 200); });
  /* the quiz swaps panels in and out long after load */
  document.addEventListener('click', function () { setTimeout(go, 250); }, true);
})();
