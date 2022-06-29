# Changelog

All Notable changes to `digipolisgent/drupal_theme_gent-base`.

## [4.4.1]

### Fix

* DTBG-866: Fix double description on select other
* DTGB-857: Add fieldset legend attributes

### Added 

* DTGB-872: Add font-display swap

### Updated

* Update gent_styleguide to 5.0.15

## [4.4.0]

### Added

* Add php 8.1 support.

### Fixed

* DTGB-871: Fix GrumpPHP error when installing in project.

## [4.3.12]

### Fixed

* DTGB-868: Fix pager to support d9
* DTGB-869: Fix JS errors on responsive tables

### Updated

* Update styleguide to 5.0.15: fix STIJ-396 and STIJ-397

## [4.3.11]

### Added

* GSVU-302: Add icon cart

## [4.3.10]

### Fixed

* Fix checkbox components by reverting update to dynamic.

## [4.3.9]

### Added

* SGD8-2086: Add vesta email note (label)

### Fixed

* DTGB-867: Fix faulty twig array slice

## [4.3.8]

### Fixed

* DTGB-865: Fix js:validate errors

## [4.3.7]

### Fixed

* DTGB-865: Fix undefined variables

## [4.3.6]

### Fixed

* Fix missing vendor folder in gent_styleguide dependency
* Fix checkbox-popup component because checkbox-dynamic doesn't support 
  multiple categories layout in modal

### Updated

* Update styleguide to 5.0.10

## [4.3.5]

### Updated

* STIJ-394: Update styleguide to 5.0.6

## [4.3.4]

### Fixed

* STIJ-393: Fix wrong padding on filter labels in filter/sidebar layout

### Updated

* Update to styleguide 5.0.4

## [4.3.3]

### Fixed

* DTGB-852: Fix dynamic checkbox component: removed duplicate entries

## [4.3.2]

### Updated

* Update to styleguide 5.0.3
  
### Fixed

* DTGB-862: Fix postinstall issue on jenkins
* DTGB-863: Fix normalize conflict on header accolade
* DTGB-852: Fix dynamic checkbox component

## [4.3.1]

### Fixed

* Missing fs-extra module.

## [4.3.0]

### Fixed

* Fix outdated installation instructions.
* DTGB-859: Updated styleguide to 5.0.0

### Changed

* DTGB-852: Changed checkox filter component with checkbox dynamic component.

### Updated

* DTGB-861: Update styleguide to version 5

## [4.2.1]

### Updated

* DTGB-858: Updated styleguide to 4.1.1.

## [4.1.0]

### Add

* BW-133: Add support Drupal 9.

### Update

* DTGB-851: Update styleguide to 4.1.0.

### Fix

* DTGB-850: Fix wrong font as logged in user.

## [4.0]

### Added

* DTGB-841: Added native lazy load to images.

### Updated

* DTGB-849: Updated styleguide to 4.0.2

### Fixed

* SGD8-1735: Fixed webforms description message styling.
* KAG-437: Fixed overridden spacing on file element.
* DTGB-848: Fixed security vulnerabilities.

### Replaced

* DTGB-849: Replaced removed/deprecated CSS classes.

### Removed

* DTGB-847: Removed overridden styling file-upload styleguide.

## [3.3]

### Added

* IDPMG-44: Added oicd_menu support.
* DTGB-846: Added field_contact_categories to if statement infopage.

### Changed

* DTGB-810: Changed upload description to follow ghent styleguide guidelines.

### Updated

* DTGB-849: Updated gent_styleguide.

## [3.2]

### Updated

* DTGB-842: Updated @digipolis-gent/modal to 1.0.3.
* DTGB-843: Updatad gent_styleguide to 3.1.1.

### Fixed

* DTGB-842: Fixed PHP notice in preprocess_fieldset.

## [3.1.0]

### Added

* DTGB-834: Add t filter to Close string in page.html.twig.
* DTGB-504: moved image style functionality to field level.

### Fixed

