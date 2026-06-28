import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Web2Desk Studio", description: "Web2Desk Studio — AI tool" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="bg-[#0a0a0f] antialiased">{children}</body></html>;
}
