<?php
/**
 * @file
 * GPDC sheet form URL theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__form_url().
 */
function gent_base_entity_property__sheet__gpdc__form_url(&$variables) {
  return '<p' . $variables['attributes'] . '>' . $variables['content'] . '</p>';
}
