<?php
/**
 * @file
 * Field preprocessing.
 */

/**
 * Implements hook_preprocess_block().
 */
function gent_base_preprocess_field(&$variables) {
  if (module_exists('sheet') && sheet_is_sheet_property($variables, 'gpdc')) {
    $variables['classes_array'] = array('article-summary', 'readable-content');
    $variables['label_hidden'] = TRUE;
    $variables['label_display_css'] = 'none';
  }
}
