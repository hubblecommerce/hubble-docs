# Hubble Coding Guidelines for Contributors
## Checkliste für eine Komponente 
### Vue.js:
- ist eine single file vue.js component 
- verwendet Properties um das Verhalten der Komponente zu steuern (Konfiguration)
- verwendet zum Darstellen von Inhalten v-text anstatt v-html
- verwendet für Anchors die `<nuxt-link>` Komponente
- verwendet zur Darstellung von Bildern die `<img-lazy>` Komponente wenn möglich mit Maßen für Platzhalter/Ladeanimation (width, height)
- importiert andere Komponenten / Plugins / Module dynamisch 
- verhindert Memory Leaks bei der Implementierung durch garbage collection https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html

### Vuex: 
- hat ein eigenes Vuex Store Modul wenn es sich dabei um eine spezielle Entität handelt 
- bedient sich an Daten über Properties nur wenn es sich dabei um gekapselte Daten handelt, wenn Daten auch von anderen Komponenten beeinflusst werden, dann Vuex verwenden 
- verwendet konsequent die Vuex mapping helper 

### Unabhängig:
- funktioniert unabhängig vom Shopsystem gleich (gleiche Datenstruktur)
- hat so wenig Abhängigkeiten wie möglich (vermeiden von tiefen Verschachtelungen von strukturellen Komponenten)
- funktioniert in allen modernen Browsern

### Responsive:
- ist auf allen modernen Endgeräten funktional
- hat eine gleichnamige scss Datei, in der alle Styles der Komponente zu finden sind 
- verwendet, wenn es nicht über styling funktioniert, für Viewport abhängige Darstellungen die nuxt-mq Funktionen

### Code Markup:
- verwendet für JS Helper Funktionen die lodash Library  
- verwendet selbstschließende html tags wenn möglich z.B. <div />
- berücksichtigt alle via eslint / prettier festgelegten Regeln bei der Programmierung 
- verwendet ES6 JS Features 
- Code ist in englisch 
- beinhaltet keinen auskommentierten Code

### SEO:
- kann alle relevanten Inhalte serverseitig rendern, um das crawlen von Suchmaschinen zu erleichtern 
- enthält gültiges HTML Markup (nur eine H1 pro Seite, meta descriptions, images alt tag, anchor rel tags) 

### Interface:
- gibt dem Benutzer Feedback für sämtliche Interaktionen z.B. eine Transition oder Animation in einer Geschwindigkeit von 0.2 - 0.3 Sekunden
- verfügt über eine Bestätigungsmeldung (flash message) wenn es zu Benutzereingaben kommt die einen API Call auslösen der erfolgreich ist 
- verfügt über eine Fehlermeldung (flash message) wenn es zu Benutzereingaben kommt die einen API Call auslösen der fehlschlägt
- verfügt über einen eindeutigen Ladeindikator wenn ein API Call getätigt wird 
- liefert statischen Text nur via Übersetzungsfunktion aus, der mindestens in DE und EN in den jeweiligen Übersetzungsdateien hinterlegt ist 

### Dokumentation:
- beinhaltet inline Dokumentation um daraus mit hilfe von Vuedoc eine lesbare Dokumentation in den docs.hubble zu generieren
- hält sich an die Notation von Vuedoc, enthält mindestens eine Beschreibung: https://github.com/vuedoc/md/blob/master/test/fixtures/textarea.example.vue 
- inline Dokumentation auf englisch 


