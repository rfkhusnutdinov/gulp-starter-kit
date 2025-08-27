/**
 * Modals
 */

class Modal {
  constructor(options = {}) {
    const defaults = {
      shouldLockBody: true,
    };

    this.settings = { ...defaults, ...options };
    this.buttonSelector = "[data-modal-target]";
    this.buttonTargetAttribute = "data-modal-target";
    this.modalSelector = "[data-modal]";
    this.modalContentSelector = "[data-modal-content]";

    this.buttons = document.querySelectorAll(this.settings.buttonsSelector);
    this.modals = document.querySelectorAll(this.settings.modalsSelector);

    this.init();
  }

  init() {
    [...this.buttons].forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        const modalSelector = button.getAttribute(this.buttonTargetAttribute);
        this.openModal(modalSelector);
      });
    });

    [...this.modals].forEach((modal) => {
      modal.addEventListener("click", (e) => {
        this.closeModal(modal);
      });

      modal.addEventListener("close", (e) => {
        this.closeModal(modal);
      });

      const modalContent = modal.querySelector(this.modalContentSelector);

      modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }

  openModal(modal) {
    if (modal instanceof Element) {
      if (this.shouldLockBody) {
        document.body.style.overflow = "hidden";
      }

      modal.showModal();
    } else if (typeof modal === "string") {
      if (this.shouldLockBody) {
        document.body.style.overflow = "hidden";
      }

      document.querySelector(modal)?.showModal();
    } else {
      console.error(
        "openModal: Property `modal` must be HTMLElement or string!",
      );
    }
  }

  closeModal(modal) {
    if (modal instanceof Element) {
      modal?.close();
    } else if (typeof modal === "string") {
      document.querySelector(modal)?.close();
    } else {
      console.error(
        "closeModal: Property `modal` must be HTMLElement or string!",
      );
    }

    if (this.shouldLockBody) {
      requestAnimationFrame(() => {
        const stillOpen = document.querySelector("dialog[open]");

        if (!stillOpen) {
          document.body.style.overflow = "";
        }
      });
    }
  }

  closeActiveModal() {
    this.closeModal(document.querySelector("dialog[open]"));
  }
}

const modal = new Modal();

globalThis.modal = modal;
