self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("splash-cache").then((cache) => {
      return cache.addAll(["/", "/logo.png", "/index.html", "/manifest.json"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("logo.png")) {
    event.respondWith(
      caches.match("/logo.png").then((response) => {
        return response || fetch("/logo.png");
      })
    );
  }
});

const showSplashScreen = () => {
  const splashScreen = document.createElement("div");
  splashScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff url('/logo.png') no-repeat center center;
    background-size: cover;
    z-index: 9999;
  `;
  document.body.appendChild(splashScreen);

  setTimeout(() => {
    splashScreen.style.opacity = "0";
    splashScreen.style.transition = "opacity 0.5s";
    setTimeout(() => splashScreen.remove(), 500);
  }, 8000);
};

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  showSplashScreen();
});
