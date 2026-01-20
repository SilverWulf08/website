import { setText } from "./js/dom.js";
import { updateFooterMode, scheduleFooterModeUpdate } from "./js/footer.js";
import { setupBrandIcon } from "./js/brandIcon.js";
import { setupPageLoadAnimations } from "./js/reveal.js";
import { clampHoveredTooltips, bindTooltipClamping } from "./js/tooltips.js";
import { translations } from "./js/translations.js";

function setLanguage(lang) {
  const language = translations[lang] ?? translations.en;
  const { subtitle, sections } = language;

  setText("subtitle", subtitle);

  setText("intro-title", sections.introduction.title);
  setText("intro-content", sections.introduction.content);

  setText("skills-title", sections.skills.title);
  document.querySelectorAll(".tooltip").forEach((el) => {
    const skill = el.dataset.skill;
    const tooltipText = el.querySelector(".tooltiptext");
    if (!tooltipText) return;
    tooltipText.innerText = sections.skills.tooltips[skill] ?? "";
  });
  // Re-bind clamping in case tooltips were (re)rendered/changed
  bindTooltipClamping();

  setText("exp-title", sections.experience.title);

  if (sections.experience.exp1) {
    setText("exp1-header", sections.experience.exp1.header);
    setText("exp1-content", sections.experience.exp1.content);
  }

  if (sections.experience.exp2) {
    setText("exp2-header", sections.experience.exp2.header);
    setText("exp2-content", sections.experience.exp2.content);
  }

  if (sections.experience.exp3) {
    setText("exp3-header", sections.experience.exp3.header);
    setText("exp3-content", sections.experience.exp3.content);
  }

  setText("degrees-title", sections.degrees.title);
  // Optional element; guard keeps existing UI unchanged.
  setText("degrees-content", sections.degrees.content);

  // Footer mode may change when content length changes with language
  updateFooterMode();
}

// HTML uses inline onclick handlers.
window.setLanguage = setLanguage;

function init() {
  setLanguage("nl");
  bindTooltipClamping();
  setupBrandIcon();
  scheduleFooterModeUpdate();
  setupPageLoadAnimations();
  window.addEventListener("resize", () => {
    scheduleFooterModeUpdate();
    clampHoveredTooltips();
  });
}

document.addEventListener("DOMContentLoaded", init);
