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
Client ID: 1
Client secret: M0ZzBzhFN1yaBM0EFlgiHBBfgkJ1Woj5vmHuxpRK
```

>

## OAuth Bearer Authentication

First of all a POST request has to be send to the OAuth service provider
(endpoint: "oauth/token") to generate and request a so called Bearer
Authentication Token. Given the above client credentials the request and
response will look like this:


```bash
# request
curl -X POST 'https://api-swag.digitalmanufaktur.net/oauth/token' 
    -H 'accept: application/json'
    -H 'content-type: application/json'
    -d '{
        "grant_type": "client_credentials",
        "client_id": "1",
        "client_secret": "M0ZzBzhFN1yaBM0EFlgiHBBfgkJ1Woj5vmHuxpRK",
        "scope": "*"
    }'

# response
{
    "token_type":"Bearer",
    "expires_in":900,
    "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUyZmIzZDAzYWI0ZTEyMWMyMjZiNWVhZWQ4YmE3ZWQwMDQ2M2Q2NmI2NjIyNjEwYTllMzUyNzUyNjczMjc2N2E5ZDFmMWRkYTc5MmVkMGI5In0.eyJhdWQiOiIzIiwianRpIjoiNTJmYjNkMDNhYjRlMTIxYzIyNmI1ZWFlZDhiYTdlZDAwNDYzZDY2YjY2MjI2MTBhOWUzNTI3NTI2NzMyNzY3YTlkMWYxZGRhNzkyZWQwYjkiLCJpYXQiOjE1NzE4NDE2NDUsIm5iZiI6MTU3MTg0MTY0NSwiZXhwIjoxNTcxODQyNTQ1LCJzdWIiOiIiLCJzY29wZXMiOlsiKiJdfQ.6mtIH7Fr2dA-oEwwCplWcnu7HG50vvnRHxFFciwDYwsL5c2wls9DKTMiy5kN3mdjJOXYvXrhg4JSr4_lOUu85rb51OQIGC3pK9-eu7EGzvI_RvNzfwjO6R3YWL26dmn0ueaBehljcZOlSJQbTs92u_Fhffr6AH1kJhTWmpIIVeq2I6MNSg10hdsWiJK1DaLQbkuctb5orrrS76zEKytWQZ8Fbfx-cPUkqHMzcKWZfdDWiLvQcJU_fg7O5qkq79LuxD2ZFQDfEl3FAnIspdjuqpLxu41uU32f-Hp14yWWdsOGai8hBBu6AB5M28AXuziHO2Ia8uHwqTyBUMLxzEaJ8XLTaIVWP6qL3O6kxkYwZzGgI8XKZK7ys-FYVEURUhg6vlEKUzc0bDuTigLj58rgQBuzcinbkWC1_VGmI0UGd1x_siB_LtMwI9MJfr22C93NqIQqn-ZJzasc0gUAuDEvX-olR3NHwsyatmhwp_JaVDTpdpGa7HgZ-HeB_lEg04T0SKyXCZffNOpf8sF1ijx5a6uPRb4ogv1oSQkC-6mHXMhTAayfawzlIi-x1S739QcyBVg1YiURq8botl7R5HxaMPqwG0sVttiVAhqXwdOFoHZuEo8qKRzEz17iOrSvnfZPQhxGeJB1sjFH8oJgAF0Ly-oLeQDielewO-xRXSHG23g"
}
```


  

# Authenticated Update Request

To perform an authentication request against the API, use the previously
requested access token.

```bash
# request
curl -X POST 'https://api-swag.digitalmanufaktur.net/rocket-api/crud/xtc'
    -H 'accept: application/json'
    -H 'content-type: application/json' 
    -H 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUyZmIzZDAzYWI0ZTEyMWMyMjZiNWVhZWQ4YmE3ZWQwMDQ2M2Q2NmI2NjIyNjEwYTllMzUyNzUyNjczMjc2N2E5ZDFmMWRkYTc5MmVkMGI5In0.eyJhdWQiOiIzIiwianRpIjoiNTJmYjNkMDNhYjRlMTIxYzIyNmI1ZWFlZDhiYTdlZDAwNDYzZDY2YjY2MjI2MTBhOWUzNTI3NTI2NzMyNzY3YTlkMWYxZGRhNzkyZWQwYjkiLCJpYXQiOjE1NzE4NDE2NDUsIm5iZiI6MTU3MTg0MTY0NSwiZXhwIjoxNTcxODQyNTQ1LCJzdWIiOiIiLCJzY29wZXMiOlsiKiJdfQ.6mtIH7Fr2dA-oEwwCplWcnu7HG50vvnRHxFFciwDYwsL5c2wls9DKTMiy5kN3mdjJOXYvXrhg4JSr4_lOUu85rb51OQIGC3pK9-eu7EGzvI_RvNzfwjO6R3YWL26dmn0ueaBehljcZOlSJQbTs92u_Fhffr6AH1kJhTWmpIIVeq2I6MNSg10hdsWiJK1DaLQbkuctb5orrrS76zEKytWQZ8Fbfx-cPUkqHMzcKWZfdDWiLvQcJU_fg7O5qkq79LuxD2ZFQDfEl3FAnIspdjuqpLxu41uU32f-Hp14yWWdsOGai8hBBu6AB5M28AXuziHO2Ia8uHwqTyBUMLxzEaJ8XLTaIVWP6qL3O6kxkYwZzGgI8XKZK7ys-FYVEURUhg6vlEKUzc0bDuTigLj58rgQBuzcinbkWC1_VGmI0UGd1x_siB_LtMwI9MJfr22C93NqIQqn-ZJzasc0gUAuDEvX-olR3NHwsyatmhwp_JaVDTpdpGa7HgZ-HeB_lEg04T0SKyXCZffNOpf8sF1ijx5a6uPRb4ogv1oSQkC-6mHXMhTAayfawzlIi-x1S739QcyBVg1YiURq8botl7R5HxaMPqwG0sVttiVAhqXwdOFoHZuEo8qKRzEz17iOrSvnfZPQhxGeJB1sjFH8oJgAF0Ly-oLeQDielewO-xRXSHG23g'
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
