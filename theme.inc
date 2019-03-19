<?php

/**
 * @file
 * Helper functions to support theming in the Gent Base theme.
 */

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
  foreach ($array as &$field) {
    if (is_array($field) && isset($field['#type'])) {
      if (in_array($field['#type'], [
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
      ])) {
        $input_count++;
      }
    }
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
  foreach ($form['elements'] as $key => &$step) {
    if ($key[0] === '#') {
      continue;
    }
    // Generate the markup.
    $html = '<h2>' . $step['#title'] . '</h2>';

    if (_gent_base_count_input_fields($step) > 0) {
      $html .= '<p class="form-disclaimer">' . t('Fill in all fields unless otherwise stated') . '</p>';
    }

    array_unshift($step, [
      '#markup' => $html,
      '#parents' => [],
    ]);
  }
}

/**
 * Loop webform elements and add theming parameters for the desired elements.
 *
 * @param array $elements
 *   Build array for the elements that have to be altered.
 */
function _gent_base_loop_webform_elements(array &$elements) {
  foreach ($elements as &$element) {
    if (!is_array($element) || !isset($element['#type'])) {
      continue;
    }

    switch ($element['#type']) {
      case 'checkboxes':
      case 'radios':
        $element['#has_columns'] = TRUE;
        foreach (array_keys($element['#options']) as $key) {
          $element[$key]['#parent_type'] = $element['#type'];
          $element[$key]['#in_fieldset'] = TRUE;
        }
        break;

      case 'webform_email_confirm':
        $element['#has_columns'] = TRUE;
        foreach ($element as $key => &$field) {
          if ($key[0] === '#') {
            continue;
          }

          $element[$key]['#parent_type'] = $element['#type'];
          $field['#in_fieldset'] = TRUE;
        }
        break;

      case 'webform_checkboxes_other':
      case 'webform_radios_other':
        _gent_base_loop_webform_elements($element);

        $element['#has_columns'] = TRUE;
        $element['other']['#parent_type'] = $element['#type'];
        $element['other']['#in_fieldset'] = TRUE;
        break;

      case 'datetime':
        $element['#has_row'] = TRUE;

        foreach (['date', 'time'] as $key) {
          $element[$key]['#stacked'] = TRUE;
        }
        break;

      case 'webform_select_other':
        $element['#has_columns'] = TRUE;
        $element['select']['#parent_type'] = $element['#type'];
        $element['select']['#in_fieldset'] = TRUE;
        $element['other']['#parent_type'] = $element['#type'];
        $element['other']['#in_fieldset'] = TRUE;

        break;

      case 'fieldset':
        _gent_base_loop_webform_elements($element);
        break;
    }
  }
}
