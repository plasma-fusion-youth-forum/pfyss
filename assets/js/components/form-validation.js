/**
 * Form validation
 *
 * Modified by: プラズマ・核融合 若手フォーラム at 2024
 */

import spinner from "./.spinner-button.js";

export default (() => {
  const selector = "needs-validation";

  window.addEventListener(
    "load",
    () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName(selector);
      // Loop over them and prevent submission
      /* eslint-disable no-unused-vars */
      const validation = Array.prototype.filter.call(forms, (form) => {
        form.addEventListener(
          "submit",
          (e) => {
            if (form.checkValidity() === false) {
              e.preventDefault();
              e.stopPropagation();
            } else {
              // show spinner and change button text to "送信中..." at the submit button
              // copyright 2024 プラズマ・核融合 若手フォーラム
              spinner(form);
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
      /* eslint-enable no-unused-vars */
    },
    false
  );
})();
