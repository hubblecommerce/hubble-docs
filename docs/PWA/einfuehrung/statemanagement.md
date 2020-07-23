# State Management

### Store Architektur und Management 

![State Management](./statemanagement.svg)

Damit die Shopdaten wie z.B. Informationen zu Produkten und Kategorien, allen Komponenten global zur Verüfung stehen, 
benutzt hubble die Vue.js Erweiterung Vuex.
Vuex ist fester Bestandteil von NuxtJs [Vuex Store in Nuxt](https://nuxtjs.org/guide/vuex-store).

Jede Entität hat dabei ihr eigenes Vuex Store Modul unter /store. 
Die Store Module beinhalten die von den Seiten und Komponenten benötigten Daten in __`state`__ Objekten. 
States können nur mithilfe von Funktionen verändert werden. Dafür existieren verschiedene Arten von Funktionen,
die für die jeweilige Tätigkeit aufgerufen werden: __`getters`__, __`actions`__ und __`mutations`__.

Aufbau Vuex Store Modul: 
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
Für eine vereinfachte Syntax nutzt hubble sogenannte Vuex __map helper__:
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

Das hubble Modul (__`~/modules/@hubblecommerce`__) wird bei Start der Applikation aufgerufen (__`~/modules/@hubblecommerce/hubble/module.js`__)
und anhand der in der __`.env`__ eingetragenen __`API_TYPE`__ werden die entsprechenden Shop spezifischen Dateien aus 
dem Unterordner __`sw`__ oder __`api`__ registriert. Dadurch entfällt der Pfad Prefix für Shop spezifische Vuex Store
Module, da es in der laufenden Applikation nur ein Store Modul mit dem jeweiligen Namen gibt.

Zum Referenzieren von Store Modulen in Komponenten:
``` js
// ~/components/customer/LoginForm.vue (simplified)
...mapActions({
    logIn: 'modApiCustomer/logIn' // name of module === 'modApiCustomer', name of action === 'logIn'
})
```

Daraus ergibt es sich, dass es Store Module gibt die von allen Shopsystemen benutzt werden und andere die nur von speziellen benutzt werden.

| Store Modul | Verwendung |
| --- | --- | 
| __`hubble/core/store/modApi.js`__ | gültig für alle Shopsysteme |
| __`hubble/core/store/api/modApiProduct.js`__ | gültig nur für den API Typ '__api__' ([hubble API](../api)) |
| __`hubble/core/store/sw/modApiProduct.js`__ | gültig nur für den API Typ '__sw__' |



#### Nützliche Quellen:
* [Module in NuxtJS](https://nuxtjs.org/guide/modules)
* [Vuex](https://vuex.vuejs.org/) 
* [Vuex Store in Nuxt](https://nuxtjs.org/guide/vuex-store)
