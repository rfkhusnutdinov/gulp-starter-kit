import "@splidejs/splide/css/core";
import Splide from "@splidejs/splide";
globalThis.Splide = Splide;

/**
 * Sliders
 *
 * Documentation: https://splidejs.com/
 */
[...document.querySelectorAll(".splide")].forEach((slider) => {
  new Splide(slider).mount();
});
