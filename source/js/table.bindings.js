/* global ResponsiveTable, MobileTable */

/**
 * @file
* Table component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadMenu = {
    attach: function (context, settings) {

      var tablesNodeList = document.querySelectorAll('.responsive-table');

      // Optimise all tables with a wrapper div.responsive-table
      for (var i = 0; i < tablesNodeList.length; i++) {
        var table = tablesNodeList[i];

        // Adds accessibility support.
        new ResponsiveTable(table, {
          scrollableText: '(scroll to see more)'
        });
      }

      var selected = document.querySelectorAll('.responsive-table');
      for (var j = selected.length; j--;) {
        new MobileTable(selected[j]); // eslint-disable-line no-undef
      }
    }
  };
})(Drupal);
