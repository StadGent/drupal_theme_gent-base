<?php

/**
 * @file
 * Add native lazy loading support to images.
 */

use Drupal\image\Plugin\Field\FieldType\ImageItem;

/**
 * Implements hook_preprocess_HOOK().
 *
 * @see \template_preprocess_responsive_image_formatter()
 */
function gent_base_preprocess_responsive_image_formatter(&$variables) {
  if (isset($variables['item'])) {
    _gent_base_add_img_attributes($variables['responsive_image']['#attributes'], $variables['item']);
  }
}

/**
 * Implements hook_preprocess_HOOK().
 *
 * @see \template_preprocess_image_formatter()
 */
function gent_base_preprocess_image_formatter(&$variables) {
  if (isset($variables['item'])) {
    _gent_base_add_img_attributes($variables['image']['#attributes'], $variables['item']);
  }
}

/**
 * Adds the HTML attributes required to get correct lazy-loading.
 */
function _gent_base_add_img_attributes(array &$attributes, ImageItem $item) {
  if (!isset($attributes['loading'])) {
    $attributes['loading'] = 'lazy';
  }

  // @todo check if default width and height from core respects aspect ratio
  // image style.
}
