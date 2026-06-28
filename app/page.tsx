"use client";
import { useState } from "react";

interface Result { config: unknown; command: string; files: string[]; customCss: string | null; target: string[]; summary: string; }

export default function Web2DeskStudio() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(800);
  const [fullscreen, setFullscreen] = useState(false);
  const [kiosk, setKiosk] = useState(false);
  const [hideTitleBar, setHideTitleBar] = useState(false);
  const [customCss, setCustomCss] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function run() {
    if (!url.trim()) return;
    setLoading(true); setResult(null); setError(""); setCopied(false);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, name, width, height, fullscreen, kiosk, hideTitleBar, customCss }) });
      const data = await res.json();
      if (data.error) setError(data.error); else setResult(data);
    } catch { setError("Network error"); }
    setLoading(false);
  }
  function copyConfig() { if (result) { navigator.clipboard.writeText(JSON.stringify(result.config, null, 2)); setCopied(true); setTimeout(() => setCopied(false), 1500); } }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-lg">🖥️</div>
            <h1 className="text-2xl font-bold">Web2Desk Studio</h1>
          </div>
          <p className="text-zinc-400 text-sm">Turn any website into a lightweight desktop app. Configure a URL into a Tauri config for macOS, Windows, and Linux.</p>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2"><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">URL *</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://chat.openai.com" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500" /></div>
            <div><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">App name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="ChatGPT Desktop" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500" /></div>
            <div className="grid grid-cols-2 gap-2"><div><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Width</label><input type="number" value={width} onChange={e => setWidth(+e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-orange-500" /></div><div><label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Height</label><input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-orange-500" /></div></div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            {([["Fullscreen", fullscreen, setFullscreen], ["Kiosk mode", kiosk, setKiosk], ["Hide title bar", hideTitleBar, setHideTitleBar]] as [string, boolean, (v: boolean) => void][]).map(([label, val, set]) => (
              <label key={label} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer"><input type="checkbox" checked={val} onChange={e => set(e.target.checked)} className="accent-orange-500" />{label}</label>
            ))}
          </div>
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Custom CSS injection (optional)</label>
          <textarea value={customCss} onChange={e => setCustomCss(e.target.value)} rows={2} placeholder="body { zoom: 1.1; }" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:border-orange-500 resize-none mb-4" />
          <button onClick={run} disabled={loading || !url.trim()} className="px-8 py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold rounded-lg text-sm transition-colors">{loading ? "Generating…" : "🖥️ Generate Desktop App"}</button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm mb-6">{error}</div>}

        {result && (
          <div className="flex flex-col gap-5">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 flex items-center gap-3"><span className="text-sm text-zinc-200 flex-1">{result.summary}</span><div className="flex gap-2">{result.target.map(t => <span key={t} className="text-xs bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-zinc-300">{t}</span>)}</div></div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3"><h2 className="text-sm font-semibold text-white">tauri.conf.json</h2><button onClick={copyConfig} className="text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded px-3 py-1 text-zinc-300">{copied ? "Copied ✓" : "Copy"}</button></div>
              <pre className="text-xs text-zinc-300 bg-zinc-950/60 rounded-lg p-4 overflow-x-auto">{JSON.stringify(result.config, null, 2)}</pre>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5"><h2 className="text-sm font-semibold text-white mb-2">CLI command</h2><pre className="text-xs text-orange-300 bg-zinc-950/60 rounded-lg p-4 overflow-x-auto">{result.command}</pre></div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5"><h2 className="text-sm font-semibold text-white mb-2">Generated files</h2>{result.files.map((f, i) => <p key={i} className="text-sm text-zinc-300 font-mono">{f}</p>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
