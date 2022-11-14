importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js')

workbox.routing.registerRoute(
    ({request}) => request.desination === 'image',

    new workbox.strategies.NetworkFirst()

);