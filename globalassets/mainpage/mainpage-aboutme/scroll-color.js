document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".main-page-about-me");
  if (!section) return;

  const textEls = section.querySelectorAll(
    ".main-page-about-me-text, .main-page-about-me-column-info, .main-page-about-me-regular-info"
  );

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    section.classList.add("is-visible");
    section.style.opacity = "1";
    section.style.setProperty("--reveal-size", "150%");
    textEls.forEach((el) => (el.style.opacity = "1"));
    return;
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const insetTop = 20;
    const insetBottom = vh - 20;
    const insetHeight = Math.max(1, insetBottom - insetTop);

    const overlap = Math.max(0, Math.min(rect.bottom, insetBottom) - Math.max(rect.top, insetTop));
    let progress = overlap / Math.min(Math.max(1, rect.height), insetHeight);
    progress = Math.max(0, Math.min(1, progress));

    section.classList.toggle("is-visible", progress > 0.001);
    section.style.opacity = String(progress);
    section.style.setProperty("--reveal-size", `${(150 * progress).toFixed(2)}%`);
    textEls.forEach((el) => (el.style.opacity = String(progress)));
  };

  const onScrollOrResize = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  // Initial computation
  update();
});

