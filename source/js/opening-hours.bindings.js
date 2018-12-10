/**
 * @file
 * Menu component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadOpeningHours = {
    attach: function (context, settings) {
      this.determineAccordionVisibility();
    },

    /**
     * Determine whether or not the accordion should be expanded on page load
     */
    determineAccordionVisibility: function () {
      var selected = document.querySelectorAll('.opening-hours-accordion');
      [].slice.call(selected).forEach(function (accordion) {
        var items = accordion.querySelectorAll('.opening-hours-accordion__item');
        if (items.length === 1) {
          var widget = accordion.querySelector('.openinghours-widget:last-of-type');
          var eventHandler = function (ev) {
            items[0].querySelector('.accordion--button').click();
            widget.removeEventListener('change', eventHandler);
          };

          widget.addEventListener('change', eventHandler);
        }
      });
    }
  };
})(Drupal);
