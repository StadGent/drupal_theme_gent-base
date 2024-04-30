/**
 * @file
 * Menu component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadMenu = {
    attach: function (context, settings) {
      if (typeof Modal == 'undefined') {
        return;
      }

      once('gent-base-menu', '.modal.menu', context).forEach(function (menu) {
        // eslint-disable-next-line no-undef
        new Modal(menu, {
          // The menu is always visible from tablet and up,
          // this is atypical.
          resizeEvent: function (open, close) {
            if (window.innerWidth > 960) {
              close();
              menu.setAttribute('aria-hidden', 'false');
              return;
            }

            if (!menu.classList.contains('visible')) {
              menu.setAttribute('aria-hidden', 'true');
            }
          }
        });
      });
    }
  };
})(Drupal, once);
