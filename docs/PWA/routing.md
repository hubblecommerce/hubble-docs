# Routing & Data Flow

As hubble's architecture is based on NuxtJS, the creation of a routing table works through following the [directory structure of Nuxt](https://nuxtjs.org/guide/directory-structure).


There are 2 files that are special:
* The __`~/pages/index.vue`__ which corresponds to the root route:
```
https://<DOMAIN-NAME>.com/
```
* The __`_.vue`__ which handles all dynamic routes:
```
https://<DOMAIN-NAME>.com/:productID
```

Both of these have a layout defined which is used as the surrounding 'default markup' in which the actual content from the route is embedded into.
To learn more about available layouts in hubble please refer to the [Layouts](layouts.md) section of the documentation.


Inspecting the __`index.vue`__ further a re-occurring pattern throughout the __`~/pages`__ directory can be identified:
Besides defining a __`layout`__, there is also always an array for the __`middleware`__ option.

``` js{5,11}
// ~/pages/index.vue 
export default {
    name: 'Index',
    layout: 'hubble',
    middleware: [
        'apiIndexRoute',
        'apiAuthenticate',
        'apiLocalization',
        'apiResourceMenu',
        'trackClickPath'
    ],
    // ...
}
```

The task of the __middleware__ is to initialize the Vuex store state by dispatching the needed __`actions`__ that are responsible for requesting data from API endpoints.

::: tip
To initialize additional state for specific pages define and add new __middleware__ to the respective page and reference Vuex store modules for any read/write operations.
:::

#### An Example
The menu is shown on all (non-checkout) pages + the __`~/pages/checkout/cart.vue`__. This means that all those pages list the middleware __`apiResourceMenu`__ because it is responsible for initiating the request of the needed menu data.

#### Main Steps (_simplified_):
* __Step 1__: __`~/pages/_.vue`__
``` js{7}
// ~/pages/_.vue
export default {
    name: 'RouteResolver',
    layout: 'hubble',
    middleware: [
        // ...
        'apiResourceMenu',
        // ...
    ],
    // ..
}
```

* __Step 2__: __`~/modules/@hubblecommerce/hubble/core/middleware/apiResourceMenu.js`__
``` js
// ~/modules/@hubblecommerce/hubble/core/middleware/apiResourceMenu.js
// ...
store.dispatch('modApiMenu/getMenu', {})
// ...
```

* __Step 3__: __`~/modules/@hubblecommerce/hubble/core/store/sw/modApiMenu.js`__

Note that this step is specific to Shopware and that there is an equivalent __`getMenu`__ action for usage with the [hubble API](../api) at __`~/modules/@hubblecommerce/hubble/core/store/api/modApiMenu.js`__.
``` js{3,5,9,14}
// ~/modules/@hubblecommerce/hubble/core/store/sw/modApiMenu/getMenu.js
actions: {
    async getMenu({ commit, state, dispatch }, payload) {
        return new Promise(function(resolve, reject) {
            dispatch('apiCall', {
                action: 'get',
                tokenType: 'sw',
                apiType: 'data',
                endpoint: '/sales-channel-api/v1/category?limit=500&associations[seoUrls][]'
                }, { root: true })
                    .then((response) => {
                        dispatch('mappingMenu', response.data.data)
                            .then((res) => {
                                commit('setDataMenu', res);
                            });

                         resolve(response);
                    })
        });
    }
} 
```


* __Step 4__: __`~/modules/@hubblecommerce/hubble/core/store/modApi.js`__
``` js
// ~/modules/@hubblecommerce/hubble/core/store/modApi.js
apiCall: {
    root: true,
    async handler ({state, rootState}, payload) {
        // ...
        return new Promise(function(resolve, reject) {
            axios({
                method: payload.action,
                url: baseUrl + payload.endpoint,
                headers: headers, // includes sw-context-token if api type === 'sw'
                params: payloadParams, // GET params
                data: payloadData // POST data
            }).then((response) => {
                // ...
                resolve(response);
            })
            // ...
        })
    }
}

```

* __Step 5__: __`layouts/hubble.vue`__

After the API response is set to the Vuex state it can be accessed in the __`layouts/hubble.vue`__:

Now depending on the current viewport either the component __```<the-mobile-menu/>```__ or the __```<the-mega-menu/>```__ are being rendered.

``` html
<!-- ~/layouts/hubble.vue -->
<the-mega-menu v-if="!isEmpty(menu)" :data-items="menu" />
```

Note that the mapped state __`dataMenu`__ needs to be set to the __`menu`__ value that is passed as the component prop above.

``` js
// ~/layouts/hubble.vue
computed: {
   ...mapState({
        dataMenu: state => state.modApiMenu.dataMenu
   })
}
```

##### Learn More
To learn more about state management in hubble please refer to the [State Management](statemanagement.md) section of the documentation.


