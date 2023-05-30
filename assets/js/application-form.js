// This file contains the JavaScript code for the application form
// =================================================================================================
//
// フォームに入力された値をチェックし、有効な場合は確認モーダルを表示する関数
function validateForm() {
  // get the form
  let form = document.getElementById("application-form");

  // Check if the form is valid
  if (form.checkValidity()) {
    // Copy the values from the form to the confirmation modal
    form.querySelectorAll(".form-control").forEach(function (elm) {
      document.getElementById(elm.id + "-modal").value = elm.value;
    });

    // Open the confirmation modal
    let confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    confirmationModal.show();
  } else {
    // If form is invalid, display the validation messages
    form.classList.add("was-validated");
  }
}

// =================================================================================================
// 旅費補助理由の欄を表示する関数
function showReason() {
  // 旅費補助のselectタグを取得
  const travel = document.getElementById("travel");

  // 旅費補助理由のトップdivタグを取得
  let reason = document.getElementById("reason");

  // 旅費補助理由のテキストエリアを取得
  let reasonText = document.getElementById("travel-reason");

  // 旅費補助理由のモーダル欄を取得
  let reasonModal = document.getElementById("travel-reason-modal-top");

  // 旅費補助の選択欄が「必要」の場合
  if (travel.value == "必要") {
    // 旅費補助理由の欄を表示
    reason.classList.remove("d-none");

    // 旅費補助理由の欄を必須にする
    reasonText.setAttribute("required", "");

    // 旅費補助理由のモーダル欄を表示
    reasonModal.classList.remove("d-none");

    // 旅費補助の選択欄が「不要」の場合
  } else {
    // 旅費補助理由の欄を非表示
    reason.classList.add("d-none");

    // 旅費補助理由の欄を必須にしない
    reasonText.removeAttribute("required");

    // 旅費補助理由の欄を空にする
    reasonText.value = "";

    // 旅費補助理由のモーダル欄を非表示
    reasonModal.classList.add("d-none");
  }
}

// =================================================================================================
// Web APIからデータを取得する関数
function fetchDataFromAPI(textField) {
  // Web APIのエンドポイント
  const apiEndpoint =
    "https://script.google.com/macros/s/AKfycbyYH4EHD8-pXrlfoyFwQKfeDQruaWL4RlAVdOizyniOEYBcxxYJ5KXW4qgAQDIgra6dbw/exec";

  // Web APIからデータを取得
  fetch(apiEndpoint)
    .then(function (response) {
      // レスポンスをJSON形式で解析
      return response.json();
    })
    .then(function (data) {
      // テキスト欄にデータを貼り付ける
      if (data["waitlistCount"] > 0) {
        textField.textContent = "キャンセル待ち人数: " + data["waitlistCount"] + "人";
      }
      textField.textContent = "申込み可能人数: " + data["AvailableCapacity"] + "人";
    })
    .catch(function (error) {
      // エラーハンドリング
      console.log("エラーが発生しました:", error);
    });
}

// ページが読み込まれたときに実行する処理
window.addEventListener("load", function () {
  // テキスト欄の要素を取得
  let textField = document.getElementById("available-capacity");

  // Web APIからデータを取得
  fetchDataFromAPI(textField);
});
