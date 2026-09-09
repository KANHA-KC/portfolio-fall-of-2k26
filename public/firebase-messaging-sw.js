// Clean up stale localhost service workers
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      console.log('Stale localhost service worker unregistered successfully.');
    })
  );
});
