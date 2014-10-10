<?php
/**
 * @file
 * Template file for the gent_base base theme.
 */

// @TODO store this in the theme registry like omega does with OmegaThemeRegistryHandler
include_once 'preprocess/block.preprocess.inc';
include_once 'preprocess/field.preprocess.inc';
include_once 'preprocess/html.preprocess.inc';
include_once 'preprocess/page.preprocess.inc';
include_once 'preprocess/views.preprocess.inc';
include_once 'preprocess/entity-property.preprocess.inc';

/**
 * Implements hook_css_alter().
 */
function gent_base_css_alter(&$css) {
  $whitelist = array(
    'modules/contextual/contextual.css',
  );
  $whitelist = array_combine($whitelist, $whitelist);
  drupal_alter('gent_base_css_whitelist', $whitelist);

  foreach ($css as $key => $data) {
    if ($data['type'] == 'file') {
      // Skip css files in whitelist.
      if (in_array($data['data'], $whitelist)) {
        continue;
      }
      // Remove css files from core modules.
      $is_core = (strpos($data['data'], 'modules/') === 0);
      if ($is_core) {
        unset($css[$key]);
      }
    }
  }
}

/**
 * Implements theme_menu_local_tasks().
 *
 * @ingroup themeable
 */
function gent_base_menu_local_tasks(&$variables) {
  $output = '';
  if (!empty($variables['primary'])) {
    //$variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<ul class="tabs primary tabs--primary links--inline">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    //$variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs secondary tabs--secondary links--inline">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }
  return $output;
}


/**
 * Implements theme_file_formatter_table().
 *
 * @ingroup themeable
 */
function gent_base_file_formatter_table($variables) {
  $rows = array();
  foreach ($variables['items'] as $delta => $item) {
    $formatted_filesize = array(
      'data' => format_size($item['filesize']),
      'class' => array('align-right')
    );
    $rows[] = array(
      theme('file_link', array('file' => (object) $item)),
      $formatted_filesize,
    );
  }

  return empty($rows) ? '' : theme('table', array('rows' => $rows));
}

/**
 * Implements theme_file_link().
 *
 * @ingroup themeable
 */
function gent_base_file_link($variables) {
  $file = $variables['file'];

  $url = file_create_url($file->uri);
  $pathinfo = pathinfo($url);
  $extension = $pathinfo['extension'];

  // Set options as per anchor format described at
  // http://microformats.org/wiki/file-format-examples
  $options = array(
    'attributes' => array(
    'type' => $file->filemime . '; length=' . $file->filesize,
    ),
  );

  // Use the description as the link text if available.
  if (empty($file->description)) {
    $link_text = $file->filename;
  }
  else {
    $link_text = $file->description;
    $options['attributes']['title'] = check_plain($file->filename);
  }

  return l($link_text, $url, $options) . ' <span class="file-type">' . $extension . '</span>';
}
