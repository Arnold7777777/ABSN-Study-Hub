/* absn-hidebar.js - get the toolbars out of the way.

   Module pages stack sticky bars at the top: the module nav, the text-size
   controls, the One-bite / Spotlight bar, the section jump links. At
   Caroline's text size that stack fills more than half the screen, so the
   page she came to read starts below the fold.

   This adds one small button that folds all of them away and unfolds them
   again, and remembers the choice - someone who wants the bars gone wants
   them gone on the next page too.

   The bars are found by asking the browser which elements are actually
   stuck to the viewport, not by a list of class names. Three page families
   here use three different sets of names (.ple-module-bar, #adhdStudyTools,
   #navBtns, .focusbar, a bare <nav>), and a name list would miss whichever
   family it was not written for. They are also re-found on every click,
   because absn-focus.js and absn-adhd-enhanced.js inject their bars after
   this script has run.

   There are two buttons, and the second one is the important one.

   The first sits bottom-left, away from the corner nav pills, and is
   deliberately small: it is the one control that must never be hidden by the
   thing it hides, so it lives outside the bars and stays put.

   That was the whole feature at first, and it was not enough. Someone who
   wants the top menu gone looks at the top menu for the way to close it -
   not at the far bottom corner of the screen. So the second button is a pill
   INSIDE the top bar, reading '✕ Hide menu', in among that bar's own
   controls. It disappears along with the bar it closes, which is correct:
   at that point the bottom-left button is the way back, and it now says
   '☰ Show menu' in the same place it always was.

   It also stops the bars being see-through. They were built at alpha .96
   and .98, which sounds opaque and is not: the page slides underneath and
   leaves ghost text lying across the buttons. Two percent of white on a
   near-black bar is faint on a small screen and perfectly legible on a large
   one at large type, which is exactly how Caroline reads. Each bar is
   repainted in the colour it ALREADY appears to be - its own colour
   composited over the page background - so nothing changes except that you
   can no longer see through it. Bars under about eighty per cent alpha are
   left alone: at that point the translucency is deliberate, not a near miss.
*/
(function () {
  'use strict';

  var KEY = 'absn-bars-hidden';
  var MIN_HEIGHT = 26;      /* leave the small corner pills alone */

  function stuck() {
    var out = [];
    var vh = window.innerHeight || document.documentElement.clientHeight;
    [].forEach.call(document.querySelectorAll('body *'), function (el) {
      if (el.id === 'absnHideBtn') return;
      var s = window.getComputedStyle(el);
      if (s.position !== 'sticky' && s.position !== 'fixed') return;
      if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) return;
      var r = el.getBoundingClientRect();
      if (r.height < MIN_HEIGHT) return;
      /* Skip-to-content links are fixed, full height, and parked off the top
         of the screen until they are focused - .ple-module-skip sits at -108.
         They are not toolbars, they are not in her way, and hiding one takes
         away the keyboard shortcut into the page. Anything not actually on
         screen is not a bar. */
      if (r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= window.innerWidth) return;
      /* a stuck element inside another stuck element is already covered */
      for (var i = 0; i < out.length; i++) if (out[i].contains(el)) return;
      out.push(el);
    });
    return out;
  }

  /* 'rgba(4, 8, 24, 0.96)' -> [4,8,24,0.96]; anything else -> null */
  function rgba(v) {
    var m = /^rgba?\(([^)]+)\)$/.exec(v || '');
    if (!m) return null;
    var n = m[1].split(',').map(function (x) { return parseFloat(x); });
    if (n.length < 3 || n.some(isNaN)) return null;
    return [n[0], n[1], n[2], n.length > 3 ? n[3] : 1];
  }

  /* whatever is actually behind the bars */
  function pageBg() {
    var el = document.body, c;
    while (el) {
      c = rgba(window.getComputedStyle(el).backgroundColor);
      if (c && c[3] > 0) return c;
      el = el.parentElement;
    }
    return [0, 0, 0, 1];
  }

  /* Everything worth repainting. Deliberately NOT the same list as stuck():
     the slide-out quiz drawer is parked off the left edge and so is not a bar
     in anyone's way, but the moment it slides open the page shows straight
     through it. Painting it now costs nothing and saves that. */
  function paintable() {
    var out = [];
    [].forEach.call(document.querySelectorAll('body *'), function (el) {
      if (el.id === 'absnHideBtn') return;
      var s = window.getComputedStyle(el);
      if (s.position !== 'sticky' && s.position !== 'fixed') return;
      if (s.visibility === 'hidden' || s.display === 'none') return;
      if (el.getBoundingClientRect().height < MIN_HEIGHT) return;
      out.push(el);
    });
    return out;
  }

  /* Repaint a translucent bar as the flat colour it already looks like.
     src over dst, which is what the browser was drawing anyway - so this is
     the same pixel, minus the page showing through it. */
  function solidify(bars) {
    var bg = pageBg();
    bars.forEach(function (el) {
      if (el.getAttribute('data-absn-solid')) return;
      var c = rgba(window.getComputedStyle(el).backgroundColor);
      if (!c || c[3] >= 1 || c[3] <= 0) return;   /* already solid, or no fill */
      /* Below about eighty per cent the see-through is the point - a scrim
         behind the corner pills is meant to let the page show. Only the bars
         that were TRYING to be opaque and missed get repainted. */
      if (c[3] < 0.8) return;
      var a = c[3];
      var mix = [0, 1, 2].map(function (i) {
        return Math.round(c[i] * a + bg[i] * (1 - a));
      });
      el.setAttribute('data-absn-solid', '1');
      el.style.backgroundColor = 'rgb(' + mix.join(',') + ')';
    });
  }

  function style() {
    if (document.getElementById('absnHideCss')) return;
    var s = document.createElement('style');
    s.id = 'absnHideCss';
    /* No backdrop-filter: blurred layers render these blocks empty here. */
    s.textContent =
      '#absnHideBtn{position:fixed;left:10px;bottom:10px;z-index:99991;' +
      ' font:900 .86rem/1 "Segoe UI",system-ui,sans-serif;padding:10px 13px;' +
      ' border-radius:999px;cursor:pointer;color:#fff;white-space:nowrap;' +
      ' border:1px solid rgba(255,255,255,.36);box-shadow:0 4px 16px rgba(0,0,0,.55);' +
      ' background:linear-gradient(135deg,#5a2d82,#9d5cff)}' +
      '#absnHideBtn:hover{filter:brightness(1.15)}' +
      '#absnHideBtn:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
      /* the same pill again, but living inside the bar it closes */
      '.absnHideInBar{font:900 .86rem/1 "Segoe UI",system-ui,sans-serif;' +
      ' padding:9px 13px;border-radius:999px;cursor:pointer;color:#fff;' +
      ' white-space:nowrap;align-self:center;position:relative;z-index:2;' +
      ' margin:0 8px 0 0;' +
      ' border:1px solid rgba(255,255,255,.42);' +
      ' background:linear-gradient(135deg,#8a1d4e,#e0356f)}' +
      '.absnHideInBar:hover{filter:brightness(1.15)}' +
      '.absnHideInBar:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
      '@media print{#absnHideBtn,.absnHideInBar{display:none}}';
    document.head.appendChild(s);
  }

  function read() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {}
  }

  var hidden = [];

  function apply(off) {
    if (off) {
      hidden = stuck();
      hidden.forEach(function (el) {
        el.setAttribute('data-absn-was', el.style.display || '');
        el.style.display = 'none';
      });
    } else {
      hidden.forEach(function (el) {
        el.style.display = el.getAttribute('data-absn-was') || '';
        el.removeAttribute('data-absn-was');
      });
      hidden = [];
      /* anything injected while the bars were folded away */
      [].forEach.call(document.querySelectorAll('[data-absn-was]'), function (el) {
        el.style.display = el.getAttribute('data-absn-was') || '';
        el.removeAttribute('data-absn-was');
      });
    }
  }

  function go() {
    style();                                  /* the pill styles, always */
    solidify(paintable());                    /* safe to run again; it marks its own */
    var bars = stuck();
    if (document.getElementById('absnHideBtn')) return;
    if (!bars.length) return;                 /* nothing to hide on this page */

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'absnHideBtn';
    var off = false;

    function paint() {
      btn.textContent = off ? '☰ Show menu' : '✕ Hide menu';
      btn.setAttribute('aria-pressed', String(off));
      btn.title = off ? 'Bring the toolbars back' : 'Fold the toolbars away';
    }

    function toggle() {
      off = !off;
      apply(off);
      write(off);
      paint();
    }

    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);

    /* And one in the top bar itself, which is where someone looks for it.
       Bars in the order they actually sit on the screen, not the order the
       scripts happened to inject them in. */
    var byTop = bars.slice().sort(function (a, b) {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });

    if (!document.querySelector('.absnHideInBar')) {
      var inbar = document.createElement('button');
      inbar.type = 'button';
      inbar.className = 'absnHideInBar';
      inbar.textContent = '\u2715 Hide menu';
      inbar.title = 'Fold the toolbars away';
      inbar.addEventListener('click', toggle);

      /* Try each bar from the top down and keep the first one where the button
         can actually be clicked.

         A button that is present, visible and covered is worse than no button
         at all - she presses it, nothing happens, and the feature looks broken.
         That is not hypothetical: at the right-hand end of a bar it landed
         under the corner nav pills, which are fixed and float above
         everything, and on the section index pages a <header> covers the top
         bar outright. Rather than keep a list of which layout does what, ask
         the browser what is on top and move on if the answer is not us.

         First in the bar rather than last, for the same reason. */
      for (var i = 0; i < byTop.length; i++) {
        byTop[i].insertBefore(inbar, byTop[i].firstChild);
        var r = inbar.getBoundingClientRect();
        var hit = r.width && r.height &&
          document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        if (hit && (hit === inbar || inbar.contains(hit))) break;
        inbar.parentNode.removeChild(inbar);   /* covered - try the next bar */
      }
      /* Every bar covered: leave it out. The bottom-left button still works,
         and it is never underneath anything. */
    }

    if (read()) { off = true; apply(true); }
    paint();
  }

  /* the bars are injected by deferred scripts, so wait for them to land */
  function boot() { setTimeout(go, 60); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () {
    setTimeout(go, 120);
    /* the deferred scripts add their own bars well after load */
    setTimeout(function () { solidify(paintable()); }, 700);
  });
})();
