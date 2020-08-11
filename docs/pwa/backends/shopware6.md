# Shopware 6 

Bei der Wahl von Shopware 6 als Backend Shopsystem, verwendet hubble nicht die hubble Data API, sondern
die REST API Endpoints, die Shopware für verschiedene Entitäten bereitstellt. 
Zum einen ist dies die [Sales Channel API](https://docs.shopware.com/en/shopware-platform-dev-en/sales-channel-api),
die verschiedene Funktionalitäten für den Warenkorb, den Kunden,
Produkte und sogar die Authentifikation bereitstellt und zum anderen ist dies die neue 
[Store API](https://docs.shopware.com/en/shopware-platform-dev-en/store-api-guide). 
Für die Authentifikation in Shopware wird ein __`sw-access-key`__ benötigt. Im Folgenden ist ein klassischer 
Ablauf zum Erhalt und Verwendung dieses Keys dargestellt:

#### Shopware als Backend: __`sw-context-token`__ und __`sw-access-key`__

Durch das Hinzufügen von Produkten zum Warenkorb wird durch die __`ProductDetailAddToCart`__ Komponente bei der ersten
Interaktion eine __`action`__ im zugehörigen Vuex Store Modul __`sw/modCart`__ aufgerufen, mit der Aufgabe einen 
[sw-context-token](https://docs.shopware.com/en/shopware-platform-dev-en/sales-channel-api/sales-channel-cart-api?category=shopware-platform-dev-en/sales-channel-api)
zu erhalten. Da dieser Token in subsequenten Interaktionen mit der API benötigt wird, wird dieser im darauf folgenden Schritt lokal
im Vuex Store und zusätzlich als Cookie im Browser abgespeichert.

Die Voraussetzung, um einen __`sw-context-token`__ von der API zu erhalten, ist das Setzen des Auth Tokens im Request. 
Dieser Auth Token ist im Admin Panel erreichbar und muss in die __`~/.env`__ Datei des Projektes eingetragen werden.
Mehr Informationen zum Umgang mit den in der __`~/.env`__ eingetragenen Werte gibt es im Abschnitt
[Konfiguration](../configuration.md).


* __Schritt 1__: Eintrag des Auth Keys in die __`~/.env`__

``` js
// ~/.env
API_SW_ACCESS_KEY = <KEY-FROM-ADMIN-AREA>
```

::: warning
Client-seitig erlaubte Keys müssen in der __`~/nuxt.config.js`__ auf die Whitelist gesetzt werden,
damit diese zur Verfügung stehen. Zur korrekten Einrichtung sollte der Abschnitt [Konfiguration](../configuration.md) referenziert werden.
:::


* __Schritt 2__ : Zur Verwendung des Keys wird __`process.env`__ referenziert
``` js
// ~/modules/@hubblecommerce/hubble/core/store/modApi.js
let authToken = process.env.API_SW_ACCESS_KEY
```

Dies bedeutet, dass im Falle von Shopware der __`sw-context-token`__ kennzeichnendes Merkmal der Session ist.
Dadurch wird ermöglicht, dass Shopbesucher Produkte dem Warenkorb beliebig hinzufügen und entfernen können, sowie die
gewünschte Menge anpassen können, ohne sich dabei anmelden oder registrieren zu müssen.

::: tip
Die Reihenfolge der Zustandsspeicherung nach Veränderung des States folgt immer demselben Schema:
Ein Request an einen API Endpunkt wird über die __`action`__ __`modApi/apiCall`__ gemacht, welche den API Access Key aus
der __`~/.env`__ und den __`sw-context-token`__ benötigt. Die Response dazu wird im lokalen Vuex Store mit Hilfe des Moduls
__`sw/modCart`__ gespeichert und anschließend im Browser als Cookie und per __`$localForage`__ gespeichert.
Der Aufruf der __`action`__ __`sw/modCart/saveCartToStorage`__ folgt immer auf jenen API Request, der aufgrund
einer Interaktion mit dem Warenkorb ausgelöst wurde.
:::

Für Details zu verwendeten Modulen, im Zusammenhang mit dem Thema Sessions, kann der Abschnitt
[Sessions](../architectureanddataflow/sessions.md) der Dokumentation referenziert werden.


Im Folgenden ist ein klassischer Ablauf zu sehen, bei dem zuerst ein Request an die Shopware API versendet wird
und darauffolgend das Response Objekt verwertet wird. 


Der Aufruf der __`action`__ __`swUpdateLineItem`__ führt zu einem API __`patch`__ Request an die Shopware Sales Channel API. 

``` js
// ~/modules/@hubblecommerce/hubble/core/store/sw/modCart.js
updateItem({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
        // makes API patch request w/ payload object
        dispatch('swUpdateLineItem', { id: state.productToUpdate, qty: state.qtyToUpdate })
            .then((res) => {
                // updates vuex store state 
                commit('setCartItemsCount', state.cart.items_qty + payload.qty );

                // saves cart to browser storage via localForage
                dispatch('saveCartToStorage', { response: res }) 
            }
        }
}
```



``` js
// ~/modules/@hubblecommerce/hubble/core/store/sw/modCart.js
swUpdateLineItem({commit, state, dispatch, rootState, getters}, payload) {
    const _endpoint = `/sales-channel-api/v1/checkout/cart/line-item/${payload.id}`;

    return new Promise((resolve, reject) => {
        dispatch('apiCall', {
            action: 'patch',
            tokenType: 'sw',
            apiType: 'data',
            swContext: state.swtc,
            endpoint: _endpoint,
            data: {
                quantity: payload.qty
            }
        }, { root: true })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                console.log("swUpdateLineItem error: ", error);

                reject(error);
            });
        });
},
```

## Darstellung der Shopware Erlebniswelten 

Um die Abbildung von Erlebniswelten in der hubble PWA zu verstehen, ist es wichtig, nicht nur die
Definition, sondern auch die Terminologie zu kennen, welche Shopware verwendet:

Shopware's Erlebniswelten bieten eine Möglichkeit für Shop Administratoren eigenständig im Admin Bereich,
aus bestehenden Komponenten, eine Seite per Drag & Drop zu erstellen. 
Dabei ist die Kernidee Content Management und eCommerce auf einer Seite jeweils
zu vereinen ([Erlebniswelten: Content Management in Shopware 6](https://www.shopware.com/de/news/erlebniswelten-content-management-in-shopware-6/)).
Die Art von Komponenten, die sich in den Erlebniswelten Seiten einbinden lassen, werden in Shopware als
__Blöcke__ bezeichnet. Diese bieten sogenannte __Slots__ an, um eine Positionierung von sogenannten Elementen zu ermöglichen.
Blöcke sind im Admin Bereich gruppiert in beispielweise __Text__, __Image__ und __Text+Image__. Dabei können Blöcke vom Typ __Text__, nur den
Element Typen __Text__ in dem entsprechenden Slot darstellen.

Eine weitere Ebene zur Gruppierung bieten sogenannte __Sections__, die mehrere Blöcke einbinden können. 
Somit besteht also eine Seite, die mit den Erlebniswelten im Shopware Admin Bereich erstellt wurde, aus mehreren Sections.

Zu diesem Thema existiert eine Einleitung in der Shopware 6 Dokumentation, die unter dem Kapitel
[Erlebniswelten](https://docs.shopware.com/de/shopware-6-de/Inhalte/Erlebniswelten?category=shopware-6-de/inhalte)
einsehbar ist.

Die Erlebniswelten zählen zum Entitätstyp Kategorie, wodurch die __`state.modApiResources.pageType`__
State Variable in hubble den Wert __`category`__ erhält und somit über die __`~/components/productlist/ViewCategory.vue`__ 
Komponente dargestellt wird. Hier einmal ein stark vereinfachter, für den Fall Shopware -
in Bezug auf Erlebniswelten - direkt relevanter, Auszug:

``` js{6-9}
// ~/components/productlist/ViewCategory.vue
<template>
    <div class="view-category">
        <template v-if="isShopware">
            <div class="container">
                 <sw-section v-for="cmsSection in cmsSections"
                            :key="cmsSection.id"
                            :content="cmsSection"
                 />
            </div>
        </template>
    <div>
</template>
```

Wie in den oben markierten Zeilen zu erkennen ist, wird in hubble über die Sections iteriert, die der
Erlebniswelt im Admin Bereich hinzugefügt wurden.
Die hubble Komponenten zur Darstellung der Erlebniswelten befinden sich im Ordner __`~/components/swComponents/section.vue`__.
Zur Abbildung der Blöcke und deren Slotinhalte, existieren die Unterordner __`/blocks`__ und __`/slots`__. 
Falls es Blöcke oder Elemente geben sollte in Zukunft, für die es keine entsprechende Dateien in hubble gibt, dann gibt es
dafür die __`NoComponent`__ Komponente. Das Mapping der API Response und somit die korrekte Darstellung, geschieht mit Hilfe der 
__`~/components/swComponents/helper.js`__ Datei. Diese enthält einige Helper Funktionen, welche die jeweiligen, aus den Ordnern
__`/blocks`__ und __`/slots`__, benötigten Komponenten importiert.

#### Beispiel - Die Abbildung des Erlebniswelten Block Typs __"Image"__ in hubble:

__Das Template__:
``` js
// ~/components/swComponents/blocks/image.vue
<template>
    <div>
        <div class="col-12">
            <component :is="getSlot" :content="getContentByPosition(content.slots, 'image')" />
        </div>
    </div>
</template>
```

__Das Skript__:
``` js
<script>
  import { blockMixins } from '../helper'

  export default {
      name: 'ImageBlock',

      mixins: [blockMixins],

      props: {
          content: {
              type: Object,
              default: () => ({})
          }
      },

      computed: {
          getSlot() {
              return this.getSlotByPosition(this.content.slots, 'image');
          }
      }
  }
</script>
```

Wie, sowohl in der __`computed`__ Property, als auch im Template zu erkennen ist, werden die folgenden Helper Funktionen
aus der __`~/components/swComponents/helper.js`__ verwendet:

``` js
// ~/components/swComponents/helper.js
export const blockMixins = {
    methods: {
        getSlotByPosition(slots, position) {
            let typeName = ''
            _.forEach(slots, slot => {
                if (slot.slot === position) {
                    typeName = slot.type
                }
            })
            return returnSlotByType(typeName)
        },
        getContentByPosition(slots, position) {
            let slotContent = {}
            _.forEach(slots, slot => {
                if (slot.slot === position) {
                    slotContent = slot
                }
            })
            return slotContent
        }
    }
}
```

Die __`getSlotByPosition`__ ist dann letztendlich für das importieren zuständig, sei es des Elements, welches
im jeweiligen Slot, in diesem Fall __`image`__,  angezeigt werden soll oder der Placeholder Komponente
__`~/components/swComponents/NoComponent.vue`__, falls es keine
entsprechende zu importierende Komponente gibt in hubble.

``` js
// ~/components/swComponents/helper.js
function returnSlotByType(type) {
    return () =>
        import('./slots/' + type).catch(() => {
            return import('./NoComponent')
        });
}
```

Zusammenfassend lässt sich somit also sagen, dass hubble die Basis für die Einbindung von neuen Custom Erlebniswelt Blöcken
und Elementen bereitstellt. Es gilt nur die entsprechenden Komponenten in den Ordnern __`/blocks`__ und __`/slots`__, unter
der Verwendung der Helper Funktionen in der __`~/components/swComponents/helper.js`__, nach demselben Muster zu erstellen. 
Für die Erstellung von Custom Komponenten, die im Adminbereich des Shopware Erlebniswelten Editors zur
Verfügung stehen sollen, können dabei die folgenden Kapitel der Shopware Entwicklerdokumentation referenziert werden:
+ [Adding a custom CMS block](https://docs.shopware.com/en/shopware-platform-dev-en/how-to/custom-cms-block)
+ [Adding a custom CMS element](https://docs.shopware.com/en/shopware-platform-dev-en/how-to/custom-cms-element?category=shopware-platform-dev-en/how-to)

Für Möglichkeiten zur Individualisierung existierender Erlebniswelt Komponenten in hubble kann der Abschnitt
[Abbildung der Erlebniswelten in hubble](../howtos/reusingblocksslots.md) in der [How To](../howtos) Section
dieser Dokumentation referenziert werden.