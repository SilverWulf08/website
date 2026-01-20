export function updateFooterMode() {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const docH = document.documentElement.scrollHeight;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const footerH = footer.offsetHeight || 0;
  const fits = docH <= vh || docH - footerH <= vh;

  footer.classList.toggle("fixed", fits);
}

let footerRaf = 0;
export function scheduleFooterModeUpdate() {
  if (footerRaf) cancelAnimationFrame(footerRaf);
  footerRaf = requestAnimationFrame(updateFooterMode);
}
