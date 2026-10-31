/* Open linked study sections without requiring several manual disclosures. */
(function () {
  function reveal() {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    var target = document.getElementById(id);
    if (!target) return;
    for (var node = target; node; node = node.parentElement) {
      if (node.tagName === 'DETAILS') node.open = true;
    }
    requestAnimationFrame(function () { target.scrollIntoView({block: 'start'}); });
  }
  window.addEventListener('hashchange', reveal);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', reveal);
  else reveal();
})();
