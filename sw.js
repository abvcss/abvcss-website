importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {

    workbox.precaching.precacheAndRoute([
        { url: './index.html', revision: '124' },
    ]);

    // handle js files
    workbox.routing.registerRoute(
        /.*\.js/,
        workbox.strategies.networkFirst({
            cacheName: 'js-cache',
        })
    );

    // handle css files
    workbox.routing.registerRoute(        
        /.*\.css/,
        workbox.strategies.networkFirst({
            cacheName: 'css-cache',
        })
    );
    
    // handle img files
    workbox.routing.registerRoute(        
        /.*\.(?:png|jpg|jpeg|svg|gif|ico)/,
        workbox.strategies.cacheFirst({
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images
                    maxEntries: 20,
                    // Cache for a maximum of a week
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );

    // handle font files
    workbox.routing.registerRoute(        
        /.*\.(?:eot|ttf|woff|woff2)/,
        workbox.strategies.cacheFirst({
            cacheName: 'font-cache',
        })
    );

} else {

  console.log(`Workbox didn't load`);
  
}

