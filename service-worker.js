const CACHE_NAME = 'pwa-app-v1.1';
const urlsToCache = [
  '/',
  '/navigation.html',
  '/index.html',
  '/pages/home.html',
  '/pages/about.html',
  '/pages/illustrations.html',
  '/pages/inspirations.html',
  '/pages/photos.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/js/navigation.js',

  '/images/Collection-pana.svg',
  '/images/Designer girl-rafiki.svg',
  '/images/Designer life-pana.svg',
  '/images/icons8-design-48.png',
  '/images/Live collaboration-pana.svg',
  '/images/Photos-bro.svg',

  '/icon.png',

  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',

  '/manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          // console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }

        // console.log(
        //   'ServiceWorker: Memuat aset dari server: ',
        //   event.request.url
        // );
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            // console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
