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

      // Once //
      // Before: $('drupal-selector').once('once-id');
      // Now: once('once-id', 'drupal-selector');
      // Or with jQuery: $(once('once-id', 'drupal-selector'));

      $(once('checkbox-filter', '.checkbox-filter', context)).each(function () {
      // $('.checkbox-filter', context).once('checkbox-filter').each(function () {
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
