# User Sessions

User Sessions in hubble spielen eine wichtige Rolle bei der lokalen Zwischenspeicherung des Warenkorbs und der Wishlist.
Es existieren 3 Layer von lokaler Zwischenspeicherung des States:
1. Speicherung im lokalen Vuex Store
2. Speicherung über __`$localForage`__ im Browser
3. Speicherung als Cookie im Browser

Es ist wichtig, im Projekt eine angemessene Lifetime für __`$localForage`__ und Cookies im Vuex Store zu setzen. 
Im hubble Projekt existieren bereits voreingetragene Defaultwerte für Gültigkeitsdauern in dem jeweiligen Store Modul.


### Auth Token und [hubble API](../api) als Proxy

Durch das Hinzufügen von Produkten zum Warenkorb wird durch die __`ProductDetailAddToCart`__ Komponente eine
__`action`__ im zugehörigen Vuex Store Modul __`api/modCart`__ aufgerufen, die zur erneuten Berechnung
des Warenkorbs die __`recalculateCart`__ __`action`__ aufruft. Diese ist dafür zuständig, 
dass der Request zur Rekalkulation an die API gesendet wird und setzt die entsprechenden Endpoint und Warenkorb Daten.
Damit der Request jedoch erfolgreich ist, wird ein Auth Token im Request Objekt benötigt. Um ein gültiges Token von
der API zu erhalten, müssen dafür __Client ID__ und __Client Secret__, sogenannte Client Credentials,
verwendet werden. Diese zwei Werte sollten in der __`.env`__ 
Datei des Projektes eingetragen sein. Zur korrekten Konfiguration und Verwendung von Werten aus der __`.env`__ Datei 
kann der Abschnitt [Konfiguration](./configuration.md) referenziert werden.
Der erhaltene Token, wird als Bearer Authentication Token bezeichnet und ist im Response Objekt im Feld __`access_token`__
enthalten.
Die Implementation zum Erhalt eines Bearer Authentication Tokens und dessen Speicherung im Vuex Store State ist Teil
der Middleware __`apiAuthenticate`__. Diese ist in den meisten Routen als Middleware aufgelistet und wird somit immer vor
dem Rendering der jeweiligen Route ausgeführt. Dadurch können eingebundene Komponenten in subsequenten Requests den Token
verwenden.

Es werden die folgenden Felder benötigt, um ein Bearer Authentication Token zu erhalten:
+ Base URL
+ Endpoint
+ Client ID
+ Client Secret

Dafür müssen folgende Schritte durchgeführt werden:

* __Schritt 1__: Eintrag der Felder in die __`.env`__

``` txt
# .env
API_BASE_URL = '<API_BASE_URL>'
API_CLIENT_ID = '<CLIENT_ID>'
API_CLIENT_SECRET = '<CLIENT_SECRET>'
API_ENDPOINT_AUTH = 'oauth/token'
```

::: warning
Client-seitig erlaubte Keys müssen in der __`nuxt.config.js`__ auf die Whitelist gesetzt werden,
damit diese zur Verfügung stehen. Zur korrekten Einrichtung sollte der Abschnitt [Konfiguration](configuration.md) referenziert werden.
:::


* __Schritt 2__ : Zur Verwendung der Felder wird __`process.env`__ referenziert
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
Falls Shopbesucher das Browserfenster ohne eine Anmeldung oder Registrierung  verlassen, bleibt der Zustand des Warenkorbs für einen bestimmten Zeitraum erhalten. Ermöglicht wird dies durch
die oben beschriebenen Layer zur Zwischenspeicherung im Browser: Cookies und __`$localForage`__.

In hubble wird die Speicherung via __`$localForage`__ dabei über das [localforage-nuxt](https://www.npmjs.com/package/localforage-nuxt) Modul,
welches [localForage](https://github.com/localForage/localForage) für NuxtJS implementiert, ermöglicht.


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

::: tip
Die hubble API agiert als Proxy zwischen der hubble PWA und dem Shop Backend. 
:::

