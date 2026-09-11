var CACHE_NAME = "so-ban-hang-v3";
var ASSETS = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png", "/icon-512-maskable.png"];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return Promise.all(
        ASSETS.map(function(url){
          return cache.add(url).catch(function(){
            // one asset failing (e.g. offline right now) must not block the rest
          });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k!==CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

var FALLBACK_HTML = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Sổ Bán Hàng</title></head><body style='font-family:sans-serif;padding:24px;text-align:center;'><h2>Chưa tải được trang</h2><p>Vui lòng kiểm tra kết nối mạng rồi mở lại app.</p></body></html>";
