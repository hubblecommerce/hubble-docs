# Plugins

hubble comes with own vue.js plugins and uses some common useful third party vue.js plugins as well. If you like to know more about what a plugin in nuxt.js context means, please read the [nuxt.js pluins docs](https://nuxtjs.org/guide/plugins#vue-plugins).

## Override Plugins

If you like to build your shop frontend without a specific plugin hubble uses, you can deactivate this specific plugin via the module configuration in nuxt.config.js. And if you like to add your own plugin you can do it simply the way it is [documented by nuxt.js](https://nuxtjs.org/guide/plugins#vue-plugins). 

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
            deactivatePlugins: []
        }
    ]
]
```
{% endcode-tabs-item %}
{% endcode-tabs %}

