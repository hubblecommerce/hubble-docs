# Layouts

In einem Layout wird der Rahmen für die Applikation bzw. die jeweilige Seite definiert. 
Dies können beispielsweise ein wiederkehrender Header und Footer sein. Eine Applikation kann dabei auf unterschiedliche Layouts zurückgreifen. 

hubble verwendet dabei den von NuxtJs empfohlenen Workflow für Seiten und Layouts. 
Welches Layout eine Seite benutzt, wird in der Layout Property der jeweiligen Seiten Komponente definiert. 

``` js
// ~/pages/index.vue
export default {
    name: 'Index',
    layout: 'hubble'
    // ...
}
```


Dies bedeutet, dass der Inhalt von [Pages](pagetypes.md) in das jeweils angegebene Layout eingebettet wird.
Dabei legt der slot `<nuxt />` die Stelle in einem Layout fest in die der Inhalt gerendert wird.


``` vue{19}
// ~/layouts/hubble.vue
<div class="mobile-layout">
    <background-blur />
    <div class="header-wrp">
        <div class="nav-wrp">
            <the-mobile-menu v-if="!isEmpty(menu)" :data-items="menu" />
            <the-logo />
            <the-search-direct />
            <div class="action-wrp d-flex">
                <the-wishlist />
                <customer-menu />
                <the-mini-cart />
            </div>
        </div>
        <flash-messages v-if="!activeOffCanvas" />
    </div>

    <main>
        <nuxt />
    </main>

    <div class="footer" v-view.once="onceHandler">
        <the-footer-social v-if="inView" />
        <the-footer-mobile v-if="inView" />
        <the-footer-copyright v-if="inView" />
    </div>
    <scroll-to-top />
</div>
```

Das Default Layout, welches in hubble verwendet wird, befindet sich unter
```
~/layouts/hubble.vue
```
und wird von den meisten Seiten unter __`~/pages/`__ verwendet.
Dies bedeutet, dass fast alle Seiten die gleichen Navigationselemente, wie beispielsweise die Wunschliste, den Benutzeraccount
und das Suchfeld anzeigen.

## Übersicht der eingebundenen Komponenten je Layout

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


## Ablenkungsfreie Layouts

Wie oben erwähnt, verwenden zwar die meisten Pages das Layout __`hubble`__ (__`~/layouts/hubble.vue`__), jedoch nicht alle.

Um einen ablenkungsfreien Kassenprozess zu ermöglichen, stellt hubble die Layouts __`hubble_light`__ und __`hubble_express`__ bereit. 
Ablenkungsfrei bedeutet in diesem Zusammenhang, dass weniger Komponenten im Layout eingebunden werden und somit der Checkout
Prozess als prominente Hauptaktion verbleibt.

Ausgenommen die __`CheckoutCart`__ (__`~/pages/checkout/cart.vue`__) verwenden die Seiten im
__`checkout`__ Verzeichnis somit das reduzierte Layout. 


### Übersicht Layouts, die von Checkout Seiten verwendet werden:
| hubble | hubble_light | hubble_express | 
| --- | --- | --- |
| cart.vue | login.vue | amazon.vue |
|  | payment.vue | shopware-guest.vue |
|  | success.vue | shopware-onepage.vue |
|  | summary.vue | shopware-success.vue |



## Mehr Erfahren
Mehr über die verschiedenen View Arten im Kontext von NuxtJS: [Views](https://nuxtjs.org/guide/views)

