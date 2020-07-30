# Lazy Loading

### Optimierungstechniken in hubble

In hubble werden Komponenten, Middleware und Plugins unter Anwendung von Lazy Loading Techniken implementiert.
Dies gewährleistet, dass nur Resourcen wie JS und Bilder geladen werden, die auch auf der aktuellen Seite verwendet werden, 
was wiederum zu kurzen Ladezeiten führt.

Technisch basiert die Lösung auf dem Prinzip, dass Webpack anhand von `import` Anweisungen das JS in separate Dateien aufteilt (code splitting / chunking).
So wird der Chunk bzw. die JS Datei nur dann geladen, wenn diese aktiv importiert wird. 

Für Routen bzw. Seiten erstellt NuxtJS automatisch Chunks. Das dynamische Importieren von Komponenten innerhalb eines Layouts oder einer Seite muss man
selbst beim programmieren berücksichtigen. 


## Dynamisches importieren von JS
### Dynamisches importieren von Vue Komponenten

Das dynamische Laden von Vue.js Komponenten kann mit folgender Schreibweise erreicht werden:

``` js
components: {
    <COMPONENT-NAME>: () => import('~/components/<COMPONENT-PATH>')
}
```


### Dynamisches importieren von Middleware
Für die Einbindung von Middleware, die nicht von allen Seiten verwendet wird, eignet sie die Verwendung einer [anonymen Middleware](https://nuxtjs.org/api/pages-middleware/#anonymous-middleware).
Anstatt die Middleware nur als String in der __`middleware`__ Option zu definieren, wird diese via __`import`__ Statement eingebunden und kann über den Namen referenziert werden:

``` js
// ~/pages/index.vue
import myAnonymousMiddleware from '@hubblecommerce/hubble/core/anonymous-middleware/myAnonymousMiddleware';

export default {
    // ...
    middleware: [
        myAnonymousMiddleware
    ]
    // ...
}
```


### Dynamisches importieren von Plugins
In NuxtJS ermöglichen es sogenannte Plugins externe JS Bibliotheken und Module leicht einzubinden und diese im globalen App Kontext zur Verfügung zu stellen:
Ein gutes Beispiel für Funktionalität, die global auf jeder Seite verfügbar sein muss, ist die __`FlashMessages`__ Komponente.
Durch das Einbinden dieser in der __`~/modules/@hubblecommerce/hubble/core/plugins/global.js`__ , 
ist es nicht mehr notwendig in jedem Layout ein __`import`__ Statement für die __`FlashMessages`__ Komponente hinzuzufügen.

NuxtJs empfiehlt Code von Drittanbietern via Plugins zu installieren. Doch Vorsicht: nicht alle Plugins werden auf allen Seiten verwendet, 
daher ist es nicht effizient diese global einzubinden. 

Aus diesem Grund ist bei hubble die Plugin Initialisierung nicht in dem Modulordner __`~/modules/@hubblecommerce/hubble/core/plugins/`__. 
Stattdessen wird das jeweilige Plugin nur in dem __`created`__ Hook der Komponente initialisiert, die das Plugin auch wirklich benutzt.
 
``` js
import vClickOutside from "v-click-outside";

export default {
    // ...
    created() {
        Vue.use(vClickOutside);
    },
    // ...
}
```

Desweiteren kann es sein, dass nur Teile einer Drittanbieter Library genutzt werden. 
Aus diesem Grund, ist es wichtig Tree-Shaking für Vendor Bibliotheken zu aktivieren, um die Bundlegröße zu verkleinern sofern diese Tree Shaking unterstützen.
Zum Beispiel, verfügt die [Lodash Bibliothek](https://lodash.com/docs/) über viele Helper-Funktionen für Arrays und Objekte und kann durch Tree-Shaking 
mit Hilfe von [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) verkleinert werden, indem nur verwendete Funktionen im finalen Export 
eingebunden werden.

Die von hubble verwendeten Plugins befinden sich in dem folgenden Ordner:
```
~/modules/@hubblecommerce/hubble/core/plugins
```

Mehr über Plugins im Kontext von NuxtJS: [Plugins in NuxtJS](https://nuxtjs.org/guide/plugins)


### Nicht genutztes JS identifizieren
Der folgende Befehl ermöglicht es, das JS der App zu analysieren, die [webpack](https://webpack.js.org/) erstellt.
Es wird eine visuelle Representation der Chunks, mit Hilfe des [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer), erstellt:

``` bash
npx nuxt build --analyze
```
NuxtJS unterstüzt die Analyse von __builds__, wodurch eine Konfiguration über die __`nuxt.config.js`__ möglich ist.
Mehr zur __`build`__ Eigenschaft in der offiziellen [NuxtJS API Dokumentation](https://nuxtjs.org/api/configuration-build/#analyze).
