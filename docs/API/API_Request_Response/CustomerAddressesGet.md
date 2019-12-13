# Request / Response - Customer Addresses GET


**Request**


```json5
{ }
```


**Response**


```json5
{
  "success": true,
  "items": [
    {
      "id": 12345,
      "is_billing": true,
      "is_shipping": true,
      "is_billing_default": false,
      "is_shipping_default": false,
      "created_at": "2019-11-20 13:58:24",
      "updated_at": "2019-11-20 13:58:24",
      "payload": {
          "gender": "m",
          "firstName": "Karl-Heinz",
          "lastName": "Mustermann",
          "street": "Musterhausen 42",
          "postal": "12345",
          "city": "Musterhausen",
          "company": "",
          "country": "DE"
        }
    },
    {
      "id": 12346,
      "is_billing": true,
      "is_shipping": true,
      "is_billing_default": true,
      "is_shipping_default": true,
      "created_at": "2019-11-20 13:58:24",
      "updated_at": "2019-11-20 13:58:24",
      "payload": {
          "gender": "m",
          "firstName": "Max",
          "lastName": "Mustermann",
          "street": "Musterstr. 1",
          "postal": "12345",
          "city": "Musterhausen",
          "country": "DE",
          "company": ""
        }
    }
  ]
}
```
