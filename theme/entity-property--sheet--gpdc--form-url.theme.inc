<?php

/**
 * @file
 * GPDC sheet form URL theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__form_url().
 */
function gent_base_entity_property__sheet__gpdc__form_url(&$variables) {
  $output = '<h2>' . t('Make your request online') . ' <i class="icon-newtab"></i></h2>';
  $output .= '<div' . $variables['attributes'] . '>' . $variables['content'] . '</div>';
  return $output;
}
