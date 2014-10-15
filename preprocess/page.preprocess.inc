<?php

/**
 * Implements hook_preprocess_page().
 */
function gent_base_preprocess_page(&$variables) {
  // The default site title. This can be overwritten depending on a context (OG, ...)
  $variables['site_title'] = 'Gent.be';

  $variables['top_menu_render_method'] = theme_get_setting('top_menu_render_method');
}
