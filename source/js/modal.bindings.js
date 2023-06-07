/**
 * @file
 * Menu component binding.
 */
(function (Drupal, $, once) {
  'use strict';

  Drupal.behaviors.gentBaseLoadModal = {
    attach: function (context, settings) {
      if (typeof Modal == 'undefined') {
        return;
      }

      // Once //
      // Before: $('drupal-selector').once('once-id');
      // Now: once('once-id', 'drupal-selector');
      // Or with jQuery: $(once('once-id', 'drupal-selector'));

      /* global Modal */
      $(once('modal', '.modal:not(.has-custom-binding)', context)).each(function () {
      // $('.modal:not(.has-custom-binding)', context).once('modal').each(function () {
        new Modal(this);
      });
    }
  };
})(Drupal, jQuery, once);
