/**
 * @file
 * Menu component binding.
 */

/* global once */
'use strict';

(function (Drupal, $, once) {
  Drupal.behaviors.gentBaseLoadModal = {
    attach: function (context, settings) {
      if (typeof Modal == 'undefined') {
        return;
      }

      /* global Modal */
      $(once('modal', '.modal:not(.has-custom-binding)', context)).each(function () {
        new Modal(this);
      });
    }
  };
})(Drupal, jQuery, once);
