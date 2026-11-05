/**
 * ============================================================================
 * STARTER TEMPLATE FOR NEW WEB SUB-BRANCH MEMBERS
 * ============================================================================
 * Welcome to the RegCom Web Sub-Branch! 🎉
 * Copy this file to create your very first mini-game or interactive widget.
 *
 * HOW TO ADD YOUR GAME IN 2 EASY STEPS:
 * 1. Duplicate this file in `js/games/` (e.g., `js/games/myGame.js`).
 * 2. Open `js/games/index.js`, import your game, and add it to the list!
 */

export default {
  // 1. Your Game & Developer Credits
  id: "starter-game",
  title: "My First RegCom Game",
  author: "Your Name",
  authorRole: "Web Sub-Branch Member (Year & Course)",
  description: "A short 1-sentence description of how to play your game.",

  // 2. Render & Run Your Game Inside `container`
  mount(container) {
    let clicks = 0;

    container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h3 style="margin-top: 0;">Kumusta, Atenista! 👋</h3>
        <p>You have clicked the button <strong id="click-count">0</strong> times.</p>
        <button type="button" class="btn btn-primary" id="click-btn">
          Click Me!
        </button>
      </div>
    `;

    const btn = container.querySelector("#click-btn");
    const countEl = container.querySelector("#click-count");

    btn.addEventListener("click", () => {
      clicks++;
      countEl.textContent = String(clicks);
    });

    // Optional: Return a cleanup function (e.g., clearInterval or removeEventListener)
    // when the user switches to another game tab.
    return () => {};
  }
};
