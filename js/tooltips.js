export function clampTooltip(el, opts = { resetBeforeMeasure: false }) {
  const tt = el.querySelector(".tooltiptext");
  if (!tt) return;

  if (opts.resetBeforeMeasure) {
    tt.style.setProperty("--tt-shift", "0px");
  }

  const rect = tt.getBoundingClientRect();
  const vw = window.innerWidth || document.documentElement.clientWidth;
  const inset = 8;
  let shift = 0;

  if (rect.left < inset) {
    shift = inset - rect.left;
  } else if (rect.right > vw - inset) {
    shift = -(rect.right - (vw - inset));
  }

  if (shift !== 0) {
    tt.style.setProperty("--tt-shift", `${shift}px`);
  }
}

export function bindTooltipClamping() {
  document.querySelectorAll(".tooltip").forEach((el) => {
    el.removeEventListener("mouseenter", el.__clampHandler);
    const handler = () => clampTooltip(el);
    el.__clampHandler = handler;
    el.addEventListener("mouseenter", handler);

    el.removeEventListener("mouseleave", el.__clampResetHandler);
    const resetHandler = () => {
      const tt = el.querySelector(".tooltiptext");
      if (tt) tt.style.setProperty("--tt-shift", "0px");
    };
    el.__clampResetHandler = resetHandler;
    el.addEventListener("mouseleave", resetHandler);
  });
}

export function clampHoveredTooltips() {
  document
    .querySelectorAll(".tooltip:hover")
    .forEach((el) => clampTooltip(el, { resetBeforeMeasure: true }));
}
