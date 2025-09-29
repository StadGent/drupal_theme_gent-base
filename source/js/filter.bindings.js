/**
 * @file
 * Filter component binding.
 */

/* global once */
'use strict';

(function (Drupal, $, once) {
  Drupal.behaviors.gentBaseLoadFilters = {
    attach: function (context, settings) {
      if (typeof Modal == 'undefined') {
        return;
      }

      $(once('filter', '#filter', context)).each(function () {
        var self = this;
        // Decide changeHash value based on screen size.
        var useHash = window.innerWidth <= 960;
        /* global Modal */
        new Modal(this, {
          // Prevents modals breaking (visible full screen) when being closed.
          changeHash: useHash,
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
