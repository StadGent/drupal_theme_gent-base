/**
 * @file
 * Menu component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadOpeningHours = {
    attach: function (context, settings) {
      this.determineAccordionVisibility();
      this.resizeOnTabChange();
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
    },

    /**
     * Fix for dynamic tab content:
     * when content of the opening-hours-accordion content changes, the height of the accordion/tabs might change,
     * so a resize needs to be triggered in order to display all content properly
     */
    resizeOnTabChange: function () {
      var widgets = document.querySelectorAll('.opening-hours-accordion .openinghours-widget');

      for (var i = widgets.length; i--;) {
        widgets[i].addEventListener('change', function (e) {
          var evt = window.document.createEvent('UIEvents');
          evt.initUIEvent('resize', true, false, window, 0);
          window.dispatchEvent(evt);
        });
      }
    }
  };
})(Drupal);
