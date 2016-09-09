<?php
/**
 * @file
 * GPDC sheet references theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__gbos_products().
 */
function gent_base_entity_property__sheet__gpdc__gbos_products(&$variables) {
  $title = t('Make an appointment');

  $output = '<h2 class="online-appointments-title">' . $title . ' <i class="icon-newtab"></i></h2>';
  $output .= '<div' . $variables['attributes'] . '>';

  foreach ($variables['content'] as $content) {
    $output .= '<div class="gbos-product-wrapper">' . $content . '</div>';
  }

  $output .= '</div>';

  return $output;
}
