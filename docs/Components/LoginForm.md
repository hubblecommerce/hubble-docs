# LoginForm

Displays a form to log in a registered customer. It merges the current wishlist with the stored wishlist.
Customers can trigger a separate form to reset their password. 

## Usage
```html
<login-form />
```

## Imports
- Form

## Properties
(-)

## Vuex
- modWishlist
- modApiPayment

## API
- /api/login
- /api/customer/wishlists
- /api/customer/wishlists/{wishlistId}
- /api/customer/password/forgot
