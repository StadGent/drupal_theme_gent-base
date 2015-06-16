<?php
/**
 * @file
 * Theme settings file for the gent_base base theme.
 */

require_once dirname(__FILE__) . '/template.php';

/**
 * Implements hook_form_FORM_alter().
 */
function gent_base_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  // Only show these settings for the subtheme.
  if ($GLOBALS['theme_key'] == 'gent_base') {
    return;
  }

  // Leave if we've been here before.
  if (isset($form['#submit']) && in_array('gent_base_form_system_theme_settings_submit', $form['#submit'])) {
    return;
  }

  // Make sure this file is loaded during form processing.
  $form_state['build_info']['files']['gent_base'] = drupal_get_path('theme', 'gent_base') . '/theme-settings.php';

  // Top menu render method.
  $form['theme_settings']['#access'] = TRUE;
  $form['theme_settings']['top_menu_render_method'] = array(
    '#type' => 'select',
    '#title' => t('Render top menu'),
    '#options' => array(
      GENT_BASE_TOP_MENU_RENDER_METHOD_EMPTY => t('Leave empty'),
      GENT_BASE_TOP_MENU_RENDER_METHOD_REGION => t('Try to render @region region', array('@region' => 'top_menu')),
      GENT_BASE_TOP_MENU_RENDER_METHOD_USER_LINKS => t('Render custom user links'),
    ),
    '#default_value' => theme_get_setting('top_menu_render_method'),
    '#access' => $GLOBALS['theme_key'] !== 'gent_base',
  );


  // Header image.
  $fid = variable_get('default_headerimage_fid');
  if (!empty($form_state['values']['default_headerimage_fid'])) {
    $fid = $form_state['values']['default_headerimage_fid'];
  }

  $form['headerimage'] = array(
    '#type' => 'fieldset',
    '#title' => t('Header image'),
    '#description' => t('This image will be shown as the default header image.'),
  );

  $form['headerimage']['default_headerimage_fid'] = array(
    '#type' => 'managed_file',
    '#default_value' => variable_get('default_headerimage_fid'),
    '#upload_location' => 'public://',
    '#upload_validators'  => array('file_validate_extensions' => array('png gif jpg')),
  );

  if (!empty($fid) && $file = file_load($fid)) {
    $form['headerimage']['default_headerimage_fid']['preview'] = array(
      '#markup' => theme('image_style', array(
        'style_name' => 'thumbnail',
         'path' => $file->uri,
        'alt' => t('Preview'),
      )),
    );

    // @see manualcrop_default_widget_settings().
    // Add the crop tool and submit handler.
    if (module_exists('manualcrop')) {
      $styles = drupal_map_assoc(array('headerbanner', 'headerbanner_large'));
      manualcrop_croptool_process($form, $form_state, $form['headerimage']['default_headerimage_fid'], $file, array(
        'manualcrop_styles_mode' => 'include',
        'manualcrop_styles_list' => $styles,
        'manualcrop_require_cropping' => $styles,
      ));
      $form['#submit'][] = 'manualcrop_croptool_submit';
    }
  }

  $form['#submit'][] = 'gent_base_form_system_theme_settings_submit';
}

/**
 * Extra system theme settings form submit handler.
 *
 * @param array $form
 *   The form.
 * @param array $form_state
 *   The form object.
 */
function gent_base_form_system_theme_settings_submit($form, &$form_state) {
  $fid_old = variable_get('default_headerimage_fid');
  $fid_new = (!empty($form_state['values']['default_headerimage_fid']) ? $form_state['values']['default_headerimage_fid'] : NULL);

  if ($fid_new != $fid_old) {
    if ($fid_new) {
      $file = file_load($fid_new);

      if (!$file->status) {
        $file->status = FILE_STATUS_PERMANENT;
        file_save($file);
      }

      file_usage_add($file, 'gent_base_tools', 'headerimage', 1);
      variable_set('default_headerimage_fid', $file->fid);
    }

    if ($fid_old) {
      if ($file = file_load($fid_old)) {
        file_usage_delete($file, 'gent_base_tools', 'headerimage');
        file_delete($file);
      }

      if (!$fid_new) {
        variable_del('default_headerimage_fid');
      }
    }
  }
}
