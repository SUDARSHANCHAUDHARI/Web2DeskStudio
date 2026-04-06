# KotlinSense — Claude Code Plugin

Kotlin code intelligence for Claude Code. Automatic type checking, import resolution, null safety detection, and error diagnostics injected directly into Claude's context after every file edit.

Works for any Kotlin or Android developer. No project-specific config needed — just install the binary and go.

---

## Install

### Step 1 — Install the plugin

```bash
/plugin install kotlinsense
```

### Step 2 — Install the language server binary

```bash
/kotlinsense:install
```

This downloads `kotlin-language-server` (~50 MB) and adds it to your PATH. Requires Java 17+.

### Step 3 — Verify

```bash
/kotlinsense:status
```

---

## What You Get

| Feature | Description |
|---|---|
| Auto diagnostics | After every `.kt` / `.kts` edit, type errors appear in Claude's context automatically |
| Import resolution | Missing imports detected and flagged |
| Null safety | Kotlin null safety violations caught before runtime |
| Coroutine checks | Suspend function misuse flagged (wrong scope, GlobalScope, etc.) |
| Code navigation | `/kotlinsense:navigate` for go-to-definition and find-references |
| Android patterns | Built-in knowledge of ViewModel, StateFlow, Compose, Hilt patterns |

---

## Requirements

- Claude Code installed and authenticated
- Java 17+ (`java -version` to check — install from [adoptium.net](https://adoptium.net/))
- Internet connection for initial binary download (~50 MB)
- ~100 MB free disk space

---

## Commands

| Command | Description |
|---|---|
| `/kotlinsense:install` | Download and install `kotlin-language-server` |
| `/kotlinsense:status` | Check binary, Java, and LSP activation status |
| `/kotlinsense:navigate` | Go-to-definition, find references, type inspection |

---

## How It Works

```
Claude Code edits a .kt file
    ↓
kotlin-language-server analyzes the change
    ↓
Diagnostics injected into Claude's context
    ↓
Claude sees: "error: Unresolved reference 'foo' at MainActivity.kt:42"
    ↓
Claude fixes it immediately — same turn, no manual compile step
```

The LSP connection is defined in `.lsp.json` and activates automatically when the plugin is enabled.

---

## Troubleshooting

**Diagnostics not appearing after file edits**
- Run `/kotlinsense:status` to diagnose
- Ensure `kotlin-language-server` is in PATH (restart terminal after install)

**`kotlin-language-server: command not found`**
- Run `/kotlinsense:install`
- Check that `$HOME/.local/bin` is in PATH: `echo $PATH`

**Slow startup (30–90 seconds on first open)**
- Normal — the server indexes the project on first open
- Large Android projects with many modules take longer

**False positive errors on generated code (Room, Hilt, etc.)**
- Run `./gradlew build` first so annotation processors generate their output
- Reopen the file after the build completes

**Java not found**
- Install Java 17+ from [adoptium.net](https://adoptium.net/)
- Verify: `java -version`

---

## Reference

- Kotlin Language Server: [github.com/fwcd/kotlin-language-server](https://github.com/fwcd/kotlin-language-server)
- Claude Code Plugins: [code.claude.com/docs/en/plugins](https://code.claude.com/docs/en/plugins)
- Submit feedback: [github.com/SUDARSHANCHAUDHARI/KotlinSense/issues](https://github.com/SUDARSHANCHAUDHARI/KotlinSense/issues)
- Privacy Policy: [github.com/SUDARSHANCHAUDHARI/kotlinsense-claude-plugin-privacy-policy](https://github.com/SUDARSHANCHAUDHARI/kotlinsense-claude-plugin-privacy-policy)

---

## License

MIT
