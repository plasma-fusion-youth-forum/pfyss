# プラズマ・核融合 若手夏の学校 HP

[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/plasma-fusion-youth-forum/pfyss/main.svg)](https://results.pre-commit.ci/latest/github/plasma-fusion-youth-forum/pfyss/main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## このリポジトリについて

プラズマ・核融合若手夏の学校の HP のソースコードです。
[https://pfyss.org](https://pfyss.org/)
にて公開しています。

## ライセンス

このリポジトリのソースコードは MIT ライセンスのもとで公開していますが、テンプレートは[この Bootstrap Theme](https://themes.getbootstrap.com/product/silicon-business-technology-template-ui-kit/)の Standard License に従っています。

## 連絡先

何かありましたら、[こちら](https://pfyss.org/contact.html)からご連絡ください。

## プラズマ・核融合若手夏の学校について

プラズマ・核融合 若手夏の学校は、日本の学生・若手研究員が集い、プラズマ・核融合研究の最前線を学ぶことを目的とした学校です。
2018 年の第 57 回を最後に一度途絶えていましたが、2021 年から新たな体制のもと第 0 回として再スタートしました。
詳しくは[こちら](https://pfyss.org/about.html)をご覧ください。

## 運営元 について

プラズマ・核融合若手夏の学校の HP は、[プラズマ・核融合 若手フォーラム](https://www.jspf.or.jp/wakate/)が運営しています。

---

# 開発者向け情報

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
│   ├── 2022
│   │   ├── index.html
│   │   └── teachers.json
│   └── 2023
├── teachers.json
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
なるべく容量の小さいものを使用してください。

### `assets/js`

サイトの基本となる JavaScript ファイルを格納するディレクトリです。

### `forepast`

過去のプラズマ・核融合若手夏の学校の HP を格納するディレクトリです。
`2022/`, `2023/`といったディレクトリを作成し、その中に過去のトップページ`index.html`, 講師情報 `teachers.json`
などを格納します。

### `teachers.json`

講師情報を格納する JSON ファイルです。このデータを元に動的に HTML を生成しています。
データ構造は以下の通りです。

```json
[
  {
    "id": "lecture1",  # スケジュールのcol-sm-8クラスを持つdivタグID
    "teachers":[  # 講師情報のリスト
      {
        "name": "夏学 太郎",  # 講師の名前
        "position": "准教授",  # 講師の役職
        "affiliation": "夏学大",  # 講師の所属
        "image": "https://photo.png",  # 講師の画像リンク先 (google driveに保存してある画像のURL生成は後述)
        "links": [  #  講師のリンク情報
          {
            "type": "twitter",  # リンクの種類 (一般的なSNS名称が使えます)
            "url": "https://twitter.com/natsugaku"  # リンク先
          },
          {
            "type": "general",  # 研究室HPなど
            "url": "https://研究室/index.html"
          },
          {
            "type": "personal",  # 個人サイトなど
            "url": "https://個人サイト/"
          }
        ]
      },
      {  # 同じ時間スロットに話す複数人の講師情報を格納できます
        "name":"夏学 花子"
        ...
      }
    ],
    "title": "核融合の歴史について",  # 講演タイトル
    "abstract": "核融合とはかくかくしかじか..."  # 講演概要
  },
  {...}
]
```

対応している一般的な SNS 名称は[こちら](https://silicon.createx.studio/components/social-buttons.html)から。

### `index.html`

サイトのトップページです。

### `README.md`

このファイルです。

## UI ドキュメント

本ホームページは、[Silicon Bootstrap Theme](https://themes.getbootstrap.com/product/silicon-business-technology-template-ui-kit/)をベースに作成しています。
UI に関するドキュメントは、[こちら](https://silicon.createx.studio/components/typography.html)を参照してください。

## Bootstrap5 について

本ホームページのテンプレートは、Bootstrap5 をベースに作成されています。
Bootstrap5 入門者は、[とほほの Bootstrap5 入門](https://www.tohoho-web.com/bootstrap5/index.html)を参考にしてください。

## フォームの設定について

本ホームページのフォームは、Google フォームを利用しています。
HTML でデザインしたフォームと Google フォームの紐付けは、[こちら](https://zenn.dev/yurukei20/articles/9741118bfb5ee0)や[こちら](https://monomonotech.jp/kurage/memo/m220202_googleform_html.html)を参考にしてください。

## 画像等のデータについて

容量が大きい画像など Git で管理するのは難しいものは、フォーラムアカウントの Google Drive 内に保存し、リンクを貼ることで参照しています。
リンクは、Google Drive 内のファイルを右クリックし、リンクを取得から取得できます。
リンク生成法は、[こちら](https://qiita.com/TechnoKuRo/items/622c3dcc2ff3f7e09474#IMGタグで読ませる記事はあまたある)を参考にしてください。
