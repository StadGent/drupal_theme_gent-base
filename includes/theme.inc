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
 *   Array containing the file_size, file_uri and file_type.
 *
 * @throws \Drupal\Core\TypedData\Exception\MissingDataException
 */
function _gent_base_get_entity_reference_file_data(&$variables, $field) {
  $data = [];

  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['elements']['#paragraph'];
  if (!$paragraph->hasField($field)) {
    return NULL;
  }
  /** @var \Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem|null $entity */
  $entity = $paragraph->get($field)->first();
  if (!$entity) {
    return NULL;
  }

  /** @var \Drupal\media\Entity\Media|null $media */
  $media = Media::load($entity->get('target_id')->getValue());
  if (!$media) {
    return NULL;
  }

  // Some Drupal 7 CTA's contained a link to an image (instead of a document).
  $file = NULL;
  if ($media->hasField('field_media_file')) {
    $file = $media->get('field_media_file')->getValue();
  }
  elseif ($media->hasField('field_media_image')) {
    $file = $media->get('field_media_image')->getValue();
  }
  if (empty($file[0]['target_id'])) {
    return NULL;
  }

  /** @var \Drupal\file\Entity\File|null $file_entity */
  $file_entity = File::load($file[0]['target_id']);
  if (!$file_entity) {
    return NULL;
  }

  $file_name = $file_entity->getFilename();

  $file_type = explode('.', $file_name);
  $file_type = end($file_type);
  $file_type = strtoupper($file_type);

  $data['file_size'] = format_size($file_entity->getSize());

  $wrapper = \Drupal::service('stream_wrapper_manager')->getViaUri($file_entity->getFileUri());
  if ($wrapper) {
    $data['file_uri'] = $wrapper->getExternalUrl();
  }
  $data['file_type'] = $file_type;

  return $data;
}

/**
 * Get desired display of the timeline, based on field_timeline_display.
 *
 * @param Drupal\paragraphs\Entity\Paragraph $entity
 *   The paragraph entity.
 *
 * @return string
 *   which display (timeline, program or roadmap) should be used.
 */
function _gent_base_get_timeline_display(Paragraph $entity) {
  return $entity->get('field_timeline_display')->value;
}
