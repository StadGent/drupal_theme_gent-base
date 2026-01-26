# SHORTCUTS DIRECTORY

> [!WARNING]
> **Shortcuts are deprecated**
>
> Do not use the shortcuts but at @use statements for the actual styleguide
> file(s) that is/are required in the subtheme.

This directory is used to create easy-access sass resources pointing
to gent_styleguide or other possible resources.

This way resources can be included like:

`@use 'gent_styleguide/grid-mixins';`

This directory should be an 'include path' in the compiler such as Gulp.

## How to replace the shortcuts

Grid mixins:

```scss
-@use 'gent_styleguide/grid-mixins' as *;
+@use 'styleguide/sass/11-base/grid/flexbox-grid/mixins/grid-mixins' as *;
```

Icon mixins:

```scss
-@use 'gent_styleguide/icon-mixins' as *;
+@use 'styleguide/sass/11-base/fonts/icons' as *;
```

Button mixins (all, or use the specific files who are needed):

```scss
-@use 'gent_styleguide/button-mixins' as *;
+@use 'styleguide/sass/21-atoms/button/button' as *;
```
