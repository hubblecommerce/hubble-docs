# SEO

## SEO durch Serverside Rendering
Serverseitige Rendering den Vorteil, dass die an den Client gelieferte Seite von
Suchmaschinen erfasst werden kann und somit erfolgreich indiziert wird.
In jeder Komponente kann die Property __`head`__ verwendet werden, um Meta Informationen wie Keywords und eine Seitenbeschreibung
hinzuzufügen. Eine Beschreibung der Property __`head`__ gibt es in der API Dokumentation von NuxtJS: 
[The head Method](https://nuxtjs.org/api/pages-head). 
In der __`nuxt.config.js`__ existieren für die dynamischen Seitenarten
__`category`__, __`product`__ und __`cms`__ Default Werte für __`title`__, __`metaKeywords`__ und __`metaDescription`__,
die über __`process.env.meta`__ referenziert werden können.

Dazu ein Ausschnitt aus der __`ViewCategory`__ Komponente, die in der __`~/pages/_.vue`__ eingebunden wird, wenn die
API Response als Seiten-Typ __`category`__ zurückliefert:

``` js
// ~/components/productlist/ViewCategory.vue
head() {
    let metaDescription = {},
    metaKeywords = {},
    // ...

    if(!_.isEmpty(this.categoryItem.meta_description)) {
        metaDescription = this.categoryItem.meta_description;
    } else {
        metaDescription = process.env.meta.category.metaDescription;
    }

    if(!_.isEmpty(this.categoryItem.meta_keywords)) {
        metaKeywords = this.categoryItem.meta_keywords;
    } else {
        metaKeywords = process.env.meta.category.metaKeywords;
    }
}
```

Die in der __`head`__ Property referenzierten __`process.env.meta`__ Einträge
in der __`nuxt.config.js`__ sehen dabei wie folgt aus:
``` js
// ~/nuxt.config.js (simplified)
module.exports = {
    env: {
        meta: {
            category: {
                title: 'Category - Hubble Demo',
                titleAdd: ' - buy now at hubble Demostore',
                metaKeywords: 'PWA, ecommerce, hubble, headless, nuxt, vue, responsive, progressive',
                metaDescription: 'Official hubble demo page.'
            },
        },
        // ...
    }
}
```

Ebenfalls in der __`nuxt.config.js`__ sind die Header der Seite definiert:
``` js
// ~/nuxt.config.js (simplified)
env: {
    // ...
    head: {
        title: 'Buy now | Hubble Demo-Shop',
        htmlAttrs: {
            lang: 'de'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description },
            { content: 'width=device-width,initial-scale=1', name: 'viewport' },
            { hid: 'author', name: 'author', content: 'digital.manufaktur GmbH' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
}
```
