/**
 * @file
 * Masonry component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadMasonry = {
    attach: function (context, settings) {
      $('.js-masonry-layout', context).once('.js-masonry-layout').each(function () {
        $('.js-masonry-layout').masonry({
          itemSelector: 'li',
          columnWidth: 'li',
          percentPosition: true
        });
      });
    }
  };
})(jQuery, Drupal);
