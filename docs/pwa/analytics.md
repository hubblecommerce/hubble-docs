# Analytics

## Google Tag Manager 

### Konfiguration
hubble unterstützt die GTM Implementierung durch das @nuxtjs/google-tag-manager Modul.

Dazu muss nur in der .env Datei der entsprechende Key hinterlegt werden.

```env
# Google
# google tag manager id
GOOGLE_TAG_MANAGER_ID = 'GTM-XXXXXXX'
```

### Datalayer 

Zum setzen des Datalayers stellt hubble eine eigene Komponente bereit: 

``` vue
<g-t-m-data-layer
    :event="'productLoaded'"
    :page-type="'product'"
    :page-title="productData.name"
    :breadcrumbs="breadcrumbPath"
    :e-commerce-detail="gtmECommerceData"
/>
```

### Product Impressions

Zum setzen des Datalayers stellt hubble eine eigene Komponente bereit: 

``` vue
<g-t-m-product-impressions 
    :products="dataItems" 
    :list="list" 
    :category="category" 
/>
```
