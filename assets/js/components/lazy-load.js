/**
 *
 * Lazy loading images and iframes with data-src attribute
 * @module lazy-load
 *
 * Copyright 2024 プラズマ・核融合 若手フォーラム
 */

export default (() => {
  const imageSelector = "img[data-src]";
  const iframeSelector = "iframe[data-src]";

  window.addEventListener(
    "load",
    () => {
      const images = document.querySelectorAll(imageSelector);
      images.forEach((image) => {
        image.src = image.dataset.src;
        image.removeAttribute("data-src");
      });

      const iframes = document.querySelectorAll(iframeSelector);
      iframes.forEach((iframe) => {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute("data-src");
      });
    },
    false
  );
})();
