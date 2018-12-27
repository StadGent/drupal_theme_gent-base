/**
 * @file
 * Checkbox-with-filter functionality
 */

(function ($) {

  'use strict';

  Drupal.facets = Drupal.facets || {};

  Drupal.behaviors.GentBaseLoadFilterFragments = {
    attach: function (context, settings) {
      var filterModal = document.querySelectorAll('.facet-item a');

      for (var i = filterModal.length; i--;) {
        this.addUrlSuffix(filterModal[i]);
      }
    },

    /**
     * Add suffix to links inside modals to re-open them when the page reloads
     * @param {Node} link
     *  HTML Node that represents a facet item
     */
    addUrlSuffix: function (link) {
      var modal = link.closest('.modal');

      if (!modal) {
        return;
      }

      var href = link.href.split('#')[0]; // Strip hash if there was one already
      href += '#' + modal.id;
      link.href = href;
    }
  };

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
    }
  };
})(jQuery);
