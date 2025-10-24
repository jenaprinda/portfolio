document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".main-page-about-me");
  if (!section) return;

  const textEls = section.querySelectorAll(
    ".main-page-about-me-text, .main-page-about-me-column-info, .main-page-about-me-regular-info"
  );

  const prefersReduced = window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const insetTop = 20;
    const insetBottom = vh - 20;
    const insetHeight = Math.max(1, insetBottom - insetTop);

    const overlap = Math.max(
      0,
      Math.min(rect.bottom, insetBottom) - Math.max(rect.top, insetTop)
    );
    let progress = overlap / Math.min(Math.max(1, rect.height), insetHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Reach full visibility sooner: map 0..0.5 -> 0..1, clamp after
    const earlyFullAt = 0.5; // full color by second quarter
    const fast = Math.min(1, progress / earlyFullAt);

    section.classList.toggle("is-visible", fast > 0.001);
    section.style.opacity = String(fast);
    section.style.setProperty(
      "--reveal-size",
      `${(150 * fast).toFixed(2)}%`
    );
    textEls.forEach((el) => (el.style.opacity = String(fast)));
  };

  const onScrollOrResize = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  let attached = false;
  const attach = () => {
    if (attached) return;
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    attached = true;
    update();
  };

  const detach = () => {
    if (!attached) return;
    window.removeEventListener("scroll", onScrollOrResize);
    window.removeEventListener("resize", onScrollOrResize);
    attached = false;
  };

  const setStaticVisible = () => {
    section.classList.add("is-visible");
    section.style.opacity = "1";
    section.style.setProperty("--reveal-size", "150%");
    textEls.forEach((el) => (el.style.opacity = "1"));
  };

  const applyMode = () => {
    const isMobile = window.innerWidth <= 1000;
    if (prefersReduced || isMobile) {
      detach();
      setStaticVisible();
    } else {
      attach();
    }
  };

  // Initial mode
  applyMode();
  // Re-evaluate when crossing the breakpoint
  window.addEventListener("resize", applyMode);
});
