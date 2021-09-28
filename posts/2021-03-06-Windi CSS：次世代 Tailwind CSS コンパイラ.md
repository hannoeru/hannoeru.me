---
title: Windi CSS：次世代 Tailwind CSS コンパイラ
author: hanlee
type: post
lang: ja-JP
date: 2021-03-06T18:59:14+00:00
description: Windi CSS は Tailwind CSS 2.0 完全互換の動的生成コンパイラです。
image: /images/2021/WindiCSS.png
categories:
  - WindiCSS
tags:
  - WindiCSS
  - CSS
  - Vite

---

[windi css]: https://github.com/windicss/windicss
[windicss doce]: https://windicss.netlify.app/
[tailwind css]: https://tailwindcss.com/docs
[autoprefixer]: https://autoprefixer.github.io/
[vitejs]: https://vitejs.dev/
[vite-plugin-windicss]: https://github.com/windicss/vite-plugin-windicss
[vite-windi-starter]: https://github.com/hannoeru/vite-windi-starter

[__Windi CSS__][windi css] は [Tailwind CSS] 2.0完全互換の動的生成コンパイラです。

Tailwind CSS を使った場合、初期ビルド時間が非常に長くなってしまう場合がありますが、[Windi CSS] を使うことでビルド時間を短縮し、リロード時も高速に表示することができます。

## 機能について

- 実行速度
- 変数とバリアントの自動推定
- 構成ファイルの互換性
- ブラウザ互換性

### ⚡️ 速度

CSS 内のユーティリティとディレクティブを検出し、動的で処理します。これにより、コンパイル速度が大幅に向上されます。 [Windi CSS] は、使用する CSS のみをロードするので、パージする必要がありません。

<Tweet id="1361398324587163648" />

### 😎 変数とバリアントの自動推定

数値、サイズ、スコア、色などのカスタム変数を設定する必要はありません。 [Windi CSS] は、クラスのセマンティクスに基づいてそれらを自動的に生成します。

たとえば、 `p-3.2`を使用すると、それが利用可能になり、そのまま機能します。

### ⚙️ 構成ファイルの互換性

[Windi CSS] は [Tailwind CSS] の構成ファイルを使用できます。

### ✅ ブラウザの互換性

すべてのユーティリティ用に生成されたCSSはすでにブラウザ互換であるため、必要がない限り [autoprefixer] を使用する必要がありません。

## Windi CSS に追加されている機能について

- ユーティリティグループ
- スクリーンユーティリティ
- より高機能なライト/ダークテーマのサポート
- 変数とバリアントの自動推定

### 🎳 ユーティリティグループ

括弧でグループ化することで、同じバリアントに複数のユーティリティを適用することができます。

```html
<div class="bg-white font-light sm:hover:(bg-gray-100 font-medium)"/>
```

### 🖥 スクリーンユーティリティ

 `+` や `-` の画面ユーティリティを使うことができます、カスタマの画面サイズにも適用します。

```css
sm: @media (min-width:640px);
+sm: @media (min-width:640px) and (max-width:768px);
-sm: @media (max-width:640px);
```

### 🌓 より高機能なライト/ダークテーマのサポート

[Windi CSS] はすべての CSS [疑似要素と疑似クラス](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) に対応しています。

また、`prefers-color-scheme` に基づいて `@dark`、 `@light` のクラスも追加しました。

### 🤖 変数とバリアントの自動推定

[Windi CSS] は使用されたCSSユーティリティのみを生成するため、数値やサイズ、スコア、色などのカスタム変数を設定する必要がなくなりました。

[Windi CSS] は自動的にユーティリティを検出し、適切なアルゴリズムに基づいてクラスを生成します。

また、変数名を渡すこともできるので、CSS変数（CSSカスタムプロパティ）との組み合わせは非常に便利です。

#### 数字

```css
p-${float[0,...infinite]} -> padding: ${float/4}rem

p-2.5 -> padding: 0.625rem;
p-3.2 -> padding: 0.8rem;
```

#### サイズ

```css
// ${size} must end up with rem|em|px|vh|vw|ch|ex
p-${size} -> padding: ${size}

p-3px -> padding: 3px;
p-4rem -> padding: 4rem;
```

#### 分数

```css
w-${fraction} -> width: ${fraction -> precent}

w-9/12 -> width: 75%;
```

#### カラー

```css
bg-${color} -> background-color: rgba(...)

bg-gray-300 -> background-color: rgba(209, 213, 219, var(--tw-bg-opacity);

bg-hex-${hex} -> background-color: rgba(...)

bg-hex-1c1c1e -> background-color: rgba(28, 28, 30, var(--tw-bg-opacity));
```

#### CSS変数（CSSカスタムプロパティ）

```css
bg-$${variableName}

.bg-$test-variable {
  --tw-bg-opacity: 1;
  background-color: rgba(var(--test-variable), var(--tw-bg-opacity));
}
```

## 🔰 始め方

最近流行りのフロントエンドツール [Vitejs] を使って [Windi CSS] の環境構築と実際に動かすところまでをやっていきます。

### Vite のインストール

Viteテンプレートの生成

```bash
npm init @vitejs/app
```

テンプレートの中で自分が好きのを選んでプロジェクトフォルダに移動

```bash
cd [project name]
```

依存項目のインストール

```bash
npm install
```

Devサーバーを起動

```bash
npm run dev
```

### Windi CSS プラグインのインストール

vite-plugin-windicss のインストール

```bash
npm i vite-plugin-windicss -D # yarn add vite-plugin-windicss -D
```

プロジェクトのルートディレクトリの`vite.config.ts`を編集

```ts vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss' // 追加

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS() // 追加
  ]
})
```

### 動作確認

`src/main.ts` ファイルに [Windi CSS] をインポート
```ts src/main.ts
import 'virtual:windi.css'
```

設定は簡単なので、短時間ですぐ使えます、
ぜひ Vite と Windi CSS の速さを体験してください。

[ソースコード][vite-windi-starter]
[Tailwind CSS からの移行ガイド](https://windicss.org/guide/migration.html)

翻訳元：[WindiCSS Doce]

## 参考・リンク

- [Windi CSS]
- [WindiCSS Doce]
- [vite-plugin-windicss]
- [vite-windi-starter]
- [Vitejs]
