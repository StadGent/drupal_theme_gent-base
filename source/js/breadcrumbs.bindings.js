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

      $(once('gent_base_breadcrumb', '.breadcrumb')).each(function () {
        new Breadcrumbs(this);
      });
    }
  };
})(Drupal, jQuery, once);
