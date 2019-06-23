
function Slider(button) {
  this.hamburger = document.querySelector(button);

  let content = document.querySelector('.main'),
    overlay = document.querySelector('.main-overlay'),
    menu = document.querySelector('.my-sidemenu'),
    menuLinks = menu.querySelectorAll('li');

  let width = menu.offsetWidth;

  this.init = function () {
    window.addEventListener('click', (e) => {
      if (e.target == this.hamburger) {
        this.open()
      }
      menuLinks.forEach(link => {
        if (e.target == overlay || e.target == link) {
          this.close()
        }
      })
    })
  }
  this.open = function () {
    this.hamburger.classList.add('is-active');
    content.setAttribute("style", `transform: translateX(-${width}px);`);
    overlay.setAttribute("style", "background-color: rgba(0, 0, 0, 0.65); z-index: 9999; ");
    document.documentElement.setAttribute("style", "overflow: hidden");
    setTimeout(function () {menu.style.zIndex = '10'}, 400)
  }
  this.close = function () {
    this.hamburger.classList.remove('is-active');
    menu.style.zIndex = '-1';
    setTimeout(function () {
      content.setAttribute("style", "");
      document.documentElement.setAttribute("style", "");
      overlay.setAttribute("style", "background-color: transparent");
    }, 400)
  }
}
let myMenu = new Slider('.hamburger');
myMenu.init();
