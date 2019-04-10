/**
 * @file
* Table component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadMenu = {
    attach: function (context, settings) {

      console.log('test'); // eslint-disable-line no-console
      var selected = document.querySelectorAll('.responsive-table table');
      for (var i = selected.length; i--;) {
        new MobileTable(selected[i]); // eslint-disable-line no-undef
      }
    }
  };
})(Drupal);
