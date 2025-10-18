document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".main-page-about-me");
  if (!section) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.15) {
      section.classList.add("is-visible");
    } else {
      section.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
});

