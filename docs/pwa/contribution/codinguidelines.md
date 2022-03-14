# Hubble Coding Guidelines for Contributors
## Checklist for a component 
### A component:
- is a Vue.js single file component (SFC)
- uses properties to control the components behaviour (configuration)
- uses v-text instead v-html to display data in template
- uses `<nuxt-link>` for internal anchors
- uses `<img-lazy>` to display images 
- imports child components dynamically
- uses garbage collection [to avoid memory leaks](https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html) 

### Vuex: 
- uses Vuex as less as possible

### Independent:
- has as few dependencies as possible
- works in all modern browsers

### Responsive:
- is functional on all modern devices
- uses the style section of a SFC
- uses the nuxt-mq functions for viewport dependent renderings if it doesn't work via styling

### Code Markup:
- use self-closing html tags in template
- takes into account all rules defined via eslint / prettier when programming
- uses ES6 JS Features

### SEO:
- can render all relevant content server-side to facilitate search engine crawling
- contains valid HTML markup (only one H1 per page, meta descriptions, images alt tag, anchor rel tags)

### Interface:
- always provides feedback to the user for all interactions, e.g. a transition or animation at a speed of 0.2 - 0.3 seconds
- displays a confirmation message when it comes to user input that triggers an API call that succeeds
- displays an error message when it comes to user input that triggers an API call that fails
- has a clear loading indicator when an API call is made

### Documentation:
- contains inline documentation to generate readable documentation in the docs.hubble with Vuedoc
- inline documentation in English
