# Checkout 
The hubble checkout process is split in several pages. For a distraction free checkout
experience all checkout pages are assigned to the `layouts/hubble_light.vue` component.
To switch between the different steps hubble comes with a _CheckoutProgressBar.vue_.

## `checkout/cart`
Besides the classic cart overview with a list of products, customers can directly checkout via 
_Amazon Pay_ and apply vouchers.

- [CartItemsList](/Components/checkoutComponents/CartItemsList.md)
- [Coupons](/Components/checkoutComponents/Coupons.md)
- [Totals](/Components/checkoutComponents/Totals.md)
- [AmazonPayButton](/Components/paymentComponents/AmazonPayButton.md)

## `checkout/login`
This is where your customer can log in with his/her credentials, continue as a Guest or use 
a express checkout payment experience like _Amazon Pay_.

- [RegisterForm](/Components/customerComponents/RegisterForm.md)
- [LoginForm](/Components/customerComponents/LoginForm.md)

## `checkout/payment`
Your customer sees his available billing and shipping addresses and can create, edit or choose 
a different address from our great _CustomerAddresses.vue_ component.
On this page your customer have to choose a payment method and a shipping method. Optionally 
he/she can also apply a voucher and write an order comment.

At this moment hubble supports [Payone](https://www.bspayone.com/) as a great payment provider,
which is fully integrated in hubble checkout without leading the customer away from your checkout.

- [CustomerAddresses](/Components/customerComponents/CustomerAddresses.md) 
- [PaymentMethods](/Components/checkoutComponents/PaymentMethods.md) 
- [ShippingMethods](/Components/checkoutComponents/ShippingMethods.md) 
- [Coupons](/Components/checkoutComponents/Coupons.md) 
- [OrderComment](/Components/checkoutComponents/OrderComment.md) 

## `checkout/summary`
This is the last chance for the customer to review the order before he/she accepts the terms
and conditions and places the order.

- [CustomerAddresses](/Components/customerComponents/CustomerAddresses.md)
- [CartItemsListNonInteractive](/Components/checkoutComponents/CartItemsListNonInteractive.md) 
- [Totals](/Components/checkoutComponents/Totals.md)

In this component you can find also the action to place the order finally. Watch out for the _placeOrder_ function:
This function collects all order relevant data and validates it. If everything is valid it clones the final order 
object to a store state called _finalOrder_. Then it emits an "event" called setBeforePlaceOrder. It's not a
real JS event but more like a vuex store state that changes its status if the function is complete. 
You can listen to it via a watch on _state.modApiPayment.beforePlaceOrder_ e.g if you want to implement your own
custom payment provider. 

## `checkout/success`
After the successful response from the payment provider, the order will be placed via api call
to your shop system. If your shop responds with no errors, the customer will be redirected
to the success page where he/she sees the order in total. Customer will see a notification to
check their e-mail inbox for an order confirmation.

- [OrderDetail](/Components/checkoutComponents/OrderDetail.md) 


