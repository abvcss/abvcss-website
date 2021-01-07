window.addEventListener('load', () => {
  let lightMode = localStorage.getItem('lightMode');
  if (lightMode === 'true') {
    document.querySelector('.theme-mode-button').classList.remove('theme-mode-button_active');
    document.querySelector('body').classList.remove('Dark-mode');
  }

  // handle mode changing
  document.querySelector('.theme-mode-button').addEventListener('click', event => {
    event.target.classList.toggle('theme-mode-button_active');
    document.querySelector('body').classList.toggle('Dark-mode');

    lightMode = lightMode === 'true' ? 'false' : 'true';
    localStorage.setItem('lightMode', lightMode);
  });

  //handle anchor
  document.querySelectorAll(`a[href*='#']`).forEach(element => {
    element.addEventListener('click', smoothScroll);
  });

  //handle mobile menu open
  document.querySelector('.mobile-menu').addEventListener('click', event => {
    event.target.querySelector('.mobile-menu__arrow').classList.toggle('mobile-menu__arrow_active');
    document.querySelector('body').classList.toggle('menu-opened');
  });
});

function smoothScroll(event) {
  event.preventDefault();
  const top = document.querySelector(event.target.getAttribute('href')).offsetTop - 20;

  window.scrollTo({
    top,
    behavior: 'smooth'
  });
}
