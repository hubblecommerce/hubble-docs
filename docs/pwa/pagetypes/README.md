# Page Types

In hubble existieren verschiedene Arten von Seiten, die den NuxtJS Pages entsprechend, für verschiedene URLs ein
Mapping zwischen der jeweiligen Route und den anzuzeigenden Komponenten definieren.



## Checkout
Der Checkout Prozess ist bei hubble auf verschiedene Seiten aufgeteilt, wobei jeder dieser Seiten das __`hubble_light`__ 
Layout zugewiesen wurde. Layouts in hubble entsprechen der Definition von Layouts in NuxtJS: Diese dienen dazu, auf mehreren
Seiten wiederkehrende Elemente, sozusagen als Seitenrahmen, einzubinden. Bei dem __`hubble_light`__ Layout sind dabei besonders
wenige Komponenten Teil des Layouts, damit der Checkout Prozess im Fokus bleibt. Für eine Übersicht über die in hubble 
vorhandenen Layouts und den jeweils eingebundenen Komponenten kann der Abschnitt [Layouts](../layouts.md) referenziert werden.
Um zwischen diesen verschiedenen Seiten zu wechseln, existiert die __`CheckoutProgressBar.vue`__ Komponente.


### __`checkout/cart`__
Zusätzlich zu der klassischen Liste von Produkten, können auf dieser Seite Kunden auch ein Checkout über Amazon Pay
durchführen oder Coupons verwenden.

- [CartItemsList](/Components/checkoutComponents/CartItemsList.md)
- [Coupons](/Components/checkoutComponents/Coupons.md)
- [Totals](/Components/checkoutComponents/Totals.md)
- [AmazonPayButton](/Components/paymentComponents/AmazonPayButton.md)



### __`checkout/login`__

Diese Seite bietet die Möglichkeit für ein Login oder eine Registrierung und bei Wunsch auch die Einleitung eines
Checkout Prozesses ohne Kundenaccount, wie z.B als Gast oder ein Express Checkout mit Amazon Pay.

- [RegisterForm](/Components/customerComponents/RegisterForm.md)
- [LoginForm](/Components/customerComponents/LoginForm.md)



### __`checkout/payment`__

Auf dieser Seite können Daten, die direkt für die Bestellung und die Bezahlung relevant sind ausgewählt und editiert werden.
Es können Bezahl- und Versandaddressen erneut ausgewählt und editiert werden. Auch eine Auswahl zwischen verfügbaren 
Bezahl- und Versandarten findet auf dieser Seite statt. Optional gibt es die Möglichkeit Coupon Codes zu verwenden oder 
der Bestellung ein Kommentar hinzuzufügen.

- [CustomerAddresses](/Components/customerComponents/CustomerAddresses.md) 
- [PaymentMethods](/Components/checkoutComponents/PaymentMethods.md) 
- [ShippingMethods](/Components/checkoutComponents/ShippingMethods.md) 
- [Coupons](/Components/checkoutComponents/Coupons.md) 
- [OrderComment](/Components/checkoutComponents/OrderComment.md)



### __`checkout/summary`__

Dies ist die letzte Seite, bevor die Bestellung in Auftrag gegeben wird: Es werden deshalb alle für die Bestellung
relevanten Daten in einer Übersicht dargestellt. Hier besteht auch die Möglichkeit, die Geschäftsbedingungen zu akzeptieren
und die Bestellung in Auftrag zu geben.


- [CustomerAddresses](/Components/customerComponents/CustomerAddresses.md)
- [CartItemsListNonInteractive](/Components/checkoutComponents/CartItemsListNonInteractive.md) 
- [Totals](/Components/checkoutComponents/Totals.md)


### __`checkout/success`__

Auf die Response des Payment Provider wird, bei der Bestätigung einer erfolgreichen Bezahlung, die Bestellung an die API 
des Shop Systems weitergeleitet. Eine darauffolgende Response der API führt bei Erfolg schließlich zu einem Redirect
zur Success Seite. Diese zeigt Bestellkosten und eine Aufforderung an, über die im Benutzerkonto hinterlegte Email Addresse
eine Bestellbestätigung vorzunehmen.
- [OrderDetail](/Components/checkoutComponents/OrderDetail.md)




## Kunde 
Für den Entitätstypen Kunde werden ebenfalls verschiedene Seiten angeboten, jedoch werden die meisten dieser nur angezeigt, 
wenn Shopbesucher den Status "eingeloggt" haben.

### __`customer/addresses`__
Die auf dieser Seite enthaltenen Komponenten zeigen nicht nur Kundenaddressen an, sondern bieten für Kunden auch die Möglichkeit
diese Informationen zu editieren, weitere Addressen hinzuzufügen und Default Rechnungs- und Versandaddressen auszuwählen.

- [CustomerAccountNavigation](/Components/customerComponents/CustomerAccountNavigation.md)
- [CustomerAddresses](/Components/customerComponents/CustomerAddresses.md)



### __`customer/dashboard`__

Das Dashboard umfasst die Accountdaten, die aktuellen Default Addressen und die letzten Bestellungen des eingeloggten Kunden.

- [CustomerAccountNavigation](/Components/customerComponents/CustomerAccountNavigation.md)
- [CustomerAddresses](/Components/customerComponents/CustomerAddresses.md)
- [CustomerOrderList](/Components/customerComponents/CustomerOrderList.md)
- [CustomerPasswordChange](/Components/customerComponents/CustomerPasswordChange.md)  



### __`customer/login`__

Diese Seite bietet existierenden Kunden die Möglichkeit für ein Login und für Neukunden, die Möglichkeit zur Registrierung. 

- [RegisterForm](/Components/customerComponents/RegisterForm.md)
- [LoginForm](/Components/customerComponents/LoginForm.md)
- [Tabs](/Components/)
- [Tab](/Components/) 


### __`customer/orders`__

Diese zeigt die Bestellungen des Kunden mit einigen Basisinformationen dazu an.

- [CustomerAccountNavigation](/Components/customerComponents/CustomerAccountNavigation.md)
- [CustomerOrderList](/Components/customerComponents/CustomerOrderList.md)  



### __`customer/order/_id`__

Diese Seite zeigt detaillierte Informationen über besondere Bestellungen an.

- [CustomerAccountNavigation](/Components/customerComponents/CustomerAccountNavigation.md)
- [OrderDetail](/Components/checkoutComponents/OrderDetail.md)


### __`customer/addresses`__

Diese Seite zeigt alle Produkte aus der Wunschliste des Kunden an.

- [WishlistItemsList](/Components/)
- [NewsletterForm](/Components/)




## Suche

### __`search/catalogsearch`__
Diese Seite verwendet die __`<view-catalogsearch />`__  Komponente, um Suchergebnisse über die __`ProductListing`__ 
Komponente darzustellen.


## Page Types vs. __`pageType`__: Wo liegt der Unterschied?

Außerdem existiert für die Startseite und für dynamische Routen die State Variable __`pageType`__, anhand derer
entweder eine Kategorie, eine Produktdetailseite oder eine CMS Seite angezeigt wird. Details zu diesen drei
"Seitenarten" und wie der Wert der __`pageType`__ State Variable bestimmt wird, ist in den folgenden Abschnitten beschrieben.

