# Shopware 6 Plugins

## How to install Shopware 6 Plugins on your hubble PWA?
1. Go to your SW6 admin and create an [Integration](https://docs.shopware.com/en/shopware-6-en/settings/system/integrationen?category=shopware-6-en/settings/system) so your PWA can communicate with your Shop programmatically.
2. Place the generated **client id** and **client secret** in the _.env_ file of your PWA root directory.
3. Edit the package.json file of your PWA root directory and add following helper scripts: 
``` json
"scripts": {
    "install-sw-plugins": "hubble sw-plugins-config && hubble sw-plugins-assets",
    "set-sw-plugins-config": "hubble sw-plugins-config",
    "install-sw-plugins-assets": "hubble sw-plugins-assets"
}
```

Now you are ready to install the Plugins of your Shopware 6 to your hubble PWA. Just execute the helper script on 
command line:
``` shell
npm run install-sw-plugins
```

## How does my Shopware 6 Plugin have to be structured to work with hubble PWA?
The basic structure and PHP business logic integration does not differ from a normal Shopware 6 Plugin. 
The difference takes place only for your frontend related code. 
Instead of placing your frontend code in _src/Resources/app/storefront_ you place it in _src/Resources/app/pwa_.

Inside the pwa folder you use the Nuxt.js default directory structure:
- assets
- components
- composables
- layouts
- middleware
- pages
- store

::: warning 
Plugins are used to add new files and provide components to fill slots only. Plugins are not allowed to override existing files like you would do in your hubble PWA root directory (file based inheritance).
:::

## What is meant by slots?
The hubble PWA core code provides vue slots where you can hook in to add your plugin functionality. This way the hubble core stays independent, updatable and maintainable. Should you still miss a slot, you can use the file based inheritance mechanism to add a new slot which you can fill with your plugin component.

<img src="/assets/images/shopware_plugins-1@2x.jpg" alt="hubble PWA Shopware Plugin Slots" style="width: 100%;" />

## How to tell which component uses which slot?

<br>
<img src="/assets/images/shopware_plugins-2@2x.jpg" alt="hubble PWA Shopware Plugin Slot Mapping" style="width: 100%;" />

Simply place a pluginMapping.json in your plugins pwa directory and define a slot and component by name and a path to your component. The file should look something like this:

``` json
{
   "pluginSlots": [
       {
           "slot": "checkout-payment-methods-method",
           "componentName": "my-plugin",
           "componentPath": "/components/my-plugin/MyPlugin.vue"
       },
       {
           "slot": "checkout-payment-methods-modal",
           "componentName": "my-plugin-modal",
           "componentPath": "/components/my-plugin/MyPluginModal.vue"
       }
   ]
}
```


Corresponding slot in hubble looks like this:
_@hubblecommerce/hubble/core/components/checkout/PaymentMethods.vue_
``` vue.js
<PluginSlot name="checkout-payment-methods-method" :data="{ propertyA: dataA, propertyB: dataB }" :events="{ 'updated:propertyA': (data) => { dataA = data; } }" />
```

You can use the _data_ property for all properties your slot component expects. 
For register event-listeners you can use the _events_ property and pass event names and handlers to it. 

A collection of all used slots you can find in _/swPlugins/pluginMapping.json_ of your projects root directory.

## How do I manage my plugin dependencies?
In this case you just need to add **a package.json in the pwa directory of your plugin** and define dependencies like you 
would in a normal npm based application. The install script will recognize and install the dependencies you defined.

## How do I access my plugin configurations?
The plugin install script automatically dumps your plugin configurations directly from your Shopware 6 
(thanks to Shopware PWA Extension). It merges all those configs and places it in _/swPlugins/pluginConfig.json_. 
On each build of your application the configurations are provided as runtimeConfigs.

Inside your components you can access the configurations via the **context.$config** Object.
The object key consists of the name of the plugin and the configuration key in camelcase.
For example: The programmatic name of your Plugin is “MySamplePlugin” and it has a configuration whose key is “active”, 
you would access it inside your component via: **this.$config.mySamplePluginActive**. 
You can always look up all the dumped configs in _/swPlugins/pluginConfig.json_.

## What about configurations that shouldn't be exposed to the frontend?
If a configuration key contains the words “secret” or “private” the configuration will be ignored to prevent exposing it to the frontend.

## I changed configuration of my plugin, but I can't see any changes
Everytime your configuration changes you have to dump and fetch them from your Shopware. 
To do this, add the line "set-sw-plugins-config": "hubble sw-plugins-config" to the scripts part of your root 
directories package.json and execute npm run set-sw-plugin-config on the command line. After the dump has finished, 
restart your application. A complete build is not necessary since runtimeConfigs are used.

## Payment Services
Configured payments are listed automatically in your checkout thanks to the PaymentMethods.vue component. But often
that's not enough, in case of payments where you have to enrich your order data with payment specific information.
For example: A customer selects the credit card payment method. Nowadays most Payment Service Providers need to render 
an iFrame to request the credit card data and returns you an id you need to store in your order data, so you don't have 
to handle credit card information by yourself.

In this case you need to:
- Render iFrame on Credit Card select
- Call the shop api and provide the ID received by the payment service provider (handle-payment)

To achieve that, hubble PWA provides you some useful slots and composables. Just have a look in the PaymentMethods.vue and
the HandlePlaceOrder.vue components to see how it works. 

## Why the place order button is missing for specific payments?
Every payment method which is not shipped by Shopware 6 out of the box, need to render and handle the place order process
on its own. So maybe the payment plugin you installed doesn't provide any pwa related files. 

## Plugin skeleton example
- /Resources/app/pwa
  - /assets
  - /components
  - /composables
  - /layouts
  - /middleware
  - /pages
  - /store
  - package.json
  - pluginMapping.json
