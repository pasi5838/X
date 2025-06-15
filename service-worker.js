
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("tebak-hewan-cache").then(function(cache) {
      return cache.addAll([
        "index.html",
        "main.js",
        "questions.js",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
