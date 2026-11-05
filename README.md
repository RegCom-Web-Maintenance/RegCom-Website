# Ateneo Registration Committee (RegCom) — Internal Website

**Service. Volunteerism. Discipline. Commitment.**

This repository contains the static internal website for the **Ateneo Registration Committee (RegCom)**, built for **GitHub Pages** with zero build steps, clean ES6 modules, and a modular data architecture so future organization members can easily understand and update it.

---

## 📁 Project Structure

```text
RegCom Website/
├── index.html                        # Clean, minimal single-page layout
├── assets/
│   ├── regcom-logo.svg               # Top-left organization logo
│   └── group-photo-placeholder.svg   # Hero banner white-background group photo placeholder
├── css/
│   └── styles.css                    # Design system (#4385f6 RegCom Blue) & layout
├── js/
│   ├── main.js                       # Renders sections from data files & binds UI events
│   ├── data/
│   │   ├── orgData.js                # ✏️ EDIT THIS: ExeCom, Sub-Branches, Heads, Links
│   │   ├── manualData.js             # ✏️ EDIT THIS: Manual contents, Letter Templates, FAQs
│   │   └── encryptedLiabilities.js   # 🔐 AES-256-GCM encrypted liability payload
│   ├── modules/
│   │   ├── liabilityCrypto.js        # 2-step private liability lookup (Key -> Student ID)
│   │   └── showcaseLoader.js         # Registry & tab loader for Web Branch mini-games
│   └── games/
│       ├── index.js                  # 🎮 GAME REGISTRY: Add your new game here!
│       ├── _template.js              # 👋 Starter template for new Web members
│       └── minesweeper.js            # "Hold Order Sweeper" (Minesweeper) mini-game
└── README.md                         # Maintainer & developer documentation
```

---

## 🛠️ How Future Members Can Update the Website

### 1. Replacing the Hero Group Photo & Logo
- Replace `assets/group-photo-placeholder.svg` (or update the `<img src="...">` in `index.html`) with your organization's white-background studio photo.
- Replace `assets/regcom-logo.svg` with your official logo file if needed.

### 2. Updating the Executive Committee, Sub-Branches, or Links
Open [`js/data/orgData.js`](./js/data/orgData.js):
- **`exeCom`**: Update the names, courses, phone numbers, and `@student.ateneo.edu` emails of the ExeCom.
- **`branches`**: Update the Sub-Branch Heads and summaries for **HR**, **Promos**, and **Web**.
- **`importantLinks`**: Links to the RegCom Manual viewer, **Higher Education Directory** (`https://bit.ly/HEDirectory`), Facebook Helpdesk, and Instagram.

### 3. Updating the Encrypted Liability Tracker (2-Step Private Lookup)
The Liability Tracker works in two private steps so members cannot snoop on other members' records:
1. **Step 1**: Member inputs the decryption key (Default demo key: `regcom2627`) to decrypt [`js/data/encryptedLiabilities.js`](./js/data/encryptedLiabilities.js) in memory.
2. **Step 2**: Member inputs their personal **Student ID Number** (Demo IDs: `221001`, `221010`, `241234`, `245678`) to view **only their own** liability points and breakdown.

**How Membership Heads update the encrypted file:**
1. Click **Membership Heads: Open Admin Encryptor Tool** under the Liability Tracker.
2. Edit the JSON array of member records, set your passphrase, and click **Generate Encrypted File**.
3. Copy the output into `js/data/encryptedLiabilities.js` and commit to GitHub.

### 4. Onboarding New Web Members: Adding a Mini-Game in 2 Steps
Adding a mini-game to the **Web Branch Showcase** is designed as a friendly onboarding activity to introduce new Web Sub-Branch members to ES6 modules and contributing to the repository:

1. **Duplicate [`js/games/_template.js`](./js/games/_template.js)** and save it as `js/games/yourGameName.js`:
   ```js
   export default {
     id: "my-game",
     title: "Name of Your Game",
     author: "Your Full Name",
     authorRole: "Web Sub-Branch Member (Year & Course)",
     description: "Short 1-sentence instruction on how to play.",

     mount(container) {
       container.innerHTML = `<button class="btn btn-primary">Click Me!</button>`;
       return () => {}; // Optional cleanup when switching tabs
     }
   };
   ```
2. **Register it in [`js/games/index.js`](./js/games/index.js)**:
   ```js
   import minesweeper from "./minesweeper.js";
   import myGame from "./yourGameName.js";

   export const games = [
     minesweeper,
     myGame
   ];
   ```
   The website will automatically render a tab for the new game and display the member's developer credits!
