# CodeUtsava 10.0 — Among Us themed landing page

A single-page React + Vite site. No animation libraries, no TypeScript,
no state management library — just React state, CSS `@keyframes`,
`transition`, and `transform`.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. For a production build:

```bash
npm run build
npm run preview
```

## How it's put together

- `src/App.jsx` — holds one piece of state, `showIntro`, and switches
  between the `<Intro />` screen and the real page.
- `src/components/Intro.jsx` — the "ENTER THE MISSION" splash screen.
  Uses one more piece of state (`exiting`) to fade itself out before
  calling the `onEnter` prop it was given.
- `src/components/Navbar.jsx` — plain anchor links (`#home`, `#about`...)
  with `scroll-behavior: smooth` in CSS doing the smooth scrolling.
  A `menuOpen` boolean toggles the mobile menu.
- `src/components/Crewmate.jsx` — one reusable SVG character. It takes a
  `color` prop so the same component can render every crewmate.
- `src/components/StarBackground.jsx` — generates an array of random
  star/particle positions with a plain JS function, then renders one
  `<span>` per star. All movement (twinkle, drift, shooting stars,
  drifting planets) is done with CSS `@keyframes` in `src/index.css`.
- `src/components/About.jsx`, `Timeline.jsx`, `Guidelines.jsx`,
  `Sponsors.jsx`, `FAQ.jsx` — each section maps over a small array from
  `src/data/content.js` with `.map()`. `FAQ.jsx` has the one other piece
  of state in the app, `openFAQ`, tracking which question is expanded.
- `src/index.css` — one global stylesheet, organized by section, with a
  small set of CSS variables at the top for colors and fonts.

## Fonts

The heading font is **Freeman** (Google Fonts) — a bold, chunky,
rounded display face that reads close to the Among Us logo style.
Body text uses **Inter** for readability. Both are loaded via a
`<link>` tag in `index.html`, so no font files or npm packages are
involved.

## Dependencies

Only `react`, `react-dom`, `vite`, and `@vitejs/plugin-react` — the
standard set for any Vite + React app. Nothing else was added.
