/**
 * ============================================================================
 * CLIENT-SIDE LIABILITY TRACKER (PRIVATE INDIVIDUAL LOOKUP)
 * ============================================================================
 * Step 1: Member inputs the organization decryption key (AES-256-GCM).
 * Step 2: Member inputs their personal ID Number to view ONLY their own
 *         liability points and breakdown (never exposing other members' records).
 */

import { encryptedLiabilities } from "../data/encryptedLiabilities.js";

function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function uint8ArrayToBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function deriveKey(passphrase, saltBytes, iterations = 100000) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function decryptPayload(encryptedObj, passphrase) {
  const salt = base64ToUint8Array(encryptedObj.salt);
  const iv = base64ToUint8Array(encryptedObj.iv);
  const ciphertext = base64ToUint8Array(encryptedObj.ciphertext);
  const key = await deriveKey(passphrase, salt, encryptedObj.iterations || 100000);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return JSON.parse(dec.decode(decryptedBuffer));
}

export async function encryptPayload(plainObj, passphrase) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const iterations = 100000;
  const key = await deriveKey(passphrase, salt, iterations);

  const enc = new TextEncoder();
  const encoded = enc.encode(JSON.stringify(plainObj));

  const cipherBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  return {
    version: 1,
    algorithm: "AES-256-GCM",
    kdf: "PBKDF2-SHA256",
    iterations,
    salt: uint8ArrayToBase64(salt),
    iv: uint8ArrayToBase64(iv),
    ciphertext: uint8ArrayToBase64(new Uint8Array(cipherBuffer))
  };
}

