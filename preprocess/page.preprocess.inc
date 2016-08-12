<?php
/**
 * @file
 * Contains page preprocessing.
 */

/**
 * Implements hook_preprocess_page().
 */
function gent_base_preprocess_page(&$variables) {
  // The default site title. This can be overwritten depending on a context (OG, ...)
  $variables['site_title'] = 'Stad.gent';

  // Unset tabs variable if no primary or secondary tabs are defined.
  if (empty($variables['tabs']['#primary']) && empty($variables['tabs']['#secondary'])) {
    $variables['tabs'] = NULL;
  }

  // Header image.
  $variables['header_image'] = NULL;
  switch (theme_get_setting('header_image_behavior')) {
    // Only show the header image on the front page.
    case GENT_BASE_HEADER_IMAGE_SHOW_FRONT_PAGE:
      if (!empty($variables['is_front'])) {
        $variables['header_image'] = gent_base_get_header_image();
      }
      break;

    // Always show the header image.
    case GENT_BASE_HEADER_IMAGE_SHOW:
      $variables['header_image'] = gent_base_get_header_image();
      break;

    // Never show the header image.
    case GENT_BASE_HEADER_IMAGE_HIDE:
    default:
      // Do nothing.
  }

  // Add classes to content / sidebar if sidebar is available.
  if (!empty($variables['page']['sidebar'])) {
    $variables['page']['content']['#sidebar'] = TRUE;
    $variables['page']['sidebar']['#sidebar'] = TRUE;
  }

  // Add a breadcrumb on the error pages
  $header = drupal_get_http_header('Status');
  if ($header == '404 Not Found' || $header == '403 Forbidden') {
    $front = l(t('Home'), '<front>');
    drupal_set_breadcrumb(array($front));
  }

  // Any implementing subtheme should define the conditions for using top tabs instead
  // of normal tabs. This permission is added by gent base tools.
  $variables['top_tabs_enabled'] = user_access('use tabs in top menu');

  // Load jquery.sticky library (if exists).
  if (module_exists('libraries') && $lib = libraries_get_path('jquery.sticky')) {
    if (file_exists($lib . '/jquery.sticky.min.js')) {
      drupal_add_js($lib . '/jquery.sticky.min.js');
    }
    else {
      drupal_add_js($lib . '/jquery.sticky.js');
    }
  }
}
