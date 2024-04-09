/**
 * Submit spinner animation.
 * When the button is clicked, the spinner and the text "送信中..." are displayed on the button.
 *
 * Copyright 2024 プラズマ・核融合 若手フォーラム
 */

export default (() => {
  const selector = "submit-spinner";

  window.addEventListener(
    "load",
    () => {
      // Fetch all the buttons we want to apply custom spinner styles to
      const buttons = document.getElementsByClassName(selector);
      // Loop over them and prevent submission
      /* eslint-disable no-unused-vars */
      const spinner = Array.prototype.filter.call(buttons, (button) => {
        button.addEventListener(
          "click",
          () => {
            button.innerHTML =
              '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>送信中...';
            button.disabled = true;
          },
          false
        );
      });
      /* eslint-enable no-unused-vars */
    },
    false
  );
})();
