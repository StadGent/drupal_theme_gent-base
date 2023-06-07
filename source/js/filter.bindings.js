/**
 * @file
 * Filter component binding.
 */
(function (Drupal, $, once) {
  'use strict';

  Drupal.behaviors.gentBaseLoadFilters = {
    attach: function (context, settings) {
      if (typeof Modal == 'undefined') {
        return;
      }

      // Once //
      // Before: $('drupal-selector').once('once-id');
      // Now: once('once-id', 'drupal-selector');

      $(once('filter', '#filter', context)).each(function () {
      // $('#filter', context).once('filter').each(function () {
        var self = this;
        /* global Modal */
        new Modal(this, {
          // The modal is always visible from tablet and up,
          // this is atypical.
          resizeEvent: function (open, close) {
            if (window.innerWidth > 960) {
              close();
              self.setAttribute('aria-hidden', 'false');
            }
            else if (!self.classList.contains('visible')) {
              self.setAttribute('aria-hidden', 'true');
            }
          }
        });
      });
    }
  };
})(Drupal, jQuery, once);
