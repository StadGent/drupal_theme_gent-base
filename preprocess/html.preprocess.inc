<?php

/**
 * Implements theme_preprocess_HOOK().
 */
function gent_base_preprocess_html(&$variables) {
  if (!empty($variables['page']['sidebar_first']) && !empty($variables['page']['sidebar_second'])) {
    $variables['attributes_array']['class'][] = 'has-two-sidebars has-sidebar-first has-sidebar-second has-sidebar';
  }
  elseif (!empty($variables['page']['sidebar_first'])) {
    $variables['attributes_array']['class'][] = 'has-sidebar-first has-one-sidebar has-sidebar';
  }
  elseif (!empty($variables['page']['sidebar_second'])) {
    $variables['attributes_array']['class'][] = 'has-sidebar-second has-one-sidebar has-sidebar';
  }
  else {
    $variables['attributes_array']['class'][] = 'no-sidebars';
  }

  // Setup IE meta tag to force IE rendering mode
  drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
}
