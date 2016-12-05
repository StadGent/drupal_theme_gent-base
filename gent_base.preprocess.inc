<?php

/**
 * @file
 * Preprocess functions for the Gent base theme.
 */

/**
 * Implements hook_preprocess_block().
 */
function gent_base_preprocess_block(&$variables) {
  if (!empty($variables['block_html_id'])) {
    $variables['attributes_array']['id'] = $variables['block_html_id'];
    $variables['attributes_array']['class'][] = preg_replace('/^block-/', 'block--', $variables['block_html_id']);
  }

  $css_module = drupal_clean_css_identifier($variables['block']->module);
  $variables['attributes_array']['class'] = preg_replace('/^block-' . $css_module . '$/', 'block--' . $css_module, $variables['attributes_array']['class']);
  $variables['attributes_array']['class'] = preg_replace('/^block-menu$/', 'block--menu', $variables['attributes_array']['class']);

  $variables['title_attributes_array']['class'][] = 'block__title';
  $variables['title_attributes_array']['class'][] = 'h1 hT';

  $variables['content_attributes_array']['class'][] = 'block__content';
}

/**
 * Implements hook_preprocess_field().
 */
function gent_base_preprocess_field(&$variables) {
  if (module_exists('sheet') && sheet_is_sheet_property($variables, 'gpdc')) {
    $variables['label_hidden'] = TRUE;
    $variables['label_display_css'] = 'none';
  }
}

/**
 * Implements theme_preprocess_HOOK().
 */
function gent_base_preprocess_html(&$variables) {
  // Setup IE meta tag to force IE rendering mode.
  drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');

  $base_theme = drupal_get_path('theme', 'gent_base');
  $variables['base_theme_path'] = base_path() . $base_theme . '/';

  // Selected scripts for the header scripts go here.
  drupal_add_js($base_theme . '/libraries/modernizr/modernizr.min.js', array(
    'scope' => 'head_scripts',
    'weight' => -1,
    'preprocess' => FALSE,
  ));

  // Include active theme as a class into the body.
  global $theme_key;
  $variables['classes_array'][] = $theme_key;

  // Set the large banner layout on some pages.
  $variables['classes_array'][] = gent_base_use_large_header() ? 'large-header' : 'small-header';

  // If Readspeaker button is enabled add a class to the body so we know...
  // eg. so it doesn't overlaps with breadcrumb.
  if (theme_get_setting('readspeaker_enabled')) {
    $variables['classes_array'][] = 'readspeaker--enabled';
  }

  // Merge classes array into attributes array.
  if (!empty($variables['classes_array'])) {
    if (!empty($variables['attributes_array']['class'])) {
      $variables['attributes_array']['class'] = array_merge($variables['attributes_array']['class'], $variables['classes_array']);
      $variables['attributes_array']['class'] = array_unique($variables['attributes_array']['class']);
    }
    else {
      $variables['attributes_array']['class'] = $variables['classes_array'];
    }
  }
}


/**
 * Implements hook_preprocess_page().
 */
function gent_base_preprocess_page(&$variables) {
  // The default site title. This can be overwritten depending on a context
  // (OG, ...).
  $variables['site_title'] = 'Stad.gent';

  // Unset tabs variable if no primary or secondary tabs are defined.
  if (empty($variables['tabs']['#primary']) && empty($variables['tabs']['#secondary'])) {
    $variables['tabs'] = NULL;
  }

  // Header image.
  $variables['header_image'] = NULL;
  switch (theme_get_setting('header_image_behavior')) {
    // Only show the header image on the front page.
    case GENT_BASE_HEADER_IMAGE_SHOW_FRONT_PAGE:
      if (!empty($variables['is_front'])) {
        $variables['header_image'] = gent_base_get_header_image();
      }
      break;

    // Always show the header image.
    case GENT_BASE_HEADER_IMAGE_SHOW:
      $variables['header_image'] = gent_base_get_header_image();
      break;
  }

  if ($variables['header_image']) {
    $variables['header_image']['#alt'] = t('Header image');
    $variables['header_image']['#title'] = theme_get_setting('header_image_caption');
  }

  // Add classes to content / sidebar if sidebar is available.
  if (!empty($variables['page']['sidebar'])) {
    $variables['page']['content']['#sidebar'] = TRUE;
    $variables['page']['sidebar']['#sidebar'] = TRUE;
  }

  // Add a breadcrumb on the error pages.
  $header = drupal_get_http_header('Status');
  if ($header == '404 Not Found' || $header == '403 Forbidden') {
    $front = l(t('Home'), '<front>');
    drupal_set_breadcrumb(array($front));
  }

  // Any implementing subtheme should define the conditions for using top tabs
  // instead of normal tabs. This permission is added by gent base tools.
  $variables['top_tabs_enabled'] = user_access('use tabs in top menu');

  // Load jquery.sticky library (if exists).
  if (module_exists('libraries') && $lib = libraries_get_path('jquery.sticky')) {
    if (file_exists($lib . '/jquery.sticky.min.js')) {
      drupal_add_js($lib . '/jquery.sticky.min.js');
    }
    else {
      drupal_add_js($lib . '/jquery.sticky.js');
    }
  }

  // Remove the Readspeaker button if not explicitly enabled by theme.
  // info file: "settings[readspeaker_enabled] = 1".
  if (isset($variables['readspeaker'])) {
    if (!theme_get_setting('readspeaker_enabled')) {
      $variables['readspeaker'] = NULL;
    }
  }
}

