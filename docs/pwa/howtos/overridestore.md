### Überschreiben von hubble core Store Modulen
Um bestehende Store Module zu verändern, ist es notwendig eine neue Datei mit demselben Namen unter dem __`~/store`__
Ordner anzulegen und das ursprüngliche Modul zu deaktivieren:

__1. Anlegen einer neuen Datei__

Um die Basisfunktionalität zu erhalten ist der Inhalt der __`modApiProduct`__ in die neue Datei zu kopieren.



__2.Deaktivieren des Store Moduls in der __`nuxt.config.js`____

``` js
hubble: {
    // ...
    deactivateStores: ['modApiProduct.js'],
    // ...
}
```

