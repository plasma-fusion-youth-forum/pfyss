---
title: お申し込み
date: 2024-03-16T12:34:30+09:00
description: プラズマ・核融合 若手夏の学校への参加を希望される方は、諸注意事項をご確認の上、お申し込みください。
draft: false
layout: application

# 募集人数
capacity: 40

# 参加申込みフォームの設定
form:
  enable: true # 申込締め切り後は false に変更する
  expired_message: 参加申込みを締め切りました。たくさんのご応募ありがとうございました。
  action: https://docs.google.com/forms/u/2/d/e/1FAIpQLSdFDedriiViCc1kuFJbdd638mbiy7DM8PbKNmsgUbNiIhR66Q/formResponse
  entries:
    - id: name
      name: entry.419423110
      kind: input
      type: text
      label: 名前（漢字）
      required: true
      placeholder: 夏学 太郎
      invalid_message: 漢字フルネームを入力してください

    - id: name-kana
      name: entry.419423110
      kind: input
      label: 名前（ふりがな）
      type: text
      required: true
      placeholder: なつがく たろう
      invalid_message: 名前のふりがなを入力してください

    - id: gender
      name: entry.1890782012
      kind: select
      label: 性別
      required: true
      options:
        - 男性
        - 女性
        - その他
      invalid_message: 性別を選択してください

    - id: email
      name: entry.714326778
      kind: input
      label: メールアドレス
      type: email
      required: true
      placeholder: example@pfyss.org
      invalid_message: 有効なメールアドレスを入力してください

    - id: affiliation
      name: entry.1660680588
      kind: input
      label: 所属
      type: text
      required: true
      placeholder: ○○大学○○研究室
      invalid_message: 所属を入力してください

    - id: grade
      name: entry.397468645
      kind: select
      label: 学年
      required: true
      options:
        - 学部4年
        - 修士1年
        - 修士2年
        - 博士1年
        - 博士2年
        - 博士3年
        - 博士研究員
        - その他
      invalid_message: 学年を選択してください

    - id: major
      name: entry.129570103
      kind: select
      label: 専門
      required: true
      options:
        - プラズマ基礎（放電物理、天文、プラズマ計測、原子分子過程、プラズマ源、イオン源など）
        - プラズマ応用（産業応用、表面処理、エッチング、ナノテクノロジー、環境・エネルギーなど）
        - 核融合プラズマ（平衡・安定性、閉じ込め、乱流、輸送、加熱、計測・診断、定常運転・制御など）
        - 核融合炉工学（炉設計、ダイバータ、核融合燃料システム、保守安全性、社会的受容性、経済性など）
      form-text: 専門が決まっていない方は興味のある分野を選択してください。
      invalid_message: 専門分野を選択してください

    - id: travel-allowance
      name: entry.104847365
      kind: select
      label: 旅費補助
      options:
        - 不要
        - 必要
      default: 不要
      required: false

    - id: allowance-reason
      name: entry.536200406
      kind: textarea
      label: 必要事由
      type: text
      required: false
      style: "height: 10rem"
      invalid_message: 旅費補助が必要な理由を入力してください
---

# 参加の際の留意事項<i class="bx bx-fw bx-md bxs-error"></i>

### 参加費の支払い方法<i class="bx bx-fw bx-md bxs-wallet"></i>

<dl>
  <dt>銀行振り込み <i class="bx bxs-bank"></i></dt>
  <dd>申込み後、参加費の振込先をお知らせするメールが届きます。振込手数料はご負担ください。</dd>
  <dt>PayPal支払い<i class="bx bxl-paypal"></i></dt>
  <dd>申込み後、希望される方にはPayPalの請求書をお送りします。PayPalのアカウントをお持ちでない方でも、クレジットカードでの支払いが可能です。</dd>
</dl>

### キャンセルポリシー<i class="bx bx-fw bx-md bxs-user-x"></i>

- キャンセルの場合は、**申込み締切までに**[お問い合わせフォーム]({{< ref "/contact" >}})よりご連絡ください。
- 申込み締切後のキャンセルの場合、**参加費の返却はいたしません**。予めご了承ください。<br>

{{< alert "info" >}}
天候や災害などの事態により夏学が中止になった場合、参加費は全額返金いたします。
{{< /alert >}}

### 災害時の対応・開催中止判断<i class="bx bx-fw bx-md bxs-calendar-x"></i>

- 開催場所に災害が発生した場合、参加者の安全を最優先に、開催中止とする場合があります。
- **開催日前日の夜12時に**開催場所で警報が発令、及び自然災害が発生した場合、開催中止とします。
- 開催中止の場合、**上記時刻から概ね1時間以内**に、ホームページ、メール、SNS(Discord、Twitter、Line等)にて連絡いたします。

### 旅費の補助について<i class="bx bx-fw bx-md bxs-train"></i>

旅費の補助については、**原則として研究室、大学等の支援を受けていただく**こととなります。
どうしても支援が受けられない場合のみ、限られた予算内で旅費の一部を援助いたしますので、申込みフォームにて旅費補助「**必要**」を選択してください。

### ポスターについて<i class="bx bx-fw bx-md bxs-user-detail"></i>

ポスターサイズ: **A0サイズ以内**<br>
1人1枚とは限らず、複数名で1つのポスターを制作して頂いても良いです。
テーマは研究室の研究内容や自身の研究内容等、自由形式です。<br>
A0ポスターとして、{{< link-download name="PowerPointのテンプレート" src="https://drive.google.com/uc?export=download&id=1snER2uDq1vXbW3EqtvkQ2R0IPWgKFiCj" >}}を用意しています。また、{{< link-download name="夏学のロゴ" src="https://drive.google.com/uc?export=download&id=1A-urydv6NHkl7Rnr5t8I4AO_hP9yrGXC" >}}も用意しておりますので、ご自由にお使いください。

### その他<i class="bx bx-fw bx-md bxs-info-circle"></i>

- 申込みをされた方は事前に{{< link-external name="<i class='bx bxl-discord-alt'></i>Discordサーバー" link="https://discord.gg/BTaVFm7F3k" >}}に**必ず**参加してください。
- 夏学の様子を映像・写真撮影させていただきます。撮影した映像や写真は、今後のイベント開催時、ホームページ、SNS、イベントの告知等に使用させていただきます。
