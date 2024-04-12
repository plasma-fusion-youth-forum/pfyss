/**
 * Web APIから 参加申込み可能人数 or キャンセル待ち人数 を取得し、「available-capacity」IDを持つテキスト欄に貼り付ける.
 * @param {number} total - 募集人数. この数値を超えるとキャンセル待ちになる.
 * @return {void}
 */

const fetchAndPasteAvailability = (total) => {
  // Web APIのエンドポイント
  let endpoint =
    "https://script.google.com/macros/s/AKfycbyYH4EHD8-pXrlfoyFwQKfeDQruaWL4RlAVdOizyniOEYBcxxYJ5KXW4qgAQDIgra6dbw/exec";

  // 募集人数のクエリパラメータをエンドポイントに追加
  endpoint += "?total=" + total;

  // Web APIからデータを取得
  fetch(endpoint)
    .then((response) => {
      // レスポンスをJSON形式で解析
      return response.json();
    })
    .then((data) => {
      // 表示するテキスト欄の要素を取得
      let textField = document.getElementById("available-capacity");

      // テキスト欄にデータを貼り付ける
      if (data.waitlistCount >= 0) {
        textField.textContent = "キャンセル待ち人数: " + data.waitlistCount + "人";
      } else {
        textField.textContent = "申込み可能人数: " + data.availableCapacity + "人";
      }
    })
    .catch((error) => {
      // エラーハンドリング
      console.log("エラーが発生しました:", error);
    });
};
