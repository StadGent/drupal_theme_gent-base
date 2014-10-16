<?php
/**
 * @file
 * Contains pre-process hooks for views.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gent_base_preprocess_views_view(&$variables) {
  //$view = $variables['view'];

  // When we set multi-column as class, we force the use of the multicolumn template
  // wich adds a data attribute for salvattore
  if (strpos($variables['css_class'], 'multi-column') !== FALSE) {
    $variables['theme_hook_suggestion'] = 'views_view__multicolumn';
  }
}