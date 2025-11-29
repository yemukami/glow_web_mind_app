import { getAiReflectMessage } from "../../../lib/data/api";

export default async function AiReflectPage() {
  const message = await getAiReflectMessage();
  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>練習後入力</h2>
        <p className="muted">AIねぎらい（light/deep）に渡す入力のスタブ。</p>
        <div className="field">
          <label htmlFor="reflect-effort">きつさ</label>
          <select id="reflect-effort" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="easy">余裕あり</option>
            <option value="moderate">ちょうどいい</option>
            <option value="too_hard">きつすぎ</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="reflect-mood">気分</label>
          <select id="reflect-mood" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="good">良い</option>
            <option value="normal">普通</option>
            <option value="bad">最悪</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="reflect-pain">痛み</label>
          <select id="reflect-pain" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="none">なし</option>
            <option value="some">あり</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="reflect-comment">一言コメント</label>
          <textarea id="reflect-comment" rows={3} placeholder="例: 寝不足だったが6本完遂" />
        </div>
        <p className="hint">context_flags: mode(light/deep_*), days_to_next_race なども合わせて送信。</p>
      </article>

      <article className="panel">
        <h2>AIメッセージ（サンプル）</h2>
        <p className="muted">レスポンスのレイアウト例。</p>
        <div className="panel" style={{ background: "#f8fafc" }}>
          {message.messageToUser.map((line, idx) => (
            <p key={idx} className={idx === message.messageToUser.length - 1 ? "muted" : ""}>
              {line}
            </p>
          ))}
        </div>
        <p className="subtle">deepモードでは質問→回答を最大2〜3往復で表示予定。</p>
      </article>
    </div>
  );
}
