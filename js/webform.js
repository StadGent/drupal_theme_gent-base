/**
 * @file
 * Contains webform-specific JS code.
 *
 * Note: This file was refactored from theme.js as best as possibe. It still
 * contains some funky stuff, I am in no way responsible for it.
 *
 * This file should only be loaded when the webform module is installed.
 */

(function ($) {

  /**
   * Make sure we have the Gent Base root namespace.
   */
  Drupal.gentBase = Drupal.gentBase || {};

  /**
   * Callback function that sets the webform descriptions' width to the maximum
   * available.
   */
  Drupal.gentBase.setWebformDescription = function () {
    var $webformRight = $('.webform-right', this);
    var webformRightWidth = $webformRight.width();
    var descriptionWidth = webformRightWidth * 0.75;

    if (Drupal.gentBase.isDesktop()) {
      $('.description', $webformRight).width(descriptionWidth);
      $('.webform-component', $webformRight).each(function () {
        var $component = $(this);
        var webformDescriptionHeight = $component.find('.description').height();
        var labelHeight = $component.find('label').outerHeight();
        var webformComponentHeight =  webformDescriptionHeight + labelHeight;
        $component.css('min-height', webformComponentHeight);
      });
    }
    else {
      $('.description', $webformRight).width('auto');
      $('.webform-component', $webformRight).css('min-height', 'auto');
    }
  };

  /**
   * Callback function that sets the webform progressbar sticky.
   */
  Drupal.gentBase.setWebformProgressbarStickyWidth = function () {
    var $webformLeft = $('.webform-left', this);
    var webformLeftWidth = $webformLeft.width();

    if (Drupal.gentBase.isDesktop()) {
      $('.sticky-nav', $webformLeft).width(webformLeftWidth);

      // Disable the stickiness.
      $('.sticky-nav', $webformLeft).once('sticky-nav').sticky({topSpacing: 20});
    }
    else {
      $('.sticky-nav', $webformLeft).width('auto');
      $('.sticky-wrapper', $webformLeft).height('auto');

      // Re-enable the stickiness.
      $('.sticky-nav', $webformLeft).removeClass('sticky-nav-processed').unstick();
    }
  };

  /**
   * Callback function that positions the webform sticky nav.
   */
  Drupal.gentBase.setWebformStickyBottom = function () {
    if (!Drupal.gentBase.isDesktop()) {
      return;
    }
    var $webform = $(this);
    var $sticky_nav = $('.sticky-nav', $webform);
    if ($sticky_nav.length) {
      var $progress_bar = $('.webform-component-progressbar-pages', $webform);
      var $document = $(document);
      var bottom_sticky_to_bottom_screen = $document.height() - $progress_bar.offset().top - $progress_bar.height();
      var bottom_webform_to_bottom_screen = $document.height() - $webform.offset().top - $webform.height();
      if (bottom_sticky_to_bottom_screen <=  bottom_webform_to_bottom_screen) {
        $sticky_nav.css('bottom', bottom_webform_to_bottom_screen);
        $sticky_nav.css('top', 'auto');
      }
    }
  };

  /**
   * Drupal behavior that does webform specific actions.
   */
  Drupal.behaviors.initWebform = {
    attach: function (context) {
      var $webform = $('.webform-client-form', context);
      $webform.once('webform-description', Drupal.gentBase.setWebformDescription);
      $webform.once('webform-sticky-progressbar', Drupal.gentBase.setWebformProgressbarStickyWidth);
      $webform.once('webform-sticky-bottom', Drupal.gentBase.setWebformStickyBottom);
    }
  };

  /**
   * Does the webform stuff on resize.
   */
  $(window).resize(function () {
    $('.webform-client-form').each(function () {
      var $webform = $(this);
      Drupal.gentBase.setWebformDescription.call($webform);
      Drupal.gentBase.setWebformProgressbarStickyWidth.call($webform);
      Drupal.gentBase.setWebformStickyBottom.call($webform);
    });
  });

  /**
   * Does the webform positioning on scroll.
   */
  $(window).scroll(function () {
    $('.webform-client-form').each(function () {
      Drupal.gentBase.setWebformStickyBottom.call($(this));
    });
  });

}(jQuery));
