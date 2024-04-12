/**
 * Form validation and confirmation modal.
 * フォームのバリデーションが成功したら、確認モーダルを表示する.
 *
 * 確認が必要なフォームには、クラス名「needs-validation-confirmation」を付与する.
 * 確認モーダルには、クラス名「confirmation-modal」を付与する.
 * 確認モーダル中のフォーム要素には、「(元のフォーム要素ID)-modal」を付与する.
 *
 * Copyright 2024 プラズマ・核融合 若手フォーラム
 */

export default (() => {
  const formSelector = "needs-validation-confirmation";
  const confirmModalSelector = "confirmation-modal";

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
              // Fetch confirmation modal
              const confirmModal = document.getElementsByClassName(confirmModalSelector)[0];

              // Copy the values from the form to the confirmation modal
              form.querySelectorAll(".form-control").forEach((elm) => {
                document.getElementById(elm.id + "-modal").value = elm.value;
              });

              // Open the confirmation modal
              let modal = new bootstrap.Modal(confirmModal);
              modal.show();
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
