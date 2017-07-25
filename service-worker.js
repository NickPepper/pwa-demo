const DEBUG = true;

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


/*
 * Cache on Install Pattern.
 * 
 * We cache as early as possible all the items(assets) needed for an app shell to be displayed.
 * Ideal for: CSS, images, fonts, JS, templates… basically anything you'd consider static.
 */
self.addEventListener('install', function(e) {
    DEBUG && console.log(`[ServiceWorker] Install`);
    e.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            DEBUG && console.log(`[ServiceWorker] Caching app shell`);
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
        caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if(key !== cacheName) {
                    DEBUG && console.log(`[ServiceWorker] Removing old cache`, key);
                    return caches.delete(key);
                }
            }));
        }).catch(function(err) {
            console.error(err);
        })
    );
});


/*
 * Cache, Falling Back To network Pattern.
 * 
 * This strategy is more like "it's either it's cached, or it isn't."
 * If the asset is already cached, then we respond the browser with the cached version.
 * If that's not the case, we use the fetch API to make an actual HTTP request for the asset.
 */
self.addEventListener('fetch', function(e) {
    DEBUG && console.log(`[ServiceWorker] Fetch `, e.request.url);
    e.respondWith(
        caches.match(e.request)
        .then(function(response) {
            return response || fetch(e.request);
        }).catch(function(err) {
            console.error(err);
        })
    );
});


/*
 * Cashe on Network Response Pattern.
 * 
 * This strategy checks if a network request has been previously cached and updates the page with the cache.
 * If the cache is not available, it goes straight to the network to fetch the item.
 * When the network request returns successfully, it updates the page and caches the item returned.
 * 
 * This strategy is mostly applied to frequently updating contents like feeds.
 */
/*
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.open(cacheName)
        .then(function(cache) {
            return cache.match(e.request)
            .then(function(response) {
                return response || fetch(e.request)
                .then(function(response) {
                    cache.put(e.request, response.clone());
                    return response;
                }).catch(function(err) {
                    console.error(err);
                });
            }).catch(function(err) {
                console.error(err);
            });
        }).catch(function(err) {
            console.error(err);
        })
    );
});
*/


/*
 * Cache, Then network Pattern.
 * This request fires both a request to the cache and another to the network.
 * If an item exists in the cache, that's fine, serve it to the page.
 * When the network request comes back overwrite the page's content with what you got from the network.
 * 
 * In rare cases, the cache will come back before the network.
 * Meaning that if the network returns with data, the cache data will be replaced with the network data.
 * That's why you need a flag like 'networkReturned' in the code to keep things in check.
 */
/*
const networkReturned = false;
if('caches' in window) {
    caches.match(app.apiURL)
    .then(function(response) {
        if(response) {
            response.json()
            .then(function(trends) {
                DEBUG && console.log(`From cache...`)
                if(!networkReturned) {
                    app.updateTrends(trends);
                }
            });
        }
    });
}

fetch(app.apiURL)
.then(response => response.json())
.then(function(trends) {
    DEBUG && console.log(`From server...`)
    networkReturned = true;
    app.updateTrends(trends.items)
}).catch(function(err) {
  // Error
});
*/
