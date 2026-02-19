# Kafka Intro — Vue slide deck

Vue 3 + Vite slide deck for **Introduction to Kafka**. One file per slide, shared layout components.

## Setup

```bash
cd Slides/vue-deck
npm install
```

**Diagrams:** Copy the diagram images from the parent `Slides/` folder into `public/` so they load:

```bash
# From vue-deck folder (Windows PowerShell)
Copy-Item ..\diagram-*.png public\
```

Or copy manually: `diagram-01-problem-vs-solution.png` through `diagram-07-metadata-kraft.png` into `Slides/vue-deck/public/`.

## Run

```bash
npm run dev
```

Open the URL shown (e.g. http://localhost:5173). Use **← / →** or **Space** to navigate.

## Build

```bash
npm run build
```

Output is in `dist/`. Serve that folder or deploy it.

## Structure

- **`src/App.vue`** — Current slide index, navigation, keyboard handling.
- **`src/components/`**
  - `SlideFrame.vue` — Shared layout (title, subtitle, body, optional image slot).
  - `ProgressBar.vue` — Top progress bar.
  - `Navigation.vue` — Prev/next buttons, counter, keyboard hint.
- **`src/slides/`** — One `.vue` file per slide (`Slide001.vue` … `Slide032.vue`), each using `SlideFrame` and slots for content.
- **`src/slides/index.js`** — Exports the ordered list of slide components.
