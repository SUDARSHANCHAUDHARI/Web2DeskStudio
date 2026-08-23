# Web2Desk Studio

Turn any website into a lightweight desktop app.

## Table of Contents

- [Concept](#concept)
- [MVP](#mvp)
- [Example Commands](#example-commands)
- [Example Config](#example-config)
- [Suggested Stack](#suggested-stack)
- [Status](#status)
- [About](#about)

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

---

## About

I'm Sudarshan Chaudhari, a Senior Quality Engineer, Test Automation specialist, and AI systems builder based in Bangkok, Thailand.

I have 13+ years of experience in software quality engineering, working across SaaS, fintech, gaming, web, mobile, cloud, and digital signage platforms. My background combines hands-on test automation with QA leadership, test strategy, CI/CD, release quality, production investigation, and cross-platform validation.

Alongside my professional QA career, I run [SudarshanTechLabs](https://sudarshantechlabs.com/), my independent engineering and product lab where I design, build, test, and ship software across Android, web, AI, cybersecurity, developer tooling, and cross-platform applications.

### What I work on

- ⚙️ **Quality Engineering & Test Automation** — Playwright, Selenium, Cypress, Appium, API testing, automation frameworks, end-to-end testing, CI/CD, release gates, GitHub Actions, risk-based testing, and production validation
- 🤖 **AI Systems & Automation** — AI agents, multi-agent orchestration, MCP servers, AI-assisted QA, prompt tooling, developer workflows, automation systems, and Claude Code plugins
- 📱 **Mobile & Cross-Platform Applications** — Android applications built with Kotlin and Jetpack Compose, Google Play releases, automated build and publishing pipelines, and cross-platform development spanning iOS, web, Windows, and macOS
- 🌐 **Web Applications & Platforms** — Full-stack applications using Next.js, TypeScript, Firebase, Cloudflare, REST APIs, and modern web infrastructure
- 🛠️ **Developer Tooling & CLI Engineering** — Rust, Python, TypeScript, CLI utilities, multi-repository tooling, build automation, release tooling, and engineering productivity systems
- 🛡️ **Cybersecurity & Observability** — Threat detection, log analysis, security auditing, vulnerability assessment, monitoring, and security-focused developer tools
- 📺 **Digital Signage & Device Platforms** — Content validation, playback testing, device compatibility, production investigation, monitoring, and QA across diverse hardware and operating-system environments

My work sits at the intersection of quality engineering, automation, AI, and software development. I approach products with a QA mindset from the beginning: understanding failure modes, designing for testability, automating repetitive work, and building release confidence into the engineering process.

Through SudarshanTechLabs, I also build products and tools from idea to production, covering architecture, development, testing, CI/CD, release automation, monitoring, and ongoing maintenance.

🌐 [sudarshantechlabs.com](https://sudarshantechlabs.com/) · 💼 [LinkedIn](https://linkedin.com/in/sudarshan-chaudhari) · 🐙 [GitHub](https://github.com/SUDARSHANCHAUDHARI) · ✉️ [sunny.sudarshan@gmail.com](mailto:sunny.sudarshan@gmail.com)
