# Changelog

All notable user-facing changes to MicroPythonOS IDE (formerly Fri3d-IDE).

## Unreleased

### Changed

- **Renamed to MicroPythonOS IDE** — the project is now positioned as a
  general MicroPythonOS IDE, with the Fri3d Camp badge as one supported
  device among others. Product name, page title, PWA manifest, and
  repository links were updated accordingly; the BadgeHub integration is
  unchanged.
- **Virtual device picker** — the virtual device now offers a choice between
  a generic MicroPythonOS device skin and the Fri3d Camp 2026 badge skin,
  selectable from the Welcome page.
- **Generic MicroPythonOS device shape** — the generic virtual device skin
  no longer mimics the Fri3d badge's horizontal PCB layout; it's now its
  own simpler, more vertical shape with a plain LED strip on top, the
  screen in the middle, and a D-pad + button cluster below.
- **Device workspace auto-detection** — connecting a physical device now
  detects whether it runs plain MicroPython, MicroPythonOS, or is
  specifically a Fri3d Camp 2026 badge, and scopes app templates and
  documentation links accordingly.
- **UI style setting** — a new "Look" setting lets you switch the IDE's own
  visual style between the classic Fri3d neobrutalist look and a softer,
  generic MicroPythonOS look (colors, borders, shadows, and button/dialog
  corner radius). This is a manual choice in Settings, independent of the
  device workspace and color theme (light/dark).
- **Real MicroPythonOS logo** — the app icon and Welcome page logo now use
  the upstream MicroPythonOS project's ouroboros mark instead of a
  placeholder, including the favicon, PWA icons, and Apple touch icon.

### Fixed

- **Generic device D-pad not moving in-app joystick input** — the new
  D-pad's directional buttons only toggled the digital direction bits and
  left the emulated analog joystick centered, so apps that read the
  joystick axes directly (e.g. games) ignored D-pad presses. The D-pad now
  also drives the analog joy_x/joy_y axes while held, matching the Fri3d
  skin's joystick behavior.

## v1.2.4 — 2026-08-14

### Improved

- **BadgeHub publishing** — uploaded MPK filenames no longer include the
  version; the selected version is kept in the app manifest and BadgeHub
  metadata.
- **First-app guide** — updated the end-to-end test for the current seven-step
  guide.

## v1.2.0 — 2026-08-08

### New

- **Changelog in the IDE** — release notes open in a tab once after each
  update, and any time via the About panel or the Welcome tab.

## v1.1.0 — 2026-08-08

### New

- **Welcome tab** — fresh sessions open a VS Code-style Welcome page with
  guided tour launchers (build your first app, install from BadgeHub,
  connect a badge, try the virtual badge) and direct connect buttons.
- **Download files** — a download button next to rename/remove in the file
  manager saves any device file through the browser.
### Improved

- The floating virtual badge panel is now transparent around the badge
  outline instead of a dark box.
- The popped-out virtual badge window follows the IDE theme: white backdrop
  in light mode, black in dark mode.
- First-app guide: clearer joystick game instructions, step solutions, and
  a logging step.
- Screenshots capture at the device's real resolution.

## v1.0.0

Initial Fri3d-IDE release, adapted from [ViperIDE](https://github.com/vshymanskyy/ViperIDE):

- Connect a Fri3d badge over USB, Bluetooth, or WebREPL — or run the
  MicroPythonOS **virtual badge** in the browser, no hardware needed.
- File manager with upload (including recursive folder upload), create,
  rename, and remove.
- Code editor with Python linting, markdown/SVG/image/hex viewers, and
  session recovery for unsaved work.
- App development: templates, `.mpk` export, and BadgeHub publish/install.
- Guided onboarding tours and a step-by-step first-app guide.
- Terminal with collapse/expand, package manager, themes, Dutch
  translation, and PWA install.
