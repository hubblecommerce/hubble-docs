# Backends

hubble ist Backend agnostisch. Grundidee von hubble ist, dass alle online Shops prinzipiell gleich funktionieren. Egal ob Magento, Shopware, WooCommerce, usw. 
Das hubble Frontend bedient diese Grundfunktionalität und setzt dabei auf eine eigene Daten und Entitätenstruktur. 
So benötigt man nur noch einen Service der die Daten aus einem beliebigen Shop Framework in das hubble Format bringt. 

Die hubble data API extrahiert Daten aus einem Shopbackend und stellt sie über einen Elastic Seach Index und einer Laravel Api dem Frontend zur Verfügung.
Man kann jedoch auch ein Shopsystem direkt ansprechen und die Daten zu beziehen. 
Dafür muss man allerdings selbst zusätzlich das Mapping der Daten vornehmen.
Für SW6 bietet hubble bereits eine [Lösung der Direktanbindung](../backends/shopware6.md) an die Saleschannel Api an. 

Arten der Anbindung an ein Backend:
- [hubble Data Api](../backends/hubbleDataApi.md)
- Direktanbindung an Shopinterne API (z.B. [Saleschannel Api von SW6](../backends/shopware6.md))

## Unterschiedliche Shopsysteme, gleiche Funktionsaufrufe
Bei der Delegierung durch die Middleware an den Vuex Store gilt es zu beachten, dass im __`@hubblecommerce`__ Modul
je nach verwendetem Shopsystem unterschiedliche Vuex Store Module existieren. 
Um den jeweiligen Aufruf von Vuex Store Funktionen plattformunabhängig zu halten, 
werden immer die gleichen Funktionsaufrufe in den Vuex
Store Modulen verwendet, ungeachtet des Backends. Folgender Mechanismus ermöglicht dies:

Das hubble Modul (__`~/modules/@hubblecommerce/hubble/module.js`__) wird bei Start der Applikation aufgerufen
und anhand des, in der __`.env`__ eingetragenen, __`API_TYPE`__ werden die entsprechenden Shop spezifischen Dateien
entweder aus dem Unterordner __`sw`__ oder __`api`__ registriert. Dadurch entfällt der Pfad Prefix für Shop
spezifische Vuex Store Module, da es in der laufenden Applikation nur ein Store Modul mit dem jeweiligen Namen gibt. 

| Store Modul | Verwendung |
| --- | --- | 
| __`hubble/core/store/modApi.js`__ | gültig für alle Shopsysteme |
| __`hubble/core/store/api/modApiProduct.js`__ | gültig nur für den API Typ '__api__' ([hubble API](../api)) |
| __`hubble/core/store/sw/modApiProduct.js`__ | gültig nur für den API Typ '__sw__' |

Zum Aufruf von Store Modulen in Komponenten:
``` js
// ~/components/customer/LoginForm.vue (simplified)
...mapActions({
    logIn: 'modApiCustomer/logIn' // name of module === 'modApiCustomer', name of action === 'logIn'
})
```
