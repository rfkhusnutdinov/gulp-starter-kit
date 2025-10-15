import "./splide/splide.min.css";
import Splide from "./splide/splide";
globalThis.Splide = Splide;

/**
 * Sliders
 *
 * Documentation: https://splidejs.com/
 */
[...document.querySelectorAll(".splide")].forEach((slider) => {
  const splide = new Splide(slider, {
    type: "loop", // slide, loop, fade
    autoWidth: true,
    focus: 0,
    perMove: 1,
    omitEnd: true,
    // rewind: true,
    // rewindByDrag: true,
    // drag: "free", // true, false, free
    // autoplay: true,
    // interval: 1000,
    // pauseOnHover: true,
    // pauseOnFocus: true,
    // i18n: {
    //   prev: "Previous slide",
    //   next: "Next slide",
    //   first: "Go to first slide",
    //   last: "Go to last slide",
    //   slideX: "Go to slide %s",
    //   // ...
    // },
  });

  // splide.on("overflow", function (isOverflow) {
  //   splide.go(0);
  //   splide.options = {
  //     arrows: isOverflow,
  //     pagination: isOverflow,
  //     drag: isOverflow,
  //     clones: isOverflow ? undefined : 0,
  //   };
  // });
  // Не забыть добавить splide.refresh() в конце

  splide.mount();
});
