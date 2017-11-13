/**
 * @file
 * Chosen multiselect component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadChosen = {
    attach: function (context, settings) {
      $('.chosen-select', context).once('.loadChosen').each(function () {
        var isIpad = navigator.userAgent.match(/iPad/i) != null;

        if (isIpad === false) {
          $('.chosen-select').loadChosenSelect();
        }
      });
    }
  };
})(jQuery, Drupal);
