/**
 * @file
 * Accordion component binding.
 */
(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.gentBaseBreadcrumbs = {
    attach: function (context, settings) {
      if (typeof Breadcrumbs == "undefined") {
        return;
      }

      $('.breadcrumb').once('gent_base_breadcrumb').each(function () {
        new Breadcrumbs(this);
      });
    }
  };
})(Drupal, jQuery);
