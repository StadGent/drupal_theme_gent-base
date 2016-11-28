<?php

/**
 * @file
 * Preprocess functions for Views theme functions.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gent_base_preprocess_views_view(&$variables) {
  // When we set multi-column as class, we force the use of the multicolumn
  // template wich adds a data attribute for salvattore.
  if (strpos($variables['css_class'], 'multi-column') !== FALSE) {
    $variables['theme_hook_suggestion'] = 'views_view__multicolumn';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gent_base_preprocess_views_view_summary_unformatted(&$variables) {

  $url = drupal_get_path_alias($_GET['q']);
  $active_item = !empty($variables['view']->original_args) ? reset($variables['view']->original_args) : NULL;

  // Prepend an All link on the first position
  $link = new StdClass();
  $link->url = 'all';
  $link->title_truncated = $link->link = t('All');
  $variables['rows'][-1] = $link;
  ksort($variables['rows']);

  if ($active_item) {
    if ($active_item == 'all') {
      $variables['row_classes'][-1] = 'active';
      return;
    }
    foreach ($variables['rows'] as $id => $row) {
      if (strcasecmp($active_item, $variables['rows'][$id]->title_truncated) == 0) {
        $variables['row_classes'][$id] = 'active';
        break;
      }
    }
  }
}