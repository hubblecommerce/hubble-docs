## Contribution Guide PWA

### Lokale Entwicklung

Zur lokalen Aufsetzung einer Entwicklungsumgebung für das hubble Modul sind primär 2 Schritte notwendig.
Zum einen wird ein Nuxt Projekt benötigt, welches als Grundlage zur Einbindung des Moduls dient und zum anderen muss das 
Modul in diesem Projekt lokal eingebunden werden. Es ist wichtig zu unterscheiden, dass es sich hier um eine
lokale Version des Moduls handelt und diese somit nicht über die npm package registry installiert wird, 
sondern direkt über GitHub. Andernfalls würden sich die zu editierenden Dateien in dem __`node_modules`__ Ordner
befinden.

Ein NuxtJS Projekt lässt sich am einfachsten über das CLI Tool [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)
aufsetzen:

``` bash
npx create-nuxt-app <PROJECT-NAME>
```

Mit dem oberen Befehl wird also ein Standard NuxtJS Projekt erstellt, welches die via dem Terminal ausgewählten Erweiterungen
im Projekt enthält. Somit befinden sich einige der von NuxtJS verwendeten Ordner bereits im Projekt, jedoch sollte der
__`modules`__ Ordner, der für die lokale Aufsetzung der Entwicklungsumgebung benötigt wird, noch hinzugefügt werden und kann
anschließend eine Kopie des geforkten Repositories erhalten:

``` bash
cd <PROJECT-NAME>
mkdir modules
cd modules
git clone https://github.com/<YOUR-ACCOUNT-NAME>/hubble-frontend-pwa.git
```

Diese Kopie kann an dieser Stelle direkt zur Synchronisation mit dem Original Repository verbunden werden via der Angabe
des sogenannten Upstreams. An dieser Stelle sollte darauf geachtet werden, dass es sich bei dem Link um das Original
Repository handelt und nicht um die geforkte Version im eigenen GitHub Account:

``` bash
git remote add upstream https://github.com/hubblecommerce/hubble-frontend-pwa.git
```


Um das Modul nun über die __`nuxt.config.js`__ referenzieren und konfigurieren zu können muss folgender Eintrag der 
__`~/package.json`__ hinzugefügt werden:

``` json
// ~/package.json
"dependencies": { 
    "@hubblecommerce/hubble": "file:modules/hubble-frontend-pwa/@hubblecommerce/hubble"
}
```
Damit lässt sich das Modul nun als Teil der __`buildModules`__ angeben und kann über die
Toplevel Modul Optionen konfiguriert werden:

``` js
// ~/nuxt.config.js
buildModules: [
    ['@hubblecommerce/hubble']
],

hubble: {
    apiType: process.env.API_TYPE
},
```

Somit ist es nun möglich Änderungen am Modul vorzunehmen und es kann ein Dev Server gestartet werden.
Dazu sollte in das Root Verzeichnis des NuxtJS Projektes gewechselt werden, also der Ebene, in der sich auch die
__`nuxt.config.js`__ befindet.
Zur Entwicklung sollte vor allem bei der Bearbeitung von Issues, deren Verwendung unter dem Punkt [Erstellen-eines-Pull-Requests](./contributionPWA.md/Erstellen-eines-Pull-Requests)
genauer beschrieben sind, ein neuer Branch erstellt werden. Branches, die zur Bearbeitung von Issues angelegt werden,
sollten dem folgenden Format folgen, wobei __`<NUM>`__ mit der Issue Nummer ersetzt werden sollte:

``` bash
git checkout -b issue#<NUM>
```
 
Nun, auf dem neuen Branch __`issue#<NUM>`__,  kann die Initialsierung des Projektes vorerst mit folgenden Befehl abgeschlossen werden:

``` js
npm install
```

Dies führt zur Installation aller direkten Dependencies, sowie die des Moduls.



### Erstellen eines Pull Requests

Um Vorschläge zu einem Merge von Änderungen und Erweiterungen zu machen, kann ein Pull Request erstellt werden. Dafür 
sollte als Erstes ein Issue im Original Repository angelegt werden, wenn es sich um eine neue Angelegenheit handelt. Alternativ bei bereits existierenden Issues, die noch keinen Assignee haben kann über die Kommentarfunktion ein Wunsch auf Bearbeitung hinterlassen werden.
Dieser Ablauf soll dazu dienen, dass nicht mehrere Entwickler an demselben Issue arbeiten und dafür Pull Requests zum Mergen 
erstellen.

Zum Anlegen eines neuen Issues gibt es dazu kurze Templates zur Vereinfachung der Bearbeitung, die daher verwendet werden sollten.
Diese stehen unter dem Issues Tab des Projekt Repositories zur Verfügung bereit: Das jeweils passende Template lässt sich
über den __`New issue`__ Button auswählen. Falls gleichzeitig der Wunsch zur Bearbeitung dieses Issues besteht, dann kann dies 
ebenfalls hinzugefügt werden, damit keine weiteren Entwickler diesem Issue zur Bearbeitung zugewiesen werden.

Auf erfolgreiche Absprache und Bearbeitung hin kann somit ein Pull Request erstellt werden. Dazu sind die lokalen Änderungen
als Erstes dem eigenen Remote Repository hinzuzufügen. Dazu sollte im Terminal in das Verzeichnis des Moduls gewechselt werden,
wodurch sich folgende Folge von Terminal Befehlen, ausgehend vom Root Verzeichnis des Projektes, ergibt:

