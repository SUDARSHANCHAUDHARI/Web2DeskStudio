# Idea: Web2Desk Studio

## One-Liner

Web2Desk Studio turns any website or internal dashboard into a lightweight desktop app with one command.

## Why It Exists

Many useful tools are web-only, but teams often need desktop wrappers for dashboards, kiosks, support tools, signage panels, internal admin apps, or focused SaaS workflows. Electron wrappers can be heavy; Tauri makes lightweight desktop packaging practical.

## Core Workflow

```text
URL + App Config
  -> Generate Tauri template
  -> Write app metadata and window settings
  -> Apply icon and optional CSS
  -> Build desktop app
```

## Target Users

- Developers.
- Internal tool teams.
- Dashboard owners.
- Kiosk and signage builders.
- Indie hackers shipping small desktop wrappers.

## MVP Scope

- CLI command: `web2desk create <url> --name <appName>`.
- Generate a Tauri project from a template.
- Write URL into config.
- Support window width and height.
- Support fullscreen and kiosk mode.
- Support custom icon path.
- Support `web2desk.json`.
- Add build command: `web2desk build`.
- Clear setup and usage docs.

## Differentiation

- CLI-first, simple, and developer-friendly.
- Potential signage/kiosk use cases fit Sudarshan's ScreenCloud context.
- Can later add templates for ChatGPT, Claude, Gemini, Jira, Grafana, Notion, and custom dashboards.

## Open Questions

- Should the first version generate raw Tauri apps or maintain one reusable wrapper?
- Should it support JavaScript injection in MVP, or CSS only?
- Should this be open source first, with paid cloud builds later?