* DTGB-820: Updated deprecated classname inner-highlight to highlight__inner.
* DTGB-836: Fix pager: preprocess hook is now called last.
* SGD8-1395: Added hidden span to alt timeline item more info link
* SGD8-1685: Removed paragraph title from program modal
* DTGB-758: Converted the vesta renderable fields to variables.
* DTGB-810: Fixed webform file fields description theming
* SGD8-1391: fixed program overlay link after readspeaker event gets triggered
* DTGB-801: Fixed list indentation.
* DTGB-826: Fixed coding standards. Max-nested callback in accordion.bindings.js
* DTGB-838: Fixed security vulnerabilities.

### Updated

* Update styleguide version to 3.1.0

### Removed

* DTGB-830: Removed temp styling accolade in certain context. See STIJ-355.

## [3.0-beta20]

### Fixed

* Added links template to support different behaviour for single items.
* Fixed form-element markup.
* Fixed files against coding standards.

### Removed

* Removed placement of double classes for elements: checkbox and radio.

## [3.0.2]

### Updated

* Update styleguide version to 3.0.2

## [3.0.1]

### Added

* Extra form wrapper for items in fieldsets.
* Require Drupal core 8.8.2 to support library dependencies #2905429.

### Fixed

* Modal fixed-height had a scrollable region without keyboard access.
  The template has been updated, make sure to add tabindex=0 on all your
  .modal--fixed-height templates in your project too.
* Fixed notice: Undefined index:
  '#items' in `gent_base_preprocess_paragraph__image()`.

### Changed

* Deprecated: ‘mijn-gent-block’ has been renamed to the more generic
  ‘authentication’ in order to match the documentation.
  The ‘.mijn-gent-block’ class is still functional but marked as deprecated.
  Please use ‘.authentication’ from now on.
* Replaced box by highlight.

### Removed

* Deprecated modal.functions.js has been replaced by modal/index.js
  from @digipolis-gent/modal as npm dependency.

## [8.x-3.0-beta17]

### Added

* Added jQuery and jQuery.once dependencies to libraries.

### Fixed

* Fixed fieldset (fieldgroup) wrongly marked as "optional".
* Fixed overridden attributes.

### Changed

* Changed created date to published date in news--full

### Removed

* Removed unsupported pubdate attribute in time tag.

## [8.x-3.0-beta16]

### Added

* Added theming for menu and mobile menu due to a refactor of the style guide.
  ** Watch out! A new mobile_menu region is created with this update! **

### Updated

* Made sure the pager preprocess hook gets called first because we rewrite it.

### Fixed

* Fixed missing theme facets warning.

## [8.x-3.0-beta15]

### Fixed

* Fixed empty legend items for maps.

## [8.x-3.0-beta15]

### Added

* Added fix for fieldsets and datetime wrappers.
* Added has_row option to enable fieldsets to render 2 fields next to each other.

### Updated

* Removed form-tag from region-filters template and added a form-tag to the
  facet templates. This may break custom facets that rely on the form-tag.
* Updated gent_styleguide to 3.0.0-beta17.

### Fixed

* Fixed field message theming for form elements and fieldsets.
* Fixed optional label issue for fieldsets.
* Fixed menu JS library dependency.
* Fixed whitespace with form radios and checkboxes.
* Fixed hidden attribute.

## [8.x-3.0-beta14]

### Fixed

* Fixed menu.bindings.js file to work with the Modal instead of a Menu reference.
* Fixed field description styling for certain types of fields.

### Updated

* Upgrade styleguide version to 3.0.0-beta16.

## [8.x-3.0-beta13]

### Added

* Added translation for filter remove button.

### Fixed

* Fixed accordion toggle issue due to double `accordion` class.
* Fixed map legend scrolling issue.

### Updated

* Upgrade styleguide version to 3.0.0-beta15.

## [8.x-3.0-beta12]

### Fixed

* Fix JS issues when closing filter modal.
* Unwanted underline for links in partner block.
* Layout issue in newsletter subscribe form.

