/**
 * @file
 * Filter component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadCheckboxFilters = {
    attach: function (context, settings) {
      $('.checkbox-accordion', context).once('checkbox-accordion').each(function () {
        if (Accordion) { // eslint-disable-line no-undef
          const selected = document.querySelectorAll('.checkbox-accordion');
          for (let i = selected.length; i--;) {
            new Accordion(selected[i]); // eslint-disable-line no-undef
          }
        }
      });

      $('.checkbox-filter-dynamic', context).once('checkbox-filter-dynamic').each(function () {
        if (CheckboxFilterDynamic) { // eslint-disable-line no-undef
          const selected = document.querySelectorAll('.checkbox-filter-dynamic');
          for (let i = selected.length; i--;) {
            new CheckboxFilterDynamic(selected[i], { // eslint-disable-line no-undef
              checkboxes: '.facet-item.checkbox',
              hiddenTagText: 'Remove tag',
              resultSpan: '.checkbox-filter__result-wrapper em',
              countSpan: '.checkbox-filter__count-wrapper em',
              onRemoveTag: function (checkbox) {
                $(checkbox).trigger('change.facets');
              }
            });
          }
        }
      });
    }
  };
})(jQuery, Drupal);
