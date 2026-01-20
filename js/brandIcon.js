export function setupBrandIcon() {
  const icon = document.querySelector(".brand-icon");
  if (!icon) return;

  // Spin once on initial page load.
  requestAnimationFrame(() => {
    icon.classList.add("rolling");
  });

  icon.addEventListener("click", () => {
    if (!icon.classList.contains("rolling")) icon.classList.add("rolling");
  });

  icon.addEventListener("animationend", () => {
    icon.classList.remove("rolling");
  });
}
