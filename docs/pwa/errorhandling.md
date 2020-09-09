# Error Handling

In hubble bestehen verschiedene Layer für die Behandlung von Fehlern, die im Zusammenhang mit API Calls aufreten können.

Zum einen gibt es Route-Level Fehler, die beim Routing an eine Middleware zurückgeliefert werden.
Da die Middleware dazu dient sicherzustellen, dass die Daten für die Route im Vuex Store bereitstehen für das
Rendering, wird stattdessen, die unter __`~/layouts/error.vue`__ definierte Error Page angezeigt.
Seiten sind in NuxtJS standardmäßig unter __`~/pages`__ enthalten und es handelt sich bei der Error Page
um einen Spezialfall, der im Abschnitt [Error Page](https://nuxtjs.org/guides/directory-structure/layouts#error-page)
der NuxtJS Dokumentation nachgelesen werden kann. Somit kann für diese, unter  __`~/layouts/`__ definierte, Seite
ein zu verwendendes Layout definiert werden:
``` js
// ~/layouts/error.vue
export default {
    layout: 'hubble',
}
```
In der __`~/layouts/error.vue`__ existiert eine Unterscheidung je nach Status Code, die per Prop an diese
Komponente übergeben wurde (__`this.error.statusCode`__) und zur Einbindung einer entsprechenden speziellen Komponente führt. 
Diese spezielleren Komponenten, die sich am Status Code ausrichten, sind in dem Ordner __`~/components/error/`__ enthalten.

Der Status Code ist Teil des Prop Feldes __`error`__:

``` js
// ~/layouts/error.vue
props: {
    error: {
        type: Object,
        default: () => {}
    }
}
```

Die übergebene Prop wird ebenfalls als Prop der eingebundenen Komponente weitergereicht:
``` html
<!-- ~/layouts/error.vue -->
<template>
    <component :is="errorPage" :error="error" />
</template>
```

Welche Komponete eingebunden wird, ergibt sich aus dem Feld __`statusCode`__:
``` js
// ~/layouts/error.vue
computed: {
    errorPage() {
        if(this.error.statusCode === 400) {
            return error400;
        }

        if(this.error.statusCode === 401) {
            return error401;
        }
        // & more conditionals
    }
}
```

Falls es keine explizite Angabe eines Status Codes gibt, die an die __`error()`__ übergeben wurde, dann führt dies zur 
Anzeige der __`~/components/error/default.vue`__.


Im Folgenden ist ein Beispiel aus der Middleware __`apiResourceMenu`__, die für die Bereitstellung der Menüdaten 
zuständig ist: 

``` js
// ~/modules/@hubblecommerce/hubble/core/middleware/apiResourceMenu.js
store.dispatch('modApiMenu/getMenu', {})
    .then((response) => {
        resolve(response);
    })
    .catch((response) => {
        if(response.statusCode != null) {
            error(response);
        } else {
            error({ statusCode: 400, message: 'API call modApiMenu/getMenu failed' });
        }
        resolve(response);
    });
```

Bei vorhandenem __`statusCode`__ wird in diesem Fall also die __`~/components/error/400.vue`__ Komponente eingebunden:

``` html
<!-- ~/components/error/400.vue -->
<template>
    <div class="container error-wrp">
        <i class="icon icon-frown" />
        <h1>Bad Request</h1>
        <div v-if="error.message != null" class="error-text" v-text="error.message" />
        <div v-else class="error-text" v-text="'The server was unable to process the request due to invalid syntax.'" />
    </div>
</template>
<!-- ... -->
```


Desweiteren existieren Fehler, die aufgrund von Benutzer Interaktionen mit z.B. Formularen entstehen können. 
Dafür gibt es in hubble zwei Varianten, um diese Fehler im Template darzustellen:
Zum einen beinhalten Templates oft einen Block zur Darstellung eines __`errors`__ Arrays und zum anderen
gibt es die Möglichkeit, je nach Bedarf, eine sogenannte __`FlashMessage`__ ( = Benachrichtigungen, die meist nach einer bestimmten Zeit
wieder ausgeblendet werden) anzuzeigen. 


Um die Inline Darstellungsvariante über das __`errors`__ Array zu nutzen, müssen Fehlermeldungen, die anzuzeigen sind einem 
passenden Format entsprechen, um diesem Array hinzugefügt werden zu können.

``` html
<!-- as an example src: ~/components/customer/LoginForm.vue -->
<template v-for="error in errors">
    <div class="error-message" v-text="error" />
</template>
```

``` js
// ~/components/customer/LoginForm.vue
.catch(error => {
    this.errors.push(this.$t('Login failed'));

    // ...
});
```


Als Helferfunktionalität existiert außerdem das [Mixin](https://vuejs.org/v2/guide/mixins.html)
__`addBackendErrors`__ (__`~/modules/@hubblecommerce/hubble/core/utils/formMixins.js`__),
in die, bei Bedarf, eine Formatierung ausgelagert werden kann. Die Auslagerung in dieses Mixin eignet sich besonders gut,
wenn es sich um die Anzeige von Fehlern handelt, die aus dem API Response stammen.

``` js
// ~/modules/@hubblecommerce/hubble/core/utils/formMixins.js
const addBackendErrors = {
    methods: {
        addBackendErrors: function(error) {
            // SW
            if(process.env.API_TYPE === 'sw') {
                if (!(error.errors === undefined)) {
                    return error.errors.map(val => val.detail);
                } else {
                    const errors = [];

                    errors.push(error);

                    return errors;
                }
            }
        },
    }
};
```

Dadurch ergibt sich also die Möglichkeit, dem __`errors`__ Array auch die konkreten Fehlermeldungen aus dem 
API Response hinzuzufügen, wodurch sich folgender __`catch`__ Block am Ende ergibt:

``` js
// ~/components/customer/LoginForm.vue 
.catch((error) => {
    this.errors.push(this.$t('Login failed'));

    _.forEach(this.addBackendErrors(error), error => {
        this.errors.push(error);
    })
});
```


Bei Fehlern, die nur eine einzige Nachricht anzeigen sollen, kann auch die oben erwähnte __`FlashMessage`__ Komponente
verwendet werden, die nach einer kurzen Zeit automatisch wieder ausgeblendet wird:

``` js
// ~/components/customer/CustomerAccountNavigation.vue
this.flashMessage({
    flashType: 'error',
    flashMessage: this.$t('Logout failed');
})
```

API Requests werden in der __`modApi/apiCall`__ __`action`__ durchgeführt und Fehler werden
an die Caller __`action`__ weitergereicht. Das Format des Rückgabewertes richtet sich dabei am Status Code aus.
Es existieren folgende Formate, die als Rückgabewert auftreten können:
__`error.response.data`__, __`error.request`__, __`error.message`__ oder __`No network connection`__.
