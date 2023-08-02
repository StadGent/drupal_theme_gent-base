/**
 * @file
* Accordion component binding.
 */
(function (Drupal, $, once) {
  'use strict';

  Drupal.behaviors.gentBaseLoadAccordion = {
    attach: function (context, settings) {
      /* global Accordion */
      if (typeof Accordion == 'undefined') {
        return;
      }

      $(once('gent_base_accordion', '.accordion')).each(function () {

        // Temp fix Mijn Gent block accordion.
        var headerAccordion = document.querySelector('header .accordion');

        if (headerAccordion !== this) {
          new Accordion(this);
        }
        else {
          headerAccordion.addEventListener('click', function (e) {
            var headerAccordionButton = headerAccordion.querySelector('button.accordion--button');

            if (headerAccordionButton.getAttribute('init')) {
              return;
            }

            headerAccordionButton.setAttribute('init', true);
            new Accordion(headerAccordion);
            TimeOut(headerAccordionButton);
          });
        }

        function TimeOut(headerAccordionButton) {
          setTimeout(function () { headerAccordionButton.click();}); // es-lint-disable-line max-nested-callbacks
        }
      });
    }
  };
})(Drupal, jQuery, once);
