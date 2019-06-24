///////////////////////////////////////////////////////
// menu
///////////////////////////////////////////////////////
class Slider {
  constructor(button) {
    this.hamburger = document.querySelector(button);
    let content = document.querySelector('.main'), overlay = document.querySelector('.main-overlay'), menu = document.querySelector('.my-sidemenu'), menuLinks = menu.querySelectorAll('li');
    let width = menu.offsetWidth;
    this.init = function () {
      window.addEventListener('click', (e) => {
        if (e.target == this.hamburger) {
          this.open();
        }
        menuLinks.forEach(link => {
          if (e.target == overlay || e.target == link) {
            this.close();
          }
        });
      });
    };
    this.open = function () {
      this.hamburger.classList.add('is-active');
      content.setAttribute("style", `transform: translateX(-${width}px);`);
      overlay.setAttribute("style", "background-color: rgba(0, 0, 0, 0.65); z-index: 9999; ");
      document.documentElement.setAttribute("style", "overflow: hidden");
      setTimeout(function () { menu.style.zIndex = '10'; }, 300);
    };
    this.close = function () {
      menu.style.zIndex = '-1';
      this.hamburger.classList.remove('is-active');
      setTimeout(function () {
        content.setAttribute("style", "");
        document.documentElement.setAttribute("style", "");
        overlay.setAttribute("style", "background-color: transparent");
      }, 300);
    };
  }
}


///////////////////////////////////////////////////////
// tabs
///////////////////////////////////////////////////////
class Tabs {
  constructor(btns, content) {
    this.button = document.querySelectorAll(btns);
    this.cont = document.querySelectorAll(content);

    this.init = () => {
      this.button[0].classList.add('active');
      this.cont[0].classList.add('active');
      this.tabChecked();
    };
    this.tabChecked = () => {
      let self = this;
      this.button.forEach(function (btn, i, arr) {
        btn.addEventListener('click', () => {
          self.nulled(arr);
          self.nulled(self.cont);
          btn.classList.add('active');
          self.cont[i].classList.add('active');
        });
      });
    };
    this.nulled = function (param) {
      for (let i = 0; i < param.length; i++) {
        param[i].classList.remove('active');
      }
    };
  }
}
