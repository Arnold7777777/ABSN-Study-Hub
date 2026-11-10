/* Reveal the new study insert when a search result links inside an existing fold. */
(() => {
  function reveal() {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (!target || !target.closest('.ms-insert')) return;
    const tab = target.closest('.section');
    if (tab && !tab.classList.contains('active') && typeof window.showSection === 'function') {
      const button = [...document.querySelectorAll('#topnav [data-section]')].find(el => el.dataset.section === tab.id);
      if (button) button.click();
      else window.showSection(tab.id);
    }
    for (let el = target; el; el = el.parentElement) {
      if (el.tagName === 'DETAILS') el.open = true;
      if (el.classList.contains('adhd-card-body') && el.hidden) {
        el.parentElement.querySelector(':scope > .adhd-card-toggle')?.click();
      }
    }
    target.scrollIntoView({block: 'start'});
  }
  if (document.readyState === 'complete') reveal();
  else window.addEventListener('load', reveal, {once: true});
  window.addEventListener('hashchange', reveal);
})();
