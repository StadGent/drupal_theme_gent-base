<?php

/**
 * @file
 * Helper functions to support theming in the Gent Base theme.
 */

use Drupal\Core\Render\Element;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Returns a list of form_id's of the system forms.
 *
 * @return array
 *   An array with form_id values.
 */
function _gent_base_get_system_forms() {
  return [
    'content_moderation_entity_moderation_form',
    'views_exposed_form',
  ];
}

/**
 * Check to see if a given view mode exists.
 *
 * @param string $key
 *   The view mode key.
 *
 * @return mixed
 *   Returns the view mode if found.
 */
function gent_base_is_view_mode($key) {
  return \Drupal::service('entity_type.manager')
    ->getStorage('entity_view_display')
    ->load($key);
}

/**
 * Helper function to get the file data of a referenced File entity.
 *
 * @param mixed $variables
 *   The variables array to work with.
 * @param string $field
 *   The field to get the referenced file file size from.
 *
 * @return array|null
 *   The file size of the document in bytes.
 *
 * @throws \Drupal\Core\TypedData\Exception\MissingDataException
 */
function _gent_base_get_entity_reference_file_data(&$variables, $field) {
  $data = [];

  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['elements']['#paragraph'];
  if (!$paragraph->hasField($field)) {
    return;
  }
  /* @var $entity \Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem */
  $entity = $paragraph->get($field)->first();
  if (!$entity) {
    return;
  }

  /* @var $media \Drupal\media\Entity\Media */
  $media = Media::load($entity->get('target_id')->getValue());
  if (!$media) {
    return;
  }

  $file = $media->get('field_media_file')->getValue();
  if (empty($file[0]['target_id'])) {
    return;
  }

  /* @var $file_entity \Drupal\file\Entity\File */
  $file_entity = File::load($file[0]['target_id']);
  if (!$file_entity) {
    return;
  }

  $file_name = $file_entity->getFilename();

  $file_type = explode('.', $file_name);
  $file_type = end($file_type);
  $file_type = strtoupper($file_type);

  $data['file_size'] = $file_entity->getSize();
  $data['file_uri'] = $file_entity->getFileUri();
  $data['file_type'] = $file_type;

  return $data;
}

/**
 * Get desired display of the timeline, based on field_timeline_as_program.
 *
 * @param Drupal\paragraphs\Entity\Paragraph $entity
 *   The paragraph entity.
 *
 * @return string
 *   whether the alternative ('alt') or normal ('normal') display should be
 *   used.
 */
function _gent_base_get_timeline_display(Paragraph $entity) {
  $isProgram = $entity->get('field_timeline_as_program')->value;
  return ($isProgram === '1') ? 'alt' : 'normal';
}

/**
 * Count the number of input fields in a render array.
 *
 * @param array $array
 *   Render array to loop over.
 *
 * @return int
 *   The number of input fields counted.
 */
function _gent_base_count_input_fields(array $array) {
  $input_count = 0;
  $fields_types = [
    'checkbox',
    'checkboxes',
    'date',
    'email',
    'file',
    'number',
    'password',
    'radio',
    'radios',
    'select',
    'textarea',
    'textfield',
    'url',
    'webform_address',
  ];

  foreach ($array as &$field) {
    if (!is_array($field) || !isset($field['#type'])) {
      continue;
    }

    if (!in_array($field['#type'], $fields_types)) {
      continue;
    }

    $input_count++;
  }

  return $input_count;
}

/**
 * Adds the step title to the step for webforms with multiple pages.
 *
 * @param array $form
 *   Render array for the form.
 */
function _gent_base_add_webform_step_title(array &$form) {
  foreach (Element::children($form['elements']) as $key) {
    $step = &$form['elements'][$key];

    if ($step['#type'] !== 'container') {
      continue;
    }

    // Generate the markup.
    $build = [];
    $build['heading'] = [
      '#type' => 'html_tag',
      '#tag' => 'h2',
      '#value' => $step['#title'],
    ];

    if (_gent_base_count_input_fields($step) > 0) {
      $build['disclaimer'] = [
        '#type' => 'html_tag',
        '#tag' => 'p',
        '#value' =>  t('Fill in all fields unless otherwise stated.'),
        '#attributes' => ['class' => ['form-disclaimer']],
      ];
    }

    array_unshift($step, $build);
  }
}

/**
 * Loop webform elements and add theming parameters for the desired elements.
 *
 * @param array $elements
 *   Build array for the elements that have to be altered.
 */
function _gent_base_loop_webform_elements(array &$elements) {
  $children = Element::children($elements);

  if ($children === ['elements']) {
    _gent_base_loop_webform_elements($elements['elements']);
    return;
  }

  foreach ($children as $key) {
    $element = &$elements[$key];
    if (!is_array($element) || !isset($element['#type'])) {
      continue;
    }

    _gent_base_loop_webform_elements_options($element);
    _gent_base_loop_webform_elements_options_other($element);
    _gent_base_loop_webform_elements_email_confirm($element);
    _gent_base_loop_webform_elements_datetime($element);
    _gent_base_loop_webform_elements_select_other($element);
    _gent_base_loop_webform_group($element);
  }
}

/**
 * Add template variables for option elements.
 *
 * @param array $element
 *   Build array a form element.
 */
function _gent_base_loop_webform_elements_options(array &$element) {
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
function _gent_base_loop_webform_elements_options_other(array &$element) {
  $optionTypes = ['webform_checkboxes_other', 'webform_radios_other'];
  if (!in_array($element['#type'], $optionTypes)) {
    return;
  }

  _gent_base_loop_webform_elements($element);

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
function _gent_base_loop_webform_elements_email_confirm(array &$element) {
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
function _gent_base_loop_webform_elements_datetime(array &$element) {
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
function _gent_base_loop_webform_elements_select_other(array &$element) {
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

  _gent_base_loop_webform_elements($element);
}
