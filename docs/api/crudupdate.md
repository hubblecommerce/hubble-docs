# Hubble API - Crud Updates


The Hubble API provides exactly one endpoint where crud updates can be
submitted by the original shop backend. The endpoint uses Laravel
Passport OAuth to validate authentication of the client request. Updates
must be submitted as authenticated POST requests.

  

# Update Endpoint

The endpoint can be found via command line by executing "php artisan
route:list". For a complete list of available endpoint take a look
at [Hubble API
Endpoints](./endpoints.html).

  

# OAuth by Laravel Passport

The API uses Laravel Passport for providing OAuth services. Whenever a
client application wants to submit (or fetch) data to the API it has to
make use of it's so called client credentials.

## OAuth Client Credentials

```dotenv
Client ID: [Your personal client id]
Client secret: [Your personal client secret]
```

>

## OAuth Bearer Authentication

First of all a POST request has to be send to the OAuth service provider
(endpoint: "oauth/token") to generate and request a so called Bearer
Authentication Token. Given the above client credentials the request and
response will look like this:


```bash
# request
curl -X POST 'https://api.example.com/oauth/token' 
    -H 'accept: application/json'
    -H 'content-type: application/json'
    -d '{
        "grant_type": "client_credentials",
        "client_id": "[Your personal client id]",
        "client_secret": "[Your personal client secret]",
        "scope": "*"
    }'

# response
{
    "token_type":"Bearer",
    "expires_in":900,
    "access_token":"[Your generated access token]"
}
```


  

# Authenticated Update Request

To perform an authentication request against the API, use the previously
requested access token.

```bash
# request
curl -X POST 'https://api.example.com/rocket-api/crud/xtc'
    -H 'accept: application/json'
    -H 'content-type: application/json' 
    -H 'authorization: Bearer [Your generated access token]'
    --data '{
        "store_id": "108",
        "subject_id": "4711",
        "subject_type": "CatalogProductEntity",
        "type": "create"
    }'

# response
{
    "error":false,
    "success":true,
    "message":"Crud Item stored!",
    "payload":{
        "item":{"id":1,"created_at":"2019-10-23 14:24:29","updated_at":"2019-10-23 14:24:29","done":0,"queued":0,"store_id":108,"subject_id":4711,"subject_type":"CatalogProductEntity","type":"create","emitted_by":null,"emitted_data":null}
    }
}
```
