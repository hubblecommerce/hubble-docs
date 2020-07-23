# Components

If you are new to vue.js and need to understand what a component in this context means, please check out the official vue.js guide for [single file components](https://vuejs.org/v2/guide/single-file-components.html).

You can find all components like you would in a regular nuxt.js installation. The script part as the business logic of a component is very small an only includes a mixin, which is provided by the hubble module. 

It allows you to restructure your template part of the component and at the same time being capable of updates. 

## Components vs Pages vs Layouts

In nuxt.js pages and layouts are in different directories, but they are vue.js components anyway. So most  things explained on this page applies to pages and layouts as well.

## Override Components

As mentioned before, every hubble component business logic is implemented as a vue.js mixin like:

```html 
<script>
    import ProductDetailBuybox from "hubble-commerce/core/components/ProductDetailBuybox.js";

    export default {
        mixins: [ProductDetailBuybox]
    };
</script>
```

If you like to write your own business logic or override some existing, you simply copy the part you like to edit from the mixin and paste it into the component script part.


```html
<script>
    import ProductDetailBuybox from "hubble-commerce/core/components/ProductDetailBuybox.js";

    export default {
        mixins: [ProductDetailBuybox],
        computed: {
            itemIsConfigurable() {
                // Write your own
                return false;
            }
        },
    };
</script>
```


