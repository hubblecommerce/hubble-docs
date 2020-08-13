# Backends

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
