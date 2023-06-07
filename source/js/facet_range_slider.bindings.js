/**
 * @file
 * Accordion component binding.
 */
(function ($, Drupal, once) {
  'use strict';

  /**
   * Override facet slider behavior
   */
  Drupal.behaviors.facet_slider = {
    attach: function (context, settings) {
      if (typeof settings.facets !== 'undefined' && typeof settings.facets.sliders !== 'undefined') {
        var self = this;

        $.each(settings.facets.sliders, function (facet, settings) {
          self.addUrlFragment(facet, settings);
          Drupal.facets.addSlider(facet, settings);
        });

        this.updateCopy();
      }
    },

    /**
     * Add suffix to links inside modals to re-open them when the page reloads
     *
     * @param {string} facet
     *  Id of the facet that should be altered.
     * @param {object} settings
     *  Settings object that contains the URL that should be altered.
     */
    addUrlFragment: function (facet, settings) {
      settings = settings || {};
      if (!settings.url) {
        return;
      }

      var $facet = document.querySelector('[id^="' + facet + '"][id$="' + facet + '"]');
      var $modal = $facet.closest('.modal');

      if (!$modal) {
        return;
      }

      settings.url = settings.url.split('#')[0]; // Strip hash if there was one already
      settings.url += '#' + $modal.id;
    },

    /**
     * Update copy dynamically when the user changes the value of the slider.
     */
    updateCopy: function () {
      var facetsRangeSlider = document.querySelectorAll('.facets-widget-range_slider');
      var minPips = $(facetsRangeSlider).find('.pips-preview .placeholder:first-of-type');
      var maxPips = $(facetsRangeSlider).find('.pips-preview .placeholder:last-of-type');
      var slider = $(facetsRangeSlider).find('.facet-slider');

      if (facetsRangeSlider.length > 0) {
        for (var i = 0; i < facetsRangeSlider.length; i++) {
          minPips[i].textContent = $(slider[i]).slider('values', 0);
          maxPips[i].textContent = $(slider[i]).slider('values', 1);
        }
      }

      // Once //
      // Before: $('drupal-selector').once('once-id');
      // Now: once('once-id', 'drupal-selector');
      // Or with jQuery: $(once('once-id', 'drupal-selector'));

      // TODO: make vanilla JS version of function with:
      // once(slider).each(function () {
      $(once(slider)).each(function () {
      // $(slider).once().each(function () {
        $(this).on('slide', function (event, ui) {
          $(this).parents('.facets-widget-range_slider').find('.pips-preview .placeholder:first-of-type')[0].textContent = ui.values[0];
          $(this).parents('.facets-widget-range_slider').find('.pips-preview .placeholder:last-of-type')[0].textContent = ui.values[1];
        });
      });
    }
  };

})(jQuery, Drupal, once);
