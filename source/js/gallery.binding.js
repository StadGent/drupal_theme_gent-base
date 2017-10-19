/**
 * @file
 * Gallery component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadLightGallery = {
    attach: function (context, settings) {
      $('.gallery', context).once('.loadLightGallery').each(function () {
        $('.gallery').loadLightGallery();
      });
    }
  };
})(jQuery, Drupal);
