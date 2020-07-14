# Layouts

Pages can define a __`layout`__ property which will import a set of components that form a frame for the page content.
Meaning the content of [pages](pagetypes.md) is embedded into the defined layout.

``` js
// ~/pages/index.vue
export default {
    name: 'Index',
    layout: 'hubble'
    // ...
}
```

The default layout used in hubble can be found under
```
~/layouts/hubble.vue
```
which all components except (almost all) __checkout__ pages use. The __`CheckoutCart`__ at __`~/pages/checkout/cart.vue`__ is an exception that uses the default layout as it still allows to continue shopping or editing the existing shopping cart.
This means that almost all pages have the same navigation at the top with access to, for example, the wishlist, user account and search field.

::: tip
Any component that should be visible on all (non-checkout) pages should be included in the respective layout that is used as the default.
In the case of hubble this is the __`~/layouts/hubble.vue`__.
:::

##### An Example
From adding products to the wishlist to changing billing information there is always the possibility for errors, for example, due to network connection loss.
To provide users with feedback each component can push a flash message onto the flash messages array which gets displayed by the __`<flash-messages/>`__ component included in all layout files.




### Distraction Free Layouts

As mentioned above most but not all pages use the __`hubble`__ layout at __`~/layouts/hubble.vue`__. 
To provide a distraction free checkout experience the layouts __`hubble_light`__ and __`hubble_express`__ are used for pages related to __checkout__.
Distraction free means that less components are included in the layout so the checkout process is the main and most prominent action when customers visit checkout related pages.

#### Layouts checkout pages use:
| hubble | hubble_light | hubble_express | 
| --- | --- | --- |
| cart.vue | login.vue | amazon.vue |
|  | payment.vue | shopware-guest.vue |
|  | success.vue | shopware-onepage.vue |
|  | summary.vue | shopware-success.vue |



### Components the layouts include:

| hubble | hubble_light | hubble_express | 
| --- | --- | --- |
| LayoutWrapper | LayoutWrapper | LayoutWrapper |
| FlashMessages | FlashMessages | FlashMessages |
| BackgroundBlur | BackgroundBlur | BackgroundBlur |
| ScrollToTop | ScrollToTop | ScrollToTop |
| TheLogo | TheLogo | TheLogo |
| CookieNotice | CookieNotice | CookieNotice |
| TheFooterCopyright | TheFooterCopyrightLight | TheFooterCopyrightLight |
| TheFooterDesktop | CheckoutProgressBar |  |
| TheFooterMobile |  |  |
| TheFooterSocial |  |  |
| TheMobileMenu |  |  |
| TheMegaMenu |  |  |
| CustomerMenu |  |  |
| TheMiniCart |  |  |
| TheWishlist |  |  |
| TheSearchDirect |  |  |
| TrustedShopsBadge |  |  |

##### Learn More
To learn more about types of views in the context of NuxtJS please refer to the [Views section](https://nuxtjs.org/guide/views) of the official NuxtJS documentation.
