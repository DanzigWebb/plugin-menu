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
          if (e.target !== this.hamburger) {
            if (e.target !== menu || e.target == link) {
              this.close();
            }
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

///////////////////////////////////////////////////////
// carousel
///////////////////////////////////////////////////////

class Carousel {
  constructor(btn, content) {
    this.butt = document.querySelectorAll(btn);
    this.area = document.querySelectorAll(content);
    let self = this;


    this.init = function () {
      let params = {
        activeItem: 0
      }
      this.nulled(this.butt, this.area);
      this.butt[params.activeItem].classList.add('active');
      this.area[params.activeItem].style.height = 'auto';

      this.butt.forEach(function (btn, i, arr) {
        btn.addEventListener('click', () => {
          self.nulled(self.butt, self.area);
          btn.classList.add('active');
          btn.nextElementSibling.style.height = `${btn.nextElementSibling.scrollHeight}px`
        })
      })
    }


    this.nulled = function (btn, ar) {
      btn.forEach(item => {
        item.classList.remove('active')
      })
      ar.forEach(item => {
        item.style.height = '0'
      })

    }
  }
}
///////////////////////////////////////////////////////
// modal
///////////////////////////////////////////////////////

(function () {
  // Define our constructor
  this.Modal = function () {
    // Create global element references
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;
    this.transitionEnd = transitionSelect();

    // Define option defaults
    let defaults = {
      className: 'fade-and-drop',
      closeButton: true,
      content: "",
      maxWidth: 600,
      minWidth: 280,
      overlay: true
    }
    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }
  }
  // Public Methods

  Modal.prototype.open = function () {
    // Build out our Modal
    buildOut.call(this);
    // Initialize our event listeners
    initializeEvents.call(this);
    /*
    * After adding elements to the DOM, use getComputedStyle
    * to force the browser to recalc and recognize the elements
    * that we just added. This is so that CSS animation has a start point
    */
    window.getComputedStyle(this.modal).height;
    /*
    * Add our open class and check if the modal is taller than the window
    * If so, our anchored class is also applied
    */
    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        " scotch-open scotch-anchored" : " scotch-open");
    this.overlay.className = this.overlay.className + " scotch-open";
  }


  Modal.prototype.close = function () {
    // Store the value of this
    let _ = this;
    // Remove the open class name
    this.modal.className = this.modal.className.replace(" scotch-open", "");
    this.overlay.className = this.overlay.className.replace(" scotch-open", "");
    /*
    * Listen for CSS transitionend event and then
    * Remove the nodes from the DOM
    */
    this.modal.addEventListener(this.transitionEnd, function () {
      _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function () {
      if (_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });

  }
  // Private Methods
  function buildOut() {
    let content;
    let contentHolder;
    let docFrag;
    /*
    * If content is an HTML string, append the HTML string.
    * If content is a domNode, append its content.
    */
    if (typeof this.options.content === "string") {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    docFrag = document.createDocumentFragment();

    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "scotch-modal " + this.options.className;
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";

    // If closeButton option is true, add a close button
    if (this.options.closeButton === true) {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "scotch-close close-button";
      this.closeButton.innerHTML = "×";
      this.modal.appendChild(this.closeButton);
    }

    // If overlay is true, add one
    if (this.options.overlay === true) {
      this.overlay = document.createElement("div");
      this.overlay.className = "scotch-overlay " + this.options.classname;
      docFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    contentHolder = document.createElement("div");
    contentHolder.className = "scotch-content";
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);
  }

  function initializeEvents() {

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }

  }

  function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }
  // Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
    let property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

}());

let myModal = new Modal({
  content: '<h1>Новый попап!.</h1> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident amet ducimus nisi</p>',
  maxWidth: 600
});



document.querySelector('#popup-open').addEventListener('click', () => {
  myModal.open();
})