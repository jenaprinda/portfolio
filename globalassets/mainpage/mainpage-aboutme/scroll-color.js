document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".main-page-about-me");
  if (!section) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Reveal ratio: 0 = nahoře mimo viewport, 1 = sekce viditelná
    let revealRatio = (windowHeight - rect.top) / (windowHeight + rect.height);
    revealRatio = Math.min(Math.max(revealRatio, 0), 1);

    // Postupné miznutí: fade lineárně od 10vh
    const fadeStart = 0.1 * windowHeight; // 10vh
    let fadeRatio = 1;
    if (rect.top < fadeStart) {
      fadeRatio = rect.top / fadeStart; // 1 → 0
      fadeRatio = Math.max(fadeRatio, 0);
    }

    if (revealRatio > 0 && revealRatio < 1) {
      // Zobraz sekci, nastav kruhové odhalení
      section.style.opacity = fadeRatio;
      section.style.setProperty("--reveal-size", `${revealRatio * 150}%`);
      section.classList.add("is-visible");

      // Mírné scale
      const scale = 1 - revealRatio * 0.2;
      section.style.transform = `scale(${scale})`;
    } else {
      // Reset
      section.style.opacity = 0;
      section.style.setProperty("--reveal-size", `0%`);
      section.style.transform = `scale(1)`;
      section.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});


