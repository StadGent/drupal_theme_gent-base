<?php
/**
 * @file
 * Contains maintenance page preprocessing.
 */

/**
 * Implements hook_preprocess_maintenance_page().
 */
function gent_base_preprocess_maintenance_page(&$variables) {
  $variables['site_title'] = 'Stad.gent';

  if (empty($variables['tabs']['#primary']) && empty($variables['tabs']['#secondary'])) {
    $variables['tabs'] = NULL;
  }

  $base_theme = drupal_get_path('theme', 'gent_base');
  $variables['base_theme_path'] = base_path() . $base_theme . '/';
}
