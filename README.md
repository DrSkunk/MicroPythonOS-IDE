# MicroPythonOS IDE

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)
[![CI](https://github.com/DrSkunk/MicroPythonOS-IDE/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/DrSkunk/MicroPythonOS-IDE/actions/workflows/ci.yml)
[![Deploy](https://github.com/DrSkunk/MicroPythonOS-IDE/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/DrSkunk/MicroPythonOS-IDE/actions/workflows/deploy-pages.yml)
[![License](https://img.shields.io/github/license/DrSkunk/MicroPythonOS-IDE)](LICENSE)

Connect a MicroPythonOS device, write an app, run it, and publish it from your browser.

[Launch MicroPythonOS IDE](https://drskunk.github.io/MicroPythonOS-IDE/) · [Contribute](CONTRIBUTING.md) · [Security](SECURITY.md) · [Report a problem](https://github.com/DrSkunk/MicroPythonOS-IDE/issues)

![MicroPythonOS device](public/ide.png)

MicroPythonOS IDE is the browser development environment for MicroPythonOS devices. It combines a Python editor, terminal, device file browser, package manager, USB/Serial and Bluetooth connections, a virtual device, MicroPythonOS app packaging, and BadgeHub publishing.

You can use a physical device or the built-in virtual device, and pick between a generic MicroPythonOS device skin or the Fri3d Camp 2026 badge skin. Projects can be saved, run, packaged, and published without installing a desktop IDE.

The Fri3d Camp badge is one supported device among others; support for additional MicroPython/MicroPythonOS hardware is welcome.

> **Release status: Beta.** The core workflows are available, while the project is expanding automated browser coverage and its tested hardware/firmware matrix. Back up important device files before destructive operations.

## Five-minute quick start

No desktop IDE or physical device is required for the virtual path.

1. Open [MicroPythonOS IDE](https://drskunk.github.io/MicroPythonOS-IDE/) in a current Chromium-based browser.
2. In the connection menu, choose **Connect to virtual device**. Accept the preview notice.
3. Open **Apps**, create an app, and select the **Hello World** template.
4. Open the generated Python file, make a small change, and select **Save & Run**.
5. Confirm the change on the device, then launch the app from the Apps panel.

For a real device, connect it with a data-capable USB-C cable, choose **USB/Serial**, and select the device in the browser permission dialog. Web Serial and Web Bluetooth require HTTPS or `localhost`.

## What it includes

- **Create:** CodeMirror editor, multiple tabs, Python formatting and in-browser Ruff analysis.
- **Get started:** Task-based onboarding for connecting, trying the virtual device, building a first app, or installing from BadgeHub.
- **Connect:** USB/Serial, Bluetooth, WebREPL/WebSocket, WebRTC relay, and a virtual MicroPythonOS device (generic skin or Fri3d Camp 2026 badge skin).
- **Operate:** Terminal/REPL, device files, screenshots, package management, and reconnect handling.
- **Build apps:** MicroPythonOS templates, icons, manifests, install/uninstall, and MPK import/export.
- **Publish:** BadgeHub sign-in, compatibility metadata, draft upload, and publishing.
- **Use anywhere:** Localization, responsive UI, installable PWA, and offline shell support.
- **Get support:** Copy a privacy-safe diagnostics report from the About panel.

Device access has explicit states for permission, connection, synchronization, ready, busy, recovery, and errors. Write operations are enabled only when the device is ready.

## Compatibility

This table describes current implementation support, not a completed certification matrix. If a combination is not listed as tested, treat it as experimental and include your browser, operating system, device revision, and firmware version when reporting issues.

| Environment | USB/Serial | Bluetooth | WebREPL/relay | Virtual device |
| --- | --- | --- | --- | --- |
| Chrome / Edge on Windows, macOS, Linux, ChromeOS | Supported API path | Supported API path | Available | Available |
| Other Chromium browsers | Experimental | Experimental | Available | Available |
| Firefox | Not supported by browser | Not supported by browser | Experimental | Available |
| Safari on macOS | Not supported by browser | Not supported by browser | Experimental | Available |
| iPhone / iPad browsers | Not supported | Not supported | Experimental | Preview only |

### Device and firmware scope

| Target | Status | Notes |
| --- | --- | --- |
| MicroPythonOS (generic device) | Primary | Virtual device models this target; physical compatibility testing is ongoing. |
| Fri3d Camp 2026 badge + MicroPythonOS | Primary | The virtual device includes a matching skin; physical compatibility testing is ongoing. |
| Fri3d Camp 2022 / 2024 | Experimental | BadgeHub recognizes these targets, but capabilities depend on installed firmware. |
| Other MicroPython boards | Experimental | Editor, terminal, files, and packages may work; MicroPythonOS app workflows require the `mpos` module. |

There is not yet a published minimum firmware version. Until the matrix is certified, use the firmware recommended by the relevant device's documentation and report the exact version with any issue.

### Real versus virtual device

The virtual device runs MicroPythonOS in the browser and is useful for onboarding, app UI work, workshops, and repeatable testing. It does not fully reproduce Wi-Fi, sensors, audio, radio hardware, timing, or physical-device performance. Always verify hardware-dependent apps on the target device.

## PWA and offline use

MicroPythonOS IDE can be installed from a supported browser. The application shell works offline after one successful load. The virtual device is cached when you first open it because its WebAssembly assets are large. Open it once while online before using it offline.

Network-dependent features remain unavailable offline, including BadgeHub, remote package downloads, authentication, and WebREPL endpoints. USB/Serial availability depends on the browser and operating system, not on internet access.

## Development

### Prerequisites

- Node.js 22, matching CI and deployment
- npm
- A current browser; Chromium is required for USB/Serial and Bluetooth testing

```sh
npm ci
npm run dev        # local development server
npm run typecheck  # TypeScript checks
npm run lint       # Oxlint
npm test           # Vitest suite
npm run test:e2e   # Playwright against the production build
npm run test:all   # Unit and production-browser suites
npm run build      # production build in dist/
npm run preview    # preview the production build
```

The application is a Vite + React + TypeScript SPA and can be hosted on a static server. Deployment under a subpath is supported; GitHub Pages builds with the repository base path.

See [CONTRIBUTING.md](CONTRIBUTING.md) for architecture, project structure, testing expectations, device-safety guidance, translations, and pull-request requirements.

## Known limitations

- Browser device APIs vary substantially; Chrome or Edge on desktop is the recommended starting point.
- iOS browsers do not expose Web Serial or Web Bluetooth.
- Separate **Save** and **Run** commands remain available for advanced workflows; beginners can use **Save & Run**.
- Offline mode cannot provide network-backed packages, authentication, publishing, or remote connections.
- The compatibility matrix still needs repeatable testing across device and firmware revisions.

## Origin

MicroPythonOS IDE started as Fri3d-IDE, forked from the excellent [ViperIDE](https://github.com/vshymanskyy/ViperIDE) project by [Volodymyr Shymanskyy](https://github.com/vshymanskyy).
