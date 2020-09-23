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
Damit dieses Modul (__`@hubblecommerce`__) updatefähig bleibt, sollten Dateien innerhalb des Moduls also nicht editiert werden.
Da das hubble Modul weitere Nuxt Module als Dependency hat werden diese mit Default Optionen automatisch registriert. 
Die dabei verwendeten Werte können in der __`utils/config.js`__ des Moduls eingesehen werden und lassen sich gemäß dem Standardverfahren von NuxtJS über die __`~/nuxt.config.js`__ 
via den Toplevel Modul Optionen anpassen. Ein Auflisten in der __`modules`__ oder __`buildModules`__ Liste der bereits vom hubble Modul verwendeten Modulen ist nicht notwendig.
Es sollte beachtet werden, dass im Gegensatz zu der Konfiguration der __`env`__ und __`dotenv`__ Werte ein explizites Setzen von beispielsweise dem __`css`__ Array in der __`~/nuxt.config.js`__
zur Folge hat, dass die in diesem Fall Default Stylingdateien nicht mehr registiert werden. Insofern also die Default Dateien weiterhin als Basis dienen sollen, 
müssen diese explizit aufgelistet werden und können der __`utils/config.js`__ des hubble Moduls entnommen werden.

Beispielsweise hat das hubble Modul [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) als Dependency eingebunden, jedoch existieren dafür keine Defaultwerte.
Diese könnten wie folgt gesetzt werden: 
``` js
// nuxt.config.js
// using top-level module options:
axios: {
    // possible options for the axios module: https://axios.nuxtjs.org/options/
}
```

Diesem Muster entsprechend lässt sich auch das hubble Modul über die Toplevel Modul Optionen anpassen:
``` js
// nuxt.config.js
// hubble module default configuration
hubble: {
    apiType: process.env.API_TYPE,
    gtmId: process.env.GOOGLE_TAG_MANAGER_ID,
    payone: {},
    amazonPay: {
        sandbox: true
    }
},
// ...
```

## Entwicklungsprozess

Zusammenfassed lässt sich sagen, dass nach den oben beschriebenen Konfigurationsmöglichkeiten, primär den Konventionen und Regeln von NuxtJS gefolgt werden kann.
Um bereits im hubble Modul existierende Dateien zu überschreiben, muss die jeweilige Ordnerstruktur aus dem Modul eingehalten werden und eine Datei mit demselben Namen 
an der entsprechenden Stelle erstellt werden. Eine Besonderheit gilt es dabei zu beachten: Es existieren zwei verschiedene Ordnerarten im Modul.
Die Ordner __`anonymous-middleware`__, __`middleware`__, __`plugins`__ und __`store`__ enthalten sogenannte API-spezifische Unterordner. Außer diesen API-spezifischen Unterordnern
sollten in diesen Ordnern keine weiteren Unterordner erstellt werden, da diese nicht im finalen Build eingebunden werden.
Alle anderen Ordner können Unterordner enthalten, die nicht API-spezifisch sind und sind Teil des finalen Builds. Insofern Dateien außerhalb der Ordner existieren, werden diese ebenfalls eingebunden.
Beispielsweise kann also der Ordner __`middleware`__ wie links aufgebaut sein und der Inhalt wird vollständig verwendet, wohingegen bei der Ordnerstruktur auf der rechten Seite nur der __`sw`__ Ordner eingebunden werden wird: 

<ImageComponent 
    :src="$withBase('/apiTypeDirs.svg')"
    alt="apiTypeDirs"
    backgroundColor="white">
</ImageComponent>

Da Plugins immer zur Registrierung in der __`~/nuxt.config.js`__  unter dem __`plugins`__ Array eingetragen werden müssen, muss beachtet werden, dass auch in diesem Falle bereits 
Default Plugins existieren, die automatisch durch das hubble Modul registriert werden. Diese Default Plugin Dateien müssen dabei nicht explizit aufgelistet werden in der
__`~/nuxt.config.js`__, wenn die Default Version durch das Anlegen einer Datei mit demselben Namen unter __`~/plugins`__ überschrieben werden soll. Somit müssen
nur neue Plugin Dateien über einen Eintrag in dem __`plugins`__ Array der __`~/nuxt.config.js`__ registriert werden.

Das hubble Modul generiert einen Ordner __`.hubble`__ unter __`~/`__ und wird, solange der durch __`npm run dev`__ gestartete Prozess nicht beendet wird, fortwährend mit Dateien und Ordneränderungen
geupdated. Dies bedeutet, dass dieser Ordner weder editiert noch gelöscht werden sollte. Der Inhalt des __`.hubble`__ Ordners wird bei jeder Ausführung des
__`npm run dev`__ Befehls automatisch geleert. Ein manueller Neustart des Development Servers via dem erneuten Ausführen des Befehls __`npm run dev`__ ist nur notwendig,
um z.B. gemäß den NuxtJS Regeln neue Plugins zu registrieren.

Es sollte immer abgewägt werden, ob eine direkte Anpassung von existierenden Dateien aus dem hubble Modul tatsächlich
notwendig ist oder es angemessener wäre z.B. eine neue Middleware zu erstellen und in der jeweiligen Seite im __`~/pages/`__ Ordner im __`middleware`__ Array aufzulisten.
Außerdem sollte sichergestellt sein, dass alle State Variablen, die von den Seiten und deren Komponenten benötigt werden, auch weiterhin im Vuex Store gesetzt werden.


## Bestehende Basiskonfigurationsfelder

Falls nicht anders vermerkt, wirkt sich das explizite Setzen von Optionen über die __`~/nuxt.config.js`__ überschreibend aus.

| Basiskonfigurationsfelder | |
| --- | --- |
| __`env`__ | wird gemerged mit dem existierenden __module options__ Objekt |
| __`dotenv`__ | wird gemerged mit dem existierenden __module options__ Objekt  |
| __`serverMiddleware`__ |  | 
| __`css`__ |  |  
| __`router.prefetchLinks`__ | defaultmäßig __`false`__ - kann nicht überschrieben werden  | 
| __`build.babel.plugins`__ |  | 
| __`build.babel.presets`__ |  |
| __`build.extractCSS`__ | defaultmäßig __`true`__ - kann nicht überschrieben werden |
| __`build.transpile`__ |  |


## Default Module 

Die Modul Einstellungen lassen sich, wie oben beschrieben über die [Toplevel Optionen](https://nuxtjs.org/guide/modules#top-level-options) in der __`~/nuxt.config.js`__, überschreiben.
| Default Module  | 
| --- |  
| __`@hubblecommerce/payone`__ |  
| __`@hubblecommerce/amazon-pay`__ | 
| __`@nuxtjs/axios`__ |  
| __`nuxt-mq`__ | 
| __`@nuxtjs/recaptcha`__ | 
| __`nuxt-i18n`__ | 
| __`@nuxtjs/pwa`__ | 
| __`localforage-nuxt`__ |
| __`cookie-universal-nuxt`__ |
| __`@nuxtjs/dotenv`__ |
| __`@nuxtjs/google-tag-manager`__ |