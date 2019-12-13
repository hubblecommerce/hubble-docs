# Request / Response - Get Payments


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
      "id": 1,
      "created_at": null,
      "updated_at": null,
      "label": "Payment One",
      "description": "1st Choice Payment Provider",
      "description_long": null,
      "provider_url": "https://pay.ment.one/",
      "callback_url": "https://pay.ment.one/"
    },
    {
      "id": 2,
      "created_at": null,
      "updated_at": null,
      "label": "Payment Two",
      "description": "2nd Choice Payment Provider",
      "description_long": null,
      "provider_url": "https://pay.ment.baz/",
      "callback_url": "https://pay.ment.baz/"
    },
    {
      "id": 3,
      "created_at": null,
      "updated_at": null,
      "label": "Payment Three",
      "description": "3rd Choice Payment Provider",
      "description_long": null,
      "provider_url": "https://pay.ment.biz/",
      "callback_url": "https://pay.ment.biz/"
    }
  ]
}
```
