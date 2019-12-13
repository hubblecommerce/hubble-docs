# Setup

The following installation guide was tested on MacOS and Linux environments. The git-repo is shipped with a configured version of nuxt.js with hubble installed as a module on it. 

## Requirements

* Node.js \(&gt;=8.0.0\)
* NPM \(&gt;=6.0.0\)

## Installation

The installation of the frontend is pretty straight forward. Get the code from github, create the required .env file from the .env\_example file and install via npm. After installation is finished you can start up the application in dev mode \(npm run dev\) or in production mode \(npm run build -&gt; npm start\).

```bash
git clone git@github.com:hubblecommerce/hubble-frontend-pwa.git
cd hubble-frontend-pwa
cp .env_example .env
npm install 
npm run dev
```

## Using hubble demo data for your shop data 

You can find the API configuration right into the .env file in root folder. As default values the hubble demo API is set. The hubble demo data is based on a plain Magento 2 installation with Magento 2 demo data installed.

```dotenv
####################################################
#
# development (process.env.NODE_ENV != 'production')
#
DEV_HOST = 'http://localhost'
DEV_PORT = 3000
####################################################

#
# app
APP_BASE_URL = 'http://localhost'

#
# image controller base url
IMG_BASE_URL = 'http://localhost'

#
# api
API_BASE_URL      = 'http://localhost'
API_CLIENT_ID     = 1
API_CLIENT_SECRET = 'cde1234dce'
API_ENDPOINT_AUTH = 'oauth/token'

# payment
API_PAYMENT_BASE_URL      = 'http://localhost'
API_PAYMENT_CLIENT_ID     = 1
API_PAYMENT_CLIENT_SECRET = 'f1m2thu'
API_PAYMENT_ENDPOINT_AUTH = 'oauth/token'

#
# Payone Integration
PAYONE_MODE = 'test'
PAYONE_MID = '20000'
PAYONE_AID = '20001'
PAYONE_PORTALID = '2000000'
PAYONE_KEY = '123xyz'

#
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

#
# google analytics id
GOOGLE_ANALYTICS_ID = 'UA-123-4'

#
# google tag manager id
GOOGLE_TAG_MANAGER_ID = 'GTM-1234567'

#
# google recaptcha
GOOGLE_RECAPTCHA_SITEKEY = '6LeVIL8UAAAAAGOdK-6KP_2rAiY1f7EBwfagAzO'

#
# trusted shops ID
TRUSTED_SHOPS_ID = 'ABCDEFGHIJKLMOPQRSTUWXYZ123456789'

#
# one signal token
ONESIGNAL_TOKEN = '1234-1234-1234'

#
# Directory name of Theme in assets/scss directory
THEME = ''

#
# Storeview Id form Shop
STORE_ID = 1


# Configure Address format
STREETINFO_INCLUDES_HOUSENO = 'true'


# Configure if addressbook/register should have alternative shipping address
ALTERNATIVE_SHIPPING_ADDRESS = 'true'

#
# If set to true, call api/auth/token via node serverside to prevent cors error
NO_CORS = 'true'
```




