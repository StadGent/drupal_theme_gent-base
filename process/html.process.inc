<?php
/**
* Implements hook_process_html().
*/
function gent_base_process_html(&$vars) {
  $vars['head_scripts'] = drupal_get_js('head_scripts');
}