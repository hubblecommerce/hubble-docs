## Setup von hubble mit der hubble Data API als Backend Proxy
Für die Verwendung der hubble Data API als Proxy für ein Backend der Wahl sind folgende
Schritte notwendig:


## Requirements
* [Node.js](https://nodejs.org/en/) \(&gt;=10.20.1\) 
* __npm__ \(&gt;=6.14.4\)
* [NuxtJS Projekt](https://nuxtjs.org/)


## Installation und Konfiguration der hubble PWA
Das hubble Modul ist vefügbar als [npm](https://www.npmjs.com/) Package und kann über das Terminal via __`npm`__ heruntergeladen 
und als [Nuxt Modul](https://nuxtjs.org/guide/modules/) in NuxtJS Projekten eingebunden werden:

1. Install [NuxtJS](https://nuxtjs.org/guides/get-started/installation)
2. Install hubble NuxtJs Module 
```sh
npm i @hubblecommerce/hubble
```
3. Add module to nuxt.config.js
```js
buildModules: [
    ['@hubblecommerce/hubble']
],

/*
 ** hubble module configuration
 */
hubble: {
    apiType: process.env.API_TYPE
},
```

Um die Entwicklung zu beginnen wird eine __`~/.env`__ benötigt, in die Credentials wie API Keys und Auth Token
aus den Admin Bereichen der jeweiligen Services einzutragen sind.
Mehr zur .env unter: [Konfiguration](../pwa/configuration.md).

Es ist folgender Eintrag notwendig in der __`~/.env`__: 

```dotenv
API_TYPE = 'api'
```

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
