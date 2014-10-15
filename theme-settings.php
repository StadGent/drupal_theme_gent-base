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

  // Only show this setting on the subtheme.
  if ($GLOBALS['theme_key'] !== 'gent_base') {
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
  }
}
