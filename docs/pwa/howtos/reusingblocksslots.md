# Abbildung der Erlebniswelten in hubble

::: tip
Dieser Abschnitt verwendet Shopware 6 Erlebniswelten Terminologie, die hier nicht näher erläutert wird.
Dafür kann der Abschnitt [Backends/Shopware6](../backends/shopware6.md) der Dokumentation oder die Einleitung auf der
Shopware Seite zum Thema [Erlebniswelten](https://docs.shopware.com/en/shopware-6-en/content/ShoppingExperiences)
referenziert werden.
:::


Für die Individualisierung der __Image Text Cover__ Erlebniswelt Komponente, welche durch die 
__`~/components/swComponents/blocks/image-text-cover.vue`__ in hubble abgebildet wird,
gilt es als erstes in der gewünschten Erlebniswelt einer Section, diesen Block hinzuzufügen.

Da es sich hier um Blöcke handelt, welche auf anderen Seiten eingebunden werden, sollten die globalen Style Definitionen
und Änderungen im Template nur in dem Maße angepasst werden, indem diese somit auch wiederverwendet werden können.
Um auf bestimmten Seiten jedoch eine stärkere Individualisierung vorzunehmen, ohne alle anderen Seiten dadurch zu beeinflussen,
gibt es trotzdem eine Möglichkeit dies zu tun: Das Setzen von Klassen im Erlebniswelten Layout Editor.
Dies bewirkt Scoping gegeben durch die stärkere Spezifität der Selektoren.

Diese Klassen stehen im Response Objekt aus dem API Call im Feld __`cssClass`__ zur Verfügung:

``` js
// ~/components/swComponents/block.vue
computed: {
    cssClass() {
        return this.content.cssClass != null ? this.content.cssClass : '';
    },
}
```

Da im Shopware Erlebniswelten Editor die Vergabe von mehreren Klassen möglich ist und diese per Leerzeichen zu trennen sind,
kann der Wert für __`cssClass`__ also beispielweise wie folgt aussehen:

``` scss
hero-section--product revealOnHover
```

Diese Klassen werden dann im Template explizit auf den äußersten Tag gesetzt, wodurch alle inneren freigelegten Slots etc.
über die oben beschriebenen spezifischen Selektoren ausgewählt werden können.

``` html
<!-- ~/components/swComponents/block.vue -->
<template>
    <div class="cms-block" :class="[blockClass, backgroundImageExists, cssClass]" :style="backgroundStyles">
        <div class="cms-block-container" :style="paddingStyles">
            <component :is="getComponent" :content="content" class="cms-block-container-row row cms-row" />
        </div>
    </div>
</template>
```

Der konkrete Block ist in diesem Fall __`image-text-cover`__, mit der Klasse __`cms-block-image-text-cover`__.

``` js
computed: {
    getComponent() {
        return this.getBlockByType(this.content.type);
    }
}
```

Der anzuzeigende Block wird dabei durch das Mixin __`sectionMixins`__ in der __`~/components/swComponents/helper.js`__ 
bereitgestellt:

``` js
export const sectionMixins = {
    methods: {
        getBlockByType(type) {
            return returnBlockByType(type);
        }
    }
}
```

Dieses Mixin wiederum verwendet die Helper Funktion __`returnBlockByType`__, die ebenfalls
in der __`~/components/swComponents/helper.js`__ enthalten ist.

``` js
function returnBlockByType(type) {
    return () =>
        import('./blocks/' + type).catch(() => {
            return import('./NoComponent')
        })
}
```

::: tip
Die Helferfunktionen im Zusammenhang der Shopware Erlebniswelten und deren Abbildung in hubble befinden sich in 
dem Ordner __`~/components/swComponents/helper.js`__.
:::
