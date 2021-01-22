# Jest

## Einleitung Jest in Hubble
Jest wird in hubble für unit testing verwendet und behandelt im Optimalfall pro test nur eine Datei und mockt andere funktionen und componenten die von dieser Datei genutzt werden um den Scope einzelner Tests möglichst klein zu halten. Getestet werden mit Jest vorwiegend vue Komponenten die entweder viel logik enthalten, und somit fehleranfällig bei änderungen sind, und Komponenten die sich dynamisch nach interaktion ändern und daten anzeigen.

## Setup Jest
Um Jest tests in hubble nutzen zu können müssen folgende dev dependecies in die __`package.json`__ im root directory des Nuxt Projekts kopiert werden:

``` js
"devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "@vue/test-utils": "^1.1.2",
    "babel-core": "^7.0.0-bridge.0",
    "babel-jest": "^26.6.3",
    "jest": "^26.6.3",
    "jest-expect-message": "^1.0.2",
    "jest-serializer-vue": "^2.0.2",
    "vue-jest": "^3.0.7"
  }
```

Sowie fogende befehle unter scripts:

``` js
"scripts": {
    "test:hubble": "jest --config=modules/hubble-frontend-pwa/@hubblecommerce/hubble/jest.config.js",
    "test:components": "jest --testPathPattern=/components/ --config=modules/hubble-frontend-pwa/@hubblecommerce/hubble/jest.config.js",
    "test:store": "jest --testPathPattern=/store/ --config=modules/hubble-frontend-pwa/@hubblecommerce/hubble/jest.config.js"
  }
```

nach einem npm install können nun die Jest tests aufgerufen werden mit den befehlen:

    - 'npm run test:hubble': Führt alle Tests im hubble __tests__ ordner aus
    - 'npm run test:components': Führt alle Tests im __tests__/components/ ordner aus
    - 'npm run test:store': Führt alle Tests im __tests__/store/ ordner aus

## Aufbau von Jest Vue Component Tests
Tests von vue components finden in hubble als Blackbox Tests statt. Es werden mögliche Interaktionen durch den Nutzer simuliert und überprüft ob das erwartete Ergebnis in Form von änderungen im DOM oder durch Funktionsaufrufe eintritt. Die Testdatei heißt nach Jest konvention immer so wie die zu testende datei plus den zusatz __`.test.js`__ oder __`.spec.js`__. Im nachfolgenden Beispiel wird die Component __`ExampleComponent.vue`__ getestet, somit heißt die dazugehörige Testdatei __`ExampleComponent.test.js`__.

``` vue
// ExampleComponent.vue
<template>
    <div>
        <div class="testDiv" v-text="textData" />
        <div class="testDiv" v-text="secondText">
        <input v-model="textData" />
        <button @click="changeText()" />
        <button @click="callVuexAction()" />
        <button @click="getTextFromVuexAction()" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        textProp: {
            type: String,
            required: false,
            default: 'default text'
        }
    },
    data() {
        return {
            textData: this.textProp,
        }
    },
    computed: {
        ...mapState({
            secondText: (state) => state.testVuexStore.secondText
        })
    },
    methods: {
        ...mapActions({
            testVuexAction: 'testVuexStore/testVuexAction',
            testVuexGet: 'testVuexStore2/testVuexGet'
        })
        changeText: function () {
            this.text = 'button pressed'
        },
        callVuexAction: function () {
            this.testVuexAction(this.textData)
        }
    }
}
</scipt>
```

Ein Jest test besteht immer mindestens aus dem imports der zu testenden Datein und mindestens einen Test. Da wir Vue components testen benötigen wir immer noch mindesten die Funktion mount von vue-test-utils:

``` js
// ExampleComponent.test.js
import { mount } from '@vue/test-utils'
import ExampleComponent from 'path/to/component/ExampleComponent'
```

Die Component ExampleComponent kann nun entweder in einer beforeAll bzw. beforeEach mit mount in einen wrapper gepackt werden oder direkt im test:

``` js
    test('Example Test', async () => { // Der Test muss async sein wenn Inputs getestet werden
        let wrapper = mount(ExampleComponent, {})

        expect(wrapper.vm.textData).toBe('default Text')// mit wrapper.vm kann auf Data zugegriffen und diese überprüft werden
        expect(wrapper.findAll('testDiv').at(0).text()).toBe('default Text')// findet das div mit der class 'testDiv' und überprüft ihren inhalt

        wrapper.findAll('button').at(0).trigger('click')// Simuliert button click
        await wrapper.vm.$nextTick()// wartet auf aktualisierung des DOM

        expect(wrapper.findAll('testDiv').at(0).text()).toBe('buttonPressed')// der Text des Div hat sich geändert da durch den click changeText() aufgerufen wurde
    })
```

