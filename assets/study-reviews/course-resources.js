(() => {
  const list = document.getElementById('course-deck-list');
  if (!list) return;
  const openList = () => {
    if (location.hash === '#course-deck-list') list.open = true;
    const group = document.getElementById(location.hash.slice(1));
    if (group?.matches('.course-deck-groups details')) {
      list.open = true;
      group.open = true;
      requestAnimationFrame(() => group.scrollIntoView({block:'start'}));
    }
  };
  document.querySelector('[data-open-decks]')?.addEventListener('click', () => { list.open = true; });
  window.addEventListener('hashchange', openList);
  openList();
})();
