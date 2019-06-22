
function Slider(button) {
  this.hamburger = document.querySelector(button);

  let content = document.querySelector('.main'),
    overlay = document.querySelector('.main-overlay'),
    menu = document.querySelector('.my-sidemenu'),
    menuLinks = menu.querySelectorAll('li');

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
    content.setAttribute("style", "transform: translateX(-400px); ");
    overlay.setAttribute("style", "background-color: rgba(0, 0, 0, 0.65); z-index: 9999; ");
  }
  this.close = function () {
    this.hamburger.classList.remove('is-active');
    content.setAttribute("style", "");
    overlay.style.backgroundColor = 'transparent'
    setTimeout(function () { overlay.setAttribute("style", "") }, 400);
  }
}

let myMenu = new Slider('.hamburger')

myMenu.init()

