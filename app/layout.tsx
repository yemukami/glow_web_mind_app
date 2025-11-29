import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import NavBar from "./navigation";

const font = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Glow Web Mind App (MVP)",
  description: "Runner-support app for glow-rabbit devices and AI training menus."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <div className="app-shell">
          <header className="topbar">
            <div>
              <p className="eyebrow">Glow-Rabbit runner support</p>
              <h1>Glow Web Mind App</h1>
              <p className="muted">
                AIメニュー提案 + glow-c 送信 + 練習後ねぎらい。Vercel で配信予定。
              </p>
            </div>
          </header>
          <NavBar />
          <main className="page">{children}</main>
        </div>
      </body>
    </html>
  );
}
