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
  // General "alters" use a form id. Settings should not be set here. The only
  // thing useful about this is if you need to alter the form for the running
  // theme and *not* the theme setting. @see http://drupal.org/node/943212
  /*if (isset($form_id)) {
    return;
  }*/

  // TODO cool if check below is validated...
  /*$form['gent_base_enable_warning'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show a warning when gent_base is used directly'),
    '#description' => t('You can disable this warning message permanently, however, please be aware that gent_base is a base theme and should not be used directly. You should always create a sub-theme instead.'),
    '#default_value' => gent_base_theme_get_setting('gent_base_enable_warning', TRUE),
    '#weight' => -20,
    // Only show this checkbox on the gent_base theme settings page.
    '#access' => $GLOBALS['theme_key'] === 'gent_base',
  );*/

  // Only show these settings below for the subtheme.
  global $theme_key;
  if ($theme_key == 'gent_base') {
    return;
  }

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

  if (!empty($fid)) {
    $file = file_load($fid);

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
      manualcrop_croptool_process($form, $form_state, $form['headerimage']['default_headerimage_fid'], $file, array(
        'manualcrop_styles_mode' => 'include',
        'manualcrop_styles_list' => array('headerbanner' => 'headerbanner'),
        'manualcrop_require_cropping' => array('headerbanner' => 'headerbanner'),
      ));
      $form['#submit'][] = 'manualcrop_croptool_submit';
    }
  }

  // Work-around for this bug: https://drupal.org/node/1862892
  $theme_settings_path = drupal_get_path('theme', 'gent_base') . '/theme-settings.php';
  if (file_exists($theme_settings_path) && !in_array($theme_settings_path, $form_state['build_info']['files'])) {
    $form_state['build_info']['files'][] = $theme_settings_path;
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
  // Handle header image.
  if (!empty($form_state['values']['default_headerimage_fid'])) {
    $file = file_load($form_state['values']['default_headerimage_fid']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
      file_usage_add($file, 'gent_base_tools', 'headerimage', 1);
      variable_set('default_headerimage_fid', $file->fid);
    }
  }
  elseif ($old_fid = variable_get('default_headerimage_fid')) {
    if ($file = file_load($old_fid)) {
      file_delete($file);
    }
    variable_del('default_headerimage_fid');
  }
}
