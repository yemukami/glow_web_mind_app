import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <header style={{ marginBottom: 24 }}>
        <p className="muted" style={{ margin: 0 }}>Glow-Rabbit runner support (MVP)</p>
        <h1 style={{ margin: "4px 0 8px" }}>Glow Web Mind App</h1>
        <p className="muted" style={{ margin: 0 }}>
          AIメニュー提案 + glow-c 送信 + 練習後ねぎらい。Vercel で配信予定。
        </p>
      </header>

      <section className="card-grid">
        <article className="card">
          <h2 className="section-title">セットアップ状況</h2>
          <ul>
            <li>Next.js + TypeScript scaffold</li>
            <li>App Router (app/)</li>
            <li>BLE層はスタブ、glow_web_app を参照して移植予定</li>
          </ul>
        </article>

        <article className="card">
          <h2 className="section-title">着手予定の機能</h2>
          <ul>
            <li>練習前メニュー提案（AI I/F）</li>
            <li>TrainingSet → glow-c シナリオ変換</li>
            <li>練習後ねぎらいチャット</li>
            <li>Race / Profile / Session 管理</li>
          </ul>
        </article>

        <article className="card">
          <h2 className="section-title">BLE 接続スタブ</h2>
          <p className="muted">
            glow-r リスト取得は別アプリ（DB経由）で実装予定。ここではダミーを返します。
          </p>
          <Link href="#ble">BLE スタブ概要へ</Link>
        </article>
      </section>

      <section id="ble" style={{ marginTop: 32 }}>
        <div className="card">
          <h2 className="section-title">BLE/Queue スタブ</h2>
          <p className="muted" style={{ marginBottom: 8 }}>
            Web Bluetooth API での接続/送信は libs/ble 以下にスタブを置き、glow_web_app の
            queue/command 実装を型付きで移植する方針。
          </p>
          <ul>
            <li>connect/disconnect はユーザー操作トリガー前提</li>
            <li>sendCommand でキュー管理、高優先度 Start/Stop に対応</li>
            <li>glow-r リストは DB 経由取得予定（スタブで固定値返却）</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
