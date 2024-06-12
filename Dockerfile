# ベースイメージとしてNode.jsを使用
FROM node:20.9.0-alpine

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# サーバーを使用するためにserveパッケージをインストール
RUN npm install -g serve

# ポートを公開
EXPOSE 3000

# アプリケーションをスタート
CMD ["serve", "-s", "dist"]
