# Glow Web Mind App — UI Rationale (MVP Skeleton)

## Sources / Requirements
- `request_glow_web_mind_app.md`: MVP要件（練習前コンディション→AIメニュー提案→TrainingSet→glow-c送信、練習後ねぎらい）。
- `.codex/docs/report_phase1.md`, `.codex/docs/agent_guide_web.md`: Web Bluetoothの実装ガイド、UI/Controller分離、キュー必須。
- 開発方針: まずVercelで動くNext.js骨格を作り、AI/DB/BLE接続は後で差し替え可能なスタブにしておく。

## 設計意図 (今回のUI)
1) **情報の見通し優先**  
   - まだ実データ/送信系がスタブなので、カード型で「何を入力する／どこで見るか」を明示。  
   - Gridレイアウトで縦長になりすぎないよう最小幅320pxを確保。

2) **トーンを落ち着かせる**  
   - 背景はライト単色、トップバーは白＋薄いボーダー、影は弱め。  
   - ナビをシンプルなテキストリンク＋軽いアクティブ表現にして「プロダクト未完成感」を抑制。

3) **AI/実装の差し替えを想起しやすく**  
   - 各ページの冒頭に「スタブ」「API連携前」などの文言を配置。  
   - `libs/ble` や mock API の存在を説明し、後で実データに置き換えやすい構造を意識。

4) **フォーム/リストの一貫性**  
   - `.field` レイアウトでラベルと入力の間隔を統一。  
   - `.list` で箇条書きの余白を統一し、説明文のサブトーンは `.muted` / `.subtle` に限定。

## 画面ごとの狙い
- **Home**: セットアップ状況とタスクの鳥瞰。次に触るページを判断しやすくする。
- **Profile / Races**: AIコンテキストに渡す基礎情報。スタブでレイアウトを先に確定。
- **Sessions**: 練習前入力→メニュー案→練習後入力を縦に並べ、流れを示す。メニュー案はmockのTrainingSetを表示。
- **AI Menu / Reflect**: 入力欄＋AIレスポンス表示枠を分け、データ接続後の姿をイメージしやすく。
- **BLE**: コマンドとダミーglow-rリスト表示。DB経由で取得する前提を明記し、バイト配列は移植後に置換予定であることを示す。

## 今後の改善メモ
- レイアウト: モバイル幅でのパディング調整、ヘッダーの情報量をもう少し簡素化。  
- コンポーネント化: Panel / Field / List / Pill をコンポーネントにして再利用性を上げる。  
- フィードバック: AIレスポンスカードのタイポグラフィ（行間・背景色）を微調整し可読性を上げる。  
- 状態: モックからリアルAPIへ置き換えた際、loading/empty/errorステートを追加。  
- BLE: スタブから実装へ移行したときの警告や「ユーザー操作必須」表示の位置を調整。
- 2025-11-29: UI微修正  
  - AIメニュー/リフレクトの開発ノートを `.stub-notice` に統一。  
  - リフレクトのレスポンス表示をフラットな枠に整形。  
  - BLE Connectボタンの接続後スタイルを弱めた色味＋ラベル更新にして状態を明示。
- 2025-11-29: DB設計開始  
  - `prisma/schema.prisma` に User/Race/Session/TrainingSet/Feedback/Chat/Summary を定義。  
  - PostgreSQL + Prismaを前提。既存要件（request_glow_web_mind_app.md）の概念モデルを忠実に踏襲。  
  - glowScenarioJson は TrainingSet に保持、tagsJson / topicsJson はJSON文字列で保存。
- 2025-11-29: DB接続準備  
  - `.env.example` を追加（DATABASE_URLサンプル）。`.gitignore` に例外追加。  
  - `prisma/seed.ts` でモックデータをDBにupsertできるように準備（USE_DBで切り替え前提）。  
  - `lib/db/client.ts` を追加し、PrismaClientをsingleton管理。  
  - `lib/data/api.ts` を `USE_DB=true` 時にPrisma経由で取得し、未接続時はモックを返すフェイルセーフに変更。
