---
pageClass: theguide
---

# Hubble Data API

## Auth Token und [hubble API](../../api) als Proxy

Die hubble Data API wurde mit [Laravel](https://laravel.com/) erstellt und stellt der hubble PWA
verschiedene Endpunkte bereit. Die eigentlichen Daten, beispielsweise 
Produkt Detail Informationen, haben ihren Ursprung dabei im Shopsystem.
Somit dient die hubble Data API als Proxy zwischen API und PWA.
Für eine erfolgreiche und sichere Kommunikation mit diesen Endpoints wird dabei 
die [OAuth2](https://oauth2.thephpleague.com/terminology/) Methode verwendet: 

Damit ein Request an die API erfolgreich ist, wird ein Auth Token im Request Objekt benötigt. 
Um ein gültiges Token von der API zu erhalten, müssen dafür __Client ID__ und __Client Secret__, sogenannte Client Credentials,
verwendet werden. Diese zwei Werte sollten in der __`.env`__ 
Datei des Projektes eingetragen sein. Mehr zur korrekten Konfiguration und Verwendung von Werten aus der __`.env`__ Datei 
unter dem Abschnitt [Konfiguration](../configuration.md).

Der erhaltene Token, wird als __Bearer Authentication Token__ bezeichnet und ist im Response Objekt im Feld __`access_token`__ enthalten.
Die Implementation zum Erhalt eines Bearer Authentication Tokens und dessen Speicherung im Vuex Store State ist Teil
der Middleware __`apiAuthenticate`__. Diese ist in den meisten Routen als Middleware aufgelistet und wird somit immer vor
dem Rendering der jeweiligen Route ausgeführt. Dadurch können eingebundene Komponenten in subsequenten Requests den Token
verwenden.

Es müssen folgende Felder in der __`.env`__ Datei ausgefüllt sein, um ein Bearer Authentication Token zu erhalten:
+ Base URL
+ Endpoint
+ Client ID
+ Client Secret

Der Bearer Authentication Token ist kennzeichnendes Merkmal der Session gegenüber der API.
Dieser Token ist Teil des Headers jeder API Kommunikation und dient zur Validierung der Zugriffsrechte.


::: tip
Die hubble API agiert als Proxy zwischen der hubble PWA und dem Shop Backend. 
:::
 
### Verwendung der hubble API und des Auth Token

Dafür müssen folgende Schritte durchgeführt werden:
* __Schritt 1__: Setzen des __`API_TYPE`__ 's in der __`~/.env`__:
``` text
# ~/.env
API_TYPE = 'api' 
```

* __Schritt 2__: Eintrag der Credentials in die __`~/.env`__

``` txt
# .env
API_BASE_URL = '<API_BASE_URL>'
API_CLIENT_ID = '<CLIENT_ID>'
API_CLIENT_SECRET = '<CLIENT_SECRET>'
API_ENDPOINT_AUTH = 'oauth/token'
```

::: warning
Client-seitig erlaubte Keys müssen in der __`~/nuxt.config.js`__ auf die Whitelist gesetzt werden,
damit diese zur Verfügung stehen. Zur korrekten Einrichtung sollte der Abschnitt [Konfiguration](configuration.md) referenziert werden.
:::


* __Schritt 3__ : Zur Verwendung der Felder wird __`process.env`__ referenziert
``` js
// ~/modules/@hubblecommerce/hubble/core/store/modApi.js
// ...
baseUrl: process.env.API_BASE_URL,
endpoint: process.env.API_ENDPOINT_AUTH,
clientId: process.env.API_CLIENT_ID,
clientSecret: process.env.API_CLIENT_SECRET
// ...
```

Dies bedeutet, dass der Bearer Authentication Token kennzeichnendes Merkmal der Session ist.
Dadurch wird ermöglicht, dass Shopbesucher Produkte dem Warenkorb beliebig hinzufügen und entfernen können, sowie die
gewünschte Menge anpassen können, ohne sich dabei anmelden oder registrieren zu müssen.  
Falls Shopbesucher das Browserfenster ohne eine Anmeldung oder Registrierung  verlassen, bleibt der Zustand des Warenkorbs
für einen bestimmten Zeitraum erhalten. Ermöglicht wird dies durch die Zwischenspeicherung im Browser per
Cookies und __`$localForage`__.
Dieser Mechanismus ist detailliert im Abschnitt [Sessions](../architectureanddataflow/sessions.md) nachlesbar.

::: tip
Zur Speicherung von Cookies wird in hubble das Modul [cookie-universal-nuxt](https://www.npmjs.com/package/cookie-universal-nuxt)
verwendet. Für größeren Speicherbedarf, wie bei der vollständigen Erfassung des Einkaufswagens, wird das Modul [localforage-nuxt](https://www.npmjs.com/package/localforage-nuxt) eingesetzt.
:::


::: tip
Die Reihenfolge der Zustandsspeicherung nach Veränderung des States folgt immer demselben Schema:
Ein Request an einen API Endpunkt wird über die __`action`__ __`modApi/apiCall`__ gemacht, welche den Bearer Authentication Token 
benötigt. Die jeweilige Response dazu wird im lokalen Vuex Store und anschließend ebenfalls
im Browser als Cookie und per __`$localForage`__ gespeichert.
:::


``` js
// ~/modules/@hubblecommerce/hubble/core/store/api/modCart.js
// send API request to recalculate cart via shop system
// this step needs a valid Bearer Authentication Token
dispatch('recalculateCart', { order: JSON.stringify(order) })
    .then((response) => {
        // 1) store to local Vuex Store
        commit('setCart', response.order.cart);
        commit('setTotals');
        
        // 2) store via $localForage
        localStorageHelper.setCreatedAt(_.clone(state.cart), state.localStorageLifetime)
            .then((response) => {
                this.$localForage.setItem(state.cookieName, response);
            });
        
        // 3) store as cookie
        let smallCart = _.pick(state.cart, ['items_qty']);
        let _cart = getters.getCartEncoded(smallCart);
        
        this.$cookies.set(state.cookieName, _cart, {
            path: state.cookiePath,
            expires: getters.getCookieExpires
        });
    })
```


<ImageComponent :src="$withBase('/warenkorb.svg')" />


## hubble Data API spezifische Store Module und Middleware

Im hubble Modul (__`~/modules/@hubblecommerce`__) existieren unter den __`store`__ und __`middleware`__ Ordnern jeweils der Ordner __`/api`__,
der spezifische Logik im Zusammenhang mit der hubble Data API enthält. Grund für die Aufteilung in einen separaten 
Ordner (__`/api`__) ist der Anspruch, die Client Bundle Größen so klein wie möglich zu halten und Download- sowie 
Renderingzeiten zu verkürzen.
Im Folgenden ist ein Ausschnitt aus dem Abschnitt [State](../architectureanddataflow/state.md),
der den Einbindungsmechanismus und die Funktionsweise erläutert:

> Das hubble Modul (__`~/modules/@hubblecommerce`__) wird bei Start der Applikation ausgeführt
(__`~/modules/@hubblecommerce/hubble/module.js`__) und anhand der, in der __`~/.env`__ eingetragenen,
__`API_TYPE`__ werden die entsprechenden Shop spezifischen Dateien aus dem Unterordner __`sw`__ oder
__`api`__ registriert. Dadurch entfällt der Pfad Prefix für Shop spezifische Vuex Store Module,
da es in der laufenden Applikation nur ein Store Modul mit dem jeweiligen Namen gibt.

Derselbe Mechanismus gilt für die Einbindung von Middleware.
Somit können Komponenten, Middleware und andere Store Module nun unter alleiniger Verwendung des Modulnamen oder Namen der
Middleware jene referenzieren. 

#### Beispiel

Zum Referenzieren von Store Modulen in Komponenten ist also trotz des Vorhandenseins von den zwei Dateien
im __`@hubblecommerce`__ Modul, __`sw/modApiCustomer.js`__ und __`api/modApiCustomer.js`__,
keine explizite Differenzierung notwendig, wie im Folgenden zu sehen ist:

``` js
// ~/components/customer/LoginForm.vue (simplified)
...mapActions({
    logIn: 'modApiCustomer/logIn' // name of module === 'modApiCustomer', name of action === 'logIn'
})
```