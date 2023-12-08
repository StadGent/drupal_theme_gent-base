/**
 * @file
 * Checkbox-with-filter functionality
 */

(function (Drupal, $) {

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

})(Drupal, jQuery);
