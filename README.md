# Drupal 9/10 base theme using the styleguide of Stad Gent.

This Drupal 9/10 theme is based on the style guide of Stad Gent.
https://stijlgids.stad.gent/

[![Maintainability](https://api.codeclimate.com/v1/badges/090c45ffd08a2370cd0d/maintainability)](https://codeclimate.com/repos/5a5c70e7f5f0e502a80009f1/maintainability)

It is included in the root of this theme inside the `styleguide` directory.
This is also the place where the style guide code gets maintained to be 
published as an NPM package.

## Dependencies

* [Twig Typography module](https://www.drupal.org/project/twig_typography):
  This module is used to apply smart hyphenation to large sized titles. See
  `paragraph--call-to-action.html.twig` as example.
  
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
      "repman-digipolis": {
          "type": "composer",
          "url": "https://digipolis.repo.repman.io"
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

## Theming considerations

### The $styleguide-dir variable

This theme as well as its starter kit contains a `00-settings/_vars.scss` file
which contains a `$styleguide-dir` variable pointing to the directory of the
style guide within the gent_base theme for your Drupal installation.

This style guide variable is necessary for the successful compilation of the
sub theme sass code.  
