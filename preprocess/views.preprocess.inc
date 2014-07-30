<?php
/**
 * @file
 * Contains pre-process hooks for views.
 */

/**
 * Implements hook_preprocess_views_view_grid().
 */
function pierke_preprocess_views_view_grid(&$variables) {
  // For some reason views puts row classes into the classes array. Instead of
  // classes arrays we should always use proper attributes arrays and never
  // abuse the default versions of those for row classes. Instead, we should use
  // a custom variable for that, which is exactly what we convert it to here.
  $options = $variables['view']->style_plugin->options;
  $columns = $options['columns'];
  foreach ($variables['rows'] as $delta => $row) {
    $variables['row_attributes_array'][$delta] = isset($variables['row_attributes_array'][$delta]) ? $variables['row_attributes_array'][$delta] : array();

    if (!empty($variables['row_classes'][$delta])) {
      $variables['row_attributes_array'][$delta]['class'] = explode(' ', $variables['row_classes'][$delta]);
    }

    // Views tables have additional classes for each column.
    for ($column = 0; $column < $columns; $column++) {
      $variables['column_attributes_array'][$delta][$column] = isset($variables['column_attributes_array'][$delta][$column]) ? $variables['column_attributes_array'][$delta][$column] : array();

      if (!empty($variables['column_classes'][$delta][$column])) {
        $variables['column_attributes_array'][$delta][$column]['class'] = explode(' ', $variables['column_classes'][$delta][$column]);
      }
    }
  }
}

/**
 * Implements hook_preprocess_views_view_list().
 */
function pierke_preprocess_views_view_list(&$variables) {
  // For some reason views puts row classes into the classes array. Instead of
  // classes arrays we should always use proper attributes arrays and never
  // abuse the default versions of those for row classes. Instead, we should use
  // a custom variable for that, which is exactly what we convert it to here.
  foreach ($variables['rows'] as $delta => $row) {
    $variables['row_attributes_array'][$delta] = isset($variables['row_attributes_array'][$delta]) ? $variables['row_attributes_array'][$delta] : array();

    if (!empty($variables['classes_array'][$delta])) {
      $variables['row_attributes_array'][$delta]['class'] = explode(' ', $variables['classes_array'][$delta]);
    }
  }
}

/**
 * Implements hook_preprocess_views_view_table().
 */
function pierke_preprocess_views_view_table(&$variables) {
  // For some reason views puts row classes into the classes array. Instead of
  // classes arrays we should always use proper attributes arrays and never
  // abuse the default versions of those for row classes. Instead, we should use
  // a custom variable for that, which is exactly what we convert it to here.
  foreach ($variables['rows'] as $delta => $row) {
    $variables['row_attributes_array'][$delta] = isset($variables['row_attributes_array'][$delta]) ? $variables['row_attributes_array'][$delta] : array();

    if (!empty($variables['row_classes'][$delta])) {
      $variables['row_attributes_array'][$delta]['class'] = $variables['row_classes'][$delta];
    }

    // Views tables have additional classes for each table column.
    foreach ($row as $field => $content) {
      $variables['field_attributes_array'][$field][$delta] = isset($variables['field_attributes'][$field][$delta]) ? $variables['field_attributes'][$field][$delta] : array();

      if (!empty($variables['field_classes'][$field][$delta])) {
        $variables['field_attributes_array'][$field][$delta]['class'] = explode(' ', $variables['field_classes'][$field][$delta]);
      }
    }
  }

  // Views tables have additional classes for each header column.
  foreach ($variables['header'] as $field => $label) {
    $variables['header_attributes_array'][$field] = isset($variables['header_attributes_array'][$field]) ? $variables['header_attributes_array'][$field] : array();

    if (!empty($variables['header_classes'][$field])) {
      $variables['header_attributes_array'][$field]['class'] = explode(' ', $variables['header_classes'][$field]);
    }
  }
}

/**
 * Implements hook_preprocess_views_view_unformatted().
 */
function pierke_preprocess_views_view_unformatted(&$variables) {
  // For some reason views puts row classes into the classes array. Instead of
  // classes arrays we should always use proper attributes arrays and never
  // abuse the default versions of those for row classes. Instead, we should use
  // a custom variable for that, which is exactly what we convert it to here.
  foreach ($variables['rows'] as $delta => $row) {
    $variables['row_attributes_array'][$delta] = isset($variables['row_attributes_array'][$delta]) ? $variables['row_attributes_array'][$delta] : array();

    if (!empty($variables['classes_array'][$delta])) {
      $variables['row_attributes_array'][$delta]['class'] = explode(' ', $variables['classes_array'][$delta]);
    }
  }
}
