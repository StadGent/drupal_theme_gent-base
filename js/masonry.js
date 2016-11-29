/**
 * @file
 * Set up masonry for Gent base.
 */

(function ($) {

  /**
   * Make sure we have the Gent Base root namespace.
   */
  Drupal.gentBase = Drupal.gentBase || {};

  /**
   * Drupal behavior that applies masonry.
   *
   * Masonry will be applied to grid using the multi-column-items class.
   * Individual items need to use the island class.
   */
  Drupal.behaviors.initMasonry = {
    attach: function (context) {
      $('.multi-column-items', context).once('masonry', Drupal.gentBase.masonry);
    }
  };

  /**
   * Callback function that applies masonry on the object.
   */
  Drupal.gentBase.masonry = function () {
    if (typeof $.fn.masonry !== 'undefined') {
      var that = this;

      $(this).masonry({
        itemSelector: 'article',
        columnWidth: '.island',
        isAnimated: true,
        gutter: '.gutter'
      });

      $(this).imagesLoaded(function () {
        $(that).masonry();
      });
    }
  };

  /**
   * Listener for the views_load_more new_content event.
   *
   * After a views load more has been executed, we need to reload masonry.
   */
  $(window).bind('views_load_more.new_content', function () {
    $('.multi-column-items').each(function () {
      var that  = $(this);
      $(this).imagesLoaded(function () {
        // Anything new will not be positioned by masonry and still have
        // a relative position.
        var $new_items = $('.island:not(:absolute)');
        // Let masonry know about the items and re-tile the layout
        $(that).masonry('appended', $new_items).masonry('layout');
      });
    });
  });

})(jQuery);
