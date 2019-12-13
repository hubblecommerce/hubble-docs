# PWA

hubble core code for frontend is shipped as a module and installed as a dependency for nuxt.js. Further infos about [modules](https://nuxtjs.org/guide/modules) you can read in the official nuxt.js docs.

## Configuration

You can find all configurations considering the hubble module in nuxt.config.js in your root folder:


```json5
/*
** Nuxt.js modules
*/
modules: [
    '~/modules/hubble/module',
    {
        // hubble module config
        deactivateStores: [],
        deactivatePlugins: [],
        deactivateMiddleware: [],
        useTheme: true
    }
],
```

## Structure

The structure of the hubble module is based on the nuxt.js [directory structure](https://nuxtjs.org/guide/directory-structure). 

[Components](/Module/components.md) 

[Stores](/Module//stores.md)
 
[Middleware](/Module//middlewares.md)
 
[Plugins](/Module//plugins.md)

[Assets](/Module//assets.md) 

