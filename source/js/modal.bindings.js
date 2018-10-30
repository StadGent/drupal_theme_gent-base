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

      var selected = document.querySelectorAll('.modal:not(.has-custom-binding)');
      for (var i = selected.length; i--;) {
        new Modal(selected[i]); // eslint-disable-line no-undef
      }
    }
  };
})(Drupal);
