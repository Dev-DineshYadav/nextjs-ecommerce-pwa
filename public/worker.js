const CACHE_NAME = 'e-commerce-cache-v1';

const CACHE_FIRST_RESOURCES = [
  '/manifest.json',
  '/icons/',
  '/_next/static/',
];

const NETWORK_FIRST_RESOURCES = [
  'https://dummyjson.com/products',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      self.skipWaiting(),
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
          '/offline.html',
          '/manifest.json',
        ]);
      }),
    ])
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      }),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache first strategy for static resources
  if (CACHE_FIRST_RESOURCES.some(path => url.pathname.startsWith(path))) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          if (!response || response.status !== 200) return response;
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      })
    );
    return;
  }

  // Network first strategy for API requests
  if (NETWORK_FIRST_RESOURCES.some(path => url.pathname.startsWith(path) || url.href.includes(path))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) return response;
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Default network first strategy
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request).then((response) => {
          if (!response) {
            return caches.match('/offline.html');
          }
          return response;
        });
      })
  );
});
