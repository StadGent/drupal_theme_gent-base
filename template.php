<?php
/**
 * @file
 * Template file for the gent_base base theme.
 */

/**
 * Implements hook_css_alter().
 */
function gent_base_css_alter(&$css) {
  // Remove all css files from core modules.
  foreach ($css as $key => $data) {
    if ($data['type'] == 'file') {
      $is_core = (strpos($data['data'], 'modules/') === 0);
      if ($is_core) {
        unset($css[$key]);
      }
    }
  }
}

