# Ein neue Route (Seite) hinzufügen

Nun, da die Funktionalität zur Speicherung und Anzeige der zuletzten angesehenen Produkte existiert, möchten wir diese auf einer eigenen Seintanansicht darstellen. 
Somit gilt es, hierfür eine separate Route anzulegen. Wie dies funktioniert, soll im Folgenden aufgezeigt werden.

#### Beschreibung

Die neue Seite soll über die Produktdetailseite erreichbar sein und eine längere Liste an zuletzt angesehenen Produkten anzeigen.
Falls es keine Produkte auf der Liste gibt, soll ein ein Link zur Shop Startseite dargestellt werden.

Dadurch existieren also folgende Kriterien an die Implementierung:

+ Erstellen der Route
+ Erweitern der bestehenden __`LastViewedProducts`__ Komponente, um je nach Route mehr Listenelemente anzuzeigen
+ Erstellen einer Weiterleitung auf die Startseite, wenn es keine zuletzt angesehenen Produkte gibt
+ Erstellen von Variablen für die erlaubten Listenlängen
+ Ergämnzen eines Button auf der Produktdetailseite, damit die Route mit der Liste von dort erreicht werden kannn


### Hinzufügen der Seite
Um ein Mapping zwischen Komponenten und einer Route zu erhalten, wird lediglich eine neue Datei innerhalb von __`~/pages/customer`__ benötigt: 

``` bash
touch viewedproducts.vue
```

Jede in diese Datei hinzugefügte Komponente ist danach beim Besuch der Seite __`http://localhost:3336/customer/viewedproducts`__ sichtbar. 
Da wir vorhaben die zuletzt angesehenen Produkte anzuzeigen, kann die im vorherigen Abschnitt erstellte __`LastViewedProducts`__ Komponente wiederverwendet werden. 
Im Folgenden befindet sich ein Ausschnitt des relevanten Programmcodes:

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

Auch hier stehen die zuletzt angesehenen Produkte - durch die Referenzierung des Vuex Stores - zur Verfügung. Jedoch fehlt im Template der Case __`v-else`__ für den Fall, dass es keine zuletzt angesehenen Produkte gibt. Denn die __`LastViewedProducts`__ wird nur angezeigt, wenn es auch Listenelemente gibt.

Daher können unterhalb des __`<div>`__ Tags, welcher die __`<last-viewerd-products />`__ Komponente umrahmt, folgende Zeilen hinzugefügt werden:

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

Somit ist eindeutig, dass die obere Komponente nicht immer Teil der DOM ist und weder das zugehörige Template, noch das Skript immer parat stehen müssen. Es bietet sich somit gemäß des Kapitels [Lazy Loading](../architectureanddataflow/lazyloading.md) an, diese per dynamischen Import erst einzubinden, wenn benötigt.

