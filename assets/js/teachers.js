// このファイルでは、teachers.jsonを読み込んで、様々な動的処理を行っています。

/**
 * 先生のセクションを生成する関数. `teachers.json`を読み込んで、先生のセクションを生成します。
 */
function generateTeacherSection() {
  /**
   * link用アイコンのオブジェクト
   * @type {Object.<string, string>} - key: linkの種類, value: link用アイコンのHTML (e.g. `<i class="bx bxl-twitter"></i>`)
   */
  const linkIcons = {
    twitter: '<i class="bx bxl-twitter"></i>',
    facebook: '<i class="bx bxl-facebook"></i>',
    instagram: '<i class="bx bxl-instagram"></i>',
    linkedin: '<i class="bx bxl-linkedin"></i>',
    youtube: '<i class="bx bxl-youtube"></i>',
    github: '<i class="bx bxl-github"></i>',
    general: '<i class="bx bx-world"></i>',
    personal: '<i class="bx bxs-user"></i>',
  };

  // XMLHttpRequestインスタンスを作成
  let request = new XMLHttpRequest();

  // JSONファイルが置いてあるパスを記述
  request.open("GET", "teachers.json");
  request.send();

  // JSON読み込み時の処理
  request.onreadystatechange = () => {
    // 全てのデータを受信・正常に処理された場合
    if (request.readyState == 4 && request.status == 200) {
      // JSONデータを変換
      const json = JSON.parse(request.responseText);

      // 生成したHTMLを入れておく変数
      let html = "";

      // Teacher index
      let teacherIndex = 0;

      // 割当時間(id)の数だけfor分で回す
      for (let i = 0; i < json.length; i++) {
        // 割当時間帯に話す先生たちの数だけfor分で回す
        for (let j = 0; j < json[i].teachers.length; j++) {
          // 先生を1人取り出す
          const teacher = json[i].teachers[j];

          // 先生のカードを追加
          html +=
            '<div class="col">' + // col開始
            `<div id="teacher${teacherIndex}"` + // 先生カード div開始
            `class="card card-hover border-0 bg-transparent" ` +
            `data-aos="fade-up" data-aos-delay=${teacherIndex * 100}` +
            `${teacherIndex > 0 ? ' data-aos-anchor="#teacher0">' : ">"}` + // teacher 2人目以降の先生は、1人目の先生をアンカーにする
            '<div class="position-relative">' + // 先生の画像を囲むdiv
            `<img src="${teacher.image}" class="teacher-card-img rounded-3" alt="${teacher.name}">` + // 先生の画像 imgタグ
            '<div class="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3">' + // オーバーレイdiv (先生の画像の上に重なる)
            '<span class="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-35 rounded-3"></span>' +
            '<div class="position-relative d-flex zindex-2">'; // 先生のリンクボタンを囲むdiv

          // linksの数だけfor分で回す
          for (let k = 0; k < teacher.links.length; k++) {
            const link = teacher.links[k];

            // リンクボタンを追加
            html +=
              `<a href="${link.url}" target="_blank" rel="noopener noreferrer" ` +
              `class="btn btn-icon btn-secondary btn-sm bg-white btn-${link.type}` +
              `${k < teacher.links.length - 1 ? " me-2" : ""}">` + // 最終リンク以外は、margin-rightを追加
              `${linkIcons[link.type]}</a>`;
          }

          html += "</div></div></div>"; // 先生のリンクボタンを囲むdiv, オーバーレイdiv, 先生の画像を囲むdivを閉じる

          // カードの本体を追加
          html +=
            '<div class="card-body text-center p-3">' +
            `<h3 class="fs-lg fw-semibold pt-1 mb-2">${teacher.name}</h3>` + // 先生の名前
            `<p class="fs-sm mb-0">${teacher.position != "" ? `${teacher.position}, ` : ""}${teacher.affiliation}</p>` + // 先生の役職と所属
            "</div>";

          html += "</div></div>"; // 先生カード div終了, col終了

          // teacher indexを1つ増やす
          teacherIndex++;
        }

        // Teachers セクションの row にHTMLを挿入
        document.getElementById("teachers-row").innerHTML = html;
      }
    }
  };
}

