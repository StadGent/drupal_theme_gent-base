<?php

/**
 * @file
 * Helper functions to support form theming.
 */

use Drupal\Core\Render\Element;

/**
 * Count the number of input fields in a render array.
 *
 * @param array $elements
 *   Render arrays of elements to loop over.
 *
 * @return int
 *   The number of input fields counted.
 */
function _gent_base_count_inputs(array $elements) {
  $children = Element::children($elements);
  $input_count = 0;

  foreach ($children as $key) {
    $field = $elements[$key];
    if (!is_array($field) || !isset($field['#type'])) {
      continue;
    }

    // Only input elements have a #value property.
    if (!isset($field['#value'])) {
      continue;
    }

    $input_count++;
  }

  return $input_count;
}

/**
 * Loop webform elements and add theming parameters for the desired elements.
 *
 * @param array $elements
 *   Build array for the elements that have to be altered.
 */
function _gent_base_loop_form_elements(array &$elements) {
  $children = Element::children($elements);

  if ($children === ['elements']) {
    _gent_base_loop_form_elements($elements['elements']);
    return;
  }

  foreach ($children as $key) {
    $element = &$elements[$key];

    if (!is_array($element) || !isset($element['#type'])) {
      continue;
    }

    _gent_base_loop_form_elements_options($element);
    _gent_base_loop_form_elements_options_other($element);
    _gent_base_loop_form_elements_email_confirm($element);
    _gent_base_loop_form_elements_datetime($element);
    _gent_base_loop_form_elements_select_other($element);
    _gent_base_loop_form_elements_markup($element);
    _gent_base_loop_form_elements_upload($element);
    _gent_base_loop_webform_group($element);
  }
}

/**
 * Add template variables for option elements.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_form_elements_options(array &$element) {
  $optionTypes = ['checkboxes', 'radios'];
  if (!in_array($element['#type'], $optionTypes)) {
    return;
  }

  $element['#has_columns'] = TRUE;
  foreach (array_keys($element['#options']) as $key) {
    $element[$key]['#parent_type'] = $element['#type'];
    $element[$key]['#in_fieldset'] = TRUE;
  }
}

/**
 * Add template variables for option elements with an _other_ field.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_form_elements_options_other(array &$element) {
  $optionTypes = ['webform_checkboxes_other', 'webform_radios_other'];
  if (!in_array($element['#type'], $optionTypes)) {
    return;
  }

  _gent_base_loop_form_elements($element);

  $element['#has_columns'] = TRUE;
  $element['other']['#parent_type'] = $element['#type'];
  $element['other']['#in_fieldset'] = TRUE;
}

/**
 * Add template variables for email_confirm elements.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_form_elements_email_confirm(array &$element) {
  if ($element['#type'] !== 'webform_email_confirm') {
    return;
  }

  $element['#has_columns'] = TRUE;
  foreach (Element::children($element) as $key) {
    $element[$key]['#parent_type'] = $element['#type'];
    $element[$key]['#in_fieldset'] = TRUE;
  }
}

/**
 * Add template variables for datetime elements.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_form_elements_datetime(array &$element) {
  if ($element['#type'] !== 'datetime') {
    return;
  }

  $element['#has_row'] = TRUE;
  foreach (['date', 'time'] as $key) {
    $element[$key]['#stacked'] = TRUE;
  }
}

/**
 * Add template variables for select elements with an _other_ field.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_form_elements_select_other(array &$element) {
  if ($element['#type'] !== 'webform_select_other') {
    return;
  }

  $element['#has_columns'] = TRUE;
  $element['select']['#parent_type'] = $element['#type'];
  $element['select']['#in_fieldset'] = TRUE;
  $element['other']['#parent_type'] = $element['#type'];
  $element['other']['#in_fieldset'] = TRUE;
}

/**
 * Add template variables for select elements with an _other_ field.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_form_elements_markup(array &$element) {
  if ($element['#type'] !== 'webform_markup') {
    return;
  }

  $element['#theme_wrappers'] = [];
}

/**
 * Add template variables for groups.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_webform_group(array &$element) {
  $groupTypes = ['container', 'fieldset'];
  if (!in_array($element['#type'], $groupTypes)) {
    return;
  }

  _gent_base_loop_form_elements($element);
}

/**
 * Add template variables for upload elements.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_form_elements_upload(array &$element) {
  $uploadTypes = ['webform_image_file', 'webform_document_file'];
  if (!in_array($element['#type'], $uploadTypes)) {
    return;
  }

  if (isset($element['#help'])) {
    $element['#description'] = $element['#help'];
    unset($element['#help']);
  }
}
