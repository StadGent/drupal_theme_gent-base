<?php

/**
 * @file
 * Definition of the Gent 1 column stacked layout.
 */

/**
 * Layout definition callback.
 *
 * @return array
 *   The layout configuration.
 */
function ds_gent_1col_stacked() {
  return array(
    'label' => t('Gent 1 column, stacked'),
    'regions' => array(
      'header' => t('Header'),
      'left' => t('Left'),
      'footer' => t('Footer'),
    ),
    'css' => FALSE,
    'image' => TRUE,
  );
}
