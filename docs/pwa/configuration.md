# Configuration

## Nuxt.js Configuration

### Environment / Runtime Variables 
Environment specific variables are provides via 
[nuxt's runtime configuration](https://nuxtjs.org/docs/directory-structure/nuxt-config#runtimeconfig) based on the 
dotenv module.

The minimal set of environment variables are API_BASE_URL and API_SW_ACCESS_KEY. All default variables are placed in
_@hubblecommerce/hubble/.env_example_ which will be placed as your .env file in your project root directory if it 
doesn't already exists. 

### Modules 
hubble PWA sets some nuxt specific configurations like runtime variables and a collection of modules, which can be found
in _@hubblecommerce/hubble/core/utils/config.js_.
To override them, simply set the configuration you want to your nuxt.config.js like you would in a regular nuxt project.

### Components
hubble PWA enables [nuxts auto-import](https://nuxtjs.org/docs/directory-structure/components/) of components 
automatically. So you don't have to import them manually and easily make use of dynamic imports via the lazy prefix.  