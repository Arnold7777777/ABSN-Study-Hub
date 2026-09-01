/* absn-diagrams.js — keep diagram labels readable on a phone.
   A wide SVG squeezed into a 358px card renders its 14px labels at ~5px.
   Rather than enlarge the type inside the drawing (which re-introduces the
   label collisions we spent a whole pass fixing), give the diagram its own
   sideways-scrolling box and let it render big enough that the smallest
   label clears 12px. Nothing else on the page moves sideways. */
(function () {
  var FLOOR = 12;      // px — her minimum readable size
  /* 19 of 403 diagrams on the condition pages still render their smallest
     label under 12px, and 14 of those need somewhere between 1200 and 1800px
     to clear it - widths HARD_MAX already allows. The multiplier was the
     binding constraint, not the hard cap: at 320px a card gives a diagram
     ~256px, and 4.6x stops at ~1180. 7x reaches the cap. */
  var MAX_WIDEN = 7;     // ceiling, so a diagram never becomes an endless canvas
  var HARD_MAX = 1800;   // px

  function css() {
    if (document.getElementById('absnDzCss')) return;
    var s = document.createElement('style');
    s.id = 'absnDzCss';
    s.textContent =
      '.dzbox{max-width:100%;overflow-x:auto;overflow-y:hidden;' +
      '-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;' +
      'border-radius:12px;scrollbar-width:thin}' +
      '.dzbox>svg{display:block;max-width:none!important;height:auto}' +
      '.dzhint{margin:3px 0 10px;font:800 .78rem/1.3 "Trebuchet MS",Verdana,sans-serif;' +
      'color:#ffd76a;opacity:.92}' +
      '.dzbox::-webkit-scrollbar{height:9px}' +
      '.dzbox::-webkit-scrollbar-thumb{background:rgba(255,255,255,.42);border-radius:9px}' +
      '.tzbox{max-width:100%;overflow-x:auto;overflow-y:hidden;' +
      '-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;scrollbar-width:thin}' +
      '.tzbox>table{max-width:none}' +
      '.tzbox::-webkit-scrollbar{height:9px}' +
      '.tzbox::-webkit-scrollbar-thumb{background:rgba(255,255,255,.42);border-radius:9px}' +
      /* Citation and cross-reference links are inline text about 16-19px
         tall - well under the 44px she needs to hit one on a phone. Grow
         the hit area with an overlay instead of padding: padding would
         push the citation lines apart and fragment across a line wrap,
         and this leaves the reading layout untouched. These selectors are
         defined inline on the pages themselves, so the rule has to come
         from the one script every page loads. */
      '.src a,.xref a{position:relative;display:inline-block;max-width:100%}' +
      '.src a::after,.xref a::after{content:"";position:absolute;left:-4px;right:-4px;' +
      'top:50%;transform:translateY(-50%);height:44px}' +
      /* Two non-wrapping flex rows. The .ccc chip chain ("WHAT IT IS - TYPES -
         STAGES - CARE") runs 334-412px and the .sec-h step label runs to 367px,
         both on a 320px screen inside overflow:visible parents - so the last
         chip and the end of the label were simply unreachable. Letting them
         wrap costs a line and loses nothing. These are inline styles on 323 and
         337 pages respectively, so the rule comes from here; appended to head,
         it wins on equal specificity. */
      '.ccc{flex-wrap:wrap}' +
      '.sec-h{flex-wrap:wrap}';
    document.head.appendChild(s);
  }

  function smallestLabel(svg) {
    var min = Infinity;
    var nodes = svg.querySelectorAll('text,tspan');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (!n.textContent || !n.textContent.trim()) continue;
      if (n.getComputedTextLength && !n.getComputedTextLength()) continue;
      var f = parseFloat(getComputedStyle(n).fontSize);
      if (f > 0 && f < min) min = f;
    }
    return min;
  }

  function scrollsAlready(el) {
    for (var p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      var ox = getComputedStyle(p).overflowX;
      if (ox === 'auto' || ox === 'scroll') return p;
    }
    return null;
  }

  var hinted = false;

  /* Same problem as a wide diagram, different element. A table with five
     columns needs about 410px; a card on a 320px screen gives it 280. The
     page itself does not scroll sideways - by design - so the overflow was
     simply unreachable and she lost the last column without any sign that
     it was there. 128 tables across 67 of the condition pages were doing
     this, every one of them a direct child of a .card.

     Wrap unconditionally rather than only when it currently overflows:
     whether it does depends on the viewport, and overflow-x:auto costs
     nothing on a table that fits. Wrapping is safe here - a check of every
     stylesheet found one `b>table` selector and no sibling selectors, so
     inserting a div between a table and its parent breaks nothing. */
  function wrapWideTables() {
    var tables = document.querySelectorAll('table');
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      if (t.dataset.tz) continue;
      t.dataset.tz = '1';
      if (scrollsAlready(t)) continue;      // already in a .vtw or similar
      var host = document.createElement('div');
      host.className = 'tzbox';
      t.parentNode.insertBefore(host, t);
      host.appendChild(t);
    }
  }

  function run() {
    css();
    wrapWideTables();
    var svgs = document.querySelectorAll('svg[viewBox]');
    for (var i = 0; i < svgs.length; i++) {
      var svg = svgs[i];
      if (svg.dataset.dz || svg.closest('[data-no-dz]')) continue;
      var vb = svg.viewBox && svg.viewBox.baseVal;
      if (!vb || !vb.width) continue;

      var small = smallestLabel(svg);
      if (small === Infinity) continue;               // no text — nothing to read

      var have = svg.getBoundingClientRect().width;
      if (!have) continue;
      if (have * (small / vb.width) >= FLOOR - 0.2) continue;  // already legible

      var need = Math.ceil(vb.width * FLOOR / small);
      var cap = Math.min(Math.ceil(have * MAX_WIDEN), HARD_MAX);
      if (need > cap) need = cap;
      if (need <= have + 8) continue;

      svg.dataset.dz = '1';
      var host = scrollsAlready(svg);
      if (!host) {
        host = document.createElement('div');
        host.className = 'dzbox';
        svg.parentNode.insertBefore(host, svg);
        host.appendChild(svg);
      }
      svg.style.width = need + 'px';
      svg.style.maxWidth = 'none';
      svg.style.height = 'auto';

      if (!hinted) {
        hinted = true;
        var hint = document.createElement('p');
        hint.className = 'dzhint';
        hint.textContent = 'Swipe this diagram sideways \u2192 the wide ones are drawn bigger here so the labels stay readable.';
        host.parentNode.insertBefore(hint, host.nextSibling);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else { run(); }
  window.addEventListener('load', run);
})();
