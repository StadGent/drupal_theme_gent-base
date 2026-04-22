/**
 * @file
 * Table component binding.
 */

/* global drupalSettings */
'use strict';

(function (Drupal, drupalSettings) {
  Drupal.behaviors.gentBaseDefineTables = {
    attach: function (context, settings) {
      const tables = context.querySelectorAll('table:not(.is-processed)');
      const basePath = (drupalSettings.gent_base && drupalSettings.gent_base.path) || 'themes/contrib/gent_base';
      let shouldLoadSwiper = false;

      // Helper to clone a cell into <dt> or <dd> with correct classes.
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

      // SGD8-3103: Build a normalized grid that respects colspan
      const buildGrid = (rows) => {
        const grid = [];

        rows.forEach((row, rowIndex) => {
          if (!grid[rowIndex]) grid[rowIndex] = [];

          let colIndex = 0;

          row.querySelectorAll('th, td').forEach((cell) => {
            // Skip already filled slots
            while (grid[rowIndex][colIndex]) {
              colIndex++;
            }

            const colspan = parseInt(cell.getAttribute('colspan')) || 1;

            for (let i = 0; i < colspan; i++) {
              grid[rowIndex][colIndex + i] = {
                el: i === 0 ? cell.cloneNode(true) : null,
                rowIndex,
                isPlaceholder: i !== 0
              };
            }

            colIndex += colspan;
          });
        });

        return grid;
      };

      tables.forEach((table) => {
        const rows = Array.from(table.querySelectorAll('tr'));
        if (rows.length === 0 || rows[0].children.length < 2) {
          return;
        }

        shouldLoadSwiper = true;

        // Wrap table in responsive container.
        const wrapper = document.createElement('div');
        wrapper.classList.add('responsive-table');
        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper');
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(tableWrapper);
        tableWrapper.appendChild(table);

        // SGD8-3103: Build columns via normalized grid
        const grid = buildGrid(rows);
        const columns = [];

        grid.forEach((row) => {
          row.forEach((cell, colIndex) => {
            if (!columns[colIndex]) {
              columns[colIndex] = [];
            }
            columns[colIndex].push(cell);
          });
        });

        // Create Swiper wrapper.
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('table-swiper-wrapper');
        const swiperContainer = document.createElement('div');
        swiperContainer.classList.add('table-swiper');

        // Fixed first column.
        const fixedColumn = document.createElement('div');
        fixedColumn.classList.add('table-swiper__fixed-column');
        const fixedDl = document.createElement('dl');

        columns[0].forEach(({el, rowIndex, isPlaceholder}) => {
          if (isPlaceholder) {
            const empty = document.createElement('dd');
            empty.classList.add('cell-row', 'is-empty');
            empty.dataset.rowIndex = rowIndex;
            fixedDl.appendChild(empty);
          } else {
            fixedDl.appendChild(createCellRow(el, rowIndex));
          }
        });

        fixedColumn.appendChild(fixedDl);
        swiperContainer.appendChild(fixedColumn);

        // Swiper slides.
        const swiper = document.createElement('div');
        swiper.classList.add('swiper');
        const swiperInner = document.createElement('div');
        swiperInner.classList.add('swiper-wrapper');

        columns.slice(1).forEach((column) => {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          const dl = document.createElement('dl');

          column.forEach(({el, rowIndex, isPlaceholder}) => {
            if (isPlaceholder) {
              const empty = document.createElement('dd');
              empty.classList.add('cell-row', 'is-empty');
              empty.dataset.rowIndex = rowIndex;
              dl.appendChild(empty);
            } else {
              dl.appendChild(createCellRow(el, rowIndex));
            }
          });

          slide.appendChild(dl);
          swiperInner.appendChild(slide);
        });

        swiper.appendChild(swiperInner);
        swiperContainer.appendChild(swiper);

        // Swiper controls.
        const createControl = (key, icon) => {
          const el = document.createElement('div');
          el.classList.add(`swiper-${key === 'pagination' ? 'pagination' : `button-${key}`}`);
          if (icon) {
            el.classList.add(`custom-${key}`);
            el.innerHTML = `<i class="icon icon-arrow-${icon}"></i>`;
          }
          return el;
        };

        swiperContainer.appendChild(createControl('pagination'));
        swiperContainer.appendChild(createControl('prev', 'left'));
        swiperContainer.appendChild(createControl('next', 'right'));

        // Caption if present.
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

      // Lazy-load Swiper and bindings script if needed.
      if (shouldLoadSwiper && !window.tableBindingsLoaded) {
        window.tableBindingsLoaded = true;

        const loadScript = (src) =>
          new Promise((resolve) => {
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = resolve;
            document.head.appendChild(s);
          });

        const loadStyle = (href) => {
          const l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = href;
          document.head.appendChild(l);
        };

        // Lazy-load without event listeners.
        loadStyle(`/${basePath}/build/styleguide/vendor/swiper/swiper-bundle.css`);
        loadScript(`/${basePath}/build/styleguide/vendor/swiper/swiper-bundle.js`)
          .then(() => loadScript(`/${basePath}/build/styleguide/js/table.bindings.js`))
          .then(() => {
            const newTables = document.querySelectorAll('.table-swiper-wrapper');
            newTables.forEach((el) => {
              Drupal.attachBehaviors(el, drupalSettings);
            });
          });
      }
    }
  };
})(Drupal, drupalSettings);
