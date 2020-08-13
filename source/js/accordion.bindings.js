/**
 * @file
* Accordion component binding.
 */
(function (Drupal, $) {
  'use strict';

  Drupal.behaviors.gentBaseLoadAccordion = {
    attach: function (context, settings) {
      if (!Accordion) { // eslint-disable-line no-undef
        return;
      }

      $('.accordion').once('gent_base_accordion').each(function () {

        // Temp fix Mijn Gent block accordion.
        var headerAccordion = document.querySelector('header .accordion');

        if (headerAccordion !== this) {
          new Accordion(this); // eslint-disable-line no-undef
        }
        else {
          headerAccordion.addEventListener('click', function (e) {
            var headerAccordionButton = headerAccordion.querySelector('button.accordion--button');

            if (headerAccordionButton.getAttribute('init')) {
              return;
            }

            headerAccordionButton.setAttribute('init', true);
            new Accordion(headerAccordion); // eslint-disable-line no-undef
            TimeOut(headerAccordionButton);
          });
        }

        function TimeOut(headerAccordionButton) {
          setTimeout(function () { headerAccordionButton.click();}); // es-lint-disable-line max-nested-callbacks
        }
      });
    }
  };
})(Drupal, jQuery);
