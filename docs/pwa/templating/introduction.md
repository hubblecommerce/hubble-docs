# Einführung

## Konfiguration   

### Theme konfigurieren 

Es existiert ein responsives Default Theme in hubble, welches es erleichtert darauf aufbauend in kurzer Zeit
ein individualisiertes Theme zu erstellen.
Das im Projekt zu verwendende Theme wird in der __`.env`__ Datei definiert:
``` txt
# .env
THEME = 'hubble'
```

Entgegen des Single File Component Ansatzes wird der Style Part jeder Komponente in einer separaten __`scss`__ Datei gespeichert. 
Je nachdem welches Theme konfiguriert ist, wird der entsprechende Theme Ordner mit Styles geladen.

```
~/assets/scss/<THEME-FOLDER>
```

Die gleiche Mechanik kann genutzt werden um auch andere Theme spezifische Dateien zu laden die sich im __`~assets/`__ Ordner befinden. 

::: tip
Die Kompilierung von den Dateien in dem __`scss`__ Ordner ist in hubble bereits konfiguriert. 
Um neue __`scss`__ Dateien ebenfalls in den Kompilierungsprozess zu integrieren
ist nur ein Hinzufügen zur __`~/assets/scss/hubble/all.scss`__ notwendig.
:::

### SCSS konfigurieren 

Alle scss Dateien werden über die __`~/assets/scss/hubble/all.scss`__ importiert. 
Es gibt zwei Unterordner. In __`~/assets/scss/hubble/components`__ ist für jede Vue.js Komponente eine entsprechende scss Datei hinterlegt.
In __`~/assets/scss/hubble/configuration`__ befinden sich alle scss Variablen und Mixins die für das Styling der App relevant sind. 

``` scss
// ~/assets/scss/hubble/configuration/theme.scss

$primary: #880E4F !default;
$secondary: #EAE9EA !default;
$accent: #880E4F !default;
$highlight: #BD1A20 !default;
$background: #fff !default;
$background-light: #F8F8F8 !default;
$border-color: #EAE9EA !default;
$text-primary: #2C2E31 !default;
$text-primary-on-background: #2C2E31 !default;
$available-accent: #76BD1A !default;
$font-family: 'Lato', Helvetica, Arial, sans-serif !default;
$text-light: #535358 !default;
$header-height-desktop: 80px !default;
$border-radius: 0 !default;

$base-padding: 10px !default;
$base-padding-md: 20px !default;

```


Die strikte Einhaltung dieser Ordnerstruktur innerhalb des Theme Ordners ist jedoch nur eine Empfehlung. 
Wichtig ist nur, neue Dateien in __`~/assets/scss/<THEME-FOLDER>/all.scss`__ zu importieren.


## Bootstrap 

Für das eigentliche Layout und das definieren des Layout Grids wird [Bootstrap](https://getbootstrap.com/) verwendet.
Wobei nur die in hubble verwendeten Klassen Styles und Sass Mixins über die __`~/assets/scss/hubble/configuration/bootstrap-essentials.scss`__ 
eingebunden sind und um weitere Bootstrap Klassen und Funktionen erweitert werden können.

``` scss
// ~/assets/scss/hubble/components/hubble.scss
.nav-wrp {
    /* uses sass mixin from Bootstrap */ 
    @include make-container-max-widths($max-widths: $container-max-widths, $breakpoints: $grid-breakpoints);
}
```


## Aufbau des hubble Themes

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
im Aufbau dem generellen Schema, welches im Projekt Anwendung findet.

## Responsive Styling 

Styles werden nach dem mobile first Ansatz von mobilen Geräten ausgehend, mit den primären Breakpoints __`min-width: 768px`__ (Tablet) 
und __`min-width: 1024`__ (Desktop), definiert. 

Diese Breakpoints können auch im Script Teil der Komponenten benutzt werden, z.B. um Klassen hinzuzufügen oder zu entfernen.
Dafür wird [nuxt-mq](https://www.npmjs.com/package/nuxt-mq) verwendet. 

Die Konfiguration dieser Breakpoint Werte befindet sich in der __`nuxt.config.js`__.

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
