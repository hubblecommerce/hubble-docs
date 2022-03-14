# User Session

There are only a few session related information stored in the hubble PWA, to keep the front and backend in sync. This
information is stored clientside as cookies and accessible through the runtime via Vuex. 

## Context Token
An ID generated from the shop backend to identify a specific user. Anonymously via add to cart or personally via user 
login. 

## Cart 
Minimal set of cart information like overall quantity and IDs of line items. Used to decide on API calls whether to add
or to update a cart line item. 