# Creative Technology — WWTd

Landing page for the Creative Technology team.

## Stack

Vanilla HTML, CSS, JavaScript. No build step. No framework. No dependencies.

- **Fonts** — DM Sans, DM Mono, Fraunces (Google Fonts)
- **JS** — ES Modules (`type="module"`)
- **CSS** — Custom properties, component-scoped files

---

## Project Structure

```
creative-technology/
├── index.html
├── assets/
│   ├── css/
│   │   ├── tokens.css        ← design tokens (colors, type, spacing) — edit here first
│   │   ├── base.css          ← reset, body, grain, global elements
│   │   ├── animations.css    ← keyframes, reveal classes, entrance animations
│   │   ├── nav.css
│   │   ├── hero.css
│   │   ├── work.css          ← work grid, cards, all mock windows
│   │   ├── about.css
│   │   └── contact.css       ← contact strip + footer
│   ├── js/
│   │   ├── main.js           ← entry point: nav, theme toggle, module init
│   │   ├── reveal.js         ← IntersectionObserver scroll reveal
│   │   └── transform.js      ← hero strip cycling animation
│   └── fonts/                ← drop self-hosted fonts here if moving off Google Fonts
├── .gitignore
├── CHANGELOG.md
└── README.md
```

---

## Getting Started

No build step required. Open `index.html` directly in a browser, or serve locally:

```bash
# Python
python3 -m http.server 3000

# Node (npx)
npx serve .
```

> **Note:** `<script type="module">` requires a server (not `file://`) due to CORS. 
> Use one of the above for local development.

---

## Making Changes

### Colors / Tokens
Edit `assets/css/tokens.css` only. All other files reference variables — nothing is hardcoded.

### Adding a project card
Copy an `<article class="work-card">` block in `index.html`. Update the tag, mock window, transform labels, title, and description. Update the section count (`04 projects` → `05 projects`).

### Adding a transform cycle
Open `assets/js/transform.js` and add a row to the `CYCLES` array:
```js
const CYCLES = [
  ['working tools', 'clear signal', 'living systems'],
  // add your row here
];
```

### Dark mode persistence
Dark mode preference is saved to `localStorage` under the key `ct-dark-mode`. It persists across sessions automatically.

---

## Versioning

Use Git tags to mark releases:

```bash
git tag -a v0.1.0 -m "Initial prototype"
git tag -a v0.2.0 -m "Content updates, new project added"
git tag -a v1.0.0 -m "Production ready"
```

See `CHANGELOG.md` for release notes.

---

## Deployment

Drop the entire folder on any static host:
- **Netlify** — drag and drop the folder at netlify.com/drop
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push to a `gh-pages` branch

No build configuration needed.
