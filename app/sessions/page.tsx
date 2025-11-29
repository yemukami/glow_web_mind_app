import { getSessions } from "../../lib/data/api";
import { type Session } from "../../lib/types";

function renderSets(sets: Session["sets"]) {
  return (
    <ul className="list">
      {sets.map((set) => (
        <li key={set.description ?? `${set.kind}-${set.distanceM ?? ""}-${set.reps ?? ""}`}>
          <strong>{set.kind}</strong>{" "}
          {set.description ??
            `${set.reps ? `${set.reps}本 ` : ""}${set.distanceM ? `${set.distanceM}m` : ""} ${
              set.targetPaceSec ? `(${set.targetPaceSec}s)` : ""
            }`}
        </li>
      ))}
    </ul>
  );
}

export default async function SessionsPage() {
  const sessions = await getSessions();
  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>練習前（コンディション入力）</h2>
        <div className="stub-notice">AIメニュー提案に渡す前の入力欄。送信先APIを後で接続します。</div>
        <div className="field">
          <label htmlFor="mood">今日の気分</label>
          <select id="mood" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="good">良い</option>
            <option value="normal">普通</option>
            <option value="bad">しんどい</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="fatigue">疲労感</label>
          <select id="fatigue" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="fresh">軽い</option>
            <option value="normal">普通</option>
            <option value="tired">重い</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="choice">今日の進め方</label>
          <select id="choice" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="same">前回とほぼ同じで</option>
            <option value="slight">少し変えて</option>
            <option value="talk">今日の気分から相談</option>
          </select>
        </div>
        <p className="hint">ここでの入力を API に送り、AI から logical_menu を受け取る予定。</p>
      </article>

      <article className="panel">
        <h2>メニュー案（サンプル）</h2>
        <div className="stub-notice">AI出力例をダミー表示。TrainingSet 変換→ glow-c 送信は別ページまたはこの後段で実装。</div>
        {renderSets(sessions[0]?.sets ?? [])}
        <p className="subtle">
          logical_menu JSON を生成 → TrainingSet → glowScenarioJson 変換 → BLE送信（後で接続）。
        </p>
      </article>

      <article className="panel">
        <h2>練習後（フィードバック）</h2>
        <div className="stub-notice">ねぎらいメッセージ用の入力欄。AI reflect に転送予定。</div>
        <div className="field">
          <label htmlFor="effort">きつさ</label>
          <select id="effort" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="easy">余裕あり</option>
            <option value="moderate">ちょうどいい</option>
            <option value="too_hard">きつすぎ</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="moodAfter">気分</label>
          <select id="moodAfter" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="good">良い</option>
            <option value="normal">普通</option>
            <option value="bad">最悪</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="pain">痛み</label>
          <select id="pain" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="none">なし</option>
            <option value="some">あり</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="note">一言コメント</label>
          <textarea id="note" rows={3} placeholder="例: 寝不足でラストきつかったけど完遂" />
        </div>
        <p className="hint">AIねぎらい API に送信 → 2〜4行メッセージを表示する予定。</p>
      </article>
    </div>
  );
}
