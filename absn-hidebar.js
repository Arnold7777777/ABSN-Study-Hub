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
  function bars() {
    return stuck().filter(function (o) {
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
      ' border-radius:14px!important;display:block!important}' +
      '#absnDrawer h2,#absnDrawer h3{margin-top:0}' +
      '#absnDrawerTitle{font:900 1.02rem/1.3 "Segoe UI",system-ui,sans-serif;' +
      ' color:#e7d9ff;margin:2px 0 14px;padding:0 2px}' +
      /* the launcher, bottom left, away from the corner nav pills */
      '#absnDrawerBtn{position:fixed;left:10px;bottom:10px;z-index:99993;' +
      ' transition:bottom .12s ease;' +
      ' font:900 .95rem/1 "Segoe UI",system-ui,sans-serif;padding:13px 17px;' +
      ' border-radius:999px;cursor:pointer;color:#fff;white-space:nowrap;' +
      ' border:1px solid rgba(255,255,255,.42);' +
      ' box-shadow:0 5px 18px rgba(0,0,0,.6);' +
      ' background:linear-gradient(135deg,#5a2d82,#9d5cff)}' +
      '#absnDrawerBtn:hover{filter:brightness(1.15)}' +
      '#absnDrawerBtn:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
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
    document.body.appendChild(drawer);

    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'absnDrawerBtn';
    btn.setAttribute('aria-controls', 'absnDrawer');
    btn.addEventListener('click', function () { set(!open); });
    document.body.appendChild(btn);
    paint();
    nudge();
    setTimeout(nudge, 400);
    setTimeout(nudge, 1200);
    window.addEventListener('resize', function () { setTimeout(nudge, 80); });
  }

  /* Some pages already keep a button in the bottom-left corner - nur234,
     nur235 and nur258 all carry a draggable "skim" button that parks itself
     at left:12px bottom:12px, which is exactly where the launcher goes. The
     two sat on top of each other.

     Rather than hard-code an offset per page, look at what is actually fixed
     down there and sit above the highest thing that is not ours. The skim
     button can be dragged, so this is re-run on resize and after the page
     has settled. */
  function nudge() {
    if (!btn) return;
    btn.style.bottom = '10px';
    var mine = btn.getBoundingClientRect();
    var vh = window.innerHeight, floor = vh - 10, moved = false;
    [].forEach.call(document.querySelectorAll('body *'), function (el) {
      if (el === btn || ours(el)) return;
      var st = window.getComputedStyle(el);
      if (st.position !== 'fixed') return;
      if (st.visibility === 'hidden' || st.display === 'none' || +st.opacity === 0) return;
      var r = el.getBoundingClientRect();
      if (r.width < 20 || r.height < 20 || r.width > 420) return;
      if (r.left > window.innerWidth * 0.5) return;      /* left-hand side only */
      if (r.bottom < vh * 0.55) return;                  /* lower part only */
      /* does it share our column? */
      if (Math.min(mine.right, r.right) - Math.max(mine.left, r.left) <= 0) return;
      if (r.top < floor) { floor = r.top; moved = true; }
    });
    if (moved) btn.style.bottom = Math.round(vh - floor + 10) + 'px';
  }

  function paint() {
    btn.textContent = open ? '✕ Close menu' : '☰ Menu';
    btn.title = open ? 'Put the menu away' : 'Show the page controls';
    btn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
  }

  function set(v) {
    open = v;
    drawer.classList.toggle(OPEN, open);
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
    nudge();
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
