/* absn-hidebar.js - put the toolbars in a drawer instead of on top of the page.

   Module pages stack sticky bars at the top: the module nav, the text-size
   controls, the One-bite / Spotlight bar, the section jump links. At
   Caroline's text size that stack fills more than half the screen, so the
   page she came to read starts below the fold.

   The first version of this just hid them, and that was not enough. Two
   things went wrong with hiding:

     A bar that arrived AFTER she pressed hide stayed visible, because the
     module scripts inject theirs late. She would press hide, the page would
     look right, and then a purple bar would appear on its own.

     Worse, a sticky bar keeps the offset it was given for the bar above it.
     Hide the top bar and the one below it does not move up - it stays
     pinned at the old offset, floating in the middle of the page with the
     content scrolling underneath. That is not a bar any more, it is a
     sticker across the middle of the screen, and it is what Caroline
     screenshotted sitting over the Rule of Nines card.

   So they are not hidden now, they are MOVED. Every full-width bar is taken
   out of the page and put into a panel pinned off the right-hand edge. The
   page then has no sticky bars at all, so it starts at the top and nothing
   can float over it. One button slides the panel in when she wants the
   controls, and out again when she does not.

   The bars are found by asking the browser which elements are actually
   stuck to the viewport, not by a list of class names. Three page families
   here use three different sets of names (.ple-module-bar, #adhdStudyTools,
   #navBtns, .focusbar, a bare <nav>), and a name list would miss whichever
   family it was not written for.

   Only full-width bars move. The small corner pills are navigation, they
   are two taps she uses constantly, and they are not in anyone's way - so
   they stay where they are, and they get repainted opaque instead.

   Moving rather than copying matters: the module scripts hold references to
   these elements and keep updating them ("Bite 4 of 17", "Everything is
   visible"). A copy would go stale within one click. The same node in a new
   parent keeps every listener and every reference it had.

   Anything still stuck to the viewport is repainted opaque. Those bars were
   built at alpha .96 and .98, which sounds opaque and is not: the page slid
   underneath and left ghost text lying across the buttons. Two percent of
   white on a near-black bar is faint on a small screen and perfectly
   legible on a large one at large type, which is exactly how Caroline
   reads. Each one is repainted in the colour it ALREADY appears to be - its
   own colour composited over the page background - so nothing changes
   except that you cannot see through it. Bars under about eighty per cent
   alpha are left alone; down there the translucency is deliberate.
*/
(function () {
  'use strict';

  var MIN_HEIGHT = 26;        /* leave the small corner pills alone */
  var WIDE = 0.7;             /* a "bar" spans most of its own container */
  var MIN_WIDTH = 260;        /* below this it is a pill, not a toolbar */
  var OPEN = 'absn-drawer-open';

  var drawer = null, btn = null, open = false;
  /* The launcher is part of the page now, not pinned over it. */
  var PINNED = false;

  /* ---------- finding things ------------------------------------------ */

  function isStuck(el) {
    var s = window.getComputedStyle(el);
    if (s.position !== 'sticky' && s.position !== 'fixed') return null;
    if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) return null;
    var r = el.getBoundingClientRect();
    if (r.height < MIN_HEIGHT) return null;
    /* Skip-to-content links are fixed, full height, and parked off the top of
       the screen until they are focused. They are not toolbars, and moving
       one takes away the keyboard shortcut into the page. */
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.bottom <= 0 || r.top >= vh) return null;
    if (r.right <= 0 || r.left >= window.innerWidth) return null;
    return r;
  }

  function ours(el) {
    return el === drawer || el === btn || (drawer && drawer.contains(el));
  }

  /* every stuck element, outermost only */
  function stuck() {
    var out = [];
    [].forEach.call(document.querySelectorAll('body *'), function (el) {
      if (ours(el)) return;
      var r = isStuck(el);
      if (!r) return;
      for (var i = 0; i < out.length; i++) if (out[i].el.contains(el)) return;
      out.push({ el: el, r: r });
    });
    return out;
  }

  /* The wide ones are the toolbars; the rest are corner pills.

     Measured against the element's own CONTAINER, not against the window.
     The first version compared to window width and it had a hole in it: with
     Roomy on and the text size up, the module content column narrows, so the
     attention bar came out 986px on an 1850px screen - 53%, just under a 55%
     threshold - and the drawer walked straight past it. Caroline got the
     floating bar back, on exactly the setting she reads in.

     A toolbar spans its container whatever the window is doing. A corner pill
     is a fixed 50-130px however wide the screen gets. That ratio is stable
     where the window ratio is not. */
  /* A bar she types into is page content, not chrome. Moving the infographic
     board's search into the closed drawer left 398 graphics with no way to
     search them, which is how a working feature became an invisible one. */
  function isPageControl(el) {
    if (el.hasAttribute('data-absn-keep')) return true;
    if (el.closest('[data-absn-keep]')) return true;
    /* The bar holding the site-menu button is the way OUT of this page, and
       the drawer was swallowing it on eleven pages: the button that opens
       the menu ended up inside the menu it opens, so the menu could never be
       opened again and every link in it - courses, quizzes, lectures - went
       unreachable. A bar that opens the navigation is navigation. */
    if (el.querySelector('#menuBtn, [aria-controls="side"]')) return true;
    return !!el.querySelector('input, select, textarea');
  }

  function bars() {
    return stuck().filter(function (o) {
      if (isPageControl(o.el)) return false;
      if (o.r.width < MIN_WIDTH) return false;
      var host = o.el.parentElement;
      var hw = host ? host.getBoundingClientRect().width : 0;
      /* a fixed element parented to body: fall back to the viewport */
      if (!hw || host === document.body || host === document.documentElement) {
        hw = window.innerWidth;
      }
      return hw > 0 && o.r.width >= hw * WIDE;
    }).map(function (o) { return o.el; });
  }

  /* ---------- paint the leftovers opaque ------------------------------ */

  function rgba(v) {
    var m = /^rgba?\(([^)]+)\)$/.exec(v || '');
    if (!m) return null;
    var n = m[1].split(',').map(parseFloat);
    if (n.length < 3 || n.some(isNaN)) return null;
    return [n[0], n[1], n[2], n.length > 3 ? n[3] : 1];
  }

  function pageBg() {
    var el = document.body, c;
    while (el) {
      c = rgba(window.getComputedStyle(el).backgroundColor);
      if (c && c[3] > 0) return c;
      el = el.parentElement;
    }
    return [16, 9, 31, 1];
  }

  function solidify() {
    var bg = pageBg();
    [].forEach.call(document.querySelectorAll('body *'), function (el) {
      if (ours(el) || el.getAttribute('data-absn-solid')) return;
      var s = window.getComputedStyle(el);
      if (s.position !== 'sticky' && s.position !== 'fixed') return;
      if (el.getBoundingClientRect().height < MIN_HEIGHT) return;
      var c = rgba(s.backgroundColor);
      if (!c || c[3] >= 1 || c[3] <= 0) return;
      /* below about eighty per cent the see-through is the point */
      if (c[3] < 0.8) return;
      var a = c[3];
      el.setAttribute('data-absn-solid', '1');
      el.style.backgroundColor = 'rgb(' + [0, 1, 2].map(function (i) {
        return Math.round(c[i] * a + bg[i] * (1 - a));
      }).join(',') + ')';
    });
  }

  /* ---------- the drawer ---------------------------------------------- */

  function style() {
    if (document.getElementById('absnDrawerCss')) return;
    var bg = pageBg();
    var solid = 'rgb(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ')';
    var s = document.createElement('style');
    s.id = 'absnDrawerCss';
    /* No backdrop-filter: a blurred layer renders these blocks empty here. */
    s.textContent =
      '#absnDrawer{position:fixed;top:0;right:0;height:100%;z-index:99990;' +
      ' width:min(430px,92vw);overflow-y:auto;overscroll-behavior:contain;' +
      ' background:' + solid + ';border-left:3px solid #9d5cff;' +
      ' box-shadow:-10px 0 34px rgba(0,0,0,.6);' +
      ' padding:16px 14px 90px;' +
      ' transform:translateX(102%);transition:transform .22s ease;' +
      ' visibility:hidden}' +
      '#absnDrawer.' + OPEN + '{transform:none;visibility:visible}' +
      /* Inside the drawer nothing is stuck to anything: these were sticky
         bars, and a sticky bar inside a scrolling panel pins itself to the
         panel and covers the controls below it. */
      '#absnDrawer > *{position:static!important;top:auto!important;' +
      ' left:auto!important;right:auto!important;bottom:auto!important;' +
      ' width:auto!important;max-width:none!important;margin:0 0 12px!important;' +
      ' transform:none!important;z-index:auto!important;' +
      /* These bars were built full-width and carry the padding to match -
         .ple-module-bar has 110px of it. In a 400px drawer that pushes every
         link out of sight, which is how Caroline ended up on a module page
         with no visible way back to the hub. */
      ' padding-left:10px!important;padding-right:10px!important;' +
      ' border-radius:14px!important;display:block!important;' +
      ' overflow:visible!important}' +
      '#absnDrawer > * a,#absnDrawer > * button{max-width:100%!important}' +
      '#absnDrawer h2,#absnDrawer h3{margin-top:0}' +
      '#absnDrawerTitle{font:900 1.02rem/1.3 "Segoe UI",system-ui,sans-serif;' +
      ' color:#e7d9ff;margin:2px 0 10px;padding:0 2px}' +
      /* Always-present way home. It does not depend on any page bar being
         moved here or rendering correctly - it is the one link that must
         never be missing. */
      '#absnDrawerHome{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}' +
      '#absnDrawerHome a{flex:1 1 auto;text-align:center;text-decoration:none;' +
      ' font:900 .95rem/1.2 "Segoe UI",system-ui,sans-serif;color:#fff;' +
      ' padding:12px 14px;border-radius:13px;' +
      ' border:1px solid rgba(255,255,255,.34);' +
      ' background:linear-gradient(135deg,#0b6656,#0f7d6b)}' +
      '#absnDrawerHome a.course{background:linear-gradient(135deg,#52277d,#7c3aed)}' +
      '#absnDrawerHome a:hover{filter:brightness(1.14)}' +
      '#absnDrawerHome a:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
      /* The destinations. The drawer used to be one button in an empty panel on
         any page that had no sticky bars to swallow - the hub itself, mostly. */
      '#absnDrawerGo{margin:0 0 16px}' +
      '#absnDrawerGo .gogrp{margin:0 0 12px}' +
      '#absnDrawerGo .golab{display:block;margin:0 0 6px;' +
      ' font:900 .78rem/1.2 ui-monospace,Consolas,monospace;letter-spacing:.14em;' +
      ' text-transform:uppercase;color:rgba(255,255,255,.62)}' +
      '#absnDrawerGo .gorow{display:flex;flex-wrap:wrap;gap:7px}' +
      '#absnDrawerGo a{flex:1 1 auto;min-width:44%;text-align:left;' +
      ' display:flex;align-items:center;gap:8px;min-height:46px;' +
      ' text-decoration:none;padding:10px 13px;border-radius:12px;' +
      ' font:800 .92rem/1.2 "Segoe UI",system-ui,sans-serif;color:#fff;' +
      ' border:1px solid rgba(255,255,255,.26);' +
      ' background:rgba(255,255,255,.10);overflow-wrap:break-word}' +
      '#absnDrawerGo a:hover{background:rgba(255,255,255,.24)}' +
      '#absnDrawerGo a:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
      '#absnDrawerGo a[aria-current="page"]{' +
      ' background:linear-gradient(135deg,#7c3aed,#9d5cff);' +
      ' border-color:rgba(255,255,255,.6)}' +
      '#absnDrawerGo a .goic{flex:0 0 auto;font-size:1.05rem;line-height:1}' +
      '#absnDrawerGo a[aria-current="true"]{border-color:rgba(255,255,255,.55);' +
      ' background:rgba(157,92,255,.34)}' +
      '.godives>summary{list-style:none;cursor:pointer;display:flex;' +
      ' align-items:center;gap:8px;min-height:46px;padding:11px 13px;' +
      ' border-radius:12px;background:rgba(255,255,255,.10);' +
      ' border:1px solid rgba(255,255,255,.26);color:#fff;' +
      ' font:900 .92rem/1.2 "Segoe UI",system-ui,sans-serif}' +
      '.godives>summary::-webkit-details-marker{display:none}' +
      '.godives>summary::before{content:"\\25B8";color:#ffd76a;font-size:1rem}' +
      '.godives[open]>summary::before{content:"\\25BE"}' +
      '.godives>summary:hover{background:rgba(255,255,255,.24)}' +
      '.godives>summary:focus-visible{outline:3px solid #ffd76a;outline-offset:2px}' +
      '.godives .ddn{margin-left:auto;font:800 .78rem/1.2 ui-monospace,monospace;' +
      ' opacity:.8;letter-spacing:.06em}' +
      '.godives>.gorow{margin-top:7px}' +
      /* The launcher starts top-left and she can drag it anywhere from there.
         It used to sit bottom-left, which is the busiest corner on the site -
         the Skim button and the ADHD toolbar both live down there and landed
         on top of it. */
      /* It used to be pinned to the top-left corner, floating over the page.
         Caroline sent a screenshot of it parked on top of a card and said it
         does not need to be pinned - so it is not. It sits in the page now,
         first thing at the top, and scrolls away with everything else. A
         button that scrolls out of the way cannot cover what she is reading,
         and there is nothing left to drag out of the way either. */
      '#absnDrawerBtn{display:inline-flex;align-items:center;margin:10px 0 4px 10px;' +
      ' min-height:46px;font:900 .95rem/1 "Segoe UI",system-ui,sans-serif;' +
      ' padding:13px 17px;border-radius:999px;cursor:pointer;color:#fff;' +
      ' white-space:nowrap;border:1px solid rgba(255,255,255,.42);' +
      ' box-shadow:0 5px 18px rgba(0,0,0,.6);' +
      ' background:linear-gradient(135deg,#52277d,#7c3aed)}' +
      '#absnDrawerBtn:hover{filter:brightness(1.15)}' +
      '#absnDrawerBtn:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
      /* while the drawer is open the button is the way to shut it, so then
         - and only then - it does follow the screen */
      '#absnDrawerBtn.absn-open{position:fixed;left:10px;top:10px;' +
      ' z-index:99999;margin:0}' +
      '@media print{#absnDrawer,#absnDrawerBtn{display:none}}';
    document.head.appendChild(s);
  }

  function build() {
    if (drawer) return;
    style();
    drawer = document.createElement('aside');
    drawer.id = 'absnDrawer';
    drawer.setAttribute('aria-label', 'Page menu');
    drawer.setAttribute('aria-hidden', 'true');
    var t = document.createElement('div');
    t.id = 'absnDrawerTitle';
    t.textContent = 'Menu';
    drawer.appendChild(t);

    /* the way back, always */
    var home = document.createElement('nav');
    home.id = 'absnDrawerHome';
    home.setAttribute('aria-label', 'Go back');

    /* how deep this page sits, taken from the path this script was loaded
       with - the same trick the robot script uses to find its images */
    var self = document.querySelector('script[src*="absn-hidebar.js"]');
    var up = ((self && self.getAttribute('src')) || '').replace(/absn-hidebar\.js.*$/, '');

    var hub = document.createElement('a');
    hub.href = up + 'index.html';
    hub.textContent = '\u2302 ABSN Study Hub';
    home.appendChild(hub);

    /* and this course's own hub, if the page names one */
    var course = null;
    [].forEach.call(document.querySelectorAll('a'), function (a) {
      if (course) return;
      var txt = (a.textContent || '').trim();
      if (/course hub|back to all/i.test(txt) && a.getAttribute('href')) course = a;
    });
    if (course) {
      var c = document.createElement('a');
      c.className = 'course';
      c.href = course.getAttribute('href');
      c.textContent = '\u2302 Course hub';
      home.appendChild(c);
    }

    drawer.appendChild(home);

    /* ---- pull in the read-aloud buttons ---------------------------------
       absn-speak.js could be a <script> tag on every page instead, but that is
       514 files she would have to upload by hand to change one line. This file
       is already on all of them, and it has already worked out how far up the
       tree the root is, so it is the cheapest place to load it from. */
    if (!document.querySelector('script[src*="absn-speak.js"]')) {
      var sp = document.createElement('script');
      sp.src = up + 'absn-speak.js';
      sp.defer = true;
      document.head.appendChild(sp);
    }

    /* ---- where she might actually want to go -------------------------------
       Built from `up` so the same list works from the root and from a
       subfolder, and it marks the page she is already on. */
    var GO = [
      ['Start here', [
        ['\u2728', 'Super Mega Quiz', 'super-mega-quiz.html'],
        ['\uD83E\uDDE0', 'NCLEX prep', 'nclex-prep.html']
      ]],
      ['This semester', [
        ['\uD83E\uDD30', 'NUR 234 \u00b7 Maternal-Newborn', 'nur234.html'],
        ['\uD83E\uDDF8', 'NUR 235 \u00b7 Peds', 'nur235.html'],
        ['\uD83E\uDE7A', 'NUR 258 \u00b7 Adult Health II', 'nur258.html']
      ]],
      ['Earlier courses', [
        ['\uD83E\uDDF4', 'NUR 125 \u00b7 Fundamentals', '../NUR-125-Fundamentals/index.html'],
        ['\uD83E\uDDE0', 'NUR 175 \u00b7 Mental Health', '../NUR-175-Study-Guide/index.html'],
        ['\uD83E\uDE7A', 'NUR 198 \u00b7 Med-Surg', '../NUR-198-Study-Guide/index.html']
      ]],
      ['Everything else', [
        ['\uD83D\uDC8E', 'Drug guide', '../drug-guide/index.html'],
        ['\uD83C\uDFAE', 'Games', 'games.html'],
        ['\uD83D\uDDBC\uFE0F', 'Infographics', 'infographics.html'],
        ['\uD83E\uDDEA', 'Labs & diagnostics', '../Laboratory-and-Diagnostic-Tests-for-Nursing/index.html'],
        ['\uD83D\uDC51', 'Leadership, community & ethics', 'leadership-community-ethics.html'],
        ['\uD83E\uDD66', 'Nutrition', 'nutrition.html'],
        ['\uD83E\uDDEC', 'Pathophysiology', 'pathophysiology.html'],
        ['\uD83D\uDC8A', 'Pharmacology', 'pharmacology.html'],
        ['\u2699\uFE0F', 'Physiology', 'physiology.html'],
        ['\uD83C\uDFA7', 'Podcasts', 'podcasts.html'],
        ['\uD83D\uDCC5', 'Study plan', 'study-plan.html']
      ]]
    ];
    /* Twelve topic libraries. Listed flat they double the length of the menu she
       scrolls past every time, so they go behind one tap instead. */
    var DIVES = [
      ['\uD83E\uDD30', 'Maternal & newborn', 'maternal-newborn.html'],
      ['\uD83E\uDDF8', 'Pediatrics', 'pediatrics.html', 'peds'],
      ['\u2764\uFE0F', 'Cardiovascular', 'cardio/index.html'],
      ['\uD83E\uDD8B', 'Endocrine', 'endo/index.html'],
      ['\u2728', 'Essentials & rhythms', 'essentials/index.html'],
      ['\uD83C\uDF5C', 'GI & abdomen', 'gi/index.html'],
      ['\uD83E\uDDE0', 'Mental health', 'mh/index.html'],
      ['\uD83E\uDDB4', 'Musculoskeletal', 'musc/index.html'],
      ['\u26A1', 'Neuro', 'neuro/index.html'],
      ['\uD83E\uDE7A', 'Nursing core', 'core/index.html'],
      ['\uD83D\uDC8A', 'Pharmacology', 'pharm/index.html'],
      ['\uD83E\uDEE7', 'Renal & fluid', 'renal/index.html'],
      ['\uD83E\uDEC1', 'Respiratory & labs', 'resp/index.html'],
      ['\uD83E\uDE79', 'Skin & wound', 'skin/index.html']
    ];

    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var herePath = location.pathname.toLowerCase();

    function linkFor(item) {
      var a = document.createElement('a');
      a.href = up + item[2];
      a.innerHTML = '<span class="goic" aria-hidden="true">' + item[0] + '</span>' +
                    '<span>' + item[1] + '</span>';
      var tail = item[2].toLowerCase();
      /* a front door counts as "you are here" for the folder it gathers, so the
         menu still tells her where she is when she is deep inside one */
      var folder = item[3] || (tail.indexOf('/index.html') > -1 && tail.indexOf('..') !== 0
                               ? tail.split('/')[0] : '');
      if (tail === here) a.setAttribute('aria-current', 'page');
      else if (folder && herePath.indexOf('/' + folder + '/') > -1) {
        a.setAttribute('aria-current', 'true');
      }
      return a;
    }
    function rowOf(items) {
      var row = document.createElement('div');
      row.className = 'gorow';
      items.forEach(function (it) { row.appendChild(linkFor(it)); });
      return row;
    }

    var go = document.createElement('nav');
    go.id = 'absnDrawerGo';
    go.setAttribute('aria-label', 'Go to');
    GO.forEach(function (grp) {
      var box = document.createElement('div');
      box.className = 'gogrp';
      var lab = document.createElement('span');
      lab.className = 'golab';
      lab.textContent = grp[0];
      box.appendChild(lab);
      box.appendChild(rowOf(grp[1]));
      go.appendChild(box);
    });

    var dd = document.createElement('details');
    dd.className = 'gogrp godives';
    var sum = document.createElement('summary');
    sum.innerHTML = 'Deep dives <span class="ddn">' + DIVES.length + ' topic libraries</span>';
    dd.appendChild(sum);
    dd.appendChild(rowOf(DIVES));
    /* if she is already inside one, it should be open when she gets here */
    if (DIVES.some(function (d) {
      var f = d[3] || d[2].split('/')[0];
      return herePath.indexOf('/' + f + '/') > -1;
    })) dd.open = true;
    go.appendChild(dd);

    drawer.appendChild(go);

    document.body.appendChild(drawer);

    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'absnDrawerBtn';
    btn.setAttribute('aria-controls', 'absnDrawer');
    btn.addEventListener('click', function () {
      if (btn.dataset.absnDragged === '1') { btn.dataset.absnDragged = ''; return; }
      set(!open);
    });
    /* first thing in the page, after any skip-to-content link */
    var first = document.body.firstElementChild;
    while (first && /^(script|style|template)$/i.test(first.tagName)) {
      first = first.nextElementSibling;
    }
    if (first && first.className && /skip/i.test(String(first.className))) {
      first = first.nextElementSibling;
    }
    if (first) document.body.insertBefore(btn, first);
    else document.body.appendChild(btn);
    paint();
    /* A position she dragged it to in the old pinned version would strand it
       off in a corner now that it lives in the page. */
    try { localStorage.removeItem(POSKEY); } catch (e) {}
    window.addEventListener('resize', function () {
      setTimeout(function () { fitToRoom(); paint(); if (!savedPos()) place(); else place(); }, 80);
    });
    /* She reads with the page magnified, and browser zoom fires no resize in
       every browser - the visual viewport does. */
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', function () {
        setTimeout(function () { fitToRoom(); paint(); place(); }, 80);
      });
    }
    /* Step back while she reads, come forward the moment she reaches for it. */
    (function () {
      var t = null;
      function wake() {
        btn.classList.remove('absn-idle');
        clearTimeout(t);
        t = setTimeout(function () {
          if (!open) btn.classList.add('absn-idle');
        }, 2200);
      }
      ['scroll', 'pointermove', 'pointerdown', 'keydown'].forEach(function (ev) {
        window.addEventListener(ev, wake, { passive: true });
      });
      btn.addEventListener('focus', wake);
      wake();
    })();
    window.addEventListener('orientationchange', function () { setTimeout(place, 200); });
  }

  /* Where she last dropped it. One key, guarded - a browser that refuses
     storage should still give her a working button, just one that starts in
     the corner every time. */
  var POSKEY = 'absn-menu-pos-v1';

  function savedPos() {
    try {
      var v = JSON.parse(localStorage.getItem(POSKEY) || 'null');
      if (v && typeof v.x === 'number' && typeof v.y === 'number') return v;
    } catch (e) {}
    return null;
  }
  function savePos(x, y) {
    try { localStorage.setItem(POSKEY, JSON.stringify({ x: x, y: y })); } catch (e) {}
  }

  /* Keep it on screen. Called on load, after a drag, and on resize and
     rotate, so a button dropped near an edge on a wide screen cannot end up
     stranded outside a narrow one. */
  /* Top-left is not empty everywhere: nur234, nur235 and nur258 each carry a
     sticky bar with their own Menu button in exactly that corner. Step below
     whatever is already parked there, but only until she picks a spot herself -
     after that her choice wins and this never runs again. */
  /* How much empty room sits to the left of the page's own content column.
     On a laptop at normal zoom that is 130px of nothing, which is exactly
     where a launcher belongs: reachable, and on top of no words at all.
     Magnified, the column fills the window and this returns 0. */
  function leftGutter() {
    var main = document.querySelector('main') || document.body;
    var r = main.getBoundingClientRect();
    var left = r.left;
    /* a hero or bar that runs full-bleed must not count as content here */
    return left > 0 && left < window.innerWidth * 0.4 ? left : 0;
  }

  /* Wide enough for the pill -> stay a pill and sit in the gutter.
     Not wide enough -> shrink to a circle so it covers a 48px square
     rather than a 220px bar across whatever she is reading. */
  function fitToRoom() {
    if (!PINNED) return;
    if (!btn) return;
    var g = leftGutter();
    var compact = g < 122;              /* 110 pill + 6px each side */
    btn.classList.toggle('absn-compact', compact);
    return compact ? 0 : g;
  }


  /* ---- the floating tool panels ------------------------------------- *
     #adhdStudyTools and .ple-tools are pinned bottom-right, up to 620px
     wide and about 107px tall. They hold a search box, so isPageControl
     keeps them out of the drawer - correct, but it left them sitting on
     the page. Magnified they are big, and Caroline photographed one lying
     across the text on 50 pages.

     So they collapse. A 48px launcher sits in the corner instead, and the
     panel appears only when she asks for it. Nothing is moved, nothing is
     copied - the same nodes stay where the page scripts expect them, they
     are just hidden until wanted. */
  function tuckTools() {
    var panels = [].slice.call(
      document.querySelectorAll('#adhdStudyTools, .ple-tools')
    ).filter(function (el) {
      var cs = window.getComputedStyle(el);
      return cs.position === 'fixed' || cs.position === 'sticky';
    });
    if (!panels.length || document.getElementById('absnTuckBtn')) return;

    var st = document.createElement('style');
    st.textContent =
      '#adhdStudyTools.absn-tucked,.ple-tools.absn-tucked{display:none!important}' +
      '#absnTuckBtn{position:fixed;right:12px;bottom:12px;z-index:2147482100;' +
      ' min-width:48px;min-height:48px;display:inline-flex;align-items:center;' +
      ' justify-content:center;gap:7px;padding:11px 14px;border-radius:999px;' +
      ' font:900 1.05rem/1 "Segoe UI",system-ui,sans-serif;color:#fff;cursor:pointer;' +
      ' border:1px solid rgba(255,255,255,.42);box-shadow:0 5px 18px rgba(0,0,0,.6);' +
      ' background:linear-gradient(135deg,#0d675d,#12b886)}' +
      '#absnTuckBtn:hover{filter:brightness(1.15)}' +
      '#absnTuckBtn:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
      '@media print{#absnTuckBtn{display:none}}';
    document.head.appendChild(st);

    var open = false;
    var tb = document.createElement('button');
    tb.type = 'button';
    tb.id = 'absnTuckBtn';
    tb.setAttribute('aria-expanded', 'false');
    function paintTuck() {
      panels.forEach(function (el) { el.classList.toggle('absn-tucked', !open); });
      tb.innerHTML = open ? '&#10005;' : '&#129520;';
      tb.setAttribute('aria-label', open ? 'Hide the study tools' : 'Show the study tools');
      tb.title = tb.getAttribute('aria-label');
      tb.setAttribute('aria-expanded', String(open));
    }
    tb.addEventListener('click', function () { open = !open; paintTuck(); });
    document.body.appendChild(tb);
    paintTuck();
  }

  function defaultPos() {
    if (!PINNED) return;
    var pos = { x: 10, y: 10 };
    if (!btn) return pos;
    var g = fitToRoom();
    paint();                 /* the words go the moment it becomes a circle */
    if (g) {
      var bw = btn.getBoundingClientRect().width || 110;
      pos.x = Math.max(6, Math.round((g - bw) / 2));
    }
    var mine = btn.getBoundingClientRect();
    var w = mine.width || 110;
    [].forEach.call(document.querySelectorAll('body *'), function (el) {
      if (el === btn || ours(el)) return;
      var st = window.getComputedStyle(el);
      if (st.position !== 'fixed' && st.position !== 'sticky') return;
      if (st.visibility === 'hidden' || st.display === 'none' || +st.opacity === 0) return;
      var r = el.getBoundingClientRect();
      if (r.height < 20 || r.height > 220) return;      /* a bar, not a backdrop */
      if (r.top > window.innerHeight * 0.4) return;      /* upper part only */
      if (r.bottom <= pos.y) return;
      if (r.left > pos.x + w || r.right < pos.x) return; /* shares our column? */
      pos.y = Math.round(r.bottom) + 8;
    });
    return pos;
  }

  function place(x, y) {
    if (!PINNED) return;
    if (!btn) return;
    var pos = (typeof x === 'number') ? { x: x, y: y } : savedPos();
    var r = btn.getBoundingClientRect();
    var w = r.width || 110, h = r.height || 46, pad = 6;
    if (!pos) { pos = defaultPos(); }
    pos.x = Math.max(pad, Math.min(window.innerWidth - w - pad, pos.x));
    pos.y = Math.max(pad, Math.min(window.innerHeight - h - pad, pos.y));
    btn.style.left = Math.round(pos.x) + 'px';
    btn.style.top = Math.round(pos.y) + 'px';
    btn.style.right = 'auto';
    btn.style.bottom = 'auto';
    return pos;
  }

  /* Pointer events cover mouse, touch and pen in one path. The 6px threshold
     is what keeps a tap a tap: below it nothing moves and the click handler
     runs normally; above it the button follows her finger and the click that
     the browser fires on release is swallowed. */
  function makeDraggable() {
    if (!PINNED) return;
    if (!btn) return;
    var startX = 0, startY = 0, baseX = 0, baseY = 0, dragging = false, live = false;

    btn.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return;
      var r = btn.getBoundingClientRect();
      baseX = r.left; baseY = r.top;
      startX = e.clientX; startY = e.clientY;
      live = true; dragging = false;
      btn.setPointerCapture && btn.setPointerCapture(e.pointerId);
    });

    btn.addEventListener('pointermove', function (e) {
      if (!live) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (!dragging && Math.abs(dx) + Math.abs(dy) < 6) return;
      if (!dragging) { dragging = true; btn.classList.add('absn-dragging'); }
      e.preventDefault();
      place(baseX + dx, baseY + dy);
    });

    function drop(e) {
      if (!live) return;
      live = false;
      btn.releasePointerCapture && e.pointerId != null &&
        btn.hasPointerCapture && btn.hasPointerCapture(e.pointerId) &&
        btn.releasePointerCapture(e.pointerId);
      if (!dragging) return;
      btn.classList.remove('absn-dragging');
      /* tell the click handler this was a drag, not a press */
      btn.dataset.absnDragged = '1';
      var p = place(btn.getBoundingClientRect().left, btn.getBoundingClientRect().top);
      if (p) savePos(p.x, p.y);
      dragging = false;
    }
    btn.addEventListener('pointerup', drop);
    btn.addEventListener('pointercancel', drop);

    /* Dragged onto the keyboard is still reachable: arrow keys nudge it, and
       the position is kept the same way. */
    btn.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 24 : 6, r = btn.getBoundingClientRect(), moved = true;
      if (e.key === 'ArrowLeft') place(r.left - step, r.top);
      else if (e.key === 'ArrowRight') place(r.left + step, r.top);
      else if (e.key === 'ArrowUp') place(r.left, r.top - step);
      else if (e.key === 'ArrowDown') place(r.left, r.top + step);
      else moved = false;
      if (moved) {
        e.preventDefault();
        var n = btn.getBoundingClientRect();
        savePos(n.left, n.top);
      }
    });
  }

  function paint() {
    var tight = btn.classList.contains('absn-compact');
    btn.textContent = open ? (tight ? '✕' : '✕ Close menu') : (tight ? '☰' : '☰ Menu');
    /* The words go when it is a circle, so the button still has to say what it
       is to a screen reader - and the title tells her she can move it. */
    btn.setAttribute('aria-label', open ? 'Put the menu away' : 'Show the page controls');
    btn.title = (open ? 'Put the menu away' : 'Show the page controls') +
                ' - drag it anywhere, or use the arrow keys';
    btn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
  }

  function set(v) {
    open = v;
    drawer.classList.toggle(OPEN, open);
    /* Unpinned, the button scrolls with the page - which means that once the
       drawer slides over it there is nothing left to press to shut it again.
       So while the drawer is open, and only then, the button follows the
       screen and sits above it. */
    if (btn) btn.classList.toggle('absn-open', open);
    paint();
  }

  /* Move every wide bar into the drawer, remembering where it came from so
     it can go home if this ever needs undoing. */
  function collect() {
    var moved = 0;
    bars().forEach(function (el) {
      if (drawer.contains(el)) return;
      el.setAttribute('data-absn-home', '1');
      drawer.appendChild(el);
      moved++;
    });
    return moved;
  }

  function go() {
    build();
    place();
    tuckTools();
    var n = collect();
    solidify();
    /* Nothing to put in it and nothing to show: an empty drawer with a
       button that opens onto blank space is worse than no button. */
    var has = drawer.children.length > 1;
    btn.style.display = has ? '' : 'none';
    return n;
  }

  /* The module scripts inject their bars long after this runs, and some of
     them re-inject on interaction. Watch for it rather than guessing at
     timings. */
  function watch() {
    if (!window.MutationObserver) return;
    var pending = null;
    new MutationObserver(function (recs) {
      for (var i = 0; i < recs.length; i++) {
        var added = recs[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          if (added[j].nodeType !== 1 || ours(added[j])) continue;
          clearTimeout(pending);
          pending = setTimeout(go, 120);
          return;
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  function boot() { go(); setTimeout(go, 300); watch(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () { setTimeout(go, 200); });
  /* Escape closes it, the way every other panel on the web does. */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) set(false);
  });
})();

/* ---------------------------------------------------------------------------
   Keep keyboard focus out of anything marked aria-hidden.

   The site menu is a slide-out panel: when it is shut it sits off the left
   edge with aria-hidden="true". A screen reader honours that and skips it,
   but Tab did not - pressing Tab on any page walked focus through six
   controls she could not see ("Close this menu" and the five Exam links),
   with the focus ring drawn somewhere off the side of the screen. Focus
   simply vanished. That is also an outright ARIA violation: you must never
   be able to focus something you have told assistive tech is not there.

   `inert` fixes both halves at once - it drops the subtree out of the tab
   order and out of the accessibility tree. Applying it here rather than in
   each panel's own code means every aria-hidden region on the site is
   covered, including any added later.
   --------------------------------------------------------------------------- */
(function () {
  if (!('inert' in HTMLElement.prototype)) return;   /* very old browser: leave as-is */

  function sync(el) {
    var hide = el.getAttribute('aria-hidden') === 'true';
    if (el.inert !== hide) el.inert = hide;
  }

  function sweep(root) {
    var list = (root || document).querySelectorAll('[aria-hidden]');
    for (var i = 0; i < list.length; i++) {
      /* Decorative icons carry aria-hidden too and hold nothing focusable;
         marking those inert is harmless but pointless, so skip them. */
      var el = list[i];
      if (el.getAttribute('aria-hidden') === 'true' &&
          !el.querySelector('a[href],button,summary,input,select,textarea,[tabindex]')) continue;
      sync(el);
    }
  }

  function start() {
    sweep();
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var r = records[i];
        if (r.type === 'attributes') sync(r.target);
        else sweep();
      }
    }).observe(document.documentElement, {
      subtree: true, childList: true,
      attributes: true, attributeFilter: ['aria-hidden']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else { start(); }
})();
