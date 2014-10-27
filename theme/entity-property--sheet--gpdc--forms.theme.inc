<?php
/**
 * @file
 * GPDC sheet files theming.
 */

/**
 * Overrides theme_entity_property__sheet__gpdc__forms().
 */
function gent_base_entity_property__sheet__gpdc__forms(&$variables) {
  require_once 'entity-property--sheet--gpdc--attachments.theme.inc';
  return gent_base_entity_property__sheet__gpdc__attachments($variables);
}
