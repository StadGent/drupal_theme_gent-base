# gent_base base theme

gent_base is a modern, [Sass](http://sass-lang.com/) and
[Compass](http://compass-style.org/) enabled Drupal 7 base theme.

## Installation

In order to install gent_base, simply place it in your sites theme folder
(normally located at sites/all/themes). gent_base is a base theme and as such
should **never** be used or modified directly. Instead, you should create a subtheme based on this theme by copying
the startkit default theme (gent_base/starterkits/default).

To compile gent_base, use ruby, bundler and grunt.
* Install ruby, version 2.3 is preferred.
* Install bundler (http://bundler.io/) and run bundle install
* Install node.js + npm (http://nodejs.org/)
* Run npm install

From now on, you can develop by using grunt watch and the css files and styleguide will be created for you.
