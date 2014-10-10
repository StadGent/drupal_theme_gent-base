<?php

/**
 * Implements theme_preprocess_HOOK().
 */
function gent_base_preprocess_html(&$variables) {
  // Setup IE meta tag to force IE rendering mode.
  drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');

  // Add HTML5shiv for older IE versions
  $html5shiv = array(
    '#tag' => 'script',
    '#attributes' => array(
      'src' => drupal_get_path('theme', 'gent_base') . '/js/html5shiv.js',
    ),
    '#prefix' => '<!--[if lt IE 9  & (!IEMobile)]>',
    '#suffix' => '</script><![endif]-->',
  );
  drupal_add_html_head($html5shiv, 'html5shiv');
}
