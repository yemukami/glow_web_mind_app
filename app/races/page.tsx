const sampleRaces = [
  { date: "2025-04-20", name: "県総体1500m", importance: "A", event: "1500m" },
  { date: "2025-03-28", name: "記録会5000m", importance: "B", event: "5000m" }
];

export default function RacesPage() {
  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>マイルストーン（Race）</h2>
        <p className="muted">DB/API 連携待ちのスタブ。入力フォームだけ先に配置しています。</p>

        <div className="field">
          <label htmlFor="race-date">日付</label>
          <input id="race-date" type="date" />
        </div>
        <div className="field">
          <label htmlFor="race-name">名前</label>
          <input id="race-name" placeholder="例: 県総体1500m予選" />
        </div>
        <div className="field">
          <label htmlFor="race-type">種別</label>
          <select id="race-type" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="race">大会</option>
            <option value="record_trial">記録会</option>
            <option value="test_run">テスト走</option>
            <option value="other">その他</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="race-importance">重要度</label>
          <select id="race-importance" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="race-event">対象種目</label>
          <input id="race-event" placeholder="1500m など" />
        </div>
        <p className="hint">※ ここで追加したデータはAIコンテキストに渡し、メニュー強度を調整します。</p>
      </article>

      <article className="panel">
        <h2>登録済み（サンプル）</h2>
        <p className="muted">API接続前のダミー表示です。</p>
        <ul className="list">
          {sampleRaces.map((race) => (
            <li key={race.date + race.name}>
              <strong>{race.name}</strong> / {race.date} / {race.event} / 重要度: {race.importance}
            </li>
          ))}
        </ul>
        <p className="subtle">ホーム上部の「次の大事な日」表示もここから計算予定。</p>
      </article>
    </div>
  );
}
