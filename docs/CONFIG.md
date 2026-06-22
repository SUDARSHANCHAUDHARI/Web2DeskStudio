# Config

## `web2desk.json`

```json
{
  "name": "ScreenCloud Dashboard",
  "url": "https://example.com",
  "width": 1280,
  "height": 720,
  "fullscreen": false,
  "kiosk": true,
  "hideTitleBar": false,
  "icon": "./icon.png",
  "injectCss": "./custom.css"
}
```

## Fields

| Field | Purpose |
|---|---|
| `name` | Desktop app name |
| `url` | Website URL to wrap |
| `width` | Initial window width |
| `height` | Initial window height |
| `fullscreen` | Start fullscreen |
| `kiosk` | Lock into kiosk-style flow |
| `hideTitleBar` | Hide native title bar |
| `icon` | Local app icon path |
| `injectCss` | Optional CSS file to inject |
