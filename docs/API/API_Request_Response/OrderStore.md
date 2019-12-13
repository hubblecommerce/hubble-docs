# Request / Response - Store Order

**Request**


```json5
{
  "payload": "{\"id\":\"123g182e-1234-1234-a\",\"orderComment\":\"This is a order comment \",\"chosenPaymentMethod\":{\"key\":\"pre\",\"label\":\"Prepayment\"},\"chosenShippingMethod\":{\"id\":2,\"created_at\":null,\"updated_at\":null,\"label\":\"Shipping Method 1\",\"description\":\"Shipping with Shipping Method 1\",\"description_long\":null,\"price\":5.95,\"tax\":1.19},\"cart\":{\"items_qty\":1,\"grand_total\":54.89,\"base_grand_total\":0,\"global_currency_code\":\"EUR\",\"subtotal\":49.9,\"coupons\":[],\"base_subtotal\":49.9,\"subtotal_with_discount\":49.9,\"base_subtotal_with_discount\":49.9,\"items\":[{\"id\":\"198-20\",\"sku\":\"796347\",\"name_orig\":\"Executive Anvil\",\"variants\":[{\"code\":\"size\",\"type\":\"attribute\",\"label\":\"Size\",\"value_id\":20,\"value_label\":\"10.0\",\"stock_qty\":1}],\"image\":\"198_0.jpg\",\"manufacturer_name\":\"ACME\",\"final_price_item\":{\"price\":54.5378,\"min_price\":41.9328,\"max_price\":54.5378,\"special_price\":41.9328,\"price_type\":null,\"price_view\":null,\"tax_class_id\":1,\"tax_class_rate\":19,\"tax_class_label\":\"MwSt 19%\",\"base_price_unit\":null,\"base_price_amount\":null,\"base_price_base_unit\":null,\"base_price_base_amount\":null,\"price_per_unit\":54.5378,\"price_sort_by\":54.5378,\"price_filter_by\":54.5378,\"special_to_date\":null,\"special_from_date\":\"2019-06-08 06:15:53\",\"priceinfo\":null},\"url_pds\":\"Executive-Anvil.html\",\"qty\":1}],\"createdAt\":1574260331938},\"customer\":123456,\"addresses\":[{\"payload\":{\"city\":\"Musterhausen\",\"gender\":\"m\",\"postal\":\"1\",\"street\":\"Musterstr.\",\"company\":\"\",\"country\":\"DE\",\"houseNo\":\"1\",\"lastName\":\"Mustermann\",\"firstName\":\"Max\"},\"is_billing\":true,\"is_shipping\":false,\"is_billing_default\":false,\"is_shipping_default\":false},{\"id\":12345,\"payload\":{\"city\":\"Hannover\",\"gender\":\"m\",\"postal\":\"30175\",\"street\":\"Teststraße\",\"company\":\"\",\"country\":\"DE\",\"houseNo\":\"42\",\"lastName\":\"Mustermann\",\"firstName\":\"Karl-Heinz\"},\"created_at\":\"2019-11-29 11:00:54\",\"is_billing\":false,\"updated_at\":\"2019-11-29 11:00:54\",\"is_shipping\":true,\"is_billing_default\":true,\"is_shipping_default\":true}],\"storeId\":\"100\",\"paymentResponse\":{\"status\":\"APPROVED\",\"txid\":\"123456789\",\"userid\":\"123456789\",\"clearing_bankaccount\":\"0012345678\",\"clearing_bankcode\":\"12345678\",\"clearing_bankcountry\":\"DE\",\"clearing_bankname\":\"Deutsche Bank AG\",\"clearing_bankaccountholder\":\"PAYONE GmbH\",\"clearing_bankcity\":\"Berlin\",\"clearing_bankiban\":\"DE12345678901234567890\",\"clearing_bankbic\":\"DEDEDEDEDE\"}}"
}
```

**Request Formatted JSON Creditcard**

