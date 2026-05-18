export const registerServiceWorker = () => {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // O app continua funcionando mesmo sem cache offline.
    });
  });
};
