# Drupal 8 base theme using the styleguide of Stad Gent.
This Drupal 8 theme is based on the styleguide of Stad Gent.
https://stijlgids.stad.gent/

[![Maintainability](https://api.codeclimate.com/v1/badges/090c45ffd08a2370cd0d/maintainability)](https://codeclimate.com/repos/5a5c70e7f5f0e502a80009f1/maintainability)

It is loaded in through an NPM package `gent_styleguide` (https://www.npmjs.com/package/gent_styleguide) and uses a starterkit
subtheme to let you adjust according to your specific needs.

## Versioning

The versioning of this repo follows the versioning of the [style guide repo](https://github.com/StadGent/fractal_styleguide_gent-base).

## Installation
To install and use this base theme and a subtheme of it follow these steps:
* There's a dependency to yarn, make sure you have it installed:
  ```
  npm -g install yarn
  ```
* Add the `gent_base` composer package from the duplo packagist to your Drupal composer.json file:
  By adding the post install and post update commands we ensure that the gent_base theme is installed correctly and
  everything is ready to use.
  ```
  "repositories": {
      "drupal": {
          "type": "composer",
          "url": "https://packages.drupal.org/8"
      },
      "gent-drupal": {
          "type": "composer",
          "url": "https://duplo.gentgrp.gent.be"
      }
  },
  "require": {
      "gent-drupal/gent_base": "8.1.0-dev"
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
      "cd web/themes/contrib/gent_base; composer install"
    ],
    "post-update-cmd": [
      "DrupalProject\\composer\\ScriptHandler::createRequiredFiles",
      "cd web/themes/contrib/gent_base; composer update"
    ]
  },
  ```
* Install the base theme by running `composer install` in the root of your Drupal project.
* Navigate into gent_base:
  `cd web/themes/contrib/gent_base`
* Setup the gent_base basetheme with composer:
  `composer install`
* Copy the starterkit folder to /themes/custom of your Drupal installation and just follow the installation instructions in the `INSTALL.md` file.

Done!

## Theming considerations

### Typekit integration
This theme uses Gent Styleguide as basic CSS theming. The Stylguide uses a font
(Expressway), which is an Adobe Typekit font. In order to render this font
correctly a typekit for your project should be created.

We defined a general gent base theme-setting called typekit_id to implement support
for Adobe Typekit inside our Theme. Just put the typekit id in the typekit_id themesetting
and your webfonts should be up and running.
