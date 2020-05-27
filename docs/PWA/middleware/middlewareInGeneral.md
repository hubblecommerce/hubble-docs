# In general

Middleware fetches or validates data before a specific page is loaded. On initial page load a middleware will be executed
serverside and every further call will be executed clientside. 

There are some middleware which is more shop system specific than others. Those are placed in a separate
directory within the middleware folder. Name of this folder is equal api type. 

* hubble/core/middleware/mware.js -> common middleware 
* hubble/core/middleware/api/mware.js -> middleware only available for api type 'api' (hubble Api)
* hubble/core/middleware/sw/mware.js -> middleware only available for api type 'sw' (Shopware 6)
