<?php
/**
 * @file
 * Contains form preprocess functions for gent base theme.
 */

/**
 * Implements hook_preprocess_form().
 */
function gent_base_preprocess_form(&$variables) {
  // Add a template suggestion so we can override based on form id.
  // TODO this breaks forms if #theme is not 'form'??
  //$variables['theme_hook_suggestions'][] = 'form__' . str_replace('-', '_', $variables['element']['#id']);

}
