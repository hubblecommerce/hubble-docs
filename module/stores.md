# Stores

Stores are handled via vuex store module. If you are unfamiliar with this topic, please read the official [vuex store module](https://vuex.vuejs.org/) documentation first and then the nuxt.js doc for [vuex](https://nuxtjs.org/guide/vuex-store).

In general hubble uses the store modules to provide the components with the fetched data from the api. So components can get, set and mutate this data as they need it.

## Override Store Modules

If you like to edit an existing store module you need to deactivate this specific module via the module configuration in nuxt.config.js. 

{% code-tabs %}
{% code-tabs-item title="nuxt.config.js" %}
```text
/*
** Nuxt.js modules
*/
modules: [
    [
        '~/modules/hubble/module',
        {
            // hubble module config
            deactivateStores: []
        }
    ]
]
```
{% endcode-tabs-item %}
{% endcode-tabs %}

After that you simply copy the store file into your /store directory and edit it as you like. 

