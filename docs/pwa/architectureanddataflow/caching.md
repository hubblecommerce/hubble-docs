# Caching

Es gibt kein caching im hubble Frontend im klassischen Sinne. Bei jedem Seitenaufruf wird eine vom node.js serverseitig gerenderte Seite ausgeliefert.
Die Daten für das rendering werden dabei direkt von der API des jeweiligen Shop Backends bezogen. 

Lediglich die hubble Data API bedient sich bei den Daten an einem statischen Elastic Search Index, 
der jedoch aktualisiert wird sobald sich Daten im Shopbackend ändern.

Alle Daten werden aktuell und schnellstmöglich ausgeliefert, ganz ohne Cache.
