# Theming

### Konfiguration   

Es existiert ein responsives Default Theme in hubble, welches es erleichtert darauf aufbauend in kurzer Zeit
ein individualisiertes Theme zu erstellen.
Das im Projekt zu verwendende Theme wird in der __`.env`__ Datei definiert:
``` txt
# .env
THEME = 'hubble'
```
 
Komponenten Templates sind mit Klassen versehen, deren Style Deklarationen sich in einem getrennten __`scss`__ Ordner befinden:
```
~/assets/scss/hubble
```
Jedoch ist es auch weiterhin möglich Styles in den Komponenten zu definieren.

::: tip
Die Kompilierung von den Dateien in dem __`scss`__ Ordner ist in hubble bereits konfiguriert. 
Um neue __`scss`__ Dateien ebenfalls in den Kompilierungsprozess zu integrieren
ist nur ein Hinzufügen zur __`~/assets/scss/hubble/all.scss`__ notwendig.
:::

Zusätzlich zu den in der  __`~/assets/scss/hubble/all.scss`__ registrierten Deklarationsdateien für Komponenten spezifische
Styles, 
sind dort auch Dateien für Projekt globale Variablen und Deklarationen, wie z.b die 
__`~/assets/scss/hubble/configuration/global.scss`__,  eingebunden: 

``` scss
// ~/assets/scss/hubble/all.scss

// Configuration, Variables and Mixins
@import "configuration/global";
@import "configuration/boostrap-essentials";
@import "configuration/fonts";
/* ... */

// Components
@import "components/product-listing";
@import "components/product-listing-card";
/* ... */

```

Die einzelnen Dateien dazu befinden sich zur Bewahrung
der Übersichtlichkeit in dem Unterordner __`configuration`__. Dieser befindet sich mit dem Ordner __`components`__ auf einer Ebene.
Die strikte Einhaltung dieser Ordnerstruktur innerhalb des Theme Ordners ist jedoch nicht notwendig. Alleinige Regel ist die 
Existenz der __`~/assets/scss/<THEME-FOLDER>/all.scss`__ Datei und der korrekte Pfadeintrag der Dateien, die
eingebunden werden sollen.


### Aufbau des hubble Themes

Die im hubble Theme verwendeten Standardwerte für Fonts und Farben sind jeweils in der __`colors.scss`__ und 
__`typography.scss`__ definiert und eignen sich als schnelle Möglichkeit das Theme anzupassen.
Als Default Schriftart wird [Lato](https://fonts.google.com/specimen/Lato) aus der [Google Fonts](https://fonts.google.com/)
Sammlung verwendet und wird in der __`font.scss`__ importiert.

``` scss
// ~/assets/scss/hubble/configuration/fonts.scss
// importing font weights 400 & 700 
@import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
```

``` scss
// ~/assets/scss/hubble/configuration/theme.scss
$font-family: 'Lato', Helvetica, Arial, sans-serif !default;
```

``` scss
// ~/assets/scss/hubble/configuration/global.scss
body {
  font-family: $font-family;
}
```

Außerdem sind Icons über Klassen in __`~/assets/scss/hubble/configuration/icon-set.scss`__ definiert. Diese referenzieren
als __`font-face`__ eingebundene [IcoMoon](https://icomoon.io/) Icons:

``` scss
// ~/assets/scss/hubble/configuration/icon-set.scss
// 1) define icon set as font face
@font-face {
    font-family: 'icons';
    src:  url('~assets/fonts/icons/icomoon.eot');
    /* ... */
}

// 2) set icon set as font family
.icon {
    /* using !important to prevent issues with browser extensions that change fonts */
    font-family: 'icons' !important;
    /* ... */
}

// 3) set specific icon code on class
.icon-heart:before {
    content: "\e907";
}
```

Verwendung von Icons in Komponenten:
``` html{6}
<!--  ~/components/navigation/TheWishlist.vue -->
<button class="button-icon wishlist-icon"
        :class="setButtonStates"
        @click="toggle()"
>
        <i class="icon icon-heart" aria-hidden="true" />

        <span class="hidden-link-name">Toggle Wishlist</span>

        <material-ripple />

        /* ... */
</button>
```

::: tip
Das Default Theme __hubble__ verwendet die __`~/assets/scss/hubble/configuration/reset.scss`__, um Browserunterschiede
auszugleichen und damit ein gleichmäßiges Erscheinungsbild der Shopseite für alle Browser zu ermöglichen.
:::

Layout spezifische Deklarationen befinden sich in der __`~/assets/scss/hubble/components/hubble.scss`__ und folgen 
im Aufbau dem generellen Schema, welches im Projekt Anwendung findet:
Styles werden von mobilen Geräten ausgehend, mit den primären Breakpoints __`min-width: 768px`__ (Tablet) und
__`min-width: 1024`__ (Desktop), definiert. 
Falls diese Breakpoints in den Komponenten referenziert werden müssen, um Klassen hinzuzufügen oder zu entfernen etc., 
dann wird dafür [nuxt-mq](https://www.npmjs.com/package/nuxt-mq), welches auf dem Vue.js Plugin
[vue-mq](https://github.com/AlexandreBonaventure/vue-mq) basiert, verwendet. 
Die in den Komponenten verwendeten Breakpoints werden dabei über __`this.$mq`__ referenziert und können die Werte __`sm`__, 
__`md`__ und __`lg`__ einnehmen. Für die Konfiguration dieser Breakpoint Werte kann die __`nuxt.config.js`__ verwendet
werden.

Konfiguration:
``` js
// ~/nuxt.config.js
modules: [
    // ...
    [ 'nuxt-mq',
        {
            breakpoints: {
                sm: 768,
                md: 1024,
                lg: Infinity
            },
            // ...
        }
    ]
]
```

Verwendung:
``` html
<!-- ~/components/productdetail/ProductDetailBuybox.vue -->
<add-to-wishlist v-if="$mq === 'lg'" class="add-to-wishlist-button" :item="dataProduct" />
```

Für das eigentliche Layout und das definieren des Layout Grids wird [Bootstrap](https://getbootstrap.com/) verwendet,
wobei nur die in hubble verwendeten Klassen Styles und Sass Mixins über die
__`~/assets/scss/hubble/configuration/bootstrap-essentials.scss`__ eingebunden werden.

``` scss
// ~/assets/scss/hubble/components/hubble.scss
.nav-wrp {
    /* uses sass mixin from Bootstrap */ 
    @include make-container-max-widths($max-widths: $container-max-widths, $breakpoints: $grid-breakpoints);
}
```

