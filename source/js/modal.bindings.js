/**
 * @file
 * Menu component binding.
 */
(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.gentBaseLoadModal = {
    attach: function (context, settings) {
      if (!Modal) { // eslint-disable-line no-undef
        return;
      }

      $('.modal:not(.has-custom-binding)', context).once('modal').each(function () {
        new Modal(this); // eslint-disable-line no-undef
      });
    }
  };
})(Drupal, jQuery);
