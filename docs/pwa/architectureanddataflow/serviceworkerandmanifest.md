# Service Worker und Manifest

## Service Worker

Service Worker sind Javascript basierte Proxies zwischen Browser und Server. Sie bieten unter anderem die Möglichkeit an, 
auch im Offline Modus Inhalte anzuzeigen und Funktionalität anzubieten.
Diese anzuzeigenden Inhalte und bereitzustellende Funktionalitäten gilt es jedoch, bei einem Seitenbesuch im Online Modus
zu cachen und im Cache bereitzuhalten. 

Um die Service Worker Funktionalität, die sich in der __`~/static/sw.js`__ befindet zu registrieren, ist der Registrierungsaufruf
via Plugin implementiert. Das Plugin befindet sich, gemäß der von NuxtJS zur automatischen Erfassung 
vorgegebenen Ordnerstruktur, im __`/plugins`__ Ordner des __`hubblecommerce`__ Moduls:
__`~/modules/hubblecommerce/hubble/core/plugins/register-sw_no_ssr.js`__.
Die Registrierung des Service Workers führt serverseitig zu Fehlern und wird deshalb nur clientseitig ausgeführt. 
Mehr über die Möglichkeiten und Besonderheiten beim serverseitigen Rendering zu erfahren unter 
[Server Side Rendering](https://nuxtjs.org/guides/concepts/server-side-rendering#server-side-rendering-steps-with-nuxtjs).

Steht die [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) in dem jeweiligen Browser zur Verfügung, 
kommt es zur Registrierung:

``` js
// ~/modules/hubblecommerce/hubble/core/plugins/register-sw_no_ssr.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        // ...
    }
}
```

## sw.js
In der __`~/static/sw.js`__ existieren die folgenden Event Listener und Callbacks:

__`install`__

Bei Aufruf des Callbacks werden dabei die zwei Dateien __`/offline.html`__
und __`/launch-icon.svg`__ im Cache gespeichert.

``` js
// ~/static/sw.js (simplified)
// ...
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheVersion)
            .then((cache) => cache.addAll([
                  '/offline.html',
                  '/launch-icon.svg'
            ]))
    )
});
// ...
```

__`fetch`__

Führt den Request aus oder liefert bei fehlender Netzwerkverbindung die gecachte Seite __`/offline.html`__ zurück

``` js
// ~/static/sw.js (simplified)
// ...
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match('/offline.html'))
    );
});
// ...
```

__`activate`__

iteriert über alle Cache Einträge und löscht den Cache Eintrag, der dem im __`install`__ Callback gesetzten Versionswert entspricht (__`let cacheVersion = 'v1';`__)

``` js
// ~/static/sw.js (simplified)
// ...
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then(function(cacheNames) {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName != cacheVersion)
                        .map((cacheName) => caches.delete(cacheName))
                );
        })
    );
});
```

Für die Funktionsweise von Service Workern und einer detaillierten Beschreibung oben verwendeter Events kann
die [Service Workers: an Introduction] Dokumentation von Google und der
[Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
Abschnitt der [MDN web docs](https://developer.mozilla.org/en-US/) referenziert werden.


## Nuxt PWA Modul

Das [Nuxt PWA](https://pwa.nuxtjs.org/) Modul ist in hubble eingebunden, um PWA Funktionalitäten mit geringstmöglichen
Aufwand zu ermöglichen. Beispielsweise werden durch das [Icon Modul](https://pwa.nuxtjs.org/icon) App Icons und Favicon in verschiedenen Größen
automatisch erstellt.

Das Modul kann in der __`~nuxt.config.js`__ konfiguriert werden. 
[Workbox](https://pwa.nuxtjs.org/workbox) und [Manifest](https://pwa.nuxtjs.org/manifest) sind in hubble im Default Zustand deaktiviert.

``` js
// ~/nuxt.config.js
modules: [
    ['@nuxtjs/pwa', { workbox: false, oneSignal: false }],
]
```

Das Workbox Modul bietet eine einfache Konfigurationsmöglichkeit für den Offline-Support:

``` js
// ~/nuxt.config.js
workbox: {
        // Workbox options
        offlinePage: '/offline.html',
        cacheNames: {
            prefix: 'hubble',
            suffix: 'v1',
            precache: 'precache',
            runtime: 'runtime'
        },
        offlineStrategy: 'networkFirst',
        runtimeCaching: [
            {
                urlPattern: 'http:localhost:3340/Unsere-AGB/.*',
                handler: 'staleWhileRevalidate',
                method: 'GET'
            },
            {
                urlPattern: 'http:localhost:3340/Unsere-AGB/.*',
                handler: 'staleWhileRevalidate',
                method: 'GET'
            },
            {
                urlPattern: 'http:localhost:3340/Impressum/.*',
                handler: 'staleWhileRevalidate',
                method: 'GET'
            }
        ]
    },
```

## Manifest 

Die sogenannte __Web App Manifest__ Datei beinhaltet Informationen zu anzuzeigenden Informationen und Werten:
Dazu gehören beispielsweise der Name der "App" oder die Theme Farbe. 

Das [Nuxt PWA](https://pwa.nuxtjs.org/) Modul wird via  __`~/nuxt.config.js`__ konfiguriert. 
Konfigurationen können im Abschnitt [Manifest Module](https://pwa.nuxtjs.org/manifest) des Moduls nachgelesen werden. 
Die vollständige Liste über die möglichen Werte unter: 
[Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest) 
[MDN web docs](https://developer.mozilla.org/de/)

``` js
// ~/nuxt.config.js
manifest: {
    name: 'hubble Demo',
    lang: 'de',
    short_name: 'hubble Demo',
    start_url: '/',
    background_color: '#F8F8F8',
    display: 'standalone',
    scope: '/',
    theme_color: '#880E4F',
    gcm_sender_id: '482941778795',
    gcm_sender_id_comment: 'Do not change the GCM Sender ID'
},
```
