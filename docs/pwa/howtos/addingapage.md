# Seiten hinzufügen

Nun da, die Funktionalität zur Speicherung und Anzeige der zuletzten angesehenen Produkte existiert, ist es möglich
zusätzlich eine separate Route dafür anzulegen.

#### Beschreibung

Die Seite sollte über die Produktdetailseite erreichbar sein und eine längere Liste an zuletzt angesehenen Produkten anzeigen.
Falls es keine Produkte auf der Liste gibt, dann sollte es einen Link zur Shop Startseite geben.

Dadurch existieren also folgende Kriterien an die Implementation:
+ Erstellung der Route
+ Erweiterung der bestehenden __`LastViewedProducts`__ Komponente, um je nach Route mehr Listenelemente anzuzeigen
+ Eine Möglichkeit zur Option einer Weiterleitung auf die Startseite, wenn es keine zuletzt angesehenen Produkte gibt
+ Erstellen von Variablen für die erlaubten Listenlängen
+ Möglichkeit zum Aufruf dieser über einen Button in der Komponente  __`LastViewedProducts`__ auf der Produktdetailseite 



### Hinzufügen der Seite
Um ein Mapping zwischen Komponenten und einer Route zu erhalten wird lediglich die Erstellung einer Datei 
innerhalb von __`~/pages/customer`__ benötigt: 

``` bash
touch viewedproducts.vue
```

Jede, in diese Datei hinzugefügte Komponente, ist bei Besuch der Seite __`http://localhost:3336/customer/viewedproducts`__
also sichtbar. Da also die zuletzt angesehenen Produkte angezeigt werden sollen, kann die im vorherigen Abschnitt erstellte
__`LastViewedProducts`__ Komponente wiederverwendet werden. Im Folgenden befindet sich ein Ausschnitt der direkt relevanten
Implementation:

``` html
<!-- ~/pages/customer/viewedproducts.vue -->
<!-- simplified -->
<template>
    <div class="container">
        <client-only>
            <div v-if="viewedProducts.length">
                <last-viewed-products />
            </div>
        </client-only>
    </div>
</template>
```

``` js
<script>
    import { mapState } from 'vuex';

    export default {
        name: "ViewedProductsPage",

        layout: 'hubble',

        components: {
            LastViewedProducts: () => import(/* webpackChunkName: "LastViewedProductsChunk" */ "../../components/productutils/LastViewedProducts"),
        },

        computed: {
            ...mapState({
                viewedProducts: state => state.modLastViewed.viewedProducts
            })
        },
        // ...
</script>
```
Auch hier stehen die zuletzt angesehenen Produkte, durch die Referenzierung des Vuex Stores, zur Verfügung. Jedoch fehlt 
im Template der Case __`v-else`__ für den Fall, wenn es garkeine zuletzt angesehenen Produkte gibt, denn die __`LastViewedProducts`__
wird nur angezeigt, wenn es auch Listenelemente gibt.
Daher können unterhalb des __`<div>`__ Tags, welcher die __`<last-viewerd-products />`__ Komponente umrahmt, folgende
Zeilen hinzugefügt werden:

