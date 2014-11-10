<?php
/**
 * @file
 * GPDC sheet references theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__references().
 */
function gent_base_entity_property__sheet__gpdc__references(&$variables) {
  $output = '<div id="sheet-references">';
  $output .= '<h2>' . $variables['label'] . '</h3>';
  $output .= $variables['content'];
  $output .= '</div>' . "\n";

  return $output;
}
