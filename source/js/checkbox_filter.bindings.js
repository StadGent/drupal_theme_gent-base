/**
 * @file
 * Filter component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadCheckboxFilters = {
    attach: function (context, settings) {
      if (!CheckboxFilter) { // eslint-disable-line no-undef
        return;
      }

      var selected = document.querySelectorAll('.checkbox-filter');
      for (var i = selected.length; i--;) {
        new CheckboxFilter(selected[i], { // eslint-disable-line no-undef
          checkboxes: '.facet-item.checkbox',
          hiddenTagText: 'Remove tag',
          countSpan: '.checkbox-filter__count-wrapper em',
          onRemoveTag: function (checkbox) {
            jQuery(checkbox).trigger('change.facets');
          }
        });
      }
    }
  };
})(Drupal);
