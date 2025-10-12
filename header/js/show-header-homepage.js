window.addEventListener('scroll', () => {
  const header = document.querySelector('.links');
  const trigger = document.querySelector('.home-screen-info-links');
  if (!header || !trigger) return; // Safety check

  const triggerPosition = trigger.offsetTop;
  const scrollPosition = window.scrollY;

  // The point where fading starts (50px below the trigger)
  const fadeStart = triggerPosition + 25;

  // The distance over which the fade will happen (in px)
  const fadeDistance = 200;

  // Calculate opacity (0 → 1)
  let opacity = (scrollPosition - fadeStart) / fadeDistance;
  opacity = Math.min(Math.max(opacity, 0), 1); // clamp between 0 and 1

  header.style.opacity = opacity.toString();
});
