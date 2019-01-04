const cacheName = 'v1';
const cacheFiles = [
    './',
    './css/style.css',
    './js/initGame.js',
    './lib/d3-dispatch.v1.min.js',
    './lib/d3-drag.v1.min.js',
    './lib/d3-selection.v1.min.js',
]

// Install event
self.addEventListener('install', function(event) {
    console.log("SW installed");
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache){
            console.log('SW caching cachefiles');
            return cache.addAll(cacheFiles);
        })
    )
});

// Activate event
self.addEventListener('activate', function(event) {
    console.log("SW activated");
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName){
                if(thisCacheName !== cacheName){
                    console.log('SW Removing cached files from', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});

// Push event
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
});

// Fetch event
self.addEventListener('fetch', function(event) {
    console.log("SW fetching", event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            console.log('Fetching new files');
            return response || fetch(event.request);
        })
    );
});