<?php

/**
 * @file
 * Helper functions to support theming in the Gent Base theme.
 */

use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\node\Entity\Node;

/**
 * Check to see if a give view mode exists.
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
 * Helper function to get the referenced entities on an outdoor location.
 *
 * @param mixed $item
 *   The item to get the referenced entities from.
 *
 * @return array|null
 *   The terms that are referenced.
 *
 * @throws \Drupal\Core\TypedData\Exception\MissingDataException
 */
function _gent_base_get_related_terrains($item) {
  // Get the related terrain node.
  $node = Node::load($item->id());
  if (!$node) {
    return;
  }

  $terms = [];

  // Get the park offer field value.
  $parkItems = $node->get('field_park_offer')->referencedEntities();
  $playgroundItems = $node->get('field_playground_offer')->referencedEntities();

  // Merge all items in one array.
  $terms = $parkItems + $playgroundItems;
  return $terms;
}

function _gent_base_get_timeline_display($entity) {
  $isProgram = $entity->get('field_timeline_as_program')->value;
  return ($isProgram === '1') ? 'alt' : 'normal';
}
