let cacheName = 'PWADemo-v1';
let filesToCache = [
    './index.html',
    './css/app.css',
    './css/materialize.min.css',
    './js/app.js',
    './js/jquery-3.2.1.min.js',
    './js/materialize.min.js',
    './fonts/roboto/Roboto-Bold.woff',
    './fonts/roboto/Roboto-Bold.woff2',
    './fonts/roboto/Roboto-Light.woff',
    './fonts/roboto/Roboto-Light.woff2',
    './fonts/roboto/Roboto-Medium.woff',
    './fonts/roboto/Roboto-Medium.woff2',
    './fonts/roboto/Roboto-Regular.woff',
    './fonts/roboto/Roboto-Regular.woff2',
    './fonts/roboto/Roboto-Thin.woff',
    './fonts/roboto/Roboto-Thin.woff2'
];


self.addEventListener('install', function(e) {
    console.log(`[ServiceWorker] Install`);
    // lets cache our assets as early as possible
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log(`[ServiceWorker] Caching app shell`);
            return cache.addAll(filesToCache);
        }).catch(function(err) {
            console.error(err);
        })
    );
});


self.addEventListener('activate', function(e) {
    console.log(`[ServiceWorker] Activate`);
    // check for all the cache names that don't match the current cache in use and delete them
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log(`[ServiceWorker] Removing old cache`, key);
                    return caches.delete(key);
                }
            }));
        }).catch(function(err) {
            console.error(err);
        })
    );
});


self.addEventListener('fetch', function(e) {
    console.log(`[ServiceWorker] Fetch `, e.request.url);
    // If the asset is already cached, then we respond the browser with the cached version.
    // If that's not the case, we use the fetch API to make an actual HTTP request for the asset.
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        }).catch(function(err) {
            console.error(err);
        })
    );
});
