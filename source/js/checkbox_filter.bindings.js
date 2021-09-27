/**
 * @file
 * Filter component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadCheckboxFilters = {
    attach: function (context, settings) {
      $('.checkbox-accordion', context).once('checkbox-accordion').each(function () {
        if (typeof Accordion == "undefined") {
          const selected = document.querySelectorAll('.checkbox-accordion'); /* eslint-env es6 */
          for (let i = selected.length; i--;) {
            new Accordion(selected[i]);
          }
        }
      });

      $('.checkbox-filter-dynamic', context).once('checkbox-filter-dynamic').each(function () {
        if (typeof CheckboxFilterDynamic == "undefined") {
          const selected = document.querySelectorAll('.checkbox-filter-dynamic'); /* eslint-env es6 */
          for (let i = selected.length; i--;) {
            new CheckboxFilterDynamic(selected[i], {
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
