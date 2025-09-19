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

      if (modal) {
        this.closeModal(modal);
      }
    });

    document.querySelectorAll(this.modalSelector).forEach((modal) => {
      modal.addEventListener("close", () => this.closeModal(modal));

      modal
        .querySelector(this.modalContentSelector)
        ?.addEventListener("click", (e) => {
          e.stopPropagation();
        });
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

    this.#lockBody();
    el.showModal();
  }

  closeModal(modal) {
    const el = this.#getModal(modal);
    if (!el) return console.error("closeModal: modal not found", modal);

    this.#unlockBody();
    el.close();
  }

  closeActiveModal() {
    this.closeModal(document.querySelector("dialog[open]"));
  }
}

const modal = new Modal();

globalThis.modal = modal;
