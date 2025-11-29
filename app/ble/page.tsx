import {
  createAddDeviceCommand,
  createBlinkCommand,
  createResetCommand,
  createSetColorCommand,
  createSetPaceCommand,
  createStartCommand,
  createStopCommand,
  fetchGlowRDevicesFromDb
} from "../../lib/ble/controller";

export default async function BlePage() {
  const mockDevices = await fetchGlowRDevicesFromDb();
  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>BLE 接続（スタブ）</h2>
        <p className="muted">
          Web Bluetooth 実装は libs/ble でスタブ中。接続/送信はユーザー操作トリガー必須。
          glow-r リストは別アプリ/DBで取得する想定で、ここではダミーを表示します。
        </p>
        <div className="pill">connect → queue → start/stop(highPriority)</div>
        <ul className="list">
          <li>setColor: {JSON.stringify(createSetColorCommand("red").bytes)}</li>
          <li>setPace: {JSON.stringify(createSetPaceCommand(94000).bytes)}</li>
          <li>start: {JSON.stringify(createStartCommand().bytes)}</li>
          <li>stop: {JSON.stringify(createStopCommand().bytes)}</li>
          <li>reset: {JSON.stringify(createResetCommand().bytes)}</li>
        </ul>
        <p className="subtle">※ 実バイト列は glow_web_app/ble_protocol.js を移植して上書きします。</p>
      </article>

      <article className="panel">
        <h2>glow-r デバイス（DBスタブ）</h2>
        <p className="muted">別アプリでDBから取得する前提。ここでは固定値を表示。</p>
        <ul className="list">
          {mockDevices.map((d) => (
            <li key={d.mac}>
              {d.name ?? "unknown"} — {d.mac}{" "}
              <span className="tag">add: {JSON.stringify(createAddDeviceCommand(d.mac).bytes)}</span>{" "}
              <span className="tag">blink: {JSON.stringify(createBlinkCommand(d.mac).bytes)}</span>
            </li>
          ))}
        </ul>
        <p className="subtle">sync/reset/add 処理はキュー経由で送信予定。</p>
      </article>
    </div>
  );
}
