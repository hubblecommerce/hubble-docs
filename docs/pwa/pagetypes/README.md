# Seitentypen

Jeder Onlineshop nutzt zur Interaktion wiederkehrend gleichartig aufgebaute Seitentypen. In hubble sind diese entsprechend den bekannten Systemen implementiert und sollen im Folgenden kurz erläutert werden. 

Der Architektur der NuxtJS Pages folgend, definiert hubble über dieses Konstrukt die Abhängigkeit von Routen zu den darzustellenden Komponenten. 

Folgende Seitentypen sind implementiert:

- [Content Seite](/pwa/pagetypes/)
- [Kategorie](/pwa/pagetypes/catalogcategory)
- [Suche](/pwa/pagetypes/search)
- [Produktseite](/pwa/pagetypes/productdetailpage)
- [Warenkorb](/pwa/pagetypes/checkout/#checkoutcart)
- [Checkout](/pwa/pagetypes/checkout)
- [Kundenaccount](/pwa/pagetypes/customeraccount)


## Page Types vs. __`pageType`__: Wo liegt der Unterschied?

Außerdem existiert für die Startseite und für dynamische Routen die State Variable __`pageType`__, anhand derer
entweder eine Kategorie, eine Produktdetailseite oder eine CMS Seite angezeigt wird. Details zu diesen drei
"Seitenarten" und wie der Wert der __`pageType`__ State Variable bestimmt wird, ist in den folgenden Abschnitten beschrieben.


