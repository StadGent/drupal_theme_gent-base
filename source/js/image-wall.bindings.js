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

        const grid = document.querySelector('.image-wall');

        const msnry = new Masonry(grid, { // eslint-disable-line no-undef
          columnWidth: 'li',
          itemSelector: 'li',
          transitionDuration: 0,
          gutter: 24
        });

        imagesLoaded(grid).on('progress', () => { // eslint-disable-line no-undef
          msnry.layout();
        });

      })();

    }
  };
})(Drupal);
