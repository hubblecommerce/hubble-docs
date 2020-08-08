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

Besonders erwähnenswert ist die Möglichkeit, die entsprechenden Übersetzungsdateien nur bei Bedarf zu laden. Hierzu ist der Parameter __`lazy: true`__ in der nuxt-i18n Konfiguration hinzuzufügen, siehe oben. Weitere Informationen zu dieser Funktionalität sind diesem Abschnitt [Lazy Load Translations](https://i18n.nuxtjs.org/lazy-load-translations.html) der [nuxt-i18n](https://i18n.nuxtjs.org/) Dokumentation zu entnehmen. 

Somit werden auch für Lokalisierungsdateien, die Prinzipien des [Lazy Loading](/pwa/architectureanddataflow/lazyloading.md) eingehalten.
