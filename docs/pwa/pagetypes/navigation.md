# Navigation
hubble nutzt folgende Komponenten zur Navigation innerhalb der App. 

## Globale Navigation
Klassische Shopnavigationselemente
#### TheMegaMenu.vue
Zweistufige Anzeige von Kategorien und Seiten des Shops auf großen Viewports.
#### TheMobileMenu.vue
Dynamische Anzeige von Kategorien und Seiten des Shops auf mobilen Endgeräten.

## Kontextlayer
Layerkomponenten verwenden den TransitionExpandLayer.vue um einen Kontext oder Inhalt in einem Offcanvas Layer darzustellen. 
#### CartLayer.vue
Responsive Offcanvas Layer für die Darstellung des Warenkorbs 
#### CustomerMenuLayer.vue
Responsive Offcanvas Layer für die Darstellung der Benutzerkontonavigation 
#### WishlistLayer.vue
Responsive Offcanvas Layer für die Darstellung der Wunschliste 

## Breadcrumb Navigation
Die intelligente Breadcrumb Navigation merkt sich den Pfad den ein Benutzer genommen hat, 
um auf eine Produktdetailseite oder Kategorie zu gelangen und stellt diesen chronologisch dar. 
Ausgangspunkt ist dabei immer die Startseite (Home). 

Kommt der Benutzer auf das Produkt über die Suche, so sieht der Pfad folgendermaßen aus:

`Home > Suche nach: Schuhe > Schuh XY`

Oder gelangt der Benutzer über eine Kategorie auf das Produkt so sieht die Navigation so aus:
 
`Home > Herren > Schuhe > Schuh XY`

Logischerweise sieht der Pfad eines direkt aufgerufenen Produktes so aus:

`Home > Schuh XY`
