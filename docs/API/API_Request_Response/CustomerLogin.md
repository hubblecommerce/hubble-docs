# Request / Response - Customer Login 

**Request**


```json5
{
  "email": "name@email.de",
  "password": "secretPassword"
}
```

**Response**


```json5
{
  "success": true,
  "auth": {
    "token_name": "PersonalAccess",
    "token_type": "Bearer",
    "created_at": "2019-11-20 13:35:38",
    "updated_at": "2019-11-20 13:35:38",
    "expires_at": "2019-11-21T13:35:38.000000Z",
    "expires_in": 86400,
    "token": "eyJ0eXAiOiJKV2PiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhNjNiN2NlNTEyZDFjNmY4NTAxMWNkYjg4N2Y"
  },
  "user": {
    "id": 1234567,
    "cid": "100-1234567",
    "name": "Karl-Heinz Mustermann",
    "email": "name@email.de",
    "firstname": "Karl-Heinz",
    "lastname": "Mustermann"
  }
}
```
