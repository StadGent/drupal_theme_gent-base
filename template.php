<?php
/**
 * @file
 * Template file for the gent_base base theme.
 */

/**
 * Implements hook_css_alter().
 */
function gent_base_css_alter(&$css) {
  unset($css['modules/system/system.menus.css']);
  unset($css['modules/system/system.base.css']);
  unset($css['modules/system/system.messages.css']);
  unset($css['modules/system/system.theme.css']);
}


/**
 * Implements theme_preprocess_HOOK().
 */
function gent_base_preprocess_html(&$variables) {

  // Setup IE meta tag to force IE rendering mode
  drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
}

/**
 * Returns HTML for primary and secondary local tasks.
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
 * Returns a themed table for a file field
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
 * Returns a themed file link
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
