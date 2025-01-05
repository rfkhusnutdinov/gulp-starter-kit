// * ==========================================

/**
 * * Sliders
 * Документация: https://splidejs.com/documents/
 */

// var elms = document.getElementsByClassName("splide");

// for (var i = 0; i < elms.length; i++) {
//   new Splide(elms[i]).mount();
// }

// * ==========================================

/**
 * * Modals
 */
// const modals = {
//   modalSelector: "[data-modal]",
//   options: {
//     onShow: (modal) => {
//       console.log("new");
//       document.body.style.overflow = "hidden";
//     },
//     onClose: (modal) => {
//       document.body.style.overflow = "";
//     },
//     openTrigger: "data-modal-open",
//     closeTrigger: "data-modal-close",
//     openClass: "is-open",
//     disableScroll: true,
//     disableFocus: false,
//     awaitOpenAnimation: true,
//     awaitCloseAnimation: false,
//     debugMode: false,
//   },
//   init() {
//     MicroModal.init(this.options);
//   },
//   open(modalId) {
//     MicroModal.show(modalId, this.options);
//   },
//   close(modalId) {
//     MicroModal.close(modalId);
//   },
//   closeActive() {
//     const modalId = document
//       .querySelector(`${this.modalSelector}.${this.options.openClass}`)
//       ?.getAttribute("id");
//     if (modalId) {
//       MicroModal.close(modalId);
//     }
//   },
// };

// modals.init();

// window.modals = modals;

// * ==========================================

/**
 * * Burger menu
 */
// const burger = new CgBurger({
//   burgerSelector: "[data-burger]",
//   targetSelector: "[data-burger-target]",
//   activeClass: "active",
//   hasCloseButton: true,
//   closeButtonSelector: "[data-burger-close]",
//   lockBody: true,
// });

// * ==========================================

/**
 * * MAP
 */

// if (document.querySelector("#map")) {
//   ymaps.ready(init);

//   function init() {
//     var map = new ymaps.Map("map", {
//       center: [61.783945, 34.353059],
//       zoom: 16,
//       controls: [],
//     });

//     let iconSize = [38, 38];

//     var placemark = new ymaps.Placemark(
//       [61.783945, 34.353059],
//       {
//         hintContent: "Спортивный клуб EVEREST",
//         balloonContent: [
//           '<div class="map__title">Спортивный клуб EVEREST:</div>',
//           '<div class="map__subtitle">Пр. Ветеранов, д. 169, к. 4 ТК «Солнечный» 3 этаж"</div>',
//           "</div>",
//         ].join(""),
//       },
//       {
//         iconLayout: "default#image",
//         iconImageHref: "./img/icons/pin.svg",
//         iconImageSize: iconSize,
//         iconImageOffset: [-19, -38],
//       }
//     );

//     map.geoObjects.add(placemark);

//     map.controls.remove("geolocationControl");
//     map.controls.remove("searchControl");
//     map.controls.remove("trafficControl");
//     map.controls.remove("typeSelector");
//     map.controls.remove("fullscreenControl");
//     map.controls.remove("rulerControl");
//     map.behaviors.disable(["scrollZoom"]);

//     map.addChild(
//       new YMapDefaultSchemeLayer({
//         theme: "dark",
//       })
//     );
//   }
// }

// * ==========================================

/**
 * * Selects
 */

// const formSelects = document.querySelectorAll(".form__select");

// if (formSelects.length > 0) {
//   formSelects.forEach((select) => {
//     const choice = new Choices(select, {
//       searchEnabled: false,
//       classNames: {
//         containerOuter: "choices form__select",
//       },
//     });
//   });
// }

// * ==========================================

/**
 * * Модальные окна
 */

// const modalButtons = document.querySelectorAll("[data-modal-button]");

// if (modalButtons.length > 0) {
//   modalButtons.forEach((button) => {
//     const target = document.getElementById(
//       button.getAttribute("data-modal-button")
//     );

//     if (target) {
//       button.addEventListener("click", (e) => {
//         target.showModal();
//         document.body.style.overflow = "hidden";
//       });
//       target.addEventListener("close", (e) => {
//         document.body.style.overflow = "";
//       });
//       target.addEventListener("click", (e) => {
//         e.currentTarget.close();
//       });
//       target
//         .querySelector("[data-modal-content]")
//         .addEventListener("click", (e) => {
//           e.stopPropagation();
//         });
//     }
//   });
// }
