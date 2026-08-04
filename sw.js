var CACHE_NAME = "so-ban-hang-v1";
var ASSETS = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png", "/icon-512-maskable.png"];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){ return cache.addAll(ASSETS); })
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

self.addEventListener("fetch", function(event){
  event.respondWith(
    caches.match(event.request).then(function(cached){
      if(cached) return cached;
      return fetch(event.request).then(function(res){
        return res;
      }).catch(function(){
        return caches.match("/index.html");
      });
    })
  );
});
