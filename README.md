# Recursion Server with Databases: Social Networking Service / KarukanSNS

![service-image](https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/appImg.png)
![Node.js 20.9.0](https://img.shields.io/badge/Node.js-20.9.0-brightgreen)
![Express 4.19.2](https://img.shields.io/badge/express-4.19.2-brightgreen)
[![TypeScript](https://img.shields.io/badge/TypeScript-v4.9.3-007ACC?logo=TypeScript&logoColor=007ACC)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html)
[![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=React&logoColor=61DAFB)](https://react.dev/blog/2022/03/29/react-v18#whats-new-in-react-18)
[![Docker](https://img.shields.io/badge/Docker-gray?logo=Docker&logoColor=2496ED)](https://www.docker.com)

## 概要

KarukanSNS は Twitter に類似した機能を持つソーシャルネットワーキングアプリケーションです。
ユーザーはプロフィールを作成し、短いメッセージを投稿し、メディアコンテンツを共有し、プライベートメッセージで他のユーザーと交流し、通知を確認し、フォローしている人やトレンドに基づくホームページのタイムラインを楽しむことができます。他にも、投稿に「いいね」する機能、投稿をスケジュールする機能、投稿に返信する機能、投稿を削除する機能があります。コミュニケーションと情報共有のための使いやすいプラットフォームを提供することを狙いとしています。

プロトタイプであるため、初期データとして 2000 人のフェイクユーザーを作成している。
これらのフェイクユーザーが実際のアプリケーションの稼働を模擬するために、フェイクユーザーが下記のような挙動を行うバッチ処理を組んでいる。
・毎日ランダムに 3 つの投稿を行う。
・5 つの他のランダムな投稿に「いいね」を行う。
・ランダムにメイン投稿を１つ選択してリプライを行う。
・フォロワー数が 100 人以上の「インフルエンサー」アカウントの 20 の投稿にランダムに「いいね」を行う。

### ▼ サービス URL

https://karukan-practice.site/

レスポンシブ対応済。※実機確認は手元にデバイスがないため行っておらず、GoogleChrome の開発者ツールでレスポンシブ確認を行った。

## インフラ構成図

![infrastructure-diagram](https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/infrastructure.drawio.png)

## ER 図

![er-diagram](https://github.com/Karukan0814/SocialNetworkingService_back/blob/main/prisma/ERD.md)
※Mermaid.js で自動作成

## メイン機能の使い方

<br>

## 主な機能

### コア機能

サインアップ・email 認証
ログイン・ログアウト
投稿のトレンド一覧表示・フォローユーザーの投稿一覧表示
ポスト投稿
リプライ投稿
いいね機能
ソケット通信によるリアルタイム通知機能
ソケット通信によるリアルタイムメッセージ機能
マイページ上でプロフィール情報変更
マイページ上で自ポストの一覧表示・リプライ一覧表示・いいね一覧表示

<table>
  <tr>
     <th style="text-align: center">サインアップ・Email認証</th>
    <th style="text-align: center">ログイン・ログアウト</th>
  </tr>
  <tr>
    <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/SignUp.gif" alt="サインアップ" /></td>
    <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/LoginLogout.gif" alt="お魚検索機能" /></td>
 
  </tr>
  <tr>
    <th style="text-align: center">ポストの一覧表示（トレンド/フォロー切り替え）</th>
     <th style="text-align: center">ポスト投稿（スケジュール投稿可）</th>
  </tr>
  <tr>
      <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/PostList.gif" alt="ポスト一覧表示" /></td>
    <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/postScheduled.gif" alt="スケジュール投稿" /></td>

  </tr>
  <tr>
    <th style="text-align: center">ポスト詳細表示・リプライ投稿</th>
     <th style="text-align: center">いいね機能</th>
  </tr>
  <tr>
      <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/postDetailandReply.gif" alt="ポスト一覧表示" /></td>
    <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/Like.gif" alt="スケジュール投稿" /></td>

  </tr>

<tr>
    <th style="text-align: center">リアルタイム通知機能</th>
     <th style="text-align: center">リアルタイムメッセージ機能</th>
  </tr>
  <tr>
      <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/Notification.gif" alt="通知機能" /></td>
    <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/Message.gif" alt="リアルタイムメッセージ機能" /></td>

  </tr>

<tr>
    <th style="text-align: center">プロフィール更新</th>
     <th style="text-align: center">自分の投稿したポスト・リプライ・いいねしたポストの確認</th>
  </tr>
  <tr>
      <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/UpdateProfile.gif" alt="プロフィール更新" /></td>
    <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/MyPosts.gif" alt="自ポスト確認" /></td>

  </tr>
  <tr>
    <th style="text-align: center">ポスト検索機能</th>
  </tr>
  <tr>
      <td><img src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/Search.gif" alt="ポスト検索機能" /></td>

  </tr>
</table>

<br>

<br>

## 使用技術一覧

**バックエンド:** Node.js 　>=16.13.0 / TypeScript 5.2.2

- フレームワーク: Express.js (^4.18.2)
- データベースクライアント: Prisma (^5.5.2)
- テストフレームワーク: Jest (^29.7.0)
- HTTP クライアント: Axios (^1.6.1)
- セキュリティ: Helmet (^7.1.0), JSON Web Tokens (jsonwebtoken) (^9.0.2)
- ロギング: Morgan (^1.10.0)
- その他依存関係: Cheerio (^1.0.0-rc.12), CORS (^2.8.5), dotenv (^16.3.1), express-validator (^7.0.1), iconv-lite (^0.6.3)

**フロントエンド:** TypeScript: 5.2.2 / React 18.2.0 / Next.js 13.2.4

- スタイリング: @emotion/react 11.11.1, @emotion/styled 11.11.0, @mui/material 5.14.16
- アイコン: @mui/icons-material 5.14.16
- HTTP クライアント: axios 1.6.0
- 状態管理: jotai 2.5.0
- 認証: firebase 10.5.2-authentification,jsonwebtoken 9.0.2
- データ保存: firebase 10.5.2-storage
- フォーム管理: react-hook-form 7.47.0
- テストフレームワーク: @testing-library/react 14.1.2, jest 29.7.0

リント / コード解析: eslint 8.52.0, eslint-config-next 14.0.1

**インフラ:**
Supabase / render / Vercel

**CI / CD:** GitHub Actions

**テスト環境構築:** Docker

**認証:** Firebase Authentication 　/ jsonwebtoken

## 主要対応一覧

- Next.js の Image / Link コンポーネントなどの活用
- Next.js の SSG と SSR を使用した SEO 最適化、パフォーマンスの向上
- レスポンシブデザイン

#### テスト / セキュリティ

- クロスブラウザテスト

  - PC
    - Windows10 / 11: Google Chrome / Firefox / Microsoft Edge
    - Mac: Google Chrome / Firefox / Safari
  - スマートフォン
    - Android: Google Chrome
    - iOS: Safari
