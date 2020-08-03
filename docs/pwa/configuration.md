# Konfiguration

Um das Projekt erfolgreich zu starten, gibt es eine Pflichtkonfiguration vorzunehmen: Damit eine Verbindung des Shop-Backends mit dem hubble Frontend
möglich ist, gilt es einige Zugangswerte in der __`~/.env`__ zu definieren. Diese werden im Folgenden als Umgebungsvariablen bezeichnet.
Als Vorlage für Arten von Werten, die in diese Datei eingetragen werden können oder sollten, existiert die __`~/.env_example`__. 
Beispielsweise gilt diese Herangehensweise auch für Keys von verwendeten Payment Optionen.
Generell lassen sich API Keys im Admin-Bereich des jeweiligen Services ablesen.
Aus Sicherheitsgründen ist es empfehlenswert, die im Folgenden beschriebenen Richtlinien bei der Konfiguration zu beachten.
 
## Konfiguration von Umgebungsvariablen

Damit die Umgebungsvariablen aus der __`~/.env`__ nun also im Applikationskontext zur Verfügung stehen,
benutzt hubble das [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)
Modul. Dieses ermöglicht den Zugriff auf die Variablen in der __`~/.env`__ Datei über die Referenzierung von __`process.env`__.

Da die __`~/.env`__ sensitive Informationen enthält, sollten diese nicht Teil des Bundles sein, welches an den Client im
Applikationsrahmen übermittelt wird. Damit Secret Keys und Datenbankschlüssel nicht im Client Kontext verfügbar sind, müssen explizit die Werte,
die über __`process.env`__ verfügbar sein sollen auf eine Whitelist gesetzt werden:
Die Werte, die an den Client gesendet werden können, müssen in der  __`~/nuxt.config.js`__ unter der Option __`only`__ des __`dotenv`__ Moduls als Teil der 
 __`buildModules`__ eingetragen werden.

* __Schritt 1__: Hinzufügen von Keys zur __`~/.env`__
``` js
// .env
API_TYPE = 'api' // can be 'sw' or 'api'
API_CLIENT_ID = <API_CLIENT_ID>
STORE_ID = <STORE_ID>
// ...
```

* __Schritt 2__: Whitelisting der Client-seitig erlaubten Werte in der __`~/nuxt.config.js`__
``` js
// nuxt.config.js
buildModules: [
    ['@nuxtjs/dotenv', {
        only: [
            'API_CLIENT_ID',
            'STORE_ID',
             // ...
        ]
    }]
]
```

* __Schritt 3__: Zugriff auf die Client-seitig verfügbaren Werte per Referenz auf __`process.env`__ 
``` js
// ~/modules/@hubblecommerce/hubble/core/store/modApi.js
{ storeId: process.env.STORE_ID }
```

Das Starter Projekt enhält eine __`~/.env_example`__ Datei als Referenz für die Keys und Art von Keys, die benötigt werden oder
werden könnten. 

``` git
# .gitignore
# dotenv environment variables file
.env
# ...
```

::: warning
Es ist wichtig, dass nur Werte in die Whitelist innerhalb der __`~/nuxt.config.js`__ eingetragen werden, die keine sensitiven Daten enthalten und damit 
sicher sind zur Versendung an den Client.
:::


## Konfiguration vom hubble Core Modul

Beim hubble Core handelt es sich um ein [NuxtJS Modul](https://nuxtjs.org/guide/modules), welches als Dependency installiert wird.
Damit dieses Modul (__`~/modules/@hubblecommerce`__) updatefähig bleibt, sollten Dateien innerhalb des Moduls also nicht editiert werden.
Um trotzdem z.B. bestehende Middlleware oder Plugins zu editieren oder sogar von der Verwendung vollständig auszuschließen, kann eine 
Konfiguration über die  __`~/nuxt.config.js`__ vorgenommen werden. hubble bietet folgende Modul Einstellungen an:

``` js
// nuxt.config.js

// hubble module default configuration
hubble: {
    apiType: process.env.API_TYPE,
    deactivateStores: [],
    deactivatePlugins: [],
    deactivateMiddleware: [],
    useTheme: false,
    gtmId: process.env.GOOGLE_TAG_MANAGER_ID,
    payone: {},
    amazonPay: {
        sandbox: true
    }
},
// ...
```

Somit kann, wenn z.B. die Middleware für die Startseite, die __`apiIndexRoute`__, verändert werden soll, diese
in den Moduleinstellungen aufgelistet werden: 

``` js
// nuxt.config.js

// hubble module example configuration to override existing middleware
hubble: {
    // ...
    deactivateMiddleware: ['apiIndexRoute.js'],
    // ...
}
```

Es sollte immer abgewägt werden, ob eine direkte Anpassung von existierenden Dateien aus dem __`@hubblecommerce`__ tatsächlich
notwendig ist oder es angemessener wäre eine neue Middleware zu erstellen und in der jeweiligen Seite unter __`~/pages/`__ aufzulisten.
Außerdem sollte sichergestellt sein, dass alle State Variablen, die von den Seiten und deren Komponenten benötigt werden,
auch weiterhin im Vuex Store gesetzt werden.