(() => {
  const focus = document.querySelector('[data-focus-mode]');
  const size = document.querySelector('[data-text-size]');
  focus?.addEventListener('click', () => {
    const active = document.body.classList.toggle('focus-mode');
    focus.setAttribute('aria-pressed', String(active));
    focus.textContent = active ? 'Full page' : 'Focus view';
  });
  size?.addEventListener('click', () => {
    const active = document.documentElement.classList.toggle('large-text');
    size.setAttribute('aria-pressed', String(active));
    size.textContent = active ? 'Standard text' : 'Larger text';
  });
})();
