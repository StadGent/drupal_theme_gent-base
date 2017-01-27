<?php

/**
 * @file
 * Process functions for the Gent base theme.
 */

/**
 * Implements hook_process_html().
 */
function gent_base_process_html(&$vars) {
  $vars['head_scripts'] = drupal_get_js('head_scripts');
}
