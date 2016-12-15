<?php

/**
 * @file
 * Template file for the gent base theme.
 */

define('GENT_BASE_HEADER_IMAGE_HIDE', 0);
define('GENT_BASE_HEADER_IMAGE_SHOW', 1);
define('GENT_BASE_HEADER_IMAGE_SHOW_FRONT_PAGE', 2);

// Load the preprocess functions.
require_once 'gent_base.preprocess.inc';
// Load the process functions.
require_once 'gent_base.process.inc';
// Load all theme hooks & overrides.
require_once 'gent_base.theme.inc';

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
 * Implements hook_js_alter().
 */
function gent_base_js_alter(&$javascript) {
  // Make sure viewport(.min).js gets added before theme(.min).js.
  $path = drupal_get_path('theme', 'gent_base');
  $viewport_js = $path . '/js/viewport.min.js';
  $theme_js = $path . '/js/base.min.js';
  if (isset($javascript[$viewport_js]) && isset($javascript[$theme_js])) {
    if ($javascript[$viewport_js]['weight'] == $javascript[$theme_js]['weight']) {
      $javascript[$viewport_js]['weight'] = $javascript[$theme_js]['weight'] - 0.001;
    }
  }
}

/**
 * Implements hook_css_alter().
 */
function gent_base_css_alter(&$css) {
  // Whitelist core CSS here. The rest can be allowed via the alter hook.
  $whitelist = array(
    'modules/contextual/contextual.css',
  );
  $whitelist = array_combine($whitelist, $whitelist);

  drupal_alter('gent_base_css_whitelist', $whitelist);

  foreach ($css as $key => $data) {
    if ($data['type'] == 'file') {
      // Skip css files in whitelist.
      if (in_array($data['data'], $whitelist)) {
        continue;
      }
      // Remove css files from core modules.
      $is_core = (strpos($data['data'], 'modules/') === 0);
      if ($is_core) {
        unset($css[$key]);
      }
    }
  }

  // The base theme overrides css of module 'gent_readspeaker'.
  if (module_exists('gent_readspeaker')) {
    $path = drupal_get_path('module', 'gent_readspeaker') . '/css/readspeaker.css';
    if (isset($css[$path])) {
      unset($css[$path]);
    }
  }

  // The base theme overrides css of module 'digipolis_openlayers'.
  if (module_exists('digipolis_openlayers')) {
    $files = array(
      'css/map.css',
      'plugins/behaviors/openlayers_behavior_layerswitcher_plus.css',
    );
    foreach ($files as $file) {
      $path = drupal_get_path('module', 'digipolis_openlayers') . '/' . $file;
      if (isset($css[$path])) {
        unset($css[$path]);
      }
    }
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * Gent base supports styling to the DG newsletter module forms.
 */
function gent_base_form_dg_newsletter_mail_subscription_form_alter(&$form) {
  $form['email']['#attributes']['class'][] = 'prefix--email';
  $form['submit']['#attributes']['class'] = array(
    'btn',
    'btn--medium',
    'btn--alpha',
    'postfix--email-submit',
  );
}

/**
 * Same as drupal_is_front_page, but added 404 & 403 pages.
 */
function gent_base_use_large_header() {
  return drupal_is_front_page();
}

/**
 * Implements hook_webform_component_render_alter().
 *
 * @see _webform_render_component()
 */
function gent_base_webform_component_render_alter(&$element, &$component) {
  if (!empty($element['#field_prefix'])) {
    $element['#wrapper_attributes']['class'][] = 'with-prefix';
  }
  if (!empty($element['#field_suffix'])) {
    $element['#wrapper_attributes']['class'][] = 'with-suffix';
  }
}

/**
 * Get the header image as a renderable array.
 *
 * @return array
 *   The renderable array or NULL if no header image is set.
 */
function gent_base_get_header_image() {
  $fid = theme_get_setting('headerimage_fid');
  if ($fid && $file = file_load($fid)) {
    return array(
      '#theme' => 'image_style',
      '#path' => $file->uri,
      '#style_name' => (gent_base_use_large_header() ? 'headerbanner_large' : 'headerbanner'),
    );
  }

  return NULL;
}
