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
Zeit verändert. Viele dieser Komponenten benötigen dabei die gleichen Daten und haben auch oft den Anspruch diese zu editieren.

Damit alle Komponenten Zugriff auf diese Daten haben ohne diese immer wieder als Properties weiterreichen zu müssen, 
setzt hubble auf die State Management Lösung Vuex. 
Dabei ist Vuex fester Bestandteil von NuxtJS ([Vuex Store in Nuxt](https://nuxtjs.org/guide/vuex-store)) und dadurch bereits vorkonfiguriert:
Dateien, die sich im Ordner __`~/store/`__ befinden, werden automatisch als Vuex Modul registriert.

Die von den Seiten und Komponenten benötigten Daten befinden sich in __`state`__ Objekten im Vuex Store. 
In der hubble Architektur existieren dabei je nach Entität (Produkt, Kategorie, Kunde etc.) getrennte
Store Module unter __`~/modules/@hubblecommerce/hubble/core/store/`__.

Ein Auszug der Vuex Store Module, die sich durch die Entitäten ableiten lassen:

| Store Module | 
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


Daten werden in States gespeichert. Änderungen am State können nur mithilfe von Funktionen vorgenommen werden. 
Dafür existieren verschiedene Arten von Funktionen die für die jeweilige Tätigkeit aufgerufen werden: __`getters`__, __`actions`__ und __`mutations`__.

Der Aufbau eines Vuex Store Moduls ist wie folgt: 
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
Für eine vereinfachte Syntax nutzt hubble in Komponenten die __Vuex map helper__:
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



#### Nützliche Quellen:
* [Module in NuxtJS](https://nuxtjs.org/guide/modules)
* [Vuex](https://vuex.vuejs.org/) 
* [Vuex Store in NuxtJS](https://nuxtjs.org/guide/vuex-store)
* [SSR in NuxtJS](https://nuxtjs.org/guides/concepts/server-side-rendering#server-side-rendering-steps-with-nuxtjs)
* [asyncData](https://nuxtjs.org/guide/async-data#the-asyncdata-method)







