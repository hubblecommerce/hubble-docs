# CustomerOrderList
CustomerOrderList displays the orders of the logged in customer.
## Usage
```html
<customer-order-list :title="$t('Recent Orders')" :limit="4" />
```

## Imports

## Properties
- title (title above the order list)
- limit (decides how many orders are shown in the list)

## Vuex
- modPrices
- modApiPayment

## API
- /api/customer/orders

