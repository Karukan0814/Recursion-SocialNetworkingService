# Recursion Server with Databases: Social Networking Service / KarukanSNS

![service-image](https://github.com/Karukan0814/EatFish_All/blob/master/assets/EatFishImg.png)
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

![infrastructure-diagram](https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/karukanSNS.drawio)

## ER 図

![er-diagram](https://github.com/Karukan0814/SocialNetworkingService_back/blob/main/prisma/ERD.md)
※Mermaid.js で自動作成

## メイン機能の使い方

<br>

## 主な機能

### コア機能

季節のお魚紹介一覧
レシピ・魚屋・お取り寄せ先一覧
お魚検索機能
いいね・ブックマーク機能
コメント機能
記事作成機能
マイページ上で記事を管理

<table>
  <tr>
     <th style="text-align: center">記事一覧</th>
    <th style="text-align: center">お魚検索機能</th>
    <th style="text-align: center">いいね・ブックマーク機能</th>
  </tr>
  <tr>
    <td><img src="https://github.com/Karukan0814/EatFish_All/blob/master/assets/articleListDemo.gif" alt="記事一覧" /></td>
    <td><img src="https://github.com/Karukan0814/EatFish_All/blob/master/assets/searchDemo.gif" alt="お魚検索機能" /></td>
    <td><img src="https://github.com/Karukan0814/EatFish_All/blob/master/assets/likeBookmarkDemo.gif" alt="いいね・ブックマーク機能" /></td>
  </tr>
  <tr>
     <th style="text-align: center">コメント機能</th>
     <th style="text-align: center">記事作成機能</th>
    <th style="text-align: center">マイページ上で記事を管理</th>
  </tr>
  <tr>
    <td><img src="https://github.com/Karukan0814/EatFish_All/blob/master/assets/commentDemo.gif" alt="コメント機能" /></td>
    <td><img src="https://github.com/Karukan0814/EatFish_All/blob/master/assets/createArticleDemo.gif" alt="記事作成機能" /></td>
    <td><img src="https://github.com/Karukan0814/EatFish_All/blob/master/assets/mypageDemo.gif" alt="マイページ上で記事を管理" /></td>
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
