/**
 * @file
 * Gallery component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadLightGallery = {
    attach: function (context, settings) {
      $(window).on('load', function (e) {
        $('.header-search-mobile').loadMobileHeader();
        $('header.header .content-container').displaySiteName();
      });

      $(window).on('resize', function (e) {
        $('header.header .content-container').displaySiteName();
      });
    }
  };
})(jQuery, Drupal);
