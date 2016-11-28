<?php

/**
 * @file
 * Preprocess functions for the region template.
 */

/**
 * Implements hook_preprocess_region().
 */
function gent_base_preprocess_region(&$variables) {
  $name = $variables['elements']['#region'];

  if ($name == 'content') {
    if (!empty($variables['elements']['#sidebar'])) {
      $variables['classes_array'][] = 'l-primary';
    }
  }
  elseif ($name == 'sidebar') {
    if (!empty($variables['elements']['#sidebar'])) {
      $variables['classes_array'][] = 'l-secondary';
    }
  }
}
