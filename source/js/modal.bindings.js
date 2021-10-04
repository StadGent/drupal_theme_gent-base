/**
 * @file
 * Menu component binding.
 */
(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.gentBaseLoadModal = {
    attach: function (context, settings) {
      if (typeof Modal == "undefined") {
        return;
      }

      $('.modal:not(.has-custom-binding)', context).once('modal').each(function () {
        new Modal(this);
      });
    }
  };
})(Drupal, jQuery);
