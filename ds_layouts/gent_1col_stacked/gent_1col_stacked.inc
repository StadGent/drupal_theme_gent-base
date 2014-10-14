<?php
function ds_gent_1col_stacked() {
  return array(
    'label' => t('Gent 1 column, stacked'),
    'regions' => array(
	  'header' => t('Header'),
      'left' => t('Left'),
      'footer' => t('Footer'),
    ),
    // Add this line if there is a default css file.
    'css' => false,
    // Add this line if you're using DS 2.x for icon preview
    'image' => TRUE,
  );
}