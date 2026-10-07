/* absn-top.js - the back-to-top arrow on its own, for the few pages that
   do not load absn-hidebar.js (Codex's jewel pages, the games, Recognize Cues).
   A copy of topArrow() from absn-hidebar.js; whichever runs first wins,
   because both check for #absnTopBtn. */
(function () {
  /* ---- back-to-top arrow -------------------------------------------------
     Caroline asked for an arrow at the lower right of every page that jumps
     back to the top. It sits above the study-tools launcher when that is on
     the page, appears once she has scrolled a screen down, and is 48px so a
     magnified thumb finds it. */
  function topArrow() {
    if (document.getElementById('absnTopBtn')) return;
    var st = document.createElement('style');
    st.textContent =
      '#absnTopBtn{position:fixed;right:12px;bottom:12px;z-index:2147482099;' +
      ' width:52px;height:52px;display:inline-flex;align-items:center;justify-content:center;' +
      ' border-radius:999px;font:900 1.5rem/1 "Segoe UI",system-ui,sans-serif;color:#fff;cursor:pointer;' +
      ' border:1px solid rgba(255,255,255,.45);box-shadow:0 5px 18px rgba(0,0,0,.6);' +
      ' background:linear-gradient(135deg,#3b2a86,#7c4dff);' +
      ' opacity:0;transform:translateY(14px);pointer-events:none;transition:opacity .25s,transform .25s}' +
      '#absnTopBtn.absn-show{opacity:1;transform:none;pointer-events:auto}' +
      '#absnTopBtn.absn-lift{bottom:74px}' +
      '#absnTopBtn:hover{filter:brightness(1.15)}' +
      '#absnTopBtn:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
      '@media (prefers-reduced-motion:reduce){#absnTopBtn{transition:none}}' +
      '@media print{#absnTopBtn{display:none}}';
    document.head.appendChild(st);
    var b = document.createElement('button');
    b.type = 'button'; b.id = 'absnTopBtn';
    b.setAttribute('aria-label', 'Back to top'); b.title = 'Back to top';
    b.innerHTML = '&#8679;';
    b.addEventListener('click', function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      try { window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' }); }
      catch (e) { window.scrollTo(0, 0); }
      var h = document.querySelector('h1'); if (h && h.focus) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    });
    document.body.appendChild(b);
    function paint() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      b.classList.toggle('absn-show', y > Math.min(400, window.innerHeight * 0.6));
      b.classList.toggle('absn-lift', !!document.getElementById('absnTuckBtn') || !!document.querySelector('.homebtn'));
    }
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    paint();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', topArrow);
  else topArrow();
})();
