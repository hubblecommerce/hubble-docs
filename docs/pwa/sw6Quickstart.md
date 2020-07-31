# Shopware 6 Quickstart

Following sections helps you to quickly setup hubble as a PWA for your Shopware 6.

## Overview

The following installation guide was tested on MacOS and Linux environments. The git-repo is shipped with a configured version of nuxt.js with hubble installed as a module on it. 

## Requirements

* Node.js \(&gt;=8.0.0\)
* NPM \(&gt;=6.0.0\)
* [Shopware 6 API Plugin](https://github.com/hubblecommerce/shopware6-api-plugin)
* [Shopware 6 Payone Plugin](https://store.shopware.com/payon69044615910f/payone-payment-fuer-shopware-6.html)


## Installation

The installation of the frontend is pretty straight forward. Get the code from github, create the required .env file from the .env\_example file and install via npm. After installation is finished you can start up the application in dev mode \(npm run dev\) or in production mode \(npm run build -&gt; npm start\).

```bash
git clone git@github.com:hubblecommerce/hubble-frontend-pwa.git
cd hubble-frontend-pwa
cp .env_example .env
npm install 
```

## Configuration

### PWA Configuration
Configure the settings in the .env file. For the simple Shopware 6 connection set the following values. 
It is important to use the access **key of a storefront** channel and not a headless channel, because 
at the moment Shopware 6 doesn't provide urls on headless channels.

```dotenv
API_TYPE          = 'sw'
API_SW_ACCESS_KEY = 'ENTER_YOUR_ACCESS_KEY_HERE'
API_BASE_URL      = 'http://shopware.local'
```


## Start Application

```bash
npm run dev
```

Now you can access your app via http://localhost:3336/