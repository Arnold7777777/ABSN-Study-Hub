/* Local-only progress is shared by the unit exam and final through stable topic IDs. */
(() => {
  'use strict';
  const reader = document.querySelector('.sg-reader');
  if (!reader) return;
  const cards = [...reader.querySelectorAll('.sg-topic')];
  const modules = [...reader.querySelectorAll('.sg-module')];
  const search = reader.querySelector('[data-search]');
  const moduleFilter = reader.querySelector('[data-module-filter]');
  const focusButton = reader.querySelector('[data-focus]');
  const resume = reader.querySelector('[data-resume]');
  const expand = reader.querySelector('[data-expand]');
  const status = reader.querySelector('.sg-status');
  const storageKey = 'absn-short-topics-v1-' + reader.dataset.course;
  let saved = { reviewed: {}, last: '' };
  let canSave = true;
  let focus = false;
  let position = 0;
  let matches = cards;
  let printState;
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (raw && typeof raw === 'object') {
      saved.reviewed = raw.reviewed && typeof raw.reviewed === 'object' ? raw.reviewed : {};
      saved.last = typeof raw.last === 'string' ? raw.last : '';
    }
  } catch (_) { canSave = false; }
  const normalize = s => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const index = new Map(cards.map(card => [card, normalize(card.querySelector('h3').textContent + ' ' + card.querySelector('.sg-facts').textContent + ' ' + (card.querySelector('.sg-covers')?.textContent || ''))]));
  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); }
    catch (_) { canSave = false; }
    if (!canSave) reader.querySelector('.sg-storage-note').textContent = 'Browser storage is unavailable. Checks will last for this visit only.';
  }
  function remember(card) {
    if (card) { saved.last = card.id; persist(); resume.hidden = false; }
  }
  cards.forEach(card => {
    const checkbox = card.querySelector('[data-reviewed]');
    checkbox.checked = saved.reviewed[card.id] === true;
    checkbox.addEventListener('change', () => {
      saved.reviewed[card.id] = checkbox.checked;
      remember(card);
      updateStatus();
    });
    card.addEventListener('focusin', () => remember(card));
    card.querySelector('.sg-visuals').addEventListener('toggle', event => {
      if (event.target.open) remember(card);
    });
  });
  resume.hidden = !cards.some(card => card.id === saved.last);
  if (!canSave) reader.querySelector('.sg-storage-note').textContent = 'Browser storage is unavailable. Checks will last for this visit only.';
  function updateStatus() {
    const count = cards.filter(card => saved.reviewed[card.id] === true).length;
    status.textContent = `${count} of ${cards.length} reviewed · ${matches.length} matching topics`;
    reader.querySelector('[data-position]').textContent = matches.length ? `${position + 1} of ${matches.length}` : 'No matching topics';
    reader.querySelectorAll('[data-prev]').forEach(b => { b.disabled = position <= 0 || !matches.length; });
    reader.querySelectorAll('[data-next]').forEach(b => { b.disabled = position >= matches.length - 1 || !matches.length; });
    reader.querySelectorAll('[data-index]').forEach(a => {
      const done = saved.reviewed[a.dataset.index] === true;
      a.querySelector('.sg-check').textContent = done ? '✓' : '';
      a.setAttribute('aria-label', a.textContent.replace('✓', '').trim() + (done ? ', reviewed' : ', not yet reviewed'));
    });
  }
  function show(moveFocus = false) {
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    matches = cards.filter(card => (moduleFilter.value === 'all' || card.dataset.module === moduleFilter.value) && words.every(word => index.get(card).includes(word)));
    position = Math.max(0, Math.min(position, matches.length - 1));
    const visible = new Set(focus ? matches.slice(position, position + 1) : matches);
    cards.forEach(card => { card.hidden = !visible.has(card); });
    modules.forEach(module => {
      module.hidden = ![...module.querySelectorAll('.sg-topic')].some(card => visible.has(card));
      if (!module.hidden && (focus || words.length || moduleFilter.value !== 'all')) module.open = true;
    });
    reader.classList.toggle('sg-focus', focus);
    focusButton.setAttribute('aria-pressed', String(focus));
    focusButton.textContent = focus ? 'Show module view' : 'One topic at a time';
    reader.querySelector('.sg-pager').hidden = !focus;
    reader.querySelector('.sg-bottom').hidden = !focus || !matches.length;
    reader.querySelector('.sg-empty').hidden = !!matches.length;
    expand.hidden = focus;
    updateStatus();
    if (focus && matches[position]) {
      remember(matches[position]);
      if (moveFocus) matches[position].focus({ preventScroll: true });
    }
  }
  function goTo(id, moveFocus = true) {
    const card = cards.find(c => c.id === id);
    if (!card) return false;
    search.value = ''; moduleFilter.value = 'all';
    position = cards.indexOf(card);
    show(false);
    card.closest('.sg-module').open = true;
    remember(card);
    if (moveFocus) { card.focus({ preventScroll: true }); card.scrollIntoView({ block: 'start' }); }
    return true;
  }
  focusButton.addEventListener('click', () => {
    focus = !focus;
    position = 0;
    show();
  });
  for (const field of [search, moduleFilter]) field.addEventListener(field === search ? 'input' : 'change', () => { position = 0; show(); });
  reader.querySelectorAll('[data-next],[data-prev]').forEach(button => button.addEventListener('click', () => {
    position += button.hasAttribute('data-next') ? 1 : -1;
    show(true);
    matches[position]?.scrollIntoView({ block: 'start' });
  }));
  resume.addEventListener('click', () => goTo(saved.last));
  expand.addEventListener('click', () => {
    const visible = modules.filter(m => !m.hidden);
    const open = !visible.every(m => m.open);
    visible.forEach(m => { m.open = open; });
    expand.textContent = open ? 'Collapse all modules' : 'Expand all modules';
  });
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    if (goTo(id)) return;
    const target = document.getElementById(id);
    if (!target) return;
    let parent = target.parentElement;
    while (parent) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement; }
    target.scrollIntoView({ block: 'start' });
  }
  reader.querySelector('.sg-index').addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    event.preventDefault();
    history.replaceState(null, '', anchor.getAttribute('href'));
    goTo(anchor.hash.slice(1));
    reader.querySelector('.sg-index').open = false;
  });
  window.addEventListener('hashchange', revealHash);
  // Print all essentials even when one-topic mode or a search is active.
  window.addEventListener('beforeprint', () => {
    printState = modules.map(m => m.open);
    modules.forEach(m => { m.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (printState) modules.forEach((m, i) => { m.open = printState[i]; });
  });
  reader.querySelector('.sg-tools').hidden = false;
  show();
  if (location.hash) revealHash();
})();
