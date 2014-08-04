<?php

/**
 * @file
 * Theme settings file for the Pierke base theme.
 */

require_once dirname(__FILE__) . '/template.php';

/**
 * Implements hook_form_FORM_alter().
 */
function pierke_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  // General "alters" use a form id. Settings should not be set here. The only
  // thing useful about this is if you need to alter the form for the running
  // theme and *not* the the me setting. @see http://drupal.org/node/943212
  if (isset($form_id)) {
    return;
  }

  if (variable_get('theme_' . $GLOBALS['theme_key'] . '_settings')) {
    // Alert the user that the theme settings are served from a variable.
    drupal_set_message(t('The settings for this theme are currently served from a variable. You might want to export them to your .info file.'), 'warning', FALSE);
  }

  $form['pierke_enable_warning'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show a warning when Pierke is used directly'),
    '#description' => t('You can disable this warning message permanently, however, please be aware that Pierke is a base theme and should not be used directly. You should always create a sub-theme instead.'),
    '#default_value' => pierke_theme_get_setting('pierke_enable_warning', TRUE),
    '#weight' => -20,
    // Only show this checkbox on the Pierke theme settings page.
    '#access' => $GLOBALS['theme_key'] === 'pierke',
  );

  // Include the template.php and theme-settings.php files for all the themes in
  // the theme trail.
  foreach (pierke_theme_trail() as $theme => $name) {
    $path = drupal_get_path('theme', $theme);

    $filename = DRUPAL_ROOT . '/' . $path . '/template.php';
    if (file_exists($filename)) {
      require_once $filename;
    }

    $filename = DRUPAL_ROOT . '/' . $path . '/theme-settings.php';
    if (file_exists($filename)) {
      require_once $filename;
    }
  }

  // Get the admin theme so we can set a class for styling this form.
  $admin = drupal_html_class(variable_get('admin_theme', $GLOBALS['theme']));
  $form['#prefix'] = '<div class="admin-theme-' . $admin . '">';
  $form['#suffix'] = '</div>';

  // Add some custom styling and functionality to our theme settings form.
  $form['#attached']['css'][] = drupal_get_path('theme', 'pierke') . '/css/pierke.admin.css';
  $form['#attached']['js'][] = drupal_get_path('theme', 'pierke') . '/js/pierke.admin.min.js';

  // Collapse all the core theme settings tabs in order to have the form actions
  // visible all the time without having to scroll.
  foreach (element_children($form) as $key) {
    if ($form[$key]['#type'] == 'fieldset') {
      $form[$key]['#collapsible'] = TRUE;
      $form[$key]['#collapsed'] = TRUE;
    }
  }

  if ($extensions = pierke_extensions(NULL, TRUE)) {
    $form['pierke'] = array(
      '#type' => 'vertical_tabs',
      '#weight' => -10,
    );

    // Load the theme settings for all enabled extensions.
    foreach ($extensions as $extension => $info) {
      $form['pierke'][$extension] = array(
        '#type' => 'fieldset',
        '#title' => $info['info']['name'],
        '#attributes' => array(
          'class' => array('pierke-extension'),
        ),
      );

      $errors = array();
      if (!empty($info['info']['dependencies'])) {
        foreach ($info['info']['dependencies'] as $dependency) {
          $dependency = drupal_parse_dependency($dependency);

          // Check if the module exists.
          if (!$module = system_get_info('module', $dependency['name'])) {
            $errors[] = t('This extension requires the @module module.', array(
              '@module' => ucwords(str_replace('_', ' ', $dependency['name'])),
            ));
          }
          // Check if the module version is compatible.
          elseif (($version = pierke_check_incompatibility($dependency, $module['version'])) !== NULL) {
            $errors[] = t('This extension requires @module @version. The currently installed version is @installed.', array(
              '@module' => $module['name'],
              '@version' => $version,
              '@installed' => !empty($module['version']) ? $module['version'] : t('undetermined'),
            ));
          }
        }

        if (!empty($errors)) {
          $form['pierke'][$extension]['errors'] = array(
            '#type' => 'item',
            '#title' => t('Missing requirements'),
            '#markup' => '<ul><li>' . implode('</li><li>', $errors) . '</li></ul>',
            '#weight' => -20,
            // Abuse the #name attribute to add a class to the form item.
            '#name' => 'pierke-requirements',
          );
        }
      }

      // Disable all options if there were any errors.
      $form['pierke'][$extension]['#disabled'] = !empty($errors) || variable_get('pierke_toggle_extension_' . $extension) !== NULL;

      $form['pierke'][$extension]['pierke_toggle_extension_' . $extension] = array(
        '#type' => 'checkbox',
        '#title' => t('Enable @extension extension', array('@extension' => $info['info']['name'])) . (variable_get('pierke_toggle_extension_' . $extension) !== NULL ? ' <span class="marker">(' . t('overridden') . ')</span>' : ''),
        '#description' => t('This setting can be overridden with an equally named variable (@name) so you can control it on a per-environment basis by setting it in your settings.php file.', array('@name' => 'pierke_toggle_extension_' . $extension)),
        '#default_value' => pierke_extension_enabled($extension),
        '#weight' => -10,
      );

      $element = array();

      // Load the implementation for this extensions and invoke the according
      // hook.
      $file = $info['path'] . '/' . $extension . '.settings.inc';
      if (is_file($file)) {
        require_once $file;
      }

      $function = $info['theme'] . '_extension_' . $extension . '_settings_form';
      if (function_exists($function)) {
        // By default, each extension resides in a vertical tab.
        $element = $function($element, $form, $form_state) + array(
          '#type' => 'fieldset',
          '#title' => t('@extension extension configuration', array('@extension' => $info['info']['name'])),
          '#description' => $info['info']['description'],
          '#attributes' => array(
            'class' => array('pierke-extension-settings')
          ),
          '#states' => array(
            'disabled' => array(
              'input[name="pierke_toggle_extension_' . $extension . '"]' => array('checked' => FALSE),
            ),
          ),
        );
      }

      drupal_alter('extension_' . $extension . '_settings_form', $element, $form, $form_state);

      if (element_children($element)) {
        // Append the extension form to the theme settings form if it has any
        // children.
        $form['pierke'][$extension]['settings'] = $element;
      }
    }
  }

  // Custom option for toggling the main content blog on the front page.
  $form['theme_settings']['pierke_toggle_front_page_content'] = array(
    '#type' => 'checkbox',
    '#title' => t('Front page content'),
    '#description' => t('Allow the main content block to be rendered on the front page.'),
    '#default_value' => pierke_theme_get_setting('pierke_toggle_front_page_content', TRUE),
  );

  // We need a custom form submit handler for processing some of the values.
  $form['#submit'][] = 'pierke_theme_settings_form_submit';

  // Store the extensions in an array so we can loop over them in the submit
  // callback.
  $form_state['extensions'] = array_keys($extensions);
}

