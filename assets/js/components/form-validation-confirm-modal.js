/**
 * Form validation and confirmation modal.
 * フォームのバリデーションが成功したら、確認モーダルを表示する.
 *
 * 確認が必要なフォームには、クラス名「needs-validation-confirmation」を付与する.
 * 確認モーダルには、ID: "confirmation-modal"を付与する.
 * 確認モーダル中のフォーム要素には、「(元のフォーム要素ID)-modal」を付与する.
 *
 * Copyright 2024 プラズマ・核融合 若手フォーラム
 *
 * @requires https://getbootstrap.com
 */

import { Modal } from "bootstrap";

export default (() => {
  const formSelector = "needs-validation-confirmation";
  const confirmModalId = "confirmation-modal";

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
            // Prevent submission
            e.preventDefault();
            e.stopPropagation();

            // If the form is valid, open the confirmation modal
            if (form.checkValidity()) {
              // Fetch confirmation modal
              const confirmModal = document.getElementById(confirmModalId);

              // Copy the values from the form to the confirmation modal
              form.querySelectorAll(".form-control").forEach((elm) => {
                document.getElementById(elm.id + "-modal").value = elm.value;
              });

              // Open the confirmation modal
              const modal = new Modal(confirmModal);
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
