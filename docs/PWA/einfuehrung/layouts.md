# Layouts

Pages können ein __`layout`__ Feld definieren, wodurch eine Sammlung von Komponenten importiert wird, welches einen Rahmen um den
Seiteninhalt bildet. Dies bedeutet, dass der Inhalt von [Pages](pagetypes.md) in das jeweils angegebene Layout eingebettet wird.


``` js
// ~/pages/index.vue
export default {
    name: 'Index',
    layout: 'hubble'
    // ...
}
```
Das Default Layout, welches in hubble verwendet wird, befindet sich unter
```
~/layouts/hubble.vue
```
und wird von den meisten Seiten unter __`~/pages/`__ verwendet.
Dies bedeutet, dass fast alle Seiten die gleichen Navigationselemente, wie beispielsweise die Wunschliste, den Benutzeraccount
und das Suchfeld anzeigen.


::: tip
Komponenten, die auf allen (non-__`checkout`__) Seiten erscheinen sollen, müssen in das Default Layout (__`~/layouts/hubble.vue`__) eingefügt werden.
:::

Unter dem Abschnitt [Ablenkungsfreie Layouts](layouts.mdblenkungsfreie-layouts) der hubble Dokumentation gibt es mehr Informationen zu Layouts bei __`checkout`__ Seiten.

##### Ein Beispiel für die Art von Komponenten, die hubble in Layouts einbindet 
Vom Hinzufügen von Produkten zur Wunschliste, bis zur Änderung der Rechnungsadresse, existiert immer die Möglichkeit
für Fehler, beispielsweise, durch den Verlust der Netzwerkverbindung.
Um Shopbesuchern ein Feedback zu bieten, kann von allen Komponenten aus eine Benachrichtigung angezeigt werden. 
In hubble wird dafür die __`<flash-messages/>`__ Komponente verwendet, die in alle Layout Dateien eingebunden ist.

::: details
``` js
// ~/components/customer/CustomerAccountInformation.vue (simplified)
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions({
            flashMessage: 'modFlash/flashMessage'
        }),

        saveChanges: function() {
            // ..
            this.flashMessage({
                flashType: 'success', // defines style & icon of flashMessage
                flashMessage: this.$t('You successfully changed your information.'), // uses translation from de.js or en.js
                keepOnRouteChange: true // changes default behavior of flashMessage on route changes 
            });
            // ...
        }
    }
}
```
:::


### Ablenkungsfreie Layouts

Wie oben erwähnt, verwenden zwar die meisten Pages das Layout __`hubble`__ (__`~/layouts/hubble.vue`__), jedoch nicht alle.
Um ein Ablenkungsfreies Checkout Erlebnis zu ermöglichen, stellt hubble die Layouts __`hubble_light`__ und __`hubble_express`__ bereit. 
Ablenkungsfrei bedeutet in diesem Zusammenhang, dass weniger Komponenten im Layout eingebunden werden und somit der Checkout
Prozess als prominente Hauptaktion verbleibt.

::: details
Bis auf die __`CheckoutCart`__ (__`~/pages/checkout/cart.vue`__) verwenden die Seiten im
__`checkout`__ Ordner nicht das Default Layout.
Die __`CheckoutCart`__ bildet eine Ausnahme unter den __`checkout`__ Seiten, da es erlaubt den Kaufprozess fortzusetzen
oder den Warenkorb zu editieren.
:::

#### Layouts, die Checkout Seiten verwenden:
| hubble | hubble_light | hubble_express | 
| --- | --- | --- |
| cart.vue | login.vue | amazon.vue |
|  | payment.vue | shopware-guest.vue |
|  | success.vue | shopware-onepage.vue |
|  | summary.vue | shopware-success.vue |



### Komponenten, welche von den Layouts eingebunden werden:

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
Um mehr über die verschiedenen View Arten im Kontext von NuxtJS zu erfahren, kann der Abschnitt [Views](https://nuxtjs.org/guide/views) der offiziellen NuxtJS
Dokumentation referenziert werden.

