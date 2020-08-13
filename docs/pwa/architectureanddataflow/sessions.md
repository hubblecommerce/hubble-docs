# Sessions

User Sessions in hubble spielen eine wichtige Rolle bei der clientseitigen Zwischenspeicherung benutzerbezogener Daten wie z.B. Wunschliste und Warenkorb.
Alle Daten, die verarbeitet werden, müssen via Vuex Store bereitgestellt werden (siehe [State Management](./state)).
Deshalb ist es naheliegend, diese Objekte eins zu eins clientseitig im Browser des Anwenders zu speichern.
Eindimensionale bzw. statische Daten werden dafür in einem Cookie gespeichert; beispielsweise die Auswahl der aktuellen Sprache. 
Alle anderen Entitäten die größer sind als ein regulärer Cookie (2 KB), werden im local Storage gespeichert, wie z.B. der Warenkorb und die Wunschliste. 

Grundsätzlich stehen in hubble drei Arten von Speicher zur Verfügung:
1. Speicherung von Daten zur Laufzeit im Vuex Store
2. Speicherung von großen Objekten über __`$localForage`__ im Browser
3. Speicherung von kleinen Objekten als Cookie im Browser

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

Anders als Cookies, haben Daten im local Storage kein automatisch gesetztes Ablaufdatum. 
Für die Regulierung der Lebensdauer dieser Daten im Browserspeicher bietet hubble Helferfunktionen an,
die sich unter __`~/modules/@hubblecommerce/hubble/core/utils/localStorageHelper.js`__ befinden.
Die statischen Helper Funktionen, die Teil der Klasse __`localStorageHelper`__ sind, haben folgende Signatur:


| Helper | Parameter | Return Wert | 
| --- | --- | --- |
| __`setCreatedAt`__ | __`entity`__<sup>1)</sup> | __`entity`__, mit dem zugewiesenen Feld __`createdAt`__ , dessen Wert dem aktuellen Zeitpunkt entspricht |
| __`lifeTimeIsValid`__ |  __`entity`__<sup>1)</sup>, __`lifetime`__ | __`true`__/__`false`__ für den Gültigkeitsstatus - basierend auf __`state.localStorageLifetime`__ <sup>*)</sup> |
| __`updateCreatedAt`__ |  __`entity`__<sup>1)</sup> | __`entity`__, bei dem das __`createdAt`__ Feld erneut auf den aktuellen Zeitpunkt gesetzt wurde |
__<sup>1)</sup>__ Die __`entity`__ ist das Objekt, welches im Browser gespeichert werden soll

__<sup>*)</sup>__ Vuex Store Module aus dem __`@hubblecommerce`__ Modul, die __`$localForage`__ verwenden, haben bereits einen vordefinierten Wert für
die Gültigkeitsdauer unter dem jeweiligen __`state.localStorageLifetime`__ Feld. Bei Bedarf kann dieser Wert also im entsprechenden Vuex Store angepasst werden.


Diese Helper Funktionen werden zusammen mit dem [localforage-nuxt](https://www.npmjs.com/package/localforage-nuxt) Modul,
welches [localForage](https://github.com/localForage/localForage) für NuxtJS implementiert, eingesetzt.



## User Sessions basierend auf Auth Token
Damit Daten sowohl im Browserspeicher, als auch im Vuex Store gespeichert werden können, muss dafür zuerst ein erfolgreicher
API Request erfolgen. API Requests in hubble zeichnen sich darin aus, dass diese nur unter Verwendung gültiger
Client Credentials erfolgen, sowie dem daraus resultierenden Erhalt eines Auth Tokens.
Dabei sind Client Credentials in die __`.env`__ einzutragen und existieren je Shop,
wodurch diese in dem jeweiligen Shop Admin Bereich erhältlich sind. Zur korrekten und sicheren Verwendung der __`.env`__
sollte der Abschnitt [Konfiguration](../configuration.md) referenziert werden. 
Auth Token jedoch existieren pro Session und sind während der Gültigkeitsdauer der Session Teil jedes Requests. 

::: tip 
Der Erhalt eines gültigen Auth Tokens pro Session ist nur möglich, wenn Client Credentials aus dem Shop Admin Bereich in
der __`.env`__ eingetragen wurden.
:::

Für eine detaillierte Beschreibung, des Ablauf zum Erhalt des Auth Tokens und der Verwendung dieser, kann der 
Abschnitt [Backends](../backends/) referenziert werden. Dieser enthält Informationen zur hubble Data API, Shopware 6 und
den Besonderheiten, der jeweiligen Backend Lösung, die es zu beachten gilt für API Requests.

