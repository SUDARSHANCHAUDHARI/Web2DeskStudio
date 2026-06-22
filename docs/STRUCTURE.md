# Suggested Structure

```text
Web2DeskStudio/
├── apps/
│   ├── cli
│   └── studio
├── packages/
│   ├── builder
│   ├── config
│   ├── templates
│   ├── generators
│   ├── updater
│   └── shared
├── examples/
├── docs/
├── scripts/
└── .github/
    └── workflows/
```

## Modules

### `apps/cli`

Command-line entrypoint for `web2desk create` and `web2desk build`.

### `apps/studio`

Optional visual UI after CLI MVP works.

### `packages/builder`

Build orchestration and Tauri command integration.

### `packages/config`

Schema and parser for `web2desk.json`.

### `packages/templates`

Reusable generated app templates.

### `packages/generators`

Project scaffolding logic.

### `packages/shared`

Shared TypeScript types and utilities.
