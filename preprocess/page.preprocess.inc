<?php

/**
 * Implements hook_preprocess_page().
 */
function pierke_preprocess_page(&$variables) {
  //indien geen deelsite bekend, toon gewoon 'Gent.be'.
  $variables['deelsite_title'] = 'Gent.be';

  // Define inner styles
  $variables['inner_styles'] = array();

  // Default header image
  $headerimage_fid = variable_get('default_headerimage_fid');
  if ($headerimage_fid) {
    $headerimage_file = file_load($headerimage_fid);
    $image_uri = image_style_url('headerbanner', $headerimage_file->uri);
  }

  if (module_exists('gent_glue')) {
    // Define background-image for the intro-holder
    $deelsite_node = _gent_glue_active_template_site();
    if ($deelsite_node) {
      if (!empty($deelsite_node->field_header_image[LANGUAGE_NONE][0]['uri'])) {
        $image_uri = image_style_url('headerbanner', $deelsite_node->field_header_image[LANGUAGE_NONE][0]['uri']);
      }
      $variables['deelsite_title'] = $deelsite_node->title;
    }
  }

  if (!empty($image_uri)) {
    $variables['inner_styles']['intro-holder']['background-image'] = 'url(' . $image_uri . ')';
  }
}