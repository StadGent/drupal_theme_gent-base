/**
 * @file
 * Simple responsive table.
 */

(function ($) {

  /**
   * Behavior for the responsive tables.
   */
  Drupal.behaviors.responsiveTable = {
    attach: function (context) {
      $('body', context).once('mobile-table', function () {
        // Wrap all tables in a div.
        var tables = document.querySelectorAll('table');

        for (var item = 0; item < tables.length; item++) {
          var tableItem = tables[item];

          // Create wrapper div and wrap it around each table
          var tableWrapper = document.createElement('div');
          tableWrapper.classList.add('responsive-table');

          tableItem.parentNode.insertBefore(tableWrapper, tableItem);
          tableWrapper.appendChild(tableItem);
        }
      });
    }
  };

})(jQuery);
