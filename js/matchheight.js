/**
 * @file
 * Set up matchHeight for Gent base.
 */

(function ($) {

  /**
   * Drupal behavior that applies matchHeight.
   */
  Drupal.behaviors.matchHeight = {
    attach: function (context) {
      if (typeof $.fn.masonry !== 'undefined') {
        $('.js-height', context).matchHeight();
        $('.js-equal', context).matchHeight(false);
      }
    }
  };

  /**
   * Resize event.
   *
   * Note that we're calling this debounced. We can assume it only needs to be
   * fired every 500ms.
   */
  $(window).resize($.debounce(500, false, function () {
    if (typeof $.fn.matchHeight !== 'undefined') {
      $('.js-height').matchHeight();
      $('.js-equal').matchHeight(false);
    }
  }));

})(jQuery);
