# Theming

## How styles are defined in Hubble
There's a demo theme included in Hubble which makes it easy to build upon a custom theme if needed.
Component templates already have assigned classes which are declared in a separate __scss__ folder, 
which can be found at 
```
~/assets/scss/hubble
```


Although styles still can be declared in their respective SFCs (Single File Components),
the compilation of separated out __scss__ files is already configured for you ready to go through __node-sass__ and webpack's __sass-loader__.
To add a __.scss__ file to the compilation process the file needs to be listed in the __all.scss__ file which gets ultimately 
transpiled to be the CSS stylesheet of the project.

