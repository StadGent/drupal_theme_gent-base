# Drupal 8 base theme using the styleguide of Stad Gent.
This Drupal 8 theme is based on the styleguide of Stad Gent.
https://stijlgids.stad.gent/

It is loaded in through an NPM package `gent_styleguide` (https://www.npmjs.com/package/gent_styleguide) and uses a starterkit
subtheme to let you adjust according to your specific needs.

#### Installation
To install and use this base theme and a subtheme of it follow these steps:
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
          "url": "https://duplo.gentgrp.gent.be/packages.json"
      }
  },
  "require": {
      "gent-drupal/gent_base": "8.1.xrev"
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
