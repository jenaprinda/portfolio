document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".main-page-about-me");
  const box = document.querySelector(".main-page-about-me-wholebox");
  if (!section || !box) return;

  // ---- SETTINGS ----
  const SCROLL_FACTOR = 0.75; // 50% scroll slowdown
  const LERP = 0.08;         // interpolation speed
  const EPSILON = 0.5;       // minimum difference to snap scroll
  const MIN_BOX_SCALE = 0.9;
  const MAX_BOX_SCALE = 1.45;

  let targetScroll = window.scrollY;
  let currentScroll = window.scrollY;
  let isActive = false;

  // ---- HELPERS ----
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const getMaxScroll = () =>
    document.documentElement.scrollHeight - window.innerHeight;

  // ---- SECTION EFFECTS (MODIFIED) ----
  // ---- SECTION EFFECTS (Asymmetrical: Fade In, then Circle Close) ----
  function updateSectionEffects() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;

    if (sectionHeight === 0) return;

    // 1. Calculate base scroll ratio (0 to 1)
    // This tracks the full scroll from section entering to section exiting.
    let scrollRatio = (windowHeight - rect.top) / (windowHeight + sectionHeight);
    scrollRatio = clamp(scrollRatio, 0, 1);

    // 2. Apply "keep scaling up" animations (driven by full scrollRatio)
    // These animations progress continuously from start to end.
    
    // Section scales down (1 -> 0.8)
    const sectionScale = 1 - scrollRatio * 0.2;
    section.style.transform = `scale(${sectionScale})`;

    // Box scales up (0.9 -> 1.45)
    const boxScale = MIN_BOX_SCALE + scrollRatio * (MAX_BOX_SCALE - MIN_BOX_SCALE);
    box.style.transform = `scale(${boxScale})`;

    
    // 3. Create "Entry" and "Exit" specific progress variables
    
    // entryProgress: Goes 0 -> 1 during the first half (scrollRatio 0 -> 0.5)
    // It stays at 1 for the entire second half.
    const entryProgress = clamp((scrollRatio) / 0.4, 0, 1);
    
    // exitProgress: Stays at 0 for the first half (scrollRatio 0 -> 0.5)
    // Goes 0 -> 1 during the second half (scrollRatio 0.5 -> 1)
    const exitProgress = clamp((scrollRatio - 0.4) / 0.4, 0, 1);

    
    // 4. Apply Entry (Fade) and Exit (Mask) animations
    
    // Opacity is driven by entryProgress. It fades in and then stays at 1.
    section.style.opacity = entryProgress;

    // The mask size is 150% (fully open) during entry.
    // During exit, it animates from 150% down to 0%.
    const maskSize = 150 * (1 - exitProgress);
    section.style.setProperty("--reveal-size", `${maskSize}%`);

    
    // 5. Manage visibility class
    // It's visible as long as it's not fully faded out or fully masked.
    if (entryProgress > 0.001 && exitProgress < 0.999) {
      section.classList.add("is-visible");
    } else {
      section.classList.remove("is-visible");
      // Ensure it's reset when not visible
      if (entryProgress === 0) {
         section.style.opacity = 0;
         section.style.setProperty("--reveal-size", '150%'); // Reset for next entry
      }
    }
  }

  // ---- WHEEL HANDLER (slowdown only inside section) ----
  window.addEventListener(
    "wheel",
    (event) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight && rect.bottom >= 0;

      if (!inView) {
        isActive = false;
        return;
      }

      isActive = true;
      event.preventDefault();

      // Slowed scroll
      targetScroll += event.deltaY * SCROLL_FACTOR;

      // Clamp to document bounds
      targetScroll = clamp(targetScroll, 0, getMaxScroll());
    },
    { passive: false }
  );

  // ---- ANIMATION LOOP ----
  function tick() {
    if (isActive) {
      // Smoothly interpolate current scroll toward target
      currentScroll += (targetScroll - currentScroll) * LERP;

      // Snap if very close
      if (Math.abs(targetScroll - currentScroll) < EPSILON) {
        currentScroll = targetScroll;
      }

      // Clamp to bounds
      currentScroll = clamp(currentScroll, 0, getMaxScroll());
      window.scrollTo(0, currentScroll);
    } else {
      // Outside section: follow native scroll
      currentScroll = window.scrollY;
      targetScroll = window.scrollY;
    }

    // Update box and section
    updateSectionEffects();

    requestAnimationFrame(tick);
  }

  // ---- START LOOP ----
  tick();
});