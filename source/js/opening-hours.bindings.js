/**
 * @file
 * Menu component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadOpeningHours = {
    attach: function (context, settings) {
      if (!OpeningHoursMonthWidget) { // eslint-disable-line no-undef
        return;
      }

      var selected = document.querySelectorAll('.openinghours-widget[data-type="month"]');
      for (var i = selected.length; i--;) {
        new OpeningHoursMonthWidget(selected[i]); // eslint-disable-line no-undef
      }
    }
  };
})(Drupal);
