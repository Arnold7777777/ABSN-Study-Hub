/* absn-robots.js - put the robot buddies where they help and nowhere else.

   Caroline likes robots, so they are here to make the site hers rather than
   to carry information. The rules from the pack's own README, kept:

     never over words or controls        (each one sits in its own space)
     alt="" when decorative              (all of these are)
     pointer-events:none                 (they cannot block a link)
     prefers-reduced-motion respected    (robot-buddies.css handles it)

   Nothing here is load-bearing: if an image 404s or the CSS is missing, the
   page reads exactly as it did before.

   Twenty-nine PNGs now: the original nineteen and the rubber duckie series.
   All of them are in the cast. The one on a given page is picked from the
   page's own path, so it is different from page to page but the SAME every
   time she opens that page - a buddy belongs to a topic, it does not shuffle
   under her while she reads. Random would have been easier and worse.

   Some robots are pinned to a meaning rather than left to the rotation:

     alert buddy       guards a card carrying a warning
     celebration buddy waits at the end of a quiz that went well
     the abductees     turn up on a wrong answer, on a quiz under sixty per
                       cent, and when a search finds nothing - Caroline's idea,
                       and a good one: getting it wrong should feel like the
                       robot is having a worse time than she is, not like the
                       site is disappointed in her. There are three of them and
                       they take turns, because the same picture a hundred and
                       sixty-five times stops reading as a joke.
     the confetti one  turns up on a RIGHT answer, so the pair is symmetrical.
                       A wrong answer being the only one that got a picture
                       would have been a strange thing to build.

   The twelve animated SVG peekers are the second pack. They blink, bob and
   wave on their own - each file carries its own animation CSS and its own
   prefers-reduced-motion rule - and they cost about 4.5 KB each against the
   PNGs' fifty. They take the top of the page, which had no robot at all.

   They are loaded as <img src>, never inlined, and that is not a style
   preference. All twelve declare the SAME element ids (#copper, #brass,
   #screen, #shadow) and the same class names (.bot, .eye, .lamp). Two of
   them inlined in one document and every gradient reference resolves to
   whichever loaded last - and their <style> block would reach out and animate
   any .card or .eye the page itself owns. An <img> is its own document, so
   none of that can happen.
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
    { f: '17-number-five-ish-scrapyard-buddy.png',    a: 'curious',   pose: 'stand' },
    /* the rubber duckie series - same rules, whole figures, so they stand */
    { f: '20-classic-yellow-rubber-duckie-robot.png',        a: 'bob',    pose: 'stand' },
    { f: '21-rustic-copper-rubber-duckie-robot.png',         a: 'bob',    pose: 'stand' },
    { f: '22-nurse-rubber-duckie-robot.png',                 a: 'wave',   pose: 'stand' },
    { f: '24-cowboy-rubber-duckie-robot.png',                a: 'tip',    pose: 'stand' },
    { f: '25-melodic-death-metal-rubber-duckie-robot.png',   a: 'guitar', pose: 'stand' },
    { f: '26-black-metal-stage-rubber-duckie-robot.png',     a: 'guitar', pose: 'stand' },
    { f: '27-space-explorer-rubber-duckie-robot.png',        a: 'scan',   pose: 'stand' },
    { f: '29-foldy-tech-rubber-duckie-robot.png',            a: 'curious', pose: 'stand' }
  ];

  /* Three coaches for the exam spotlight card, so it is not the same face on
     every module. Which one a page gets follows the page, not the clock. */
  var COACHES = [
    { f: '03-glossy-study-coach.png',                  a: 'bob', pose: 'stand' },
    { f: '07-rustic-study-coach.png',                  a: 'bob', pose: 'stand' },
    { f: '23-study-coach-rubber-duckie-robot.png',     a: 'bob', pose: 'stand' }
  ];

  /* Three of them get abducted rather than one. A wrong answer showing the
     identical picture a hundred and sixty-five times stops being a joke and
     starts being a scold, so it changes from question to question. */
  var ABDUCTEES = [
    { f: '18-rustic-robot-alien-abduction.png',            a: 'ufo', pose: 'stand' },
    { f: '19-cow-robot-alien-abduction.png',               a: 'ufo', pose: 'stand' },
    { f: '28-alien-abduction-rubber-duckie-robot.png',     a: 'ufo', pose: 'stand' }
  ];

  /* The animated peekers. Head-and-hands by design: they are drawn to be
     cropped by the top edge of a card, so that is where they go. */
  var PEEK = [
    'svg/01-awesomeo-happy-peeker.svg',
    'svg/02-awesomeo-curious-peeker.svg',
    'svg/03-awesomeo-sleepy-peeker.svg',
    'svg/04-awesomeo-heart-peeker.svg',
    'svg/05-awesomeo-alert-peeker.svg',
    'svg/06-awesomeo-reader-peeker.svg',
    'svg/07-awesomeo-cowboy-peeker.svg',
    'svg/08-awesomeo-metal-peeker.svg',
    'svg/09-awesomeo-ufo-peeker.svg',
    'svg/10-awesomeo-nurse-peeker.svg',
    'svg/11-awesomeo-confetti-peeker.svg',
    'svg/12-awesomeo-night-sky-peeker.svg'
  ];

  var CONFETTI = 'svg/11-awesomeo-confetti-peeker.svg';

  /* the abductees live in ABDUCTEES above, because there are three of them */
  var PINNED = {
    alert:     { f: '08-rustic-safety-alert-buddy.png',  a: 'alert',     pose: 'stand' },
    celebrate: { f: '04-glossy-celebration-buddy.png',   a: 'celebrate', pose: 'stand' }
  };

  /* a small stable hash of the path, so the same page always gets the same
     buddy and neighbouring pages get different ones */
  function hash() {
    var s = location.pathname, h = 0;
    for (var i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  function pick()     { return CAST[hash() % CAST.length]; }

  /* Round-robin rather than random: over a run of questions she sees all
     three rather than the same one four times by chance. */
  var abductN = 0;
  function abductee() { return ABDUCTEES[abductN++ % ABDUCTEES.length]; }
  /* offset so a page does not get the glossy PNG and the SVG of the same mood */
  function pickPeek() { return PEEK[(hash() + 5) % PEEK.length]; }

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
      /* The animated peeker, in the top corner of a card.
         It is drawn as head-and-hands to hang OVER a card's top edge, and that
         was the first version - but every card on this site sits in a grid with
         a fourteen pixel gap above it, so an overhang had nothing to hang into
         and would have crossed the line above. It floats instead: the card's
         own text wraps around it, which cannot overlap anything, on any of the
         four hundred and seventy-seven pages. */
      '.absn-robot-svg{float:right;width:clamp(84px,14vw,132px);' +
      ' margin:-2px -4px 4px 12px;' +
      ' filter:drop-shadow(0 7px 7px rgba(0,0,0,.42))}' +
      '@media (max-width:560px){.absn-robot-svg{width:clamp(76px,22vw,104px)}}' +
      /* the small decorative ones: a badge in the corner of a block. Absolute,
         so none of them can push a single line of text anywhere. */
      '.absn-robot-badge{position:absolute;right:9px;top:8px;' +
      ' width:clamp(38px,5.5vw,58px);z-index:3;pointer-events:none;' +
      ' filter:drop-shadow(0 4px 5px rgba(0,0,0,.45))}' +
      '.absn-robot-tiny{width:clamp(30px,4vw,42px);vertical-align:-.35em;' +
      ' margin:0 0 0 8px;display:inline-block;' +
      ' filter:drop-shadow(0 3px 4px rgba(0,0,0,.45))}' +
      '@media (max-width:560px){.absn-robot-badge{width:34px;right:6px;top:6px}}' +
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

  /* The SVGs animate themselves, so they get no robot-anim-- class: adding
     one would run the pack's bob on top of the file's own bob. */
  function svgImg(file, cls) {
    var a = document.createElement('img');
    a.className = 'absn-robot ' + cls;
    a.src = BASE + file;
    a.alt = '';
    a.setAttribute('aria-hidden', 'true');
    a.loading = 'lazy';
    a.decoding = 'async';
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

  /* The quizzes mark a wrong answer differently in each engine - a cross,
     "Not this time", "Not quite" - so read all three rather than pick one. */
  function verdict(rat) {
    var v = rat.parentNode && rat.parentNode.querySelector('.verdict');
    if (v && v.classList) {
      if (v.classList.contains('no')) return 'no';
      if (v.classList.contains('ok')) return 'ok';
    }
    /* the game lab paints words rather than a class */
    var t = (rat.textContent || '') + ' ' + (v ? v.textContent : '');
    if (/\u2717|not this|not quite/i.test(t)) return 'no';
    if (/\u2713|nice|correct|exactly/i.test(t)) return 'ok';
    return '';
  }

  /* "You answered 4 of 10 correctly" - under sixty per cent and the
     celebration would feel like a wind-up, so the abductee turns up instead.
     No score in the panel means no judgement: celebrate. */
  function roughOne(done) {
    var m = (done.textContent || '').match(/(\d+)\s*(?:of|\/)\s*(\d+)/);
    if (!m) return false;
    var got = parseInt(m[1], 10), all = parseInt(m[2], 10);
    if (!all) return false;
    return (got / all) < 0.6;
  }

  /* The first card worth leaning on: big enough that a robot on it reads as
     decoration rather than as furniture. */
  function firstCard() {
    var all = document.querySelectorAll('.card, .mcard');
    for (var i = 0; i < all.length; i++) {
      var r = all[i].getBoundingClientRect();
      if (r.width >= 250 && r.height >= 95 && !all[i].querySelector('.absn-robot')) {
        return all[i];
      }
    }
    return null;
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

    /* 2. the exam spotlight card - a coach, one of three, chosen by the page */
    var hy = document.querySelector('.mcard.hy');
    if (hy && !hy.querySelector('.absn-robot')) {
      css();
      place(hy, COACHES[hash() % COACHES.length], 'absn-robot-side', false);
      did = true;
    }

    /* 3. warnings - the buddy holding the amber sign */
    var warn = document.querySelector('.card.ruby, .card.garnet');
    if (warn && /🚨/.test(warn.textContent) && !warn.querySelector('.absn-robot')) {
      css();
      place(warn, PINNED.alert, 'absn-robot-side', false);
      did = true;
    }

    /* 4. the end of a quiz - who greets her depends on how it went */
    var done = document.querySelector('.done');
    if (done && !done.querySelector('.absn-robot')) {
      css();
      place(done, roughOne(done) ? abductee() : PINNED.celebrate,
            'absn-robot-big', false);
      did = true;
    }

    /* 5. the answer - abducted for a wrong one, confetti for a right one.
          Both, so that a picture is not by itself the bad news. */
    [].forEach.call(document.querySelectorAll('.rat.show, #csRat.show'), function (rat) {
      if (rat.querySelector('.absn-robot')) return;
      var v = verdict(rat);
      if (v === 'no') {
        css();
        rat.insertBefore(img(abductee(), 'absn-robot-side'), rat.firstChild);
        did = true;
      } else if (v === 'ok') {
        css();
        rat.insertBefore(svgImg(CONFETTI, 'absn-robot-svg'), rat.firstChild);
        did = true;
      }
    });

    /* 6. a search that found nothing */
    var empty = document.querySelector('.empty');
    if (empty && empty.offsetParent !== null && !empty.querySelector('.absn-robot')) {
      css();
      place(empty, abductee(), 'absn-robot-big', false);
      did = true;
    }

    /* 7. an animated peeker leaning on a card, LAST so the pinned robots have
          already taken theirs - firstCard() skips any card that has one, so a
          module page keeps its study coach and a warning card keeps its
          alert buddy instead of being quietly evicted. */
    if (!document.querySelector('.absn-robot-svg')) {
      var lean = firstCard();
      if (lean) {
        css();
        lean.insertBefore(svgImg(pickPeek(), 'absn-robot-svg'), lean.firstChild);
        did = true;
      }
    }

    /* ------------------------------------------------------------------
       And then, because Caroline asked for as many as possible: one on
       every block that has room for one.

       Rules that keep "as many as possible" from turning into a mess:
       every one of these is absolutely positioned or inline, so none of
       them moves a line of text; each block gets at most one; and the cast
       is walked in order rather than picked at random, so a page shows
       many DIFFERENT robots instead of the same one twenty times.
       ------------------------------------------------------------------ */
    /* A budget, because "as many as possible" has a ceiling that is not the
       number of blocks on the page. nur258.html holds all fourteen modules
       inline, and an uncapped sprinkle put 455 robots on it - every one a
       separate image to fetch as she scrolls. Sixty is still a robot every
       time she looks up, and it is a page that loads. */
    var MAX = 60;
    var placed = document.querySelectorAll('.absn-robot').length;
    var n = 0;
    function next() { return CAST[(hash() + (n++)) % CAST.length]; }
    function room() { return placed < MAX; }

    function sprinkle(sel, cls, frame) {
      [].forEach.call(document.querySelectorAll(sel), function (el) {
        if (!room()) return;
        if (el.querySelector('.absn-robot')) return;
        if (!el.getBoundingClientRect().height) return;   /* collapsed section */
        placed++;
        css();
        if (frame && window.getComputedStyle(el).position === 'static') {
          el.style.position = 'relative';
        }
        el.insertBefore(img(next(), cls), el.firstChild);
        did = true;
      });
    }

    /* 8. every mind map, every ATI template, every infographic grid */
    sprinkle('.mm2', 'absn-robot-badge', true);
    sprinkle('.altpl', 'absn-robot-badge', true);
    sprinkle('.slot.filled[data-slot="info"]', 'absn-robot-badge', true);

    /* 9. the module cards on a course hub - this is the page she opens most */
    sprinkle('.modcard', 'absn-robot-badge', true);

    /* 10. the exam band headings */
    sprinkle('.exhead', 'absn-robot-badge', true);

    /* 11. the tiles on the study hub itself */
    sprinkle('.tile', 'absn-robot-badge', true);

    /* 12. the study cards on a module page - the biggest surface on the site.
           Only the wide ones: a badge on a narrow card would crowd the text
           it is sitting next to. */
    [].forEach.call(document.querySelectorAll('.vcard, .mcard, .card'), function (el) {
      if (!room()) return;
      if (el.querySelector('.absn-robot')) return;
      var r = el.getBoundingClientRect();
      if (r.width < 380 || r.height < 150) return;
      placed++;
      css();
      if (window.getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.insertBefore(img(next(), 'absn-robot-badge'), el.firstChild);
      did = true;
    });

    /* 13. each collapsible chunk's own heading gets a tiny one inline */
    [].forEach.call(document.querySelectorAll('details.mod > summary, details.chunk > summary'),
      function (el) {
        if (!room()) return;
        if (el.querySelector('.absn-robot')) return;
        if (!el.getBoundingClientRect().height) return;
        placed++;
        css();
        el.appendChild(img(next(), 'absn-robot-tiny'));
        did = true;
      });

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
