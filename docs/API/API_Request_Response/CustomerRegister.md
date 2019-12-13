# Request / Response - Customer Register



**Request**

```json5
{
  "name": "Max Mustermann",
  "email": "test@example.com",
  "password": "password123",
  "password_confirm": "password123",
  "address": {
    "gender": "m",
    "firstName": "Max",
    "lastName": "Mustermann",
    "street": "Musterstr. 1",
    "postal": "12345",
    "city": "Musterhausen",
    "country": "DE",
    "company": ""
  },
  "birthday": "01.01.2001",
  "phoneNumber": "1234567890"
}
```


**Response**


```json5
"success": true,
    "auth": {
      "token_name": "PersonalAccess",
      "token_type": "Bearer",
      "created_at": "2019-11-21 10:30:09",
      "updated_at": "2019-11-21 10:30:09",
      "expires_at": "2019-11-22T10:30:09.000000Z",
      "expires_in": 86400,
      "token": "eyJ0eXAiOiJ"
    },
    "user": {
      "id": 1234567,
      "cid": "100-1234567",
      "name": "Karl-Heinz Mustermann",
      "email": "test@testemail.com",
      "firstname": "Karl-Heinz",
      "lastname": "Mustermann"
    }
```
