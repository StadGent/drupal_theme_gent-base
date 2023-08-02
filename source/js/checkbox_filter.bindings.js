/**
 * @file
 * Filter component binding.
 */
(function ($, Drupal, once) {
  'use strict';

  Drupal.behaviors.gentBaseLoadCheckboxFilters = {
    attach: function (context, settings) {
      if (!CheckboxFilter) { // eslint-disable-line no-undef
        return;
      }

      $(once('checkbox-filter', '.checkbox-filter', context)).each(function () {
        new CheckboxFilter(this, { // eslint-disable-line no-undef
          checkboxes: '.facet-item.checkbox',
          hiddenTagText: 'Remove tag',
          countSpan: '.checkbox-filter__count-wrapper em',
          resultSpan: '.checkbox-filter__result-wrapper em',
          onRemoveTag: function (checkbox) {
            checkbox.click('change.facets');
          }
        });
      });
    }
  };
})(jQuery, Drupal, once);
