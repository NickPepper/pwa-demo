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
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log(`[ServiceWorker] Caching app shell`);
            return cache.addAll(filesToCache);
        })
    );
});
