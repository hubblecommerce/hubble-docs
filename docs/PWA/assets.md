# Assets

By default hubble is shipped with a demo theme. It consists of the classes and structure of the template part in components and the styles of the /assets directory.

hubble already included the sass loader for you, that's why the hubble theme is written with sass as well.

## Override Assets

You can either use the hubble theme and override the styles by creating your own in the /assets/scss directory in root folder or you can prevent loading the demo theme completely, by setting the corresponding flag in the module config in nuxt.config.js. In this case you can write your own theme entirely on your own by placing it in assets/scss folder of the root directory.

```json5
/*
** Nuxt.js modules
*/
modules: [
    [
        '~/modules/hubble/module',
        {
            // hubble module config
            useTheme: false
        }
    ]
]
```

