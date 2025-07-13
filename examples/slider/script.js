/**
 * Sliders
 *
 * Documentation: https://splidejs.com/
 */

import "@splidejs/splide/css/core";
import Splide from "@splidejs/splide";

[...document.querySelectorAll(".splide")].forEach((slider) => {
  new Splide(slider).mount();
});
