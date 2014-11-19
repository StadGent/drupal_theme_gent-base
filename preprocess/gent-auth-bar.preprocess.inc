<?php
/**
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gent_base_preprocess_gent_auth_bar(&$variables) {
  if (empty($variables['block']) && variable_get('gent_auth_bar_sticky', TRUE)) {
    $variables['classes'][] = 'sticky-1';
  }
}
