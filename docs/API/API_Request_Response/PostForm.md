# Request / Response - Post Form


**Request**


```json5
{
  "identifier": "Contactform",
  "payload":"{\"gender\":\"m\",\"firstName\":\"Max\",\"lastName\":\"Mustermann\",\"email\":\"one@example.com\",\"message\":\"Form message\"}",
}
```


**Request Formatted JSON**

```json5
{
   "gender":"m",
   "firstName":"Max",
   "lastName":"Mustermann",
   "email":"one@example.com",
   "message":"Form Message"
}
```

**Response**


```json5
{
  "success": true,
  "message": "Form saved!"
}
```
