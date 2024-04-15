/**
 * Toast
 * @requires https://getbootstrap.com
 */

import { Toast } from "bootstrap";

export default (() => {
  const toastElList = [].slice.call(document.querySelectorAll('.toast'))

  /* eslint-disable no-unused-vars, no-undef */
  const toastList = toastElList.map((toastEl) => new Toast(toastEl))
  /* eslint-enable no-unused-vars, no-undef */
})()