/**
 * Implements hook_preprocess_region().
 */
function gent_base_preprocess_region(&$variables) {
  $name = $variables['elements']['#region'];

  if ($name == 'content') {
    if (!empty($variables['elements']['#sidebar'])) {
      $variables['classes_array'][] = 'l-primary';
    }
  }
  elseif ($name == 'sidebar') {
    if (!empty($variables['elements']['#sidebar'])) {
      $variables['classes_array'][] = 'l-secondary';
    }
  }
}

/**
 * Implements hook_preprocess_maintenance_page().
 */
function gent_base_preprocess_maintenance_page(&$variables) {
  $variables['site_title'] = 'Stad.gent';

  if (empty($variables['tabs']['#primary']) && empty($variables['tabs']['#secondary'])) {
    $variables['tabs'] = NULL;
  }

  $base_theme = drupal_get_path('theme', 'gent_base');
  $variables['base_theme_path'] = base_path() . $base_theme . '/';
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gent_base_preprocess_views_view(&$variables) {
  // When we set multi-column as class, we force the use of the multicolumn
  // template wich adds a data attribute for salvattore.
  if (strpos($variables['css_class'], 'multi-column') !== FALSE) {
    $variables['theme_hook_suggestion'] = 'views_view__multicolumn';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gent_base_preprocess_views_view_summary_unformatted(&$variables) {
  $active_item = !empty($variables['view']->original_args) ? reset($variables['view']->original_args) : NULL;

  // Prepend an All link on the first position.
  $link = new StdClass();
  $link->url = 'all';
  $link->title_truncated = $link->link = t('All');
  $variables['rows'][-1] = $link;
  ksort($variables['rows']);

  if ($active_item) {
    if ($active_item == 'all') {
      $variables['row_classes'][-1] = 'active';
      return;
    }
    foreach ($variables['rows'] as $id => $row) {
      if (strcasecmp($active_item, $variables['rows'][$id]->title_truncated) == 0) {
        $variables['row_classes'][$id] = 'active';
        break;
      }
    }
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gent_base_preprocess_gent_auth_bar(&$variables) {
  if (empty($variables['block']) && variable_get('gent_auth_bar_sticky', TRUE)) {
    $variables['classes'][] = 'sticky-1';
  }
}

/**
 * Overrides hook_preprocesss_HOOK().
 */
function gent_base_preprocess_entity_property(&$variables) {
  if (module_exists('sheet') && sheet_is_sheet_property($variables, 'gpdc')) {
    $element = $variables['elements'];
    $property = $element['#entity_wrapped']->{$element['#property_name']};

    // Include the theme hook suggestion.
    $path = __DIR__ . '/../theme/entity-property--sheet--gpdc--' . str_replace('_', '-', $element['#property_name']) . '.theme.inc';
    if (is_file($path)) {
      require_once $path;
    }
    switch ($element['#property_name']) {
      case 'gent_regulations':
        $variables['attributes_array']['id'] = 'sheet-regulatory';
        break;

      case 'form_url':
        $variables['content'] = l(t('Go to the webform'), $property->value());
        break;

      case 'organisations':
        // Get the location nodes.
        $query = new EntityFieldQuery();
        $result = $query->entityCondition('entity_type', 'node')
          ->entityCondition('bundle', 'location')
          ->fieldCondition('field_vesta_id', 'value', $property->value())
          ->execute();

        $variables['content'] = '';
        if (!empty($result['node'])) {
          $nodes = node_load_multiple(array_keys($result['node']));
          $rendered_nodes = array();
          node_view_multiple($nodes);
          foreach ($nodes as $node) {
            $node_view = node_view($node, 'teaser');
            $rendered_nodes[] = render($node_view);
          }
          $variables['content'] = theme('item_list', array(
            'items' => $rendered_nodes,
            'hide_wrapper' => TRUE,
            'attributes' => array('class' => array('link-list')),
          ));
        }
        $variables['attributes_array']['class'] = array('island island--kappa no-border-bottom');

        $variables['label'] = t('Contacts');
        break;

      case 'attachments':
        $variables['items'] = array_map('get_object_vars', $property->value());
        $variables['attributes_array']['class'] = array('island island--kappa no-border-bottom');
        break;

      case 'forms':
        $variables['content'] = array();

        foreach ($property->value() as $file) {
          $content = '<span class="article-content-action-document">' . l($file->filename, file_create_url($file->uri)) . '</span> ';
          $content .= '<span class="small article-content-action-document-size">(' . format_size($file->filesize) . ')</span>' . "\n";
          $variables['content'][] = $content;
        }
        break;

      case 'gbos_products':

        $variables['label'] = '';
        $variables['content'] = '';
        $data = $property->value();

        try {
          if (module_exists('gent_gbos')) {
            $provider = new GbosDrupalDataProvider();
            $products = $provider->getProductsOptions();

            $appointment_base_path = 'mijn-gent/afspraak/maken';
            $variables['content'] = array();

            foreach ($data as $product_id) {
              if (isset($products[$product_id])) {
                $content = '<span class="article-content-action-appointment">' . l($products[$product_id], sprintf($appointment_base_path . '/%d', $product_id)) . '</span>';
                $variables['content'][] = $content;
              }
            }
          }
        }
        catch (Exception $e) {
          $variables['content'] = t('Error loading appointments.');
        }
        break;
    }
  }
}
