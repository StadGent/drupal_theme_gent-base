<?php

/**
 * Implements hook_preprocess_page().
 */
function gent_base_preprocess_page(&$variables) {

  // The default site title. This can be overwritten depending on a context (OG, ...)
  $variables['site_title'] = 'Gent.be';

  // The default header image can be overridden here, by setting the header_image to styled image.
  // This could be easily set by using the gent headerimage module.
  if (!$variables['header_image']) {
    $variables['header_image'] = NULL;
  }

}
