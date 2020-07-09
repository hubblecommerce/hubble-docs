# State Management in Hubble

Hubble utilizes Vuex as its main state management solution opting for the module structure to organize the store.
The store modules provide the components with data fetched from the API and any Read/Write state operations go through the store.
This means that components reference store __getters__, __actions__ and __mutations__ to get and set any data using map helpers from Vuex. 
This makes the store the single source of truth.
To provide some structure there are different folders for more shop specific functionalities which are based on the API type set in the __.env__.

```
hubble/core/store/module.js // common store
hubble/core/store/api/module.js  // store only available for api type 'api' (hubble API)
hubble/core/store/sw/module.js // store only available for api type 'sw' (Shopware 6)
```

If you need a more detailed description of how state is handled in Vuex and how the Vuex Store works in the context of Nuxt you can reference the following official resources:
* [Vuex store module](https://vuex.vuejs.org/) 
* [Vuex in Nuxt](https://nuxtjs.org/guide/vuex-store)



The store in Hubble is integrated via its own module with the name __@hubblecommerce__ which can be found at 
```
~/modules/@hubblecommerce/hubble/store
```
