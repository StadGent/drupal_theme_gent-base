/**
 * @file
 * Gallery component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadBreadcrumbs = {
    attach: function (context, settings) {
      $(window).on('load', function (e) {
        this.gentStyleGuideBreadcrumb.updateMobileBreadcrumb();
      });
    }
  };
})(jQuery, Drupal);
