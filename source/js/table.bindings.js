/**
 * @file Table component binding.
 */

/* global drupalSettings */
'use strict';

(function (Drupal, drupalSettings) {
  Drupal.behaviors.gentBaseDefineTables = {

    /**
     * Attaches table behavior.
     *
     * @param {HTMLElement} context
     *   DOM context to attach within.
     * @param {Object} settings
     *   Drupal settings object.
     * @return {void}
     *   No return value.
     */
    attach: function (context, settings) {
      const tables = context.querySelectorAll('table:not(.is-processed)');

      const basePath =
        (drupalSettings.gent_base &&
          drupalSettings.gent_base.path) ||
        'themes/contrib/gent_base';

      let shouldLoadSwiper = false;

      /**
       * Creates a dt/dd cell element from a table cell.
       *
       * @param {HTMLElement} el
       *   Source table cell element.
       * @param {number} rowIndex
       *   Row index in grid.
       * @return {HTMLElement}
       *   Generated dt or dd element.
       */
      const createCellRow = (el, rowIndex) => {
        const tag = el.tagName.toLowerCase() === 'th' ? 'dt' : 'dd';
        const node = document.createElement(tag);

        node.classList.add('cell-row');

        if (rowIndex % 2 === 1) {
          node.classList.add('row-even');
        }

        node.dataset.rowIndex = rowIndex;
        node.innerHTML = el.innerHTML;

        return node;
      };

      /**
       * Builds a normalized grid with colspan support.
       *
       * @param {Array} rows
       *   Table rows.
       * @return {Array}
       *   2D grid structure.
       */
      const buildGrid = (rows) => {
        const grid = [];

        rows.forEach((row, rowIndex) => {
          if (!grid[rowIndex]) {
            grid[rowIndex] = [];
          }

          let colIndex = 0;

          row.querySelectorAll('th, td').forEach((cell) => {
            while (grid[rowIndex][colIndex]) {
              colIndex++;
            }

            const colspan =
              parseInt(cell.getAttribute('colspan'), 10) || 1;

            for (let i = 0; i < colspan; i++) {
              grid[rowIndex][colIndex + i] = {
                el: i === 0 ? cell.cloneNode(true) : null,
                rowIndex: rowIndex,
                isPlaceholder: i !== 0
              };
            }

            colIndex += colspan;
          });
        });

        return grid;
      };

      /**
       * Finds rows that contain colspan-generated empty cells.
       *
       * @param {Array} grid
       *   Normalized grid.
       * @return {Set<number>}
       *   Set of row indexes containing empty cells.
       */
      const getRowsWithEmptyCells = (grid) => {
        const set = new Set();

        grid.forEach((row) => {
          row.forEach((cell) => {
            if (cell && cell.isPlaceholder) {
              set.add(cell.rowIndex);
            }
          });
        });

        return set;
      };

      /**
       * Marks rows that contain empty sibling cells.
       *
       * @param {HTMLElement} dl
       *   DL container.
       * @param {Set<number>} rowsWithEmpty
       *   Set of row indexes with empty cells.
       * @return {void}
       */
      const markRowsWithEmptyCells = (dl, rowsWithEmpty) => {
        dl.querySelectorAll('[data-row-index]').forEach((el) => {
          const rowIndex = parseInt(el.dataset.rowIndex, 10);

          if (
            rowsWithEmpty.has(rowIndex) &&
            !el.classList.contains('is-empty')
          ) {
            el.classList.add('has-empty-sibling');
          }
        });
      };

      tables.forEach((table) => {
        const rows = Array.from(table.querySelectorAll('tr'));

        if (rows.length === 0 || rows[0].children.length < 2) {
          return;
        }

        shouldLoadSwiper = true;

        const wrapper = document.createElement('div');
        wrapper.classList.add('responsive-table');

        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper');

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(tableWrapper);
        tableWrapper.appendChild(table);

        const grid = buildGrid(rows);
        const rowsWithEmpty = getRowsWithEmptyCells(grid);

        const columns = [];

        grid.forEach((row) => {
          row.forEach((cell, colIndex) => {
            if (!columns[colIndex]) {
              columns[colIndex] = [];
            }
            columns[colIndex].push(cell);
          });
        });

        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('table-swiper-wrapper');

        const swiperContainer = document.createElement('div');
        swiperContainer.classList.add('table-swiper');

        const fixedColumn = document.createElement('div');
        fixedColumn.classList.add('table-swiper__fixed-column');

        const fixedDl = document.createElement('dl');

        columns[0].forEach((item) => {
          if (item.isPlaceholder) {
            const empty = document.createElement('dd');
            empty.classList.add('cell-row', 'is-empty');
            empty.dataset.rowIndex = item.rowIndex;
            fixedDl.appendChild(empty);
          }
          else {
            fixedDl.appendChild(createCellRow(item.el, item.rowIndex));
          }
        });

        markRowsWithEmptyCells(fixedDl, rowsWithEmpty);

        fixedColumn.appendChild(fixedDl);
        swiperContainer.appendChild(fixedColumn);

        const swiper = document.createElement('div');
        swiper.classList.add('swiper');

        const swiperInner = document.createElement('div');
        swiperInner.classList.add('swiper-wrapper');

        columns.slice(1).forEach((column) => {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');

          const dl = document.createElement('dl');

          column.forEach((item) => {
            if (item.isPlaceholder) {
              const empty = document.createElement('dd');
              empty.classList.add('cell-row', 'is-empty');
              empty.dataset.rowIndex = item.rowIndex;
              dl.appendChild(empty);
            }
            else {
              dl.appendChild(createCellRow(item.el, item.rowIndex));
            }
          });

          markRowsWithEmptyCells(dl, rowsWithEmpty);

          slide.appendChild(dl);
          swiperInner.appendChild(slide);
        });

        swiper.appendChild(swiperInner);
        swiperContainer.appendChild(swiper);

        const createControl = (key, icon) => {
          const el = document.createElement('div');

          el.classList.add(
            'swiper-' +
            (key === 'pagination'
              ? 'pagination'
              : 'button-' + key)
          );

          if (icon) {
            el.classList.add('custom-' + key);
            el.innerHTML =
              '<i class="icon icon-arrow-' + icon + '"></i>';
          }

          return el;
        };

        swiperContainer.appendChild(createControl('pagination'));
        swiperContainer.appendChild(createControl('prev', 'left'));
        swiperContainer.appendChild(createControl('next', 'right'));

        const captionEl = table.querySelector('caption');

        if (captionEl) {
          const caption = document.createElement('div');
          caption.classList.add('caption');
          caption.innerHTML = captionEl.innerHTML;
          swiperWrapper.appendChild(caption);
        }

        swiperWrapper.appendChild(swiperContainer);

        wrapper.insertAdjacentElement('afterend', swiperWrapper);

        table.classList.add('is-processed');
      });

      if (shouldLoadSwiper && !window.tableBindingsLoaded) {
        window.tableBindingsLoaded = true;

        const loadScript = (src) => {
          return new Promise((resolve) => {
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = resolve;
            document.head.appendChild(s);
          });
        };

        const loadStyle = (href) => {
          const l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = href;
          document.head.appendChild(l);
        };

        loadStyle(
          '/' + basePath +
          '/build/styleguide/vendor/swiper/swiper-bundle.css'
        );

        loadScript(
          '/' + basePath +
          '/build/styleguide/vendor/swiper/swiper-bundle.js'
        )
          .then(() =>
            loadScript(
              '/' + basePath +
              '/build/styleguide/js/table.bindings.js'
            )
          )
          .then(() => {
            document
              .querySelectorAll('.table-swiper-wrapper')
              .forEach((el) => {
                Drupal.attachBehaviors(el, drupalSettings);
              });
          });
      }
    }
  };
})(Drupal, drupalSettings);
