---
pageClass: theguide
---

# Kataloge / Kategorien

## Kategorieseiten

Für den Inhalt einer Kategorie Seite oder einer Produktliste ist die Komponente __`~components/productlist/ViewCategory.vue`__ zuständig. 
Warum es sich bei diesem Einstiegspunkt nicht um eine Page handelt kann auf der 
Seite [Routing & Dataflow](/pwa/einfuehrung/routing.html#auflosen-von-dynamische-routen) nachgelesen werden.


### Schematischer Aufbau der Kategorieseite:

<ImageComponent 
    :src="$withBase('/categorypages.svg')"
    alt="Kategorieseite"
    backgroundColor="white">
</ImageComponent> 

Die primären Komponenten, die __`ViewCategory`__ enthält:
| API | Komponenten | Aufgaben |
| --- | --- | --- | 
| sw / hubble | __`breadcrumbs`__ | zeigt die aktuelle Position in der Navigationsstruktur an |
| hubble | __`text-excerpt`__ | zeigt Excerpt an, wenn ausgeklappt |
| hubble | __`product-listing-toolbar`__ | enthält __`product-listing-filter`__, __`selectable-limit`__, __`selectable-order`__, __`pagination`__, __`selected-facets`__, __`ItemCount`__ |
| hubble | __`product-listing`__ | enthält __`vue-tiny-slider`__, falls __`isSlider`__ prop __`true`__; verwendet  __`product-listing-card`__ um Liste von Produkten (prop __`dataItems`__) darzustellen |
| hubble | __`pagination`__ | zeigt Pagination an, die auf dem Wert __`paginationPerPage`__ aus dem Vuex Store Modul __`modApiRequests`__ basiert |
| hubble | __`error-no-items`__ | zeigt eine Fehlermeldung an, wenn die Produktliste leer ist |
| sw | __`sw-section`__ | stellt Abschnitte (__`sections`__) mit Hilfe von Blöcken (__`~/components/swComponents/blocks/`__) dar, siehe __Darstellung von __`sections`____ für Details |

Im Shopware Kontext wird die Kategorieseite mit Hilfe von Blöcken innerhalb einer __`section`__ dargestellt. 
So können die Erlebniswelt dynamisch dargestellt werden.

