# プラズマ・核融合 若手夏の学校 HP

[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/plasma-fusion-youth-forum/pfyss/main.svg)](https://results.pre-commit.ci/latest/github/plasma-fusion-youth-forum/pfyss/main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## このリポジトリについて

プラズマ・核融合若手夏の学校の HP のソースコードです。
[https://pfyss.org](https://pfyss.org/)
にて公開しています。

## ローカルでの確認方法

### 1. リポジトリをクローンする

```bash
$ git clone https://github.com/plasma-fusion-youth-forum/pfyss.git
```

### 2. リポジトリのルートディレクトリに移動する

```bash
$ cd pfyss
```

### 3. index.html をブラウザで開く

index.html をブラウザで開くと、ローカルで確認できます。

## ディレクトリ構成

```
.
├── assets
│   ├── css
│   ├── favicon
│   ├── img
│   └── js
├── forepast
├── img
├── index.html
└── README.md
```

### `assets/css`

サイトの基本となる CSS ファイルを格納するディレクトリです。

### `assets/favicon`

サイトの favicon を格納するディレクトリです。

### `assets/img`

サイトの基本となる画像ファイルを格納するディレクトリです。
年に共通して使用する画像ファイルはここに格納します。

### `assets/js`

サイトの基本となる JavaScript ファイルを格納するディレクトリです。

### `forepast`

過去のプラズマ・核融合若手夏の学校の HP を格納するディレクトリです。
`2022`, `2023`といったディレクトリを作成し、その中に過去のトップページ`/index.html`, 画像ディレクトリ`/img`
を格納します。

### `img`

現在のプラズマ・核融合若手夏の学校の HP に掲載する画像ファイルを格納するディレクトリです。
年によって変わる画像ファイルはここに格納します。

### `index.html`

サイトのトップページです。

### `README.md`

このファイルです。

## ライセンス

このリポジトリのソースコードは MIT ライセンスのもとで公開していますが、テンプレートは[この Bootstrap Theme](https://themes.getbootstrap.com/product/silicon-business-technology-template-ui-kit/)の Standard License に従っています。

## 連絡先

何かありましたら、[こちら](https://pfyss.org/contact/)からご連絡ください。

## プラズマ・核融合若手夏の学校について

プラズマ・核融合 若手夏の学校は、日本の学生・若手研究員が集い、プラズマ・核融合研究の最前線を学ぶことを目的とした学校です。
2018 年の第 57 回を最後に一度途絶えていましたが、2021 年から新たな体制のもと第 0 回として再スタートしました。
詳しくは[こちら](https://pfyss.org/forepast/)をご覧ください。

## プラズマ・核融合若手夏の学校の HP について

プラズマ・核融合若手夏の学校の HP は、[プラズマ・核融合 若手フォーラム](https://www.jspf.or.jp/wakate/)が運営しています。

## 開発者向け情報

### UI ドキュメント

本ホームページは、[Silicon Bootstrap Theme](https://themes.getbootstrap.com/product/silicon-business-technology-template-ui-kit/)をベースに作成しています。
UI に関するドキュメントは、[こちら](https://silicon.createx.studio/components/typography.html)を参照してください。
