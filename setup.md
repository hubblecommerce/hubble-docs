# Setup

The following installation guide was tested on MacOS and Linux environments. The git-repo is shipped with a configured version of nuxt.js with hubble installed as a module on it. 

## Requirements

* Node.js \(&gt;=8.0.0\)
* NPM \(&gt;=6.0.0\)

## Installation

The installation of the frontend ist pretty straight forward. Get the code from github, create the required .env file from the .env\_example file and install via npm. After installation is finished you can start up the application in dev mode \(npm run dev\) or in production mode \(npm run build -&gt; npm start\).

```bash
git clone git@github.com:hubble.git
cd hubble
cp .env_example .env
npm install 
npm run dev
```

## Using hubble demo data for your shop data 

You can find the API configuration right into the .env file in root folder. As default values the hubble demo API is set. The hubble demo data is based on a plain Magento 2 installation with Magento 2 demo data installed.

{% code-tabs %}
{% code-tabs-item title=".env" %}
```text
API_BASE_URL      = 'http://localhost'
API_CLIENT_ID     = 1
API_CLIENT_SECRET = 'cde1234dce'
API_ENDPOINT_AUTH = 'oauth/token'
```
{% endcode-tabs-item %}
{% endcode-tabs %}

