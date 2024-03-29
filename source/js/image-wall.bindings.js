/**
 * @file
 * Javascript binding of Masonry.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadImageWall = {
    attach: function (context, settings) {

      (function () {

        if (typeof Masonry == 'undefined' || typeof imagesLoaded == 'undefined') {
          return;
        }

        var grid = document.querySelector('.image-wall');

        /* global Masonry */
        var msnry = new Masonry(grid, {
          columnWidth: 'li:not(.hidden)',
          itemSelector: 'li',
          transitionDuration: 0,
          gutter: 24
        });

        /* global imagesLoaded */
        imagesLoaded(grid).on('progress', function () {
          msnry.layout();
        });

      })();

    }
  };
})(Drupal);
