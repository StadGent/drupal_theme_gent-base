<?php
/**
 * @file
 * Html proprocess file for gent base.
 */

/**
 * Implements hook_html_head_alter().
 */
function gent_base_html_head_alter(&$elements) {
  unset($elements['metatag_generator']);
  foreach ($elements as $name => $element) {
    if (strpos($name, 'drupal_add_html_head_link:shortcut icon') === 0) {
      global $base_url;
      // Modify the default favicon to use ours.
      $elements[$name]['#attributes']['href'] = $base_url . '/' . path_to_theme() . '/favicon.png';
    }
  }
}

/**
 * Implements theme_preprocess_HOOK().
 */
function gent_base_preprocess_html(&$variables) {
  // Setup IE meta tag to force IE rendering mode.
  drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');

  $base_theme = drupal_get_path('theme', 'gent_base');
  $variables['base_theme_path'] = base_path() . $base_theme . '/';

  // Add HTML5shiv for older IE versions.
  $html5shiv = array(
    '#tag' => 'script',
    '#attributes' => array(
      'src' => $base_theme . '/libraries/html5shiv/html5shiv.js',
    ),
    '#prefix' => '<!--[if lt IE 9  & (!IEMobile)]>',
    '#suffix' => '</script><![endif]-->',
  );
  drupal_add_html_head($html5shiv, 'html5shiv');

  // Add respond.js to make add responsiveness in IE7 & 8.
  $respond = array(
    '#tag' => 'script',
    '#attributes' => array(
      'src' => $base_theme . '/libraries/respond/respond.min.js',
    ),
    '#prefix' => '<!--[if IE 8 | IE 7]>',
    '#suffix' => '</script><![endif]-->',
  );
  drupal_add_html_head($respond, 'respond');

  // Selected scripts for the header scripts go here.
  drupal_add_js($base_theme . '/libraries/modernizr/modernizr.min.js', array(
    'scope' => 'head_scripts',
    'weight' => -1,
    'preprocess' => FALSE,
  ));

  // Include active theme as a class into the body.
  global $theme_key;
  $variables['classes_array'][] = $theme_key;

  // Set the large banner layout on some pages.
  $variables['classes_array'][] = gent_base_use_large_header() ? 'large-header' : 'small-header';

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
