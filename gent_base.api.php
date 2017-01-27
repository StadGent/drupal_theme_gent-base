<?php

/**
 * @file
 * Hooks provided by the gent base theme.
 */

/**
 * @addtogroup hooks
 * @{
 */

/**
 * Alter the whitelist of css files.
 *
 * This hook is invoked in gent_base_css_alter() to let sub themes of gent base
 * theme decide whether they should skip removal of css files.
 *
 * @param array $whitelist
 *   Simple array containing paths of css files that should skip the removal by
 *   the gent_base theme.
 */
function hook_gent_base_css_whitelist_alter(&$whitelist) {
  // Remove the contextual css file from the whitelist so the gent_base theme
  // will not add it.
  unset($whitelist['modules/contextual/contextual.css']);
}

/**
 * @} End of "addtogroup hooks".
 */
