<?php

/**
 * @file
 * Helper functions to support theming in the Gent Base theme.
 */

class ThemeHelper {

  /**
   * @param string $key the view mode key
   *
   * @return mixed
   */
  static function isViewMode($key) {
    return \Drupal::service('entity_type.manager')
      ->getStorage('entity_view_display')
      ->load($key);
  }
}
