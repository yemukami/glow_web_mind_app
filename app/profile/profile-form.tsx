"use client";

import { useEffect, useMemo, useState } from "react";
import { type UserProfile } from "../../lib/types";

interface Props {
  initialProfile: UserProfile;
}

type DraftProfile = Omit<UserProfile, "id">;

export default function ProfileForm({ initialProfile }: Props) {
  const [profile, setProfile] = useState<DraftProfile>({
    nickname: initialProfile.nickname,
    ageGroup: initialProfile.ageGroup,
    mainEvents: initialProfile.mainEvents,
    trainingStyle: initialProfile.trainingStyle,
    hasCoach: initialProfile.hasCoach,
    weeklyTargetMinutes: initialProfile.weeklyTargetMinutes
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce save when profile changes
  useEffect(() => {
    setSaving(true);
    setError(null);
    const handle = setTimeout(async () => {
      try {
        const resp = await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nickname: profile.nickname,
            ageGroup: profile.ageGroup,
            mainEvents: profile.mainEvents,
            trainingStyle: profile.trainingStyle,
            hasCoach: profile.hasCoach,
            weeklyTargetMinutes: profile.weeklyTargetMinutes ?? null
          })
        });
        if (!resp.ok) throw new Error("save failed");
        setSaving(false);
      } catch (e) {
        console.error(e);
        setSaving(false);
        setError("保存に失敗しました");
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [profile]);

  const coachValue = useMemo(() => (profile.hasCoach ? "yes" : "no"), [profile.hasCoach]);

  const updateField = <K extends keyof DraftProfile>(key: K, value: DraftProfile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>プロフィール</h2>
        <div className="stub-notice">
          変更は自動保存（デバウンス）します。保存ボタンはありません。失敗時はメッセージを表示します。
        </div>

        <div className="field">
          <label htmlFor="nickname">ニックネーム</label>
          <input
            id="nickname"
            name="nickname"
            value={profile.nickname}
            placeholder="例: ゆめかみ"
            onChange={(e) => updateField("nickname", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="age">年齢帯</label>
          <select
            id="age"
            name="age"
            value={profile.ageGroup}
            onChange={(e) => updateField("ageGroup", e.target.value as DraftProfile["ageGroup"])}
          >
            <option value="junior_high">中学生</option>
            <option value="high">高校生</option>
            <option value="univ">大学生</option>
            <option value="adult">社会人</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="events">主な種目</label>
          <input
            id="events"
            name="events"
            value={profile.mainEvents.join(", ")}
            placeholder="1500m, 5000m など（カンマ区切り）"
            onChange={(e) =>
              updateField(
                "mainEvents",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>

        <div className="field">
          <label htmlFor="style">練習スタイル</label>
          <select
            id="style"
            name="style"
            value={profile.trainingStyle}
            onChange={(e) => updateField("trainingStyle", e.target.value as DraftProfile["trainingStyle"])}
          >
            <option value="club">部活・クラブ</option>
            <option value="solo">個人</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="coach">コーチ/顧問</label>
          <select
            id="coach"
            name="coach"
            value={coachValue}
            onChange={(e) => updateField("hasCoach", e.target.value === "yes")}
          >
            <option value="yes">いる</option>
            <option value="no">いない</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="weekly">週あたり目標走行量</label>
          <input
            id="weekly"
            name="weekly"
            type="number"
            value={profile.weeklyTargetMinutes ?? ""}
            placeholder="時間 or 距離で入力（例: 240分）"
            onChange={(e) => updateField("weeklyTargetMinutes", e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>

        <p className="hint">※ ここで入力した情報はAIメニュー提案とねぎらい文脈に使われます。</p>
        <p className="subtle">{saving ? "保存中..." : "自動保存済み"}</p>
        {error ? <p className="subtle" style={{ color: "#b91c1c" }}>{error}</p> : null}
      </article>
    </div>
  );
}
