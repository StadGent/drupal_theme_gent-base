# Installation

## Theme compilation

Navigate to the theme directory.
```
cd web/themes/custom/starterkit
```

Rename the directory and all instances of "starterkit" to your desired
themename (e.g. "sg_theme").

Go to the source directory.
```
cd source
```

[Install NodeJS](https://nodejs.org/en/download/) and required node
packages (gulp, ...).

```
$ npm install
```

You should be all set and able to run gulp tasks:

#### Development

```
$ gulp
$ gulp watch
```

Running these will watch for SCSS and JS changes inside the source/sass and
source/js folders.

```
$ gulp validate
```

This command lets you validate your SCSS and JS files inside the source
directory.

#### Compiling for development or production

```
$ gulp compile
$ gulp compile:dev
```

Running these command you can compile your assets into a the build folder.
Either without minification (with `gulp compile:dev` or with minification
`gulp compile`).

```
$ gulp build
```

Run the `gulp build` command when you are ready and want production code.

## CKEditor in-editor styling

In combination with the ckeditor5.scss in your source/sass dir, also add
the following hook to a custom module in order to make the in-editor
styling work correctly:

```
/**
 * Implements hook_preprocess_HOOK() for html.
 */
function MYMODULE_preprocess_html(array &$variables) {
  // Check if the current page is using the admin theme.
  if (\Drupal::service('router.admin_context')->isAdminRoute()) {
    // Add a custom body class.
    $variables['attributes']['class'][] = 'cs--blue';
  }
}
```
