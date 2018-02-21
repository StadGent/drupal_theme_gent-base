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

/**
 * Implements hook_process_page().
 */
function gent_base_process_page(&$variables) {
  $header_classes = array('site__header');
  if (!empty($variables['header_image'])) {
    $header_classes[] = 'header--has-image';
  }
  if (!empty($variables['header_accolade'])) {
    $header_classes[] = 'header--has-accolade';
  }
  $variables['header_classes'] = implode(' ', $header_classes);
}
