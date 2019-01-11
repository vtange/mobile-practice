const cacheName = 'v1';
const cacheFiles = [
    './',
    '/css/style.css',
    '/js/initGame.js',
    '/lib/d3-dispatch.v1.min.js',
    '/lib/d3-drag.v1.min.js',
    '/lib/d3-selection.v1.min.js',
]

// Install event
self.addEventListener('install', function(event) {
    console.log("SW:INSTALL");
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache){
            console.log('SW caching:', cacheFiles, cacheName);
            return cache.addAll(cacheFiles).then(function(response){
                //got file from fetch operation
                console.log(response);
            }).catch(function(err){
                //error fetching file
                throw err;
            });;
        })
    )
});

// Activate event
self.addEventListener('activate', function(event) {
    console.log("SW:ACTIVATE");
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName){
                if(thisCacheName !== cacheName){
                    console.log('SW Removing obsolete cached files from', thisCacheName);
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
    console.log("SW:FETCH", event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            console.log(response ? 'Got Files from cache' : 'Fetching new files', response ? response : "");
            return response || fetch(event.request).then(function(response){
                //got file from fetch operation
                console.log(response);
            }).catch(function(err){
                //error fetching file
                throw err;
            });
        })
    );
});