# Verification

Initial implementation checked 2026-10-07 in the project workspace.

## Passed

- JavaScript syntax check with the neighboring reference’s Node 22.20.0 runtime.
- `verify.cjs` passes using the existing neighboring jsdom test runtime. It checks all seven slide renderers, matching navigation/progress counts, notes, title updates, navigation boundaries, keyboard controls and modifier/input/dialog guards.
- All device explorer selections highlight exactly one link. Mouse data goes directly to laptop.
- Speaker stepper covers all six stages, forward/back boundaries and reset. Data stage creates audio packets.
- Classic/BLE focus switches sustained/intermittent packets and pressed states.
- Provisioning wizard covers all five actions, backwards/reset behavior, fictional configuration and completed Wi-Fi state.
- GATT selections cover temperature, humidity, battery and write control, with accessible pressed states and text explanations.
- All three quiz questions explain correct and incorrect selections.
- Notes persist through slide navigation and include seven presenter guidance fields per slide; timings sum to 13.5 minutes.
- Presentation state, hidden HUD, H toggle, edge navigation, Escape and browser-initiated fullscreen exit pass with mocked Fullscreen APIs. API rejection retains viewport presentation and explains the fallback.
- Motion pause/resume and live reduced-motion changes pass with mocked media preferences.
- Print generation includes all seven slides and seven separate notes pages, all six connection stages, both comparison examples, completed provisioning, expanded GATT data and solved quiz. After-print cleanup passes.
- Deep-link initialization, invalid-index clamping, subsequent hash changes, unique IDs, accessible button names and local asset presence pass.
- HTTP serving verified: `http://127.0.0.1:8000/index.html` returns 200. Every runtime asset is local; no CDN, runtime library, data fetch or external font is required.
- Design mechanical preflight: **zero hard violations**. One warning remains for the en dash in the user-specified seminar title; the title is retained exactly.

## Verification boundaries

Browser-tool navigation was automatically rejected because approval is unavailable under this session’s policy. A local headless Edge attempt failed with `GPU process isn't usable`; another attempt did not produce a screenshot. No rendered screenshot or PDF was obtained.

Consequently, **real browser rendering, console behavior, 375/768/1440px geometry, projector fitting, native fullscreen, animation smoothness, direct-file browser execution and visual print pagination remain unverified**. The DOM tests above use mocks for dialogs, motion preferences, resizing and Fullscreen APIs. HTTP success and source inspection are not substitutes for browser testing.

Responsive and print rules were reviewed in source. At small widths columns stack and ordinary vertical scrolling is available. Presentation controls sit in document flow rather than over diagrams; edge buttons occupy only the outer gutter. A4 landscape print uses a dedicated seven-slide deck with completed states, separate notes pages and no dependency on background printing for labels. These are implemented behaviors, not visually verified claims.

## Content review

The presentation answers: what Bluetooth is; how a phone discovers a speaker; pairing versus active connection; what data moves; Classic versus BLE design goals; why BLE suits IoT; provisioning and later Wi-Fi operation; profiles, GATT services and characteristics; and why wireless links coexist. Technical limits are explained in notes and brief slide footnotes. There are exactly seven main slides.

## Design and accessibility pre-flight

| Check | Result |
| --- | --- |
| Brief, mode and intensity dials | Documented in SLIDE-MAP.md |
| Reference identity and tokens | Preserved green editorial shell and licensed local fonts |
| Theme and accent | Locked light classroom theme; green accent; blue focus ring |
| Redesign audit | N/A: new workspace; reference inspected |
| Typography and hierarchy | Responsive sizes; content headings follow h1 with h2; browser fit unverified |
| Contrast | Tokens reviewed; body contrast ratios checked with verification script |
| Copy and technical meaning | All slide text and notes reviewed; example values clearly illustrative |
| Motion | Only explanatory packets/radio rings; transform/opacity; pause and reduced-motion fallbacks |
| Responsive | CSS reviewed; rendered geometry unverified |
| Interaction states | Native controls, disabled boundaries, pressed state, reset and informative outputs |
| Loading/error/empty states | N/A: no data loading or requests; fullscreen rejection handled |
| Focus and dialogs | Visible control focus; native modal dialog semantics; restoration DOM-tested |
| Form errors | N/A: no forms |
| Layout restraint | Diagram containers and dividers; no decorative shadows or gradients |
| Visual assets | Original schematics explicitly requested; no copied illustrations |
| Metrics | No invented speed, power or range values; readings are example data |
| Performance | No framework, canvas, remote assets or animation JS loop; actual browser vitals unverified |
| Print | Completed static output DOM-tested; rendered pagination unverified |

## Repeat checks

```powershell
node --check app.js
$env:JSDOM_PATH = '.test-tools/node_modules/jsdom'
node verify.cjs
```

Install the optional test tools as described in the README first. The test-only jsdom location can be overridden with `JSDOM_PATH`; otherwise the harness resolves a project-local jsdom installation. This is not a runtime dependency of the website.

## Publication preparation, 2026-10-26

- Re-ran JavaScript syntax validation and the complete DOM harness successfully.
- Made jsdom resolution portable through `JSDOM_PATH` or a project-local installation.
- Checked README local links and publication file inventory.
- Excluded browser profiles, logs, screenshots/PDF test artifacts and dependency folders from Git.
- Preserved the original browser verification boundaries above.
