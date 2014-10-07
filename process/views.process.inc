<?php
/**
 * @file
 * Contains process hooks for views.
 */

/**
 * Implements hook_process_views_view_grid().
 */
function gent_base_process_views_view_grid(&$variables) {
  $options = $variables['view']->style_plugin->options;
  $columns = $options['columns'];
  foreach ($variables['rows'] as $delta => $row) {
    // Convert the previously set row attributes arrays into strings.
    $variables['row_attributes'][$delta] = !empty($variables['row_attributes_array'][$delta]) ? drupal_attributes($variables['row_attributes_array'][$delta]) : '';

    for ($column = 0; $column < $columns; $column++) {
      // Convert the previously set column attributes arrays into strings.
      $variables['column_attributes'][$delta][$column] = !empty($variables['column_attributes_array'][$delta][$column]) ? drupal_attributes($variables['column_attributes_array'][$delta][$column]) : '';
    }
  }
}

/**
 * Implements hook_process_views_view_list().
 */
function gent_base_process_views_view_list(&$variables) {
  foreach ($variables['rows'] as $delta => $item) {
    // Convert the previously set row attributes arrays into strings.
    $variables['row_attributes'][$delta] = !empty($variables['row_attributes_array'][$delta]) ? drupal_attributes($variables['row_attributes_array'][$delta]) : '';
  }
}

/**
 * Implements hook_process_views_view_table().
 */
function gent_base_process_views_view_table(&$variables) {
  foreach ($variables['rows'] as $delta => $row) {
    // Convert the previously set row attributes arrays into strings.
    $variables['row_attributes'][$delta] = !empty($variables['row_attributes_array'][$delta]) ? drupal_attributes($variables['row_attributes_array'][$delta]) : '';

    foreach ($row as $field => $content) {
      // Convert the previously set field attributes arrays into strings.
      $variables['field_attributes'][$field][$delta] = !empty($variables['field_attributes_array'][$field][$delta]) ? drupal_attributes($variables['field_attributes_array'][$field][$delta]) : '';
    }
  }

  foreach ($variables['header'] as $field => $label) {
    // Convert the previously set header attributes arrays into strings.
    $variables['header_attributes'][$field] = !empty($variables['header_attributes_array'][$field]) ? drupal_attributes($variables['header_attributes_array'][$field]) : '';
  }
}

/**
 * Implements hook_process_views_view_unformatted().
 */
function gent_base_process_views_view_unformatted(&$variables) {
  foreach ($variables['rows'] as $delta => $item) {
    // Convert the previously set row attributes arrays into strings.
    $variables['row_attributes'][$delta] = !empty($variables['row_attributes_array'][$delta]) ? drupal_attributes($variables['row_attributes_array'][$delta]) : '';
  }
}
