# Middleware

This section shows how hubble uses middleware in nuxt.js. If you need more information about what middleware in nuxt context is supposed to do, please read the [nuxt.js middleware docs](https://nuxtjs.org/guide/routing#middleware) first. 

They are two types of middleware in nuxt.js. A servermiddleware, which only is being executed serverside. And a router middleware, which is being executed before a route is called once serverside and clientside everytime you navigate through the vue-router.  

hubble primarily handles router middleware to call the api via store modules and fetch the data needed for the page or layout to be rendered.

## Override Middleware

If you like to edit an existing middleware you need to deactivate this specific middleware via the module configuration in nuxt.config.js. 

After that you simply copy the original hubble core file into your /middleware directory and edit it as you like.  



