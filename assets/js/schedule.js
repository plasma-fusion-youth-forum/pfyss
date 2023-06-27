// Scheduleに関する処理を記述する
// ======================================================
/**
 * Web APIのベースURL.
 * @type {String}
 */
const BASE_URL =
  "https://script.google.com/macros/s/AKfycby7vMNpktGgif6E691IuXeRct9EcQPwIKwCP3xyK9sXs439G6UXo4u7EfbiY2Zx6nX5Tg/exec";

/**
 * 月の配列.
 * @type {String[]}
 */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * 時間割のタグ列挙型
 * @enum {String}
 */
const SCHEDULE_TAG = {
  lecture: "5", // Yellow
  special: "3", // Mauve
  excursion: "10", // Green
  poster: "9", // Blue
};
// -------------------------------------------------------------------------------------------------
/**
 * Web APIから日毎の全イベントを取得し、様々な処理を行う.
 * @param {Number} year - 年.
 */
function FetchAllEvents(year) {
  // Web APIのURLを生成
  // 年をクエリパラメータに追加
  let endpoint = BASE_URL + "?year=" + year;

  // Web APIからJSONを取得
  fetch(endpoint)
    .then((response) => {
      // レスポンスをJSON形式で解析
      return response.json();
    })
    .then((days) => {
      // dateプロパティをDateオブジェクトに変換
      days.forEach((day) => {
        day.date = new Date(day.date);
        // eventsプロパティリスト内の連想配列にあるstartTimeとendTimeプロパティをDateオブジェクトに変換
        day.events.forEach((event) => {
          event.startTime = new Date(event.startTime);
          event.endTime = new Date(event.endTime);
        });
      });
      return days;
    })
    .then((days) => {
      // ---------------------------------------- //
      // 全イベントリストデータを用いた処理はここに記述  //
      // ---------------------------------------- //
      createTabs(days); // 日時タブを作成
      createSchedule(days); // スケジュールを作成
      assignTeachers(); // 講師情報をスケジュールに割り当てる
      // ---------------------------------------- //
    })
    .catch(function (error) {
      // エラーハンドリング
      console.log("エラーが発生しました:", error);
    });
}
// -------------------------------------------------------------------------------------------------

/**
 * 全イベントリストデータをもとに日時タブを作成する.
 * @param {{date: Date, events: {startTime: Date, endTime: Date, title: String, description: String, color: String}[]}[]} days - 日毎のイベントリスト.
 */
function createTabs(days) {
  // 日時タブの親要素を取得
  let tabs = document.getElementById("date-tabs");

  // 日数分の日時タブリンクを作成
  let innerHTML = "";
  for (let i = 0; i < days.length; i++) {
    // 日時タブリンク用の日付を取得
    const date = days[i].date;

    // 日時タブリンク用のHTMLを生成
    innerHTML += `<a href="#day-${i + 1}" class="nav-link d-block w-100 rounded-3 p-4 p-xl-5 me-2 `;
    if (i == 0) {
      // 最初の日時タブの場合は、activeクラスを追加
      innerHTML += 'me-sm-3 me-lg-0 mb-3 mb-sm-0 mb-lg-3 active" ';
    } else if (i == days.length - 1) {
      // 最後の日時タブの場合は、me-sm-0クラスを追加
      innerHTML += 'me-sm-0" ';
    } else {
      innerHTML += 'me-sm-3 me-lg-0 mb-3 mb-sm-0 mb-lg-3" ';
    }

    innerHTML +=
      `id="day-${i + 1}-tab" data-bs-toggle="tab" role="tab" aria-controls="day-${i + 1} aria-selected="${i == 0}" ` +
      'onclick="AOS.refresh();">' +
      `<div class="fs-xl">Day ${i + 1}</div>` +
      '<div class="fs-3 fw-bold">' +
      `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}` +
      "</div>" +
      "</a>";
  }
  tabs.innerHTML = innerHTML;
}

/**
 * 全イベントリストデータをもとにスケジュールを作成する.
 * @param {{date: Date, events: {startTime: Date, endTime: Date, title: String, description: String, color: String}[]}[]} days - 日毎のイベントリスト.
 */
