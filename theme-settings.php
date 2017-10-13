<?php

/**
 * @file
 * Theme settings file for the gent base theme.
 */

require_once dirname(__FILE__) . '/template.php';

/**
 * Implements hook_form_FORM_alter().
 */
function gent_base_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {

  $form['type_kit_id'] = [
    '#type' => 'textfield',
    '#title' => t('Adobe Typekit-ID'),
    '#default_value' => theme_get_setting('typekit_id'),
    '#description' => t('Fill in the Adobe Typekit-ID to be used in your project'),
  ];

  // Only show these settings for the subtheme.
  if ($GLOBALS['theme_key'] == 'gent_base') {
    return;
  }

  // Based on header_image behavior: provide header image upload & caption text.
  // Stop here if header image is never shown.
  if (theme_get_setting('header_image_behavior') === GENT_BASE_HEADER_IMAGE_HIDE) {
    return;
  }

  // Make sure this file is loaded during form processing.
  $form_state['build_info']['files']['gent_base'] = drupal_get_path('theme', 'gent_base') . '/theme-settings.php';

  // Header image.
  $fid = theme_get_setting('headerimage_fid');
  if (!empty($form_state['values']['headerimage_upload'])) {
    $fid = $form_state['values']['headerimage_upload'];
  }

  $form['headerimage'] = array(
    '#type' => 'fieldset',
    '#title' => t('Header image'),
    '#description' => t('This image will be shown as the default header image.'),
  );

  $form['headerimage']['headerimage_upload'] = array(
    '#type' => 'managed_file',
    '#title' => t('Upload header image'),
    '#maxlength' => 40,
    '#default_value' => theme_get_setting('headerimage_fid'),
    '#upload_location' => 'public://',
    '#upload_validators'  => array('file_validate_is_image' => array()),
  );

  $form['headerimage']['headerimage_fid'] = array(
    '#type' => 'value',
    '#value' => theme_get_setting('headerimage_fid'),
  );

  if (!empty($fid) && $file = file_load($fid)) {
    $form['headerimage']['headerimage_upload']['preview'] = array(
      '#markup' => theme('image_style', array(
        'style_name' => 'thumbnail',
        'path' => $file->uri,
        'alt' => t('Preview'),
      )),
    );

    // @see manualcrop_default_widget_settings().
    // Add the crop tool and submit handler.
    if (module_exists('manualcrop') && $styles = theme_get_setting('header_image_styles')) {
      $styles = drupal_map_assoc($styles);
      manualcrop_croptool_process($form, $form_state, $form['headerimage']['headerimage_upload'], $file, array(
        'manualcrop_styles_mode' => 'include',
        'manualcrop_styles_list' => $styles,
        'manualcrop_require_cropping' => $styles,
      ));
      $form['#submit'][] = 'manualcrop_croptool_submit';
    }
  }

  $form['headerimage']['header_image_caption'] = array(
    '#type' => 'textfield',
    '#title' => t('Header image caption'),
    '#description' => t('Provides a caption text below the header image.'),
    '#default_value' => theme_get_setting('header_image_caption'),
  );

  $form['#submit'][] = 'gent_base_form_system_theme_settings_submit';
}

/**
 * Form submit handler; system theme settings form.
 *
 * @param array $form
 *   The form array.
 * @param array $form_state
 *   The form_state array.
 */
function gent_base_form_system_theme_settings_submit($form, &$form_state) {
  $fid_old = !empty($form_state['values']['headerimage_fid']) ? $form_state['values']['headerimage_fid'] : NULL;
  $fid_new = !empty($form_state['values']['headerimage_upload']) ? $form_state['values']['headerimage_upload'] : NULL;

  // We don't need to store the theme setting for headerimage upload.
  unset($form_state['values']['headerimage_upload']);

  if ($fid_new != $fid_old) {
    // Copy the headerimage upload fid over the existing headerimage fid.
    $form_state['values']['headerimage_fid'] = $fid_new;

    if ($fid_new) {
      $file = file_load($fid_new);

      if ($file->status != FILE_STATUS_PERMANENT) {
        $file->status = FILE_STATUS_PERMANENT;
        file_save($file);
        file_usage_add($file, 'gent_base_tools', 'headerimage', 1);
      }
    }

    if ($fid_old) {
      if ($file = file_load($fid_old)) {
        file_usage_delete($file, 'gent_base_tools', 'headerimage');
        file_delete($file);
      }
    }
  }
}
