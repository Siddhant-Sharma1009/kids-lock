export default function blockNavigation() {
  // Lock browser back
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };

  // Block tab close / reload
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "";
  });

  // Fullscreen lock (best effort)
  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  document.addEventListener("click", enterFullscreen, { once: true });
}
