export default function HomePage() {
  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>セットアップ状況</h2>
        <div className="stub-notice">
          Next.js + TypeScript（App Router）。BLE層はスタブ、glow_web_app 参照で移植予定。
        </div>
        <ul className="list">
          <li>Scaffold ready for Vercel</li>
          <li>Nav構成: Profile / Races / Sessions / AI Menu / AI Reflect / BLE</li>
          <li>BLEコマンドキュー: libs/ble に型付きスタブ</li>
        </ul>
      </article>

      <article className="panel">
        <h2>今日やることの例</h2>
        <p className="muted">まずはプロフィール設定から始めましょう。</p>
        <div style={{ margin: "12px 0" }}>
          <a href="/profile" className="cta-button">セットアップを開始</a>
        </div>
        <ul className="list">
          <li>プロファイルとマイルストーンを埋める</li>
          <li>セッション作成: コンディション入力 → メニュー提案</li>
          <li>TrainingSet → glow-c シナリオ生成（後で実装）</li>
          <li>練習後ねぎらいメッセージの流れを確認</li>
        </ul>
      </article>

      <article className="panel">
        <h2>BLE 接続スタブ</h2>
        <div className="stub-notice">
          glow-r リスト取得は別アプリ/DB経由で実装予定。ここではダミーを返すのみ。
          コマンドバイトとキュー処理は glow_web_app を型付きで移植する方針。
        </div>
        <p className="pill">connect → queue → start/stop (highPriority)</p>
      </article>
    </div>
  );
}
