(() => {
  const course = document.getElementById('course-filter');
  const past = document.getElementById('include-past');
  const cards = [...document.querySelectorAll('.exam-event')];
  const status = document.getElementById('calendar-status');
  const today = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Denver',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const params = new URLSearchParams(location.search);
  if (['234','235','258'].includes(params.get('course'))) course.value = params.get('course');
  past.checked = false;
  function apply() {
    const visible = cards.filter(card => {
      card.hidden = (course.value !== 'all' && card.dataset.course !== course.value) || (!past.checked && card.dataset.end < today);
      return !card.hidden;
    });
    const upcoming = visible.filter(c => c.dataset.end >= today);
    const next = upcoming[0];
    let message = `${visible.length} exam dates or testing windows shown.`;
    if (next) {
      const end = next.dataset.end;
      const same = upcoming.filter(c => c !== next && c.dataset.start <= end && c.dataset.end >= next.dataset.start);
      message += ` Next: NUR ${next.dataset.course} · ${next.querySelector('h3').textContent} · ${next.querySelector('.exam-date').textContent}.`;
      if (same.length) message += ` Overlaps with ${same.map(c=>`NUR ${c.dataset.course} ${c.querySelector('h3').textContent}`).join(', ')}.`;
    }
    status.textContent = message;
    document.getElementById('calendar-empty').hidden = !!visible.length;
  }
  function revealHash() {
    let id; try { id=decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target?.matches('.exam-event')) return;
    if (course.value !== 'all' && course.value !== target.dataset.course) course.value = target.dataset.course;
    if (target.dataset.end < today) past.checked = true;
    apply();
    requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  }
  course.addEventListener('change', () => {
    const url = new URL(location.href);
    url.searchParams.set('course', course.value);url.hash='';history.replaceState(null,'',url);apply();
  });
  past.addEventListener('change',apply);
  window.addEventListener('hashchange',revealHash);
  document.getElementById('feed-url').addEventListener('click',e=>e.target.select());
  apply();revealHash();
})();
