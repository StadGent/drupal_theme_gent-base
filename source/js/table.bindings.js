/* global ResponsiveTable, MobileTable */

/**
 * @file
* Table component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseDefineTables = {
    attach: function (context, settings) {

      var tables = document.querySelectorAll('table');

      for (var item = 0; item < tables.length; item++) {
        var tableItem = tables[item];

        // Create wrapper div and wrap it around each table
        var tableWrapper = document.createElement('div');
        tableWrapper.classList.add('responsive-table');

        tableItem.parentNode.insertBefore(tableWrapper, tableItem);
        tableWrapper.appendChild(tableItem);

        // Adds accessibility support.
        new ResponsiveTable(tableWrapper, {
          scrollableText: Drupal.t('(Scroll to see more)')
        });

        new MobileTable(tableWrapper);
      }

    }
  };
})(Drupal);
