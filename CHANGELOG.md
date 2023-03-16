# Changelog
All Notable changes to `digipolisgent/gent_base`.




## [Unreleased]

## [7.x-2.16]
### Updated

* Update to node 18, includes updating grunt, sass, ...

## [7.x-2.15]
### Fixed

* Fix display of file "table"

## [7.x-2.14]
### Changed

* Update District09 logo

## [7.x-2.13]
### Changed

* Change Digipolis logo to District09

## [7.x-2.12]
### Changed

* Improved accessibility of gent auth bar popup menu.

## [7.x-2.11]
### Changed

* Changed tone of voice in Dutch translations.

## [7.x-2.10]
### Changed

* Stuff added and fixed. See commits.

## [7.x-2.9]
### Changed

* Fixed warning in gent_base_tools template.
* Dropped base font size one pixel.
* Defined font-weight of strong tag.

## [7.x-2.7]
### Changed

* Removed brand tagline from header, according to new brand design.
* Added new brand logo.
* Changed font family to fira-sans (update your typekits & check project stylesheets for use of old fonts expressway & Source Sans).
* Changed blue color to another blue color (check project stylesheets).
* Changed theming of brand layout in footer, content has been split (see gent_base_tools).
* Changed color of corner svg images.


## [7.x-2.6]
### Changed

* Added Icomoon settings file and removed individual svgs.
* Switched icon styles to CSS3.
* Consolidated GPDC sheet theming code.
* Fixed double H1.
* Added alt tag to auth bar icon.
* Fixed viewport order of execution.
* Sticky admin menu wraps inside #sticky-wrapper-admin.
   We wrap the sticky admin menu in a div on top of the page. #sticky-wrapper is already used by other
   sticky containers (webform progress, kids subnavigation, sticky accordion...)
* Added title attribute to gpdc sheet form url.
* Switched expressway font to typekit integration and removed it from repo.


## [7.x-2.5]
### Changed
This version is mainly a refactoring of existing code. The upgrade aims to be fully backwards compatible with the
previous 2.x versions.
However, you are **strongly** encouraged to test the styling and scripts of your sub-theme after updating.

These changes include:
* All node modules and gems are pushed to their latest stable version. The ruby version was bumped to 2.3.0.
* Libraries are now ONLY handled by bower. The make file was removed, custom libraries have been added via Bower.
* Theme.js no longer exists. It is now rewritten for Drupal and split into separate files. Some script have been
   converted into behaviors. If a sub-theme uses some custom code to extend theme.js (f.e. on AJAX calls), that code
   might be no longer needed.
* Code that did not belong in Gent base was moved to the projects that implemented them. Among others:
  * Templates from modules not available as building block.
  * Scripts and styling for Stad Gent elements.
* New Grunt task for SASS linting. Sass lint is configured with sensible defaults to encourage using the best practises
  for writing SASS code for components in BEM-style. If possible, avoid using sass-lint:disable-* unless necessary.
  * Included in default build and compile tasks
  * .sass-lint.yml can be customized in a sub-theme to skip certain validation (f.e. legacy code, ...).
  * All SASS code was cleaned up to pass linting.
* (Pre-)process functions don't have their own file per hook anymore, but a general process/preprocess file.
* The included Starterkit has been updated.
* Changes to meet the Drupal Coding standards.
* No-query SASS file was removed, this speeds up the build & watch tasks.
* Code for older browsers (mainly <= IE9) was stripped (html5shiv, respond.js, css3 pie, ...). If required, they can be
  added in your sub-theme.
* DTGB-25: Update pagination so the whole page button is clickable instead of only the word/number.



## [7.x-2.4]
* SPOSI-535: Added action links.



## [7.x-2.3]
### Fixed
* GENTBE-2242: Fixed popup layout.
* GENTBE-1103: Fixed issues with breadcrumbs.
* GENTBE-1935: Removed and updated gent_newsletter references.



## [7.x-2.2]
### Fixed
* PPL-743: Misc. fixes & changes to integrate the new header into PPL.



## [7.x-2.1]
### Removed
* GENTBE-2093: Removed font-smoothing, text-rendering css rules (we don't need blurry font rendering).


[Unreleased]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.x...7.x-2.x-dev
[7.x-2.16]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.15...7.x-2.16
[7.x-2.15]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.14...7.x-2.15
[7.x-2.14]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.13...7.x-2.14
[7.x-2.13]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.12...7.x-2.13
[7.x-2.12]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.11...7.x-2.12
[7.x-2.11]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.10...7.x-2.11
[7.x-2.10]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.9...7.x-2.10
[7.x-2.9]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.8...7.x-2.9
[7.x-2.8]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.7...7.x-2.8
[7.x-2.7]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.6...7.x-2.7
[7.x-2.6]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.5...7.x-2.6
[7.x-2.5]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.4...7.x-2.5
[7.x-2.4]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.3...7.x-2.4
[7.x-2.3]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.2...7.x-2.3
[7.x-2.2]: https://github.com/StadGent/drupal_theme_gent-base/compare/7.x-2.1...7.x-2.2
[7.x-2.1]: https://github.com/StadGent/drupal_theme_gent-base/tree/7.x-2.1
