# User Sessions

User Sessions in hubble spielen eine wichtige Rolle bei der clientseitigen Zwischenspeicherung benutzerbezogener Daten wie z.B. Wunschliste und Warenkorb.
Alle Daten, die verarbeitet werden, müssen via Vuex Store bereitgestellt werden (siehe [State Management](../statemanagement)).
Deshalb ist naheliegend, diese Objekte eins zu eins clientseitig im Browser des Anwenders zu speichern.
Eindimensionale bzw. statische Daten werden dafür in einem Cookie gespeichert; beispielsweise die Aauswahl der aktuellen Sprache. 
Alle anderen Entitäten die größer sind als ein reguläres Cookie (2 KB), werden im local Storage gespeichert; z.B. Warenkorb und Wunschliste. 

Grundsätzlich stehen in hubble drei Arten von Speicher zur Verfügung:
1. Speicherung von Daten zur Laufzeit im Vuex Store
2. Speicherung von großen Objekten über __`$localForage`__ im Browser
3. Speicherung von kleinen Objekten Cookie im Browser

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

Anders als Cookies, haben Daten im local Storage kein automatisch gesetztes Ablaufdatum. hubble bietet Helferfunktionen um die 
Lebensdauer des local storage zu regulieren. 

In hubble wird die Speicherung via __`$localForage`__ dabei über das [localforage-nuxt](https://www.npmjs.com/package/localforage-nuxt) Modul,
welches [localForage](https://github.com/localForage/localForage) für NuxtJS implementiert, ermöglicht.


## Auth Token und [hubble API](../api) als Proxy

hubble Api verwendet als Sicherheitsmechanismus die OAuth2 Methode.
Damit ein Request an die API erfolgreich ist, wird ein Auth Token im Request Objekt benötigt. 
Um ein gültiges Token von der API zu erhalten, müssen dafür __Client ID__ und __Client Secret__, sogenannte Client Credentials,
verwendet werden. Diese zwei Werte sollten in der __`.env`__ 
Datei des Projektes eingetragen sein. Mehr zur korrekten Konfiguration und Verwendung von Werten aus der __`.env`__ Datei 
unter dem Abschnitt [Konfiguration](./configuration.md).

Der erhaltene Token, wird als Bearer Authentication Token bezeichnet und ist im Response Objekt im Feld __`access_token`__ enthalten.
Die Implementation zum Erhalt eines Bearer Authentication Tokens und dessen Speicherung im Vuex Store State ist Teil
der Middleware __`apiAuthenticate`__. Diese ist in den meisten Routen als Middleware aufgelistet und wird somit immer vor
dem Rendering der jeweiligen Route ausgeführt. Dadurch können eingebundene Komponenten in subsequenten Requests den Token
verwenden.

Es müssen folgende Felder in der .env Datei ausgefüllt sein, um ein Bearer Authentication Token zu erhalten:
+ Base URL
+ Endpoint
+ Client ID
+ Client Secret

Der Bearer Authentication Token ist kennzeichnendes Merkmal der Session gegenüber der API.
Er wird als Header bei jedem API Aufruf mitgesendet, um den API Benutzer als valide einzustufen. 

::: tip
Die hubble API agiert als Proxy zwischen der hubble PWA und dem Shop Backend. 
:::