## [8.x-3.0-beta11]

### Added

* Partner paragraph.
* Theme wrapper "form_element_bare".
* ID attribute for map regions.
* Label to close button in map legend.
* Force `alt` attribute for images, even if it's empty.
* Template for local actions block.
* Theming for the language switcher block.

### Updated

* Optimize aria attributes for image galleries.
* Added `role="alert"` to error messages.

### Fixed

* Missing label for dropdown facets.
* Broken focus outline for map controls.
* Modal layout for filters.
* Fixed typo in table-mobile script that caused JS error in Safari.
* `aria-labelledby` on mobile tables when no caption is present.
* Fixed file upload theming.

## [8.x-3.0-beta10]

* Fixed unresolved dependency `bodyScrollLock`.

## [8.x-3.0-beta9]

### Updated

* Upgrade styleguide version to 3.0.0-beta14.

## [8.x-3.0-beta8]

### Added

* Template for `dg_newsletter` form.

### Updated

* Removed rel attribute from read more links.
* Updated CSS classes in dg_auth block.
* Form elements are looped for all forms now. It is not restricted to webforms
  anymore.
* Upgraded styleguide version to 3.0.0-beta13.

### Fixed

* Make "optional" label controllable through [State API](https://www.drupal.org/docs/8/api/state-api/).
* Duplicate ID's in table list descriptions.
* DTGB-769: Fixed broken documents field accordion.

### Removed

* Feedback form, since this is too project-specific.

## [8.x-3.0-beta7]

### Updated

* Show map legend by default, but only on tablet or bigger.

## [8.x-3.0-beta6]

### Updated

* Show map legend by default.
* Updated Dutch, French and German translations.

### Fixed

* Horizontal scroll for (large) tables.

## [8.x-3.0-beta5]

### Updated

* Styling fixes for webforms.

### Fixed

* DTGB-744: Fixed Mijn Gent dropdown issue on IE.
* DTGB-745: Fixed broken map marker.

## [8.x-3.0-beta4]

### Fixed

* DTGB-741: Fixed bindings for breadcrumbs and accordion JS files.
* DTGB-741: Fixed console issue with baselayerswitcher.
* SGD8-450: Prevent map controls to be displayed on top of modals.

## [8.x-3.0-beta3]

### Added

* Readspeaker to detail layout.

### Updated

* Applied styling to form-disclaimer.
* Add twig blocks to views with sidebar layout

### Fixed

* DTGB-725: Fixed warning when previewing newly created node with paragraphs.
* Added extra checks for field existence in call-to-action.
* Fix 404 error for `manifest.json` (it is renamed to `site.webmanifest`).
* Theming for status messages.
* Fixed JS error when popup feature isn't enabled in dg_maps.
* DTGB-730: Fixed fatal error when visiting page with closed webform.
* DTGB-732: Fixed scrolling bug on iOS for Openlayers popup.

### Removed

* Removed global_js from libraries.
* No minification for JS files is done. This should be handled by drupal
  from now on.

## [8.x-3.0-beta2]

### Added

* SGD8-546: Theming for webforms.
* SGD8-546: Theming for default drupal throbber.
* SGD8-926: Script that generates mobile version of tables.
* SGD8-1081: Hide empty facets.

### Updated

* DTGB-652: Maps theming on mobile devices.
* SGD8-828: Template suggestion for forms (they're now composed of
  "hook--form_id") instead of the element ID.
  > This should not be breaking since the element ID and form ID are identical
    in 99% of the cases.
* DTGB-723: Added new field to vesta template.

* SGD8-903: Added wrapper div around all paragraphs.
* Attributes in `block--system-branding-block.html.twig` are now more
  configurable.
* SGD8-239: Refactored call-to-action paragraph template.

### Fixed

* SGD8-1024: Spacing around links in status messages.
* SGD8-187: Fullscreen not displayed over entire viewport on detail pages.
* DTGB-719: Use download icon in call-to-action paragraph.
* SGD8-1049: Consistently print full url in call-to-action paragraphs.
* Form steps layout in multistep forms.
* Theming for help block in detail-layout.
* SGD8-1102: Added correct link to profile in dg-auth block.
* SGD8-629: Display checkbox popup over entire width of the page.
* SGD8-629: Bind checkbox_filter only once.
* SGD8-1102: Avatar for mijn-gent block.
* DTGB-722: Added missing translation configuration.
* DTGB-724: Fixed wrappers in mijn-gent menu.

## [8.x-3.0-beta1]

### Added

* DTGB-491: Added
  [`dg_maps`](https://github.com/digipolisgent/drupal_module_dg-maps) theming.

* Tabs/local tasks theming.
    > :warning: The tabs block should ideally be placed in the admin region.

### Removed

* DTGB-683: Frequently visited.
* DTGB-700:
  [Styleguide](https://github.com/StadGent/fractal_styleguide_gent-base) as a
  part of gent-base. It is integrated as an npm dependency now.

### Fixed

* DTGB-706: Fixed missing document link text when no file description is set.

## [8.x-3.0-alpha11]

### Added

* DTGB-649: Added theming for contact paragraph.
* DTGB-651: Added teaser theming for infopage.
* DTGB-651: Added theming for topic.
* DTGB-651: Added teaser theming for topic_link.
* DTGB-632: Added styling for opening hours widgets.
* DTGB-656: Added theming for frequently visited block.
* DTGB-632: Added styling for opening hours widgets.

### Updated

* DTGB-655: Updated copy in checkbox-popup facet widget.

### Removed

* DTGB-611: Removed some libraries from `gent_base.info.yml`. (They'll have to be attached to the template from now on).

## [8.x-3.0-alpha.10]

### Changed

* DTGB-540: Replaced typekit by google fonts.
* DTGB-539: Refactored page template to use footer sections.
* DTGB-539: Refactored timeline item wrappers to role listitem.
* DTBG-539: Refactored image-gallery template to also use labelledby.
* DTGB-563: Fixed detecting the current node to insert the hero image.
* DTGB-576: Merge footer regions into one general region

### Updated

* DTGB-517: Updated media--video templates.

## [8.x-3.0-alpha.7]

### Added

* DTGB-414: Implemented the quote molecule in gent_base.
* DTGB-415: Added styling for node preview form.
* DTGB-555: Added templates for alternative timeline display

### Removed

* DTGB-409: Removed region templates for footer and header.
  This enables better behat testing.
  A new design still has to be implemented, so for now they aren't used.

## 8.x-2.11

### Added

* DTGB-402: Added `form.html.twig` in the templates directory to add a
  required fields indicator at the top of every form.

### Changed

* DTGB-140: ** IMPORTANT: Merged the style guide in the gent_base theme.**
* DTGB-283: Updated the license file to GPLv2.
* DTGB-397: Changed the markup of `fieldset.html.twig` slightly so radio
  button labels and checkbox labels are printed correctly.
  Note that you might need template overriding when applying this update!
* DTGB-401: Updated links to new public gent_base repository.

### Fixed

* DTGB-276: Fixed a bug where the breadcrumb alignment was not correct.
  * **Some markup changes have been introduced so you might need some
    refactoring. We also added a new Drupal region "Breadcrumbs" so take
    a look at page.html.twig and gent_base.info.yml**
  * The breadcrumbs should now be drag and drop inside the new breadcrumbs
    region and should fully styled and function responsively.
* DTGB-396: Fixed admin check for admin region in gent_base.

## 8.x-1.1-alpha9

### Added

* DTGB-131: Added missing 00-settings/_vars.scss partial in starterkit.
* DTGB-137: Added basic styling for Drupal primary tabs.
* DTGB-130: display webform help text as field-description.

### Changed

* DTGB-135: Make style guide version fixed.

### Fixed

* DTGB-133: Fixed styling of messages.

### Updated

* DTGB-103: Updated the documentation for the $styleguide-dir variable.

## 8.x-1.1-alpha8

### Updated

* **Updated to gent_styleguide version 2.7.7**

## 8.x-1.1-alpha7

### Fixed

* DTGB-128: Added small fix for radio button groups and checkboxes optional
  labels.

## 8.x-1.1-alpha6

### Updated

* **Updated to gent_styleguide version 2.6.16**

## 8.x-1.1-alpha5

### Added

* DTGB-123: Implemented accessible hamburger-menu.

### Updated

* **Updated to gent_styleguide version 2.6.15**

## 8.x-1.1-alpha4

### Added

* DTGB-122: Added CHANGELOG.md to keep track of future changes.

### Changed

* DTGB-120: Changed grid structure of footer to reflect Gent Style Guide.

### Updated

* **Updated to gent_styleguide version 2.6.13**

[4.4.1]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.4.0...4.4.1
[4.4.0]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.12...4.4.0
[4.3.12]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.11...4.3.12
[4.3.11]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.10...4.3.11
[4.3.10]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.9...4.3.10
[4.3.9]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.8...4.3.9
[4.3.8]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.7...4.3.8
[4.3.7]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.6...4.3.7
[4.3.6]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.5...4.3.6
[4.3.5]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.4...4.3.5
[4.3.4]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.3...4.3.4
[4.3.3]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.2...4.3.3
[4.3.2]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.1...4.3.2
[4.3.1]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.3.0...4.3.1
[4.3.0]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.2.1...4.3.0
[4.2.1]: https://github.com/StadGent/drupal_theme_gent-base/compare/4.1.0...4.2.1
[4.1.0]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-4.0...8.x-4.1.0
[4.0]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.3...8.x-4.0
[8.x-3.0-beta17]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta16...8.x-3.0-beta17
[8.x-3.0-beta16]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta15...8.x-3.0-beta16
[8.x-3.0-beta15]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta14...8.x-3.0-beta15
[8.x-3.0-beta14]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta13...8.x-3.0-beta14
[8.x-3.0-beta13]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta12...8.x-3.0-beta13
[8.x-3.0-beta12]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta11...8.x-3.0-beta12
[8.x-3.0-beta11]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta10...8.x-3.0-beta11
[8.x-3.0-beta10]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta9...8.x-3.0-beta10
[8.x-3.0-beta9]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta8...8.x-3.0-beta9
[8.x-3.0-beta8]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta7...8.x-3.0-beta8
[8.x-3.0-beta7]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta6...8.x-3.0-beta7
[8.x-3.0-beta6]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta5...8.x-3.0-beta6
[8.x-3.0-beta5]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta4...8.x-3.0-beta5
[8.x-3.0-beta4]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta3...8.x-3.0-beta4
[8.x-3.0-beta3]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta2...8.x-3.0-beta3
[8.x-3.0-beta2]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-beta1...8.x-3.0-beta2
[8.x-3.0-beta1]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha11...8.x-3.0-beta1
[8.x-3.0-alpha11]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha.10...8.x-3.0-alpha11
[8.x-3.0-alpha.10]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha.7...8.x-3.0-alpha.10
[8.x-3.0-alpha.7]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha.6...8.x-3.0-alpha.7
[8.x-3.0-alpha.6]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha.5...8.x-3.0-alpha.6
[8.x-3.0-alpha.5]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha.4...8.x-3.0-alpha.5
[8.x-3.0-alpha.4]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha.3...8.x-3.0-alpha.4
[8.x-3.0-alpha.3]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha.2...8.x-3.0-alpha.3
[8.x-3.0-alpha.2]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.0-alpha.1...8.x-3.0-alpha.2
[8.x-3.0-alpha.1]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-2.10...8.x-3.0-alpha.1
[Unreleased]: https://github.com/StadGent/drupal_theme_gent-base/compare/8.x-3.x...8.x-3.x-dev
