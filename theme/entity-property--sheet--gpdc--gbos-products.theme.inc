<?php
/**
 * @file
 * GPDC sheet references theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__gbos_products().
 */
function gent_base_entity_property__sheet__gpdc__gbos_products(&$variables) {
  $output = '<h2>' . t('Online appointments') . '</h2>';
  $output .= '<div' . $variables['attributes'] . '>' . $variables['content'] . '</div>';
  return $output;
}
