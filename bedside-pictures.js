(function () {
  'use strict';
  if (typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'picture-dialog';
  dialog.setAttribute('data-absn-keep', '');
  dialog.setAttribute('aria-labelledby', 'picture-title');
  dialog.innerHTML = '<header><h2 id="picture-title"></h2><button type="button" class="picture-close" autofocus>Close</button></header><div class="picture-content"></div>';
  document.body.appendChild(dialog);
  const title = dialog.querySelector('h2');
  const content = dialog.querySelector('.picture-content');
  let opener = null;
  document.addEventListener('click', function (event) {
    const link = event.target.closest('.test-picture');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    title.textContent = link.dataset.pictureTitle;
    const crop = link.querySelector('.test-crop').cloneNode(true);
    crop.querySelector('img').loading = 'eager';
    const caption = document.createElement('p');
    caption.className = 'picture-caption';
    caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
    content.replaceChildren(crop, caption);
    dialog.showModal();
  });
  dialog.querySelector('.picture-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', function () {
    content.replaceChildren();
    if (opener && opener.isConnected) opener.focus();
  });
})();
