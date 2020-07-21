# Warenkorb

Es existieren verschiedene Möglichkeiten den Warenkorb in hubble darzustellen.
Nach Auswahl eines Produktes aus dem Listing und dem Routenwechsel zur
Produktdetailseite kann ein Produkt dem Warenkorb hinzugefügt werden.
Durch das Hinzufügen eines Produktes zum Warenkorb öffnet sich das in hubble
als __`offCanvas`__ bezeichnete Modal-Fenster und zeigt den aktuellen Inhalt und 
Kostenstand, ohne Versandkosten (__`subtotal`__), des Warenkorbs an. 


Inhalte dieses __`offCanvas`__ Fensters befinden sich in der Komponente __`<the-mini-cart />`__
(__`~/components/navigation/TheMiniCart.vue`__),
welches Teil des Default Layouts __`hubble`__ (__`~/layouts/hubble.vue`__) ist.
Da die Komponente __`<the-mini-cart />`__ Teil des Layouts ist, kann der
Warenkorb jederzeit durch Einblendung des __`offcanvas`__ eingesehen werden, ohne
die aktuelle Seite vollständig zu verlassen.


#### Komponenten in der Komponente __`~/components/navigation/TheMiniCart.vue`__
| Komponente | Aufgaben |
| --- | --- | 
| __`<transition-expand-layer />`__ | regelt die "Slide-in" Animation und Sichtbarkeit des __`offCanvas`__ Layers |
| __`<flash-messages />`__ | für die Darstellung von Benachrichtigungen innerhalb des __`offCanvas`__ |
| __`<cart-items-list />`__ | für die Darstellung der Produkte im Warenkorb |
| __`<material-ripple />`__ | steuert Ripple Animation für Button |


Es können Bestellmengen erhöht oder verringert werden oder Produkte
aus dem Warenkorb entfernt werden. Jede Interaktion, hat einen API Call zur Folge,
der dazu dient die korrekte Rekalkulation des Warenkorbs durchzuführen.


Der __`offCanvas`__ bietet außer den oben aufgelisteten Komponenten zwei Möglichkeiten für den Routenwechsel an:
+ Fortsetzen des Einkaufs 
+ Wechsel auf die Vollansicht des Warenkorbs

Beim Wechsel auf die Vollansicht wird zusätzlich zu der Komponente __`<cart-items-list />`__,
die auch beim __`offCanvas`__ verwendet wird, die __`<totals />`__ Komponente 
eingebunden. Dadurch werden zusätzlich zur Zwischensumme des Warenkorbs ohne Versandkosten (__`subtotal`__),
welcher bereits im __`offCanvas`__ angezeigt wurde,
auch Versandkosten und Gesamtsumme (__`total`__) des Warenkorbs angezeigt.

#### Komponenten auf der Seite __`~/pages/checkout/cart.vue`__
| Komponente | Aufgaben |
| --- | --- |
| __`<cart-items-list />`__ | für die Darstellung der Produkte im Warenkorb |
| __`<material-ripple />`__ | steuert Ripple Animation für Button |
| __`<collapsible />`__ | umrahmt __`<coupons />`__ Komponente in __`sm`__ Viewports & zeigt die __`<coupons />`__ Komponente nur an, wenn ausgeklappt  | // ausklappen von coupon liste when clicked
| __`<coupons />`__ | zeigt Liste der vorhandenen Coupons an, wenn __`API_TYPE !== 'sw'`__ |
| __`<totals />`__ | für die Darstellung der Warenkorb Summe mit und ohne Versandkosten |

Bei der Auswahl zum Fortsetzen des Einkaufs auf der Vollansicht unter __`/checkout/cart`__ gibt es einen Routenwechsel
auf die Shop Startseite (__`/`__).


``` html{2}
<!-- ~/pages/checkout/cart.vue -->
<nuxt-link :to="localePath('index')">
    <button class="button-secondary shopping-button">
        {{ $t('Keep shopping') }}
        <material-ripple />
    </button>
</nuxt-link>
```

::: tip
Zum Wechseln der Route wird in hubble [localePath](https://nuxt-community.github.io/nuxt-i18n/basic-usage.html#nuxt-link)
aus [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/) verwendet. Es handelt sich dabei um ein Nuxt.js Plugin für
[vue-i18n](https://github.com/kazupon/vue-i18n), welches Lokalisierungsfunktionalitäten bietet.

[`$t('<TERM-TO-TRANSLATE>')`](http://kazupon.github.io/vue-i18n/api/#vue-injected-methods) referenziert dabei in hubble die
__`en.js`__ oder __`de.js`__ für den angegebenen String Parameter und zeigt den Text in der gesetzten Sprache an.

Das Setzen der Sprache erfolgt durch die Middleware __`apiLocalization`__, die vor dem Anzeigen der Route __`/checkout/cart`__
ausgeführt wird. Diese ruft dafür die Vuex Store Funktion __`modApiResources/setApiLocale`__ vom Typ __mutation__ auf.

Die Angabe der Übersetzungsdateien und weitere Konfigurationen zum [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/)
Modul befinden sich in der __`~/nuxt.config.js`__.
:::


Im Gegensatz dazu führt die Auswahl zum Fortsetzen des Einkaufs im __`offCanvas`__ zu keinem Routenwechsel und 
es wird nur das Overlay geschlossen.

``` html{4}
<!-- ~/components/navigation/TheMiniCart.vue -->
<button v-if="cartItemsQty > 0"
        class="shopping-button button-secondary"
        @click.prevent="hideMenu"
>
        {{ $t('Keep shopping') }}
        <material-ripple />
</button>
```

::: tip
Button in hubble verwenden die __`<material-ripple />`__ Komponente zur Darstellung einer Ripple Animation bei Interaktion.
:::

### Mögliche Interaktionen

+ Ändern der Bestellmenge
+ Entfernen des Produktes aus dem Warenkorb

Jede Interaktion hat zur Folge, dass entsprechend der Vuex Regeln eine __`action`__ aus dem
Vuex Store Modul __`modCart`__ aufgerufen wird, die den API Request zur Rekalkulation des Warenkorbs an die
__`action`__ __`modApi/apiCall`__ delegiert.

Bei der Änderung der Bestellmenge wird der lokale State im Vuex Store für die Mengenanzahl
sofort auf den neuen Stand gesetzt ("optimistic update") und nur beim Auftreten eines Fehlers im Update des Backends wieder
auf den vorherigen Stand zurückgesetzt.
Dazu wird dann eine Fehlermeldung mit Hilfe der __`~/components/utils/FlashMessages.vue`__ Komponente angezeigt.
Falls das __`offCanvas`__ Fenster noch sichtbar ist, wird dieses vor dem Anzeigen der Nachricht geschlossen.

Beim erfolgreichen Update des Backends 
erhält der lokale Vuex Store __`state`__ die neuen Werte für Versandkosten und Gesamtsumme aus dem Response Objekt.