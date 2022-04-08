importScripts("precache-manifest.88ff7cf53a2c14dc2a7a14bc45403d00.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("message", (e)=>{
    if (e.data.action == 'skipWaiting') self.skipWaiting()
})

//Web Push Notifications//
let click_open_url
self.addEventListener('push', function(event) {
  let data = event.data.json()
  let { title, icon, body } = data
  console.log(title, icon, body, data, "EVENT")
  // push notification can send event.data.json() as well
  click_open_url = 'https://www.swerve.fi/ren/native'
  const options = {
    title: title,
    icon: icon,
    body: body,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  const clickedNotification = event.notification;
  clickedNotification.close();
  if ( click_open_url ){
    const promiseChain = clients.openWindow(click_open_url);
    event.waitUntil(promiseChain);
  }
});

