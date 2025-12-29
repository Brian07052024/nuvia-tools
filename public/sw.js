const CACHE_NAME = 'nuvia-tools-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/img/logo.png',
  '/img/logo-512.png'
];

// Instalación del service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activación del service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia de caché: Network First, falling back to cache
self.addEventListener('fetch', event => {
  // Ignorar solicitudes que no sean HTTP/HTTPS
  try {
    const url = new URL(event.request.url);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return;
    }
  } catch (e) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, clona y guarda en caché
        if (response && response.status === 200) {
          // Solo cachear recursos del mismo origen
          if (response.type === 'basic' || response.type === 'cors') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache).catch(err => {
                // Silenciar errores de caché
              });
            });
          }
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intenta obtener de caché
        return caches.match(event.request).then(response => {
          if (response) {
            return response;
          }
          // Si no está en caché y es una navegación, retorna la página principal
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
