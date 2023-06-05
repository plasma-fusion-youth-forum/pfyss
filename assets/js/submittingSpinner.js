// submit buttonが押されたら、spinnerを表示する

function submittingSpinner(buttonID) {
  // ボタン要素を取得
  const button = document.getElementById(buttonID);
  // spinnerを表示
  button.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>送信中...';
  // ボタンをdisabledにする
  button.disabled = true;

  // true を返すとフォームが正常に送信されるtrue を返すとフォームが正常に送信される
  return true;
}
