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