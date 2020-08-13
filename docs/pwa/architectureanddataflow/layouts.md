# Layouts

## Default Layout
Jede Route kann ein Layout in der dazugehörigen Property __`layout`__ angeben, die auf eine Datei im
__`layouts`__ Ordner verweist. 
Layouts dienen dazu den Rahmen für Seiteninhalte zu definieren:
Meistens ist das ein Header und ein Footer, welche jeweils von mehreren Seiten wiederverwendete Elemente, wie
Menü und Logos, enthalten.
Dies bedeutet, dass der Inhalt von [Pages](pagetypes.md) in das angegebene Layout eingebettet wird.
An welcher Stelle Seiteninhalte erscheinen sollen entscheidet sich durch den slot __`<nuxt />`__.
Dabei verwendet hubble den von NuxtJS empfohlenen Workflow für Seiten und Layouts. 


``` js
// ~/pages/index.vue
export default {
    name: 'Index',
    layout: 'hubble'
    // ...
}
```


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

Das Default Layout befindet sich unter:
```
~/layouts/hubble.vue
```
und wird von den meisten Seiten unter __`~/pages/`__ verwendet.
Dies bedeutet, dass fast alle Seiten die gleichen Navigationselemente, wie beispielsweise die Wunschliste, den Benutzeraccount
und das Suchfeld anzeigen.


## Ablenkungsfreie Layouts

Wie schon erwähnt, verwenden zwar die meisten Pages das Layout __`hubble`__ (__`~/layouts/hubble.vue`__), jedoch nicht alle.
Um ein Ablenkungsfreies Checkout Erlebnis zu ermöglichen, stellt hubble die Layouts __`hubble_light`__ und __`hubble_express`__ bereit. 
Ablenkungsfrei bedeutet in diesem Zusammenhang, dass weniger Komponenten im Layout eingebunden werden und somit der Checkout
Prozess als prominente Hauptaktion verbleibt.

Bis auf __`CheckoutCart`__ (__`~/pages/checkout/cart.vue`__) verwenden die Seiten im
__`checkout`__ Ordner nicht das Default Layout.
Die __`CheckoutCart`__ bildet eine Ausnahme unter den __`checkout`__ Seiten, da es erlaubt den Kaufprozess fortzusetzen
oder den Warenkorb zu editieren.

### Übersicht Layouts, die von Checkout Seiten verwendet werden:
| hubble | hubble_light | hubble_express | 
| --- | --- | --- |
| cart.vue | login.vue | amazon.vue |
|  | payment.vue | shopware-guest.vue |
|  | success.vue | shopware-onepage.vue |
|  | summary.vue | shopware-success.vue |


### Übersicht Komponenten, die von den Layouts eingebunden werden:

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


##### Mehr Erfahren
Mehr über die verschiedenen View Arten im Kontext von NuxtJS: [Views](https://nuxtjs.org/guide/views)

