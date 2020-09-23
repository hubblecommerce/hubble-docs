# Konfiguration

Um das Projekt erfolgreich zu starten, gibt es eine Pflichtkonfiguration vorzunehmen: Damit eine Verbindung des Shop-Backends mit dem hubble Frontend
möglich ist, gilt es einige Zugangswerte in der __`~/.env`__ zu definieren. Diese werden im Folgenden als Umgebungsvariablen bezeichnet.
Generell lassen sich API Keys im Admin-Bereich des jeweiligen Services ablesen.
Aus Sicherheitsgründen ist es empfehlenswert, die im Folgenden beschriebenen Richtlinien bei der Konfiguration zu beachten.
 
## Konfiguration von Umgebungsvariablen

Damit die Umgebungsvariablen aus der __`~/.env`__ nun also im Applikationskontext zur Verfügung stehen,
benutzt hubble das [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)
Modul. Dieses ermöglicht den Zugriff auf die Variablen in der __`~/.env`__ Datei über die Referenzierung von __`process.env`__.

Da die __`~/.env`__ sensitive Informationen enthält, sollten diese nicht Teil des Bundles sein, welches an den Client im
Applikationsrahmen übermittelt wird. Damit Secret Keys und Datenbankschlüssel nicht im Client Kontext verfügbar sind, müssen explizit die Werte,
die über __`process.env`__ verfügbar sein sollen auf eine Whitelist gesetzt werden:
Die Werte, die an den Client gesendet werden können, müssen in der  __`~/nuxt.config.js`__ unter dem Feld __`only`__ der Toplevel Optionen des __`dotenv`__ Moduls  eingetragen werden. Dabei sollte beachtet werden, dass es bereits defaultmäßig clientseitig zugelassene Umgebungsvariablen gibt, die durch das hubble Modul eingetragen werden (im hubble Modul unter __`utils/config.js`__). 
Diese werden gemerged mit den Einträgen unter __`dotenv`__ in der __`~/nuxt.config.js`__, welches ebenfalls analog für die Einträge unter den Toplevel Optionen für __`env`__ gilt.

* __Schritt 1__: Hinzufügen von Keys zur __`~/.env`__
``` js
// .env
API_TYPE = 'api' // can be 'sw' or 'api'
API_CLIENT_ID = <API_CLIENT_ID>
STORE_ID = <STORE_ID>
// ...
```

* __Schritt 2__: Whitelisting der Client-seitig erlaubten Werte in der __`~/nuxt.config.js`__, insofern nicht bereits durch das hubble Modul konfiguriert
``` js
// nuxt.config.js
dotenv: {
    only: [
        'API_CLIENT_ID',
        'STORE_ID',
        // ...
    ]
}
```

* __Schritt 3__: Zugriff auf die Client-seitig verfügbaren Werte per Referenz auf __`process.env`__ 
``` js
// store/modApi.js
{ storeId: process.env.STORE_ID }
```

::: warning
Es ist wichtig, dass nur Werte in die Whitelist innerhalb der __`~/nuxt.config.js`__ eingetragen werden, die keine sensitiven Daten enthalten und damit 
sicher sind zur Versendung an den Client.
:::


## Konfiguration vom hubble Core Modul

### Überschreiben von Werten in der nuxt.config.js 
Folgende Properties der nuxt.config.js werden von hubble mit Standardwerten versehen:

- env
- serverMiddleware
- css
- router
- build

diese Werte können einfach in der nuxt.config.js überschrieben werden. 
Allerdings werden dabei die von hubble gesetzten Standardwerte komplett überschrieben und müssen ggf. mit übertragen werden. 
Die Standardkonfiguration befindet sich unter: __`hubble/core/utils/config.js`__.

Neue Servermiddleware via nuxt.config.js hinzufügen:

1. Unter __`hubble/core/utils/config.js`__ die Standardwerte für serverMiddleware ausfindig machen:
``` js{3-4}
export const defaultServerMiddleware = function (srcDir) {
    const middlewares = [
        'api/hubble-logger',
        'api/server-side-api-auth-call'
    ];
...
```

2. Standardwerte in **nuxt.config.js** übertragen und mit eigenen Werten ergänzen:
``` js{4}
serverMiddleware: [
    '~/api/hubble-logger',
    '~/api/server-side-api-auth-call'
    '~/api/my-custom-middleware.js'
],
```


### Überschreiben von Modulkonfigurationen
Das hubble Modul bringt eine Reihe von NuxtJs Modulen mit sich und setzt entsprechende Konfigurationen.
Konfigurationen dieser Module lassen sich wie gewohnt über die nuxt.config.js definieren. 
Dabei werden jedoch die von hubble gesetzten Standard-Konfigurationen für dieses Modul überschrieben.
Eine Übersicht über die Standardkonfiguration befindet sich unter: __`hubble/core/utils/config.js`__

1. Unter __`hubble/core/utils/config.js`__ die Standardwerte eines Moduls ausfindig machen:
``` js{5-12}
export const defaultModules = [
    ...
    {
        name: 'nuxt-mq',
        options: {
            breakpoints: {
                sm: 768,
                md: 1024,
                lg: Infinity,
            },
            defaultBreakpoint: 'md', // Default breakpoint for SSR
        }
    },
...
```

2. Standardwerte in **nuxt.config.js** übertragen und mit eigenen Werten ergänzen:
``` js{9-10}
modules: [
    ...
    [
        'nuxt-mq',
        {
            breakpoints: {
                sm: 768,
                md: 1025,
                lg: 1440,
                xlg: Infinity
            },
            defaultBreakpoint: 'md' // Default breakpoint for SSR
        }
    ],
```
