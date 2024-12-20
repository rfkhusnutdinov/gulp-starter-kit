export default class CgBurger {
  constructor(options) {
    const defaultOptions = {
      burgerSelector: ".js-burger-open",
      targetSelector: ".js-burger-menu",
      activeClass: "active",
      hasCloseButton: false,
      closeButtonSelector: ".js-burger-close",
      lockBody: false,
      burgerClass: "js-burger-open",
      targetClass: "js-burger-menu",
      closeClass: "js-burger-close",
      transform: null,
    };

    this.options = Object.assign(defaultOptions, options);
    this.burger = document.querySelector(`${this.options.burgerSelector}`);
    this.target = document.querySelector(`${this.options.targetSelector}`);
    this.body = document.body;

    this.init();
  }

  init() {
    if (this.burger && this.target) {
      this.clickHandler();
    }
  }

  clickHandler() {
    this.burger.addEventListener("click", (e) => {
      // e.stopPropagation();

      if (e.currentTarget.classList.contains(`${this.options.activeClass}`)) {
        this.close();
      } else {
        this.open();
      }
    });

    this.target.addEventListener("click", (e) => {});

    const targetLinks = this.target.querySelectorAll("a");

    if (targetLinks) {
      targetLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.close();
        });
      });
    }

    if (this.options.hasCloseButton === true) {
      const closeButton = this.target.querySelector(
        `${this.options.closeButtonSelector}`
      );

      if (closeButton) {
        closeButton.addEventListener("click", () => {
          this.close();
        });
      }
    }

    document.addEventListener("click", (e) => {
      const isClosest =
        e.target.closest(`${this.options.burgerSelector}`) ||
        e.target.closest(`${this.options.targetSelector}`);

      if (!isClosest) {
        this.close();
      }
    });
  }

  open() {
    this.burger.classList.add(`${this.options.activeClass}`);
    this.target.classList.add(`${this.options.activeClass}`);
    if (this.options.lockBody === true) {
      this.body.style.overflow = "hidden";
    }
  }

  close() {
    if (this.target.classList.contains(`${this.options.activeClass}`)) {
      this.burger.classList.remove(`${this.options.activeClass}`);
      this.target.classList.remove(`${this.options.activeClass}`);

      if (this.options.lockBody === true) {
        this.body.style.overflow = "";
      }
    }
  }
}
