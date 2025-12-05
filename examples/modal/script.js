import dialogPolyfill from "dialog-polyfill";
import "dialog-polyfill/dist/dialog-polyfill.css";

class Modal {
  constructor(options = {}) {
    const defaults = {
      shouldLockBody: true,
      bodyLockClass: "is-lock",
      buttonSelector: ".js-modal-trigger",
      modalSelector: ".js-modal",
      modalCloseButtonSelector: ".js-modal-close-button",
      closePreviousOnOpen: true,
      onOpen: (modalEl, triggerButton) => {
        console.log(modalEl, triggerButton);
      },
      onClose: (modalEl) => {
        console.log(modalEl);
      },
    };

    this.settings = { ...defaults, ...options };

    this.#init();
  }

  #init() {
    document.addEventListener("click", (e) => {
      const target = e.target;

      const button = target.closest(this.settings.buttonSelector);
      if (button) {
        e.preventDefault();
        return this.openModal(button.dataset.target, button);
      }

      const modal = target.closest(this.settings.modalSelector);
      if (!modal) return;

      if (
        target === modal ||
        target.closest(this.settings.modalCloseButtonSelector)
      ) {
        return this.closeModal(modal);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        this.#unlockBody();
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
      document.body.classList.add(this.settings.bodyLockClass);
    }
  }

  #unlockBody() {
    if (this.settings.shouldLockBody) {
      requestAnimationFrame(() => {
        if (!document.querySelector("dialog[open]")) {
          document.body.style.overflow = "";
          document.body.classList.remove(this.settings.bodyLockClass);
        }
      });
    }
  }

  openModal(modal, trigger = null) {
    const el = this.#getModal(modal);
    if (!el) {
      console.warn(`Modal not found: ${modal}`);
      return;
    }

    if (typeof el.showModal !== "function") {
      dialogPolyfill.registerDialog(el);
    }

    if (this.settings.closePreviousOnOpen) {
      this.closeActiveModal();
    }

    this.#lockBody();
    el.showModal();

    this.settings.onOpen?.(el, trigger);
  }

  closeModal(modal) {
    const el = this.#getModal(modal);
    if (!el) {
      console.warn(`Modal not found: ${modal}`);
      return;
    }

    this.#unlockBody();
    el.close();

    this.settings.onClose?.(el);
  }

  closeActiveModal() {
    const activeModal = document.querySelector("dialog[open]");

    if (activeModal) {
      this.closeModal(activeModal);
    }
  }
}
globalThis.Modal = Modal;

/**
 * Modals
 */
const modal = new Modal({
  shouldLockBody: true,
  bodyLockClass: "is-lock",
  buttonSelector: ".js-modal-trigger",
  modalSelector: ".js-modal",
  modalCloseButtonSelector: ".js-modal-close-button",
  onOpen: (modalEl, triggerButton) => {},
  onClose: (modalEl) => {},
});

globalThis.modal = modal;
