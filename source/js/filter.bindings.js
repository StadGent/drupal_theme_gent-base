/**
 * @file
 * Filter component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadFilters = {
    attach: function (context, settings) {
      if (!Modal) { // eslint-disable-line no-undef
        return;
      }

      var filter = document.querySelector('#filter');
      // eslint-disable-next-line no-undef
      new Modal(filter, {
        // The modal is always visible from tablet and up,
        // this is atypical.
        resizeEvent: function resizeEvent() {
          if (window.innerWidth > 768) {
            filter.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = '';
          }
          else {
            filter.setAttribute('aria-hidden', 'true');
          }
        }
      });
    }
  };
})(Drupal);
