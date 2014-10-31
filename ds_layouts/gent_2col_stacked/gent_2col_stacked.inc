<?php
function ds_gent_2col_stacked() {
  return array(
    'label' => t('Gent 2 columns, stacked'),
    'regions' => array(
  	  'header' => t('Header'),
      'left' => t('Left'),
      'right' => t('Right'),
      'footer' => t('Footer'),
    ),
    // Add this line if there is a default css file.
    'css' => false,
    // Add this line if you're using DS 2.x for icon preview
    'image' => TRUE,
  );
}