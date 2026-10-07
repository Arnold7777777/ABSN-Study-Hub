/* Codex's study rail - the side menu on the jewel pages - folds away.

   Caroline, 7 Oct 2026: "make sure all side menus are collapsible". The rail
   was a fixed left column on a computer and a block of chips above the page on
   a phone, and the only way to hide it was Focus view, which hides other
   things too. This puts a button at the top of the rail:

     phone/tablet (<=1000px): starts CLOSED, so the chips no longer push the
                              page down; tapping a link closes it again
     computer:               starts open; "Hide menu" gives the page the room

   Nothing is remembered between visits, like absn-fold.js. Escape closes it. */
(function () {
  function init() {
    var rail = document.querySelector('aside.study-rail');
    if (!rail || rail.getAttribute('data-absn-rail')) return;
    var nav = rail.querySelector('nav');
    if (!nav) return;
    rail.setAttribute('data-absn-rail', '1');
    var lab = nav.querySelector('.rail-label');
    var name = (lab && lab.textContent.trim()) || nav.getAttribute('aria-label') || 'On this page';
    if (!nav.id) nav.id = 'absnRailNav';

    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'rail-toggle';
    b.setAttribute('aria-controls', nav.id);
    rail.insertBefore(b, nav);

    var narrow = window.matchMedia('(max-width:1000px)');
    var open = !narrow.matches;
    function paint() {
      document.body.classList.toggle('rail-hidden', !open);
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.textContent = open ? '✕ Hide menu' : '☰ ' + (narrow.matches ? name : 'Menu');
      nav.hidden = !open;
    }
    paint();
    b.addEventListener('click', function () { open = !open; paint(); });
    var onChange = function () { open = !narrow.matches; paint(); };
    if (narrow.addEventListener) narrow.addEventListener('change', onChange);
    else if (narrow.addListener) narrow.addListener(onChange);
    nav.addEventListener('click', function (e) {
      if (narrow.matches && e.target.closest && e.target.closest('a')) { open = false; paint(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open && narrow.matches) { open = false; paint(); b.focus(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
