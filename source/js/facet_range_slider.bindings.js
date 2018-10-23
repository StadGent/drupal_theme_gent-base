/**
 * @file
 * Accordion component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseAlterFacetRangeSliders = {
    attach: function (context, settings) {
      var minPips = document.querySelector('.pips-preview-min');
      var maxPips = document.querySelector('.pips-preview-max');
      var slider = document.querySelector('.facet-slider');

      minPips.innerHTML = $(slider).slider('values', 0);
      maxPips.innerHTML = $(slider).slider('values', 1);

      $(slider).on('slide', function (event, ui) {
        minPips.innerHTML = ui.values[0];
        maxPips.innerHTML = ui.values[1];
      });
    }
  };
})(jQuery, Drupal);

