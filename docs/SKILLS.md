# Applied skills

- **design-taste**: reference-driven academic editorial design, critique/refinement, motion guidance and mechanical preflight. The requested local fonts, green palette and original schematic SVGs take priority over generic visual defaults.
- **ui-skills-root**: attempted local CLI routing; it failed with `uv_os_get_passwd returned ENOMEM`. Selected the narrow accessibility guidance directly instead of installing dependencies.
- **fixing-accessibility**: native controls/dialogs, focus restoration, visible keyboard focus, meaningful diagram groups, heading hierarchy, live result text and reduced motion.

Context7 resolved Playwright and retrieved current media-emulation/viewport/print documentation for planned browser verification. The browser tool subsequently required unavailable approval, so browser verification is explicitly limited in VERIFICATION.md.

## Refinement review

| Before | After | Why |
| --- | --- | --- |
| HFP diagram combined two direction arrows | One bidirectional HFP label | Calls exchange voice/control in both directions |
| Generic diagram containers had labels only | Labeled diagram groups | Give accessible names to the schematic groups |
| Content headings skipped h2 | h2 follows the active slide h1 | Preserve a coherent heading hierarchy |
| Pairing sequence could look universal | Speaker-model footnote and detailed BLE clarification | BLE pairing/connect order and requirements vary |
| Notes could crowd a printed slide | Separate notes page after every diagram page | Keep diagrams and teaching guidance readable |
| Initial scan only had text | Expanding radio rings with a static label | Explain search while keeping meaning available when paused |
| Configuration stage only changed text | Configuration packet on labeled BLE arrow | Show what the setup link carries |
