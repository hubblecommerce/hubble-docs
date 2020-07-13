# Lazy Loading
#### Optimizations through Lazy Loading

Hubble uses [Lighthouse](https://github.com/GoogleChrome/lighthouse) to audit its performance and optimized components are created accordingly.
There are different aspects that are influencing the final Lighthouse scores and metrics that are evaluated by it:
improving how images, components, plugins and middleware are loaded in, especially on initial render, will improve the score significantly.
Improving for initial render means, that users of the shop are waiting less time for the requested site until content appears on the screen when first visiting the site.
Important techniques to achieve faster render times on initial load are based off the concept of only loading what is really necessary at that point in time.
Meaning there is no need to load all of the JavaScript written for pages nested 5 navigation levels deep.
An example: If the initially requested route is just the landing page, there is no need to load all of the checkout logic with it.
This is known as lazily loading assets.

To analyze how each optimization technique is affecting the project the following command will create a visual representation of the size of the chunks [webpack](https://webpack.js.org/) created via the [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer):

``` bash
npx nuxt build --analyze
```
NuxtJS has built-in support for build analysis that can also be configured via the __`nuxt.config.js`__. Please refer to the [NuxtJS API Documentation](https://nuxtjs.org/api/configuration-build/#analyze) on the __`build`__ property to learn more about it.

Furthermore hubble comes already configured with bundle optimization: Optimal chunk sizes and preventing duplicates between chunks is enabled via the [optimization](https://nuxtjs.org/api/configuration-build/#optimization) field in the __`nuxt.config.js`__.


#### Lazy Loading Javascript
##### Dynamically Importing Vue Components
An optimal use case to lazily load your Vue components is when they are only displayed based on a condition. 
There are only two steps needed to import dynamically:
1. Remove the component from the __import__ section 
2. Change the syntax inside the __`components`__ field of the __`script`__ section to the following:
``` js
components: {
    <COMPONENT-NAME>: () => import('~/components/<COMPONENT-PATH>')
}
```


##### Dynamically Importing Middleware
As some middleware is only used for some of the pages but not all, including all in the initial load is not efficient.
NuxtJS provides an easy solution to loading middleware only for specific pages which it calls __anonymous middleware__.
Anonymous middleware in hubble works through exporting anonymous functions, importing these in the respective pages & adding them to the middleware array:

``` js
// ~/modules/@hubblecommerce/core/anonymous-middleware/<MIDDLEWARE-FILENAME>.js
export default function ({ isHmr, store, error }) {
    //...
}
```




##### Dynamically Importing Plugins

The possibility to add plugins allows to easily add external Vue libraries and modules and make these available in Vue apps globally.
A good example for functionality needed globally is the __`FlashMessages`__ component. Including it in the __`~/modules/@hubblecommerce/hubble/core/plugins/global.js`__ removes the step to explicitly having to import it in each layout.

Hubble includes not only its own Vue.js plugins but also third party plugins like the validation framework [VeeValidate](https://logaretm.github.io/vee-validate/).
As the included plugins are not used by all pages it is more efficient to not make these available globally. Therefore the plugin initialization is not in the modules __`/plugins`__ folder but in the __`created`__ hook of the pages and components that reference functionalities of the respective plugin and imported individually.
``` js
created () {
    Vue.use(<NAME-OF-PLUGIN>);
}
```

Moreover not all of the provided utilities are used inside hubble. For this reason enabling tree-shaking for vendor libraries was an important step in reducing the bundle size. 
As an example, the [Lodash library](https://lodash.com/docs/) includes many helpful array and object helper functions and tree-shaking it with the help of [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) reduces the bundle size by only including the used functions in the final export.


To learn more about plugins in the context of NuxtJS please refer to the official documentation at [Plugins in NuxtJS](https://nuxtjs.org/guide/plugins).

Plugins used in Hubble can be found in the respective folder under the hubble module:
```
~/modules/@hubblecommerce/hubble/core/plugins
```