__`wrapper.findAll()`__ nimmt als argument CSS selectoren entgegen und gibt ein wrapperArray mit allen treffern zurück. würde man z.b. __`wrapper.findAll('button')`__ aufrufen wird eine wrapperArray mit 2 elementen zurückgegeben da es 2 button elemente im template gibt. So kann jetzt mit __`wrapper.findAll('button').at(0)`__ auf den ersten und __`wrapper.findAll('button').at(1)`__ auf den zweiten button zugegriffen werden.

Wenn man mehrere Tests schreibt die die gleiche konfiguration brauchen ist es einfacher die Component in einem __`beforeAll()`__ zu mounten, bzw. wenn wir jeden Test ein frisch initialisierter wrapper benötigt __`beforeEach()`__ welches vor jedem test einmal aufgerufen wird.

## Vuex in components

Nutzt die Vue component Vuex muss dieses im Test als Mock angegeben werden damit der Test nicht mit einer fehlermeldung endet. Dafür werden zusätzlich weitere imports benötigt

``` js
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
```

Insofern über Vuex actions keine daten bezogen werden z.b. durch ein __`Promise.resolve()`__ kann einfach __`dispatch`__ und __`commit`__ komplett als Mock definiert werden um das aufrufen durch einen __`.toHaveBeenCalledWith()`__ matcher einfach zu testen.

Es können außerdem Module definiert werden mit denen man states und actions mit rückgabewerten mocken kann im entsprechenden namespace durch __`namespaced=true`__ und dem entsprechenden modulnamen im store.

``` js
let store
let wrapper

beforeAll( () => {
    const localVue = createLocalVue()//schafft eine isolierte testumgebung
    localVue.use(Vuex)

    const mockModule = {
        namespaced = true,
        state: {
            secondText = 'text from state'
        }
    }

    store = new Vuex.Store({
        modules: {
            testVuexStore: mockModule
        }
    })
    
    store.commit = jest.fn()
    store.dispatch = jest.fn()

    wrapper = mount(ExampleComponent, {
        localVue,
        store,
        PropsData: {//mit PropsData können beim mount props gesetzt werden
            textProp: 'initial Text'
        }
    })
})

test('Test vuex call from component', async () => {
    expect(wrapper.findAll('testDiv').at(0).text()).toBe('initial Text')
    expect(wrapper.findAll('testDiv').at(1).text()).toBe('text from state')

    wrapper.findAll('button').at(1).trigger('click')
    await wrapper.vm.$nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(
        'testVuexStore/testVuexAction',
        'initial Text'
    )//überprüft ob die erwartete vuex action mit entsprechender payload aufgerufen wurde
})
```

# 

Da in hubble sämtlicher text durch die __`$t`__ Funktion übersetzt wird ist es nötig diese als mock im wrapper anzugeben da es sonst zu fehlermeldungen kommt. Am einfachsten geht dies indem man __`$t`__ als const deklariert und sie beim __`mount'__ als Mock übergibt.

```js
const $t = (msg) => msg//übergibt den input string als output

beforeAll( () => {
    wrapper = mount(ExampleComponent, {
        mocks: {
            $t
        }
    })
})
```

# store mapping tests

Jest beinhaltet neben component tests auch tests des stores die das korrekte Mapping von Shopware daten überprüft. Für das Testen des mappings wird im __`beforeAll()`__ der API call an Shopware getätigt und mit der Response das mapping aufgerufen mit dessen Ergebnis die Tests durchgeführt werden. Die Daten die gemapped wurden sind werden dann mit den zu erwartenden Daten verglichen. Die zu erwartenden Daten werden in einer config Datei außerhalb des tests definiert und im __`beforeAll()`__ durch die Hilfsfunktion __`computeTestArrays()`__ in ein iterierbares Array umgewandelt. Jedes Element dieses Arrays beeinhaltet den Namen des zu prüfenden Elements, den erwarteten Typen (String, Number, Boolean, etc.) und der zu erwartetende Wert. Im Test wird dann durch das Array Iteriert und jeweils überprüft ob der wert definiert ist, ob er vom richtigen typ ist und ob er den erwarteten Inhalt hat. Außerdem wird dem expect noch eine errorMessage als zweites Parameter übergeben welche als Custom Message ausgegeben wird im Fall das ein Test fehlschlägt damit man sehen kann bei welchem Element der Test fehlschlägt.

```js
// modApiCustomer.test.js
test('Test cart data mapping', () => {
        cartDataTests.forEach( (testData) => {// testData[0] = Name des Elements, testData[1] = Typ des Elements, testData[2] = Erwartete Inhalt des Elements
            let errorMessage = 'Error in element: ' + testData[0]
            expect(mappedCartData[testData[0]], errorMessage).toBeDefined()
            expect(typeof mappedCartData[testData[0]], errorMessage).toBe(testData[1])
            expect(mappedCartData[testData[0]], errorMessage).toBe(testData[2])
        })
    })
```
