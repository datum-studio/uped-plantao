// Service Worker — UPED Sistema de Plantão
const CACHE = 'uped-v1';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Sempre busca da rede primeiro (dados Firebase sempre atuais)
  // Cai no cache só se offline
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
