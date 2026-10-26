<p align="center">
  <img src="favicon.svg" width="64" height="64" alt="Bluetooth seminar symbol">
</p>

<h1 align="center">Bluetooth – Basic Communication</h1>

<p align="center">How nearby devices discover, connect and exchange data wirelessly.</p>
<p align="center"><strong>7 slides · 13.5 minutes · Interactive diagrams · Offline-ready</strong></p>

An interactive classroom seminar for students with little or no networking background. Follow three familiar stories: connecting a speaker, reading a battery-powered sensor, and setting up a new smart bulb. Learn what Bluetooth does behind the scenes through original diagrams, manual demonstrations, and conversational presenter notes.

Built with **HTML, CSS and vanilla JavaScript**. No build step, backend, account, CDN, or runtime framework is required.

## Getting started

### Open directly

Download the repository using **Code → Download ZIP**, extract it, and open **`index.html`** in a modern browser. Keep the other project files alongside it.

The lesson, diagrams, interactions, and bundled fonts are local. Only external reference links require internet access.

### Clone and serve locally

```sh
git clone https://github.com/Sreeram-R-6/bluetooth-seminar.git
cd bluetooth-seminar
python -m http.server 8000 --bind 127.0.0.1
```

Open **[http://127.0.0.1:8000](http://127.0.0.1:8000)**. Python 3 is needed only for this optional server; on Windows, `py -m http.server 8000 --bind 127.0.0.1` is an alternative. Stop the server with `Ctrl+C`.

> This repository contains the website source. A hosted demo is not configured by this publication.

## The seven-slide story

| # | Slide | What students learn | Time |
| --- | --- | --- | --- |
| 1 | Bluetooth – Basic Communication | Everyday devices exchange audio, health data, commands and measurements | 1.5 min |
| 2 | From “Nearby” to “Connected” | Scan, discover, select, pair, connect and exchange data | 2.5 min |
| 3 | Two Different Communication Needs | Why Classic audio and BLE sensor communication suit different needs | 2 min |
| 4 | Bluetooth as the First Door into an IoT Device | How a phone can provision a screenless device before Wi-Fi takes over | 2.5 min |
| 5 | Profiles, Services and Characteristics | How profiles and GATT structures give application data meaning | 2 min |
| 6 | Why Not Use Wi-Fi for Everything? | Where nearby Bluetooth interaction fits beside network connectivity | 1.5 min |
| 7 | From “Device Nearby” to Useful Communication | The complete story and three optional knowledge checks | 1.5 min |

The main presentation stays at seven slides. Longer explanations and technical clarifications live in presenter notes.

## Explore the demonstrations

| Interaction | Try it | Teaching purpose |
| --- | --- | --- |
| Device explorer | Select earbuds, speaker, watch, bulb, sensor or mouse | See what information travels and which devices communicate |
| Connection stepper | Use **Back**, **Next Step** and **Reset** | Build the speaker connection one stage at a time |
| Classic / BLE comparison | Switch communication modes | Compare sustained audio packets with occasional sensor readings |
| IoT setup wizard | Discover, connect, configure, join Wi-Fi and complete setup | Follow a fictional smart bulb from unconfigured to network-connected |
| GATT explorer | Select temperature, humidity, battery or LED control | Distinguish reading a value, writing a command and receiving updates |
| Recap check | Expand the final slide’s three questions | Confirm understanding with immediate explanations |

These are illustrative simulations. The site does not scan real Bluetooth devices, request Bluetooth permissions, or collect credentials. Configuration values and sensor readings are teaching examples.

## Present in the classroom

Click **Present** to request native fullscreen. If the browser refuses, presentation mode still fills the browser viewport. The sidebar and toolbar initially disappear; press **H** to reveal the controls. Interactions remain usable during presentation.

| Key or control | Action |
| --- | --- |
| `→` / `Page Down` | Next slide |
| `←` / `Page Up` | Previous slide |
| `Home` / `End` | First / last slide |
| `G` | Open the chapter overview |
| `N` | Toggle presenter notes |
| `F` | Enter or leave presentation mode |
| `H` | Show or hide the presentation toolbar |
| `Escape` | Close the active dialog or leave presentation |
| **Motion** | Pause or resume explanatory animations |

There is no automatic slide advancement. The connection and provisioning demonstrations advance only when you press their controls.

Every slide includes an opening sentence, core explanation, analogy, technical clarification, misconception, audience question, transition, and estimated speaking time. Use **Notes** while rehearsing; notes are visible during presentation when the toolbar is shown.

Link to a particular slide with its hash, for example **`index.html#slide-4`** or **`http://127.0.0.1:8000/#slide-4`**.

## Print or save as PDF

Open **Sources & print → Print lesson / save PDF**, or use the browser’s print command.

The print layout prepares the entire lesson, including off-screen slides:

- All six speaker-connection stages appear together.
- Classic and BLE are shown side by side.
- The provisioning diagram shows the completed setup architecture.
- GATT values and solved quiz explanations are expanded.
- Each slide is followed by a separate presenter-notes page.

The stylesheet requests **A4 landscape**, targeting seven slide pages and seven notes pages. Browser pagination and print settings can affect the result; inspect print preview before distributing. Choose **Save as PDF** in the browser dialog to create a PDF. The site does not export a `.pptx` file.

## Accessibility and motion

- Native buttons and modal dialogs support keyboard operation.
- Actionable controls have visible focus indicators and accessible names.
- Diagrams include text labels and accessible descriptions; meaning does not depend on color or animation alone.
- Result text explains selection, connection, and configuration states.
- A global motion control pauses packet and scanning animations.
- `prefers-reduced-motion` is respected, including preference changes during use.
- Smaller layouts stack teaching content and allow vertical scrolling.

These are implemented features, not a claim of a complete accessibility certification.

## Technical accuracy

The lesson uses a simplified speaker workflow while preserving important distinctions:

- **Pairing** establishes a security/trust relationship; **connection** is an active communication link. Some BLE communication needs neither pairing nor a connection.
- **Classic and BLE** address different communication needs. BLE is not simply slower Classic Bluetooth; LE Audio also exists.
- **Profiles**, **GATT services**, and **characteristics** are distinct concepts. Battery Level is shown in a separate Battery Service.
- **BLE provisioning** is a common IoT pattern, not a rule for every smart bulb. Security is an explicit assumption of the setup example.
- Speed, range, and energy use depend on the device, workload and environment; no universal performance figures are invented.

See [sources and scope](docs/SOURCES.md) for Bluetooth SIG and platform references, and the [slide map](docs/SLIDE-MAP.md) for the teaching plan.

## Project structure

```text
bluetooth-seminar/
├── index.html             # Application shell, navigation and dialogs
├── styles.css             # Visual system, diagrams, responsive and print layouts
├── app.js                 # Slide content, reusable devices, state and interactions
├── favicon.svg            # Topic identity
├── fonts/                 # Bundled DM Sans / Space Grotesk and their OFL licenses
├── verify.cjs             # Optional DOM behavior verification
└── docs/
    ├── SLIDE-MAP.md        # Narrative, visuals, interactions and timings
    ├── SOURCES.md          # References and technical simplifications
    ├── VERIFICATION.md     # Checks performed and their limits
    └── SKILLS.md           # Design and implementation process notes
```

Slide content and presenter notes are collected in `app.js`. Navigation, overview entries, progress indicators and print ordering are generated from the same slide data. Reusable device and diagram helpers keep illustrations consistent.

## Verification

The optional harness checks slide rendering, navigation boundaries, keyboard guards, notes, each interaction, reduced-motion state, hash links, local assets, and completed print output. Fullscreen and dialog APIs are mocked in the DOM tests.

For the syntax check, use Node.js:

```sh
node --check app.js
```

For DOM tests, install the test-only dependency in an ignored directory. Use Node.js **22.13 or later in the 22.x line**, or a compatible newer release, for the pinned jsdom version.

```sh
npm install --prefix .test-tools --no-save --package-lock=false jsdom@29.1.1
```

Then run in **PowerShell**:

```powershell
$env:JSDOM_PATH = '.test-tools/node_modules/jsdom'
node verify.cjs
```

Or in **macOS/Linux shells**:

```sh
JSDOM_PATH=.test-tools/node_modules/jsdom node verify.cjs
```

If jsdom is already installed in the project’s `node_modules`, `node verify.cjs` works directly. Test dependencies are not needed to open or present the website.

**Verification boundary:** automated DOM checks pass. Rendered layouts, actual native fullscreen, animation smoothness and visual print pagination have not been confirmed in a real browser. See the [verification record](docs/VERIFICATION.md) for exact evidence and limitations.

## Fonts and attribution

The site bundles **DM Sans** and **Space Grotesk** with their [DM Sans license](fonts/dmsans-OFL.txt) and [Space Grotesk license](fonts/spacegrotesk-OFL.txt). Original schematic diagrams illustrate the user-supplied seminar content; authoritative factual references are linked in the lesson and source notes.
