// Importing required modules from Workbox
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route all assets based on the provided manifest
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name for the cache storage
  plugins: [
      // Plugin to cache responses with HTTP status codes 0 and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
      // Plugin to expire cached responses after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days in seconds
    }),
  ],
});

// Warm the cache with specific URLs using the pageCache strategy
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to pre-cache
  strategy: pageCache,
});

// Register a route for navigation requests using the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache); // Condition for navigation requests

// Register a route for caching assets (stylesheets, scripts, workers)
registerRoute(
    // Condition to cache requests with destination 'style', 'script', or 'worker'
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({ // Name for the cache storage
    cacheName: 'asset-cache',
    plugins: [
      // Plugin to cache responses with HTTP status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);