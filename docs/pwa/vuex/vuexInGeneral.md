# In general

Store modules are helpful to let components communicate with each other. The data of a store called states can be used as reactive
properties inside a component. To keep the reactivity save of the states you cannot manipulate them directly. 
You have to commit/dispatch changes.

There are some stores which are more shop system specific than others. Those are placed in a separate
directory within the store folder. Name of this folder is equal api type. 

* hubble/core/store/module.js -> common store 
* hubble/core/store/api/module.js -> store only available for api type 'api' (hubble Api)
* hubble/core/store/sw/module.js -> store only available for api type 'sw' (Shopware 6)
