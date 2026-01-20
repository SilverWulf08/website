export function setupPageLoadAnimations() {
  const root = document.body;
  if (!root) return;

  const setReveal = (el, { delayMs, pop = false, fade = false } = {}) => {
    if (!el) return;
    el.classList.add("reveal-onload");
    if (pop) el.classList.add("reveal-pop");
    if (fade) el.classList.add("reveal-fade");
    if (typeof delayMs === "number") {
      el.style.setProperty("--reveal-delay", `${delayMs}ms`);
    }
  };

  // Cards fade in one-by-one (very smooth)
  const header = document.querySelector(".header");
  const sections = Array.from(document.querySelectorAll(".section"));
  const linkButtons = document.querySelector(".link-buttons");
  const langButtons = document.querySelector(".lang-buttons");
  const footer = document.querySelector(".site-footer");

  const startDelay = 140;
  const baseDelay = 260;

  // Header first
  setReveal(header, { delayMs: startDelay });

  // Then the main cards, fading only
  sections.forEach((section, idx) => {
    setReveal(section, { delayMs: startDelay + (idx + 1) * baseDelay, fade: true });
  });

  // Then the remaining page elements as blocks (no per-item staggering)
  const afterCardsDelay = startDelay + (sections.length + 1) * baseDelay;
  setReveal(linkButtons, { delayMs: afterCardsDelay + 140 });
  setReveal(langButtons, { delayMs: afterCardsDelay + 260, pop: true });
  setReveal(footer, { delayMs: afterCardsDelay + 380, fade: true });

  // Skills: all skill pills pop in *together* with the Skills card
  const skillsSection = document.getElementById("section-skills");
  if (skillsSection) {
    const skillDelayRaw = getComputedStyle(skillsSection).getPropertyValue(
      "--reveal-delay"
    );
    const skillsDelay = Number.parseInt(skillDelayRaw, 10);
    const delayMs = Number.isFinite(skillsDelay) ? skillsDelay : startDelay;
    document.querySelectorAll("#section-skills .tooltip").forEach((el) => {
      setReveal(el, { delayMs, pop: true });
    });
  }

  // Flip the switch on the next frame so CSS can apply initial hidden state first
  requestAnimationFrame(() => {
    root.classList.add("is-loaded");
  });
}
