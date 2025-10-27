document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('img-viewer');
  if (!overlay) return;

  const imgEl = overlay.querySelector('.viewer-img');
  const closeBtn = overlay.querySelector('.viewer-close');
  const prevBtn = overlay.querySelector('.viewer-nav.prev');
  const nextBtn = overlay.querySelector('.viewer-nav.next');
  const images = Array.from(document.querySelectorAll('#gallery-imports img'));
  let index = 0;

  function openViewer(i) {
    if (!images.length) return;
    index = (i + images.length) % images.length;
    const src = images[index].getAttribute('src');
    const alt = images[index].getAttribute('alt') || '';
    imgEl.setAttribute('src', src);
    imgEl.setAttribute('alt', alt);
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeViewer() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // optional: clear src to release memory
    // imgEl.removeAttribute('src');
  }

  function showNext(delta) {
    openViewer(index + delta);
  }

  images.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      openViewer(i);
    });
  });

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    closeViewer();
  });

  prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    showNext(-1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    showNext(1);
  });

  // Close when clicking the dark background
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeViewer();
  });

  // Keyboard support: arrows and Esc
  window.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
});

