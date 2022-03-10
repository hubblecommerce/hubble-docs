# Shopware 6 Plugins

## How to install Shopware 6 Plugins on your hubble PWA?
1. Go to your SW6 admin and create an [“Integration”](https://docs.shopware.com/en/shopware-6-en/settings/system/integrationen?category=shopware-6-en/settings/system) so your PWA can communicate with your Shop programmatically.
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

## How to tell which component uses which slot?
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
<PluginSlot name="checkout-payment-methods-method" :data="method" />
```

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

## Plugin skeleton example
- /Resources
- /app
- /pwa
- /assets
- /components
- /composables
- /layouts
- /middleware
- /pages
- /store
- package.json
- pluginMapping.json
