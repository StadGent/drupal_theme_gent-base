/**
 * @file
 * Mobile navigation hamburger binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseHeader = {
    attach: function (context, settings) {
      $('.hamburger-menu', context).once('.hamburger-menu').each(function () {
        $('.hamburger-menu').loadHamburgerMenu();
      });
    }
  };
})(jQuery, Drupal);
