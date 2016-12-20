# Changelog
All Notable changes to `digipolisgent/gent_base`.

## [7.x-2.4]
### Changed
This version contains mainly refactorings. This upgrade aims to be fully backwards compatible with previous version. 

These changes include:
* All node modules and gems are pushed to their latest stable version. The ruby version was bumped to 2.3.0.
* Libraries are now ONLY handled by bower. The make file was removed.
* Theme.js no longer exists. It is now rewritten for Drupal and split into separate files. 
* Code that did not belong in Gent base was moved to the projects that implemented them. Among others:
  * Templates from modules not available as building block
  * Scripts and styling for Stad Gent elements
* New Grunt task for SASS linting
  * Included in default build and compile tasks
  * .sass-lint.yml can be customized in a subtheme to skip certain validation (f.e. legacy code, ...)
  * All SASS code was cleaned up to pass linting.


## [7.x-2.1]

### Removed
* GENTBE-2093: Removed font-smoothing, text-rendering css rules (we don't need blurry font rendering).
