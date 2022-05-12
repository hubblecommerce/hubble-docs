# Installation

## Prerequisites
This guide focuses on installing hubble PWA as a Nuxt.js module only,
so before moving on, make sure you meet the [requirements](/pwa/what/requirements.html) first.

## Install from scratch including fully configured Nuxt.js project

Install via npx so everything is set up correctly and ready to use. The script prompts you to enter the
[access data](https://docs.shopware.com/en/shopware-6-en/settings/saleschannel#api-access) for the api:
```sh
npx @hubblecommerce/launcher <project-name>
```
or enter your API url and key directly as additional parameters:
```sh
npx @hubblecommerce/launcher <project-name> <api-url> <api-key>
```

## Install to existing Nuxt.js project

1. Install hubble NuxtJs Module
```sh
npm i @hubblecommerce/hubble
```

2. Add module to nuxt.config.js
```js
modules: [
    ['@hubblecommerce/hubble']
],
```

::: warning
Module have to be registered in **modules**, not **buildModules** to make sure runtime configurations work.
:::


3. Edit configs in .env file
```sh
API_SW_ACCESS_KEY = ''
API_BASE_URL      = ''
```
::: tip
Read more about where to get the credentials in the [supported e-commerce platforms](/pwa/what/requirements.html#supported-e-commerce-platforms) section.
:::

## Build modes

### Development

```sh
npm run dev
```

### Production

```sh
npm run build
npm start
```