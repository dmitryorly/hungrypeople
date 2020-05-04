// MOBILE MENU

(function(){

  let body = document.querySelector('body'),
    menu = body.querySelector('.js-menu'),
    menuBtn = body.querySelector('.js-menuBtn'),
    links = Array.from(menu.querySelectorAll('.header__link'));

  // Menu close - open handler
  menuBtn.addEventListener('click', () => {
    body.classList.toggle('overflow_hidden');
    menu.classList.toggle('mobile_show');
    menuBtn.classList.toggle('mobile__btn_close'); // NEED ANIMATION
  } )

  // Links click handler
  let linkClickHandler = function() {
    body.classList.remove('overflow_hidden');
    menu.classList.remove('mobile_show');
    menuBtn.classList.remove('mobile__btn_close'); // NEED ANIMATION
  }

  // Links listeners
  links.forEach( link => {
    link.addEventListener('click', linkClickHandler)
  })

}());