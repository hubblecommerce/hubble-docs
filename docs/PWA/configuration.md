# Configuration

##### General

Important values to establish successful connections with API endpoints like API keys are saved in the __`.env`__ file of the project as environment variables. 
To provide these values to the application context hubble uses [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module) which makes access to __`.env`__  variables possible through referencing __`process.env`__.



But as the __`.env`__ file also contains sensitive information which should not be exposed to the client values that are save are already whitelisted inside the __`nuxt.config.js`__  under the __`only`__  option of the __dotenv__ module which is part of the __`buildModules`__.

* __Step 1__: Add values related to API interations to __`.env`__
``` js
// .env
API_TYPE = 'sw' // can be 'sw' or 'api'
API_SW_ACCESS_KEY = <KEY-FROM-ADMIN-AREA>
// ...
```

* __Step 2__: Whitelist save values in __`nuxt.config.js`__
``` js
// nuxt.config.js
buildModules: [
    ['@nuxtjs/dotenv', {
        only: [
            'API_SW_ACCESS_KEY',
             // ...
        ]
    }]
]
```

* __Step 3__: Access values referencing __`process.env`__ 
``` js
// // ~/modules/@hubblecommerce/hubble/core/store/modApi.js
let authToken = process.env.API_SW_ACCESS_KEY
```

The starter project comes with an __`.env_example`__ file as a reference for which keys you need or may need to establish, for example, a connection with the API to save the customer cart. In the example of Shopware this only works providing an auth token also known as the API access key which should be saved to the respective __`.env`__ variable, in this case the __`API_SW_ACCESS_KEY`__. 
To read more about how the auth token is used and how user sessions specifically work please refer to the section [User Sessions](./usersession.md) of the documentation.

Also the __`.env`__ file is added to the __`.gitignore`__ file to prevent adding sensitive information to version control. 

::: warning
It is important to make sure that only values that are save to be exposed on the client are whitelisted in the __`nuxt.config.js`__.
:::


##### hubble Core Module

Because hubble core code is shipped as a [NuxtJS module](https://nuxtjs.org/guide/modules) and installed as a dependency configurations to it are made inside the __`nuxt.config.js`__. 
The default configuration is ready for use after editing the __`.env`__ file according to the guidelines described above.


``` js
// nuxt.config.js

// hubble module default configuration
hubble: {
    apiType: process.env.API_TYPE,
    deactivateStores: [],
    deactivatePlugins: [],
    deactivateMiddleware: [],
    useTheme: false,
    gtmId: process.env.GOOGLE_TAG_MANAGER_ID,
    payone: {},
    amazonPay: {
        sandbox: true
    }
},
// ...
```