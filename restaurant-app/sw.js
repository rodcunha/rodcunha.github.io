const staticCache = 'mws-restaurant-v9.2'; // version 8.1
const cacheFiles = [
          './',
          './css/styles.css',
          './data/restaurants.json',
          './js/main.js',
          './img/1.jpg',
          './img/2.jpg',
          './img/3.jpg',
          './img/4.jpg',
          './img/5.jpg',
          './img/6.jpg',
          './img/7.jpg',
          './img/8.jpg',
          './img/9.jpg',
          './img/10.jpg',
          './js/dbhelper.js',
          './js/restaurant_info.js',
          './restaurant.html',
          './index.html',
          './img/'
        ];  // cache all relevant files for offline first experience.

// open the cache and cache the resources
self.addEventListener('install', evt => {
  console.log('[ServiceWorker] Installed.');
  evt.waitUntil(
    caches.open(staticCache)
      .then( cache => {
        console.log('[ServiceWorker] Cache open: ', staticCache);
        return cache.addAll(cacheFiles);
      })
      .catch( err => {
        console.log('[ServiceWorker] Error opening cache: ', err);
      })
  )
})

//remove old caches starting with mws-restaurant
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys()
      .then( cacheNames => {
         return Promise.all(
            cacheNames.filter( cacheName => {
              return cacheName.startsWith('mws-restaurant') && cacheName != staticCache;
            }).map( cacheName => {
              return cache.delete(cacheName);
            })
          );
    }).catch( err => {
      console.log('[ServiceWorker] Error during Activation: ', err);
    })
  )
})

self.addEventListener('fetch', evt => {
  console.log('[ServiceWorker] Service Worker Listening...');

  evt.respondWith(
    caches.match(evt.request)
      .then(response => {
        if (response) { return response;}
        return fetch(evt.request);
      })
  );
});
