# Starter Prompt

```text
Create a new project called Web2Desk Studio.

Goal:
Build a CLI tool that converts any website URL into a lightweight desktop app using Tauri, Rust, TypeScript, and pnpm.

Use this structure:
apps/cli
packages/builder
packages/config
packages/templates
packages/shared
examples
docs

MVP requirements:
1. CLI command: web2desk create <url> --name <appName>
2. Generate a Tauri project from a template
3. Write the URL into the Tauri config
4. Support custom window width and height
5. Support fullscreen and kiosk mode
6. Support custom icon path
7. Support web2desk.json config file
8. Add build command: web2desk build
9. Add clear README with setup and usage
10. Keep code simple and modular

Use TypeScript for CLI logic.
Use Rust/Tauri for desktop app wrapper.
Use pnpm workspace.
Do not over-engineer.
Start with working MVP only.
```
