<?php

/**
 * Implements hook_preprocess_page().
 */
function gent_base_preprocess_page(&$variables) {
  // The default site title. This can be overwritten depending on a context (OG, ...)
  $variables['site_title'] = 'Gent.be';

  // Pass theme settings to page template.
  $variables['top_menu_render_method'] = theme_get_setting('top_menu_render_method');

  // Unset tabs variable if no primary or secondary tabs are defined.
  if (empty($variables['tabs']['#primary']) && empty($variables['tabs']['#secondary'])) {
    $variables['tabs'] = NULL;
  }
}
