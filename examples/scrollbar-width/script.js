/**
 * Scrollbar width
 */

function getScrollbarWidth() {
  const div = document.createElement("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.overflowY = "scroll";
  div.style.position = "absolute";
  div.style.top = "-9999px";
  document.body.appendChild(div);

  const scrollbarWidth = div.offsetWidth - div.clientWidth;

  document.body.removeChild(div);

  return scrollbarWidth;
}

function setScrollbarWidthVar() {
  const scrollbarWidth = getScrollbarWidth();

  document.documentElement.style.setProperty(
    "--scrollbar-width-base",
    `${scrollbarWidth}px`,
  );
}

setScrollbarWidthVar();
window.addEventListener("resize", setScrollbarWidthVar);
