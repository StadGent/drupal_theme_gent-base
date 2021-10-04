/**
 * @file
 * Filter component binding.
 */
(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.gentBaseLoadFilters = {
    attach: function (context, settings) {
      if (typeof Modal == "undefined") {
        return;
      }

      $('#filter', context).once('filter').each(function () {
        var self = this;
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
})(Drupal, jQuery);
