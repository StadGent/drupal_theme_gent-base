// eslint-disable-next-line no-redeclare
/* global File */

/**
 * @file
 * File component binding.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.gentBaseLoadFile = {
    attach: function (context, settings) {
      if (!File) {
        return;
      }

      var selected = document.querySelectorAll('.file');
      for (var i = selected.length; i--;) {
        new File(selected[i], {
          emptyText: Drupal.t('No file chosen.'),
          multipleText: Drupal.t('Multiple files.')
        });
      }

    }
  };
})(Drupal);
