# Architektur und Überblick

## Die hubble PWA - Ein Frontend für Alle

Die hubble PWA ist eine Frontend-Lösung für die gängigen eCommerce Plattformen und indivudelle Architekturen.

Ob Magento, Magento 2, Shopware oder xt:Commerce, es können die gleichen hubble UI Komponenten und Funktionalitäten verwendet werden. hubble stellt hierfür bereits die gängigen Funktionen und Bedienelemente bereit: CMS, Kategorie, Suche Produktseite, Warenkorb, Checkout und Kundenkonto.

Um einen hohen Individualisierungsgrad zu erreichen, können nicht nur die bestehenden hubble Komponenten verwendet werden, sondern auch leicht eigene Funktionen entwickelt werden: hubble basiert auf [NuxtJS](https://nuxtjs.org/). Der Entwickler arbeitet somit in weit verbreiteten Technologien und dem Framework [Vue.js](https://vuejs.org/) und kann somit auf umfassende Ressourcen zurückgreifen. 

In Kombination mit [Vuex](https://vuex.vuejs.org/) flexible Benutzeroberflächen erstellen, bei denen die Komponenten nach belieben wiederverwendet, angepasst und je nach Anforderung umpositioniert werden können.

Sämtliche Daten, die Komponenten anzeigen werden in hubble im Vuex Store verarbeitet und verwaltet. Dadurch ergibt sicht eine eindeutige Trennung zwischen Präsentationselementen und State Verwaltung. Benutzerinteraktionen führen zu einer Weiterleitung an den Vuex Store, der bei Bedarf API Requests durchführt, die zurückerhaltenden Daten formatier und für die Komponenten aufbereitet.

hubble ist modular aufgebaut und nutzt einerseits eigene Module als auch externe. Eine komplette Liste der aktuell im Projekt verwendeten Dependencies kann der [~/package.json](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/master/package.json) entnommen werden. 

Bestehende Konfigurationsoptionen dazu können in der [~/nuxt.config.js](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/master/nuxt.config.js) eingesehen und angepasst werden.

Wie erwähnt, ist hubble ein Frontend. Somit benötigt es stets ein Backend, welches Daten liefert und annimmt. 

Für die Anbindung zu Shopsystemen stehen in hubble aktuell zwei Möglichkeiten zur Verfügung:

Zum einen kann die jeweiige API des Shopsystems verwendet werden. Für Shopware 6 stellt hubble bereits eine direkte Integration der wesentlichen Endpunkte bereit.

Für komplexe Anforderungen oder die Anbindung individueller Backends, stellen wir mit der hubble DataAPI sowie der hubble PaymentAPI zwei Lösungen mit hoher Flexibät zur Verfügung. Die DataAPI sowie PaymentAPI verwenden eine Kombination aus [Laravel](https://laravel.com/) und [Elasticsearch](https://www.elastic.co/de/elasticsearch/).

Beide Varianten haben dabei einen vergleichbaren Ansatz und werden in der hubble PWA abstrahiert und gleichartig behandelt. 
