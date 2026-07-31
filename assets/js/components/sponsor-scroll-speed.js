/**
 * Keep sponsor marquee speed constant regardless of logo count/width.
 * duration = single-group-width / pixels-per-second
 */

export default (() => {
  const selector = ".sponsor-track";
  const fallbackSpeed = 90;

  const updateTrackDuration = (track) => {
    const firstGroup = track.querySelector(":scope > .sponsor-group");
    if (!firstGroup) return;

    const speed = Number(track.dataset.scrollSpeed) || fallbackSpeed;
    const distance = firstGroup.getBoundingClientRect().width;

    if (!distance || speed <= 0) return;

    const duration = distance / speed;
    track.style.setProperty("--sponsor-scroll-duration", `${duration}s`);
  };

  const init = () => {
    const tracks = document.querySelectorAll(selector);
    if (!tracks.length) return;

    tracks.forEach((track) => {
      updateTrackDuration(track);

      const images = track.querySelectorAll("img");
      images.forEach((img) => {
        if (img.complete) return;
        img.addEventListener("load", () => updateTrackDuration(track), { once: true });
      });

      if (window.ResizeObserver) {
        const firstGroup = track.querySelector(":scope > .sponsor-group");
        if (firstGroup) {
          const observer = new ResizeObserver(() => updateTrackDuration(track));
          observer.observe(firstGroup);
        }
      }
    });
  };

  window.addEventListener("load", init, false);
})();
