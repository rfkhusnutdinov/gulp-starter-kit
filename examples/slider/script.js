import "./splide/splide.min.css";
import Splide from "./splide/splide";
globalThis.Splide = Splide;

/**
 * Sliders
 *
 * Documentation: https://splidejs.com/
 */
[...document.querySelectorAll(".splide")].forEach((slider) => {
  new Splide(slider, {
    type: "loop",
    autoWidth: true,
    perMove: 1,
    omitEnd: true,
  }).mount();
});
