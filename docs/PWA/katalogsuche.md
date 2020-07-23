# Katalogsuche

Das Rendering der Katalogsuche geschieht durch die __`~/pages/search/catalogsearch.vue`__, welche für Darstellung die __`view-catalogsearch`__ Komponente eingebunden hat.
Der von der __`view-catalogsearch`__ Komponente benötigte __`state`__ (z.B. für den Suchbegriff gefundene Produkte) wird durch die Initiierung der Middleware __`apiResourceSearch`__ gesetzt.

Die primären Komponenten, die __`ViewCatalogsearch`__  enthält:
| Komponenten | Aufgaben |
| --- | --- | 
| __`product-listing-toolbar`__ | wird nur eingebunden, wenn [hubble API](../api) in Verwendung (__`process.env.API_TYPE`__ === 'api')|
| __`product-listing`__ | enthält __`vue-tiny-slider`__, falls __`isSlider`__ prop __`true`__; verwendet  __`product-listing-card`__ um Liste von Produkten (prop __`dataItems`__) darzustellen |
| __`pagination`__ | zeigt Pagination an, die auf dem Wert __`paginationPerPage`__ aus dem Vuex Store Modul __`modApiRequests`__ basiert |
