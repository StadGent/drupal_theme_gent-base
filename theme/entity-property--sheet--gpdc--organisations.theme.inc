<?php
/**
 * @file
 * GPDC sheet references theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__organisations().
 */
function gent_base_entity_property__sheet__gpdc__organisations(&$variables) {
  $output = '<div' . $variables['attributes'] . '>' . "\n";
  $output .= '<h3><i class="icon-loc"></i>' . $variables['label'] . '</h3>';
  $output .= $variables['content'];
  $output .= '</div>' . "\n";

  return $output;
}
