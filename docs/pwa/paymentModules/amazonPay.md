# Amazon Pay

hubble comes with a fully JS based solution for payment via amazon pay.
You can choose weather you want to use the Amazon Express Integration (which is a good solution if you dont have to calculate shipping costs),
or use the API-based transaction management (good to keep the customer on your page while checkout).

## How it works
Amazon Express Integration:
1. Customer clicks on the amazon pay button on cart page. 
2. Customer is promted to login to his/her amazon account.
3. Order will be placed via amazon.
4. The order will not be send to shop system and only belongs in your amazon merchant account.

API-based transaction management:
1. Customer clicks on the amazon pay button on cart page. 
2. Customer is promted to login to his/her amazon account.
3. Customer will be redirected to the checkout amazon page pages/checkout/amazon.vue
4. On checkout/amazon the amazon pay widgets will be initialized.
5. The cart and the shipping costs will be recalculated depending the default address of the customer. 
6. Customer can change a shipping address and payment method. Each time this happens the cart and totals will be recalculated. 
7. Customer placed the order. Now several api calls to amazon happen before the order is placed to the shop system:
    1. SetOrderReferenceDetails
    2. ConfirmOrderReference
    3. Authorize
    4. GetOrderReferenceDetails
8. All important order data will be collected and validated to finally be placed to shop system via api call.

## Configuration
Setup the payone credentials in .env file.
```
# Amazon Payment
AMAZON_PAY_SANDBOX = 'true'
AMAZON_PAY_MERCHANT_ID = 'ABCD123456'
AMAZON_PAY_ACCESS_KEY = 'ABCD123456'
AMAZON_PAY_SECRET_KEY = 'asiduasd988z43nkjsndf'
AMAZON_PAY_CURRENCY = 'USD'
LOGIN_WITH_AMAZON_CLIENT_ID = 'amzn1.application-oa2-client.asdoudfb239834ndfijn'

# Amazon Payment Modes:
# express_custom_integration: Adjust the payment amount for simple tax and shipping options
# api_integration: Maintain complete control of the checkout experience on your site
AMAZON_PAY_MODE = 'api_integration'

# Add http:// or https:// before your Return URL
AMAZON_PAY_RETURN_URL = 'http://localhost:3336/checkout/cart'
AMAZON_PAY_CANCEL_RETURN_URL = 'http://localhost:3336/checkout/error'
```

