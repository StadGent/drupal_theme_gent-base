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

In combination with the ckeditor5.scss in your subtheme source/sass dir,
also add the following hook to a custom module in order to make the in-editor
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

Don't forget to add the following to your subtheme info yml file:

```
ckeditor5-stylesheets:
  - build/css/ckeditor5.css
```

## Theming considerations

### The $styleguide-dir variable

This theme overrides Styleguide's `$styleguide-dir` variable pointing to the
directory of the style guide within the gent_base theme for your Drupal
installation. Styleguide itself has no clue of Drupal, so we make sure in a
Drupal context, we can find the styleguide location.
When needed, this variable can be used to point to styleguide resources such as
icons, fonts, images, ...
