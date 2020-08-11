---
pageClass: theguide
---

# State

### Store Architektur und State Management 

<ImageComponent 
    :src="$withBase('/statemanagement.svg')"
    alt="State Management"
    backgroundColor="white">
</ImageComponent>

Eine Shopseite enthält eine Vielzahl an ineinander verschachtelter Komponenten, deren Anordnung und Zahl sich im Laufe der 
Zeit verändert. Viele dieser Komponenten benötigen dabei die gleichen State Informationen und haben auch
oft den Anspruch diese zu editieren.
Außerdem wird im initialen Aufruf und in jedem Refresh eine serverseitig gerenderte Seite an den Client ausgeliefert.
Dafür müssen jedoch die benötigten Daten außerhalb der Komponenten bereitstehen um eine [korrekte Wiederherstellung
der Interaktivität im Client](https://ssr.vuejs.org/guide/data.html#data-store) zu gewährleisten.

Um somit einen einfachen Zugriff auf Daten für alle bestehenden und zukünftigen Komponenten zu ermöglichen und sowohl serverseitiges,
als auch clientseitiges Rendering zu ermöglichen, setzt hubble auf die State Management Lösung Vuex. 
Dabei ist Vuex fester Bestandteil von NuxtJS ([Vuex Store in Nuxt](https://nuxtjs.org/guide/vuex-store)) und dadurch bereits vorkonfiguriert:
Dateien, die sich im Ordner __`~/store/`__ befinden, werden automatisch als Teil des Vuex Stores registriert.

Die von den Seiten und Komponenten benötigten Daten befinden sich in __`state`__ Objekten im Vuex Store. 
In der hubble Architektur existieren dabei je nach Entität (Produkt, Kategorie, Kunde etc.) getrennte
Store Module unter __`~/modules/@hubblecommerce/hubble/core/store/`__.

Ein Auszug der Vuex Store Module, die sich durch die Entitäten ableiten lassen:

| Store Modul | 
| --- | 
| __`modCart`__ | 
| __`modSearch`__ |  
| __`modNavigation`__ |  
| __`modWishlist`__ | 
| __`modCustomer`__ |  
| __`modCategory`__ |  
| __`modApiProduct`__ |  
| __`modApiPayment`__ | 
| __`modPrices`__ | 
| __`modCookieNotice`__ | 


Änderungen am State können nur mithilfe von Funktionen vorgenommen werden. 
Dafür existieren verschiedene Arten von Funktionen,
die für die jeweilige Tätigkeit aufgerufen werden: __`getters`__, __`actions`__ und __`mutations`__.

Der Aufbau eines Vuex Store Moduls im __`@hubblecommerce`__ Modul ist wie folgt: 
``` js
export default function (ctx) {
    const modWishlist = {
        namespaced: true,
        state: () => ({
            wishlistItemsCount: 0,
            wishlistItemsObj: {},
            wishlistId: false,

            cookieName: 'hubbleWishlist',
            localStorageLifetime: 720 // 720 hours = 30 days
        }),
        getters: {...},
        mutations: {...},
        actions: {...}
    };

    ctx.store.registerModule('modWishlist', modWishlist);
}
```


Dieser Konvention von Vuex folgend, werden somit alle Store Interaktionen über die passende Funktionsart durchgeführt.  
Für eine vereinfachte Syntax nutzt hubble in Komponenten sogenannte Vuex __map helper__:
``` js
// ~/components/customer/LoginForm.vue
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState({
            customer: state => state.modApiCustomer.customer,
            wishlistState: state => state.modWishlist.wishlistItemsObj
        })
    },
    
    methods: {
        ...mapActions({
            logIn: 'modApiCustomer/logIn',
            getWishlist: 'modApiCustomer/getWishlist',
            updateWishlist: 'modApiCustomer/updateWishlist',
            saveToStore: 'modWishlist/saveToStore'
        }),
        ...mapMutations({
            setWishlistId: 'modWishlist/setWishlistId',
            setWishlistItemsCount: 'modWishlist/setWishlistItemsCount',
            setWishlistItemsObj: 'modWishlist/setWishlistItemsObj'
        }),
        // ...
        submitLoginForm: function() {
            // ...
            this.logIn(validCredentials) // uses mapped action function
            // ...
        }
    }
} 
```


#### Einbindung von Shop spezifischen Store Modulen
Im __`@hubblecommerce`__ Modul gibt es nicht nur eine Unterscheidung von Vuex Store Modulen nach Entität, sondern auch 
nach dem Shopsystem, welches im Backend verwendet wird. Da es spezifische Logik zur Verarbeitung und 
zum Request Prozess je nach Backend gibt, gewährleistet eine Trennung kleinere Client Bundles.

| Store Modul | Verwendung |
| --- | --- | 
| __`hubble/core/store/modApi.js`__ | gültig für alle Shopsysteme |
| __`hubble/core/store/api/modApiProduct.js`__ | gültig nur für den API Typ '__api__' ([hubble API](../api)) |
| __`hubble/core/store/sw/modApiProduct.js`__ | gültig nur für den API Typ '__sw__' |


Damit also nur die relevanten Store Module Teil des Client Bundles sind existiert folgender Vorgang:

Das hubble Modul (__`~/modules/@hubblecommerce`__) wird bei Start der Applikation ausgeführt (__`~/modules/@hubblecommerce/hubble/module.js`__)
und anhand der, in der __`.env`__ eingetragenen, __`API_TYPE`__ werden die entsprechenden Shop spezifischen Dateien aus 
dem Unterordner __`sw`__ oder __`api`__ registriert. Dadurch entfällt der Pfad Prefix für Shop spezifische Vuex Store
Module, da es in der laufenden Applikation nur ein Store Modul mit dem jeweiligen Namen gibt.

Zum Referenzieren von Store Modulen in Komponenten:
``` js
// ~/components/customer/LoginForm.vue (simplified)
...mapActions({
    logIn: 'modApiCustomer/logIn' // name of module === 'modApiCustomer', name of action === 'logIn'
})
```



#### Nützliche Quellen:
* [Module in NuxtJS](https://nuxtjs.org/guide/modules)
* [Vuex](https://vuex.vuejs.org/) 
* [Vuex Store in NuxtJS](https://nuxtjs.org/guide/vuex-store)
* [SSR in NuxtJS](https://nuxtjs.org/guides/concepts/server-side-rendering#server-side-rendering-steps-with-nuxtjs)
* [asyncData](https://nuxtjs.org/guide/async-data#the-asyncdata-method)







