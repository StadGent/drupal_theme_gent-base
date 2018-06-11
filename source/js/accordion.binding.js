/**
 * @file
* Accordion component binding.
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadAccordion = {
    attach: function (context, settings) {
      if (!Accordion) { // eslint-disable-line no-undef
        return;
      }

      var selected = document.querySelectorAll('.accordion');
      for (var i = selected.length; i--;) {
        new Accordion(selected[i]); // eslint-disable-line no-undef
      }
    }
  };
})(jQuery, Drupal);

