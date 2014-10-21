<?php
/**
 * Implements theme_preprocess_HOOK().
 */
function gent_base_preprocess_html(&$variables) {
  // Setup IE meta tag to force IE rendering mode.
  drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');


  $base_theme = drupal_get_path('theme', 'gent_base');
  // Add HTML5shiv for older IE versions
  $html5shiv = array(
    '#tag' => 'script',
    '#attributes' => array(
      'src' => $base_theme . '/libraries/html5shiv/html5shiv.js',
    ),
    '#prefix' => '<!--[if lt IE 9  & (!IEMobile)]>',
    '#suffix' => '</script><![endif]-->',
  );
  drupal_add_html_head($html5shiv, 'html5shiv');

  // Add respond.js to make add responsiveness in IE7 & 8
  $respond = array(
    '#tag' => 'script',
    '#attributes' => array(
      'src' => $base_theme . '/libraries/respond/respond.min.js',
    ),
    '#prefix' => '<!--[if IE 8 | IE 7]>',
    '#suffix' => '</script><![endif]-->',
  );
  drupal_add_html_head($respond, 'respond');

  // Selected scripts for the header scripts go here
  drupal_add_js($base_theme . '/libraries/modernizr/modernizr.min.js', array(
    'scope' => 'head_scripts',
    'weight' => -1,
    'preprocess' => FALSE
  ));

  // Merge classes array into attributes array.
  if (!empty($variables['classes_array'])) {
    if (!empty($variables['attributes_array']['class'])) {
      $variables['attributes_array']['class'] = array_merge($variables['attributes_array']['class'], $variables['classes_array']);
      $variables['attributes_array']['class'] = array_unique($variables['attributes_array']['class']);
    }
    else {
      $variables['attributes_array']['class'] = $variables['classes_array'];
    }
  }
}

