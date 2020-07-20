# User Sessions

User Sessions in hubble spielen eine wichtige Rolle bei der lokalen Zwischenspeicherung des Warenkorbs und der Wishlist.
Es existieren 3 Layer von lokaler Zwischenspeicherung des States:
1. Speicherung im Vuex Store
2. Speicherung über __`$localForage`__ im Browser
3. Speicherung als Cookie im Browser

Es ist wichtig, im Projekt eine angemessene Lifetime für __`$localForage`__ und Cookies im Vuex Store zu setzen. 
Im hubble Projekt existieren bereits voreingetragene Defaultwerte für Gültigkeitsdauern in dem jeweiligen Store Modul.


#### Use Case: Shopware als Backend

Durch das Hinzufügen von Produkten zum Warenkorb wird durch die __`ProductDetailAddToCart`__ Komponente bei der ersten
Interaktion eine __`action`__ im zugehörigen Vuex Store Modul __`sw/modCart`__ aufgerufen, mit der Aufgabe einen 
[sw-context-token](https://docs.shopware.com/en/shopware-platform-dev-en/sales-channel-api/sales-channel-cart-api?category=shopware-platform-dev-en/sales-channel-api)
zu erhalten. Da dieser Token in subsequenten Interaktionen mit der API benötigt wird, wird dieser im darauf folgenden Schritt lokal
im Vuex Store und zusätzlich als Cookie im Browser abgespeichert.

Die Voraussetzung, um einen __`sw-context-token`__ von der API zu erhalten, ist das Setzen des Auth Tokens im Request. 
Dieser Auth Token ist im Admin Panel erreichbar und muss in die __`.env`__ Datei des Projektes eingetragen werden.
Mehr Informationen zum Umgang mit den in der __`.env`__ eingetragenen Werte gibt es im Abschnitt [Konfiguration](configuration.md).


* __Schritt 1__: Eintrag des Auth Keys in die __`.env`__

``` js
// .env
API_SW_ACCESS_KEY = <KEY-FROM-ADMIN-AREA>
```

::: warning
Client-seitig erlaubte Keys müssen in der __`nuxt.config.js`__ auf die Whitelist gesetzt werden,
damit diese zur Verfügung stehen. Zur korrekten Einrichtung sollte der Abschnitt [Konfiguration](configuration.md) referenziert werden.
:::


* __Schritt 2__ : Zur Verwendung des Keys wird __`process.env`__ referenziert
``` js
// ~/modules/@hubblecommerce/hubble/core/store/modApi.js
let authToken = process.env.API_SW_ACCESS_KEY
```

Dies bedeutet, dass im Falle von Shopware der __`sw-context-token`__ kennzeichnendes Merkmal der Session ist.
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
Ein Request an einen API Endpunkt wird über die __`action`__ __`modApi/apiCall`__ gemacht, welche den API Access Key aus
der __`.env`__ und den __`sw-context-token`__ benötigt. Die Response dazu wird im lokalen Vuex Store mit Hilfe des Moduls
__`sw/modCart`__ gespeichert und anschließend im Browser als Cookie und per __`$localForage`__ gespeichert.
Der Aufruf der __`action`__ __`sw/modCart/saveCartToStorage`__ folgt immer auf jenen API Request, der aufgrund
einer Interaktion mit dem Warenkorb ausgelöst wurde.
:::

* __Schritt 1__ (*vereinfacht*):
``` js
// ~/modules/@hubblecommerce/hubble/core/store/sw/modCart.js
updateItem({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
        // makes API patch request w/ payload object
        dispatch('swUpdateLineItem', { id: state.productToUpdate, qty: state.qtyToUpdate })
            .then((res) => {
                // updates vuex store state 
                commit('setCartItemsCount', state.cart.items_qty + payload.qty );

                // saves cart to browser storage via localForage
                dispatch('saveCartToStorage', { response: res }) 
            }
        }
}
```

* __Schritt 2__ (*vereinfacht*):
``` js
// inside saveCartToStorage action
this.$localForage.setItem(state.cookieName, response);
```


