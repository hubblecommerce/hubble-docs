# Theming

### Style Deklarationen

Es existiert ein responsives Default Theme in hubble, welches es erleichtert darauf aufbauend in kurzer Zeit ein individualisiertes 
Theme zu erstellen.
Das im Projekt zu verwendende Theme ist in der __`.env`__ Datei definiert:
``` txt
# .env
THEME = 'hubble'
```
 
Komponenten Templates sind mit Klassen versehen, deren Style Deklarationen sich in einem getrennten __`scss`__ Ordner befinden:
```
~/assets/scss/hubble
```
Jedoch ist es auch weiterhin möglich Styles in den Vue Komponenten zu definieren.

::: tip
Die Kompilierung von den Dateien in dem __`scss`__ Ordner ist in hubble bereits konfiguriert. 
Um neue __`scss`__ Dateien ebenfalls in den Kompilierungsprozess zu integrieren
ist nur ein Hinzufügen zur __`~/assets/scss/hubble/all.scss`__ notwendig.
:::


