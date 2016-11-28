<?php

/**
 * @file
 * Process block function.
 */

/**
 * Implements hook_process_block().
 */
function gent_base_process_block(&$variables) {
  // Drupal 7 should use a $title variable instead of $block->subject.
  $variables['title'] = $variables['block']->subject;
}
