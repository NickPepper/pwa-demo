(function() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { 
                console.log(`Service Worker Registered`); 
            });
    } else {
        console.error(`This browser doesn't support the serviceWorker`);
    }
})()
