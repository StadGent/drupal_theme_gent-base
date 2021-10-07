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

      var menu = document.querySelectorAll('.modal.menu');

      var createModal = function (modal) {
        /* global Modal */
        new Modal(modal, {
          // The modal is always visible from tablet and up,
          // this is atypical.
          resizeEvent: function (open, close) {
            if (window.innerWidth > 960) {
              close();
              modal.setAttribute('aria-hidden', 'false');
            }
            else {
              if (!modal.classList.contains('visible')) {
                modal.setAttribute('aria-hidden', 'true');
              }
            }
          }
        });
      };

      for (var i = menu.length; i--;) {
        createModal(menu[i]);
      }
    }
  };
})(Drupal);
