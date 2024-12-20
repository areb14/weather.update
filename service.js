const CACHE_NAME = 'weather-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/manifest.json',
    '/service.js',
    'https://cdn-icons-png.flaticon.com/512/8691/8691186.png',
    'https://cdn-icons-png.flaticon.com/512/3222/3222800.png',
    'https://png.pngtree.com/png-vector/20191118/ourmid/pngtree-rain-icon-creative-design-template-png-image_1998625.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_84KQXmp500bsQiAZJteVNyzLSVAL4wQrHg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBo-A8TUle17EJMoZRCO0j_6l7SpscruN6w&s',
    'https://thumbs.dreamstime.com/b/sun-cloud-rain-icon-modern-weather-flat-vector-symbols-140138628.jpg', // weather icon
];

self.addEventListener('install', (event) => {
    // Install event: Cache the necessary files
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Activate event: Remove old caches if any
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Fetch event: Serve files from cache if available
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            // If not in cache, fetch from the network
            return fetch(event.request);
        })
    );
});
