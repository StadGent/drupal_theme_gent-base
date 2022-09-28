/* global define, module */
(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  }
  else {
    if (typeof exports === 'object') {
      module.exports = factory();
    }
    else {
      root.MobileTable = factory();
    }
  }
}(this || window, function () {
  'use strict';

  return function (element, options) {

    /**
     * The table caption.
     */
    var caption = null;

    /**
     * The responsive list version of the table.
     */
    var tableList = null;

    /**
     * Override default options with options param.
     */
    options = (function () {
      var defaults = {
        init: true,
        headingType: 'h3'
      };

      var keys = Object.keys(defaults);
      options = options || {};

      for (var i = keys.length; i--;) {
        options[keys[i]] = options[keys[i]] || defaults[keys[i]];
      }

      return options;
    })();
    var id = (function () {
      var base = 'list-description';
      var elements = [].slice.call(document.querySelectorAll('[id*="' + base + '"'));
      if (!elements.length) {
        return base;
      }

      return base + '-' + elements.length;
    })();

    /**
     * Add a wrapper div with class .table-list as next sibling to the table.
     */
    var addTableList = function () {
      tableList = document.createElement('div');
      tableList.classList.add('table-list');
      if (caption) {
        tableList.setAttribute('aria-labelledby', id);
      }
      element.parentNode.parentNode.insertBefore(tableList, element.parentNode.nextSibling);

      addList();
    };

    /**
     * Adds the individual items to the list <ul></ul> of the table-list wrapper.
     *
     * @param {Object} list
     *   The list to add in elements based on the table.
     */
    var addListItems = function (list) {
      // Get the headers of the table columns.
      var colHeadingsNodeList = element.querySelector('table').querySelectorAll('th[scope="col"]');
      // Get the headers of the table rows.
      var rowHeadingsNodeList = element.querySelector('table').querySelectorAll('th[scope="row"]');
      // Get all rows of the table.
      var rowsNodeList = element.querySelector('table').querySelectorAll('tr');
      // The first row of the table.
      var firstRow = element.querySelector('tr');

      // Determine if we have column headings.
      options.columnHeaders = firstRow.getElementsByTagName('th').length === firstRow.children.length;

      // Determine if we have column headers. If so set the initial row +1.
      var initial = options.columnHeaders ? 1 : 0;

      // Add the rows as a list item.
      for (var i = initial; i < rowsNodeList.length; i++) {
        var row = rowsNodeList[i];

        // Get all the columns of the table based on the current row.
        var colsNodeList = row.querySelectorAll('td');

        var listItem = document.createElement('li');
        list.appendChild(listItem);

        // Add a header based on the row heading.
        if (rowHeadingsNodeList.length) {
          for (var k = 0; k < rowHeadingsNodeList.length; k++) {
            if (i === k) {
              var header = document.createElement(options.headingType);
              header.textContent = rowHeadingsNodeList[k].textContent;
              listItem.appendChild(header);
            }
          }
        }

        // Create the definition list containing all columns as dd's.
        var defList = document.createElement('dl');
        listItem.appendChild(defList);

        for (var j = 0; j < colsNodeList.length; j++) {
          var column = colsNodeList[j];

          if (colHeadingsNodeList.length) {
            var term = document.createElement('dt');
            var index = rowHeadingsNodeList.length ? j + 1 : j;
            term.innerHTML = colHeadingsNodeList[index].innerHTML;
            defList.appendChild(term);
          }

          var item = document.createElement('dd');
          item.innerHTML = column.innerHTML;
          defList.appendChild(item);
        }
      }
    };

    /**
     * Add an unordered list element to the table-list container.
     */
    var addList = function () {
      var list = document.createElement('ul');
      tableList.appendChild(list);
      addListItems(list);
      addListDescription();
    };

    /**
     * Add the table caption as a description to the definition lists.
     */
    var addListDescription = function () {
      if (!caption) {
        return;
      }

      var description = document.createElement('div');
      description.classList.add('list-description');
      description.setAttribute('id', id);
      description.innerHTML = caption.innerHTML;
      tableList.appendChild(description);
    };

    /**
     * Entry point of the script.
     *
     */
    var init = function () {
      if (!element) {
        return;
      }

      // Get the table caption for later use.
      caption = element.querySelector('caption');

      // Build a definition list based on the table for mobile use.
      addTableList();
    };

    if (options.init !== false) {
      init();
    }

    return {init: init};
  };
}));
