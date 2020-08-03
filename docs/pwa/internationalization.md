# Internationalisierung

Um Übersetzungen für Komponenten hinzuzufügen wird in hubble das Nuxt Modul
[nuxt-i18n](https://i18n.nuxtjs.org/) verwendet, welches auf dem Vue.js Plugin
[vue-i18n](https://kazupon.github.io/vue-i18n/) basiert. Dafür existieren zwei Dateien
im hubble Projekt, die jeweils die entsprechenden Übersetzungen für die jeweilige Sprache
enthalten: __`~/locales/de.js`__ für deutsche Übersetzungen und __`~/locales/en.js`__ für
englische Übersetzungen. Es können beliebig weitere hinzugefügt oder entfernt werden, jedoch sind
diese in der __`~/nuxt.config.js`__ aufzulisten und außerdem der verwendete Ordner anzugeben, in diesem
Fall __`~/locales`__. Im Folgenden ist die dazugehörige Default Einstellung für das hubble Projekt zu sehen: 

``` js
// ~/nuxt.config.js
// ...
['nuxt-i18n', {
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    locales: [
        {
            code: 'de',
            iso: 'de-DE',
            file: 'de.js'
        },
        {
            code: 'en',
            iso: 'en-US',
            file: 'en.js'
        },
    ],
    langDir: 'locales/',
    lazy: true,
    seo: false
}],
// ...
```

Erwähnenswert ist die Möglichkeit die entsprechenden Übersetzungsdateien nur bei Bedarf
zu laden. Dies ist möglich durch die Zeile: __`lazy: true`__. Mehr über diese Funktionalität
gibt es im Abschnitt [Lazy Load Translations](https://i18n.nuxtjs.org/lazy-load-translations.html)
der [nuxt-i18n](https://i18n.nuxtjs.org/) Dokumentation. 
Somit werden auch für Lokalisierungsdateien, die Prinzipien aus der hubble Dokumentation zum
[Lazy Loading](/pwa/architectureanddataflow/lazyloading.md) eingehalten.
Dort gibt es auch genaueres zu Optimierungsmethoden, die in hubble angewendet werden.