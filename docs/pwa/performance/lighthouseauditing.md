# Lighthouse Audits

Seiten in hubble werden über [Lighthouse](https://github.com/GoogleChrome/lighthouse) Audits auf
verschiedene Parameter hin, wie z.B. SEO Freundlichkeit, PWA Fähigkeiten und Ladezeiten, überprüft.
Die Entwicklung von Komponenten findet im Rahmen dessen statt.
Es existieren verschiedene Aspekte, die den finalen Lighthouse Score und die evaluierten Metriken beeinflussen.


#### Lazy Loading und Ladezeiten
Die Verbesserung der Ladestrategie von Bildern, Komponenten, Plugins und Middleware, vor allem im
Kontext des initialen Renderings, führt zu einer signifikanten Verbesserung des Scores.
Eine Verbesserung des Renderings bedeutet, dass Shopbesucher kürzere Wartezeiten zwischen URL Aufruf und 
sichtbaren, sowie verwendbaren Content haben.
Wichtige Techniken, um kurze Lade- und Renderzeiten zu ermöglichen, basieren auf dem 
als Lazy Loading bekannten Konzept:
Sobald die Startseite abgefragt wird, ist es nicht notwendig die Checkout Logik ebenfalls mitzubündeln.
Zur Anwendung dieser Techniken in hubble kann der Abschnitt [Lazy Loading](../architectureanddataflow/lazyloading.md)
der Dokumentation referenziert werden.


#### SSR und SEO
Außerdem bietet das serverseitige Rendering den Vorteil, dass die an den Client gelieferte Seite bereits von
Suchmaschinen erfasst werden kann und somit die SEO Freundlichkeit des Shops erhöht.
Zusätzlich kann das Feld __`head`__ verwendet werden, um Meta Informationen wie Keywords und eine Seitenbeschreibung
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


#### Service Worker und PWA Fähigkeiten

In hubble existieren verschiedene Vorkonfigurationen für die Bereitstellung von PWA Eigenschaften, wie
eine Manifest Datei, Offline Fähigkeit etc. Außerdem ist eine leichte Individualisierung und
Erweiterung der bereits existierenden Fähigkeiten durch die Vorkonfiguration möglich. 
Bestehende Einstellungen und Funktionaliäten sind im Abschnitt
[Service Worker und Manifest](../architectureanddataflow/serviceworkerandmanifesg.md) beschrieben.