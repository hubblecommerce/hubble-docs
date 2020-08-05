---
pageClass: theguide
---

# Setup / Installation

## Setup von hubble mit Shopware 6 als Backend

Abweichend von anderen Shopsystemen als Backendlösung, bietet hubble für Shopware 6 als Backend, eine separate Lösung:
Shopware's [Sales Channel](https://docs.shopware.com/en/shopware-platform-dev-en/sales-channel-api) 
und [Store API](https://docs.shopware.com/en/shopware-platform-dev-en/store-api-guide)'s werden direkt
über das __`@hubblecommerce`__ Modul angesprochen.


## Overview

Das Repository besteht aus einer vorkonfigurierten [NuxtJS](https://nuxtjs.org/) Version,
die hubble als NuxtJS Modul im __`~/modules/`__ Ordner enthält:
Das [@hubblecommerce](https://github.com/hubblecommerce/hubble-frontend-pwa/tree/master/modules/%40hubblecommerce)
Modul.

__Hinweis:__ Die folgenden Installationsanweisungen wurden für MacOS und Linux Umgebungen getestet.
 

## Requirements

* [Node.js](https://nodejs.org/en/) \(&gt;=10.20.1\) - enthält __npm__
* __npm__ \(&gt;=6.14.4\)
* [Shopware](https://docs.shopware.com/en/shopware-platform-dev-en/system-guide/system-installation-guides)
* [Shopware 6 API Plugin](https://github.com/hubblecommerce/shopware6-api-plugin)
* [Shopware 6 Payone Plugin](https://store.shopware.com/payon69044615910f/payone-payment-fuer-shopware-6.html)


## Installation und Konfiguration der hubble PWA

Der Code der hubble PWA befindet sich auf GitHub und kann über das Terminal heruntergeladen werden:

``` bash
git clone git@github.com:hubblecommerce/hubble-frontend-pwa.git
cd hubble-frontend-pwa
cp .env_example .env
npm install 
```

Um die Entwicklung zu beginnen wird eine __`~/.env`__ benötigt, in die Credentials wie API Keys und Auth Token
aus den Admin Bereichen der jeweiligen Services einzutragen sind.
Im Projekt existiert dafür die __`~/.env_example`__ als Referenz für mögliche Einträge. Außerdem enthält die Dokumentation 
den Abschnitt [Konfiguration](../pwa/configuration.md) mit einer Beschreibung zur korrekten
und sicheren Verwendung der __`~/.env`__.

Im Zusammenhang mit Shopware sind mindestens folgende Einträge notwendig:

```dotenv
API_TYPE          = 'sw'
API_SW_ACCESS_KEY = 'ENTER_YOUR_ACCESS_KEY_HERE'
API_BASE_URL      = 'http://shopware.local'
```
Dabei ist zu beachten, dass der __`API_SW_ACCESS_KEY`__ für den Storefront Verkaufskanal eingetragen wird und __nicht__ für den
Headless Verkaufskanal, denn die Headless Variante liefert zur Zeit keine SEO URLs.

<ImageComponent :src="$withBase('/saleschannelaccess.png')" />


## Starten der hubble PWA im Entwicklungsmodus
``` bash
npm run dev
```
Das hubble Frontend ist nun unter __`http://localhost:3336/`__ einsehbar.


## Starten der hubble PWA im Production Modus
``` bash
npm run build
npm run start
```



## Setup von hubble mit der hubble Data API als Backend Proxy
Für die Verwendung der hubble Data API als Proxy für ein Backend der Wahl sind folgende
Schritte notwendig:


## Requirements
* [Node.js](https://nodejs.org/en/) \(&gt;=10.20.1\) - enthält __npm__
* __npm__ \(&gt;=6.14.4\)


## Installation und Konfiguration der hubble PWA
Der Code der hubble PWA befindet sich auf GitHub und kann über das Terminal heruntergeladen werden:

``` bash
git clone git@github.com:hubblecommerce/hubble-frontend-pwa.git
cd hubble-frontend-pwa
cp .env_example .env
npm install 
```

Es ist folgender Eintrag notwendig in der __`~/.env`__: 

```dotenv
API_TYPE = 'api'
```