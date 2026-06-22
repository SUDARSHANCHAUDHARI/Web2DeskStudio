# Web2Desk Studio

Turn any website into a lightweight desktop app.

## Concept

Web2Desk Studio packages dashboards, internal tools, web apps, and SaaS products into desktop apps for macOS, Windows, and Linux using Tauri, Rust, TypeScript, and pnpm.

The idea is inspired by tools like Pake, but this project should become its own original CLI-first product with optional Studio UI later.

## MVP

1. Create a desktop app from a URL.
2. Support custom app name.
3. Support custom icon path.
4. Support window width and height.
5. Support fullscreen mode.
6. Support kiosk mode.
7. Support hidden title bar.
8. Support custom CSS injection.
9. Save config as `web2desk.json`.
10. Build for macOS, Windows, and Linux through Tauri.

## Example Commands

```bash
web2desk create https://chat.openai.com --name ChatGPT
web2desk build
```

## Example Config

```json
{
  "name": "ScreenCloud Dashboard",
  "url": "https://example.com",
  "width": 1280,
  "height": 720,
  "fullscreen": false,
  "kiosk": true,
  "icon": "./icon.png",
  "injectCss": "./custom.css"
}
```

## Suggested Stack

- TypeScript for CLI and config logic.
- Rust and Tauri for desktop wrapper generation.
- pnpm workspace.
- Tauri templates for generated apps.

## Status

Idea seed created from ChatGPT shared conversation:
https://chatgpt.com/share/6a38edc8-0fc8-83ec-9485-4088fbcf0e62
