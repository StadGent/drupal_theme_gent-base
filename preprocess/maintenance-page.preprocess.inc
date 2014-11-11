<?php
function gent_base_preprocess_maintenance_page(&$variables) {
  $variables['site_title'] = 'Gent.be';

  if (empty($variables['tabs']['#primary']) && empty($variables['tabs']['#secondary'])) {
    $variables['tabs'] = NULL;
  }


  $variables['header_image'] = NULL;
  if ($fid = variable_get('default_headerimage_fid')) {
    $file = file_load($fid);
    if ($file) {
      $variables['header_image'] = image_style_url('headerbanner', $file->uri);
    }
  }

  $base_theme = drupal_get_path('theme', 'gent_base');
  $variables['base_theme_path'] = base_path() . $base_theme . '/';
}
