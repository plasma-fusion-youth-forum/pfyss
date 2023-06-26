// Scheduleに関する処理を記述する
// ======================================================
// Web APIベースとなるエンドポイント
const BASE_URL =
  "https://script.google.com/macros/s/AKfycby7vMNpktGgif6E691IuXeRct9EcQPwIKwCP3xyK9sXs439G6UXo4u7EfbiY2Zx6nX5Tg/exec";
// 月名の配列
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
// 時間割のタグ列挙型
const SCHEDULE_TAG = {
  lecture: 5, // Yellow
  special: 3, // Mauve
  excursion: 10, // Green
  poster: 9, // Blue
};
// ------------------------------------------------------
/**
 * Web APIから全イベントを取得し、様々な処理を行う.
 * @param {Number} year - 年.
 */
function FetchAllEvents(year) {
  // 全イベントを取得するためのクエリパラメータを追加
  let endpoint = BASE_URL + "?info=events";
  // 年をクエリパラメータに追加
  endpoint += "&year=" + year;

  // Web APIからJSONを取得
  fetch(endpoint)
    .then((response) => {
      // レスポンスをJSON形式で解析
      return response.json();
    })
    .then((events) => {
      // 日時プロパティをDateオブジェクトに変換
      events.forEach((event) => {
        event.startTime = new Date(event.startTime);
        event.endTime = new Date(event.endTime);
      });
      return events;
    })
    .then((events) => {
      // 全イベントリストデータを用いた処理を記述
      const days = countDays(events); // 日数を取得
      createTabs(events, days); // 日時タブを作成
      createSchedule(events, days); // スケジュールを作成
    })
    .catch(function (error) {
      // エラーハンドリング
      console.log("エラーが発生しました:", error);
    });
}

/**
 * 全イベントリストデータをもとに日数をカウントする.
 * @param {Array} events - 全イベントリストデータ.
 * @return {Number} 日数.
 */
function countDays(events) {
  // 日数を取得
  let date = events[0].startTime;
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // 一時的に日付を格納する変数
  let days = 1; // 日数
  for (let i = 0; i < events.length; i++) {
    if (events[i].startTime.getDate() != date.getDate()) {
      days++;
      date.setDate(date.getDate() + 1);
    }
  }
  return days;
}

/**
 * 全イベントリストデータをもとに日時タブを作成する.
 * @param {Array} events - 全イベントリストデータ.
 * @param {Number} days - 日数.
 */
function createTabs(events, days) {
  // 初日を取得
  const firstDay = events[0].startTime;

  // 日時タブの親要素を取得
  let tabs = document.getElementById("date-tabs");

  // 日数分の日時タブリンクを作成
  let innerHTML = "";
  for (let i = 0; i < days; i++) {
    // 日時を取得
    const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + i);

    // 日時タブリンク用のHTMLを生成
    innerHTML += '<a href="#day-' + (i + 1) + '" class="nav-link d-block w-100 rounded-3 p-4 p-xl-5 me-2 ';
    if (i == 0) {
      // 最初の日時タブの場合は、activeクラスを追加
      innerHTML += 'me-sm-3 me-lg-0 mb-3 mb-sm-0 mb-lg-3 active" ';
    } else if (i == days - 1) {
      // 最後の日時タブの場合は、me-sm-0クラスを追加
      innerHTML += 'me-sm-0" ';
    } else {
      innerHTML += 'me-sm-3 me-lg-0 mb-3 mb-sm-0 mb-lg-3" ';
    }

    innerHTML += 'id="day-' + (i + 1) + '-tab" data-bs-toggle="tab" role="tab" aria-controls="day-' + (i + 1);
    if (i == 0) {
      innerHTML += ' aria-selected="true" ';
    } else {
      innerHTML += ' aria-selected="false" ';
    }
    innerHTML +=
      'onclick="AOS.refresh();">' +
      '<div class="fs-xl">Day ' +
      (i + 1) +
      "</div>" +
      '<div class="fs-3 fw-bold">' +
      MONTHS[date.getMonth()].slice(0, 3) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear() +
      "</div >" +
      "</a>";
  }
  tabs.innerHTML = innerHTML;
}

/**
 * 全イベントリストデータをもとにスケジュールを作成する.
 * @param {Array} events - 全イベントリストデータ.
 * @param {Number} days - 日数.
 */
function createSchedule(events, days) {
  // スケジュールの親要素を取得
  let content = document.getElementById("date-content");

  // 挿入するHTML用変数
  let innerHTML = "";

  const firstDay = events[0].startTime;

  for (let day = 0; day < days; day++) {
    innerHTML += "<!-- Day " + (day + 1) + " schedule -->";

    if (day == 0) {
      innerHTML +=
        '<div class="tab-pane fade show active" id="day-' +
        (day + 1) +
        '" role="tabpanel" aria-labelledby="day-' +
        (day + 1) +
        '-tab">';
    } else {
      innerHTML +=
        '<div class="tab-pane fade" id="day-' +
        (day + 1) +
        '" role="tabpanel" aria-labelledby="day-' +
        (day + 1) +
        '-tab">';
    }

    // 日毎のイベントを生成
    innerHTML += "<!-- End of Day " + (day + 1) + " schedule -->";
  }

  content.innerHTML = innerHTML;
}
