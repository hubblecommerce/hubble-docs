# Lazy Loading

## Lazy Loading von Bildern

Bilder sollten erst dann vom Browser heruntergeladen und angezeigt werden, wenn diese sich im Sichtbereich befinden. 
Dafür benutzt hubble die Komponente von [Markus Oberlehner](https://markus.oberlehner.net/blog/lazy-loading-responsive-images-with-vue/)
 __/components/utils/ImgLazy.vue__ in Verbindung mit [Lozad.js](https://apoorv.pro/lozad.js/). hubble erweitert diese Komponente um alt und title Informationen. 

Die Bildgrößen sollten gesetzt werden um [CLS](https://web.dev/cls/) zu verhindern. 

``` vue
<img-lazy
    :src="require('~/assets/images/app/logo.png')"
    :alt-info="'Logo'"
    :title-info="'Logo'"
    :width="500"
    :height="200"
/>
```
