// Cycle themes: dark → white → blue
const themes = ["dark", "white", "blue", "ocean-sunset"];
let current = 0; // starts at 0 = dark

const themeBtns = document.querySelectorAll(".themeToggle"); // all buttons
const body = document.body;

// Function to update theme + button text
function updateTheme() {
    body.setAttribute("data-theme", themes[current]);
    themeBtns.forEach(btn => {
        btn.textContent = `Theme: ${themes[current].charAt(0).toUpperCase() + themes[current].slice(1)}`;
    });
    // save to localStorage //here the comment
    localStorage.setItem("themeIndex", current);
}

// Load saved theme if exists
const saved = localStorage.getItem("themeIndex");
if (saved !== null) {
    current = parseInt(saved, 10);
}
updateTheme();

// Add event listener to all theme buttons
themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        current = (current + 1) % themes.length;
        updateTheme();
    });
});



const homeIcon = document.querySelector(".home-icon");

function updateIcon(theme) {
  if (theme === "dark") homeIcon.src = "./globalassets/home-icon-white.png";
  else if (theme === "white") homeIcon.src = "./globalassets/home-icon-dark.png";
  else homeIcon.src = "./globalassets/home-icon-blue.png";
}

// call whenever theme changes
updateIcon("dark"); // example






const btn = document.querySelector(".footer-theme-btn");

btn.addEventListener("click", () => {
  btn.classList.add("active");

  // swap texts after animation
  setTimeout(() => {
    const current = btn.querySelector(".btn-text.current");
    const next = btn.querySelector(".btn-text.next");

    // swap classes
    current.classList.remove("current");
    current.classList.add("next");

    next.classList.remove("next");
    next.classList.add("current");

    // reset active state
    btn.classList.remove("active");
  }, 300); // match transition duration
});
