/* absn-diagrams.js — keep diagram labels readable on a phone.
   A wide SVG squeezed into a 358px card renders its 14px labels at ~5px.
   Rather than enlarge the type inside the drawing (which re-introduces the
   label collisions we spent a whole pass fixing), give the diagram its own
   sideways-scrolling box and let it render big enough that the smallest
   label clears 12px. Nothing else on the page moves sideways. */
(function () {
  var FLOOR = 12;      // px — her minimum readable size
  var MAX_WIDEN = 4.6;   // ceiling, so a diagram never becomes an endless canvas
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
      '.dzbox::-webkit-scrollbar-thumb{background:rgba(255,255,255,.42);border-radius:9px}';
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

  function run() {
    css();
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
