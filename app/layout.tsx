import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glow Web Mind App (MVP)",
  description: "Runner-support app for glow-rabbit devices and AI training menus."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
