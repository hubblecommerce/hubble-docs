# Routing

## Static Routes 

Use the usual nuxt [file system routing](https://nuxtjs.org/docs/features/file-system-routing/) to generate the static routes.

## Dynamic Routes

If the requested route not a static route, the 
[dynamic route](https://nuxtjs.org/docs/features/file-system-routing/#dynamic-routes) component _.vue takes effect. 
This component fetches the requested route from the API and resolves dynamically to components e.g. catalogue listing, 
catalogue detail.