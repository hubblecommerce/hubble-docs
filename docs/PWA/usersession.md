# User Sessions

User sessions in hubble have an important role in persisting the state of the shopping cart and saving the wishlist.
There are two layers of data storage and state persistence that work together: Saving cart and wishlist information to the Vuex store and storing/caching them to the browser storage.

##### Use Case: Shopware as your backend
Adding a product to the cart in the __`ProductDetailAddToCart`__ component dispatches an __action__ in the respective Vuex store module __`sw/modCart`__ with the first task to get a [sw-context-token](https://docs.shopware.com/en/shopware-platform-dev-en/sales-channel-api/sales-channel-cart-api?category=shopware-platform-dev-en/sales-channel-api) and then setting this token to the local Vuex store state.
The requirement to successfully getting a __`sw-context-token`__ back from the request is to send an auth token in the header. This auth token, that can be accessed in the Shopware admin area, serves as the API access key which needs to be set in the __`.env`__ file of the project.

* __Step 1__:
``` js
// .env
API_SW_ACCESS_KEY = <KEY-FROM-ADMIN-AREA>
```

* __Step 2__ (*simplified*):
``` js
// ~/modules/@hubblecommerce/hubble/core/store/modApi.js
let authToken = process.env.API_SW_ACCESS_KEY
let headers = {
    'Authorization': 'Bearer ' + authToken
    'sw-access-key': authToken
    'Content-Type': 'application/json'
}
```

Any further request after receiving a __`sw-context-token`__ from the request using the auth token/API access key from the __`.env`__ is made using this __`sw-context-token`__. 
This means that the __`sw-context-token`__ is the unique identifier for a user session. What this allows is that a shop visitor can add items to the __cart__ and remove items or increase and decrease quantities of products before even having to log in or register.



In the case the user leaves the browser window without logging in or registering, the cart and wishlist states are not lost for a limited time defined in the Vuex state because of the above mentioned second layer of state persistence: storing/caching the state in the browser.
Hubble enables this functionality using [localforage-nuxt](https://www.npmjs.com/package/localforage-nuxt) which is a module that implements [localForage](https://github.com/localForage/localForage) for NuxtJS.


::: tip
The __`sw-context-token`__ is saved as a cookie via [cookie-universal-nuxt](https://www.npmjs.com/package/cookie-universal-nuxt) whereas the __cart__ and __wishlist__ states are saved to the browser storage via [localForage](https://github.com/localForage/localForage).
:::

::: tip
The order of state updates and persisting that new state always follows this order: A call to an API endpoint is made using __`modApi/apiCall`__ which needs the auth token/API access key from the __`.env`__ and the __`sw-context-token`__ and saves a successful response first to the local Vuex store in __`sw/modCart`__ and then to the browser storage calling the __`sw/modCart/saveCartToStorage`__ action.
:::

* __Step 1__ (*simplified*):
``` js
// ~/modules/@hubblecommerce/hubble/core/store/sw/modCart.js
updateItem({commit, state, dispatch}, payload) {
    return new Promise((resolve, reject) => {
        // makes API patch request w/ payload object
        dispatch('swUpdateLineItem', { id: state.productToUpdate, qty: state.qtyToUpdate })
            .then((res) => {
                // updates vuex store state 
                commit('setCartItemsCount', state.cart.items_qty + payload.qty );

                // saves cart to browser storage via localForage
                dispatch('saveCartToStorage', { response: res }) 
            }
        }
}
```


* __Step 2__ (*simplified*):
``` js
// inside saveCartToStorage action
this.$localForage.setItem(state.cookieName, response)
```


