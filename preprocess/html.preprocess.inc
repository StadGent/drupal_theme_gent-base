<?php

/**
 * @file
 * Html proprocess functions.
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

  // Selected scripts for the header scripts go here.
  drupal_add_js($base_theme . '/libraries/modernizr/modernizr.min.js', array(
    'scope' => 'head_scripts',
    'weight' => -1,
    'preprocess' => FALSE,
  ));

  // The Webform script will only be enabled when the module exists.
  if (module_exists('webform')) {
    if (file_exists($base_theme . '/js/webform.min.js')) {
      drupal_add_js($base_theme . '/js/webform.min.js');
    }
    else {
      drupal_add_js($base_theme . '/js/webform.js');
    }
  }

  // Include active theme as a class into the body.
  global $theme_key;
  $variables['classes_array'][] = $theme_key;

  // Set the large banner layout on some pages.
  $variables['classes_array'][] = gent_base_use_large_header() ? 'large-header' : 'small-header';

  // If Readspeaker button is enabled add a class to the body so we know...
  // eg. so it doesn't overlaps with breadcrumb.
  if (theme_get_setting('readspeaker_enabled')) {
    $variables['classes_array'][] = 'readspeaker--enabled';
  }

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
