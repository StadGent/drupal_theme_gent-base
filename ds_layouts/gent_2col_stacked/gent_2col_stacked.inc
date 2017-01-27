<?php

/**
 * @file
 * Definition of the Gent 2 columns stacked layout.
 */

/**
 * Layout definition callback.
 *
 * @return array
 *   The layout configuration.
 */
function ds_gent_2col_stacked() {
  return array(
    'label' => t('Gent 2 columns, stacked'),
    'regions' => array(
      'header' => t('Header'),
      'left' => t('Left'),
      'right' => t('Right'),
      'footer' => t('Footer'),
    ),
    'css' => FALSE,
    'image' => TRUE,
  );
}
