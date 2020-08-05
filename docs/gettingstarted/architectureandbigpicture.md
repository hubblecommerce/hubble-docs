# Architektur und Überblick

## Die hubble PWA: ein Frontend für alle

Die hubble PWA ist eine Frontend-Lösung für eCommerce Plattformen.
Ob Magento, Magento 2, Shopware oder xt:Commerce, es können die gleichen hubble
UI Komponenten und Funktionalitäten verwendet werden. Dabei existieren bereits alle gängigen Shopseitenarten,
wie z.B. Kategorien, Produktdetails und Warenkorb.
Zudem können nicht nur die bestehenden hubble Komponenten verwendet werden, sondern
auch leicht eigene entwickelt werden: hubble basiert auf [NuxtJS](https://nuxtjs.org/), womit die Komponenten
Entwicklung in [Vue.js](https://vuejs.org/) stattfindet.
Da NuxtJS stark auf die Verwendung der Ordnerstruktur ausgelegt ist, wird für eine Erweiterung
primär nur das Anlegen der Dateien im jeweils passenden Ordner benötigt. 
Außerdem lassen sich in Kombination mit [Vuex](https://vuex.vuejs.org/) flexible Benutzeroberflächen erstellen, bei denen die
Komponenten nach belieben wiederverwendet, angepasst und im Nachhinein umpositioniert werden können.
Denn die Daten, die Komponenten anzeigen werden in hubble im Vuex Store verarbeitet und verwaltet.
Dadurch gibt es eine eindeutige Trennung zwischen Präsentationselementen und State Verwaltung.
Benutzer Interaktionen mit den visuellen Elementen führen also meist zu einer Weiterleitung an den
Vuex Store, der bei Bedarf API Requests durchführt und die Daten formatiert und aufbereitet für die Komponenten.
Dabei ist all dies bereits vorkonfiguriert und bereit zu Verwendung.
Zusätzlich zu den Vorkonfigurationen, die Teil von NuxtJS Projekten sind, existieren auch weitere Module
und Einstellungen, die durch hubble hinzugefügt wurden. Für eine komplette Liste der aktuell im Projekt verwendeten
Dependencies kann die [~/package.json](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/master/package.json)
referenziert werden. Bestehende Konfigurationsoptionen dazu können in der 
[~/nuxt.config.js](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/master/nuxt.config.js) eingesehen
und angepasst werden.

Für die Anbindung zum Shopsystem gibt es in hubble aktuell zwei Möglichkeiten:
Zum einen die hubble Data API und zum anderen die jeweiligen Shopware API Endpunkte.
Beide Varianten haben dabei einen vergleichbaren Ansatz: Die API führt die Kalkulationen durch und liefert
ein Ergebnis, welches im Frontend für die Anzeige angepasst und letztendlich angezeigt wird. 

Die hubble Data API verwendet eine Kombination aus [Laravel](https://laravel.com/)
und [Elasticsearch](https://www.elastic.co/de/elasticsearch/).