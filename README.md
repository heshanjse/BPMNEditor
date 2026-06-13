# BPMN Editor

A web-based Business Process Model and Notation (BPMN) diagram editor built with vanilla JavaScript, D3.js v7, and Bootstrap 5.

Draw, connect, and export BPMN diagrams entirely in the browser — no installation or build step required.

---

## Features

- **Drag-and-drop** elements from the toolbox onto an infinite canvas
- **Zoom & pan** — scroll to pan, `+` / `−` buttons to zoom
- **Smart flow routing** — flows automatically pick the correct port on each element and route around obstacles using 4 path modes (horizontal/vertical exit × horizontal/vertical entry)
- **Element tooltip** — click any element to reveal delete, draw-flow, and properties actions
- **Task resize** — drag the bounding-box handles to resize a task
- **Properties** — set a name/label on any element via its properties modal
- **Save & load** — download the diagram as JSON; re-upload to restore it exactly

---

## BPMN Elements

| Category | Elements |
|---|---|
| **Start Events** | Start Event, Time Start Event, Message Start Event, Error Start Event |
| **End Events** | End Event, Error End Event, Terminate End Event, Cancel End Event |
| **Tasks** | User Task, Script Task, Mail Task, Manual Task |
| **Gateways** | Parallel Gateway, Exclusive Gateway, Inclusive Gateway, Event Gateway |
| **Flow** | Sequence Flow (from toolbox or element tooltip) |

---

## Getting Started

1. Clone the repository
   ```
   git clone https://github.com/heshanjse/BPMNEditor.git
   ```
2. Open `index.html` in any modern browser — no build step required.

**Optional dev server (auto-reload):**
```
npm install
npm run dev
```

---

## How to Use

- **Place an element** — drag an icon from the left toolbox onto the canvas, or click the icon then click the canvas
- **Connect elements** — click a placed element to open its tooltip, then click the arrow icon; click a second element to complete the flow
- **Delete** — open an element's tooltip and click the trash icon; all connected flows are removed too
- **Move** — drag any element; connected flows re-route automatically
- **Zoom/Pan** — scroll (or shift-scroll) to pan; use the `+`/`−` buttons (bottom-right) to zoom
- **Save** — click the download icon at the bottom of the toolbox
- **Load** — click the upload icon and select a previously saved JSON file

---

## Directory Layout

```
BPMNEditor/
├── index.html                  — HTML shell + modal definitions
├── styles/
│   ├── app.css                 — Canvas and global styles
│   └── toolbox.css             — Toolbox panel styles
├── assets/img/                 — Element icons and toolbar images
├── vendor/                     — D3 v7, Bootstrap 5, FileSaver
└── src/
    ├── main.js                 — Entry point: SVG init, zoom, toolbox wiring
    ├── state/
    │   └── store.js            — Centralized state (exposed as window globals)
    ├── canvas/
    │   ├── divider.js          — Element router + drag reconnect
    │   └── flowEngine.js       — Flow routing: port selection, path formulas, obstacle avoidance
    ├── elements/
    │   ├── startEvent.js
    │   ├── endEvent.js
    │   ├── task.js
    │   ├── gateway.js
    │   └── flow.js
    ├── io/
    │   ├── serializer.js       — Write elements to bpmnjson
    │   └── deserializer.js     — Reconstruct diagram from JSON
    ├── ui/
    │   └── tooltip.js          — Shared tooltip HTML builder
    └── utils/
        └── geometry.js         — Screen ↔ canvas coordinate conversion
```

---

## Contact

For questions or feedback: psaheshan@gmail.com
