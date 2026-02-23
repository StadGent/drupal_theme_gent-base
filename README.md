# Drupal 10/11 base theme using the styleguide of Stad Gent.

This Drupal 10/11 theme is based on the style guide of Stad Gent.
https://stijlgids.stad.gent/

[![Maintainability](https://api.codeclimate.com/v1/badges/090c45ffd08a2370cd0d/maintainability)](https://codeclimate.com/repos/5a5c70e7f5f0e502a80009f1/maintainability)

It is included in the root of this theme inside the `styleguide` directory.
This is also the place where the style guide code gets maintained to be
published as an NPM package.

## Dependencies

* [Twig Typography module](https://www.drupal.org/project/twig_typography):
  This module is used to apply smart hyphenation to large sized titles. See
  `paragraph--call-to-action.html.twig` as example.

  Copy the typography_defaults.yml from the gent_base theme root to your custom
  theme root and adjust if needed.

  See [typography settings](https://github.com/mundschenk-at/php-typography/blob/main/src/class-settings.php)
  for all possible 'set' options.

## Installation

To install and use this base theme and a subtheme of it follow these steps:

* Add the `gent_base` php package from District09 Repman packagist to your
  Drupal composer.json file: By adding the post install and post update commands
  we ensure that the gent_base theme is installed correctly and everything is
  ready to use.

  ```
  "repositories": {
      "drupal": {
          "type": "composer",
          "url": "https://packages.drupal.org/8"
      },
      "repman-district09": {
          "type": "composer",
          "url": "https://district09.repo.repman.io"
      },
  },
  "require": {
      "gent-drupal/gent_base": "^6.0"
  },
  "scripts": {
    "drupal-scaffold": "DrupalComposer\\DrupalScaffold\\Plugin::scaffold",
    "pre-install-cmd": [
      "DrupalProject\\composer\\ScriptHandler::checkComposerVersion"
    ],
    "pre-update-cmd": [
      "DrupalProject\\composer\\ScriptHandler::checkComposerVersion"
    ],
    "post-install-cmd": [
      "DrupalProject\\composer\\ScriptHandler::createRequiredFiles",
      "@composer --working-dir=web/themes/contrib/gent_base install -n --no-dev --no-progress"
    ],
    "post-update-cmd": [
      "DrupalProject\\composer\\ScriptHandler::createRequiredFiles",
      "@composer --working-dir=web/themes/contrib/gent_base install -n --no-dev --no-progress"
    ]
  },
  ```
* Install the base theme by running `composer install` in the root of your
  Drupal project.
* Navigate into gent_base:
  `cd web/themes/contrib/gent_base`
* Setup the gent_base basetheme with composer:
  `composer install`
* Copy the starterkit folder to /themes/custom of your Drupal installation and
  just follow the installation instructions in the `INSTALL.md` file.

Done!

### CKEditor in-editor styling support

Also add the following hook to a custom module in order to make the in-editor
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

In your subtheme info yml file, load the base CKEditor stylesheet:

```
ckeditor5-stylesheets:
  - /themes/contrib/gent_base/build/css/ckeditor5.css
```

Optional: add project-specific overrides:

```
ckeditor5-stylesheets:
  - /themes/contrib/gent_base/build/css/ckeditor5.css
  - build/css/ckeditor5.project.css
```

### CKEditor CSS build flow

This section documents the CKEditor setup used by `gent_base` and subthemes.

1. Source of base CKEditor styles:
`/themes/contrib/gent_base/source/sass/ckeditor/_ckeditor5.scss`
and
`/themes/contrib/gent_base/source/sass/ckeditor/_ckeditor-content.scss`.
2. Entry file compiled by gulp:
`/themes/contrib/gent_base/source/sass/ckeditor5.scss`.
3. Build task:
`styles:ckeditor` in
`/themes/contrib/gent_base/source/gulpfile.js`.
4. CK-specific post-processing (selector rewrite + rem scaling):
`normalizeCkeditorCss()` in
`/themes/contrib/gent_base/source/gulp/ckeditor-css.js`.
5. Output CSS used by subthemes:
`/themes/contrib/gent_base/build/css/ckeditor5.css`.
6. Optional subtheme overrides:
Create `source/sass/ckeditor5.project.scss` in your subtheme and include
`build/css/ckeditor5.project.css` after the base file in
`ckeditor5-stylesheets`.

Notes:
- The base file should contain the reusable default behavior.
- Keep subtheme overrides small and project-specific.
- If no overrides are needed, omit `ckeditor5.project.scss` entirely.

## Theming considerations

### The $styleguide-dir variable

This theme overrides Styleguide's `$styleguide-dir` variable pointing to the
directory of the style guide within the gent_base theme for your Drupal
installation. Styleguide itself has no clue of Drupal, so we make sure in a
Drupal context, we can find the styleguide location.
When needed, this variable can be used to point to styleguide resources such as
icons, fonts, images, ...
