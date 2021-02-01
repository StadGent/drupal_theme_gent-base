/**
 * @file
 * Accordion component binding.
 */
(function ($, Drupal) {
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
      var minPips = document.querySelector('.pips-preview .placeholder:first-of-type');
      var maxPips = document.querySelector('.pips-preview .placeholder:last-of-type');
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