``` bash
cd modules/hubble-frontend-pwa
git add .
git status
```
Damit auch tatsächlich nur die gewollten Dateien Teil des Commits werden, sollte mit Hilfe von __`git status`__ überprüft
werden, welche Dateien sich nun im Stage befinden und bei Bedarf entsprechend der angezeigten Hilfe im Terminal aus dem
Staging entfernt werden. Natürlich lassen sich Dateien auch einzeln dem Commit hinzufügen via __`git add <PATH-TO-FILE-TO-BE-STAGED>`__, wobei __`<PATH-TO-FILE-TO-BE-STAGED>`__ durch den Dateipfad ersetzt werden sollte. 
Alle editierten Dateien sind, zusammen mit dem jeweiligen Pfad, durch die Eingabe von __`git status`__ im Terminal einsehbar.

Bei kleineren Commits kann auch __`git commit -m "YOUR-COMMIT-MESSAGE"`__ verwendet werden, jedoch ist es leichter für
die Reviewer Commits nachzuvollziehen, wenn diese nach dem Commit Titel, der als Zusammenfassung des Commits dient,
(in einer neuen Zeile) eine kurze Begründung zu den Änderungen enthalten. Besonders eignet sich dies, wenn ein Commit einen vorherigen aus
Implementationssicht anpassen muss. Dazu kann Folgendes im Terminal eingegeben werden, welches den für Git konfigurierten 
Standardeditor öffnet. Falls sich die Datei in __`vim`__ öffnet kann diese unter Eingabe von __`i`__ (steht für __`insert`__) editiert werden und sollte 
via der Eingabe von __`ESC`__ für die Editierung gestoppt und der Eingabe von __`wq`__ (steht für __`write and quit`__) abgespeichert werden:
``` bash
git commit
```

Somit stehen die lokalen Änderungen bereit, um im Remote Repository hochgeladen zu werden:

``` bash
git push -u origin <NAME-OF-THE-BRANCH>
```

Darauffolgend kann das geforkte Repository also im eigenen Account aufgerufen werden und es sollte nun eine Zeile sichtbar sein, 
die bereits zum Erstellen eines Pull Requestes aufruft.

Der Pull Request sollte, ähnlich wie beim Anlegen von Issues, unter Benutzung des existierenden Templates abgesendet werden. 
Besonders wichtig zur Organisation sind dabei die folgenden 2 Punkte:
+ Das Keyword __`closes`__ sollte zusammen mit der Issue Nummer nach folgendem Beispiel Teil des Pull Request Kommentars werden:

``` md
closes #<NUM>
```
wobei __`<NUM>`__ mit der Issue Nummer ersetzt werden sollte. Beispielweise würde das Kommentar des Pull Requests,
welches die Bearbeitung des Issues #24 enthält, somit also __`closes #24`__ enthalten. Durch die Verwendung dieses Keywords,
wird das angegebene Issue automatisch mit dem Pull Request verlinkt und beim erfolgreichen Merge geschlossen.
+ Im Titel des Pull Requests sollte ebenfalls, zur Erhaltung der Übersichtlichkeit, die Issue Nummer (__`#<NUM>`__) eingefügt werden.
Dies hilft Reviewern Pull Requests schneller zu bearbeiten.


Falls mehrere Commits erstellt wurden und diese nicht bereits eine Beschreibung zu der Veränderung zwischen den Commits 
enthalten, sollte diese Erläuterung im Kommentar des Pull Requests eingefügt werden. Dies hilft Reviewern den Gedankengang
und die Implementationsdetails schneller nachzuvollziehen und vereinfacht somit das Mergen.

Bevor der Pull Request abgeschickt wird sollte als sogenannter __`Base Branch`__, der Branch bei dem die Änderungen hinzugefügt werden sollen, jener ausgewählt werden,
auf dem der Branch basiert. Falls möglich sollte als __`Base Branch`__ beim Pull Request, der __`dev`__ Branch des Original Repositories ausgewählt werden.
Die Änderungen, die hinzugefügt werden sollen, befinden sich dabei im sogenannten __`Head Branch`__ und sollten falls möglich auf dem __`master`__ Branch basieren.


### Aktualität des Forks

Um das Projekt auf dem neuesten Stand mit dem Original Repository zu halten, wurde dieses bereits als Upstream für den Fork
konfiguriert. Als Referenz, handelt es sich um folgenden Befehl, der im __`~/modules`__ Ordner ausgeführt wurde:

``` bash
git remote add upstream https://github.com/hubblecommerce/hubble-frontend-pwa.git
```

Dadurch kann in Zukunft der Fork also folgendermaßen synchronisiert werden:
Um Änderungen in die lokale Umgebung zu laden wird

``` bash
git fetch upstream
```
verwendet.

Änderungen aus dem Upstream Repository, also dem Original Repository, können nun wie folgt, am Beispiel vom __`master`__ Branch, ins lokale Projekt eingebunden werden:
``` bash
// if not on master branch, change to branch:
git checkout master

// merge changes from upstream with local master branch
git merge upstream/master
```