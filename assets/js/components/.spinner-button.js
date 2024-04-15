/**
 * ボタンにスピナーを追加する
 * form要素内の送信ボタンを無効化し、スピナーを表示する関数を提供する
 *
 * @param {HTMLFormElement} form フォーム要素
 * @param {string} text ボタン内のテキスト
 * @return {void}
 *
 *
 * Copyright 2024 プラズマ・核融合 若手フォーラム
 */

export default ((form, text = "送信中...") => {
  const button = form.querySelector("button[type='submit']");
  button.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">${text}</span>`;
  button.disabled = true;
})();
