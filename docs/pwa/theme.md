# Theme

## Theming approach

To keep the development process clear, all components relates heavily to the single file component approach. 
That means templating business logic and styling are capsuled in one file each component. 

## Customizing 

Nevertheless you can change some fundamental styling like brand color or button appearance via a theme globally.
Just have a look into _@hubblecommerce/hubble/core/assets/scss/hubble_ and use the
[file based inheritance](/pwa/architecture/filebasedinheritance.html#overwriting-files) customize your theme.

## Bootstrap

Bootstrap is used for the actual layout and for defining the layout grid. Only the styles and scss mixin classes used 
in hubble are included via _@hubblecommerce/hubble/core/assets/scss/hubble/configuration/bootstrap-essentials.scss_ 
and can be expanded to include additional bootstrap classes and functions.