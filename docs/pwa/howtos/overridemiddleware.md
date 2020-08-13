### Überschreiben von hubble core Middleware
Das Editieren von existierender Middleware entspricht dem gleichen Schema zur Überschreibung von existieren Store
Modulen: Es ist notwendig eine Datei mit demselben Namen im Ordner __`~/middleware`__ zu erstellen, die bestehenden Inhalte in die
neue Datei einzufügen und die ursprüngliche Middleware zu deaktivieren.

__1. Das Anlegen einer neuen Datei__

Um die Basisfunktionalität zu erhalten ist der Inhalt der __`modApiProduct`__ in die neue Datei zu kopieren.

__2. Das Deaktivieren der Middleware aus dem __`@hubblecommerce`__ Modul in der __`nuxt.config.js`____
``` js
hubble: {
    // ...
    deactivateMiddleware: ['apiResourceRoute.js'],
    // ...
}
```
