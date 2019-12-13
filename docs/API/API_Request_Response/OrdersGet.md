# Request / Response - Get Orders


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
      "created_at": "2019-09-27 13:06:37",
      "updated_at": "2019-09-27 13:06:37",
      "status": "new",
      "payload": "{\"id\":\"1a\\"b31\\"3-\\"134-1\\"34-a\",\"cart\":{\"items\":[{\"id\":\"100-\\"3\",\"qty\":9,\"sku\":\"680\\"30\",\"image\":\"100_0.jpg\",\"url_pds\":\"Executive-Anvil.html\",\"variants\":[{\"code\":\"size\",\"type\":\"attribute\",\"label\":\"Size\",\"value_id\":\\"3,\"stock_qty\":3,\"value_label\":\"11.5\"}],\"name_orig\":\"Executive Anvil\",\"final_price_item\":{\"price\":\\"31.0084,\"max_price\":\\"31.0084,\"min_price\":\\"31.0084,\"priceinfo\":null,\"price_type\":null,\"price_view\":null,\"tax_class_id\":1,\"price_sort_by\":\\"31.0084,\"special_price\":null,\"price_per_unit\":\\"31.0084,\"tax_class_rate\":19,\"base_price_unit\":null,\"price_filter_by\":\\"31.0084,\"special_to_date\":null,\"tax_class_label\":\"MwSt 19%\",\"base_price_amount\":null,\"special_from_date\":null,\"base_price_base_unit\":null,\"base_price_base_amount\":null},\"manufacturer_name\":\"ACME\"},{\"id\":\"100-19\",\"qty\":1,\"sku\":\"680\\"30\",\"image\":\"100_0.jpg\",\"url_pds\":\"Executive-Anvil.html\",\"variants\":[{\"code\":\"size\",\"type\":\"attribute\",\"label\":\"Size\",\"value_id\":19,\"stock_qty\":1,\"value_label\":\"9.5\"}],\"name_orig\":\"Executive Anvil\",\"final_price_item\":{\"price\":\\"31.0084,\"max_price\":\\"31.0084,\"min_price\":\\"31.0084,\"priceinfo\":null,\"price_type\":null,\"price_view\":null,\"tax_class_id\":1,\"price_sort_by\":\\"31.0084,\"special_price\":null,\"price_per_unit\":\\"31.0084,\"tax_class_rate\":19,\"base_price_unit\":null,\"price_filter_by\":\\"31.0084,\"special_to_date\":null,\"tax_class_label\":\"MwSt 19%\",\"base_price_amount\":null,\"special_from_date\":null,\"base_price_base_unit\":null,\"base_price_base_amount\":null},\"manufacturer_name\":\"ACME\"},{\"id\":\"100-\\"4\",\"qty\":1,\"sku\":\"680\\"30\",\"image\":\"100_0.jpg\",\"url_pds\":\"Executive-Anvil.html\",\"variants\":[{\"code\":\"size\",\"type\":\"attribute\",\"label\":\"Size\",\"value_id\":\\"4,\"stock_qty\":3,\"value_label\":\"1\\".0\"}],\"name_orig\":\"Executive Anvil\",\"final_price_item\":{\"price\":\\"31.0084,\"max_price\":\\"31.0084,\"min_price\":\\"31.0084,\"priceinfo\":null,\"price_type\":null,\"price_view\":null,\"tax_class_id\":1,\"price_sort_by\":\\"31.0084,\"special_price\":null,\"price_per_unit\":\\"31.0084,\"tax_class_rate\":19,\"base_price_unit\":null,\"price_filter_by\":\\"31.0084,\"special_to_date\":null,\"tax_class_label\":\"MwSt 19%\",\"base_price_amount\":null,\"special_from_date\":null,\"base_price_base_unit\":null,\"base_price_base_amount\":null},\"manufacturer_name\":\"ACME\"}],\"coupons\":[],\"subtotal\":30\\"3.9,\"createdAt\":15750\\"4980059,\"items_qty\":11,\"grand_total\":30\\"8.89,\"base_subtotal\":30\\"3.9,\"base_grand_total\":0,\"global_currency_code\":\"EUR\",\"subtotal_with_discount\":30\\"3.9,\"base_subtotal_with_discount\":30\\"3.9},\"storeId\":\"100\",\"customer\":{\"email\":\"register@example.co\",\"lastName\":\"Mustermann\",\"firstName\":\"Karl-Heinz\",\"customerId\":1\\"34567,\"customerType\":\"REG\"},\"addresses\":[{\"payload\":{\"city\":\"Musterhausen\",\"gender\":\"m\",\"postal\":\"1\",\"street\":\"Musterstr.\",\"company\":\"\",\"country\":\"DE\",\"houseNo\":\"1\",\"lastName\":\"Mustermann\",\"firstName\":\"Max\"},\"is_billing\":true,\"is_shipping\":false,\"is_billing_default\":false,\"is_shipping_default\":false},{\"id\":1\\"345,\"payload\":{\"city\":\"Hannover\",\"gender\":\"m\",\"postal\":\"30175\",\"street\":\"Teststraße\",\"company\":\"\",\"country\":\"DE\",\"houseNo\":\"4\\"\",\"lastName\":\"Mustermann\",\"firstName\":\"Karl-Heinz\"},\"created_at\":\"\\"019-11-\\"9 11:00:54\",\"is_billing\":false,\"updated_at\":\"\\"019-11-\\"9 11:00:54\",\"is_shipping\":true,\"is_billing_default\":true,\"is_shipping_default\":true}],\"orderComment\":\"\",\"paymentResponse\":{\"txid\":\"1\\"3456789\",\"status\":\"APPROVED\",\"userid\":\"1\\"3456789\",\"clearing_bankbic\":\"DEDEDEDEDE\",\"clearing_bankcode\":\"1\\"34567\",\"clearing_bankiban\":\"1\\"34567891\\"31\\"3\",\"clearing_bankname\":\"Deutsche Bank AG\",\"clearing_bankaccount\":\"001\\"345678\",\"clearing_bankcountry\":\"DE\",\"clearing_bankgrouptype\":\"\",\"clearing_bankbranchcode\":\"\",\"clearing_bankcheckdigit\":\"\",\"clearing_bankaccountholder\":\"PAYONE GmbH\"},\"chosenPaymentMethod\":{\"key\":\"rec\",\"label\":\"Rechnung\"},\"chosenShippingMethod\":{\"id\":1,\"tax\":1.19,\"label\":\"Shipping Method 1\",\"price\":3.\\"9,\"created_at\":null,\"updated_at\":null,\"description\":\"Shipping with Shipping Method 1\",\"description_long\":null}}"
    },
    ...
    ...
  ]
}
```

**Response formatted JSON**


```json5
{
  "id": "1a2b3123-2134-1234-a",
  "cart": {
    "items": [
      {
        "id": "100-23",
        "qty": 9,
        "sku": "680230",
        "image": "100_0.jpg",
        "url_pds": "Executive-Anvil.html",
        "variants": [
          {
            "code": "size",
            "type": "attribute",
            "label": "Size",
            "value_id": 23,
            "stock_qty": 3,
            "value_label": "11.5"
          }
        ],
        "name_orig": "Executive Anvil",
        "final_price_item": {
          "price": 231.0084,
          "max_price": 231.0084,
          "min_price": 231.0084,
          "priceinfo": null,
          "price_type": null,
          "price_view": null,
          "tax_class_id": 1,
          "price_sort_by": 231.0084,
          "special_price": null,
          "price_per_unit": 231.0084,
          "tax_class_rate": 19,
          "base_price_unit": null,
          "price_filter_by": 231.0084,
          "special_to_date": null,
          "tax_class_label": "MwSt 19%",
          "base_price_amount": null,
          "special_from_date": null,
          "base_price_base_unit": null,
          "base_price_base_amount": null
        },
        "manufacturer_name": "ACME"
      },
      {
        "id": "100-19",
        "qty": 1,
        "sku": "680230",
        "image": "100_0.jpg",
        "url_pds": "Executive-Anvil.html",
        "variants": [
          {
            "code": "size",
            "type": "attribute",
            "label": "Size",
            "value_id": 19,
            "stock_qty": 1,
            "value_label": "9.5"
          }
        ],
        "name_orig": "Executive Anvil",
        "final_price_item": {
          "price": 231.0084,
          "max_price": 231.0084,
          "min_price": 231.0084,
          "priceinfo": null,
          "price_type": null,
          "price_view": null,
          "tax_class_id": 1,
          "price_sort_by": 231.0084,
          "special_price": null,
          "price_per_unit": 231.0084,
          "tax_class_rate": 19,
          "base_price_unit": null,
          "price_filter_by": 231.0084,
          "special_to_date": null,
          "tax_class_label": "MwSt 19%",
          "base_price_amount": null,
          "special_from_date": null,
          "base_price_base_unit": null,
          "base_price_base_amount": null
        },
        "manufacturer_name": "ACME"
      },
      {
        "id": "100-24",
        "qty": 1,
        "sku": "680230",
        "image": "100_0.jpg",
        "url_pds": "Executive-Anvil.html",
        "variants": [
          {
            "code": "size",
            "type": "attribute",
            "label": "Size",
            "value_id": 24,
            "stock_qty": 3,
            "value_label": "12.0"
          }
        ],
        "name_orig": "Executive Anvil",
        "final_price_item": {
          "price": 231.0084,
          "max_price": 231.0084,
          "min_price": 231.0084,
          "priceinfo": null,
          "price_type": null,
          "price_view": null,
          "tax_class_id": 1,
          "price_sort_by": 231.0084,
          "special_price": null,
          "price_per_unit": 231.0084,
          "tax_class_rate": 19,
          "base_price_unit": null,
          "price_filter_by": 231.0084,
          "special_to_date": null,
          "tax_class_label": "MwSt 19%",
          "base_price_amount": null,
          "special_from_date": null,
          "base_price_base_unit": null,
          "base_price_base_amount": null
        },
        "manufacturer_name": "ACME"
      }
    ],
    "coupons": [],
    "subtotal": 3023.9,
    "createdAt": 1575024980059,
    "items_qty": 11,
    "grand_total": 3028.89,
    "base_subtotal": 3023.9,
    "base_grand_total": 0,
    "global_currency_code": "EUR",
    "subtotal_with_discount": 3023.9,
    "base_subtotal_with_discount": 3023.9
  },
  "storeId": "100",
  "customer": {
    "email": "register@example.co",
    "lastName": "Mustermann",
    "firstName": "Karl-Heinz",
    "customerId": 1234567,
    "customerType": "REG"
  },
  "addresses": [
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
  "orderComment": "",
  "paymentResponse": {
    "txid": "123456789",
    "status": "APPROVED",
    "userid": "123456789",
    "clearing_bankbic":"DEDEDEDEDE",
    "clearing_bankcode": "1234567",
    "clearing_bankiban": "123456789123123",
    "clearing_bankname": "Deutsche Bank AG",
    "clearing_bankaccount": "0012345678",
    "clearing_bankcountry": "DE",
    "clearing_bankgrouptype": "",
    "clearing_bankbranchcode": "",
    "clearing_bankcheckdigit": "",
    "clearing_bankaccountholder": "PAYONE GmbH"
  },
  "chosenPaymentMethod": {
    "key": "rec",
    "label": "Rechnung"
  },
  "chosenShippingMethod": {
    "id": 1,
    "tax": 1.19,
    "label": "Shipping Method 1",
    "price": 3.29,
    "created_at": null,
    "updated_at": null,
    "description": "Shipping with Shipping Method 1",
    "description_long": null
  }
}
```
