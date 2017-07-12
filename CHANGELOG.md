# Changelog
All Notable changes to `digipolisgent/gent_base`.



## [Unreleased]
###Changed

* Added Icomoon settings file and removed individual svgs.
* Switched icon styles to CSS3.
* Consolidated GPDC sheet theming code.
* Fixed double H1.
* Added alt tag to auth bar icon.
* Fixed viewport order of execution.
* Sticky admin menu wraps inside #sticky-wrapper-admin
   We wrap the sticky admin menu in a div on top of the page. #sticky-wrapper is already used by other
   sticky containers (webform progress, kids subnavigation, sticky accordion...)


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


[Unreleased]: https://bitbucket.org/digipolisgent/drupal_theme_gent-base/branches/compare/7.x-2.x-dev%0D7.x-2.x
[7.x-2.5]: https://bitbucket.org/digipolisgent/drupal_theme_gent-base/branches/compare/7.x-2.5%0D7.x-7.x-2.4#diff
[7.x-2.4]: https://bitbucket.org/digipolisgent/drupal_theme_gent-base/branches/compare/7.x-2.4%0D7.x-7.x-2.3#diff
[7.x-2.3]: https://bitbucket.org/digipolisgent/drupal_theme_gent-base/branches/compare/7.x-2.3%0D7.x-7.x-2.2#diff
[7.x-2.2]: https://bitbucket.org/digipolisgent/drupal_theme_gent-base/branches/compare/7.x-2.2%0D7.x-2.1#diff
[7.x-2.1]: https://bitbucket.org/digipolisgent/drupal_theme_gent-base/commits/tag/7.x-2.1