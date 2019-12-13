# RegisterForm

Implements a form to register a new customer. After registration the new customer is automatically logged in. 

## Usage
```html
<register-form :guest="false" />
```

## Imports
- Form

## Properties
``` json
guest: {
    type: Boolean,
    required: false,
    default: false
}
```

## Vuex
- modWishlist
- modApiPayment

## API
- /api/register
- /api/customer/wishlists
- /api/customer/{customerId}/addresses
