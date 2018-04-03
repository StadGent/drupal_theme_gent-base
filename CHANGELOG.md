# Changelog
All Notable changes to `digipolisgent/drupal_theme_gent-base`.


## gent_base-8.x-3.0

* DTGB-409: Removed region templates for footer and header.

  > This enables better behat testing.
  > A new design still has to be implemented, so for now they aren't used.

* DTGB-415: Added styling for node preview form.

## gent_base-8.x-2.11

* DTGB-140: ** IMPORTANT: Merged the style guide in the gent_base theme.**
* DTGB-276: Fixed a bug where the breadcrumb alignment was not correct.

  > **Some markup changes have been introduced so you might need some
    refactoring. We also added a new Drupal region "Breadcrumbs" so take
    a look at page.html.twig and gent_base.info.yml**

  > The breadcrumbs should now be drag and drop inside the new breadcrumbs
    region and should fully styled and function responsively.

* DTGB-283: Updated the license file to GPLv2.

* DTGB-396: Fixed admin check for admin region in gent_base.
* DTGB-397: Changed the markup of `fieldset.html.twig` slightly so radio
  button labels and checkbox labels are printed correctly.

  > Note that you might need template overriding when applying this update!
* DTGB-401: Updated links to new public gent_base repository.
* DTGB-402: Added `form.html.twig` in the templates directory to add a
  required fields indicator at the top of every form.


## gent_base-8.x-1.1-alpha9

* DTGB-133: Fixed styling of messages.
* DTGB-135: Make style guide version fixed.
* DTGB-103: Updated the documentation for the $styleguide-dir variable.
* DTGB-131: Added missing 00-settings/_vars.scss partial in starterkit.
* DTGB-137: Added basic styling for Drupal primary tabs.
* DTGB-130: display webform help text as field-description.

## gent_base-8.x-1.1-alpha8
**Updated to gent_styleguide version 2.7.7**

## gent_base-8.x-1.1-alpha7
* DTGB-128: Added small fix for radio button groups and checkboxes optional labels.

## gent_base-8.x-1.1-alpha6
**Updated to gent_styleguide version 2.6.16**

## gent_base-8.x-1.1-alpha5
**Updated to gent_styleguide version 2.6.15**

* DTGB-123: Implemented accessible hamburger-menu.

## gent_base-8.x-1.1-alpha4
**Updated to gent_styleguide version 2.6.13**

* DTGB-120: Changed grid structure of footer to reflect Gent Style Guide.
* DTGB-122: Added CHANGELOG.md to keep track of future changes.

