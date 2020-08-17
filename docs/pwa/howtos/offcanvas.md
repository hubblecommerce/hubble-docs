# Das offCanvas Layer

## Funktionsweise des __`offCanvas`__ Layers

In hubble wird das Modal Fenster, welches sich z.B. beim Hinzufügen eines Produktes zum
Warenkorb öffnet, als __`offCanvas`__ bezeichnet.
Dieses Layer kann verschiedene Komponenten, wie beispielsweise die Wunschliste,
den Warenkorb und das Login Formular, anzeigen. Da die jeweils anzuzeigende Komponente erst zur
Ansicht benötigt wird, wenn aktiv z.B. ein Produkt dem Warenkorb hinzugefügt wurde, werden diese
bei Bedarf nachgeladen ([Lazy Loading](../architectureanddataflow/dynamicimports.md)).

``` html
<!-- components/navigation/TheMiniCart.vue -->
<div v-if="showMenu" class="transition-expand-wrp">
    <cart-layer v-if="initiated" />
</div>
```

Zusätzlich wird ein ausgewählter Transitioneffekt mit Hilfe der __`transition`__ Komponente
von Vue.js ([Transitions in Vue.js](https://vuejs.org/v2/guide/transitions.html)) angewendet.
Dabei handelt es sich um eine Klassenbasierte Definition, anhand der die verschiedenen Transition
States festgesetzt werden.
Es existieren vier Transition Klassen, die primär als eine Art von Keyframes dienen:
__`v-enter`__, __`v-enter-to`__, __`v-leave`__ und __`v-leave-to`__. Eine detaillierte
Beschreibung zu Ablauf und Funktionsweise von diesen Klassen befindet sich unter
[Transition Classes](https://vuejs.org/v2/guide/transitions.html#Transition-Classes) in der Vue.js 
Dokumentation.

Um diese Vue.js Funktionalität zu nutzen wurde in hubble die __`TransitionExpandLayer`__ Komponente
erstellt, dessen Template wie folgt definiert ist:
``` html
<!-- components/transitions/TransitionExpandLayer.vue -->
<template>
    <transition :name="transMode">
        <slot></slot>
    </transition>
</template>
```

Dabei definiert die __`transition`__ Komponente in Vue.js einen Namen (__`name`__) zur Identifikation,
der in hubble per Prop gesetzt wird. Es existieren aktuell vier mögliche Prop Werte, die jeweils auf __`true`__ gesetzt werden können und
der Name der gesetzten Prop in der __`created`__ Lifecycle Methode auf das lokale __`transitionMode`__ Feld gesetzt wird.

``` js
// components/transitions/TransitionExpandLayer.vue
props: {
    leftRight: {
        type: Boolean,
        required: false
    },
    rightLeft: {
        type: Boolean,
        required: false
    },
    bottomTop: {
        type: Boolean,
        required: false
    },
    topBottom: {
        type: Boolean,
        required: false
    }
}
```


``` js
data() {
    return {
        transitionMode: ''
    }
}
```


``` js
created() {
    if(this.bottomTop === true) {
        this.transitionMode = "bottomTop";
    }

    if(this.leftRight === true) {
        this.transitionMode = "leftRight";
    }

    // same pattern applies to the other possible prop values
```

Dieser Transition Name wird dabei bei der Definition des Stylings als Prefix für die vier Transition Klassen, die
von Vue.js vorgegeben sind, verwendet.
Das klassische seitliche Slide-In ist somit wie folgt definiert:

``` scss
/* Animate Minicart overlay from right to left */
.expand-rightLeft-enter-active, .expand-rightLeft-leave-active {
    transition: all .1s ease-in-out;
}
.expand-rightLeft-enter, .expand-rightLeft-leave-to {
    right: -100% !important;
}
.expand-rightLeft-enter-to, .expand-rightLeft-leave {
    right: 0 !important;
}
```

Die Style Definitionen für die __`transition`__ Komponente in der __`TransitionExpandLayer`__ Komponente, befinden sich
als __`scoped`__ __`scss`__ innerhalb der SFC ([Single File Components](https://vuejs.org/v2/guide/single-file-components.html)),
wobei sich die allgemeinen Style Definitionen zu dem __`offCanvas`__ Layer in der __`transition-expand-layer.scss`__ befinden. 


Für den Fall, dass das __`offCanvas`__ Layer bereits sichtbar ist und dieses eine andere Komponente mit derselben
__`direction`__ darstellen soll, findet nicht die Standard Transition statt, sondern die als __`fade-to-white`__ definierte Transition.
Dabei handelt es sich um einen Ein-/Ausblendeeffekt, statt dem Slide-In Effekt, der normalerweise zu sehen ist, wenn
ein __`offCanvas`__ dargestellt werden soll.

``` js
computed: {
    ...mapState({
        offcanvas: state => state.modNavigation.offcanvas
    }),
    transMode: function() {
        if(this.offcanvas.sameLayerOpened) {
            return 'fade-to-white';
        }
        
        return 'expand-' + this.transitionMode;
    }
}
```

Die zugehörigen Style Definitionen sehen wie folgt aus:

``` scss
.fade-to-white-enter-active, .fade-to-white-leave-active {
    transition: all .2s ease-in-out;

    &:before {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100000;
        background-color: #fff;
        transition: all .1s ease-in-out;
        opacity: 0;
    }
}
.fade-to-white-enter, .fade-to-white-leave-to {
    &:before {
        opacity: 1;
    }
}
.fade-to-white-enter-to, .fade-to-white-leave {
    &:before {
        opacity: 0;
    }
}
```

Damit jedoch die Transition mit dem Namen __`fade-to-white`__ verwendet wird, gibt es, wie oben zu sehen ist, eine 
Überprüfung der Vuex State Variable __`sameLayerOpened`__:
``` js
if(this.offcanvas.sameLayerOpened) 
```

Der Wert für __`sameLayerOpened`__ ergibt sich aus der Prüfung auf Sichtbarkeit (__`isActive`__),
Richtung (__`direction`__) und (anzuzeigender) Komponente (__`component`__) in der __`mutation`__
__`modNavigation/setSameLayerOpened`__:

``` js
// hubble/core/store/modNavigation.js
mutations: {
    setSameLayerOpened: (state, payload) => {
        state.offcanvas.sameLayerOpened = state.offcanvas.isActive === true && state.offcanvas.direction[payload.direction] === true && state.offcanvas.component !== payload.component;
    }
}
```

Es ist auch zu erkennen, dass das Vuex Store Modul __`modNavigation`__ für die __`offCanvas`__ Funktionalität
zuständig ist.


Somit ergibt sich also das folgende Template für die Anzeige des Warenkorbs über das __`offCanvas`__ Layer:

``` html
<transition-expand-layer :top-bottom="true">
    <div v-if="showMenu" class="transition-expand-wrp">
        <cart-layer v-if="initiated" />
    </div>
</transition-expand-layer>
```

Wobei die Einbindung nur nach Bedarf, unter Verwendung von dynamischen Imports (auch als __Lazy Loading__ referenziert), geschieht:
``` js
// components/navigation/TheMiniCart.vue
export default {
    // ...
    components: {
        CartLayer: () => import('./CartLayer')
    },
    // ...
}
```

Die __`computed`__ Property __`showMenu`__ prüft dabei, ob die Vuex State Variable __`offcanvas.component`__ dem lokalen Wert __`this.name`__ entspricht:

``` js
computed: {
    showMenu: function() {
        return this.offcanvas.component === this.name;
    }
}
```


Der Wert im Vuex State wird dabei über die __`toggle`__ Methode initiiert:

__Template__
``` html
<button class="button-icon cart-icon"
        :class="setButtonStates"
        @click="toggle()"
>
    <i class="icon icon-cart" aria-hidden="true" />

    <span class="hidden-link-name">Toggle Cart</span>

    <material-ripple />

    <!-- ... -->
</button>
```

__Skript__

``` js
// components/navigation/TheMiniCart.vue
export default {
    methods: {
        ...mapMutations({
            initiateCartLayer: 'modCart/initiateLayer',
        }),
        ...mapActions({
            toggleOffcanvasAction: 'modNavigation/toggleOffcanvasAction',
            hideOffcanvasAction: 'modNavigation/hideOffcanvasAction'
        }),
        toggle: function() {
            this.initiateCartLayer();
    
            this.toggleOffcanvasAction({
                component: this.name,
                direction: 'topBottom'
            });
        }
    }
}
```


Die __`mutation`__ __`initiateCartLayer`__ setzt dabei den Wert für __`initiated`__, welches die Bedingung zur 
Einbindung der Komponente __`CartLayer`__ auf __`true`__ setzt und kann über den __`mapState`__ Helper aus dem
Vuex Store __`modCart`__ ausgelesen werden:
``` js
// modcart.js
mutations: {
    initiateLayer: (state) => {
        state.layerInitiated = true;
    }
}
```


``` js
// components/navigation/TheMiniCart.vue
...mapState({
    initiated: state => state.modCart.layerInitiated
}
```


Der zweite Schritt innerhalb der __`toggle`__ Methode ist dabei der Aufruf der __`toggleOffcanvasAction`__ __`action`__.
Diese ruft ihrerseits die __`setSameLayerOpenedAction`__ und darauffolgend die __`mutation`__ __`toggleOffcanvas`__ auf.

``` js
// hubble/core/store/modNavigation.js
async toggleOffcanvasAction({commit, dispatch}, payload) {
        return new Promise((resolve) => {
            dispatch('setSameLayerOpenedAction', {
                component: payload.component,
                direction: payload.direction
            })
            .then(() => {
                commit('toggleOffcanvas', {
                    component: payload.component,
                    direction: payload.direction
                });
            });
        
            resolve('resolved');
        });
},
```


``` js
// hubble/core/store/modNavigation.js
async setSameLayerOpenedAction({commit}, payload) {
    return new Promise((resolve) => {
        commit('setSameLayerOpened', {
            component: payload.component,
            direction: payload.direction
        });
        
        resolve('resolved');
    });
},
```

Die __`setSameLayerOpened`__ __`mutation`__, die von der __`setSameLayerOpenedAction`__ aufgerufen wird, wurde dabei
bereits oben erläutert. 
Um die __`toggleOffcanvas`__ __`mutation`__ zu verstehen, ist es hilfreich, den State des Vuex Moduls __`modNavigation`__
als Referenz zu haben:

``` js
// hubble/core/store/modNavigation.js
state: () => ({
    showMenu: false,
    offcanvas: {
        component: '',
        isActive: false,
        direction: {
            leftRight: false,
            rightLeft: false,
            bottomTop: false,
            topBottom: false
        },
        sameLayerOpened: false
    }
})
```

Im Folgenden ist nun die, mit dem __`payload`__ __`component`__ und __`direction`__, aufgerufene __`mutation`__
__`toggleOffcanvas`__ zu sehen: 
``` js
// hubble/core/store/modNavigation.js
toggleOffcanvas: (state, payload) => {
    // Set component name to identify current active layer
    if(state.offcanvas.component === payload.component) {
        state.offcanvas.component = '';
    } else {
        state.offcanvas.component = payload.component;
    }

    // Toggle On | Set or reset layer to active depends on component that is set
    if(state.offcanvas.isActive === true && state.offcanvas.component === '') {
        state.offcanvas.isActive = false;

        // Reset direction from which offcanvas layer appears
        _.forEach(state.offcanvas.direction, function(value, key) {
             state.offcanvas.direction[key] = false;
        });
    } else {
        state.offcanvas.isActive = true;

        // Toggle Off | Set direction from which offcanvas layer appears
        _.forEach(state.offcanvas.direction, function(value, key) {
            if(payload.direction === key) {
                state.offcanvas.direction[key] = true;
            } else {
                state.offcanvas.direction[key] = false;
            }
        });
    }
}
```

Wie vielleicht bereits aufgefallen ist, wird die __`TransitionExpandLayer`__ Komponente in der __`TheMiniCart`__ Komponente 
nicht unter __`components`__ aufgelistet. Trotzdem steht diese zur Verfügung, da diese global via der Plugin Funktionalität
von NuxtJS ([Plugins](https://nuxtjs.org/guide/plugins)) eingebunden wurde und somit in allen Komponenten verwendet werden kann:

``` js
// hubble/core/plugins/global.js
import TransitionExpandLayer from '../components/transitions/TransitionExpandLayer.vue';

Vue.component('transition-expand-layer', TransitionExpandLayer);

// ...
```


Ein weiterer wichtiger Aspekt ist die automatische Schließung des Layers, wenn ein Route Wechsel stattfindet.
Dafür existiert ein __`watch`__ für __`$route.path`__:

``` js
// components/navigation/TheMiniCart.vue
watch: {
    '$route.path': function() {
        // Close menu layer if route changes
        this.hideMenu();
    }
},
```


``` js
// components/navigation/TheMiniCart.vue
import { mapActions } from 'vuex';
export default {
    methods: {
    ...mapActions({
        // ...
        hideOffcanvasAction: 'modNavigation/hideOffcanvasAction'
    }),
    hideMenu: function() {
        this.hideOffcanvasAction();
    },
}
```

Was letztendlich zum Aufruf der folgenden __`mutation`__ führt:
``` js
// hubble/core/store/modNavigation.js
hideOffcanvas: (state) => {
    // Set component name to identify current active layer
    state.offcanvas.component = '';

    // Set state of offcanvas status
    state.offcanvas.isActive = false;

    // Set direction from which offcanvas layer appears
    _.forEach(state.offcanvas.direction, function(value, key) {
        state.offcanvas.direction[key] = false;
    });
}
```

Zum aktiven Schließen des __`offCanvas`__ Layers kann der klassische Schließen Button verwendet werden, 
welches, in diesem Fall, Teil des bedingt eingebundenen Templates der Komponente __`CartLayer`__ ist:

``` html
<!-- components/navigation/CartLayer.vue -->
<button class="button-icon button-close-menu"
        @click="toggle()"
>
    <i class="icon icon-close" aria-hidden="true" />
    <material-ripple />
</button>
```

::: tip
Es existieren drei Default Werte für die Breite, die in den Viewports für __`mobile`__, __`tablet`__ und __`desktop`__ 
eingenommen werden können:
``` scss
/* transition-expand-layer.scss */
$expand-layer-width-mobile: 100%;
$expand-layer-width-tablet: 60%;
$expand-layer-width-desktop: 600px;
```
:::

## Verwendung und Anpassung des __`offCanvas`__ Layers

Beispielsweise verdeckt das __`offCanvas`__ Layer bei mobilen Viewports im Default Template die restlichen 
Seiteninhalte und eine Interaktion, sogar mit der Navigationsleiste, ist nur möglich, wenn das __`offCanvas`__ Layer
mit dem klassischen Schließbutton wieder geschlossen wurde.
In diesem Guide soll das __`offCanvas`__ Layer unterhalb der Menüleiste erscheinen und auf Klick desselben
Icons geschlossen werden, wodurch es geöffnet wurde. Desweiteren soll das Layer von oben nach unten "aufklappen" und beim
Schließen von unten nach oben "zuklappen".
Außerdem soll der Fokus zunächst auf mobilen Viewports liegen und Beschreibungen primär anhand der __`TheWishlist`__ 
und der __`WishlistLayer`__ Komponenten gemacht werden.

<ImageComponent 
    :src="$withBase('/newoffcanvas.png')"
    alt="New offCanvas design"
    backgroundColor="white">
</ImageComponent>

::: tip
Der Inhalt, der im __`offCanvas`__ eingebundenen Komponente kann länger sein, als der Viewport und ist __`scrollable`__:
``` scss
/* transition-expand-layer.scss */
.expand-content {
    height: 100%;
    overflow-y: scroll;
    /* ... */
}
```
:::

Somit ergibt sich also als erstes die Entfernung des Schließen Buttons aus dem Template der __`WishlistLayer`__,
wodurch folgende Zeilen entfernt werden können:

``` html
<!-- components/navigation/WishlistLayer.vue -->
<button class="button-icon button-close-menu" @click="toggle()">
    <i class="icon icon-close" aria-hidden="true" />

    <material-ripple />
</button>
```
Womit sich ebenfalls die, durch den Button aufgerufene, __`toggle`__ Methode und die zugehörige Auflistung der benötigten
__`action`__ erübrigt. Folgende Zeilen können entfernt werden, wobei die Blöcke __`methods`__ und __`...mapActions`__ zu erhalten sind:
``` js 
// components/navigation/WishlistLayer.vue
methods: {
    ...mapActions({
        toggleOffcanvasAction: 'modNavigation/toggleOffcanvasAction'
    }),
    toggle: function() {
        this.toggleOffcanvasAction({
            component: this.name,
            direction: 'rightLeft'
        });
    },
}
```

Wie in der obigen __`toggle`__ Funktion zu sehen ist, wird im Default Template für die __`direction`__ der Wert
__`rightLeft`__ übergeben, was ebenfalls in dem aufrufenden Layer __`The Wishlist`__ reflektiert wird:

``` html
<!-- components/navigation/TheWishlist.vue -->
<transition-expand-layer :right-left="true">
    <!-- ... -->
</transition-expand-layer>
```
Da dies nun die einzige Stelle zum Aufruf und Schließen des __`offCanvas`__ Layers ist, kann hier die neue 
__`direction`__ angegeben werden:

``` html
<!-- components/navigation/TheWishlist.vue -->
<transition-expand-layer :top-bottom="true">
    <!-- ... -->
</transition-expand-layer>
```

Die Style Definitionen für den Transition Effekt sehen wie folgt aus:

``` scss
/* components/transitions/TransitionExpandLayer.vue */
/* Animate Minicart overlay from top to bottom */
.expand-topBottom-enter-active, .expand-topBottom-leave-active {
    transition: all .45s ease-in-out;
}
.expand-topBottom-enter, .expand-topBottom-leave-to {
    top: 65px !important;
    height: 0;
}
.expand-topBottom-enter-to, .expand-topBottom-leave {
    top: 65px !important;
    height: 100%;
}
```

Die Definitionen für die __`fade-to-white`__ Transition bleiben dabei wie bisher erhalten.


Damit das __`offcanvas`__ Layer nun unterhalb der Menüleiste erscheint, sollte dieses um dessen Höhe
nach unten verschoben werden:

``` scss
/* transition-expand-layer.scss */
.transition-expand-wrp {
    // ...
    top: 65px; /* because .nav-wrp has height 65px */
}
```

Damit die Buttons unten dadurch nicht abgeschnitten werden, da es eine Verschiebung von __`top: 65px;`__ gibt,
sollten diese statt __`bottom: 0;`__ also __`bottom: 65px;`__ erhalten:

``` scss
/* the-wishlist.scss */
.wishlist-wrapper {
    .actions {
        // ...
        bottom: 65px;
    }
}
```
Somit ist auch die Verwendung von __`top: 65px !important;`__ für die Transition Styles in der
__`TransitionExpandLayer.vue`__ selbsterklärend.


#### Verlinkung von Routen im __`offCanvas`__ Layer

Um einer Komponente, die im __`offCanvas`__ Layer angezeigt wird, eine Verlinkung zu einer Route hinzuzufügen,
ist nur die Verwendung der __`<nuxt-link>`__ Komponente und die Angabe der lokalisierten URL notwendig, wie in
der [nuxt-i18n](https://i18n.nuxtjs.org/basic-usage.html#nuxt-link) Dokumentation beschrieben wird.
Im Folgenden wird die Seite, welche die zuletzt angesehenen Produkte anzeigt verlinkt:

``` html
<!-- components/customer/CustomerAccountNavigation.vue -->
<nuxt-link :to="localePath('customer-viewedproducts')" class="sidebar-link">
    <button class="button-secondary">
        {{ $t('Last Viewed Products') }}
        <material-ripple />
    </button>
</nuxt-link>
```

Bei der Navigation zu der Route wird dabei das __`offCanvas`__ automatisch geschlossen, da wie weiter oben
beschrieben wurde ein __`watch`__ auf __`$route.path`__ existiert.
