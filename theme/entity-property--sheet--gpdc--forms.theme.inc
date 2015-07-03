<?php
/**
 * @file
 * GPDC sheet files theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__forms().
 */
function gent_base_entity_property__sheet__gpdc__forms(&$variables) {
  $output = '<h2>' . t('Downloadable forms') . '</h2>';

  foreach ($variables['content'] as $content) {
    $output .= '<div' . $variables['attributes'] . '>' . $content . '</div>' . "\n";
  }

  return $output;
}
