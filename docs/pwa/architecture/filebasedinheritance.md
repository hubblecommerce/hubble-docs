# File-based inheritance

## Concept
To keep hubble PWA updatable but also customizable it provides an inheritance mechanism only based on file paths. As a 
basis, hubble sets the [nuxt srcDir](https://nuxtjs.org/docs/configuration-glossary/configuration-srcdir/) to _/.hubble_.

On every application build hubble PWA:
1. creates a .hubble directory in the projects root directory if not already exists 

<img src="/assets/images/file_based_inheritance-1@2x.jpg" alt="hubble PWA File-based inheritance Concept Step 1" style="width: 100%;" />

2. takes all hubble core files from _node_modules/@hubblecommerce/hubble/core_ and places them into _.hubble_

<img src="/assets/images/file_based_inheritance-2@2x.jpg" alt="hubble PWA File-based inheritance Concept Step 2" style="width: 100%;" />

3. takes all nuxt related directories (except for: node_modules, .hubble, .nuxt, .idea) from the project root path and
   copy them into _.hubble_. Files that already exists will be overwritten.

<img src="/assets/images/file_based_inheritance-3@2x.jpg" alt="hubble PWA File-based inheritance Concept Step 3" style="width: 100%;" />

## Overwriting files
To customize a specific component provided by hubble PWA you just have to:
1. find the component or file you want to edit in _node_modules/@hubblecommerce/hubble/core_
2. copy the file to your projects root directory, make sure the path stays the same 

```
cp node_modules/@hubblecommerce/hubble/core/components/layout/TheLogo.vue components/layout/TheLogo.vue
```

3. customize the file just created
4. rebuild the application

## .hubble Directory
Never customize files directly inside .hubble or the changes will be overwritten on next application build. 
There is no need for this directory to be versioned, so don't forget to add it to your .gitignore. 

## Path aliases
hubble PWA automatically sets the [default aliases](https://nuxtjs.org/docs/configuration-glossary/configuration-alias/)
to the new nuxt root directory, so you can use them just as in a regular nuxt project.