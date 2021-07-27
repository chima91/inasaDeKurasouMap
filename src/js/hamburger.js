export function hamburger() {
  const burger = document.querySelector('#hamburger');
  const blackClose = document.querySelector('#menu-black-close');

  burger.addEventListener('click', function() {
    this.classList.toggle('ham-open');
    if(this.classList.contains('ham-open')) {
      blackClose.style.zIndex = '2';
      blackClose.style.opacity = '.7';
    } else {
      blackClose.style.zIndex = '-1';
      blackClose.style.opacity = '0';
    }
  });

  blackClose.addEventListener('click', function() {
    burger.classList.remove('ham-open');
    this.style.zIndex = '-1';
    this.style.opacity = '0';
  });
}