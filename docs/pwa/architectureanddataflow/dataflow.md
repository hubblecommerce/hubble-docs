# Dataflow

## Wie Daten für Routen in hubble bereitgestellt werden

Bevor eine Seite gerendert und ausgeliefert wird, durchläuft sie eine Middleware.
Middleware legen fest welcher API Endpunkt für die angefragte Route angesprochen werden muss.
Die Calls zum beziehen und Speichern von Daten befinden sich in Vuex Store Modulen.
Ein Vuex Modul übernimmt die Datenverwaltung und -verarbeitung in der hubble Architektur je nach Entität, 
z.B. modApiProduct.js => Alle relevanten Daten und API Calls die zur Entität "Produkt" gehören.

 
### Serverseitige Auslieferung einer Seite
hubble verwendet den NuxtJs universal Modus. Das heißt Seiten werden als statisches HTML vom Node.js Server gerendert an den Client ausgeliefert.
Dadurch befinden sich SEO relevante Informationen in der DOM und können von Suchmaschinen erfasst werden.
Bei der Entwicklung sollte dabei beachtet werden, dass durch das serverseitige Rendering die Browserumgebung
und zugehörige Funktionalitäten (wie z.B. das Objekt window) nicht zur Verfügung stehen. Initiale Aufrufe und ein Seiten Refresh führen
dabei immer zum serverseitigen Rendering, wobei subsequente Seitennavigationen clientseitig gerendert werden.


### Clientseitiges Ausliefern von Inhalten
Middlewares in hubble sind nicht die einzige Stelle, an der API Requests initiiert werden: Auch Komponenten rufen
__`actions`__ aus dem Vuex Store auf, die API Requests machen. Somit lassen sich bestimmte Inhalte erst von 
der API erfragen, wenn Shopbesucher diese auch tatsächlich benötigen (z.B. ausgelöst durch Interaktion 
mit einem Button).
