"use client";

import { useState } from "react";
import type { GlowDevice } from "../../lib/ble/controller";

interface SimulatorProps {
  mockDevices: GlowDevice[];
}

export default function BleSimulator({ mockDevices }: SimulatorProps) {
  const [log, setLog] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  const addLog = (msg: string) => {
    setLog((prev) => [msg, ...prev].slice(0, 5));
  };

  const handleConnect = () => {
    addLog("Connecting to BLE controller (Stub)...");
    setTimeout(() => {
      setConnected(true);
      addLog("Connected (Simulated). Ready to queue.");
    }, 600);
  };

  const handleSend = (name: string, bytes: number[]) => {
    if (!connected) {
      addLog("Error: Click 'Connect' first.");
      return;
    }
    addLog(`Queueing ${name}: [${bytes.map((b) => b.toString(16).padStart(2, "0")).join(" ")}]`);
    // Simulate async flush
    setTimeout(() => {
      addLog(`Sent ${name}.`);
    }, 500);
  };

  // Stub command bytes
  const commands = [
    { name: "setColor(red)", bytes: [0x01, 0xff, 0x00, 0x00] },
    { name: "setPace(94000)", bytes: [0x02, 0x00, 0x01, 0x6f] },
    { name: "start", bytes: [0x03] },
    { name: "stop", bytes: [0x04] },
    { name: "reset", bytes: [0x05] }
  ];

  return (
    <div className="panel-grid">
      <article className="panel">
        <h2>BLE 接続（スタブ）</h2>
        <div className="stub-notice">
          Web Bluetooth 実装は libs/ble でスタブ中。接続/送信はユーザー操作トリガー必須。
          glow-r リストは別アプリ/DBで取得する想定で、ここではダミーを表示します。
        </div>

        <div style={{ marginBottom: 16 }}>
          <button
            onClick={handleConnect}
            disabled={connected}
            className={connected ? "cta-button" : "cta-button"} // Same style for now, could change
            style={{ opacity: connected ? 0.5 : 1, cursor: connected ? "default" : "pointer" }}
          >
            {connected ? "Connected" : "Connect via Web Bluetooth"}
          </button>
        </div>

        <div className="pill">Queue Status: {connected ? "Ready" : "Waiting"}</div>

        <ul className="list" style={{ marginTop: 16 }}>
          {commands.map((cmd) => (
            <li key={cmd.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <button
                className="tag"
                style={{ cursor: "pointer", border: "1px solid #cbd5e1" }}
                onClick={() => handleSend(cmd.name, cmd.bytes)}
              >
                Send
              </button>
              <span>{cmd.name}</span>
              <span className="subtle" style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>
                [{cmd.bytes.map((b) => b.toString(16).padStart(2, "0")).join(" ")}]
              </span>
            </li>
          ))}
        </ul>
      </article>

      <article className="panel">
        <h2>Log Output</h2>
        <div
          style={{
            background: "#1e293b",
            color: "#f8fafc",
            padding: "12px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.85rem",
            minHeight: "120px"
          }}
        >
          {log.length === 0 ? <span style={{ opacity: 0.5 }}>No activity...</span> : log.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </article>

      <article className="panel">
        <h2>glow-r デバイス（DBスタブ）</h2>
        <div className="stub-notice">別アプリでDBから取得する前提。ここでは固定値を表示。</div>
        <ul className="list">
          {mockDevices.map((d) => (
            <li key={d.mac} style={{ marginBottom: 8 }}>
              <strong>{d.name ?? "unknown"}</strong>
              <br />
              <span className="subtle" style={{ fontSize: "0.8rem" }}>
                {d.mac}
              </span>
              <div style={{ marginTop: 4 }}>
                <button
                  className="tag"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSend(`add(${d.mac.slice(-2)})`, [0x06, 0xaa])}
                >
                  Add to network
                </button>
                <button
                  className="tag"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSend(`blink(${d.mac.slice(-2)})`, [0x07, 0xaa])}
                >
                  Test Blink
                </button>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
