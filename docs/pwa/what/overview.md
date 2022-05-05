# Overview

## Features
hubble PWA is a Nuxt.js module. 
That means it relies on all the great features of Nuxt.js like:
- All benefits of Vue.js
- Server Side Rendering
- Dynamic Routing 
- Code-Splitting 
- Module Ecosystem
- Intuitive Developer Experience
- Runtime Configuration

and enriches them to meet the demanding requirements of an e-commerce interface like:
- [Shop connector](/pwa/architecture/shop-connection.html) including an API client and data mapping (headless)
- [File-based inheritance (Theming)](/pwa/architecture/filebasedinheritance.html)
- [E-commerce optimized components](/pwa/architecture/components.html) like catalog, customer, checkout etc. 
- [Integration path for shop-plugins (Compatibility Plugins)](/pwa/shopware/shopwareplugins.html)

This way hubble PWA can always be up-to-date to the fast-growing Nuxt.js ecosystem. 

## Performance
We aim for an intuitive and smooth interface experience no matter how many features you build in your shop.
How we do it:
- everything that's not necessary for SEO purposes will be loaded lazily via chunking and dynamic imports
- uses as less global code as possible, everything is a Single-File-Component
- uses only relevant parts of a CSS framework (Bootstrap)
- stores only a few small data in state-management 
- measure performance with Google Lighthouse 

## SEO friendly
All content that is relevant for SEO purposes will be rendered server-side thanks to Nuxt.js universal mode.
The rest will be loaded lazily to improve performance. <br>

We also take care of:
- Rich Snippets
- Google Tag Manager 
- Enhanced e-commerce tracking 

## PWA
To us, a PWA means more than the ability to add your website to home-screen or enable push notifications. 
We want to make sure the interface actually feels like an intuitive, native app and hand you tools to achieve that like:
- Excellent performance on mobile devices
- Mobile first design approach
- User input feedback via decent animations and transitions 

Besides, hubble of course is shipped with a simple service worker for offline support. 
Feel free to adjust it to fit your caching approach needs. 
Other PWA Features like "Add to Home" or "Push Notifications" can be installed easily 
using the [official Nuxt.js PWA Module](https://pwa.nuxtjs.org/).

## Specialized in Shopware 6
Because hubble PWA was built for Shopware 6 primarily, it supports features like:
- [Emotion Worlds](/pwa/shopware/shopwareemotion.html)
- [Shopware Plugins via Compatibility Plugins](/pwa/shopware/shopwareplugins.html)
- [Shop configuration](/pwa/shopware/shopwareplugins.html#how-do-i-access-my-plugin-configurations)

## Roadmap
Thanks to the headless approach hubble is not tied to Shopware only, 
so we are constantly working on connecting other e-commerce frameworks.
See our detailed [roadmap](/pwa/what/roadmap.html) for further information. 