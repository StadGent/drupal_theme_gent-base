# Drupal 8 base theme using the styleguide of Stad Gent.
This Drupal 8 theme is based on the styleguide of Stad Gent.
It is loaded in through an NPM package `gent_styleguide` and uses a starterkit
subtheme to let you adjust according to your specific needs.

#### Installation
To install and use this base theme and a subtheme of it follow these steps:
* Clone this repository in your Drupal themes/contrib folder
  `git clone --branch=8.x-1.x-dev git@bitbucket.org:digipolisgent/drupal_theme_gent-base.git`
* Install with composer
  `composer install`
* Execute the install script
  `./install.sh`
* Copy the starterkit folder to /themes/custom of your Drupal installation and just follow the installation instructions in the `INSTALL.md` file.

Done!