Um dieses Verhalten auch im __`Network`__ Tab des Browser Inspektors zu beobachten, ist es möglich sogenannte [Webpack Magic Comments](https://webpack.js.org/api/module-methods/#magic-comments) zu verwenden. Diese ermöglichen es, dem Chunk einen Namen zu geben (hier wurde der Name __`LastViewedProductsChunk`__ gewählt). Ohne Vergabe eines Namen, erhalten die Chunks meist  eine numerische ID (siehe [Webpack Dynamic Imports](https://webpack.js.org/api/module-methods/#magic-comments) für Details) deren Inhalt somit nicht aus dem Namen hervorgeht.


### Erweiterung der Komponente __`LastViewedProducts`__

Damit die __`LastViewedProducts`__ Komponente nun auf unserer neuen Seite mehr Elemente anzeigt,
als auf der Produktdetailseite, kann dafür das Feld __`props`__ verwendet werden:

``` js
// ~/components/productutils/LastViewedProducts.vue
props: {
    numberOfItems: {
        type: Number,
        required: true
    }
},
```

Im Template muss diese Unterscheidung der anzuzeigenden Anzahl an Elementen ebenfalls berücksichtigt werden.
Hier eignet sich dafür eine __`computed`__ Property, welche den als Prop übergebenen Wert verwendet:

``` js 
// ~/components/productutils/LastViewedProducts.vue 
computed: {
    // ...
    selectionOfViewedProducts: function () {
        return this.viewedProducts.filter((viewedProduct, index) => index < this.numberOfItems)
    }
}
```


Nun zu der Verwendung der angelegten __`computed`__ Property __`selectionOfViewedProducts`__.
Da es nicht immer alle Elemente der Liste anzuzeigen gilt, muss das Basis Array (__`viewedProducts`__), welches zur Iteration verwendet wird, mit der gefilterten Liste (__`selectionOfViewedProducts`__) ausgetauscht werden.

``` html{3}
<!-- ~/components/productutils/LastViewedProducts.vue -->
<div class="last-viewed--list">
    <div v-for="product in selectionOfViewedProducts" :key="product.id" class="last-viewed--clickable">
        <!-- ... -->
    </div>
</div>
```

Bisher gibt es keine Möglichkeit über eine In-Page Navigation auf die neue Route zu gelangen, außer über einen direkten Aufruf. Um also eine clientseitige Navigation für den Anwednder zu ermöglichen, kann dem Template der Komponente __`LastViewedProducts`__ ein Button hinzugefügt werden. Jedoch soll dieser nur auf der ProduktDetailseite sichtbar sein und das Wechseln auf die Seite __`http://localhost:3336/customer/viewedproducts`__ erlauben. 

Somit kann erneut die __`computed`__ Property, welche die aktuelle URL überprüft (__`onViewedProductsPage`__), verwendet werden:

``` html
<!-- ~/components/productutils/LastViewedProducts.vue -->
<button v-if="!onViewedProductsPage"
        class="last-viewed--button--show-all"
        @click="showAllViewedProducts"
>
    Show All
</button>
```

Außerdem wurde bereits eine Funktion referenziert, die für den Routenwechsel zuständig sein soll (__`showAllViewedProducts`__):
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

Beim Aufruf der Seite __`http://localhost:3336/customer/viewedproducts`__, werden dem __`viewedProducts`__ Array, keine weiteren Elemente hinzugefügt, 
wodurch ein Aufruf der __`action`__ __`modLastViewed/saveViewedProductsToLocalForage`__ nicht benötigt wird. 
Somit ist also eine Abfrage der aktuellen Route notwendig.
Dafür eignet es sich in der __`LastViewedProducts`__ eine weitere __`computed`__ Property anzulegen:

``` js
// ~/components/productutils/LastViewedProducts.vue 
computed: {
    onViewedProductsPage: function () {
        return this.$route.path.includes('/customer/viewedproducts');
    },
    // ...
}
```

Diese kann nun in der __`created`__ Lifecycle Methode der __`LastViewedProducts`__ Komponente verwendet werden:
``` js
// ~/components/productutils/LastViewedProducts.vue
created() {
    if (process.client && !(this.onViewedProductsPage)) this.$store.dispatch('modLastViewed/saveViewedProductsToLocalForage');
}
```


Damit nun die gewünschte Anzahl angezeigt wird, muss diese auch an den Stellen, in der die __`LastViewedProducts`__ 
Komponente eingebunden wird, per Prop übergeben werden. Da durch die Anforderungen an die Funktionalität, die Komponente
nur an zwei Stellen eingebunden wird, können die unterschiedlichen Werte zentral im Vuex Store State angelegt werden und 
somit auch innerhalb des Vuex Stores über __`state.minToShow`__ und __`state.maxSaved`__ referenziert werden.

``` js
// ~/store/modLastViewed.js
export const state = () => ({
    // ...
    minToShow: 5,
    maxSaved: 8
})
```
Dabei ist __`maxSaved`__, die maximale Anzahl an zu speichernden Elementen und __`minToShow`__, die maximale Anzahl der anzuzeigenden Elemente auf der ProduktDetailseite.

Die konkreten Anpassungen dazu können dem Repository entnommen werden: [~/store/modLastViewed.js](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/hubble-93/store/modLastViewed.js).


Somit lässt sich zum einen die __`ViewProduct.vue`__ anpassen, in der die __`LastViewedProducts`__ eingebunden ist, wofür 
über __`mapState`__, die im Vuex Store angelegte __`minToShow`__ Variable referenziert werden muss, damit diese als Prop Wert gesetzt werden kann:

``` js
// ~/components/productdetail/ViewProduct.vue 
...mapState({
    // ...
    minToShow: state => state.modLastViewed.minToShow,
}),
```


``` html
<!-- ~/components/productdetail/ViewProduct.vue --> 
<last-viewed-products :number-of-items="minToShow" />
```


Analog dazu ist die Anpassung der __`viewedproducts.vue`__. Hier ist der Unterschied, dass die __`maxSaved`__ verwendet wird:
``` js
// ~/pages/customer/viewedproducts.vue 
...mapState({
    // ...
    minToShow: state => state.modLastViewed.maxSaved,
}),
```

``` html
<!-- ~/pages/customer/viewedproducts.vue -->
<last-viewed-products :number-of-items="maxSaved" />
```
