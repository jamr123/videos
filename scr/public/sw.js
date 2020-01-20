
var CACHE_NAME = 'cache-v1';
var urlsToCache = [
  'https://agua.jamrelectronics.com.mx/',
  'https://agua.jamrelectronics.com.mx/vendor/fontawesome-free/css/all.min.css',
  'https://agua.jamrelectronics.com.mx/css/sb-admin-2.css',
  'https://agua.jamrelectronics.com.mx/js/app.js',
  'https://agua.jamrelectronics.com.mx/js/bundle.js',
  'https://agua.jamrelectronics.com.mx/vendor/jquery/jquery.min.js',
  'https://agua.jamrelectronics.com.mx/vendor/bootstrap/js/bootstrap.bundle.min.js',
  'https://agua.jamrelectronics.com.mx/vendor/jquery-easing/jquery.easing.min.js',
  'https://agua.jamrelectronics.com.mx/js/sb-admin-2.min.js',
  'https://agua.jamrelectronics.com.mx/socket.io/socket.io.js',
  'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i',
  'https://i.ibb.co/G3vVtHX/logo.png',
  'https://agua.jamrelectronics.com.mx/vendor/fontawesome-free/webfonts/fa-solid-900.woff2'
];

self.addEventListener('install', function(event) {
 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );

});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  var version = 'v1';
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .map(c => c.split('-'))
            .filter(c => c[0] === 'cache')
            .filter(c => c[1] !== version)
            .map(c => caches.delete(c.join('-')))
        )
      )
  );
});




self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon
  });
});