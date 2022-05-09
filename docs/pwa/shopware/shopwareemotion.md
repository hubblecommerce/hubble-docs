# Shopware 6 Emotion Worlds

## Concept

hubble supports all types and elements of the Emotionworld feature that are available in a default Shopware 6 
installation.

Just like in the native Shopware 6 frontend, emotion worlds consists of blocks and slots. The difference is, every
slot/block is a Vue.js component. The order and structure comes from the shop api as a json response.
All emotion world related files are placed in _@hubblecommerce/hubble/core/components/swComponents_.

## Lazy loading large emotion worlds

The fact that every block is its own component means they can be imported dynamically to improve performance. 
To achieve that, there is a component called _IntersectionWrapper.vue_. This component wraps every block and register 
an intersection observer to it. So only the skeleton of the emotion world is created but without loading all components.
When a user scrolls and the slot intersects, the component is downloaded. 

To make sure that not every block is lazy loaded, e.g. the hero element for SEO purposes. The first two sections are 
never lazy loaded. This number can be edited in the data of the _IntersectionWrapper.vue_ component.
In some cases it can be useful to give a section an extra flag to decide whether to load a component serverside or not.