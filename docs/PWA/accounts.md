# Benutzerkonten

Seitenbesucher können sich registrieren oder einloggen und gelangen auf eine Dashboardseite,
welche mehrere Komponenten zur Editierung der Kontodaten enthält.
Zusätzlich zu der Möglichkeit, die bei der Registrierung eingegebenen Daten zu editieren,
wird auch die Liste der Bestellungen angezeigt.
Dabei dient die Dashboard Ansicht primär der Darstellung der aktuell existierenden Daten und enthält jeweils einen Button
zum Öffnen eines Editierungsfensters, welches in hubble als __`offCanvas`__ bezeichnet wird.
Die Namensgebung begründet sich darauf, dass das Dashboard nicht verlassen wird und die __`offCanvas`__ Komponente
von der, in diesem Fall, rechten Seite aus eingeblendet wird ("slide-in").

Jedes der __`offCanvas`__ Modal-Fenster zeigt beim Auftreten von Fehlern eine Inline-Fehlermeldung im __`offCanvas`__ 
unterhalb des Formulars an.
Templates im __`offCanvas`__ beinhalten ein __`errors`__ Array, welches zur Darstellung von Fehlern aus dem Backend
verwendet wird.
Um das korrekte Format für die Anzeige im Template zu gewährleisten wird die Methode __`addBackendErrors`__ aus der
__`~/modules/@hubblecommerce/hubble/core/utils/formMixins.js`__ verwendet.

Erfolgreiche Änderungen führen zu der Ausblendung des __`offCanvas`__ Overlays.

        
Um die Anzahl an API Requests gering zu halten, werden alle Formulare vor der Versendung mit dem Validationsframework
[VeeValidate](https://vee-validate.logaretm.com/) validiert. Dabei werden Meldungen zu der Korrektheit der Eingaben
unterhalb der Formularfelder angegeben. Der Button zum Senden des Formulars ist zwar klickbar, führt jedoch nur zur Anzeige
des jeweiligen Validationsstandes unter den Feldern. 
VeeValidate bietet verschiedene Möglichkeiten zur Validationshäufigkeit, die in der offiziellen Dokumentation 
im Abschnitt [Interaction Modes](https://vee-validate.logaretm.com/v2/guide/interaction.html#interaction-modes)
nachgelesen werden können. Der in hubble verwendete Modus lautet __`eager`__.
Der Validationsstand von einigen Feldern hängt voneinander ab und wird direkt im Template quer-referenziert.
Dies ist nachlesbar in der offiziellen Dokumentation im Abschnitt
[Cross Field Validation](https://vee-validate.logaretm.com/v2/guide/components/validation-provider.html#cross-field-validation).



#### Beispiel zur Cross Field Validation mit [VeeValidate](https://vee-validate.logaretm.com/)
Um die Wiederverwendung der oben beschriebenen Funktionsweise zu verdeutlichen, ist das folgende Beispiel aus dem
Registrierungsprozess.

Passwortfeld umrahmt von der __`validation-provider`__ Komponente von VeeValidate:
``` html{5}
<!-- ~/components/customer/RegisterForm.vue -->
<!-- stark vereinfacht -->
<validation-provider 
    v-slot="{ errors }" 
    vid="password" 
    name="password" 
    rules="required|password:4" 
    mode="eager"
    tag="div" 
    class="hbl-input-group"
>
    <input 
        id="password"
        v-model="form.baseData.password"
        type="password"
        name="password"
    >
</validation-provider>
```


Passwort Bestätigungsfeld umrahmt von der __`validation-provider`__ Komponente von VeeValidate:
__`confirmed:password`__ referenziert das Feld oben mit dem Attribut __`vid="password"`__
``` html{6}
<!-- ~/components/customer/RegisterForm.vue -->
<!-- stark vereinfacht -->
<validation-provider 
    v-slot="{ errors }" 
    name="password confirmation" 
    rules="required|password:4|confirmed:password"
    mode="eager" 
    tag="div" 
    class="hbl-input-group"
>
    <input 
        id="passwordRepeat"
        v-model="passwordRepeat"
        type="password"
        name="passwordRepeat"
    >
</validation-provider>
```


Zu den Validationsmeldungen existieren Übersetzungen jeweils in der __`en.js`__ und __`de.js`__. Außerdem können Regeln sowie 
die jeweils anzuzeigenden Nachrichten in der __`~/modules/@hubblecommerce/hubble/core/plugins/vee-validate.js`__ abgeändert 
werden. Dort existieren bereits einige Anpassungen, die in den jeweiligen Templates verwendet werden.

::: tip
Zur Änderung der Emailaddresse und des Passworts wird jeweils das bisherige Passwort benötigt. 
:::

### Editieren von Benutzeraddressen
Die Komponente zur Darstellung von Addressen __`CustomerAddresses`__ ist an mehreren Stellen eingebunden und öffnet
zur Editierung der Inhalte immer ein __`offCanvas`__ Fenster.

Es lassen sich beliebig viele Addressen anlegen für Versand und Rechungen, die sich voneinander unterscheiden können.
Für zukünftige Checkoutprozesse lassen sich Defaultaddressen wählen, die sich aber auch beim Checkoutprozess ändern lassen,
da dort ebenfalls die Komponente  __`CustomerAddresses`__ eingebunden wird.


### Unter __`/customer/dashboard/`__ eingebundene Komponenten

Einige der folgenden in __`~/pages/customer/dashboard`__ eingebundenen Komponenten bieten unter anderem die Möglichkeit zur Editierung

* von Namen und der Email Addresse
* des Passworts
* von Rechnungs- und Versandaddressen

| Komponenten |
| --- | --- | 
| __`<customer-account-navigation />`__ |
| __`<customer-password-change />`__ | 
| __`<customer-account-information/>`__ | 
| __`<customer-addresses />`__ |
| __`<customer-order-list />`__ | 
