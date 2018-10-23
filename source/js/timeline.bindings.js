/**
 * @file
 * Menu component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadMenu = {
    attach: function (context, settings) {
      if (!Modal) { // eslint-disable-line no-undef
        return;
      }

      var selected = document.querySelectorAll('.programme-detail');
      for (var i = selected.length; i--;) {
        new Modal(selected[i], { // eslint-disable-line no-undef
          changeHash: true
        });
      }
    }
  };
})(Drupal);
