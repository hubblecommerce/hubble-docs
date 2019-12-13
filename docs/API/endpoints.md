# API Endpoints

For a list of every possible API endpoint use the command: "php artisan route:list"

## Endpoints Data

```bash
| Method    | URI                                                              |
+-----------+------------------------------------------------------------------+
| POST      | rocket-api/crud/xtc                                              |
| GET|HEAD  | rocket-api/json/{language}/categories                            |
| GET|HEAD  | rocket-api/json/{language}/categories/{category}                 |
| GET|HEAD  | rocket-api/json/{language}/categories/{category}/products        |
| GET|HEAD  | rocket-api/json/{language}/cms/blocks                            |
| GET|HEAD  | rocket-api/json/{language}/cms/blocks/{block}                    |
| GET|HEAD  | rocket-api/json/{language}/cms/blocks/{block}/children           |
| GET|HEAD  | rocket-api/json/{language}/cms/blocks/{block}/products           |
| GET|HEAD  | rocket-api/json/{language}/manufacturers                         |
| GET|HEAD  | rocket-api/json/{language}/manufacturers/flyout                  |
| GET|HEAD  | rocket-api/json/{language}/manufacturers/glossar                 |
| GET|HEAD  | rocket-api/json/{language}/manufacturers/{manufacturer}          |
| GET|HEAD  | rocket-api/json/{language}/manufacturers/{manufacturer}/products |
| GET|HEAD  | rocket-api/json/{language}/menu                                  |
| GET|HEAD  | rocket-api/json/{language}/menu/children                         |
| GET|HEAD  | rocket-api/json/{language}/products                              |
| GET|HEAD  | rocket-api/json/{language}/products/show/home                    |
| GET|HEAD  | rocket-api/json/{language}/products/show/sale                    |
| GET|HEAD  | rocket-api/json/{language}/products/{product}                    |
| GET|HEAD  | rocket-api/json/{language}/products/{product}/buybox             |
| GET|HEAD  | rocket-api/json/{language}/products/{product}/byorder            |
| GET|HEAD  | rocket-api/json/{language}/products/{product}/care               |
| GET|HEAD  | rocket-api/json/{language}/products/{product}/categories         |
| GET|HEAD  | rocket-api/json/{language}/products/{product}/children           |
| GET|HEAD  | rocket-api/json/{language}/products/{product}/relations          |
| GET|HEAD  | rocket-api/json/{language}/products/{product}/similar            |
| GET|HEAD  | rocket-api/json/{language}/products/{product}/upsellings         |
| GET|HEAD  | rocket-api/json/{language}/search/autocomplete                   |
| GET|HEAD  | rocket-api/json/{language}/search/catalogsearch                  |
| GET|HEAD  | rocket-api/json/{language}/urls                                  |
| GET|HEAD  | rocket-api/json/{language}/urls/{uri}                            |
+-----------+------------------------------------------------------------------+
```


## Endpoints Customer/Payment

```bash
| Method    | URI                                     |
+-----------+-----------------------------------------+
| POST      | api/cart/apply_coupon                   |
| POST      | api/cart/recalculate                    |
| POST      | api/customer/addresses                  |
| GET|HEAD  | api/customer/addresses                  |
| DELETE    | api/customer/addresses/{address}        |
| PUT|PATCH | api/customer/addresses/{address}        |
| POST      | api/details                             |
| POST      | api/form                                |
| POST      | api/form_recaptcha                      |
| POST      | api/login                               |
| POST      | api/logout                              |
| POST      | api/order                               |
| GET|HEAD  | api/order                               |
| DELETE    | api/order/{order}                       |
| PUT|PATCH | api/order/{order}                       |
| PUT|PATCH | api/order/{order}/status                |
| GET|HEAD  | api/order/{order}/status                |
| GET|HEAD  | api/payment                             |
| POST      | api/register                            |
| GET|HEAD  | api/shipping                            |
| GET|HEAD  | api/uuid                                |
| DELETE    | oauth/authorize                         |
| POST      | oauth/authorize                         |
| GET|HEAD  | oauth/authorize                         |
| GET|HEAD  | oauth/clients                           |
| POST      | oauth/clients                           |
| PUT       | oauth/clients/{client_id}               |
| DELETE    | oauth/clients/{client_id}               |
| POST      | oauth/personal-access-tokens            |
| GET|HEAD  | oauth/personal-access-tokens            |
| DELETE    | oauth/personal-access-tokens/{token_id} |
| GET|HEAD  | oauth/scopes                            |
| POST      | oauth/token                             |
| POST      | oauth/token/refresh                     |
| GET|HEAD  | oauth/tokens                            |
| DELETE    | oauth/tokens/{token_id}                 |
+-----------+-----------------------------------------+
```
