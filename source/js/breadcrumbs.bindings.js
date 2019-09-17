/**
 * @file
 * Accordion component binding.
 */
(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.gentBaseBreadcrumbs = {
    attach: function (context, settings) {
      if (!Breadcrumbs) { // eslint-disable-line no-undef
        return;
      }

      $('.breadcrumb').once('gent_base_breadcrumb').each(function () {
        new Breadcrumbs(this); // eslint-disable-line no-undef
      });
    }
  };
})(Drupal, jQuery);
