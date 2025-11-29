export default function ProfilePage() {
  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>プロフィール</h2>
        <p className="muted">UIスタブです。保存先のDB/APIと接続後に実値をバインドします。</p>

        <div className="field">
          <label htmlFor="nickname">ニックネーム</label>
          <input id="nickname" name="nickname" placeholder="例: ゆめかみ" />
        </div>

        <div className="field">
          <label htmlFor="age">年齢帯</label>
          <select id="age" name="age" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="junior_high">中学生</option>
            <option value="high">高校生</option>
            <option value="univ">大学生</option>
            <option value="adult">社会人</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="events">主な種目</label>
          <input id="events" name="events" placeholder="1500m, 5000m など（カンマ区切り）" />
        </div>

        <div className="field">
          <label htmlFor="style">練習スタイル</label>
          <select id="style" name="style" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="club">部活・クラブ</option>
            <option value="solo">個人</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="coach">コーチ/顧問</label>
          <select id="coach" name="coach" defaultValue="">
            <option value="" disabled>
              選択してください
            </option>
            <option value="yes">いる</option>
            <option value="no">いない</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="weekly">週あたり目標走行量</label>
          <input id="weekly" name="weekly" placeholder="時間 or 距離で入力（例: 240分）" />
        </div>

        <p className="hint">※ ここで入力した情報はAIメニュー提案とねぎらい文脈に使われます。</p>
      </article>

      <article className="panel">
        <h2>プロフィール概要</h2>
        <p className="muted">サンプルの表示用データです。DB保存後に実値で置き換えます。</p>
        <ul className="list">
          <li>ニックネーム: まだ未設定</li>
          <li>年齢帯: 未設定</li>
          <li>主な種目: 1500m / 5000m</li>
          <li>練習スタイル: club</li>
          <li>コーチ: いる/いない</li>
          <li>週ターゲット: 240分</li>
        </ul>
        <p className="subtle">今後、まとめカードやAIコンテキスト表示を追加予定。</p>
      </article>
    </div>
  );
}
