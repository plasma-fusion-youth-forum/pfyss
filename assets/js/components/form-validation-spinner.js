/**
 * Form validation then show spinner on submit.
 *
 * Copyright 2024 プラズマ・核融合 若手フォーラム
 */

export default (() => {
  const formSelector = "needs-validation-spinner";

  // Show spinner on submit
  const showSpinner = (button) => {
    button.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>送信中...';
    button.disabled = true;
  };

  window.addEventListener(
    "load",
    () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName(formSelector);
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
              // Fetch submit button to show spinner
              const button = form.querySelector("button[type='submit']");
              // Show spinner
              showSpinner(button);
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
