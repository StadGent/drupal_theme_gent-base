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

/**
 * Implements hook_preprocess_HOOK().
 *
 * Always use a summary list without delimiter using inline fields
 */
function gent_base_preprocess_views_view_summary_unformatted(&$variables) {
  $url = drupal_get_path_alias($_GET['q']);
  $url_parts = explode('/', $url);
  $url_last = end($url_parts)
  ;
  if (drupal_strlen($url_last) !== 1) {
    $variables['row_classes'][0] = 'active';
    return;
  }

  $char = mb_substr($url, -1);
  foreach ($variables['rows'] as $id => $row) {
    if (strcasecmp($char, $variables['rows'][$id]->title_truncated) == 0) {
      $variables['row_classes'][$id] = 'active';
    }
  }
}