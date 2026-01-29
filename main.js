// Password overlay logic
document.addEventListener('DOMContentLoaded', function () {

  // Set background music volume, but do not play by default
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic) {
    bgMusic.volume = 0.03;
  }
  // Password is base64 encoded to deter casual inspection
  const PASSWORD = atob("SjIwMjBS");
  const overlay = document.getElementById("password-overlay");
  const passwordInput = document.getElementById("password-input");
  const passwordSubmit = document.getElementById("password-submit");
  const passwordError = document.getElementById("password-error");
  const mainContent = document.querySelector("body > :not(#password-overlay)");

  function showOverlay() {
    overlay.style.display = "flex";
    passwordInput.value = "";
    passwordError.classList.remove("visible");
    passwordInput.focus();
    // Blur the rest of the page
    document.querySelectorAll("body > :not(#password-overlay)").forEach(el => {
      el.classList.add("blurred-content");
    });
  }

  function hideOverlay() {
    overlay.style.display = "none";
    // Remove blur
    document.querySelectorAll("body > :not(#password-overlay)").forEach(el => {
      el.classList.remove("blurred-content");
    });
    // Show main content, header, and footer
    document.getElementById("main-header").style.display = "";
    document.getElementById("main-content").style.display = "";
    document.getElementById("main-footer").style.display = "";
    // Ensure footer is positioned correctly
    if (typeof updateFooterMode === 'function') updateFooterMode();
    // Now run tab logic
    setupTabs();
  }

  function checkPassword() {
    if (passwordInput.value === PASSWORD) {
      // Remove error state if present
      passwordError.classList.remove("visible");
      passwordInput.classList.remove("error");
      overlay.querySelector('.password-modal').classList.remove("error");
      hideOverlay();
    } else {
      passwordError.classList.add("visible");
      passwordInput.classList.add("error");
      overlay.querySelector('.password-modal').classList.add("error");
      passwordInput.value = "";
      passwordInput.focus();
    }
  }

  passwordInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      checkPassword();
    } else {
      // Remove error state on any key
      passwordError.classList.remove("visible");
      passwordInput.classList.remove("error");
      overlay.querySelector('.password-modal').classList.remove("error");
    }
  });
  passwordSubmit.addEventListener("click", checkPassword);

  // Hide main content until unlocked
  document.getElementById("main-header").style.display = "none";
  document.getElementById("main-content").style.display = "none";
  document.getElementById("main-footer").style.display = "none";
  // Show overlay on load
  showOverlay();

  // Prevent tabbing out of modal
  overlay.addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      passwordInput.focus();
    }
  });
});
// Tab switching and swipe animation
function setupTabs() {
  const tabPortfolio = document.getElementById('tab-portfolio');
  const tabContact = document.getElementById('tab-contact');
  const mainContainer = document.querySelector('.container');
  const contactLinks = document.getElementById('contact-links');

  function showPortfolio() {
    tabPortfolio.classList.add('active');
    tabContact.classList.remove('active');
    // Animate contact buttons out to the right
    if (contactLinks.style.display === 'flex') {
      contactLinks.style.transition = 'transform 0.6s cubic-bezier(0.77,0,0.18,1), opacity 0.4s';
      contactLinks.style.transform = 'translateX(100vw)';
      contactLinks.style.opacity = '0';
    }
    // Animate swipe right for main container
    mainContainer.style.transition = 'transform 0.6s cubic-bezier(0.77,0,0.18,1), opacity 0.4s';
    mainContainer.style.transform = 'translateX(100vw)';
    mainContainer.style.opacity = '0';
    setTimeout(() => {
      // Hide contact buttons and reset transform
      contactLinks.style.display = 'none';
      contactLinks.style.transition = 'none';
      contactLinks.style.transform = 'translateX(0)';
      contactLinks.style.opacity = '1';
      // Show all main content sections after slide
      Array.from(mainContainer.children).forEach((el) => {
        if (!el.classList.contains('link-buttons')) {
          el.style.display = '';
        }
      });
      mainContainer.style.transition = 'none';
      mainContainer.style.transform = 'translateX(0)';
      mainContainer.style.opacity = '1';
    }, 600);
  }

  function showContact() {
    tabPortfolio.classList.remove('active');
    tabContact.classList.add('active');
    // Animate swipe left
    mainContainer.style.transition = 'transform 0.6s cubic-bezier(0.77,0,0.18,1), opacity 0.4s';
    mainContainer.style.transform = 'translateX(-100vw)';
    mainContainer.style.opacity = '0';
    // Show contact buttons immediately and trigger pop-in
    contactLinks.style.display = 'flex';
    contactLinks.style.flexDirection = 'column';
    contactLinks.style.alignItems = 'center';
    contactLinks.style.gap = '32px';
    Array.from(contactLinks.children).forEach((btn) => {
      btn.style.fontSize = '2rem';
      btn.style.padding = '24px 48px';
      btn.style.opacity = '0';
      btn.style.transform = 'scale(0.7)';
      setTimeout(() => {
        btn.style.transition = 'opacity 0.3s, transform 0.3s';
        btn.style.opacity = '1';
        btn.style.transform = 'scale(1)';
      }, 50);
    });
    // Hide main content after 250ms
    setTimeout(() => {
      Array.from(mainContainer.children).forEach((el) => {
        if (!el.classList.contains('link-buttons')) {
          el.style.display = 'none';
        }
      });
    }, 250);
    // Finish slide and fade in
    setTimeout(() => {
      mainContainer.style.transition = 'none';
      mainContainer.style.transform = 'translateX(0)';
      mainContainer.style.opacity = '1';
    }, 600);
  }

  tabPortfolio.addEventListener('click', showPortfolio);
  tabContact.addEventListener('click', showContact);

  // Default to Portfolio
  showPortfolio();
}

// Only run tab logic after password unlock
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
  // Set skills category headings
  if (sections.skills.categories) {
    setText("skills-category-codelanguages", sections.skills.categories.codeLanguages);
    setText("skills-category-frameworks", sections.skills.categories.frameworks);
    setText("skills-category-tools", sections.skills.categories.tools);
  }
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
