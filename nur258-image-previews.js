/* Add a full-size image preview to a resource card when its source is verified. */
(function () {
  'use strict';
  const index = document.getElementById('n258-preview-index');
  if (!index) return;
  const sources = JSON.parse(index.textContent);

  function imagePreview(source) {
    const details = document.createElement('details');
    details.className = 'n258-preview';
    const summary = document.createElement('summary');
    summary.textContent = 'Preview image';
    summary.setAttribute('aria-label', 'Preview image for ' + source.title);
    const link = document.createElement('a');
    link.href = source.asset;
    link.target = '_blank';
    link.rel = 'noopener';
    const image = document.createElement('img');
    image.width = source.width;
    image.height = source.height;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.alt = source.label + ' · ' + source.title;
    image.src = source.asset;
    const caption = document.createElement('span');
    caption.textContent = 'Open full-size image';
    link.append(image, caption);
    details.append(summary, link);
    return details;
  }

  document.querySelectorAll('a.igcard').forEach(function (card) {
    const source = sources[card.getAttribute('href')];
    if (!source) return;
    const cell = card.closest('.vcell');
    const preview = imagePreview(source);
    if (cell) {
      const previous = cell.querySelector('details.vprev');
      if (previous) previous.replaceWith(preview);
      else cell.appendChild(preview);
    } else {
      const group = document.createElement('div');
      group.className = 'n258-card';
      card.before(group);
      group.append(card, preview);
    }
  });
})();