``` html
<div v-else>
    <nuxt-link :to="localePath('index')">
        <button class="button-primary">
            {{ $t('Discover our products') }}
            <material-ripple />
        </button>
    </nuxt-link>
</div>
```
Somit ist eindeutig, dass die obere Komponente nicht immer Teil der DOM ist und weder das zugehörige Template,
noch das Skript immer parat sein müssen. Es bietet sich somit gemäß dem Kapitel
[Lazy Loading](../architectureanddataflow/lazyloading.md) an, diese per dynamischen Import erst einzubinden, wenn benötigt.
Um dieses Verhalten auch im __`Network`__ Tab des Browser Inspektors zu beobachten, 
ist es möglich sogenannte [Webpack Magic Comments](https://webpack.js.org/api/module-methods/#magic-comments)
zu benutzen, die es ermöglichen, dem Chunk einen Namen zu geben (- hier wurde der Name __`LastViewedProductsChunk`__ gewählt).
Ohne Vergabe eines Namen, erhalten die Chunks meist 
eine numerische ID (siehe [Webpack Dynamic Imports](https://webpack.js.org/api/module-methods/#magic-comments) für Details),
deren Inhalt somit nicht aus dem Namen hervorgeht.


### Erweiterung der Komponente __`LastViewedProducts`__
Damit die Seite nun also über die __`LastViewedProducts`__ Komponente mehr Elemente anzeigen kann, als auf der
Produktdetailseite, ist eine Abfrage der aktuellen Route notwendig. Dafür eignet es sich in der 
__`LastViewedProducts`__ eine __`computed`__ Property anzulegen, dessen Eignung im Laufe des Guides ersichtlich wird:

``` js
// ~/components/productutils/LastViewedProducts.vue 
computed: {
    onViewedProductsPage: function () {
        return this.$route.path.includes('/customer/viewedproducts');
    },
    // ...
}
```
Für das Template sollte es eine Unterscheidung geben bzgl. der anzuzeigenden Anzahl an Elementen, wofür sich auch hier
eine __`computed`__ Property eignet, welche obige verwendet:

``` js 
// ~/components/productutils/LastViewedProducts.vue 
computed: {
    // ...
    selectionOfViewedProducts: function () {
        if (this.onViewedProductsPage) {
            return this.viewedProducts.filter((viewedProduct, index) => index < this.maxSaved)
        } else {
            return this.viewedProducts.filter((viewedProduct, index) => index < this.minToShow)
        }
    }
}
```

Es existieren im oberen Snippet zwei Referenzen, die bisher nicht definiert wurden: 
__`this.maxSaved`__, die maximale Anzahl an zu speichernden Elementen und die __`this.minToShow`__,
welche für die maximale Anzahl der anzuzeigenden Elemente auf der ProduktDetailseite steht.
Da es ebenfalls Vergleiche zu der maximalen Anzahl im Vuex Store Modul __`modLastViewed.js`__ gibt, 
sollten diese Werte also am besten global gespeichert werden:

``` js
// ~/components/productutils/LastViewedProducts.vue 
...mapState({
    minToShow: state => state.modLastViewed.minToShow,
    maxSaved: state => state.modLastViewed.maxSaved
}),
```

Diese Werte gilt es als nächstes im Vuex Store Modul __`modLastViewed.js`__, als Teil des States zu definieren:
``` js
// ~/store/modLastViewed.js
export const state = () => ({
    // ...
    minToShow: 5,
    maxSaved: 8
})
```
Somit lassen sich auch die Zahlen in dem Store Modul anpassen und können, über beispielsweise __`state.minToShow`__,
referenziert werden. Die konkreten Anpassungen dazu können dem Repository entnommen werden:
[~/store/modLastViewed.js](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/hubble-93/store/modLastViewed.js).



Nun zu der Verwendung der angelegten __`computed`__ Properties __`selectionOfViewedProducts`__ und __`onViewedProductsPage`__.
Da es also nicht immer alle Elemente der Liste anzuzeigen gilt, muss das Basis Array (__`viewedProducts`__),
welches zur Iteration verwendet wird, ausgetauscht werden mit der, je nach Kondition, gefilterten Liste (__`selectionOfViewedProducts`__).

``` html{3}
<!-- ~/components/productutils/LastViewedProducts.vue -->
<div class="last-viewed--list">
    <div v-for="product in selectionOfViewedProducts" :key="product.id" class="last-viewed--clickable">
        <!-- ... -->
    </div>
</div>
```

Bisher gibt es keine Möglichkeit über eine In-Page Navigation auf die neue Route zu gelangen, außer über einen direkten 
Aufruf. Um also eine clientseitige Navigation zu ermöglichen, kann dem Template der Komponente __`LastViewedProducts`__
ein Button hinzugefügt werden. Jedoch sollte dieser nur auf der ProduktDetailseite sichtbar sein und das Wechseln auf 
die Seite __`http://localhost:3336/customer/viewedproducts`__ erlauben. Somit kann erneut die __`computed`__ Property,
welche die aktuelle URL überprüft (__`onViewedProductsPage`__), verwendet werden:
``` html
<!-- ~/components/productutils/LastViewedProducts.vue -->
<button v-if="!onViewedProductsPage"
        class="last-viewed--button--show-all"
        @click="showAllViewedProducts"
>
    Show All
</button>
```
Außerdem ist bereits auch eine Funktion referenziert, die für den Routenwechsel zuständig sein soll (__`showAllViewedProducts`__):
``` js
// ~/components/productutils/LastViewedProducts.vue
methods: {
    showAllViewedProducts: function () {
        this.$router.push({
            path: this.localePath('customer-viewedproducts')
        })
    }
},
```


Beim Aufruf der Seite __`http://localhost:3336/customer/viewedproducts`__, werden dem __`viewedProducts`__ Array, keine
weiteren Elemente hinzugefügt, wodurch ein Aufruf der __`action`__ __`modLastViewed/saveViewedProductsToLocalForage`__
nicht benötigt wird. Erneut lässt sich die __`computed`__ Property __`onViewedProductsPage`__ wiederverwenden:
 
``` js
// ~/components/productutils/LastViewedProducts.vue
created() {
    if (process.client && !(this.onViewedProductsPage)) this.$store.dispatch('modLastViewed/saveViewedProductsToLocalForage');
}
```