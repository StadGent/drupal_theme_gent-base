/**
 * @file
* Menu component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadMenu = {
    attach: function (context, settings) {
      if (!Menu) { // eslint-disable-line no-undef
        return;
      }

      var selected = document.querySelectorAll('nav.menu');
      for (var i = selected.length; i--;) {
        new Menu(selected[i]); // eslint-disable-line no-undef
      }
    }
  };
})(Drupal);