/**
 * Form submit handler for the theme settings form.
 */
function pierke_theme_settings_form_submit($form, &$form_state) {
  // Clear the theme cache.
  $theme = $form_state['build_info']['args'][0];
  cache_clear_all('pierke:' . $theme . ':', 'cache', TRUE);

  // We also need to clear the static right away.
  drupal_static_reset('pierke_extensions');

  // Rebuild the theme registry. This has quite a performance impact but since
  // this only happens once after we (re-)saved the theme settings this is fine.
  // Also, this is actually required because we are caching certain things in
  // the theme registry.
  drupal_theme_rebuild();

  // We really don't want to reset theme settings for disabled extensions.
  foreach ($form_state['extensions'] as $extension) {
    if (!$form_state['values']['pierke_toggle_extension_' . $extension]) {
      _pierke_retain_extension_settings($form, $form_state, $extension, $theme);
    }
  }

  // This is a relict from the vertical tabs and should be removed so it doesn't
  // end up in the theme settings array.
  unset($form_state['values']['pierke__active_tab']);
}

/**
 * Helper function for retaining settings of an extension.
 */
function _pierke_retain_extension_settings($form, &$form_state, $extension, $theme, $parents = array()) {
  $current = array_merge(array('pierke', $extension, 'settings'), $parents);

  if ($items = drupal_array_get_nested_value($form, $current)) {
    foreach (element_children($items) as $key) {
      if (array_key_exists($key, $form_state['values'])) {
        $form_state['values'][$key] = pierke_theme_get_setting($key, NULL, $theme);
      }

      $next = array_merge($parents, array($key));
      _pierke_retain_extension_settings($form, $form_state, $extension, $theme, $next);
    }
  }
}
