# AmazonPayButton

Implements AmazonPay button widget:
https://developer.amazon.com/de/docs/amazon-pay-onetime/button-widgets.html

Configure if you want custom express checkout or checkout api integration.

```
.env
AMAZON_PAY_MODE = 'api_integration'
AMAZON_PAY_MODE = 'express_custom_integration'
```

## Usage
```html
<amazon-pay-button />
```

## Imports
( - )

## Properties
( - )

## Vuex
- modCart

## API
- /api/uuid
- /api/calc-signature-auth-and-capture (serverMiddleware)
