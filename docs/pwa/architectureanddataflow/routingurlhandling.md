---
pageClass: theguide
---

# Routing / URL Handling

<ImageComponent 
    :src="$withBase('/pagerouting.svg')"
    alt="State Management"
    backgroundColor="white">
</ImageComponent>

## Auflösen von Routen
Da hubble's Architektur auf der von NuxtJS basiert, erfolgt die Konfiguration von Routen über das Einhalten der
[Ordner Struktur](https://nuxtjs.org/guide/directory-structure), die NuxtJS vorgibt. Somit ist keine separate
Datei und manuelle Konfiguration notwendig, um ein Mapping zwischen den anzuzeigenden Komponenten und URLs
anzugeben.


Dabei gibt es zwei verschiedene Arten von Routen in hubble, die sich aus den Dateien im __`~/pages`__ Ordner ergeben.
Zum einen statische Routen wie z.B. __`~/pages/checkout/cart.vue`__ für den Warenkorb und zum anderen dynamische
Routen für z.B. die Produktdetailseite, Kategorien oder CMS Seiten. Diese sind dynamisch, weil zum Zeitpunkt 
des Seitenaufrufs nicht feststeht, um welche Entität (Produkt, Kategorie, etc.) es sich handelt. 
Dynamische Routen werden von der __`~/pages/_.vue`__ aufgelöst. 


Außerdem definieren Seiten ein Layout, in dessen Markup der eigentliche Inhalt der Route eingebettet wird.
Dies bietet eine Möglichkeit auf mehreren Seiten verwendete Elemente wie Menü, Logos und Footer einzubinden.
In dem Abschnitt [Layouts](./layouts.md) erfahren Sie mehr über die in hubble verfügbaren Layouts.


Der Grundaufbau einer Seite lässt sich gut anhand der Home Page __`~/pages/index.vue`__ ableiten. 
Dieser setzt sich aus den Properties __`name`__, __`layout`__ und __`middleware`__ zusammen: 

``` js{3,4,5,11}
// ~/pages/index.vue 
export default {
    name: 'Index',
    layout: 'hubble',
    middleware: [
        'apiIndexRoute',
        'apiAuthenticate',
        'apiLocalization',
        'apiResourceMenu',
        'trackClickPath'
    ],
    // ...
}
```

 
##### Mehr Erfahren
Um mehr über State Management und zur Verwendungsweise von Vuex in hubble zu erfahren kann
der Abschnitt [State Management](./state.md) der Dokumentation referenziert werden.
 


## Beispiel: Auflösen von dynamischen Routen
Die Middleware __`apiResourceRoute`__ übergibt zunächst die angefragte URL an den Endpunkt __`/api/json/urls/`__:

``` js
// ~/pages/_.vue
middleware: [
    ...
    'apiResourceRoute',
    ...
],
```

Diese delegiert API Requests an den Vuex Store:
``` js
// ~/modules/@hubblecommerce/hubble/core/middleware/api/apiResourceRoute.js
store.dispatch('apiCall', {
    action: 'get',
    tokenType: 'api',
    apiType: 'data',
    endpoint: _.join(['/api/json/urls/', path], '')
}, { root: true })
.then((response) => {
    // Throw 404 page if url is not known
    if (_.isEmpty(response.data.result.item)) {
        error({statusCode: 404, message: 'Unknown URL'});
        resolve('UriResolver OK');
        return false;
    }

    // Get resource by id from api and set matching pageview component
    store.dispatch('modApiResources/apiResolveUriData', {
        data: response.data,
        query: route.query
    })
    .then(() => {
        resolve('UriResolver OK')
    })
    .catch(() => {
        reject()
    })
})
```


Dieser liefert dann den Seitentypen bzw. die Entität zurück um die es sich handelt. 
Gleichzeitig werden von der API alle relevanten Daten bezüglich der Entität bezogen
(__`modApiResources/apiResolveUriData`__).

Die Seite __`~/pages/_.vue`__ kann nun anhand des Pagetypes und der Daten der Entität die Seite rendern:

``` vue
<!-- ~/pages/_.vue -->
<component :is="currentComponent" v-if="pageType !== null" />
```


## Beispiel: Zusammenhang zwischen Middleware & Menü
Das Menü ist Teil der meisten Seiten, was bedeutet, jene Seiten haben die Middleware __`apiResourceMenu`__ in ihrer
__`middleware`__ Property aufgelistet. Es ist also in diesem Fall Aufgabe der 
Middleware __`apiResourceMenu`__ die Menüdaten bereitzustellen, bevor die Seite gerendert werden kann.


#### Hauptschritte (_vereinfacht_):
* __Schritt 1__: Middleware einer Route wird aufgerufen
``` js{7}
// ~/pages/_.vue
export default {
    name: 'RouteResolver',
    layout: 'hubble',
    middleware: [
        // ...
        'apiResourceMenu',
        // ...
    ],
    // ..
}
```

* __Schritt 2__: Middleware führt Action eines Vuex Store Modules aus 
``` js
// ~/modules/@hubblecommerce/hubble/core/middleware/apiResourceMenu.js
// ...
store.dispatch('modApiMenu/getMenu', {})
// ...
```

* __Schritt 3__: Vuex Store Modul Action bezieht Daten von API Endpunkt 

``` js{3,5,9,14}
// ~/modules/@hubblecommerce/hubble/core/store/api/modApiMenu/getMenu.js
actions: {
    async getMenu({ commit, dispatch }) {
        return new Promise(function(resolve, reject) {
            dispatch('apiCall', {
                action: 'get',
                tokenType: 'api',
                apiType: 'data',
                endpoint: '/api/json/menu/children',
                params: {
                    _size: 30
                }
            }, { root: true })
            .then((response) => {
                commit('setDataMenu', {
                    data: response.data
                });
                // ... 
            })
            // ...
        });
    }
} 
```

* __Schritt 4__: __`layouts/hubble.vue`__

Nachdem die API Response in dem benötigten Format im Vuex State gespeichert wurde, kann die __`layouts/hubble.vue`__, 
welche für das Rendering des Menüs verantwortlich ist, auf diese Daten zugreifen:

``` js
// ~/layouts/hubble.vue
computed: {
   ...mapState({
        dataMenu: state => state.modApiMenu.dataMenu
   })
}
```

Den Unterkomponenten des Layouts können dann als Properties diese Daten übergeben werden:

``` html
<!-- ~/layouts/hubble.vue -->
<the-mega-menu v-if="!isEmpty(dataMenu)" :data-items="dataMenu" />
```

## Möglichkeiten zur Navigation zwischen Routen
Durch die Navigationsmöglichkeiten in NuxtJS ergeben sich folgende für hubble:
Zum einen ist es möglich die __`<nuxt-link>`__ Komponente zu verwenden, für die bei Bedarf auch
Prefetching global oder lokal, je Link, aktiviert werden kann. 
Mehr zu Prefetching unter [Prefetching](./prefetching.md).

Außerhalb von Templates wird Vue Router __`this.$router`__ verwendet für Weiterleitungen.
Diese Variante eignet sich, wenn es diverser Vorprüfungen oder Vorkalkulationen bedarf, bevor eine 
entsprechende Weiterleitung stattfinden kann.
Im Folgenden ist dazu ein einfaches Beispiel aus dem Overlay Menü der Wunschliste,
welches in hubble als __`offCanvas`__ bekannt ist, zu sehen:

``` js
// ~/components/customer/WishlistLayer.vue
methods: {
    checkoutWishlist: function() {
        this.hideMenu();
    
        this.$router.push({
            path: this.localePath('customer-wishlist')
        });
    }
}
```
Obiger __`push`__ auf __`'customer-wishlist'`__ führt auf die Seite __`http://localhost:3336/customer/wishlist`__.

Der dazugehörige Template Ausschnitt, welcher zum Aufruf der Methode führt, sieht wie folgt aus:
``` html
<button v-if="qty > 0"
        class="wishlist-button button-primary"
        @click.prevent="checkoutWishlist()"
>
    {{ $t('Go to wishlist') }}

    <material-ripple />
</button>
```
