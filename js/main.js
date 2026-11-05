/**
 * ============================================================================
 * MAIN APPLICATION ENTRY POINT
 * ============================================================================
 * Renders the modular data from `js/data/orgData.js` and `js/data/manualData.js`
 * into the DOM and initializes the private Liability Tracker and Web Showcase.
 */

import { orgData } from "./data/orgData.js";
import { manualData } from "./data/manualData.js";
import { initLiabilityTracker } from "./modules/liabilityCrypto.js";
import { initShowcase } from "./modules/showcaseLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  renderValues();
  renderCommunityMoments();
  renderOrgStructure();
  renderImportantLinks();
  initManualModal();
  initLiabilityTracker();
  initShowcase();
  initMobileNav();
});

/* -------------------------------------------------------------------------- */
/* 1. ABOUT & CORE VALUES                                                     */
/* -------------------------------------------------------------------------- */
function renderValues() {
  const aboutTextEl = document.getElementById("about-description-text");
  if (aboutTextEl) {
    aboutTextEl.textContent = orgData.about;
  }

  const valuesGrid = document.getElementById("core-values-grid");
  if (valuesGrid) {
    const iconSvgMap = {
      "heart-handshake": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      "shield-check": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
      award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`
    };

    valuesGrid.innerHTML = orgData.coreValues
      .map(
        (v) => `
        <article class="value-card">
          <div class="value-icon-circle">
            ${iconSvgMap[v.icon] || iconSvgMap["award"]}
          </div>
          <h3 class="value-title">${v.title}</h3>
          <p class="value-desc">${v.description}</p>
        </article>
      `
      )
      .join("");
  }
}

/* -------------------------------------------------------------------------- */
/* 1B. HEARTWARMING & GOOFY COMMUNITY MOMENTS (POLAROID SCRAPBOOK)            */
/* -------------------------------------------------------------------------- */
function renderCommunityMoments() {
  const grid = document.getElementById("community-moments-grid");
  if (!grid || !orgData.communityMoments) return;

  grid.innerHTML = orgData.communityMoments
    .map(
      (m) => `
      <figure class="polaroid-card" style="--card-tilt: ${m.tilt || "0deg"}">
        <div class="polaroid-tape" aria-hidden="true"></div>
        <div class="polaroid-photo-wrap">
          <img src="${m.image}" alt="${m.alt || "RegCom Community Moment"}" class="polaroid-img" />
        </div>
      </figure>
    `
    )
    .join("");
}

/* -------------------------------------------------------------------------- */
/* 2. ORGANIZATIONAL STRUCTURE (CLEAN EXECOM & SUB-BRANCH CARDS)              */
/* -------------------------------------------------------------------------- */
function renderOrgStructure() {
  const execomGrid = document.getElementById("execom-cards-grid");
  if (execomGrid) {
    execomGrid.innerHTML = orgData.exeCom
      .map(
        (m) => `
        <article class="officer-card">
          <div class="officer-top">
            <div class="officer-avatar">${m.avatarInitials}</div>
            <div>
              <span class="role-badge">${m.role}</span>
              <h4 class="officer-name">${m.name}</h4>
              <p class="officer-course">${m.yearCourse}</p>
            </div>
          </div>
          <div class="officer-contacts">
            <a href="mailto:${m.email}" class="contact-link">${m.email}</a>
            <span class="text-muted small-note">${m.phone}</span>
          </div>
        </article>
      `
      )
      .join("");
  }

  const branchesContainer = document.getElementById("branches-container");
  const filterButtons = document.querySelectorAll(".branch-filter-btn");

  function renderBranches(selectedBranchId = "all") {
    if (!branchesContainer) return;
    const list =
      selectedBranchId === "all"
        ? orgData.branches
        : orgData.branches.filter((b) => b.id === selectedBranchId);

    const subBranches = list.flatMap((branch) =>
      branch.subBranches.map((sb) => ({ ...sb, branchName: branch.name }))
    );

    branchesContainer.innerHTML = `
      <div class="subbranches-grid">
        ${subBranches
          .map(
            (sb) => `
            <article class="subbranch-card">
              <div class="subbranch-card-top">
                <div class="subbranch-badge-row">
                  <span class="sb-branch-pill">${sb.branchName}</span>
                  <span class="sb-super-tag">Supervised by ${sb.supervisor}</span>
                </div>
                <h4 class="sb-title">${sb.name}</h4>
                <p class="sb-summary">${sb.summary}</p>
              </div>
              <div class="sb-heads-section">
                <span class="sb-section-label">Sub-Branch Head${sb.heads.length > 1 ? "s" : ""}</span>
                <div class="sb-heads-stack">
                  ${sb.heads
                    .map(
                      (h) => `
                      <div class="sb-head-item">
                        <div class="sb-head-name-row">
                          <strong>${h.name}</strong>
                          <span class="sb-head-course">${h.yearCourse}</span>
                        </div>
                        <a href="mailto:${h.email}" class="sb-head-email">${h.email}</a>
                      </div>
                    `
                    )
                    .join("")}
                </div>
              </div>
            </article>
          `
          )
          .join("")}
      </div>
    `;
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderBranches(btn.dataset.branch);
    });
  });

  renderBranches("all");
}

/* -------------------------------------------------------------------------- */
/* 3. IMPORTANT LINKS                                                         */
/* -------------------------------------------------------------------------- */
function renderImportantLinks() {
  const grid = document.getElementById("important-links-grid");
  if (!grid) return;

  grid.innerHTML = orgData.importantLinks
    .map(
      (link) => `
      <article class="resource-link-card">
        <div class="resource-card-top">
          <span class="resource-cat-tag">${link.category}</span>
          <h4>${link.title}</h4>
          <p>${link.description}</p>
        </div>
        <div class="resource-card-bottom">
          ${
            link.isModal
              ? `<button type="button" class="btn btn-primary btn-block open-manual-modal-btn">${link.actionText}</button>`
              : `<a href="${link.url}" class="btn btn-outline btn-block" ${
                  link.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""
                }>${link.actionText}</a>`
          }
        </div>
      </article>
    `
    )
    .join("");
}

/* -------------------------------------------------------------------------- */
/* 4. ON-DEMAND REGCOM MANUAL MODAL                                           */
/* -------------------------------------------------------------------------- */
function initManualModal() {
  const modal = document.getElementById("manual-modal");
  const closeBtn = document.getElementById("close-manual-modal");
  const partTabs = document.getElementById("manual-part-tabs");
  const manualContent = document.getElementById("manual-content-stage");
  const searchInput = document.getElementById("manual-search-input");

  if (!modal || !partTabs || !manualContent) return;

  let activePartId = manualData.parts[0].id;

  document.addEventListener("click", (e) => {
    if (e.target.closest(".open-manual-modal-btn")) {
      modal.hidden = false;
      renderTabs();
      renderActivePart();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.hidden = true;
    });
  }

  function renderTabs() {
    partTabs.innerHTML = manualData.parts
      .map(
        (part) => `
        <button
          type="button"
          class="manual-tab-btn ${part.id === activePartId ? "active" : ""}"
          data-part="${part.id}"
        >
          <span class="part-num">${part.number}</span>
          <span class="part-name">${part.title}</span>
        </button>
      `
      )
      .join("");

    partTabs.querySelectorAll(".manual-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activePartId = btn.dataset.part;
        if (searchInput) searchInput.value = "";
        renderTabs();
        renderActivePart();
      });
    });
  }

  function renderActivePart(searchQuery = "") {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      renderSearchResults(q);
      return;
    }

    const part = manualData.parts.find((p) => p.id === activePartId);
    if (!part) return;

    if (part.id === "part-1" || part.id === "part-2") {
      manualContent.innerHTML = `
        <div class="manual-sections-stack">
          ${part.sections.map((sec) => renderManualSectionCard(sec)).join("")}
        </div>
      `;
    } else if (part.id === "part-3") {
      manualContent.innerHTML = `
        <div class="roles-grid">
          ${part.roles
            .map(
              (r) => `
              <article class="role-card">
                <span class="role-assigned-chip">${r.assignedTo}</span>
                <h4>${r.role}</h4>
                <p class="role-summary">${r.summary}</p>
                <ul class="role-duties-list">
                  ${r.duties.map((d) => `<li>${d}</li>`).join("")}
                </ul>
              </article>
            `
            )
            .join("")}
        </div>
      `;
    } else if (part.id === "part-4") {
      manualContent.innerHTML = `
        <div class="faq-accordion-list">
          ${part.faqs
            .map(
              (f, i) => `
              <details class="faq-item" ${i === 0 ? "open" : ""}>
                <summary class="faq-question">
                  <span class="faq-cat-badge ${f.category.toLowerCase()}">${f.category}</span>
                  <span>${f.question}</span>
                </summary>
                <div class="faq-answer">${f.answer.replace(/\n/g, "<br>")}</div>
              </details>
            `
            )
            .join("")}
        </div>
      `;
    }

    bindCopyTemplateButtons();
  }

  function renderManualSectionCard(sec) {
    return `
      <details class="manual-sec-accordion" open>
        <summary class="manual-sec-summary">
          <span>${sec.title}</span>
          <span class="manual-page-badge">${sec.badge}</span>
        </summary>
        <div class="manual-sec-body">
          <p>${sec.overview}</p>
          ${
            sec.sops
              ? sec.sops
                  .map(
                    (sop) => `
                    <div class="manual-sop-block">
                      <h5>${sop.heading}</h5>
                      <ul>${sop.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>
                    </div>
                  `
                  )
                  .join("")
              : ""
          }
          ${
            sec.templates
              ? `
              <div class="templates-grid">
                ${sec.templates
                  .map(
                    (tpl) => `
                    <div class="letter-template-card">
                      <div class="tpl-header">
                        <h5>${tpl.name}</h5>
                        <button type="button" class="btn btn-sm btn-secondary copy-tpl-btn" data-tpl-id="${tpl.id}">
                          Copy Template
                        </button>
                      </div>
                      <pre class="tpl-pre" id="pre-${tpl.id}">${tpl.body}</pre>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            `
              : ""
          }
        </div>
      </details>
    `;
  }

  function renderSearchResults(q) {
    const matches = [];
    manualData.parts.forEach((part) => {
      if (part.sections) {
        part.sections.forEach((sec) => {
          if (JSON.stringify(sec).toLowerCase().includes(q)) {
            matches.push(renderManualSectionCard(sec));
          }
        });
      }
      if (part.faqs) {
        part.faqs.forEach((f) => {
          if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
            matches.push(`
              <details class="faq-item" open>
                <summary class="faq-question">
                  <span class="faq-cat-badge ${f.category.toLowerCase()}">${f.category}</span>
                  <span>${f.question}</span>
                </summary>
                <div class="faq-answer">${f.answer.replace(/\n/g, "<br>")}</div>
              </details>
            `);
          }
        });
      }
    });

    manualContent.innerHTML = matches.length
      ? matches.join("")
      : `<p class="text-muted">No matches found for "${q}".</p>`;
    bindCopyTemplateButtons();
  }

  function bindCopyTemplateButtons() {
    manualContent.querySelectorAll(".copy-tpl-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pre = document.getElementById(`pre-${btn.dataset.tplId}`);
        if (!pre) return;
        navigator.clipboard.writeText(pre.textContent);
        btn.textContent = "✓ Copied!";
        setTimeout(() => {
          btn.textContent = "Copy Template";
        }, 1800);
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderActivePart(searchInput.value);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 5. MOBILE NAVIGATION & MODAL BACKDROP                                      */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("main-nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("nav-open", !expanded);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggleBtn.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("nav-open");
      });
    });
  }

  document.querySelectorAll(".modal-backdrop").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.hidden = true;
      }
    });
  });
}
