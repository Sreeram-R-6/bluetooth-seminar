# Sources and technical scope

Checked 2026-10-07. Lesson content follows the user’s seven-slide Bluetooth specification. Diagrams are original, reusable inline SVG/CSS teaching illustrations; no external artwork is copied. Local Space Grotesk and DM Sans font files and OFL licenses come from the supplied neighboring seminar reference.

| Slides | Primary reference | What it supports |
| --- | --- | --- |
| 1, 3, 6, 7 | [Bluetooth SIG technology overview](https://www.bluetooth.com/learn-about-bluetooth/tech-overview/) | Classic and LE are different radio designs; 2.4 GHz ISM; common audio and low-power applications |
| 2, 5, 7 | [Bluetooth SIG BLE primer](https://www.bluetooth.com/bluetooth-le-primer/) | Advertising before connection, pairing/security, GATT services and characteristics, read/write/notification concepts |
| 3 | [Bluetooth SIG LE Audio specifications](https://www.bluetooth.com/learn-about-bluetooth/feature-enhancements/le-audio/le-audio-specifications/) | LE also supports audio; audio versus periodic sensor data is a typical-use teaching comparison |
| 4, 6 | [Espressif provisioning applications](https://www.espressif.com/en/support/download/apps), [security overview](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/security/security.html) | Concrete example of phone-assisted BLE onboarding and secure Wi-Fi provisioning |
| 5 | [Bluetooth SIG specifications](https://www.bluetooth.com/specifications/specs/), [HFP](https://www.bluetooth.com/specifications/specs/hands-free-profile-1-10/), [HID](https://www.bluetooth.com/specifications/specs/human-interface-device-profile-1-0/), [HID over GATT](https://www.bluetooth.com/specifications/specs/hid-over-gatt-profile-1-0/) | Agreed application profiles for audio, calling and human input; distinction between Classic HID and BLE HID over GATT |

## Teaching simplifications and clarifications

- The six-stage connection diagram represents a familiar new-speaker workflow, not a universal Bluetooth state machine. BLE can connect without pairing, pairing can occur after a BLE link is established, and advertising can communicate without connecting. These limits appear on the slide and in notes.
- “Establish trust” is beginner language for the security relationship. Pairing methods offer different authentication guarantees. Bonding can preserve pairing information for reconnection. Paired does not mean currently connected.
- The Classic/BLE comparison illustrates typical workloads, not universal power, speed or range figures. LE Audio is acknowledged. No universal performance number is invented.
- Provisioning is an illustrative common architecture. A secure setup session is an explicit assumption; BLE does not automatically make an application secure. Other products may use other onboarding methods or keep BLE during normal operation. Wi-Fi network and credentials are fictional examples.
- GATT is Generic Attribute Profile. Services group related BLE data/functions, characteristics are individual values/controls. The environmental/battery/custom control tree is a conceptual example. Battery Level is in a separate Battery Service. Read/write/notification capabilities depend on the actual characteristic.
- Profile, protocol, service and characteristic are distinguished in presenter notes. A2DP is Advanced Audio Distribution Profile, HFP is Hands-Free Profile, and HID is Human Interface Device. Students need to understand the jobs, not memorize the expansions.
- Bluetooth and Wi-Fi are compared by common roles, not exclusive capabilities. Wi-Fi can be local without internet; Bluetooth generally provides local interaction in these examples. Cellular receives only a brief contextual mention.
- There is no RF mathematics, full stack, UUID/packet structure, mesh architecture or version history.

## Coverage

All seven requested slides, eight original diagram families, thirteen-minute narrative, four primary interactions, GATT explorer, optional recap quiz, projector presentation, local fonts, reduced motion, notes and completed print states are included. The detailed slide map is in SLIDE-MAP.md.

The reusable prompt was read from `../CN/promptformc.md`; its reference shell, typography and licensed local fonts informed this website. The topic-specific seven-slide order takes priority over its default slide count.
