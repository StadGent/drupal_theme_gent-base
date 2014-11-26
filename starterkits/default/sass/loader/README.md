The import process of a subtheme
================================

The loader folder contains specific import scenario's for your subtheme.

Base
----
The default loading pattern is defined in base.scss. 

For each of the different sections (variables/plugins/abstractions/...) the loader will first import the base theme's 
own loader. This already comes with a lot of predefined parts, imported in a specific order. Afterwards the subtheme's
sections are imported in alphabetic order by sass globbing.

If needed you can customize loader/base to use your own order or even skip the basetheme's loader and only import the
parts you need.


Print
-----
Same as base, but only imports the base theme's print loader. 
