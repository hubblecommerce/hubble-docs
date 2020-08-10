# Prefetching

Durch [Prefetching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ) ist es möglich,
zusätzlich zu den aktuell zur Anzeige und Interaktion benötigten
Bundles, auch diejenigen bereits vorzuladen, die sich im sichtbaren Bereich des Browserfensters
befinden. Dies geschieht erst nachdem die für die aktuelle Route direkt relevanten Bundles
geladen sind und ein sogenannter "idle" Zustand erreicht ist.
Daraus lässt sich zum einen schließen, dass Seiten automatisch in eigene Bundles unterteilt werden
und zum anderen, dass die [Time To Interactive](https://web.dev/interactive/) nicht beeinflusst wird.

Prefetching in NuxtJS ist durch die Verwendung der
[__`<nuxt-link>`__ Komponente](https://nuxtjs.org/api/components-nuxt-link/) automatisch aktiviert
und wird auch als [Smart Prefetching](https://nuxtjs.org/blog/introducing-smart-prefetching/) bezeichnet.
Diese dient primär dazu, zwischen den verschiedenen Routen der Seite zu navigieren.
Dies ist die NuxtJS äquivalente zu [Vue Router's __`<router-link>`__](https://router.vuejs.org/api/#router-link)
Komponente und erweitert dessen Funktionalität.

Um jedoch Ressourcen zu sparen und eventuell garnicht benötigte Inhalte nicht zu laden, 
ist in hubble aktuell die Prefetching Funktionalität deaktiviert: Es werden nur aktiv
nachgefragte Inhalte geladen. Die Konfiguration dazu befindet sich in der __`~/nuxt.config.js`__.

```
// ~/nuxt.config.js
router: {
    prefetchLinks: false,
}
```

Dadurch lässt sich die __`<nuxt-link>`__ Komponente auch ohne die Prefetching Funktionalität
verwenden: 

``` html
// ~/components/customer/CustomerAccountNavigation.vue
<nuxt-link :to="localePath('customer-dashboard')" class="sidebar-link">
    <button class="button-secondary">
        {{ $t('Customer Dashboard') }}
            <material-ripple />
    </button>
</nuxt-link>
```

Jedoch ist es wichtig anzumerken, dass durch die globale Deaktivierung der Prefetching Funktionalität es trotzdem
möglich ist, pro Anwendungsfall eine Aktivierung vorzunehmen: Dafür ist lediglich das Hinzufügen des
__`prefetch`__ Attributs notwendig. Eine detaillierte Beschreibung kann auch der NuxtJS Dokumentation unter
dem Abschnitt [API: The __`<nuxt-link>`__ component](https://nuxtjs.org/api/components-nuxt-link/) entnommen werden.
Für Informationen, zu den Optionen für die Navigation zwischen den Routen, existiert der 
Abschnitt [Routing / URL Handling](./routingurlhandling.md) in der hubble Dokumentation.