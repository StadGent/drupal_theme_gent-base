# Pierke base theme

Pierke is a modern, [Sass](http://sass-lang.com/) and
[Compass](http://compass-style.org/) enabled Drupal 7 base theme.

## Installation

In order to install Pierke, simply place it in your sites theme folder
(normally located at sites/all/themes). Pierke is a base theme and as such
should **never** be used or modified directly. Instead, you should create a subtheme based on this theme by copying
the startkit default theme (pierke/startskits/default).

To develop pierke, use ruby, bundler and grunt.
* Install ruby, version 1.9.3 is preferred.
* Install bundler (http://bundler.io/) and run bundle install
* Install node.js + npm (http://nodejs.org/)
* Run npm install and npm update

From now on, you can develop by using grunt watch and the css files and styleguide will be created for you.
