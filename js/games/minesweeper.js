/**
 * ============================================================================
 * WEB BRANCH SHOWCASE: MINESWEEPER (Clear the Hold Orders)
 * ============================================================================
 * A clean, modular Minesweeper mini-game themed around clearing AISIS Hold Orders.
 * Easy for Web Sub-branch members to inspect, customize, or use as a template
 * to add their own games!
 */

export const minesweeperMeta = {
  id: "minesweeper",
  title: "Hold Order Sweeper",
  genre: "Logic & Puzzle (Minesweeper)",
  author: "Martin Angelo M. Funelas",
  authorRole: "Web Maintenance Head (4 BS CS)",
  description:
    "Navigate the 9×9 AISIS enlistment grid and flag all 10 hidden Hold Orders without triggering a registration lock! Left-click to clear a slot, right-click (or toggle Flag Mode) to flag a Hold Order."
};

export function mountMinesweeper(container) {
  const ROWS = 9;
  const COLS = 9;
  const MINES = 10;

  let board = [];
  let revealedCount = 0;
  let flagsCount = 0;
  let gameOver = false;
  let firstClick = true;
  let flagMode = false;
  let timer = 0;
  let timerInterval = null;

  container.innerHTML = `
    <div class="game-widget minesweeper-widget">
      <div class="game-hud">
        <div class="hud-stat">
          <span class="hud-label">Hold Orders Left</span>
          <span class="hud-value" id="ms-mines-left">${MINES}</span>
        </div>
        <div class="hud-controls">
          <button type="button" class="btn btn-sm btn-secondary" id="ms-flag-toggle" title="Toggle Flag Mode for touch/trackpad">
            🚩 Flag Mode: OFF
          </button>
          <button type="button" class="btn btn-sm btn-primary" id="ms-reset-btn">
            ↻ New Enlistment Grid
          </button>
        </div>
        <div class="hud-stat">
          <span class="hud-label">Shift Timer</span>
          <span class="hud-value" id="ms-timer">000s</span>
        </div>
      </div>
      <div class="game-status-banner" id="ms-status">
        Click any square to begin enlisting. Right-click or use Flag Mode to mark Hold Orders!
      </div>
      <div class="minesweeper-grid" id="ms-grid" role="grid" aria-label="Minesweeper Grid"></div>
    </div>
  `;

  const gridEl = container.querySelector("#ms-grid");
  const minesLeftEl = container.querySelector("#ms-mines-left");
  const timerEl = container.querySelector("#ms-timer");
  const statusEl = container.querySelector("#ms-status");
  const resetBtn = container.querySelector("#ms-reset-btn");
  const flagToggleBtn = container.querySelector("#ms-flag-toggle");

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
      timer = Math.min(999, timer + 1);
      timerEl.textContent = String(timer).padStart(3, "0") + "s";
    }, 1000);
  }

  function initBoard() {
    stopTimer();
    timer = 0;
    revealedCount = 0;
    flagsCount = 0;
    gameOver = false;
    firstClick = true;
    timerEl.textContent = "000s";
    minesLeftEl.textContent = String(MINES);
    statusEl.textContent = "Click any square to begin enlisting. Right-click or use Flag Mode to mark Hold Orders!";
    statusEl.className = "game-status-banner";

    board = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          r,
          c,
          mine: false,
          revealed: false,
          flagged: false,
          neighborMines: 0
        });
      }
      board.push(row);
    }
    renderGrid();
  }

  function placeMines(safeR, safeC) {
    let placed = 0;
    while (placed < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (board[r][c].mine) continue;
      if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
      board[r][c].mine = true;
      placed++;
    }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c].mine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) {
              count++;
            }
          }
        }
        board[r][c].neighborMines = count;
      }
    }
  }

  function revealCell(r, c) {
    if (gameOver) return;
    const cell = board[r][c];
    if (cell.revealed || cell.flagged) return;

    if (firstClick) {
      firstClick = false;
      placeMines(r, c);
      startTimer();
    }

    cell.revealed = true;
    revealedCount++;

    if (cell.mine) {
      gameOver = true;
      stopTimer();
      revealAllMines();
      statusEl.textContent = "💥 Hold Order Triggered! Please contact the concerned office for a clearance slip.";
      statusEl.className = "game-status-banner status-lost";
      renderGrid();
      return;
    }

    if (cell.neighborMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !board[nr][nc].revealed) {
            revealCell(nr, nc);
          }
        }
      }
    }

    if (revealedCount === ROWS * COLS - MINES) {
      gameOver = true;
      stopTimer();
      statusEl.textContent = `🎉 Batch Enlistment Complete in ${timer}s! All Hold Orders cleared!`;
      statusEl.className = "game-status-banner status-won";
    }
  }

  function toggleFlag(r, c) {
    if (gameOver) return;
    const cell = board[r][c];
    if (cell.revealed) return;
    cell.flagged = !cell.flagged;
    flagsCount += cell.flagged ? 1 : -1;
    minesLeftEl.textContent = String(MINES - flagsCount);
    renderGrid();
  }

  function revealAllMines() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c].mine) {
          board[r][c].revealed = true;
        }
      }
    }
  }

  function renderGrid() {
    gridEl.innerHTML = "";
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = board[r][c];
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ms-cell";
        if (cell.revealed) {
          btn.classList.add("revealed");
          if (cell.mine) {
            btn.classList.add("mine");
            btn.textContent = "🔒";
          } else if (cell.neighborMines > 0) {
            btn.textContent = String(cell.neighborMines);
            btn.dataset.num = String(cell.neighborMines);
          }
        } else if (cell.flagged) {
          btn.classList.add("flagged");
          btn.textContent = "🚩";
        }

        btn.addEventListener("click", () => {
          if (flagMode) {
            toggleFlag(r, c);
          } else {
            revealCell(r, c);
            renderGrid();
          }
        });

        btn.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          toggleFlag(r, c);
        });

        gridEl.appendChild(btn);
      }
    }
  }

  flagToggleBtn.addEventListener("click", () => {
    flagMode = !flagMode;
    flagToggleBtn.textContent = flagMode ? "🚩 Flag Mode: ON" : "🚩 Flag Mode: OFF";
    flagToggleBtn.classList.toggle("active-toggle", flagMode);
  });

  resetBtn.addEventListener("click", initBoard);

  initBoard();

  return () => {
    stopTimer();
  };
}

export default {
  ...minesweeperMeta,
  mount: mountMinesweeper
};
