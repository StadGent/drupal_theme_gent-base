<?php
/**
 * ThemeHelper Class Doc Comment
 *
 * @category Class
 * @package  gent_base
 * @author   Bart Delrue
 *
 */
class ThemeHelper {

  /**
   * @param string $key
   *   The view mode key.
   *
   * @return mixed
   */
  public static function isViewMode($key) {
    return \Drupal::service('entity_type.manager')
      ->getStorage('entity_view_display')
      ->load($key);
  }

}
