(function() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { 
                console.log(`Service Worker Registered`); 
            }).catch(function(err) {
                console.error(err);
            });
    } else {
        console.error(`This browser doesn't support the serviceWorker`);
    }
})()
