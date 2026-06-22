# Web2Desk Studio - Codex Context

## Project

- Path: `AIProjects/Web2DeskStudio`
- Type: Idea seed
- Product: URL-to-desktop-app builder
- Primary users: developers, internal tool teams, dashboard owners, kiosk/signage builders

## Direction

- Build CLI-first before any visual Studio UI.
- Keep the first milestone tiny: `web2desk create <url> --name <appName>` and `web2desk build`.
- Use Tauri/Rust for generated desktop apps and TypeScript for CLI/config tooling.
- Avoid cloning Pake directly. Study it for validation and workflow inspiration only.
- Prioritize practical desktop/kiosk options over a large app marketplace.

## Safety

- Do not commit signing keys, certificates, private app configs, generated binaries, `.env*`, or local build caches.
- Validate URLs and config before generating apps.
- Treat CSS/JS injection as potentially risky and keep it explicit.
