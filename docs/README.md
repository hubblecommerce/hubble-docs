# Einführung

> Hoch performante Progressive Web App für jede gängige E-Commerce Plattform auf Basis von [Nuxt.js](https://nuxtjs.org/).

## Feature

✔ Shop Integration mit Magento, Magento 2, Shopware, xt:Commerce, etc.  
✔ Enthält alle gängigen Shop Seitenarten (Kategorie, Detailansicht, Warenkorb, Zur Kasse, etc.)  
✔ Exzellente Google Lighthouse Ergebnisse in allen Audits  
✔ Toolbox / Framework zum Erstellen eigener Shop Frontends 

## Links

* [Demo](https://demo.hubblecommerce.io/)
* [hubblecommerce.io](https://www.hubblecommerce.io)
* [GitHub](https://github.com/hubblecommerce/hubble-frontend-pwa)

## Contribution

Diese Dokumentation wurde mit [VuePress](https://vuepress.vuejs.org/) erstellt.
Um diese zu erweitern wird eine lokale Version von der Dokumentation benötigt. 
Dafür sind folgende Schritte notwendig:

__1__: Voraussetzung ist [Node.js](https://nodejs.org/en/) >= 8.6.

__2__: Erstellung einer lokalen Kopie des Repositories über __`git clone`__
``` bash
git clone https://github.com/hubblecommerce/hubble-docs.git
```

__3__: Installation der Dependencies
``` bash
npm install
```

__4__: Starten der lokalen Umgebung über den Skriptbefehl aus der __`~/package.json`__ 
``` bash
npm run docs:dev
```
Dieser Befehl startet einen lokalen Server und die lokale Version der Dokumentation kann nun 
unter der im Terminal angegebenen URL eingesehen werden.

__5__: Editieren und Hinzufügen von Seiten

Seiten bestehen aus Markdown Dokumenten und enthalten einige VuePress spezifische Erweiterungen.
Beispielsweise gibt es die Möglichkeit Übersetzungen für Seiten anzulegen
(einsehbar in der VuePress Dokumentation unter [Internationalization](https://vuepress.vuejs.org/guide/i18n.html)) oder eigene Vue Komponenten
anzulegen (einsehbar in der VuePress Dokumentation unter [Using Vue in Markdown](https://vuepress.vuejs.org/guide/using-vue.html)).

Bevor editiert wird sollte ein neuer Branch angelegt werden. Der folgende Befehl erstellt und wechselt den Branch:
``` bash
git checkout -b <NAME-OF-NEW-BRANCH>
```

Neu hinzugefügte Seiten müssen in der __`~/docs/.vuepress/config.js`__ an entsprechender
Stelle eingetragen werden. Beispielsweise, das Hinzufügen eines Unterpunktes zu __PWA__:

``` js
// ~/docs/.vuepress/config.js
'/PWA': [
    {
        // ...
        children: [
            // ...
            '<NAME-OF-CHAPTER>'
        ]
    }
]
```
Details zu der Funktionsweise der Konfiguration in VuePress sind in der [offiziellen
Dokumentation](https://vuepress.vuejs.org/) einsehbar.

__6__: Erstellung eines Pull Requests

Eine detaillierte Ausführung zum Pull Request Prozess gibt es in der GitHub Dokumentation unter
[Creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
