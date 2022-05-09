# Pages
[See the pages on github](https://github.com/hubblecommerce/hubble-frontend-pwa/tree/main/core/pages)

## Static Routes 

Use the usual nuxt [file system routing](https://nuxtjs.org/docs/features/file-system-routing/) to generate the static routes.
hubble uses static page routes for the following page types:
- Checkout Pages  
- Customer Pages
- Cart
- Home
- Search Result Page

## Dynamic Routes

If the requested route is not a static route, the 
[dynamic route](https://nuxtjs.org/docs/features/file-system-routing/#dynamic-routes) component _.vue takes effect. 
This component fetches the requested route from the API and resolves dynamically to components.

hubble uses dynamic page routes for the following page types:
- Category / Product Listing
- Product Detail Page 
