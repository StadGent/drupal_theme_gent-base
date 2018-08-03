/**
 * @file
 * Javascript binding of Masonry.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadImageWall = {
    attach: function (context, settings) {

      (function () {

        if (!Masonry || !imagesLoaded) { // eslint-disable-line no-undef
          return;
        }

        var grid = document.querySelector('.image-wall');

        var msnry = new Masonry(grid, { // eslint-disable-line no-undef
          columnWidth: 'li',
          itemSelector: 'li',
          transitionDuration: 0,
          gutter: 24
        });

        imagesLoaded(grid).on('progress', function () { // eslint-disable-line no-undef
          msnry.layout();
        });

      })();

    }
  };
})(Drupal);
