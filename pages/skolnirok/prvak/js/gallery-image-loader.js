const imgs = document.querySelectorAll(".oct-img");
let index = 0;

function loadNextImage() {
  if (index >= imgs.length) return;

  const img = imgs[index];
  img.src = img.dataset.src;

  img.onload = () => {
    img.classList.add("loaded");
    index++;
    loadNextImage();
  };
}

loadNextImage();
