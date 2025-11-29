# glow-web-mind-app

Glow-Rabbit runner-support web app (AI menu + glow-c send + post-run chat). See `request_glow_web_mind_app.md` for MVP scope.

## Status
- Git: initialized on `main`, remote `yemukami/glow_web_mind_app`.
- Scaffold: Next.js + TypeScript (App Router), landing + nav + screen stubs.
- BLE: libs/ble is stubbed; port from `glow_web_app` next. glow-r list fetch is DB/other app.

## References
- Requirements: `/Users/murakamikenji/Downloads/glowtestbase/request_glow_web_mind_app.md`
- Guides: `.codex/docs/report_phase1.md`, `.codex/docs/agent_guide_web.md`
- BLE source: `glow_web_app/ble_protocol.js`, `glow_web_app/app.js` (queue/commands)

## Run (after installing deps)
```bash
npm install
npm run dev
```

## Deploy
- Connect repo to Vercel (branch: `main`). Next.js defaults should work.

## Notes
- glow-r list取得は別アプリ側でDB経由実装予定のため、libs/ble の `fetchGlowRDevicesFromDb` はスタブ。
- Web Bluetooth: connect/disconnect must be user-gesture driven; send via queued write (highPriority for Start/Stop).
- Pages: `/profile`, `/races`, `/sessions`, `/ai/menu`, `/ai/reflect`, `/ble`.
