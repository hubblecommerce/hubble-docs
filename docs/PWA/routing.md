# Routing & Data Flow

### Wie Daten in hubble für Routen bereitgestellt werden

Da hubble's Architektur auf der von NuxtJS basiert, erfolgt die Konfiguration von Routen über das Einhalten der
[Ordner Struktur](https://nuxtjs.org/guide/directory-structure), die NuxtJS vorgibt.

Es gibt verschiedene Arten von Routen in hubble, die sich aus den Dateien im __`~/pages`__ Ordner ergeben.
Die __`~/pages/_.vue`__ stellt dabei eine Besonderheit dar: Diese Datei ist für das Routing von allen dynamischen
Routen verantwortlich.

Beispiel für eine dynamische Route:
```
https://<DOMAIN-NAME>.com/:productID
```

Außerdem haben alle Seiten im  __`~/pages`__ Ordner ein Layout definiert, in dessen Markup der eigentliche 
Inhalt der Route eingebettet wird. Um mehr über die in hubble verfügbaren Layouts zu erfahren, kann der 
Abschnitt [Layouts](layouts.md) der Dokumentation referenziert werden.


Bei der näheren Untersuchung der __`~/pages/index.vue`__ lässt sich ein wiederkehrendes Muster im __`~/pages`__ Ordner
identifizieren:
Außer der Auflistung des Layouts unter __`layout`__, gibt es zudem auch immer ein Array unter der Option __`middleware`__.

``` js{5,11}
// ~/pages/index.vue 
export default {
    name: 'Index',
    layout: 'hubble',
    middleware: [
        'apiIndexRoute',
        'apiAuthenticate',
        'apiLocalization',
        'apiResourceMenu',
        'trackClickPath'
    ],
    // ...
}
```

Die Aufgabe der __Middleware__ in hubble ist es, den Vuex Store State zu initialisieren, indem die __`actions`__ aufgerufen werden, 
die dann Requests an API Endpunkte schicken und ein State Update zur Folge haben.


::: tip
Um zusätzlichen State für bestimmte Seiten zu definieren, ist eine neue Middleware zu erstellen, die für
Read/Write Operationen Vuex Store Module referenziert und in der __`middleware`__ Option der Seite hinzuzufügen ist.
:::


### Ein Beispiel
Das Menü ist Teil der meisten Seiten, was bedeutet, jene Seiten haben die Middleware __`apiResourceMenu`__ in ihrer
__`middleware`__ Option aufgelistet. Da Middlewares vor dem Rendering der jeweiligen Seite verarbeitet werden, ist in diesem 
Fall der Auslöser für das Initialisieren des Vuex Store States mit den Menüdaten somit Aufgabe der Middleware __`apiResourceMenu`__.


#### Hauptschritte (_vereinfacht_):
* __Schritt 1__: __`~/pages/_.vue`__
``` js{7}
// ~/pages/_.vue
export default {
    name: 'RouteResolver',
    layout: 'hubble',
    middleware: [
        // ...
        'apiResourceMenu',
        // ...
    ],
    // ..
}
```

* __Schritt 2__: __`~/modules/@hubblecommerce/hubble/core/middleware/apiResourceMenu.js`__
``` js
// ~/modules/@hubblecommerce/hubble/core/middleware/apiResourceMenu.js
// ...
store.dispatch('modApiMenu/getMenu', {})
// ...
```

* __Schritt 3__: __`~/modules/@hubblecommerce/hubble/core/store/sw/modApiMenu.js`__

Es sollte beachtet werden, dass folgender Ausschnitt aus einer Shopware spezifischen Datei ist und es eine äquivalente
__`getMenu`__ Vuex __`action`__ für die Verwendung mit der [hubble API](../api) unter __`~/modules/@hubblecommerce/hubble/core/store/api/modApiMenu.js`__ gibt.

::: details
Das hubble Modul (__`~/modules/@hubblecommerce/hubble/module.js`__) wird bei Start der Applikation aufgerufen
und anhand der in der __`.env`__ eingetragenen __`API_TYPE`__ werden die entsprechenden Shop spezifischen Dateien aus 
dem Unterordner __`sw`__ oder __`api`__ registriert. Dadurch entfällt der Pfad Prefix für Shop spezifische Vuex Store
Module, da es in der laufenden Applikation nur ein Store Modul mit dem jeweiligen Namen gibt.
Siehe dazu __Schritt 2__: Bei dem Aufruf der __`action`__ __`getMenu`__ wird daher direkt das Store Modul __`modApiMenu`__ referenziert und nicht __`sw/modApiMenu`__.

Für Details zur Funktionsweise von [Modulen in NuxtJS](https://nuxtjs.org/guide/modules) kann die offizielle NuxtJS Dokumentation
referenziert werden.
:::

``` js{3,5,9,14}
// ~/modules/@hubblecommerce/hubble/core/store/sw/modApiMenu/getMenu.js
actions: {
    async getMenu({ commit, state, dispatch }, payload) {
        return new Promise(function(resolve, reject) {
            dispatch('apiCall', {
                action: 'get',
                tokenType: 'sw',
                apiType: 'data',
                endpoint: '/sales-channel-api/v1/category?limit=500&associations[seoUrls][]'
                }, { root: true })
                    .then((response) => {
                        dispatch('mappingMenu', response.data.data)
                            .then((res) => {
                                commit('setDataMenu', res);
                            });

                         resolve(response);
                    })
        });
    }
} 
```


* __Schritt 4__: __`~/modules/@hubblecommerce/hubble/core/store/modApi.js`__
``` js
// ~/modules/@hubblecommerce/hubble/core/store/modApi.js
apiCall: {
    root: true,
    async handler ({state, rootState}, payload) {
        // ...
        return new Promise(function(resolve, reject) {
            axios({
                method: payload.action,
                url: baseUrl + payload.endpoint,
                headers: headers, // includes sw-context-token if api type === 'sw'
                params: payloadParams, // GET params
                data: payloadData // POST data
            }).then((response) => {
                // ...
                resolve(response);
            })
            // ...
        })
    }
}
```

* __Schritt 5__: __`layouts/hubble.vue`__

Nachdem die API Response in dem benötigten Format im Vuex State gespeichert wurde, kann die __`layouts/hubble.vue`__, 
welche für das Rendering des Menüs verantwortlich ist, auf diese Daten zugreifen:


Abhängig von dem aktuellen Viewport wird entweder die Komponente __`<the-mobile-menu/>`__ oder __`<the-mega-menu/>`__ angezeigt.


``` html
<!-- ~/layouts/hubble.vue -->
<the-mega-menu v-if="!isEmpty(menu)" :data-items="menu" />
```

Es ist zu beachten, dass der Wert aus der __`dataMenu`__ Variable noch unter der lokalen Variable __`menu`__ abgespeichert werden muss,
da diese an die konkrete Menü Komponente als __`prop`__ übergeben wird, wie oben zu sehen ist (__`:data-items="menu"`__).


``` js
// ~/layouts/hubble.vue
computed: {
   ...mapState({
        dataMenu: state => state.modApiMenu.dataMenu
   })
}
```


### Data Flow und State Management

::: tip
Middlewares in hubble sind nicht die einzige Stelle, an der API Requests initiiert werden: Auch Komponenten rufen
__`actions`__ aus dem Vuex Store auf, die API Requests machen.
:::


##### Mehr Erfahren
Um mehr über State Management in hubble zu erfahren kann der Abschnitt [State Management](statemanagement.md) 
der Dokumentation referenziert werden.

