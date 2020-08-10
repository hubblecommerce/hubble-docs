# Cookies

Für die Speicherung von statischen Daten (bis zu 2 kB) im Browser werden in hubble Cookies verwendet, wie im Abschnitt [Sessions](./sessions.md) beschrieben ist.
Dazu wird das NuxtJS Modul [cookie-universal-nuxt](https://www.npmjs.com/package/cookie-universal-nuxt) verwendet.
Um jedoch die abgespeicherten Daten abrufen zu können, muss beachtet werden, dass NuxtJS bei initialen Requests und bei Reloads
immer ein serverseitiges Rendering durchführt. Dies bedeutet, in dem Moment, in dem eine Befüllung des Vuex Store States mit
Daten durchgeführt wird, existiert zu diesen Zeitpunkten keine Browserumgebung und somit keine Cookies, die ausgelesen werden können.
Somit muss die Abfrage von Cookies in einem clientseitig ausgeführten Schritt erfolgen: Dazu eignet sich die 
[Plugin Funktionalität von Nuxt.js](https://nuxtjs.org/guides/directory-structure/plugins). Diese Funktionalität ist auch im
__`@hubblecommerce`__ in Verwendung: Die __`~/modules/@hubblecommerce/hubble/core/plugins/sw/nuxt-client-init_no_ssr.js`__ enthält
Abfragen nicht nur an den Cookie-Speicher, sondern auch an den localStorage. Dafür werden die entsprechenden Vuex Store
__`actions`__ aufgerufen.
Im Folgenden ist das in hubble verwendete Schema, am Beispiel des Bezahlvorgangs, zu sehen:

Der clientseitige Aufruf von __`actions`__ erfolgt im Plugin:
``` js
// ~/modules/@hubblecommerce/hubble/core/plugins/api/nuxt-client-init_no_ssr.js  - this line is the same as for /sw
// ~/modules/@hubblecommerce/hubble/core/plugins/sw/nuxt-client-init_no_ssr.js  - this line is the same as for /api
export default async (ctx) => {
   // ..
    await ctx.store.dispatch('modApiPayment/setOrderByCookie', ctx);
}
```

Die aufgerufene Methode befindet sich im entsprechenden Vuex Store Modul, in diesem Fall der __`modApiPayment`__:
``` js
// ~/modules/@hubblecommerce/hubble/core/store/api/modApiPayment.js  - this method is the same as for /sw
// ~/modules/@hubblecommerce/hubble/core/store/sw/modApiPayment.js - this method is the same as for /api
async setOrderByCookie({ commit, state }) {
    return new Promise((resolve) => {
        // try to retrieve auth user by cookie
        let _cookie = this.$cookies.get(state.cookieNameOrder);

        // no cookie? ok!
        if(! _cookie) {
            resolve({
                success: true,
                message: 'order not known by cookie.'
            });
        } else {
            // Save cookie to store
            commit('setOrder', _cookie);

            resolve({
                success: true,
                message: 'order taken from cookie.',
                redirect: true
            });
        }
    })
},
```

Eine Abspeicherung im Cookie erfolgt dabei, unter anderem, über die Angabe des Namen, des abzuspeichernden Wertes und der
Gültigkeitsdauer des Cookies:

``` js
// ~/modules/@hubblecommerce/hubble/core/store/api/modApiPayment.js 
async storeChosenPaymentMethod({ commit, state, getters }, payload) {
    return new Promise((resolve) => {
        // ...

        // Save order from store to cookie
        this.$cookies.set(state.cookieNameOrder, state.order, {
            path: state.cookiePath,
            expires: getters.getCookieExpires
        });

        resolve();
    })
},
```

Ein wichtiger Aspekt bei der Verwendung von Cookies ist deren Lifetime im Browser. Diese errechnet sich unter anderem aus 
dem in dem Vuex Store Modul __`modCookieNotice`__ gesetzten Wert für das Feld __`cookieTTL`__.
Die, in der oben abgebildeten __`action`__ __`storeChosenPaymentMethod`__, verwendete Berechnung ist im Folgenden zu sehen:

``` js
getters:  {
    getCookieExpires: (state) => {
        return new Date(new Date().getTime() + state.cookieTTL * 60 * 1000);
    },
    // ...
}
```