/**
 * 講義の時間割の内容を生成する関数. `teachers.json`を読み込んで、対応する時間帯に講義情報を挿入します。
 * @returns {Promise} - 講義情報の挿入が完了したかどうかを表すPromiseオブジェクト.
 */
async function assignTeachers() {
  console.log("start assignTeachers()");
  // XMLHttpRequestインスタンスを作成
  let request = new XMLHttpRequest();

  // JSONファイルが置いてあるパスを記述
  request.open("GET", "teachers.json");
  request.send();

  // JSON読み込み時の処理
  request.onreadystatechange = () => {
    // 全てのデータを受信・正常に処理された場合
    if (request.readyState == 4 && request.status == 200) {
      // JSONデータを変換
      const json = JSON.parse(request.responseText);

      // 割当時間(id)の数だけfor分で回す
      for (let i = 0; i < json.length; i++) {
        // 対応するtime slotのブロック要素を取り出す
        let timeslot = document.getElementById(json[i].id);

        // 該当するidがない場合は、次のループへ
        if (timeslot == null) {
          console.error("id: " + json[i].id + " is not found.");
          continue;
        }
        // 生成したHTMLを入れておく変数
        let html = "";

        // 割当時間帯のタイトルと概要を追加
        if (json[i].title == null || json[i].abstract == null) {
          // タイトルまたは概要が未定義な場合は、次のループへ
          console.info("id: " + json[i].id + " has neither title nor abstract.");
          continue;
        } else if (json[i].title == "") {
          // タイトルの文字列が存在しない場合
          const title = timeslot.getElementsByTagName("h5")[0].textContent;
          if (json[i].abstract != "") {
            // 概要の文字列が存在する場合
            html += `<h5>${title}</h5><p class="mb-4">${json[i].abstract}</p>`;
          } else {
            // 概要の文字列が存在しない場合
            html += `<h5>${title}</h5>`;
          }
        } else {
          // タイトルの文字列が存在する場合
          if (json[i].abstract != "") {
            // 概要の文字列が存在する場合
            html += `<h5>${json[i].title}</h5><p class="mb-4">${json[i].abstract}</p>`;
          } else {
            // 概要の文字列が存在しない場合
            html += `<h5>${json[i].title}</h5>`;
          }
        }

        // 先生たちの情報を追加するrowを開始
        html += '<div class="row row-cols-1 row-cols-md-2 g-1">';

        // 割当時間帯に話す先生たちの数だけfor分で回す
        for (let j = 0; j < json[i].teachers.length; j++) {
          // 先生を1人取り出す
          const teacher = json[i].teachers[j];

          // 先生たちの情報を追加
          html +=
            '<div class="col">' + // col開始
            '<div class="d-flex align-items-center">' + // 先生の画像と名前を囲むdiv
            `<img src="${teacher.image}" class="rounded-circle me-3" width="48" alt="${teacher.name}"/>` + // 先生の画像 imgタグ
            '<div class="ps-3">' + // 先生の名前と役職を囲むdiv
            `<h6 class="fw-semibold mb-1">${teacher.name}</h6>` +
            '<p class="fs-sm text-muted mb-0">' +
            `${teacher.position != "" ? `${teacher.position}, ` : ""}${teacher.affiliation}` + // 先生の役職と所属
            "</p>" +
            "</div></div></div>"; // 先生の名前と役職を囲むdiv, 先生の画像と名前を囲むdiv, col終了
        }

        html += "</div>"; //　先生たちの情報を追加するrowを閉じる

        // 講義のブロック要素にHTMLを挿入
        timeslot.innerHTML = html;
      }
    }
  };
  console.log("finish assignTeachers()");
}
