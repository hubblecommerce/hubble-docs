---
pageClass: theguide
---

# Produktdetailseiten

### Schematischer Aufbau der Produktdetailseite:

<ImageComponent 
    :src="$withBase('/detailpage.svg')"
    alt="Produktdetailseiten"
    backgroundColor="white">
</ImageComponent> 

Für den Inhalt einer Produktdetailseite ist die Komponente __`~components/productdetail/ViewProduct.vue`__ zuständig. 
Warum es sich bei diesem Einstiegspunkt nicht um eine Page handelt kann auf der 
Seite [Routing & Dataflow](/pwa/einfuehrung/routing.html#auflosen-von-dynamische-routen) nachgelesen werden.

Die primären Komponenten, die __`ViewProduct`__ enthält:

| Komponenten | Aufgaben |
| --- | --- | 
| __`breadcrumbs`__ | zeigt die aktuelle Position in der Navigationsstruktur an |
| __`product-detail-gallery`__ | verwendet [vue-tiny-slider](https://www.npmjs.com/package/vue-tiny-slider) & [vue-js-modal](https://www.npmjs.com/package/vue-js-modal) um Produktbilder darzustellen; bindet __`add-to-wishlist`__ ein für Viewports __`sm`__ & __`md`__ |
| __`product-detail-buybox`__ | siehe untere Tabelle |
| __`collapsible-description`__ | nur relevant für __`sm`__ Viewports: zeigt Produktbeschreibung an, wenn im ausgeklappten Zustand; für >__`sm`__ wird die Produktbeschreibung ohne diese Komponente angezeigt  |
| __`product-detail-cross-selling-sw`__ | zeigt Cross-Sellings an, falls vorhanden |
| __`product-detail-recommendations`__ | zeigt Produktempfehlungen mit Hilfe der __`product-listing`__ Komponente an, falls vorhanden|


Die primären Komponenten, die __`product-detail-buybox`__ enthält:

| Komponenten | Aufgaben |
| --- | --- | 
| __`product-detail-manufacturer`__ | stellt Herstellerinformationen, wie Markenname & Logo dar |
| __`product-detail-buybox-options`__ | wird nur eingebunden, wenn Produkttyp __`configurable`__ & wenn [hubble API](../../api) in Verwendung (__`process.env.API_TYPE`__ === 'api')|
| __`product-detail-buybox-options-sw`__ | wird nur eingebunden, wenn Produkttyp __`configurable`__ & wenn Shopsystem Shopware (__`process.env.API_TYPE`__ === 'sw')|
| __`product-detail-delivery`__ | zeigt Details zur Versandzeit & zu Versandkosten an |
| __`product-detail-price`__ | stellt Details zum Preis dar; Detaillierungsgrad hängt von dem Produkt ab (Sale Produkte, Mengenabhängige Preise) |
| __`product-detail-add-to-cart`__ | verantwortlich für das Hinzufügen von Produkten zum Warenkorb; verwendet __`Loader`__ & __`material-ripple`__ |
| __`add-to-wishlist`__ | wird nur eingebunden, wenn Viewport __`lg`__, ansonsten Teil der __`product-detail-gallery`__  |

