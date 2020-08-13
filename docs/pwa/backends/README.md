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


::: tip
Um zusätzlichen State für bestimmte Seiten zu definieren, ist eine neue Middleware zu erstellen, die für
Read/Write Operationen Vuex Store Module referenziert und in der __`middleware`__ Option der Seite hinzuzufügen ist.
::: 
