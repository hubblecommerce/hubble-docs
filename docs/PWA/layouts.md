# Layouts

Pages can define a __`layout`__ property which will import a set of components that form a frame for the page content.
The default layout used in Hubble can be found under
```
layouts/hubble.vue
```
which all components except checkout pages use (__`CheckoutCart`__ at __pages/checkout/cart.vue__ being an exception).
This means that almost all pages have the same navigation at the top with access to, for example, the wishlist, user account and search field.

One way in Hubble to show feedback on the success state of user actions are flash messages. 
From adding products to the wishlist to changing billing information there is always the possibility for errors, for example, due to network connection loss.
To make it easy to conform to good User Experience (UX) principles and provide users with feedback on interaction all layouts include the __`<flash-messages/>`__ component.
Each component from the __components__ folder can opt to push a flash message onto the flash messages array which gets displayed by the __`<flash-messages/>`__ component included in the layout files.
 
In conclusion this means that any component that should be visible on all pages should be included in the respective layout that is used as the default, 
in the case of Hubble it is the __layouts/hubble.vue__.



### Distraction Free Layouts

As mentioned above most but not all pages use the __`hubble`__ layout at __layouts/hubble.vue__. 
To provide a distraction free checkout experience the layouts __`hubble_light`__ and __`hubble_express`__ are used for pages related to checkout.
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





