/* Course pages open folded (Caroline, 15 Oct: "By default can you collapse all sections").
   Every long card on nur234/nur235/nur258 - infographic collections, exam-prep recordings,
   atlases, games, the course dashboards - becomes a one-line heading she taps to open.
   The card element keeps its id and classes; the fold is a <details> built *inside* it, so
   anchors, search keywords and the read-aloud button still find the same element.
   Nothing is remembered: closed on every load. A link to a card (#id), a search, or
   printing opens what it needs. */
(function () {
  var SEL = '.mcard, .atlascard, .ple-dashboard, .ple-visual-atlas';
  var css = document.createElement('style');
  css.textContent =
    /* plain block flow, not flex: a card's robot floats right, and a flex box would
       shrink away from the float and break words in half (15 Oct, 390px) */
    'details.cfold>summary{list-style:none;cursor:pointer;display:block;min-height:44px}' +
    'details.cfold>summary::-webkit-details-marker{display:none}' +
    'details.cfold>summary>h2,details.cfold>summary>h3,details.cfold>summary>h4{display:inline;margin:0}' +
    'details.cfold>summary::after{content:"\\25B8  Open";display:inline-block;vertical-align:middle;margin:8px 0 2px 10px;' +
      'font:700 14px/1 system-ui,sans-serif;color:#ffe08c;' +
      'border:1px solid rgba(255,224,140,.6);border-radius:999px;padding:10px 14px;white-space:nowrap}' +
    'details.cfold[open]>summary::after{content:"\\25BE  Close"}' +
    'details.cfold>summary:focus-visible{outline:3px solid #ffe08c;outline-offset:4px;border-radius:10px}' +
    'details.cfold>.cfold-b{margin-top:10px}' +
    /* a card laid out as a grid (the exam atlases: cover | text) would put the whole fold in its
       narrow first column and wrap the title a word per line (17 Oct): span it across, and lay
       the card's own grid out again inside the fold */
    'details.cfold-grid{grid-column:1/-1}' +
    'details.cfold-grid>.cfold-b{display:grid;grid-template-columns:92px minmax(0,1fr);gap:14px;align-items:start}' +
    '@media (max-width:420px){details.cfold-grid>.cfold-b{grid-template-columns:64px minmax(0,1fr);gap:10px}}';
  document.head.appendChild(css);

  function fold(card) {
    if (card.querySelector(':scope > details.cfold')) return;
    if (card.parentElement && card.parentElement.closest('details')) return;   // already inside a fold
    var h = card.querySelector('h2, h3, h4');
    if (!h) return;
    var d = document.createElement('details');
    d.className = /grid/.test(getComputedStyle(card).display) ? 'cfold cfold-grid' : 'cfold';
    var s = document.createElement('summary');
    s.appendChild(h);
    var b = document.createElement('div');
    b.className = 'cfold-b';
    while (card.firstChild) b.appendChild(card.firstChild);
    d.appendChild(s);
    d.appendChild(b);
    card.appendChild(d);
    // the read-aloud button sits in the heading: let it speak without toggling the card
    s.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('button')) e.preventDefault();
    });
  }

  function openFor(id) {
    var t = id && document.getElementById(id);
    if (!t) return;
    var inner = t.querySelector && t.querySelector(':scope > details.cfold');
    if (inner) inner.open = true;
    for (var p = t.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true;
  }

  function hash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id) { openFor(id); var t = document.getElementById(id); if (t) t.scrollIntoView(); }
  }

  function run() {
    var main = document.querySelector('main') || document.querySelector('.wrap') || document.body;
    Array.prototype.forEach.call(main.querySelectorAll(SEL), fold);
    hash();
    window.addEventListener('hashchange', hash);
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a) openFor(decodeURIComponent(a.getAttribute('href').slice(1)));
    }, true);
    var q = document.getElementById('q');
    if (q) q.addEventListener('input', function () {
      var on = q.value.trim().length > 0;
      Array.prototype.forEach.call(document.querySelectorAll('details.cfold'), function (d) { d.open = on; });
    });
    window.addEventListener('beforeprint', function () {
      Array.prototype.forEach.call(document.querySelectorAll('details.cfold'), function (d) { d.open = true; });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
