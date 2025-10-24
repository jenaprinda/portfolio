// --- Select elements ---
const menuCheckbox = document.getElementById('menu_checkbox');
const mobileMenu = document.querySelector('.mobile-links');
const mobileLinksInner = document.querySelector('.mobile-links-inner');
const html = document.documentElement;

// --- Handle menu toggle ---
menuCheckbox.addEventListener('change', () => {
  const isOpen = menuCheckbox.checked;
  mobileMenu.classList.toggle('open', isOpen);
  html.style.overflow = isOpen ? 'hidden' : '';
});

// --- Close menu when clicking outside inner content ---
mobileMenu.addEventListener('click', (e) => {
  if (!mobileLinksInner.contains(e.target)) {
    menuCheckbox.checked = false;
    mobileMenu.classList.remove('open');
    html.style.overflow = '';
  }
});

// --- Close menu when any link inside is clicked ---
document.querySelectorAll('.mobile-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuCheckbox.checked = false;
    mobileMenu.classList.remove('open');
    html.style.overflow = '';
  });
});
