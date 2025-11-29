"use client";

import { useEffect, useState } from "react";
import { type Race } from "../../lib/types";

interface Props {
  initialRaces: Race[];
}

export default function RaceList({ initialRaces }: Props) {
  const [races, setRaces] = useState<Race[]>(initialRaces);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upsertRace = async (race: Race) => {
    setSaving(true);
    setError(null);
    try {
      const method = initialRaces.find((r) => r.id === race.id) ? "PATCH" : "POST";
      const url = method === "PATCH" ? `/api/races/${race.id}` : "/api/races";
      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(race)
      });
      if (!resp.ok) throw new Error("save race failed");
      const saved = (await resp.json()) as Race;
      setRaces((prev) => {
        const others = prev.filter((r) => r.id !== saved.id);
        return [...others, saved].sort((a, b) => a.date.localeCompare(b.date));
      });
      setSaving(false);
    } catch (e) {
      console.error(e);
      setSaving(false);
      setError("レースの保存に失敗しました");
    }
  };

  const handleChange = (id: string, key: keyof Race, value: string) => {
    setRaces((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );
    const target = races.find((r) => r.id === id);
    if (target) {
      const next = { ...target, [key]: value } as Race;
      void upsertRace(next);
    }
  };

  const addRace = () => {
    const newRace: Race = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      name: "新しいレース",
      type: "race",
      importance: "C",
      event: "1500m"
    };
    setRaces((prev) => [...prev, newRace]);
    void upsertRace(newRace);
  };

  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>マイルストーン（Race）</h2>
        <div className="stub-notice">入力は自動保存します。新規追加は「レースを追加」を押してください。</div>
        <button className="cta-button" onClick={addRace}>
          レースを追加
        </button>
      </article>

      <article className="panel">
        <h2>登録済み</h2>
        {races.length === 0 ? <p className="muted">まだデータがありません</p> : null}
        <div className="list" style={{ paddingLeft: 0 }}>
          {races.map((race) => (
            <div key={race.id} className="panel" style={{ border: "1px solid #e2e8f0", marginBottom: 8 }}>
              <div className="field">
                <label>日付</label>
                <input type="date" value={race.date} onChange={(e) => handleChange(race.id, "date", e.target.value)} />
              </div>
              <div className="field">
                <label>名前</label>
                <input value={race.name} onChange={(e) => handleChange(race.id, "name", e.target.value)} />
              </div>
              <div className="field">
                <label>種別</label>
                <select value={race.type} onChange={(e) => handleChange(race.id, "type", e.target.value as Race["type"])}>
                  <option value="race">大会</option>
                  <option value="record_trial">記録会</option>
                  <option value="test_run">テスト走</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div className="field">
                <label>重要度</label>
                <select
                  value={race.importance}
                  onChange={(e) => handleChange(race.id, "importance", e.target.value as Race["importance"])}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="field">
                <label>対象種目</label>
                <input value={race.event ?? ""} onChange={(e) => handleChange(race.id, "event", e.target.value)} />
              </div>
            </div>
          ))}
        </div>
        <p className="subtle">{saving ? "保存中..." : "自動保存"}</p>
        {error ? <p className="subtle" style={{ color: "#b91c1c" }}>{error}</p> : null}
      </article>
    </div>
  );
}