function createSchedule(days) {
  // スケジュールの親要素を取得
  let content = document.getElementById("date-content");

  // 各イベントのid名を決めるためのインデックス
  let lectureIndex = 1;
  let specialIndex = 1;
  let excursionIndex = 1;
  let posterIndex = 1;
  let eventID = ""; // 各イベントのid名 (e.g. lecture1, special2, excursion3, poster4, other)

  // 挿入するHTML用変数
  let innerHTML = "";

  // 日毎にスケジュールを作成
  for (let i = 0; i < days.length; i++) {
    // 日付を取得
    const date = days[i].date;

    // タブパネルの開始タグを追加
    innerHTML += `<!-- Day ${i + 1} schedule -->`;
    innerHTML +=
      `<div class="tab-pane fade${i == 0 ? " show active" : ""}" ` +
      `id="day-${i + 1}" role="tabpanel" aria-labelledby="day-${i + 1}-tab">`;

    // 1日のイベントごとの処理
    for (let j = 0; j < days[i].events.length; j++) {
      // イベントを取得
      const event = days[i].events[j];

      // イベントの時間帯のhtmlを生成
      const timeslotHTML =
        event.startTime.getHours() +
        ":" +
        event.startTime.getMinutes().toString().padStart(2, "0") +
        " &ndash; " +
        event.endTime.getHours() +
        ":" +
        event.endTime.getMinutes().toString().padStart(2, "0");

      // イベント日付のhtmlを生成
      let dateHTML = `${MONTHS[date.getMonth()]} ${date.getDate()}`;
      if (dateHTML.endsWith("1")) {
        dateHTML += "st";
      } else if (dateHTML.endsWith("2")) {
        dateHTML += "nd";
      } else if (dateHTML.endsWith("3")) {
        dateHTML += "rd";
      } else {
        dateHTML += "th";
      }

      // 行開始タグ
      innerHTML +=
        `<div class="${j != days[i].events.length - 1 ? "border-bottom" : ""} py-4">` +
        '<div class="row py-1 py-xl-3">';

      // 1列目開始タグ
      // イベント属性ごとに処理を分岐
      if (Object.values(SCHEDULE_TAG).includes(event.color)) {
        innerHTML +=
          '<div class="col-sm-4 mb-3 mb-sm-0">' +
          `<div class="h5 mb-1">${timeslotHTML}</div>` +
          `<p class="text-muted mb-2 mb-sm-4">${dateHTML}</p>`;

        if (event.color == SCHEDULE_TAG.lecture) {
          innerHTML += '<span class="badge bg-warning shadow-warning fs-sm">Lecture</span>';
          eventID = "lecture" + lectureIndex;
          lectureIndex++;
        } else if (event.color == SCHEDULE_TAG.special) {
          innerHTML += '<span class="badge bg-primary shadow-primary fs-sm">Special Lecture</span>';
          eventID = "special" + specialIndex;
          specialIndex++;
        } else if (event.color == SCHEDULE_TAG.excursion) {
          innerHTML += '<span class="badge bg-success shadow-success fs-sm">Excursion</span>';
          eventID = "excursion" + excursionIndex;
          excursionIndex++;
        } else if (event.color == SCHEDULE_TAG.poster) {
          innerHTML += '<span class="badge bg-info shadow-info fs-sm">Poster</span>';
          eventID = "poster" + posterIndex;
          posterIndex++;
        }
        innerHTML += "</div>"; // 1列目終了タグ
      } else {
        innerHTML +=
          '<div class="col-sm-4 mb-0 mb-sm-0">' + // 1列目開始タグ
          `<div class="h5 mb-1">${timeslotHTML}</div>` +
          `<p class="text-muted mb-0">${dateHTML}</p>` +
          "</div>"; // 1列目終了タグ
        eventID = "other";
      }

      // 2列目内容
      innerHTML +=
        `<div id="${eventID}" class="col-sm-8">` +
        `<h5>${event.title}</h5>` +
        `<p class="mb-4">${event.description}</p>` +
        "</div>";

      // 行終了タグを追加
      innerHTML += "</div></div>";
    }

    // タブパネルの終了タグを追加
    innerHTML += "</div>";
    innerHTML += `<!-- End of Day ${i + 1} schedule -->`;
  }

  content.innerHTML = innerHTML;
}
