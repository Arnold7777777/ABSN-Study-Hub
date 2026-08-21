/* absn-robots.js - put the robot buddies where they help and nowhere else.

   Caroline likes robots, so they are here to make the site hers rather than
   to carry information. The rules from the pack's own README, kept:

     never over words or controls        (each one sits in its own space)
     alt="" when decorative              (all of these are)
     pointer-events:none                 (they cannot block a link)
     prefers-reduced-motion respected    (robot-buddies.css handles it)

   Nothing here is load-bearing: if an image 404s or the CSS is missing, the
   page reads exactly as it did before.

   Slots, in order of how often they are seen:
     .absn-watch      the Watch block heading - a peeker leaning on it
     .mcard.hy        the exam spotlight card on a module page - a coach
     .done            the end-of-quiz panel - a celebration
*/
(function () {
  'use strict';

  var BASE = (function () {
    /* the same ../ depth this script itself was loaded with */
    var s = document.querySelector('script[src*="absn-robots.js"]');
    var src = s ? s.getAttribute('src') : '';
    return src.replace(/absn-robots\.js.*$/, '') + 'robots/';
  })();

  var ROBOTS = {
    peek:      { file: '05-rustic-awesomeo-card-peeker.png', anim: 'robot-anim--peek' },
    coach:     { file: '07-rustic-study-coach.png',          anim: 'robot-anim--bob' },
    nurse:     { file: '06-rustic-nurse-buddy.png',          anim: 'robot-anim--wave' },
    alert:     { file: '08-rustic-safety-alert-buddy.png',   anim: 'robot-anim--alert' },
    celebrate: { file: '04-glossy-celebration-buddy.png',    anim: 'robot-anim--celebrate' }
  };

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
       jewel tones on a photograph, so only the peeker positioning is reused
       and the card styling is left alone. No backdrop-filter anywhere. */
    s.textContent =
      '.absn-robot{pointer-events:none;user-select:none;display:block}' +
      '.absn-robot-peek{position:absolute;right:14px;top:0;width:clamp(64px,11vw,104px);' +
      ' transform:translateY(-52%);z-index:3;' +
      ' filter:drop-shadow(0 8px 7px rgba(0,0,0,.45))}' +
      '.absn-robot-side{width:clamp(58px,9vw,86px);float:right;margin:0 0 6px 12px;' +
      ' filter:drop-shadow(0 6px 6px rgba(0,0,0,.4))}' +
      '.absn-robot-big{width:clamp(90px,20vw,150px);margin:6px auto 2px;' +
      ' filter:drop-shadow(0 8px 8px rgba(0,0,0,.45))}' +
      '@media print{.absn-robot{display:none}}';
    document.head.appendChild(s);
  }

  function img(kind, cls) {
    var r = ROBOTS[kind];
    var a = document.createElement('img');
    a.className = 'absn-robot robot-buddy ' + r.anim + ' ' + cls;
    a.src = BASE + r.file;
    a.alt = '';                  /* decorative - it says nothing the text does not */
    a.setAttribute('aria-hidden', 'true');
    a.loading = 'lazy';
    a.decoding = 'async';
    /* a missing image should leave no gap and no broken icon */
    a.onerror = function () { if (a.parentNode) a.parentNode.removeChild(a); };
    return a;
  }

  function go() {
    var slots = [];

    var watch = document.querySelector('.absn-watch');
    if (watch) slots.push([watch, 'peek', 'absn-robot-peek', true]);

    var hy = document.querySelector('.mcard.hy');
    if (hy) slots.push([hy, 'coach', 'absn-robot-side', false]);

    var done = document.querySelector('.done');
    if (done) slots.push([done, 'celebrate', 'absn-robot-big', false]);

    if (!slots.length) return;
    css();

    slots.forEach(function (s) {
      var host = s[0];
      if (host.querySelector('.absn-robot')) return;
      if (s[3]) {
        /* the peeker is absolutely placed, so its host needs a frame */
        var pos = window.getComputedStyle(host).position;
        if (pos === 'static') host.style.position = 'relative';
      }
      host.insertBefore(img(s[1], s[2]), host.firstChild);
    });
  }

  /* the Watch block and the quiz's end panel are both built by other scripts,
     so try again after they have run */
  function boot() { go(); setTimeout(go, 400); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () { setTimeout(go, 200); });
})();
