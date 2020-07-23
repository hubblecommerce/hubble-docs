# CustomerAddresses

A component for the customers to crud their addresses. It contains an addressbook and form validation.

## Usage
```html
<customer-addresses :show-all-addresses="false" />
```

## Imports
- Form

## Properties
- showAllAddresses (to display all addresses in view, for customer account section)

## Vuex
- modNavigation
- modApiPayment

## API
- /api/customer/{customerID}/addresses
- /api/customer/{customerID}/addresses/{addressId}
