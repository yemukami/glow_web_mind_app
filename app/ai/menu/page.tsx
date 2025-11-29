const previousSession = {
  date: "2025-03-10",
  objective: "speed",
  summary: "400m×8本（90秒/本、レスト200m） / perceived: moderate / コメント: 最後2本きつい"
};

export default function AiMenuPage() {
  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>今日のコンディション</h2>
        <p className="muted">AI メニュー提案へ送る入力（スタブ）。送信先 API は後で接続。</p>
        <div className="field">
          <label htmlFor="cond-mood">気分</label>
          <select id="cond-mood" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="good">良い</option>
            <option value="normal">普通</option>
            <option value="bad">しんどい</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="cond-fatigue">疲労感</label>
          <select id="cond-fatigue" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="fresh">軽い</option>
            <option value="normal">普通</option>
            <option value="tired">重い</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="next-race">次の大事な日</label>
          <input id="next-race" placeholder="例: 2025-04-20 県総体1500m (A)" />
        </div>
        <p className="hint">profile + races + recent_summary + today_condition を組み合わせて送信予定。</p>
      </article>

      <article className="panel">
        <h2>前回候補セッション</h2>
        <p className="muted">AIへのコンテキスト例（ダミー）。</p>
        <ul className="list">
          <li>日付: {previousSession.date}</li>
          <li>目的: {previousSession.objective}</li>
          <li>内容: {previousSession.summary}</li>
        </ul>
      </article>

      <article className="panel">
        <h2>AIメニュー案（サンプル表示）</h2>
        <p className="muted">APIレスポンス例を先にレイアウト化。実データで置き換えます。</p>
        <div className="pill">大会まで10日 / 抑えめ / interval</div>
        <ul className="list">
          <li>400m×6本（94秒目安、レスト200mジョグ）</li>
          <li>余裕があれば最後1〜2本だけ少し上げる</li>
        </ul>
        <p className="subtle">logical_menu を TrainingSet に変換 → glowScenarioJson 生成へ渡す。</p>
      </article>
    </div>
  );
}
