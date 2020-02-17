# Payone

hubble comes with a fully JS based solution for payment via payone and its supported payment methods.
Here is used the channel client api in [AJAX Mode](https://docs.payone.com/display/public/PLATFORM/CA+-+AJAX+Mode).

## How it works
1. User chooses a payment method in checkout components/checkout/PaymentMethods.vue

2. The chosen method will conditionally render its linked payment component @hubblecommerce/payone/components/lib/PayoneChannel.vue.

3. The customer places the order. This changes the 'setBeforePlaceOrder' state.

4. Payment Component is been triggered e.g. @hubblecommerce/payone/components/lib/PayoneChannelAjaxVor.vue.

5. This component aggregates the required data, calculate a hash based on the PAYONE_KEY defined in .env and makes the api call to payone api.

6. Payone calls the callback function processPayoneResponse in @hubblecommerce/payone/plugins/lib/payone-response.js.

7. An order is placed via api call to the shop system if the response of payone is successful

8. A response of type 'REDIRECT' will be redirected to the url. <br>
A response of type 'APPROVED' redirects the customer to the checkout success page.


## Configuration
Setup the payone credentials in .env file.
```
# Payone Integration
# live or test
PAYONE_MODE = 'test'
PAYONE_MID = '20000'
PAYONE_AID = '20001'
PAYONE_PORTALID = '2000000'
PAYONE_KEY = '123xyz'
```

