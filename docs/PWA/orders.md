# Bestellungen

Durch das Hinzufügen von Produkten zum Warenkorb öffnet sich jedes Mal ein __`offCanvas`__ Fenster,
welches es ermöglicht zur Vollansicht des Warenkorbs zu gelangen. Auf dieser Vollansicht unter 
der Route __`/checkout/cart`__ gibt es die Möglichkeit den Checkout Prozess zu starten. 

Falls es beim Starten des Checkout Prozesses keinen eingeloggten Benutzer gibt, dann führt dies zu
einem Routenwechsel zu __`/checkout/login`__, die durch __`~/pages/checkout/login.vue`__ definiert ist.
Diese Route gehört zu denen, die als Layout das __`hubble_light`__ Layout verwenden.

::: tip
Details zu den in hubble verfügbaren Layouts und den jeweils eingebundenen Komponenten gibt es im Abschnitt
[Layouts](../einfuehrung/layouts.md).
:::

Dieses Layout enthält gegenüber dem Default Layout __`hubble`__ für __`lg`__ Viewports noch die Komponente
__`<checkout-progress-bar />`__. Diese dient zur Navigation zwischen den vier Schritten des Checkout Prozesses:
1. Anmelden
2. Zahlungsart
3. Bestätigen
4. Fertig

Jedoch muss für eine Bestellung kein Login und auch keine Registrierung durchgeführt werden: Shop Besucher können auch
als Gast eine Bestellung aufgeben. 
Bei der Auswahl "__Als Gast bestellen__" wird dabei je nach __`API_TYPE`__ unterschieden, welche Ansicht als 
nächstes angezeigt werden soll:

| __`API_TYPE`__ |  |
| --- | --- | 
| __`sw`__ | Routenwechsel zur Seite __`~/pages/checkout/shopware-guest.vue`__ |
| __`api`__ | Verwendung der __`~/components/customer/RegisterForm.vue`__ Komponente mit prop __`:guest="true"`__; kein Routenwechsel |

::: tip
Durch den Routenwechsel bei __`API_TYPE==='sw'`__ verändert sich das im Checkout Prozess verwendete Layout
auf __`hubble_express`__  wodurch die oben beschriebene __`<checkout-progress-bar />`__ nicht mehr angezeigt wird,
da diese nur Teil des __`hubble_light`__ Layouts ist.
:::

Somit ist bei bei der Bestellung als Gast die Angabe des Passwortes ausgeblendet,
da nur Daten zur Erfüllung des Bestellungsauftrags, wie z.B. Versand- und Rechnungsaddresse, notwendig sind. 


In dem Fall, dass über ein Login fortgefahren wird, gibt es nach Verifizierung der eingegebenen Credentials einen 
Routenwechsel, der ebenfalls vom __`API_TYPE`__ abhängt:
| __`API_TYPE`__ |  |
| --- | --- | 
| __`sw`__ | Routenwechsel zur Seite __`~/pages/checkout/shopware-onepage.vue`__ |
| __`api`__ | Routenwechsel zur Seite __`~/pages/checkout/payment.vue`__ |



### In __`~/pages/checkout/payment.vue`__  eingebundene Komponenten

| Komponente | Aufgaben |
| --- | --- | 
| __`<customer-addresses />`__ | zur Darstellung und Ermöglichung der Änderung der Versand- & Rechnungsaddresse |
| __`<payment-methods />`__ | zur Darstellung der Bezahloptionen |
| __`<shipping-methods />`__ | zur Darstellung der Versandmethoden |
| __`<coupons />`__ | zur Eingabe von Coupon Codes |
| __`<order-comment />`__ | zur Darstellung & Eingabe eines Bestellkommentars; Eingabefeld ist synchronisiert mit dem Vuex Store |
| __`<material-ripple />`__ | steuert Ripple Animation für Button |



### Absendung der Bestellung
Nach Auswahl der Bezahlart, Versandart und weiteren möglichen Tätigkeiten, die sich aus den unter den in der 
__`~/pages/checkout/payment.vue`__
eingebundenen Komponenten ergeben, gibt es bei der Fortsetzung des Checkout Prozesses einen Routenwechsel zur 
__`~/pages/checkout/summary.vue`__. Damit jedoch dieser Routenwechsel stattfindet, wird vorher ein Request für eine
__`uuid`__  gestartet, die zusammen mit dem Warenkorb als Cookie gespeichert wird. An dieser Stelle ist die Bestellung
noch nicht aufgegeben und es wurden lediglich der lokale Store __`state`__ und ein Cookie zur Zwischenspeicherung verwendet.
Falls an dieser Stelle bereits Fehler auftreten, gibt es keinen Routenwechsel, also keine Fortsetzung des Checkout
Prozesses, sondern eine Fehlermeldung in Form einer __`FlashMessage`__.

``` js
// ~/pages/checkout/payment.vue
// validate order and save to cookie then redirect to summary page
this.createOrderAction()
    .then(() => {
        this.$router.push({
            path: this.localePath('checkout-summary')
        });
    })
    .catch((error) => {
        this.flashMessage({
            flashType: 'error',
            flashMessage: this.$t(error)
        });
    });

```

Die von __`~/pages/checkout/summary.vue`__ dargestellte Route, enthält eine Übersicht über alle Bestelldaten und nun auch
die Möglichkeit die Bestellung abzusenden. 



### Einsicht bisheriger Bestellungen
Bestellungen, die bereits den Checkout Prozess durchlaufen haben werden durch die __`~/pages/customer/dashboard.vue`__
auf der Route __`/customer/dashboard`__ mit Hilfe der __`<customer-order-list />`__ Komponente dargestellt und außerdem auch 
getrennt von der generellen Kontoübersicht unter der Route __`/customer/orders`__. 


