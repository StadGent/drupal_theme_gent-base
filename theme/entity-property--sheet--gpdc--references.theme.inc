<?php
/**
 * @file
 * GPDC sheet references theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__references().
 */
function gent_base_entity_property__sheet__gpdc__references(&$variables) {
  $output = '';
  foreach ($variables['content'] as $content) {
    $output .= '<p' . $variables['attributes'] . '>' . $content . '</p>' . "\n";
  }

  return $output;
}
