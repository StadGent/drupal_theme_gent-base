/**
 * @file
 * Accordion component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseBreadcrumbs = {
    attach: function (context, settings) {
      if (!Breadcrumbs) { // eslint-disable-line no-undef
        return;
      }

      var selected = document.querySelectorAll('.breadcrumb');
      for (var i = selected.length; i--;) {
        new Breadcrumbs(selected[i]); // eslint-disable-line no-undef
      }

    }
  };
})(Drupal);
