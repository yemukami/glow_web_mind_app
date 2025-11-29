"use client";

import { useState } from "react";
import { type Session } from "../../lib/types";

interface Props {
  initialSessions: Session[];
}

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

export default function SessionList({ initialSessions }: Props) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimisticUpdate = (session: Session) => {
    setSessions((prev) => {
      const others = prev.filter((s) => s.id !== session.id);
      return [session, ...others].sort((a, b) => b.date.localeCompare(a.date));
    });
  };

  const saveSession = async (session: Session) => {
    setSaving(true);
    setError(null);
    try {
      const exists = initialSessions.find((s) => s.id === session.id);
      const method = exists ? "PATCH" : "POST";
      const url = method === "PATCH" ? `/api/sessions/${session.id}` : "/api/sessions";
      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session)
      });
      if (!resp.ok) throw new Error("save session failed");
      const saved = (await resp.json()) as Session;
      optimisticUpdate(saved);
      setSaving(false);
    } catch (e) {
      console.error(e);
      setSaving(false);
      setError("セッションの保存に失敗しました");
    }
  };

  const addSession = () => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      objective: "speed",
      perceivedEffort: "moderate",
      moodBefore: "normal",
      moodAfter: "normal",
      painFlag: false,
      userNote: "",
      sets: []
    };
    optimisticUpdate(newSession);
    void saveSession(newSession);
  };

  const updateSession = (id: string, key: keyof Session, value: string | boolean) => {
    const updated = sessions.find((s) => s.id === id);
    if (!updated) return;
    const next: Session = { ...updated, [key]: value } as Session;
    optimisticUpdate(next);
    void saveSession(next);
  };

  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>セッション一覧</h2>
        <div className="stub-notice">変更は自動保存します。新規追加は「セッションを追加」を押してください。</div>
        <button className="cta-button" onClick={addSession}>
          セッションを追加
        </button>
      </article>

      {sessions.map((session) => (
        <article key={session.id} className="panel">
          <h2>セッション {session.date}</h2>
          <div className="field">
            <label>日付</label>
            <input type="date" value={session.date} onChange={(e) => updateSession(session.id, "date", e.target.value)} />
          </div>
          <div className="field">
            <label>目的</label>
            <select
              value={session.objective ?? ""}
              onChange={(e) => updateSession(session.id, "objective", e.target.value)}
            >
              <option value="speed">speed</option>
              <option value="endurance">endurance</option>
              <option value="recovery">recovery</option>
            </select>
          </div>
          <div className="field">
            <label>きつさ</label>
            <select
              value={session.perceivedEffort ?? ""}
              onChange={(e) => updateSession(session.id, "perceivedEffort", e.target.value)}
            >
              <option value="easy">余裕あり</option>
              <option value="moderate">ちょうどいい</option>
              <option value="too_hard">きつすぎ</option>
            </select>
          </div>
          <div className="field">
            <label>気分(前)</label>
            <select value={session.moodBefore ?? ""} onChange={(e) => updateSession(session.id, "moodBefore", e.target.value)}>
              <option value="good">良い</option>
              <option value="normal">普通</option>
              <option value="bad">しんどい</option>
            </select>
          </div>
          <div className="field">
            <label>気分(後)</label>
            <select value={session.moodAfter ?? ""} onChange={(e) => updateSession(session.id, "moodAfter", e.target.value)}>
              <option value="good">良い</option>
              <option value="normal">普通</option>
              <option value="bad">最悪</option>
            </select>
          </div>
          <div className="field">
            <label>痛み</label>
            <select value={session.painFlag ? "yes" : "no"} onChange={(e) => updateSession(session.id, "painFlag", e.target.value === "yes")}>
              <option value="no">なし</option>
              <option value="yes">あり</option>
            </select>
          </div>
          <div className="field">
            <label>一言コメント</label>
            <textarea
              rows={2}
              value={session.userNote ?? ""}
              onChange={(e) => updateSession(session.id, "userNote", e.target.value)}
            />
          </div>
          <div className="stub-notice">セット編集は後続で実装予定。今は概要のみ自動保存します。</div>
          {renderSets(session.sets)}
        </article>
      ))}
      <p className="subtle">{saving ? "保存中..." : "自動保存"}</p>
      {error ? <p className="subtle" style={{ color: "#b91c1c" }}>{error}</p> : null}
    </div>
  );
}
