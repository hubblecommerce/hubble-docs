# Lazy Loading
### Optimierungstechniken in hubble

In hubble werden Komponenten, Middleware und Plugins unter Anwendung von Lazy Loading Techniken implementiert.
Dies gewährleistet, dass beispielweise kein JavaScript für den Checkout-Prozess bereits auf der Shop-Startseite geladen wird und ermöglicht somit kurze Rendering Zeiten.


Der folgende Befehl ermöglicht es, die Chunks zu analysieren, die [webpack](https://webpack.js.org/) erstellt.
Es wird eine visuelle Representation dieser, mit Hilfe des [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer), erstellt:

``` bash
npx nuxt build --analyze
```
NuxtJS unterstüzt die Analyse von __builds__, wodurch eine Konfiguration über die __`nuxt.config.js`__ möglich ist.
Die [NuxtJS API Dokumentation](https://nuxtjs.org/api/configuration-build/#analyze) zur __`build`__ Eigenschaft kann referenziert werden, um mehr darüber zu erfahren.

::: tip
__Bundles sind bereits optimiert in hubble__. Optimale Chunkgrößen und die Zusammenfassung geteilter Logik sind konfiguriert durch das Feld [optimization](https://nuxtjs.org/api/configuration-build/#optimization) in der __`nuxt.config.js`__. 
:::


#### Lazy Loading JavaScript
##### Einbinden von Vue Komponenten

Komponenten, die nur durch eine bestimmte Voraussetzung eingebunden werden, können nachgeladen werden.
Folgende zwei Schritte sind dazu notwendig:


1. Entfernung des Imports der Komponente 
2. Anpassung der Auflistung der eingebundenen Komponenten:
``` js
components: {
    <COMPONENT-NAME>: () => import('~/components/<COMPONENT-PATH>')
}
```


##### Einbinden von Middleware
Für die Einbindung von Middleware, die nicht von allen Seiten verwendet wird, eignet sie die Verwendung von [anonymer Middleware](https://nuxtjs.org/api/pages-middleware/#anonymous-middleware).
In hubble wird folgende Syntax verwendet für anonyme Middleware:

* __Schritt 1__: Exportieren als anonyme Funktion

``` js
// ~/modules/@hubblecommerce/core/anonymous-middleware/<MIDDLEWARE-FILENAME>.js
export default function ({ isHmr, store, error }) {
    //...
}
```

* __Schritt 2__: Hinzufügen in relevanter Komponente in __`~/pages/`__:

``` js
// ~/pages/<NAME-OF-PAGE>.js
import <MIDDLEWARE-FILENAME> from '@hubblecommerce/hubble/core/anonymous-middleware/<MIDDLEWARE-FILENAME>'
```

* __Schritt 3__: Hinzufügen zum __`middleware`__ array:
``` js
// ~/pages/<NAME-OF-PAGE>.js
// ...
middleware: [
    <MIDDLEWARE-FILENAME>
]
```



##### Importieren von Plugins
Plugins ermöglichen es externe Vue Bibliotheken und Module leicht einzubinden und diese in hubble global zur Verfügung zu stellen:
Ein gutes Beispiel für Funktionalität, die global verfügbar ist, ist die __`FlashMessages`__ Komponente.
Durch das Einbinden dieser in der __`~/modules/@hubblecommerce/hubble/core/plugins/global.js`__ , ist es nicht mehr notwendig in jedem Layout ein __`import`__ Statement für die __`FlashMessages`__ Komponente hinzuzufügen.

Hubble verwendet nicht nur eigene Vue.js Plugins, sondern auch Plugins von Drittanbietern, wie beispielsweise das Formular Validationsframework [VeeValidate](https://logaretm.github.io/vee-validate/). 
Da nicht alle Plugins auf allen Seiten in Verwendung sind, ist es nicht effizient diese global einzubinden. Aus diesem Grund ist bei hubble die Plugin Initialisierung nicht 
in dem Modulordner __`~/modules/@hubblecommerce/hubble/core/plugins/`__. Stattdessen wird das jeweilige Plugin in der __`created`__ Hook der Komponente initialisiert.
 
``` js
// after importing the plugin
created () {
    Vue.use(<NAME-OF-PLUGIN>);
}
```

Desweiteren werden nicht alle von Drittanbietern zur Verfügung gestellten Funktionalitäten in hubble benutzt. 
Aus diesem Grund, ist es wichtig Tree-Shaking für Vendor Bibliotheken zu aktivieren, um die Bundlegröße zu verkleinern.
Zum Beispiel, verfügt die [Lodash Bibliothek](https://lodash.com/docs/) über viele Helper-Funktionen für Arrays und Objekte und kann durch Tree-Shaking 
mit Hilfe von [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) verkleindert werden, indem nur verwendete Funktionen im finalen Export eingebunden werden.

Um mehr über Plugins im Kontext von NuxtJS zu lernen, kann die offizielle Dokumentation für [Plugins in NuxtJS](https://nuxtjs.org/guide/plugins) referenziert werden.

Die von hubble verwendeten Plugins befinden sich in dem folgenden Ordner im hubble Modul:
```
~/modules/@hubblecommerce/hubble/core/plugins
```







