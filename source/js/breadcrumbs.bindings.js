/**
 * @file
 * Accordion component binding.
 */
(function (Drupal, $, once) {
  'use strict';

  Drupal.behaviors.gentBaseBreadcrumbs = {
    attach: function (context, settings) {
      /* global Breadcrumbs */
      if (typeof Breadcrumbs == 'undefined') {
        return;
      }

      // Once //
      // Before: $('drupal-selector').once('once-id');
      // Now: once('once-id', 'drupal-selector');

      $(once('gent_base_breadcrumb', '.breadcrumb')).each(function () {
      // $('.breadcrumb').once('gent_base_breadcrumb').each(function () {
        new Breadcrumbs(this);
      });
    }
  };
})(Drupal, jQuery, once);
