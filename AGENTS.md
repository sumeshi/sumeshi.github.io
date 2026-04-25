# AGENTS.md

このドキュメントはAIエージェントがプロジェクトを把握するための参照資料です。

---

## 概要

**sumeshi.github.io** — S.Nakano（DFIR Researcher / Software Developer）の個人ポートフォリオ兼ブログサイト。
GitHub Pages でホストされる静的サイト（SPA）。

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | SvelteKit 2 + Svelte 5 |
| スタイリング | Tailwind CSS v4 (`@tailwindcss/vite`) |
| コードハイライト | highlight.js（テーマ: tokyo-night-dark） |
| HTML サニタイズ | DOMPurify（ブラウザ側で使用） |
| ビルドアダプター | `@sveltejs/adapter-static` |
| デプロイ | GitHub Actions → GitHub Pages (`peaceiris/actions-gh-pages@v4`) |
| Node.js | v22 LTS |

---

## プロジェクト構造

```
/
├── src/
│   ├── app.html              # HTMLテンプレート（gtag.js含む）
│   ├── app.css               # グローバルCSS（Tailwind + .html-wrapper）
│   ├── lib/
│   │   └── types.ts          # 型定義（PostIndex, PostContent, ContentBlock）
│   └── routes/
│       ├── +layout.ts        # ssr=false, prerender=false（SPAモード）
│       ├── +layout.svelte    # 共通レイアウト（サイドバー・ナビ・Privacy Policy）
│       ├── +page.svelte      # Home: プロフィール・ナビボタン・最新投稿5件
│       ├── about/
│       │   └── +page.svelte  # About: whoami / history / techstack（EN/JA切替）
│       ├── works/
│       │   └── +page.svelte  # Works: OSS紹介（evtx2es, mft2es, ntfsdump, etc.）
│       └── posts/
│           ├── +page.svelte                        # 全投稿一覧 + 外部プラットフォームリンク
│           ├── [categoryName]/
│           │   ├── +page.svelte                    # カテゴリ別投稿一覧
│           │   └── [postId]/
│           │       └── +page.svelte                # 投稿詳細（HTMLレンダリング + コードハイライト）
├── public/
│   └── img/                  # 静的画像（me.jpg, blurdog.jpg, favicon.ico, card.png）
├── .devcontainer/
│   ├── Dockerfile            # node:22-bookworm + Fish shell
│   ├── devcontainer.json     # VSCode拡張: svelte.svelte-vscode, tailwindcss
│   └── postCreateCommands.fish
├── .github/workflows/
│   └── deploy.yml            # push to master → npm run build → GitHub Pages
├── svelte.config.js          # adapter-static, fallback: '404.html'
├── vite.config.ts            # tailwindcss() + sveltekit()
├── package.json              # "type": "module" 必須
└── tsconfig.json             # extends .svelte-kit/tsconfig.json
```

---

## ルーティングとデータフロー

全データはクライアントサイドで `fetch` により取得（`ssr = false`）。
GitHub Pages の動的ルート（`/posts/[cat]/[id]`）は `404.html` フォールバックで処理。

### API エンドポイント

| 用途 | URL |
|---|---|
| 全投稿一覧 | `https://sumeshi.github.io/api/posts/` |
| カテゴリ別投稿 | `https://sumeshi.github.io/api/posts/{categoryName}` |
| 投稿詳細 | `https://sumeshi.github.io/api/posts/{categoryName}/{postId}/index.html` |

APIは別リポジトリ（`sumeshi/api`）で管理・生成されたJSONを返す。
投稿ソースは `https://github.com/sumeshi/api/blob/master/{categoryName}/{postId}.md`。

### 投稿コンテンツのレンダリング

`[postId]/+page.svelte` にて以下の処理を行う：

1. `html_text`（HTML文字列）を取得
2. `<pre><code>` タグで分割し `text` / `code` ブロックに分類
3. `code` ブロック → `hljs.highlightAuto()` でシンタックスハイライト
4. `text` ブロック → DOMPurify でサニタイズ
5. `{@html}` で描画（`.html-wrapper` クラスでスタイル適用）

---

## スタイリング方針

- ダークテーマ固定: 背景 `#0C111B`、カード `bg-gray-900/50`
- アクセントカラー: indigo-400 / indigo-600
- レイアウト: サイドバー（`w-64`, デスクトップ固定） + ハンバーガーメニュー（モバイル）
- フォント: Tailwind デフォルト（system font stack）
- `.html-wrapper`: 投稿HTMLのグローバルスタイル（`src/app.css` に定義）

---

## ビルドとデプロイ

```bash
# 開発サーバー
npm run dev

# 本番ビルド（出力: ./build）
npm run build

# 型チェック
npm run check
```

`master` ブランチへの push で GitHub Actions が自動デプロイ。
出力ディレクトリ `./build` を GitHub Pages に公開。

---

## 注意事項

- `package.json` に `"type": "module"` が必須（ESMのみのパッケージのため）
- `tsconfig.json` は `.svelte-kit/tsconfig.json` を extends するため、初回は `npx svelte-kit sync` が必要
- `node_modules` を削除して再インストールする場合は `package-lock.json` も削除すること
- highlight.js は全言語をバンドルするため約 975KB（gzip後 315KB）。必要に応じて使用言語を限定可
- About ページの言語（EN/JA）はページロード毎に `'en'` にリセットされる（永続化なし）
