<?php

/**
 * @file
 * Helper functions to support theming in the Gent Base theme.
 */

/**
 * Check to see if a give view mode exists.
 *
 * @param string $key
 *   The view mode key.
 *
 * @return mixed
 *   Returns the view mode if found.
 */
function gent_base_is_view_mode($key) {
  return \Drupal::service('entity_type.manager')
    ->getStorage('entity_view_display')
    ->load($key);
}

/**
 * Helper function to get generate a placeholder teaser.
 *
 * @param mixed $teaser_image
 *   The teaser image field of the content type.
 * @param string $image_style
 *   The image style to be applied to the placeholder image.
 * @param string $placeholder
 *   The placeholder image to be applied.
 */
function _gent_base_generate_placeholder_image(&$teaser_image, $image_style = 'teaser', $placeholder = 'theme://gent_base/images/placeholder.png') {
  if (isset($teaser_image[0])) {
    return;
  }

  $moduleHandler = \Drupal::service('module_handler');
  if (!$moduleHandler->moduleExists('system_stream_wrapper')) {
    return;
  }

  $teaser_image =
    [
      '#theme' => 'image_style',
      '#style_name' => $image_style,
      '#uri' => $placeholder,
    ];
}
