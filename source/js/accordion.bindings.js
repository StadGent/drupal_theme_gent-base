/**
 * @file
* Accordion component binding.
 */
(function (Drupal) {
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

      // Temp fix Mijn Gent block accordion.
      var headerAccordion = document.querySelector('header .accordion');
      if (!headerAccordion) {
        return;
      }
      headerAccordion.addEventListener('click', function (e) {
        new Accordion(e.currentTarget); // eslint-disable-line no-undef
        e.currentTarget.querySelector('button.accordion--button').click();
      });

    }
  };
})(Drupal);