export function initLiabilityTracker() {
  const unlockForm = document.getElementById("liability-unlock-form");
  const keyInput = document.getElementById("liability-key-input");
  const errorEl = document.getElementById("liability-error");
  const lockedView = document.getElementById("liability-locked-view");
  const unlockedView = document.getElementById("liability-unlocked-view");
  const lockBtn = document.getElementById("liability-lock-btn");

  // Step 2: Individual ID Lookup elements
  const idLookupForm = document.getElementById("liability-id-form");
  const idInput = document.getElementById("liability-id-input");
  const idResultBox = document.getElementById("liability-member-result");
  const idErrorEl = document.getElementById("liability-id-error");

  // Admin modal controls
  const openAdminBtn = document.getElementById("open-encryptor-btn");
  const adminModal = document.getElementById("encryptor-modal");
  const closeAdminBtn = document.getElementById("close-encryptor-modal");
  const adminJsonInput = document.getElementById("encryptor-json-input");
  const adminPassInput = document.getElementById("encryptor-passphrase-input");
  const generateBtn = document.getElementById("generate-encrypted-btn");
  const adminOutput = document.getElementById("encryptor-output-code");
  const copyOutputBtn = document.getElementById("copy-encrypted-output-btn");

  let decryptedDatabase = null;

  // Step 1: Decrypt Database in Memory
  unlockForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pass = keyInput.value.trim();
    if (!pass) return;

    errorEl.hidden = true;
    try {
      decryptedDatabase = await decryptPayload(encryptedLiabilities, pass);
      lockedView.hidden = true;
      unlockedView.hidden = false;
      idResultBox.hidden = true;
      idErrorEl.hidden = true;
      idInput.value = "";
      idInput.focus();
      document.getElementById("liability-meta-updated").textContent =
        `Updated: ${decryptedDatabase.lastUpdated}`;
    } catch (err) {
      errorEl.textContent = "Incorrect decryption key. Please check with your sub-branch head.";
      errorEl.hidden = false;
    }
  });

  // Step 2: Look up ONLY the requested Member ID
  idLookupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!decryptedDatabase) return;

    const queryId = idInput.value.trim().toLowerCase();
    if (!queryId) return;

    const record = decryptedDatabase.records.find(
      (r) => String(r.id).trim().toLowerCase() === queryId
    );

    if (!record) {
      idResultBox.hidden = true;
      idErrorEl.textContent = `No member record found for ID "${idInput.value.trim()}".`;
      idErrorEl.hidden = false;
      return;
    }

    idErrorEl.hidden = true;
    renderSingleMemberCard(record);
  });

  function renderSingleMemberCard(r) {
    const statusClass =
      r.points === 0 && r.misdemeanorWarnings === 0
        ? "status-pill status-clear"
        : r.points > 0
        ? "status-pill status-points"
        : "status-pill status-warning";

    idResultBox.innerHTML = `
      <div class="member-result-header">
        <div>
          <span class="mono-code">ID: ${escapeHtml(r.id)}</span>
          <h4>${escapeHtml(r.name)}</h4>
          <p class="text-muted">${escapeHtml(r.branch)} • ${escapeHtml(r.subBranch)}</p>
        </div>
        <div class="member-points-badge">
          <span class="points-num ${r.points > 0 ? "text-danger" : "text-success"}">${Number(r.points).toFixed(1)}</span>
          <span class="points-label">Liability Pts</span>
        </div>
      </div>

      <div class="member-metrics-grid">
        <div class="metric-item">
          <span class="metric-val">${r.lateCount}</span>
          <span class="metric-lbl">Unexcused Late (0.5)</span>
        </div>
        <div class="metric-item">
          <span class="metric-val">${r.cutCount}</span>
          <span class="metric-lbl">Unexcused Cut (1.0)</span>
        </div>
        <div class="metric-item">
          <span class="metric-val">${r.misdemeanorWarnings}</span>
          <span class="metric-lbl">Warnings (1.5*)</span>
        </div>
        <div class="metric-item">
          <span class="metric-val">${r.failureWorkCount || 0}</span>
          <span class="metric-lbl">Missed Work (2.0)</span>
        </div>
      </div>

      <div class="member-result-footer">
        <span class="${statusClass}">${escapeHtml(r.status)}</span>
        <span class="text-muted small-note">${escapeHtml(r.notes || "No remarks.")}</span>
      </div>
    `;
    idResultBox.hidden = false;
  }

  lockBtn.addEventListener("click", () => {
    decryptedDatabase = null;
    keyInput.value = "";
    idInput.value = "";
    idResultBox.hidden = true;
    idErrorEl.hidden = true;
    unlockedView.hidden = true;
    lockedView.hidden = false;
  });

  function openAdminModal() {
    const templateData = decryptedDatabase || {
      academicYear: "First Semester S.Y. 2026-2027",
      lastUpdated: new Date().toISOString().slice(0, 10),
      updatedBy: "Membership Sub-Branch",
      records: [
        {
          id: "221001",
          name: "Sample Member",
          branch: "Web",
          subBranch: "Web Maintenance",
          lateCount: 0,
          cutCount: 0,
          misdemeanorWarnings: 0,
          failureWorkCount: 0,
          points: 0.0,
          status: "Clear",
          notes: "No liabilities incurred."
        }
      ]
    };
    adminJsonInput.value = JSON.stringify(templateData, null, 2);
    adminOutput.value = "";
    adminModal.hidden = false;
  }

  if (openAdminBtn) openAdminBtn.addEventListener("click", openAdminModal);
  if (closeAdminBtn) {
    closeAdminBtn.addEventListener("click", () => {
      adminModal.hidden = true;
    });
  }

  generateBtn.addEventListener("click", async () => {
    try {
      const parsed = JSON.parse(adminJsonInput.value);
      const pass = adminPassInput.value.trim();
      if (!pass) {
        alert("Please enter an encryption passphrase.");
        return;
      }
      const encrypted = await encryptPayload(parsed, pass);
      adminOutput.value = `export const encryptedLiabilities = ${JSON.stringify(encrypted, null, 2)};\n`;
    } catch (e) {
      alert("Invalid JSON syntax: " + e.message);
    }
  });

  copyOutputBtn.addEventListener("click", () => {
    if (!adminOutput.value) return;
    navigator.clipboard.writeText(adminOutput.value);
    copyOutputBtn.textContent = "✓ Copied!";
    setTimeout(() => {
      copyOutputBtn.textContent = "Copy Code for js/data/encryptedLiabilities.js";
    }, 2000);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
