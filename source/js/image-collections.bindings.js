/**
 * @file
 * Gallery component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadImageCollections = {
    attach: function (context, settings) {

      if (typeof baguetteBox == "undefined") {
        return;
      }

      baguetteBox.run('.js-lightbox', {
        filter: /.*/i,
        async: true,
        captions: function (element) {
          var figcaption = element.querySelector('figcaption');
          return figcaption ? figcaption.innerText : null;
        },
        buttons: true
      });

    }
  };
})(Drupal);
