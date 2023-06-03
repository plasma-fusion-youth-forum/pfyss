// このファイルでは、teachers.jsonを読み込んで、様々な動的処理を行っています。

// 先生のセクションを生成する関数
function generateTeacherSection() {
  // link用アイコンのオブジェクト
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

      // 先生の数だけfor分で回す
      for (let i = 0; i < json.length; i++) {
        // 先生を1人取り出す
        const teacher = json[i];

        // 前半html
        html +=
          '<div class="col">' +
          '<div class="card card-hover border-0 bg-transparent" data-aos="fade-up" data-aos-delay=' +
          i * 100 +
          ">" +
          '<div class="position-relative">' +
          '<img src="' +
          teacher.image +
          '" class="teacher-card-img rounded-3" alt="' +
          teacher.name +
          '">' +
          '<div class="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3">' +
          '<span class="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-35 rounded-3"></span>' +
          '<div class="position-relative d-flex zindex-2">';

        // linksの数だけfor分で回す
        for (let j = 0; j < teacher.links.length; j++) {
          // 先生のリンクを1つ取り出す
          let link = teacher.links[j];

          // link領域のhtmlを追加
          html += '<a href="' + link.url + '" class="btn btn-icon btn-secondary btn-sm bg-white btn-' + link.type;

          // 最後のリンクでない場合は、marginを追加
          if (j < teacher.links.length - 1) {
            html += ' me-2">';
          } else {
            html += '">';
          }
          html += linkIcons[link.type] + "</a>";
        }

        html += "</div>" + "</div>" + "</div>";

        // 後半html (名前、役職、所属)
        html +=
          '<div class="card-body text-center p-3">' +
          '<h3 class="fs-lg fw-semibold pt-1 mb-2">' +
          teacher.name +
          "</h3 >" +
          '<p class="fs-sm mb-0">' +
          teacher.position +
          ", " +
          teacher.affiliation +
          "</p>" +
          "</div>" +
          "</div>" +
          "</div>";
      }

      // Teachers セクションの row にHTMLを挿入
      document.getElementById("teachers-row").innerHTML = html;
    }
  };
}

// 講義の時間割の内容を生成する関数
function generateLectureSchedule() {
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

      // 先生の数だけfor分で回す
      for (let i = 0; i < json.length; i++) {
        // 生成したHTMLを入れておく変数
        let html = "";

        // 先生を1人取り出す
        const teacher = json[i];

        // 対応する講義のブロック要素を取り出す
        let lectureBlock = document.getElementById("lecture" + teacher.id);

        if (lectureBlock == null) {
          continue;
        }

        // html生成
        html +=
          "<h5>" +
          teacher.title +
          "</h5>" +
          '<p class="mb-4">' +
          teacher.abstract +
          "</p>" +
          '<div class="d-flex align-items-center">' +
          '<img src="' +
          teacher.image +
          '" class="rounded-circle me-3" width="48" alt="' +
          teacher.name +
          '"/>' +
          '<div class="ps-3">' +
          '<h6 class="fw-semibold mb-1">' +
          teacher.name +
          "</h6>" +
          '<p class="fs-sm text-muted mb-0">' +
          teacher.position +
          ", " +
          teacher.affiliation +
          "</div>" +
          "</div>";

        // 講義のブロック要素にHTMLを挿入
        lectureBlock.innerHTML = html;
      }
    }
  };
}

// DOMが読み込まれたときに実行する処理
// loadがトリガーだと画像が読み込まれるのが遅れるため、
// DOMContentLoadedをトリガーにしている
window.addEventListener("DOMContentLoaded", function () {
  // 先生のセクションを生成
  generateTeacherSection();

  // 講義の時間割の内容を生成
  generateLectureSchedule();
});
