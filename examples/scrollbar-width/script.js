class ScrollbarWidth {
  scrollbarWidth = null;
  observer = null;
  settings = {
    variableName: "--scrollbar-width-base",
    observeResize: true,
  };

  constructor(options = {}) {
    this.settings = { ...this.settings, ...options };
    this.#init();
  }

  #init() {
    this.#setScrollbarWidthVar();

    if (this.settings.observeResize && typeof ResizeObserver !== "undefined") {
      this.observer = new ResizeObserver(() => this.#setScrollbarWidthVar());
      this.observer.observe(document.documentElement);
    }
  }

  #getScrollbarWidth() {
    if (this.scrollbarWidth !== null) return this.scrollbarWidth;

    const div = document.createElement("div");
    div.style.cssText = `
      width: 100px;
      height: 100px;
      overflow-y: scroll;
      position: absolute;
      visibility: hidden;
      pointer-events: none;
    `;
    document.body.appendChild(div);

    this.scrollbarWidth = div.offsetWidth - div.clientWidth;

    div.remove();
    return this.scrollbarWidth;
  }

  #setScrollbarWidthVar() {
    const width = this.#getScrollbarWidth();
    document.documentElement.style.setProperty(
      this.settings.variableName,
      `${width}px`,
    );
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

globalThis.ScrollbarWidth = ScrollbarWidth;

/**
 * Scrollbar width
 */
const scrollbarWidth = new ScrollbarWidth({
  variableName: "--scrollbar-width-base",
  observeResize: true,
});
