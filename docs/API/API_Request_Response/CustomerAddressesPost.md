# Request / Response - Customer Addresses POST 

**Request**


```json5
{
  "id": 1,
  "is_billing": true,
  "is_billing_default": true,
  "is_shipping": true,
  "is_shipping_default": true,
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
  "message": "Customer Address saved!"
}
```