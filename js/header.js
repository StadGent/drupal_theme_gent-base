/**
 * @file
 * Contains brand javascript.
 */
(function ($) {

  Drupal.gentBase = Drupal.gentBase || {};

  /**
   * Calculates and sets the width left over for the brand container.
   */
  Drupal.gentBase.brandAutosize = function (context) {
    var $holder = $('nav.holder', context);

    if ($holder.length) {
      var $brand = $('.brand', $holder);
      var $container = $('.l-row', $holder);
      var $top_menu = $('.top-menu', $holder);

      // Make sure all elements exist. If one is missing, we skip calculation.
      if ($brand.length && $container.length && $top_menu.length) {
        $brand.width($container.width() - $top_menu.outerWidth() - 1);
      }
    }
  };

  /**
   * Behavior for attaching javascript on header components.
   */
  Drupal.behaviors.gentBaseHeader = {
    attach: function (context) {
      $('body', context).once('gent-base-header', function () {
        Drupal.gentBase.brandAutosize(context);
      });
    }
  };

  $(window).resize($.debounce(500, false, function () {
    Drupal.gentBase.brandAutosize(this.document);
  }));

}(jQuery));
