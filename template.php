<?php
/**
 * @file
 * Template file for the gent_base base theme.
 */

/**
 * Implements hook_css_alter().
 */
function gent_base_css_alter(&$css) {
  unset($css['modules/system/system.menus.css']);
  unset($css['modules/system/system.base.css']);
  unset($css['modules/system/system.messages.css']);
  unset($css['modules/system/system.theme.css']);
}

