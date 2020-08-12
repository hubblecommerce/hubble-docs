# Testing

## Teststrategie in hubble und Einleitung in Cypress
hubble's Teststrategie besteht primär daraus, reales User Verhalten in Tests nachzustellen, was im
Folgenden auch als User Flow bezeichnet werden soll. 
Somit soll gewährleistet werden, dass die verschiedenen Aspekte wie UI Elemente, sowie API Responses 
wie erwartet funktionieren. Dafür wird das Testing Tool [Cypress](https://www.cypress.io/) verwendet.
Um also die korrekte Funktionsweise der unterschiedlichen Programmteile zu testen, existiert momentan kein
[Stubbing von Network Calls](https://docs.cypress.io/guides/guides/network-requests.html#Stubbing).
Jedoch sollte beachtet werden, dass es bei nicht lokalen Servern zu einer Überlastung des Servers kommen kann.
Falls es außerdem implementierte Middleware wie Rate Limiter oder ähnliches gibt, dann würde dies, bei einer großen Menge
von Anfragen, ebenfalls einen Nachteil darstellen. In solchen Fällen kann Stubbing zu einer 
erfolgreichen Teststrategie führen. Die Möglichkeiten, die Cypress dafür anbietet, werden in der offiziellen
Dokumentation im Abschnitt [Network Requests](https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies)
erläutert.

Außerdem ist es möglich, einen bestimmten State auch programmatisch zu erreichen und somit einen Aufbau über 
UI Interaktionen zu umgehen. Da die Tests, wie oben beschrieben, jedoch so genau wie möglich User Verhalten
abbilden sollen, wurde diese Funktionalität bisher nicht verwendet. Dem Anspruch entsprechend werden auch die Selektion
von UI Elementen oder die Abfrage nach Existenz eines bestimmten Elementes, soweit wie möglich, über den sichtbaren Text vorgenommen. 
Dabei können in den Tests Assertions mit Hilfe der in Cypress eingebundenen
[Chai Methoden](https://docs.cypress.io/guides/references/assertions.html#Chai), entweder im
[TDD](https://docs.cypress.io/guides/references/assertions.html#TDD-Assertions)
oder [BDD](https://docs.cypress.io/guides/references/bundled-tools.html#Mocha) Stil, erstellt werden und diese mit den
eingebundenen [Mocha Methoden](https://docs.cypress.io/guides/references/bundled-tools.html#Mocha)
(__`describe`__, __`it`__, __`context`__, etc.) in Blöcke organisiert werden. 


Beim Schreiben von Tests in Cypress sollte beachtet werden, dass die Kombination aus Cypress API Commands und den
Assertion Methoden, das gewünschte Verhalten haben, um deterministisches Testverhalten zu gewährleisten.
Denn es existieren automatische Mechanismen zur Wiederholung von Befehlen 
([Retry-ability](https://docs.cypress.io/guides/core-concepts/retry-ability.html#Commands-vs-assertions)).
Dabei erlauben unterschiedliche Rückgabewerte,
[unterschiedliches Command Chaining](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Subject-Management).
Welche Werte zurückgeliefert werden, kann in der [API Dokumentation](https://docs.cypress.io/api/api/table-of-contents.html),
je Command, im Unterpunkt __Yields__ nachgelesen werden. Außerdem sind Cypress Commands asynchron und müssen unter diesem Wissen verwendet werden
([Mixing Async and Sync code](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Mixing-Async-and-Sync-code)).

::: tip
Je nach den bestehenden Ansprüchen, Gegebenheiten und Funktionalitäten sollte immer eine passende Teststrategie gewählt werden.
:::


## Wichtige Dateien und bestehende Tests

Der beschriebenen Teststrategie entsprechend, sind Tests in hubble also nach User Flow aufgeteilt.
Jeder User Flow wird dabei sowohl für Desktop, als auch für mobile Resolutionen getestet. Die Werte der Resolutionen sind dabei
als Environment Variable in der __`~/cypress.json`__ aufgelistet:

``` js
// ~/cypress.json (simplified)
"env": {
    "resolutions": {
        "mobile": {
            "viewportWidth": 375,
            "viewportHeight": 667,
            "desktop": false
        },
        "desktop": {
            "viewportWidth": 1024,
            "viewportHeight": 768,
            "desktop": true
        }
    },
    // ...
}
```

Zur Verwendung, der im Ordner __`~/cypress/`__ befindlichen Tests, werden die Werte aus der __`~/cypress.json`__
in der __`~/support/utils.js`__ aufbereitet:

``` js
// ~/cypress/support/utils.js
const resolutions = Cypress.env('resolutions');


const mobile = {
    viewportWidth: resolutions.mobile.viewportWidth,
    viewportHeight:resolutions.mobile.viewportHeight,
    desktop: resolutions.mobile.desktop,
}


const desktop = {
    viewportWidth: resolutions.desktop.viewportWidth,
    viewportHeight: resolutions.desktop.viewportHeight,
    desktop: resolutions.desktop.desktop,
}


export const viewPortSizes = [desktop, mobile];
```


Da es bei einem Shop, wie im Abschnitt [Seitentypen](./pagetypes/) beschrieben, auch viele Seiten und Use Cases gibt, die
einen eingeloggten Benutzer voraussetzen und die korrekte Funktionalität von Login und Registrierung ausschlaggebend ist für
Seitenbesucher, sollten die entsprechenden User Flows getestet werden. Hier existieren bereits einige Tests in hubble: Die 
Generierung von User Daten, die für die Bereitstellung eines eingeloggten Users benötigt werden, findet über
[faker.js](https://github.com/marak/Faker.js/) statt.
Um auch für Livetests, die gegen einen Live-Server laufen, ein erkennbares Emailformat zu gewährleisten, existiert folgende
Environment Variable:

``` js
// ~/cypress.json
"env": {
    "emailBase": "<ENTER-YOUR-PREFIX-HERE>-$placeholder@<ENTER-YOUR-DOMAIN-HERE>.com"
}
```

Der Abschnitt __`$placeholder`__ wird dabei von den von [faker.js](https://github.com/marak/Faker.js/) generierten
Daten ersetzt und sollte somit nicht editiert werden. Im Folgenden ist die Verwendung der Environment Variable
__`emailBase`__ zu sehen:

``` js
// ~/support/utils.js
const faker = require('faker');

export function getRandomEmail () {
    const emailBase = Cypress.env('emailBase');

    faker.locale = "en"; // Emails dürfen keine Umlaute enthalten

    const randomSuffix = `${faker.name.firstName()}${faker.name.lastName()}`;

    return emailBase.replace('$placeholder', randomSuffix);
}
```

Diese Funktion, die __`emailBase`__ verwendet, befindet sich ebenfalls in der __`~/support/utils.js`__, da diese
für alle Tests zur Verfügung stehen soll.

Auf die gleiche Art werden auch Passwörter oder weitere Account Daten mit [faker.js](https://github.com/marak/Faker.js/) generiert:

``` js
// ~/support/utils.js
export const getRandomPw = () => faker.internet.password();
```

Beispielsweise gilt es für den Checkoutprozess ohne eingeloggten Benutzer, trotzdem ein Formular auszufüllen,
welches, die für die Bestellung relevanten Einträge erwartet. Diese lassen sich wie folgt generieren:

``` js
// ~/support/utils.js
export function getGuestData () {
    const guestEmail = getRandomEmail();

    faker.locale = "de"; // die Email darf keine Umlaute enthalten, die folgenden Daten schon

    const guestFirstName = faker.name.firstName();
    const guestLastName = faker.name.lastName();
    const guestStreet = faker.address.streetAddress();
    const guestZipCode = faker.address.zipCode();
    const guestCity = faker.address.city();

    return {
        guestEmail,
        guestFirstName,
        guestLastName,
        guestStreet,
        guestZipCode,
        guestCity
    }
}
```
Diese Hilfsfunktion und ihre Rückgabewerte lassen sich nun in der __`~/cypress/integration/buy_product_guest_flow.js`__,
die den Gast Checkout Flow testet, verwenden:

``` js
import { getGuestData, selectAnOption, viewPortSizes } from "../support/utils"


const { guestEmail, guestFirstName, guestLastName, guestStreet, guestZipCode, guestCity } = getGuestData()
```

Ein Ausschnitt zu der konkreten Verwendung der eingebundenen Werte sieht wie folgt aus:

``` js
describe('Buy Product Guest Flow', function () {
    viewPortSizes.forEach(viewport => {

        describe(`Tests for ${viewport.viewportWidth} w x ${viewport.viewportHeight} h`, function () {

            beforeEach(() => {
                cy.viewport(viewport.viewportWidth, viewport.viewportHeight)
            })

            it('selects a category', function () {
                cy.acceptCookies()

                cy.pickCategory(viewport.desktop)
            })

            it('enters guest customer data', function () {
                cy.get('#email')
                    .type(guestEmail)
                    .should('have.value', guestEmail)
            
                cy.get('#firstName')
                    .type(guestFirstName)
                    .should('have.value', guestFirstName)
            
                // ...
            })
        })
})
```

In dem Testfall __`it('selects a category', function () {}`__ befinden sich dabei zwei Funktionsaufrufe, die noch nicht erläutert wurden.
Es handelt sich hierbei um sogenannte [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands.html#Syntax),
die beispielweise ähnlich zu __`cy.get()`__ wiederverwendet werden können und somit also wiederverwendbare Testlogik an einer Stelle bündeln.
Einer der wichtigen Custom Commands, die in hubble existieren, ist __`cy.login()`__. Wie beschrieben gilt es für einige Shop Seiten
eingeloggte Benutzer bereitzustellen, wofür erst eine Registrierung und dann jeweils immer derselbe Login Prozess erfolgen muss.
Daher ist dies ein geeigneter Fall für einen Custom Command. Dabei sollten Custom Commands sich in der __`~/cypress/support/commands.js`__
befinden, da dessen Inhalte automatisch in Testdateien, auch als Spec Files geläufig, zur Verfügung stehen.

``` js
Cypress.Commands.add("login", (email, password, desktop) => {
    if (!desktop) cy.get('.customer-account-cpt-wrp').click()


    register(true, desktop, email, password)


    cy.get('#email')
        .type(email)
        .should('have.value', email)


    cy.get('#password')
        .type(password)
        .should('have.value', password)


    cy.get('form')
        .find('button')
        .contains('Login')
        .click()


    cy.contains('Logout')
    
    // ...
}
```

Für eine vollständige Liste der in hubble verfügbaren Custom Commands, kann die
[__`~/cypress/support/commands.js`__](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/master/cypress/support/commands.js)
referenziert werden.


## Deaktivieren von einzelnen Testfällen innerhalb einer Spec Datei

Es besteht die Möglichkeit einzelne Tests bei Bedarf zu deaktivieren, wodurch diese übersprungen werden im Testdurchlauf, jedoch
trotzdem, in einer gesonderten Farbe, mit aufgelistet werden.

``` js{19}
// ~/cypress/integration/buy_product_flow.js (simplified)
describe(`Tests for ${viewport.viewportWidth} w x ${viewport.viewportHeight} h`, function () {
    // ...

    it('selects a product & adds to cart', function () {
        cy.get('.listing-wrp .listing-item .product-card')
            .should('be.visible')
            .pickRandomProduct()
    
    
            cy.contains('Add to Cart').click()
    
    
            cy.contains('Successfully added item to cart.')
            cy.contains('Shopping Cart')
            cy.contains('Keep shopping')
    })

    it.skip('goes to shopping cart & goes to checkout', function () {
        cy.contains('Shopping Cart')
            .should('exist')
            .click()
    
    
            cy.url()
                .should('include', '/checkout/cart')
                .wait(800)
    
    
            cy.contains('Go to checkout')
                .should('exist')
                .click()
    
    
            cy.url()
                .should('include', '/checkout/shopware-onepage')
    })
})
```


### Übersicht zu der Ordnerstruktur von __`~/cypress/`__

Eine detaillierte Beschreibung der Funktionsweise der unterschiedlichen Dateien kann in der offiziellen Dokumentation
im Abschnitt [Writing and Organizing Tests](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Folder-Structure)
nachgelesen werden.


## Konfiguration
Um die in hubble existierenden Tests auszuführen, ist es notwendig, für die zu generierenden Emails einen Prefix und eine Domain anzugeben:
``` json5
{
   "emailBase": "<ENTER-YOUR-PREFIX-HERE>-$placeholder@<ENTER-YOUR-DOMAIN-HERE>.com"
}
```

## Cypress Tests Starten

Es existieren zwei Möglichkeiten Cypress Tests zu starten: Zum einen ist es möglich den visuellen Ablauf zu verfolgen und nach Testdurchlauf 
jeden Schritt zu untersuchen.

```bash
npx cypress open 
```

In dieser Variante sind Spec Dateien einzeln auszuwählen und es wird daraufhin ein Browserfenster mit dem Test geöffnet und automatisch
gestartet.

Zum anderen ist es möglich Tests direkt über das Terminal durchlaufen zu lassen, was sich auch für einen Continuous Integration Prozess eignet:

```bash
npx cypress run 
```
Bei diesem Befehl werden jedoch alle Spec Dateien, die sich im __`~/cypress/integration/`__ Ordner befinden, durchlaufen.
Da dies oft nicht notwendig ist und längere Zeit beansprucht, als einen einzelnen relevanten Test durchzuführen,
gibt es auch bei der Verwendung des Terminals eine Möglichkeit eine einzelne Datei aufzurufen:
```bash
npx cypress run --spec "cypress/integration/<SPEC>.js" 
``` 