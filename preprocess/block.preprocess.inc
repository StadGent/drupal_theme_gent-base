<?php

/**
 * @file
 * Contains a pre-process hook for 'block'.
 */

/**
 * Implements hook_preprocess_block().
 */
function gent_base_preprocess_block(&$variables) {

  if (!empty($variables['block_html_id'])) {
    $variables['attributes_array']['id'] = $variables['block_html_id'];
    $variables['attributes_array']['class'][] = preg_replace('/^block-/', 'block--', $variables['block_html_id']);
  }

  $css_module = drupal_clean_css_identifier($variables['block']->module);
  $variables['attributes_array']['class'] = preg_replace('/^block-' . $css_module . '$/', 'block--' . $css_module, $variables['attributes_array']['class']);
  $variables['attributes_array']['class'] = preg_replace('/^block-menu$/', 'block--menu', $variables['attributes_array']['class']);

  $variables['title_attributes_array']['class'][] = 'block__title';
  $variables['title_attributes_array']['class'][] = 'h1 hT';

  $variables['content_attributes_array']['class'][] = 'block__content';
}
