# Recursion Server with Databases: Social Networking Service / KarukanSNS

![Node.js 20.9.0](https://img.shields.io/badge/Node.js-20.9.0-brightgreen)
![Express 4.19.2](https://img.shields.io/badge/express-4.19.2-brightgreen)
![Mysql](https://shields.io/badge/MySQL-lightgrey?logo=mysql&style=plastic&logoColor=white&labelColor=blue)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
[![TypeScript](https://img.shields.io/badge/TypeScript-v4.9.3-007ACC?logo=TypeScript&logoColor=007ACC)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html)
[![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=React&logoColor=61DAFB)](https://react.dev/blog/2022/03/29/react-v18#whats-new-in-react-18)
[![Docker](https://img.shields.io/badge/Docker-gray?logo=Docker&logoColor=2496ED)](https://www.docker.com)
![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

![service-image](https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/appImg.png)

## 概要

KarukanSNS は Twitter に類似した機能を持つソーシャルネットワーキングアプリケーションです。
ユーザーはプロフィールを作成し、短いメッセージを投稿し、メディアコンテンツを共有し、プライベートメッセージで他のユーザーと交流し、通知を確認し、フォローしている人やトレンドに基づくホームページのタイムラインを楽しむことができます。他にも、投稿に「いいね」する機能、投稿をスケジュールする機能、投稿に返信する機能、投稿を削除する機能があります。コミュニケーションと情報共有のための使いやすいプラットフォームを提供することを狙いとしています。

### ▼ サービス URL

https://karukan-practice.site/

※2024/07/30~　改修のためサーバー停止中

レスポンシブ対応済。※実機確認は手元にデバイスがないため行っておらず、GoogleChrome の開発者ツールでレスポンシブ確認を行った。

## インフラ構成図

![infrastructure-diagram](https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/infrastructure.drawio.png)

このアプリケーションは単一のサーバ上でのみ実行され、垂直スケーリングのみが可能な構成となっている。

・フロントエンド
フロントエンドは、React で作成したアプリケーションを使用し、Amazon S3 を使用して静的サイトホスティングを行った。CloudFront を利用して、S3 のコンテンツをグローバルにキャッシュし、ユーザーに高速に配信するようにした。ドメイン名の管理には Amazon Route 53 を使用し、カスタムドメインを設定した。

・バックエンド
Node.js を使用してバックエンドアプリケーションを作成し、Amazon EC2 インスタンスにデプロイした。この EC2 インスタンスは。Nginx をリバースプロキシとして使用して、クライアントからのリクエストを Node.js アプリケーションに転送して SSL/TLS の処理を行っている。

・データベース
データベースは費用上の問題から、Amazon RDS ではなく EC2 インスタンスに MySQL サーバーを立てて運用。これにより、AWS 無料枠以内になりコストを最適化した。

## ER 図

![er-diagram](https://github.com/Karukan0814/SocialNetworkingService_back/blob/main/prisma/ERD.md)
※Mermaid.js で自動作成

## メイン機能の使い方

<br>

## 主な機能

### コア機能

<table style="width: 90%">
  <tr>
    <th style="text-align: center">サインアップ・Email認証</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/SignUp.gif"
        alt="サインアップ"
      />
    </td>
  </tr>
  <tr>
    <td>
      <p style="width: 90%; word-wrap: break-word">Email認証の流れ：</p>

   <p style="width: 90%; word-wrap: break-word">
        トークン生成:
        JWTを使用してトークンを生成。トークンにはユーザー情報と有効期限が含まれる。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        1.メール送信:
        nodemailerを利用し、GmailのSMTPサーバーを経由して登録されたユーザーのメールアドレスにメールを送信。このメールには認証用のリンクが記載されている。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        2.ユーザー認証:
        ユーザーは送られてきたメールに記載されているリンクをクリックすることで認証を完了させる。このリンクにはJWTトークンが含まれており、バックエンドでトークンを検証することでユーザーの認証が完了する。
      </p>
    </td>

  </tr>
</table>

<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">ログイン・ログアウト</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/LoginLogout.gif"
        alt="ログインログアウト"
      />
    </td>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">
        ログイン・ログアウトの流れ：
      </p>

  <p style="width: 90%; word-wrap: break-word">
        1.ログイン:
        ユーザーは登録しているemailアドレスとパスワードを入力して送信する。サーバーはemailとパスワードの整合性を確認して合致しているならばJWTを使用してトークンを作成し必要なユーザー情報とともに返却する。フロントエンドでそのトークンとユーザー情報をjotaiを使用してアプリケーション全体で保持する。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        2.ログアウト:
        ログアウトボタンをクリックすると、Jotaiで保持されているトークンとユーザー情報がクリアされ、ログイン画面に遷移してログアウト処理が完了する。
      </p>
    </td>

  </tr>
</table>
<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">ポスト投稿（スケジュール投稿可）</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/postScheduled.gif"
        alt="スケジュール投稿"
      />
    </td>
  </tr>

  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">ポストの投稿：</p>

  <p style="width: 90%; word-wrap: break-word">
        1.通常投稿: 200字以内のテキストと添付画像を送信することができる。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        2.予約投稿:
        未来の日時を設定することで、あらかじめポストの投稿を予約することができる。予約した投稿はプロフィール画面の自ポスト一覧から確認可能
      </p>
      <p style="width: 90%; word-wrap: break-word">
        3.動画添付:
        mp4もしくはwebm形式の動画を添付可能。添付した動画はサーバー側でffmpegを使用して圧縮して保存する。※今回作成した本番環境では、サーバー側でのffmpegの使用がEC2インスタンスのメモリを圧迫するため、動画投稿を停止している。試す場合は開発環境を作成し、PostType.tsのvalidPostImgTypesのコメントアウトを外す。
      </p>
    </td>

  </tr>
</table>
<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">ポスト詳細表示・リプライ投稿</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/postDetailandReply.gif"
        alt="ポスト詳細表示・リプライ投稿"
      />
    </td>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">ポストの詳細：</p>

  <p style="width: 90%; word-wrap: break-word">
        1.ポストの詳細確認:
        Home画面に表示されたポスト一覧にある各ポストをクリックすると、そのポストの詳細画面に遷移する。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        2.リプライ一覧:
        ポスト詳細画面では、そのポストへのリプライの一覧を見ることができる（無限スクロール・1ロード20件）。また、リプライをクリックすることでそのリプライポストの詳細画面に遷移する（リプライへのリプライが可能）。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        3.リプライ投稿:ユーザーは任意のポストに対してリプライボタン、もしくはポスト詳細画面にあるリプライ送信ボックスからリプライポストを投稿できる。リプライに対するリプライも可能。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        4.リプライ通知:リプライした相手にはリプライされたことを知らせる通知が飛ぶ。
      </p>
    </td>

  </tr>
</table>

<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">いいね機能</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/Like.gif"
        alt="いいね機能"
      />
    </td>
  </tr>

  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">
        1.いいね機能:
        各ポストの下部のハートマークをクリックすると、そのポストにいいねすることができる。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        2.いいね一覧:
        いいねしたポストの一覧はプロフィール画面のいいねタブから確認することができる。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        3.いいね通知:いいねしたポストを投稿したユーザーにはいいねされたことを知らせる通知がとぶ。
      </p>
    </td>
  </tr>
</table>
<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">リアルタイム通知機能</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/Notification.gif"
        alt="通知機能"
      />
    </td>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">
        通知機能：ソケット通信を利用してサーバー側と通信を行い、3分に一度、ユーザーが未読の通知数を取得する。通知画面ではユーザーに送信された通知の一覧が閲覧でき、未読の通知は3秒間だけ色がグレーに表示される。
      </p>

<p style="width: 90%; word-wrap: break-word">
        1.いいね通知:
        ユーザーのポストがいいねされたことを通知。クリックすると該当のポスト詳細画面に遷移する。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        2.リプライ通知:
        ユーザーのポストにリプライされたことを通知。クリックすると該当のポスト詳細画面に遷移する。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        3.フォロー通知:他ユーザーにフォローされたことを通知。クリックするとそのユーザーのプロフィール画面に遷移。
      </p>
    </td>

  </tr>
</table>
<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">リアルタイムメッセージ機能</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/Message.gif"
        alt="リアルタイムメッセージ機能"
      />
    </td>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">
        1.ユーザー検索機能:
        メッセージを開始したいユーザーを通知画面上のAddボタンをクリックして表示されるユーザー検索画面から検索可能。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        2.メッセージ機能：メッセージ一覧からメッセージをやりとりしたいユーザーを選択すると、ソケット通信を開始し、リアルタイムでサーバーとやりとりして相手ユーザーとメッセージをやりとりする。
      </p>
      <p style="width: 90%; word-wrap: break-word">
        3.メッセージ暗号化：すべてのプライベートメッセージは、cryptoを用いて暗号化された後にデータベースに保存、読む際に復号される。
      </p>
    </td>
  </tr>
</table>

<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">プロフィール更新</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/UpdateProfile.gif"
        alt="プロフィール更新"
      />
    </td>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      ユーザー情報更新:
      プロフィール画面のUpdateボタンをクリックすると、ユーザー情報の更新モーダルが表示される。そこから、ユーザー名・プロフィール画像・紹介文を変更可能
    </td>
  </tr>
</table>

<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">
      自分の投稿したポスト・リプライ・いいねしたポストの確認
    </th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/MyPosts.gif"
        alt="自ポスト確認"
      />
    </td>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">
        プロフィール画面には自分の投稿したポスト・リプライ・いいねしたポストの確認が行えるタブが存在する。
      </p>
    </td>
  </tr>
</table>
<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">ポスト検索機能</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/Search.gif"
        alt="ポスト検索機能"
      />
    </td>
  </tr>

  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">
        検索画面からキーワード検索可能
      </p>
    </td>
  </tr>
</table>
<table>
  <tr style="margin-top: 20px">
    <th style="text-align: center">フォロー・アンフォロー機能</th>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <img
        src="https://github.com/Karukan0814/Recursion-SocialNetworkingService_front/blob/main/public/assets/FollowUnfollow.gif"
        alt="フォロー・アンフォロー機能"
      />
    </td>
  </tr>
  <tr style="margin-top: 20px">
    <td>
      <p style="width: 90%; word-wrap: break-word">
        プロフィール画面やフォロー一覧画面の各ユーザー情報にはフォロースイッチがあり、フォローのON/OFFを切り替えられる。
      </p>
    </td>
  </tr>
</table>

<br>

## バッチ処理

プロトタイプであるため、初期データとして 2000 人のフェイクユーザーを作成している。
これらのフェイクユーザーが実際のアプリケーションの稼働を模擬するために、フェイクユーザーが下記のような挙動を行うバッチ処理を組んでいる。
・毎日ランダムに 3 つの投稿を行う。
・5 つの他のランダムな投稿に「いいね」を行う。
・ランダムにメイン投稿を１つ選択してリプライを行う。
・フォロワー数が 100 人以上の「インフルエンサー」アカウントの 20 の投稿にランダムに「いいね」を行う。

<br>

## 使用技術一覧

**バックエンド:** Node.js 　 20.9.0 / TypeScript 5.4.5

- フレームワーク: Express.js (^4.19.2)
- データベースクライアント: Prisma (^5.12.1)
- ORM クライアント: @prisma/client (^5.14.0)
- テストフレームワーク: Jest (^29.7.0)
- HTTP クライアント: Axios (^1.6.1)
- セキュリティ: Helmet (^7.1.0), JSON Web Tokens (jsonwebtoken) (^9.0.2)
- ロギング: Morgan (^1.10.0)
- バッチ処理: node-cron (^3.0.3)
- メール送信: Nodemailer (^6.9.13)
- 暗号化: bcrypt (^5.1.1), bcryptjs (^2.4.3), crypto (^1.0.1)
- ファイルアップロード: Multer (^1.4.5-lts.1)
- 環境変数: dotenv (^16.4.5)
- ソケット通信: socket.io (^4.7.5)
- AWS SDK: aws-sdk (^2.1617.0)
- フェイクデータ生成: @faker-js/faker (^8.4.1)
- その他依存関係: cors (^2.8.5)

**フロントエンド:** TypeScript: ^4.9.3 / React ^18.2.0

- スタイリング: @emotion/react (^11.11.4), @emotion/styled (^11.11.5), @mui/material (^5.15.15)
- アイコン: @mui/icons-material (^5.15.15)
- HTTP クライアント: Axios (^1.6.8)
- 状態管理: Jotai (^2.8.0)
- 認証・メール送信: Nodemailer (^6.9.13)
- 日付処理: date-fns (^3.6.0)
- 無限スクロール: react-infinite-scroller (^1.2.6)
- ルーティング: react-router-dom (^6.22.3)
- ソーシャルメディア埋め込み: react-twitter-embed (^4.0.4)
- ソケット通信: socket.io-client (^4.7.5)
- フォーム管理: react-hook-form (^7.51.3)

**CI / CD:** GitHub Actions

**認証:** jsonwebtoken

## 課題

1. 水平スケーラビリティ
   　現状の本番環境はバックエンドサーバーとデータベースサーバーがそれぞれ一つの EC2 インスタンスからなる構成であり、スケーリングが垂直方向のみである。この場合、同時に多数のユーザーからのリクエストにサーバーが対応できない。よって、水平スケーリングが可能な構成を考えるべきである。なお、AWS の使用を想定する。

   1. 同時に 1000 万人のユーザーをサポートする方法は？

   バックエンドサーバーの水平スケーリングとトラフィックの振り分けが必要。Auto Scaling を使用し、EC2 の CPU 使用率を監視して閾値を超えた場合に EC2 インスタンスを追加、CPU 使用率が下がった場合にはインスタンスを削除して可用性を維持する。また、ELB(Elastic Load Balancing)を使用して、使用可能な EC2 を常時監視してトラフィックの振り分けを行う。

   2. 複数のデータベースサーバがある場合、それらはどのようにしてデータを複数のデータベースサーバに分散しますか？

   AWS の RDS を使用し、読み取り専用のリードレプリカを作成して処理のパフォーマンスを向上させる。そして、ユーザーの ID など一定の規　則に従って異なるデータサーバにデータを登録するようにアプリケーションを変更してデータを分散させる。

   3. 100,000 ~ 1,000,000 件の投稿が毎分スケジュールされている場合、サーバはどのように投稿をスケジュールしますか？

      AWS を使用する場合、SQS にスケジュールされた投稿処理のリクエストを貯め、Lamda 関数がそのリクエストを順次処理するようにする。

   4. ユーザープロファイルや人気の投稿など、頻繁にアクセスされるデータのデータベース負荷を軽減するためにどのようなキャッシングメカニズムを使用しますか？ 人気のインフルエンサーをキャッシュすることは役立ちますか？

   一般的に頻繁にアクセスされるデータをキャッシュしておくことはサーバーの負荷軽減に役立つため、人気のインフルエンサーをキャッシュしたり人気の画像をキャッシュしておくことは有用である。AWS の場合、ElastCache を使用してよく利用するデータを一時保存領域に保存して高速に提供できるようにする。また、CloudFront のような CDN サービスを使用することで画像や動画などを利用者に地理的に近いサーバーにキャッシュすることで高速に読み込ませることもユーザーエクスペリエンスの向上に有用である。

   5. 新しいサーバがいつでも追加および削除される場合、この水平スケーリングを行う際にどのようにデプロイメントを管理しますか？

      GituhubActions などを用いてコードのデプロイを自動化する。

   6. データベースのバックアップおよび災害復旧

      現状のデータベースサーバーは定期的なバックアップや災害発生時の復旧プランがない脆弱なものである。これを改善するには、AWS の RDS を用い、自動バックアップを設定してデータの損失を防ぎ、マルチ AZ 構成でスタンバイインスタンスを用意して災害発生時は自動でバックアップデータから復旧するように設定する。

2. テストコードの作成と実行

   今回は一度アプリケーションを完成させることを目的としたため、テストコードの作成とそれを CI/CD に組み込むステップを行っていない。
   アプリケーションのバグの炙り出しと安定的な稼働、今後の機能追加等のために自動化されたテストコードが必要

## 開発環境の構築

開発環境を Docker を使用して立ち上げることが可能。以下、その手順。
※以下はフロントエンドのたちあげ。バックエンドの立ち上げは以下リンクに記述。
[https://github.com/Karukan0814/SocialNetworkingService_back]

1. 当該レポジトリをローカル環境にコピー

2. 環境変数ファイルの準備
   　.env ファイルをルートフォルダ直下に用意し、以下を記述して保存する。

```
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000




```

3. Docker ビルド
   　以下を実行してビルド。なお、以下は Docker がインストール済みであることを前提とする。

```
docker build -t my-react-app .
```

4. Docker 立ち上げ
   　以下を実行してコンテナを立ち上げ。

```
docker run -p 3000:3000 my-react-app
```

5. 動作確認
   　[http://localhost:3000/](http://localhost:3000/)にアクセスして動作確認
