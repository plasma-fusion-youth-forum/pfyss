/**
 * submit buttonが押されたら、spinnerを表示する
 * @param {string} buttonID - type="submit"のボタンID
 * @return {boolean} - true を返す。これがないとフォームが送信されない
 * @example
 * <form
    action=""
    method="POST"
    target="hidden_iframe"
    onsubmit="submittingSpinner('submitButton'); submitted=true;"
  >
  ...
    <button type="submit" id="submitButton">送信</button>
  </form>
*/
function submittingSpinner(buttonID) {
  // ボタン要素を取得
  const button = document.getElementById(buttonID);
  // spinnerを表示
  button.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>送信中...';
  // ボタンをdisabledにする
  button.disabled = true;

  // true を返すとフォームが正常に送信される
  return true;
}
