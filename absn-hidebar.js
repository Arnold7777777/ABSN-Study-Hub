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

   The button sits bottom-left, away from the corner nav pills, and is
   deliberately small: it is the one control that must never be hidden by
   the thing it hides.
*/
(function () {
  'use strict';

  var KEY = 'absn-bars-hidden';
  var MIN_HEIGHT = 26;      /* leave the small corner pills alone */

  function stuck() {
    var out = [];
    [].forEach.call(document.querySelectorAll('body *'), function (el) {
      if (el.id === 'absnHideBtn') return;
      var s = window.getComputedStyle(el);
      if (s.position !== 'sticky' && s.position !== 'fixed') return;
      if (el.getBoundingClientRect().height < MIN_HEIGHT) return;
      /* a stuck element inside another stuck element is already covered */
      for (var i = 0; i < out.length; i++) if (out[i].contains(el)) return;
      out.push(el);
    });
    return out;
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
      '@media print{#absnHideBtn{display:none}}';
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
    if (document.getElementById('absnHideBtn')) return;
    if (!stuck().length) return;              /* nothing to hide on this page */
    style();

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'absnHideBtn';
    var off = false;

    function paint() {
      btn.textContent = off ? '☰ Show menu' : '✕ Hide menu';
      btn.setAttribute('aria-pressed', String(off));
      btn.title = off ? 'Bring the toolbars back' : 'Fold the toolbars away';
    }

    btn.addEventListener('click', function () {
      off = !off;
      apply(off);
      write(off);
      paint();
    });

    document.body.appendChild(btn);

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
  window.addEventListener('load', function () { setTimeout(go, 120); });
})();