```json5
{ 
   "id":"12345c1-112n-1234-a",
   "orderComment":"",
   "chosenPaymentMethod":{ 
      "key":"cc",
      "label":"Creditcard",
      "pseudoCardPan":"1234567890123456701",
      "cardType":"M",
      "cardExpireDate":"2002"
   },
   "chosenShippingMethod":{ 
      "id":2,
      "created_at":null,
      "updated_at":null,
      "label":"Shipping Method 1",
      "description":"Shipping with Shipping Method 1",
      "description_long":null,
      "price":5.95,
      "tax":1.19
   },
   "cart":{ 
      "items_qty":1,
      "grand_total":54.89,
      "base_grand_total":0,
      "global_currency_code":"EUR",
      "subtotal":49.9,
      "coupons":[ 

      ],
      "base_subtotal":49.9,
      "subtotal_with_discount":49.9,
      "base_subtotal_with_discount":49.9,
      "items":[ 
         { 
            "id":"198-14",
            "sku":"796347",
            "name_orig":"Executive Anvil",
            "variants":[ 
               { 
                  "code":"size",
                  "type":"attribute",
                  "label":"Size",
                  "value_id":14,
                  "value_label":"7.0",
                  "stock_qty":1
               }
            ],
            "image":"198_0.jpg",
            "manufacturer_name":"ACME",
            "final_price_item":{ 
               "price":54.5378,
               "min_price":41.9328,
               "max_price":54.5378,
               "special_price":41.9328,
               "price_type":null,
               "price_view":null,
               "tax_class_id":1,
               "tax_class_rate":19,
               "tax_class_label":"MwSt 19%",
               "base_price_unit":null,
               "base_price_amount":null,
               "base_price_base_unit":null,
               "base_price_base_amount":null,
               "price_per_unit":54.5378,
               "price_sort_by":54.5378,
               "price_filter_by":54.5378,
               "special_to_date":null,
               "special_from_date":"2019-06-08 06:15:53",
               "priceinfo":null
            },
            "url_pds":"Executive-Anvil.html",
            "qty":1
         }
      ],
      "createdAt":1574328521029
   },
   "customer":123456,
   "addresses":[ 
      {
        "payload": {
          "city": "Musterhausen",
          "gender": "m",
          "postal": "1",
          "street": "Musterstr.",
          "company": "",
          "country": "DE",
          "houseNo": "1",
          "lastName": "Mustermann",
          "firstName": "Max"
        },
        "is_billing": true,
        "is_shipping": false,
        "is_billing_default": false,
        "is_shipping_default": false
      },
      {
        "id": 12345,
        "payload": {
          "city": "Hannover",
          "gender": "m",
          "postal": "30175",
          "street": "Teststraße",
          "company": "",
          "country": "DE",
          "houseNo": "42",
          "lastName": "Mustermann",
          "firstName": "Karl-Heinz"
        },
        "created_at": "2019-11-29 11:00:54",
        "is_billing": false,
        "updated_at": "2019-11-29 11:00:54",
        "is_shipping": true,
        "is_billing_default": true,
        "is_shipping_default": true
      }
   ],
   "storeId":"100",
   "paymentResponse":{ 
      "status":"APPROVED",
      "txid":"12345678912",
      "userid":"123456789"
   }
}
```


**Request Formatted JSON Prepayment**


```json5
{ 
   "id":"123g182e-1234-1234-a",
   "orderComment":"This is a order comment ",
   "chosenPaymentMethod":{ 
      "key":"pre",
      "label":"Prepayment"
   },
   "chosenShippingMethod":{ 
      "id":2,
      "created_at":null,
      "updated_at":null,
      "label":"Shipping Method 1",
      "description":"Shipping with Shipping Method 1",
      "description_long":null,
      "price":5.95,
      "tax":1.19
   },
   "cart":{ 
      "items_qty":1,
      "grand_total":54.89,
      "base_grand_total":0,
      "global_currency_code":"EUR",
      "subtotal":49.9,
      "coupons":[ 

      ],
      "base_subtotal":49.9,
      "subtotal_with_discount":49.9,
      "base_subtotal_with_discount":49.9,
      "items":[ 
         { 
            "id":"198-20",
            "sku":"796347",
            "name_orig":"Executive Anvil",
            "variants":[ 
               { 
                  "code":"size",
                  "type":"attribute",
                  "label":"Size",
                  "value_id":20,
                  "value_label":"10.0",
                  "stock_qty":1
               }
            ],
            "image":"198_0.jpg",
            "manufacturer_name":"ACME",
            "final_price_item":{ 
               "price":54.5378,
               "min_price":41.9328,
               "max_price":54.5378,
               "special_price":41.9328,
               "price_type":null,
               "price_view":null,
               "tax_class_id":1,
               "tax_class_rate":19,
               "tax_class_label":"MwSt 19%",
               "base_price_unit":null,
               "base_price_amount":null,
               "base_price_base_unit":null,
               "base_price_base_amount":null,
               "price_per_unit":54.5378,
               "price_sort_by":54.5378,
               "price_filter_by":54.5378,
               "special_to_date":null,
               "special_from_date":"2019-06-08 06:15:53",
               "priceinfo":null
            },
            "url_pds":"Executive-Anvil.html",
            "qty":1
         }
      ],
      "createdAt":1574260331938
   },
   "customer":123456,
   "addresses":[ 
      {
        "payload": {
          "city": "Musterhausen",
          "gender": "m",
          "postal": "1",
          "street": "Musterstr.",
          "company": "",
          "country": "DE",
          "houseNo": "1",
          "lastName": "Mustermann",
          "firstName": "Max"
        },
        "is_billing": true,
        "is_shipping": false,
        "is_billing_default": false,
        "is_shipping_default": false
      },
      {
        "id": 12345,
        "payload": {
          "city": "Hannover",
          "gender": "m",
          "postal": "30175",
          "street": "Teststraße",
          "company": "",
          "country": "DE",
          "houseNo": "42",
          "lastName": "Mustermann",
          "firstName": "Karl-Heinz"
        },
        "created_at": "2019-11-29 11:00:54",
        "is_billing": false,
        "updated_at": "2019-11-29 11:00:54",
        "is_shipping": true,
        "is_billing_default": true,
        "is_shipping_default": true
      }
   ],
   "storeId":"100",
   "paymentResponse":{ 
      "status":"APPROVED",
      "txid":"123456789",
      "userid":"123456789",
      "clearing_bankaccount":"0012345678",
      "clearing_bankcode":"12345678",
      "clearing_bankcountry":"DE",
      "clearing_bankname":"Deutsche Bank AG",
      "clearing_bankaccountholder":"PAYONE GmbH",
      "clearing_bankcity":"Berlin",
      "clearing_bankiban":"DE12345678901234567890",
      "clearing_bankbic":"DEDEDEDEDE"
   }
}
```


**Response**


```json5
{
  "success": true,
  "message": "Order saved!"
}
```

