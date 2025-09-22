/**
 * Modals
 */
class Modal {
  constructor(options = {}) {
    const defaults = {
      shouldLockBody: true,
    };

    this.buttonSelector = ".js-modal-trigger";
    this.buttonTargetAttribute = "data-target";
    this.modalSelector = ".js-modal";
    this.modalContentSelector = ".js-modal-content";
    this.modalCloseButtonSelector = ".js-modal-close-button";

    this.settings = { ...defaults, ...options };

    this.#init();
  }

  #init() {
    document.addEventListener("click", (e) => {
      const button = e.target.closest(this.buttonSelector);

      if (button) {
        e.preventDefault();

        this.openModal(button.getAttribute(this.buttonTargetAttribute));
        return;
      }

      const modal = e.target.closest(this.modalSelector);

      if (modal && e.target === modal) {
        this.closeModal(modal);
        return;
      }

      const modalCloseButton = e.target.closest(this.modalCloseButtonSelector);

      if (modal && modalCloseButton) {
        this.closeActiveModal(modal);
        return;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeActiveModal();
      }
    });
  }

  #getModal(modal) {
    if (modal instanceof Element) return modal;
    if (typeof modal === "string") return document.querySelector(modal);
    return null;
  }

  #lockBody() {
    if (this.settings.shouldLockBody) {
      document.body.style.overflow = "hidden";
    }
  }

  #unlockBody() {
    if (this.settings.shouldLockBody) {
      requestAnimationFrame(() => {
        if (!document.querySelector("dialog[open]")) {
          document.body.style.overflow = "";
        }
      });
    }
  }

  openModal(modal) {
    const el = this.#getModal(modal);
    if (!el) return console.error("openModal: modal not found", modal);

    el._triggerElement = document.activeElement;
    this.#lockBody();
    el.setAttribute("aria-hidden", "false");
    el.querySelector(".modal__content").focus();

    const focusableElements = el.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    el.addEventListener("keydown", trapFocus);

    function trapFocus(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    el.trapFocusHandler = trapFocus;
  }

  closeModal(modal) {
    const el = this.#getModal(modal);
    if (!el) return console.error("closeModal: modal not found", modal);

    this.#unlockBody();
    el.setAttribute("aria-hidden", "true");
    el.removeEventListener("keydown", el.trapFocusHandler);

    if (el._triggerElement) {
      console.log(el._triggerElement);
      el._triggerElement.focus();
      delete el._triggerElement;
    }
  }

  closeActiveModal() {
    const activeModal = document.querySelector(
      `${this.modalSelector}[aria-hidden="false"]`,
    );

    if (activeModal) {
      this.closeModal(activeModal);
    }
  }
}

const modal = new Modal();

globalThis.modal = modal;
