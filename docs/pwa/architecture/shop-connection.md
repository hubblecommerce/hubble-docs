# Shop Connector

## API Client
To fetch data from your e-commerce system, hubble provides you a helper class called [ApiClient](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/dev/%40hubblecommerce/hubble/core/utils/api-client.js).
It sets some default headers, accepts POST request data and handles errors if your shop shouldn't be reachable. 

Usage:
```js
import ApiClient from '@/utils/api-client';

let response = await new ApiClient(this.$config).apiCall({
    action: 'get',
    endpoint: 'store-api/context',
    contextToken: contextToken,
});
```

### Configuration
You can configure the api base url and access-key in the .env file.

```
API_BASE_URL            = 'http://localhost'
API_SW_ACCESS_KEY       = 'XXXXXXXXXXXXXXX'
```

## Data mapping
To simply fetch data from the api is not enough because our components expect a different data schema. 
Therefore the reponse data need to be mapped first. Take a look at the [Api Client Helper](https://github.com/hubblecommerce/hubble-frontend-pwa/blob/dev/%40hubblecommerce/hubble/core/utils/api-mapping-helper.js)
you can see the list of mapped entities. 

Usage:
```js
import { mappingProduct } from '@/utils/api-mapping-helper';

const product = mappingProduct(response.data);
```