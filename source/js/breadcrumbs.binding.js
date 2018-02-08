/**
 * @file
 * Gallery component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadLightGallery = {
    attach: function (context, settings) {
      this.gentStyleGuideBreadcrumb.updateMobileBreadcrumb();
    }
  };
})(jQuery, Drupal);
