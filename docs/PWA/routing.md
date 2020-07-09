# Routing & Data Flow

As Hubble's architecture is based on Nuxt, the creation of a routing table works through following the directory structure of Nuxt.

As the __pages__ directory is the reference point for the router configuration, creating files in this directory get automatically configured as routes in the application.

There are 2 files that are special:
* The __pages/index.vue__ which is the entry point or root of the application
```
https://<DOMAIN-NAME>.com/
```
* The ___.vue__ which handles all dynamic routes.
```
https://<DOMAIN-NAME>.com/:productID
```

Both of these have a layout defined which is used as the surrounding 'default markup' in which the actual content from the route is embedded into.
To learn more about available layouts in Hubble please refer to the __Layouts__ section of the documentation.


Inspecting the __index.vue__ further a re-occurring pattern throughout the pages directory can be identified:
Besides defining a __layout__, there is also always the __middleware__ option which is how data for pages is loaded in.
The middleware is responsible for requesting data from the store and setting data from cookies if available.
Because the store is the single source of truth all data requests need to follow the Vuex pattern of dispatching actions to get data from API endpoints or using the state object directly or indirectly via getters.

To learn more about state management in Hubble please refer to the __State Management__ section of the documentation.


