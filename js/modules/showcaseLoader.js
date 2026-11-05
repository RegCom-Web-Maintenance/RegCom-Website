/**
 * ============================================================================
 * WEB BRANCH SHOWCASE LOADER
 * ============================================================================
 * Automatically renders all games registered in `js/games/index.js` and
 * handles the "How to Add Your Own Game" onboarding modal for new Web members.
 */

import { games } from "../games/index.js";

export function initShowcase() {
  const tabsContainer = document.getElementById("showcase-game-tabs");
  const stageContainer = document.getElementById("showcase-game-stage");
  const creditTitle = document.getElementById("showcase-credit-title");
  const creditAuthor = document.getElementById("showcase-credit-author");
  const creditRole = document.getElementById("showcase-credit-role");
  const creditDesc = document.getElementById("showcase-credit-desc");

  // Onboarding guide modal controls
  const openGuideBtn = document.getElementById("open-add-game-modal-btn");
  const guideModal = document.getElementById("add-game-modal");
  const closeGuideBtn = document.getElementById("close-add-game-modal");
  const copyTemplateBtn = document.getElementById("copy-game-template-btn");
  const templateCodeEl = document.getElementById("game-template-code");

  if (!tabsContainer || !stageContainer || games.length === 0) return;

  let activeCleanup = null;

  function loadGame(index) {
    if (typeof activeCleanup === "function") {
      activeCleanup();
      activeCleanup = null;
    }

    const game = games[index];

    tabsContainer.querySelectorAll(".showcase-tab-btn").forEach((btn, idx) => {
      btn.classList.toggle("active", idx === index);
      btn.setAttribute("aria-selected", idx === index ? "true" : "false");
    });

    creditTitle.textContent = game.title;
    creditAuthor.textContent = game.author;
    creditRole.textContent = game.authorRole;
    creditDesc.textContent = game.description;

    activeCleanup = game.mount(stageContainer);
  }

  tabsContainer.innerHTML = games
    .map(
      (g, idx) => `
      <button
        type="button"
        class="showcase-tab-btn ${idx === 0 ? "active" : ""}"
        role="tab"
        aria-selected="${idx === 0 ? "true" : "false"}"
        data-idx="${idx}"
      >
        <span class="tab-game-title">🎮 ${g.title}</span>
        <span class="tab-game-author">by ${g.author}</span>
      </button>
    `
    )
    .join("");

  tabsContainer.querySelectorAll(".showcase-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      loadGame(Number(btn.dataset.idx));
    });
  });

  if (openGuideBtn && guideModal) {
    openGuideBtn.addEventListener("click", () => {
      guideModal.hidden = false;
    });
  }

  if (closeGuideBtn && guideModal) {
    closeGuideBtn.addEventListener("click", () => {
      guideModal.hidden = true;
    });
  }

  if (copyTemplateBtn && templateCodeEl) {
    copyTemplateBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(templateCodeEl.textContent.trim());
      copyTemplateBtn.textContent = "✓ Copied Starter Template!";
      setTimeout(() => {
        copyTemplateBtn.textContent = "📋 Copy Starter Template";
      }, 2000);
    });
  }

  loadGame(0);
}
