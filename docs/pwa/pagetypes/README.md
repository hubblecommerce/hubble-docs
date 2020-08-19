# Seitentypen

Jeder Onlineshop nutzt zur Interaktion wiederkehrend gleichartig aufgebaute Seitentypen. In hubble sind diese entsprechend den bekannten Systemen implementiert und sollen im Folgenden kurz erläutert werden. 

Der Architektur der NuxtJS Pages folgend, definiert hubble über dieses Konstrukt die Abhängigkeit von Routen zu den darzustellenden Komponenten. 

Folgende Seitentypen sind implementiert:

- [Content Seite](/pwa/pagetypes/)
- [Kategorie](/pwa/pagetypes/catalogcategory)
- [Suche](/pwa/pagetypes/search)
- [Produktseite](/pwa/pagetypes/productdetailpage)
- [Warenkorb](/pwa/pagetypes/checkout/#checkoutcart)
- [Checkout](/pwa/pagetypes/checkout)
- [Kundenaccount](/pwa/pagetypes/customeraccount)


## Page Types vs. __`pageType`__: Wo liegt der Unterschied?

Außerdem existiert für die Startseite und für dynamische Routen die State Variable __`pageType`__, anhand derer
entweder eine Kategorie, eine Produktdetailseite oder eine CMS Seite angezeigt wird.
Somit ergeben sich __`category`__, __`product`__ und __`content`__ als mögliche Werte, die __`pageType`__ annehmen kann.
Gesetzt wird der Wert dabei mit Hilfe der Middleware __`apiResourceRoute`__, die vor dem Rendering der Startseite und 
dynamischer Routen aufgerufen wird.

``` js
export default {
    middleware: [ 
        'apiResourceRoute',
        // ...
    ]
}
```


Beispielsweise wird bei entsprechender Bedingung folgende __`mutation`__ aufgerufen:
``` js
store.commit('modApiResources/setPageType', 'category');
```

Daraus lässt sich schließen, dass bei Bedarf der Wert sich aus dem Vuex Store Modul __`modApiResources`__ abfragen lässt.
Dieser Wert kann nun also in der __`/pages/_.vue`__, welche für dynamische Routen zuständig ist, verwendet werden:

``` js
// /pages/_.vue
import { mapState } from 'vuex';

export default {
    // ...

    data() {
        return {
            currentComponent:  ''
        }
    },
    
    computed: {
        ...mapState({
            pageType: state => state.modApiResources.pageType
        }),
    },
    
    created() {
        this.currentComponent = 'view-' + this.pageType;
    },
    
    // ...
}
```

Dabei wird in der __`created`__ Lifecycle Methode, unter Verwendung von __`pageType`__, der Name der 
Komponente gesetzt, welche für jene dynamische Route angezeigt werden soll. Da __`pageType`__ drei Werte annehmen kann, 
ergeben sich dadurch die möglichen Komponenten: __`ViewCategory`__, __`ViewProduct`__ und __`ViewContent`__.
Die zur Ansicht benötigte Komponente wir dabei nach dem [Lazy Loading](../architectureanddataflow/dynamicimports.md)
Konzept bei Bedarf nachgeladen:

``` js
// /pages/_.vue
components: {
    ViewCategory: () => import("../components/productlist/ViewCategory"),
    ViewProduct: () => import("../components/productdetail/ViewProduct"),
    ViewContent: () => import("../components/cms/ViewContent"),
},
```

Im Template der __`_.vue`__ wurde dabei die [dynamische Komponente von Vue.js](https://vuejs.org/v2/guide/components.html#Dynamic-Components)
verwendet:

``` html{5}
<!-- pages/_.vue -->
<template>
    <div>
        <transition name="fade" appear>
            <component :is="currentComponent" v-if="pageType !== null" />
        </transition>
    </div>
</template>
```

Weitere Informationen zu diesem Ablauf existieren in dem Abschnitt [Routing / URL Handling](../architectureanddataflow/routingurlhandling.md)
und eine Beschreibung zu den Komponenten __`ViewCategory`__, __`ViewCatalog`__ und __`ViewContent`__ befindet sich in den
den nächsten Abschnitten.


::: tip
Als Page Types werden die verschiedenen Seitenarten im Shop bezeichnet, wobei bei der Startseite (__`pages/index.vue`__)
und bei dynamischen Routen (__`pages/_.vue`__) die konkrete Einbindung der benötigten Komponenten via der Vuex Store
State Variable __`pageType`__, die durch die API Response gesetzt wird, geregelt ist.
:::

