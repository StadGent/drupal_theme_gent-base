<?php

/**
 * Implements theme_preprocess_HOOK().
 */
function gent_base_preprocess_html(&$variables) {
  // Setup IE meta tag to force IE rendering mode.
  drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
}
