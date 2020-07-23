# Request / Response - Customer Addresses PUT | PATCH

**Request**


```json5
{
  "id": 12346,
  "is_billing": true,
  "is_shipping": true,
  "is_billing_default": false,
  "is_shipping_default": true,
  "created_at": "2019-11-21 12:33:07",
  "updated_at": "2019-11-21 12:33:07",
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
```


**Response**


```json5
{
  "success": true,
  "message": "Customer Address updated!"
}
```