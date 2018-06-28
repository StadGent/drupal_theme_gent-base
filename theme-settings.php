<?php

/**
 * @file
 * Theme settings of the Gent Base theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function gent_base_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  $form['gent_base'] = [
    '#type' => 'details',
    '#title' => t('Gent Base settings'),
    '#description' => t('All settings defined by the Gent Base styleguide.'),
    '#open' => TRUE,
  ];

  $form['gent_base']['color_scheme'] = [
    '#type' => 'textfield',
    '#title' => t('Style guide color scheme class'),
    '#default_value' => theme_get_setting('color_scheme'),
    '#field_prefix' => 'cs--',
    '#description' => t('Fill in the color scheme class to be used in your project, leave empty for the default color scheme.'),
  ];

  $form['gent_base']['typekit_id'] = [
    '#type' => 'textfield',
    '#title' => t('Adobe Typekit-ID'),
    '#default_value' => theme_get_setting('typekit_id'),
    '#description' => t('Fill in the Adobe Typekit-ID to be used in your project.'),
  ];
}
