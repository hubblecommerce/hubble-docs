# Konfiguration

## Anpassen der Konfiguration

Zur erfolgreichen Verbindungsherstellung mit API Endpunkten sollten wichtige Werte, wie API Schlüssel, in der __`.env`__
Datei des Projektes als Umgebungsvariablen gespeichert werden.
Damit diese Werte im Applikationskontext zur Verfügung stehen, benutzt hubble das [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)
Modul. Dieses ermöglicht den Zugriff auf die Variablen in der __`.env`__ Datei über die Referenzierung von __`process.env`__.

Da die __`.env`__ sensitive Informationen enthält, sollten diese nicht Teil des Bundles sein, welches an den Client im
Applikationsrahmen übermittelt wird. Damit Secret Keys und Datenbankschlüssel nicht im Client Kontext verfügbar sind, müssen explizit die Werte,
die über __`process.env`__ verfügbar sein sollen auf eine Whitelist gesetzt werden:
Die Werte, die an den Client gesendet werden können, müssen in der  __`nuxt.config.js`__ unter der Option __`only`__ des __`dotenv`__ Moduls als Teil der 
 __`buildModules`__ eingetragen werden.


* __Schritt 1__: Hinzufügen von Keys zur __`.env`__
``` js
// .env
API_TYPE = 'api' // can be 'sw' or 'api'
API_CLIENT_ID = <API_CLIENT_ID>
STORE_ID = <STORE_ID>
// ...
```

* __Schritt 2__: Whitelisting der Client-seitig erlaubten Werte in der __`nuxt.config.js`__
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

Das Starter Projekt enhält eine __`.env_example`__ Datei als Referenz für die Keys und Art von Keys, die benötigt werden oder
werden könnten. 
Der Abschnitt [User Sessions](usersession.md) der Dokumentation enthält ein Beispiel zur Verwendung von Werten aus der __`.env`__.


Außerdem sollte die Datei __`.env`__ in der __`.gitignore`__ eingetragen sein, um das Speichern von sensitiven Informationen in der Versionskontrolle zu verhindern.

``` git
# .gitignore
# dotenv environment variables file
.env
# ...
```

::: warning
Es ist wichtig, dass nur Werte in die Whitelist innerhalb der __`nuxt.config.js`__ eingetragen werden, die keine sensitiven Daten enthalten und damit 
sicher sind zur Versendung an den Client.
:::


### hubble Core Modul

Da hubble Core ein [NuxtJS Modul](https://nuxtjs.org/guide/modules) ist und als Dependency installiert wird, können jegliche Art von
Konfigurationen über die __`nuxt.config.js`__ vorgenommen werden.
Die Default Konfiguration ist bereit zur Benutzungsaufnahme, nachdem die __`.env`__ Datei, den oben beschriebenen Richtlinien entsprechend,
angepasst wurde.


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

