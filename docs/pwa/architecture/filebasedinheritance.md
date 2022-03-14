# File-based inheritance

## Concept
To keep hubble PWA updatable but also customizable it provides an inheritance mechanism only based on file paths. As a 
basis hubble set the nuxt root path of the nuxt application to the /.hubble directory.

On every application build hubble PWA:
1. creates a .hubble directory in the projects root directory if not already exists  
2. take all hubble core files from _node_modules/@hubblecommerce/hubble/core_ and places them into _.hubble_
3. takes all files of the nuxt related directories in the project root path and places them into _.hubble_. Files that 
already exists will be overwritten 

## Overwriting files
To customize a specific component provided by hubble PWA you just have to:
1. find the component or file you want to edit in node_modules/@hubblecommerce/hubble/core
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