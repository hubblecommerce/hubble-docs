# Module

## Basics

hubble core code for frontend is shipped as a module and installed as a dependency for nuxt.js. Further infos about [modules](https://nuxtjs.org/guide/modules) you can read in official nuxt.js docs.

## Configuration

You can find all configurations considering the hubble module in nuxt.config.js in your root folder:

{% code-tabs %}
{% code-tabs-item title="nuxt.config.js" %}
```text
/*
** Nuxt.js modules
*/
modules: [
    '~/modules/hubble/module'
],
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Structure

The structure of the hubble module is based on the nuxt.js [directory structure](https://nuxtjs.org/guide/directory-structure). 

{% page-ref page="components.md" %}

{% page-ref page="stores.md" %}

{% page-ref page="middlewares.md" %}

{% page-ref page="plugins.md" %}

{% page-ref page="assets.md" %}

