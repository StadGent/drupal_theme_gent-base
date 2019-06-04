/**
 * @file
 * Filter component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadCheckboxFilters = {
    attach: function (context, settings) {
      if (!CheckboxFilter) { // eslint-disable-line no-undef
        return;
      }

      $('.checkbox-filter', context).once('checkbox-filter').each(function () {
        new CheckboxFilter(this, { // eslint-disable-line no-undef
          checkboxes: '.facet-item.checkbox',
          hiddenTagText: 'Remove tag',
          countSpan: '.checkbox-filter__count-wrapper em',
          resultSpan: '.checkbox-filter__result-wrapper em',
          onRemoveTag: function (checkbox) {
            $(checkbox).trigger('change.facets');
          }
        });
      });
    }
  };
})(jQuery, Drupal);
