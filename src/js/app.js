/**
 * Modals
 */
// const closeModal = function (modal) {
//   if (modal instanceof Element) {
//     modal?.close();
//   } else if (typeof modal === "string") {
//     document.querySelector(modal)?.close();
//   } else {
//     console.error(
//       "closeModal: Property `modal` must be HTMLElement or string!"
//     );
//   }
// };

// const closeOpenModal = function () {
//   closeModal(document.querySelector("dialog[open]"));
// };

// const openModal = function (modal) {
//   if (modal instanceof Element) {
//     modal.showModal();
//   } else if (typeof modal === "string") {
//     document.querySelector(modal)?.showModal();
//   } else {
//     console.error("openModal: Property `modal` must be HTMLElement or string!");
//   }
// };

// const openModalButtons = document.querySelectorAll("[data-modal]");

// [...openModalButtons].forEach((button) => {
//   button.addEventListener("click", (e) => {
//     e.preventDefault();

//     const modalSelector = button.getAttribute("data-modal");
//     openModal(modalSelector);
//   });
// });

// const modals = document.querySelectorAll(".modal");

// [...modals].forEach((modal) => {
//   modal.addEventListener("click", (e) => {
//     closeModal(modal);
//   });

//   const modalContent = modal.querySelector(".modal__content");

//   modalContent.addEventListener("click", (e) => {
//     e.stopPropagation();
//   });
// });
