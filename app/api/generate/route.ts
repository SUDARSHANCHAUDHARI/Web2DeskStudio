import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const b = await req.json();
  const url: string = (b.url || "").trim();
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      return NextResponse.json({ error: "Only http(s) URLs are allowed" }, { status: 400 });
    }
  } catch { return NextResponse.json({ error: "Invalid URL" }, { status: 400 }); }

  // POSIX shell single-quote escaping so the generated command is safe to paste/run.
  const sh = (v: string) => "'" + v.replace(/'/g, "'\\''") + "'";

  const name: string = (b.name || "WebApp").trim();
  const width = Number(b.width) || 1280;
  const height = Number(b.height) || 800;
  const fullscreen = !!b.fullscreen;
  const kiosk = !!b.kiosk;
  const hideTitleBar = !!b.hideTitleBar;
  const customCss: string = (b.customCss || "").trim();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "webapp";

  const config = {
    productName: name,
    identifier: `com.sudarshantechlabs.${slug.replace(/-/g, "")}`,
    app: {
      windows: [{ title: name, url, width, height, fullscreen, kiosk, decorations: !hideTitleBar, resizable: true }],
      withGlobalTauri: true,
    },
    build: { frontendDist: url },
  };

  const command = [
    `web2desk --url ${sh(url)}`,
    `--name ${sh(name)}`,
    `--width ${width} --height ${height}`,
    fullscreen ? "--fullscreen" : "",
    kiosk ? "--kiosk" : "",
    hideTitleBar ? "--hide-title-bar" : "",
    customCss ? `--css ${sh(slug + ".css")}` : "",
  ].filter(Boolean).join(" ");

  const files = [`src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml`, `src-tauri/src/main.rs`, ...(customCss ? [`src-tauri/${slug}.css`] : [])];

  return NextResponse.json({ config, command, files, customCss: customCss || null, target: ["macOS", "Windows", "Linux"], summary: `Generated a Tauri desktop-app config for "${name}" wrapping ${url}.` });
}
