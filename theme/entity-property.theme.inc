<?php
/**
 * @file
 * Default property theming.
 */

/**
 * Overrides theme_entity_property().
 */
function gent_base_entity_property(&$variables) {

  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h2' . $variables['title_attributes'] . '>' . $variables['label'] . '</h2>';
  }

  // Render the content.
  $content_suffix = '';
  if (!$variables['label_hidden'] || $variables['content_attributes']) {
    $output .= '<div' . $variables['content_attributes'] . '>';
    $content_suffix = '</div>';
  }
  $output .= $variables['content'] . $content_suffix;

  // Render the top-level DIV.
  return '<div' . $variables['attributes'] . '>' . $output . '</div>';
}
