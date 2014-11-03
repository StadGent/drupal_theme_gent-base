<?php
/**
 * @file
 * Field preprocessing.
 */

/**
 * Implements hook_preprocess_field().
 */
function gent_base_preprocess_field(&$variables) {
  if (module_exists('sheet') && sheet_is_sheet_property($variables, 'gpdc')) {
    $variables['label_hidden'] = TRUE;
    $variables['label_display_css'] = 'none';
  }
}
