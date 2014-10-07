<?php


/**
 * @file
 * Template overrides and (pre-)process hooks for the Omega base theme.
 */

require_once dirname(__FILE__) . '/includes/gent_base.inc';
require_once dirname(__FILE__) . '/includes/scripts.inc';


// TODO consider refactor to omega's auto-discover files.
//require_once dirname(__FILE__) . '/preprocess/html.preprocess.inc';
//require_once dirname(__FILE__) . '/preprocess/page.preprocess.inc';
//require_once dirname(__FILE__) . '/preprocess/views.preprocess.inc';
//require_once dirname(__FILE__) . '/preprocess/block.preprocess.inc';
//require_once dirname(__FILE__) . '/process/block.process.inc';
//require_once dirname(__FILE__) . '/process/views.process.inc';
//require_once dirname(__FILE__) . '/process/page.process.inc';

// Include the main extension file for every enabled extension.
foreach (gent_base_extensions() as $extension => $info) {
  if (gent_base_extension_enabled($extension) && ($file = $info['path'] . '/' . $extension . '.inc') && is_file($file)) {
    require_once $file;
  }
}


/**
 * @file
 * Template file for the gent_base base theme.
 */

/**
 * Implements hook_element_info_alter().
 */
function gent_base_element_info_alter(&$elements) {
  $elements['scripts'] = array(
    '#items' => array(),
    '#pre_render' => array('gent_base_pre_render_scripts'),
    '#group_callback' => 'gent_base_group_js',
    '#aggregate_callback' => 'gent_base_aggregate_js',
  );
}

/**
 * Implements hook_css_alter().
 */
function gent_base_css_alter(&$css) {
  $gent_base = drupal_get_path('theme', 'gent_base');

  // The CSS_SYSTEM aggregation group doesn't make any sense. Therefore, we are
  // pre-pending it to the CSS_DEFAULT group. This has the same effect as giving
  // it a separate (low-weighted) group but also allows it to be aggregated
  // together with the rest of the CSS.
  foreach ($css as &$item) {
    if ($item['group'] == CSS_SYSTEM) {
      $item['group'] = CSS_DEFAULT;
      $item['weight'] = $item['weight'] - 100;
    }
  }

  // Clean up core and contrib module CSS.
  $overrides = array(
    'aggregator' => array(
      'aggregator.css' => array(
        'theme' => 'aggregator.theme.css',
      ),
      'aggregator-rtl.css' => array(
        'theme' => 'aggregator.theme-rtl.css',
      ),
    ),
    'block' => array(
      'block.css' => array(
        'admin' => 'block.admin.css',
        'demo' => 'block.demo.css',
      ),
    ),
    'book' => array(
      'book.css' => array(
        'theme' => 'book.theme.css',
        'admin' => 'book.admin.css',
      ),
      'book-rtl.css' => array(
        'theme' => 'book.theme-rtl.css',
      ),
    ),
    'color' => array(
      'color.css' => array(
        'admin' => 'color.admin.css',
      ),
      'color-rtl.css' => array(
        'admin' => 'color.admin-rtl.css',
      ),
    ),
    'comment' => array(
      'comment.css' => array(
        'theme' => 'comment.theme.css',
      ),
      'comment-rtl.css' => array(
        'theme' => 'comment.theme-rtl.css',
      ),
    ),
    'contextual' => array(
      'contextual.css' => array(
        'base' => 'contextual.base.css',
        'theme' => 'contextual.theme.css',
      ),
      'contextual-rtl.css' => array(
        'base' => 'contextual.base-rtl.css',
        'theme' => 'contextual.theme-rtl.css',
      ),
    ),
    'field' => array(
      'theme/field.css' => array(
        'theme' => 'field.theme.css',
      ),
      'theme/field-rtl.css' => array(
        'theme' => 'field.theme-rtl.css',
      ),
    ),
    'field_ui' => array(
      'field_ui.css' => array(
        'admin' => 'field_ui.admin.css',
      ),
      'field_ui-rtl.css' => array(
        'admin' => 'field_ui.admin-rtl.css',
      ),
    ),
    'file' => array(
      'file.css' => array(
        'theme' => 'file.theme.css',
      ),
    ),
    'filter' => array(
      'filter.css' => array(
        'theme' => 'filter.theme.css',
      ),
    ),
    'forum' => array(
      'forum.css' => array(
        'theme' => 'forum.theme.css',
      ),
      'forum-rtl.css' => array(
        'theme' => 'forum.theme-rtl.css',
      ),
    ),
    'image' => array(
      'image.css' => array(
        'theme' => 'image.theme.css',
      ),
      'image-rtl.css' => array(
        'theme' => 'image.theme-rtl.css',
      ),
      'image.admin.css' => array(
        'admin' => 'image.admin.css',
      ),
    ),
    'locale' => array(
      'locale.css' => array(
        'admin' => 'locale.admin.css',
      ),
      'locale-rtl.css' => array(
        'admin' => 'locale.admin-rtl.css',
      ),
    ),
    'openid' => array(
      'openid.css' => array(
        'base' => 'openid.base.css',
        'theme' => 'openid.theme.css',
      ),
      'openid-rtl.css' => array(
        'base' => 'openid.base-rtl.css',
        'theme' => 'openid.theme-rtl.css',
      ),
    ),
    'poll' => array(
      'poll.css' => array(
        'admin' => 'poll.admin.css',
        'theme' => 'poll.theme.css',
      ),
      'poll-rtl.css' => array(
        'theme' => 'poll.theme-rtl.css',
      ),
    ),
    'search' => array(
      'search.css' => array(
        'theme' => 'search.theme.css',
      ),
      'search-rtl.css' => array(
        'theme' => 'search.theme-rtl.css',
      ),
    ),
    'system' => array(
      'system.base.css' => array(
        'base' => 'system.base.css',
      ),
      'system.base-rtl.css' => array(
        'base' => 'system.base-rtl.css',
      ),
      'system.theme.css' => array(
        'theme' => 'system.theme.css',
      ),
      'system.theme-rtl.css' => array(
        'theme' => 'system.theme-rtl.css',
      ),
      'system.admin.css' => array(
        'admin' => 'system.admin.css',
      ),
      'system.admin-rtl.css' => array(
        'admin' => 'system.admin-rtl.css',
      ),
      'system.menus.css' => array(
        'theme' => 'system.menus.theme.css',
      ),
      'system.menus-rtl.css' => array(
        'theme' => 'system.menus.theme-rtl.css',
      ),
      'system.messages.css' => array(
        'theme' => 'system.messages.theme.css',
      ),
      'system.messages-rtl.css' => array(
        'theme' => 'system.messages.theme-rtl.css',
      ),
    ),
    'taxonomy' => array(
      'taxonomy.css' => array(
        'admin' => 'taxonomy.admin.css',
      ),
    ),
    'user' => array(
      'user.css' => array(
        'base' => 'user.base.css',
        'admin' => 'user.admin.css',
        'theme' => 'user.theme.css',
      ),
      'user-rtl.css' => array(
        'admin' => 'user.admin-rtl.css',
        'theme' => 'user.theme-rtl.css',
      ),
    ),
  );

  // Check if we are on an admin page. Otherwise, we can skip admin CSS.
  $path = current_path();
  $types = path_is_admin($path) ? array('base', 'theme', 'admin') : array('base', 'theme');
  // Add a special case for the block demo page.
  $types = strpos($path, 'admin/structure/block/demo') === 0 ? array_merge($types, array('demo')) : $types;

  // Override module provided CSS with clean and modern alternatives provided
  // by gent_base.
  foreach ($overrides as $module => $files) {
    // We gathered the CSS files with paths relative to the providing module.
    $path = drupal_get_path('module', $module);

    foreach ($files as $file => $items) {
      if (isset($css[$path . '/' . $file])) {
        // Keep a copy of the original file array so we can merge that with our
        // overrides in order to keep the 'weight' and 'group' declarations.
        $original = $css[$path . '/' . $file];
        unset($css[$path . '/' . $file]);

        // gent_base 4.x tries to follow the pattern described in
        // http://drupal.org/node/1089868 for declaring CSS files. Therefore, it
        // may take more than a single file to override a .css file added by
        // core. This gives us better granularity when overriding .css files
        // in a sub-theme.
        foreach ($types as $type) {
          if (isset($items[$type])) {
            $css[$gent_base . '/css/modules/' . $module . '/' . $items[$type]] = array(
              'data' => $gent_base . '/css/modules/' . $module . '/' . $items[$type],
            ) + $original;
          }
        }
      }
    }
  }

  // Exclude CSS files as declared in the theme settings.
  if (gent_base_extension_enabled('assets')) {
    gent_base_css_js_alter($css, 'css');
  }

  // Allow themes to specify no-query fallback CSS files.
  require_once "$gent_base/includes/assets.inc";
  $mapping = gent_base_assets_generate_mapping($css);
  foreach (preg_grep('/\.no-query(-rtl)?\.css$/', $mapping) as $key => $fallback) {
    // Don't modify browser settings if they have already been modified.
    if ($css[$key]['browsers']['IE'] === TRUE && $css[$key]['browsers']['!IE'] === TRUE) {
      $css[$key]['browsers'] = array(
        '!IE' => FALSE,
        'IE' => 'lte IE 8',
      );

      // Make sure that we don't break any CSS aggregation groups.
      $css[$key]['weight'] += 100;
    }
  }

  // When using gent_base_livereload force CSS to be added with link tags, rather
  // than @import. This prevents Chrome from crashing when using the inspector
  // while livereload is enabled.
  if (gent_base_extension_enabled('development') && gent_base_theme_get_setting('gent_base_livereload', TRUE)) {
    foreach ($css as $key => $value) {
      $css[$key]['preprocess'] = FALSE;
    }
  }
}

/**
 * Implements hook_js_alter().
 */
function gent_base_js_alter(&$js) {
  // In some cases the element info array might get built before the theme
  // system is fully bootstrapped. In this case, gent_base_element_info_alter() will
  // never get called causing custom gent_base pre-rendering of scripts to be
  // skipped which results in no JavaScript being output.
  if (!element_info('scripts')) {
    drupal_static_reset('element_info');
  }

  // If the AJAX.js isn't included... we don't need the ajaxPageState settings!
  if (!isset($js['misc/ajax.js']) && isset($js['settings']['data'])) {
    foreach ($js['settings']['data'] as $delta => $setting) {
      if (array_key_exists('ajaxPageState', $setting)) {
        if (count($setting) == 1) {
          unset($js['settings']['data'][$delta]);
        }
        else {
          unset($js['settings']['data'][$delta]['ajaxPageState']);
        }
      }
    }
  }

  if (!gent_base_extension_enabled('assets')) {
    return;
  }

  gent_base_css_js_alter($js, 'js');

  // Move the specified JavaScript files to the footer.
  if (($footer = gent_base_theme_get_setting('gent_base_js_footer')) && is_array($footer)) {
    require_once drupal_get_path('theme', 'gent_base') . '/includes/assets.inc';
    if (!$cache = cache_get("gent_base:{$GLOBALS['theme_key']}:footer")) {
      // Explode and trim the values for the footer rules.
      $steps = gent_base_assets_regex_steps($footer);

      cache_set("gent_base:{$GLOBALS['theme_key']}:footer", $steps, 'cache', CACHE_TEMPORARY);
    }
    else {
      $steps = $cache->data;
    }

    $mapping = gent_base_assets_generate_mapping($js);
    foreach (gent_base_assets_regex_execute($mapping, $steps) as $key => $match) {
      $js[$key]['scope'] = 'footer';
    }
  }
}

/**
 * Implements hook_form_alter().
 */
function gent_base_form_alter(&$form, &$form_state, $form_id) {
  // Duplicate the form ID as a class so we can reduce specificity in our CSS.
  $form['#attributes']['class'][] = drupal_clean_css_identifier($form['#id']);
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function gent_base_form_field_ui_display_overview_form_alter(&$form, &$form_state, $form_id) {
  // Add a class to use as a styling hook, instead of the ID attribute.
  $form['fields']['#attributes']['class'][] = 'field-display-overview';
}

/**
 * Implements hook_theme().
 */
function gent_base_theme($cache, &$type, $theme, $path) {
  // This is actually totally evil but it's the only way to force Drupal into
  // looking up (pre-)process hooks as if this was a module. In all seriousness
  // this is actually fixing something that I consider a Drupal core bug as it
  // prevents sub-themes from altering the behavior of a base-theme provided
  // theme hook as they are not allowed to provide (pre-)process hooks for it.
  $type = 'module';

  $info['gent_base_chrome'] = array(
    'render element' => 'element',
  );

  $info['gent_base_page_layout'] = array(
    'base hook' => 'page',
  );

  $info = array_merge($info, _gent_base_theme_layouts());

  return $info;
}

/**
 * Helper function for registering theme hooks for gent_base layouts.
 */
function _gent_base_theme_layouts() {
  $info = array();

  foreach (gent_base_layouts_info() as $layout) {
    $hook = str_replace('-', '_', $layout['template']);
    $info[$hook] = array(
      'template' => $layout['template'],
      'path' => $layout['path'],
    );
  }

  return $info;
}

/**
 * Implements hook_theme_registry_alter().
 */
function gent_base_theme_registry_alter(&$registry) {
  require_once dirname(__FILE__) . '/includes/registry.inc';
  
  // Fix for integration with the theme developer module.
  if (module_exists('devel_themer')) {
    foreach ($registry as $hook => $data) {
      if (isset($data['original'])) {
        $registry[$hook] = $data['original'];
      }
    }
  }

  // For maintainability reasons, some of this code lives in a class.
  $handler = new GentBaseThemeRegistryHandler($registry, $GLOBALS['theme']);

  // Allows themers to split preprocess / process / theme code across separate
  // files to keep the main template.php file clean. This is really fast because
  // it uses the theme registry to cache the paths to the files that it finds.
  $trail = gent_base_theme_trail($GLOBALS['theme']);
  foreach ($trail as $theme => $name) {
    $handler->registerHooks($theme);
    $handler->registerThemeFunctions($theme, $trail);
  }

  // Override the default 'template_process_html' hook implementation.
  $handler->overrideHook('html', 'template_process_html', 'gent_base_template_process_html_override');

  // We prefer the attributes array instead of the plain classes array used by
  // many core and contrib modules. In Drupal 8, we are going to convert all
  // occurrences of that into an attributes object. For now, we simply
  // synchronize our attributes array with the classes array to encourage
  // themers to use it.
  foreach ($registry as $hook => $item) {
    if (empty($item['base hook']) && empty($item['function'])) {
      if (($index = array_search('template_preprocess', $registry[$hook]['preprocess functions'], TRUE)) !== FALSE) {
        // Make sure that gent_base_initialize_attributes() is invoked first.
        array_unshift($registry[$hook]['process functions'], 'gent_base_cleanup_attributes');
        // Add gent_base_cleanup_attributes() right after template_preprocess().
        array_splice($registry[$hook]['preprocess functions'], $index + 1, 0, 'gent_base_initialize_attributes');
      }
    }
  }

  // Add a preprocessor for initializing default variables to every layout.
  foreach (array_keys(_gent_base_theme_layouts()) as $hook) {
    $registry[$hook]['preprocess functions'] = array_diff($registry[$hook]['preprocess functions'], array('template_preprocess'));

    array_unshift($registry[$hook]['process functions'], '_gent_base_preprocess_default_layout_variables');
  }

  // Allow extensions to register hooks in the theme registry.
  foreach (gent_base_extensions() as $extension => $info) {
    // Invoke the according hooks for every enabled extension.
    if (gent_base_extension_enabled($extension)) {
      // Give every enabled extension a chance to alter the theme registry.
      $hook = $info['theme'] . '_extension_' . $extension . '_theme_registry_alter';

      if (function_exists($hook)) {
        $hook($registry);
      }
    }
  }

  // Fix for integration with the theme developer module.
  if (module_exists('devel_themer') && function_exists('devel_themer_theme_registry_alter')) {
    devel_themer_theme_registry_alter($registry);
  }
}



/**
 * Initializes the attributes array from the classes array.
 */
function gent_base_initialize_attributes(&$variables) {
//  dpm($variables['attributes_array']['class'], 'init');
  if (!empty($variables['attributes_array']['class'])) {
    $variables['classes_array'] = array_unique(array_merge($variables['classes_array'], $variables['attributes_array']['class']));
  }
  $variables['attributes_array']['class'] = &$variables['classes_array'];
}

/**
 * Processes the attributes and classes array.
 */
function gent_base_cleanup_attributes(&$variables, $hook) {
//  dpm($variables['attributes_array']['class'], 'cleanup');
  // Break the reference between the classes array and the attributes array.
  $classes = !empty($variables['classes_array']) ? $variables['classes_array'] : array();
  unset($variables['attributes_array']['class'], $variables['classes_array']);

  // Clone the attributes array classes into the classes array for backwards
  // compatibility reasons. Note that we do not recommend using the classes in
  // classes array anyways.
  $variables['classes_array'] = $classes;

  if (!empty($classes)) {
    // Only write the 'class' attribute if it's not empty.
    $variables['attributes_array']['class'] = $classes;
  }
}

/**
 * Overrides template_process_html().
 */
function gent_base_template_process_html_override(&$variables) {
  // Render page_top and page_bottom into top level variables.
  $variables['page_top'] = drupal_render($variables['page']['page_top']);
  $variables['page_bottom'] = drupal_render($variables['page']['page_bottom']);
  // Place the rendered HTML for the page body into a top level variable.
  $variables['page'] = $variables['page']['#children'];
  $variables['page_bottom'] .= gent_base_get_js('footer');

  $variables['head'] = drupal_get_html_head();
  $variables['css'] = drupal_add_css();
  $variables['styles']  = drupal_get_css();
  $variables['scripts'] = gent_base_get_js();
}

/**
 * Implements hook_block_list_alter().
 */
function gent_base_block_list_alter(&$blocks) {
  if (gent_base_extension_enabled('layouts') && $layout = gent_base_layout()) {
    $callers = debug_backtrace();

    // Check if drupal_alter() was invoked from _block_load_blocks(). This is
    // required as we do not want to interfere with contrib modules like ctools.
    if ($callers['2']['function'] === '_block_load_blocks') {
      // In case we are currently serving a gent_base layout we have to make sure
      // that we don't process blocks that will never be shown because the
      // active layout does not even have a region for them.
      foreach ($blocks as $id => $block) {
        if (!array_key_exists($block->region, $layout['info']['regions'])) {
          unset($blocks[$id]);
        }
      }
    }
  }

  // Hide the main content block on the front page if the theme settings are
  // configured that way.
  if (!gent_base_theme_get_setting('gent_base_toggle_front_page_content', TRUE) && drupal_is_front_page()) {
    foreach ($blocks as $key => $block) {
      if ($block->module == 'system' && $block->delta == 'main') {
        unset($blocks[$key]);
      }
    }

    drupal_set_page_content();
  }
}

/**
 * Implements hook_page_delivery_callback_alter().
 */
function gent_base_page_delivery_callback_alter(&$callback) {
  if (module_exists('overlay') && overlay_display_empty_page()) {
    $callback = 'gent_base_override_overlay_deliver_empty_page';
  }
}

/**
 * Delivery callback to display an empty page.
 *
 * This function is used to print out a bare minimum empty page which still has
 * the scripts and styles necessary in order to trigger the overlay to close.
 */
function gent_base_override_overlay_deliver_empty_page() {
  $empty_page = '<html><head><title></title>' . drupal_get_css() . gent_base_get_js() . '</head><body class="overlay"></body></html>';
  print $empty_page;
  drupal_exit();
}

/**
 * Implements hook_page_alter().
 */
function gent_base_page_alter(&$page) {
  // Place dummy blocks in each region if the 'demo regions' setting is active
  // to force regions to be rendered.
  if (gent_base_extension_enabled('development') && gent_base_theme_get_setting('gent_base_demo_regions', TRUE) && user_access('administer site configuration')) {
    $item = menu_get_item();

    // Don't interfere with the 'Demonstrate block regions' page.
    if (strpos('admin/structure/block/demo/', $item['path']) !== 0) {
      $regions = system_region_list($GLOBALS['theme_key'], REGIONS_VISIBLE);
      $configured = gent_base_theme_get_setting('gent_base_demo_regions_list', array_keys($regions));

      // We don't explicitly load possible layout regions and instead really
      // just show demo regions for those regions that we can actually place
      // blocks in. Hence, there will only be demo regions for those regions
      // that have been declared through the theme's .info file.
      foreach (array_intersect_key($regions, array_flip($configured)) as $region => $name) {
        if (empty($page[$region])) {
          $page[$region]['#theme_wrappers'] = array('region');
          $page[$region]['#region'] = $region;
        }

        $page[$region]['#name'] = $name;
        $page[$region]['#debug'] = TRUE;
      }
    }
  }

  if (gent_base_extension_enabled('compatibility') && gent_base_theme_get_setting('gent_base_chrome_edge', TRUE) && gent_base_theme_get_setting('gent_base_chrome_notice', TRUE)) {
    $supported = gent_base_theme_get_setting('gent_base_internet_explorer_support', FALSE);

    $page['page_top']['gent_base_chrome'] = array(
      '#theme' => 'gent_base_chrome',
      '#pre_render' => array('drupal_pre_render_conditional_comments'),
      '#browsers' => array(
        'IE' => !$supported ? TRUE : 'lte IE ' . $supported,
        '!IE' => FALSE,
      ),
    );
  }
}

/**
 * Implements hook_html_head_alter().
 */
function gent_base_html_head_alter(&$head) {
  // Simplify the meta tag for character encoding.
  $head['system_meta_content_type']['#attributes'] = array(
    'charset' => 'utf-8',
  );

  // Optimize mobile viewport.
  $head_elements['mobile_viewport'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width',
    ),
  );

  // Remove image toolbar in IE.
  $head_elements['ie_image_toolbar'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'http-equiv' => 'ImageToolbar',
      'content' => 'false',
    ),
  );

  // Allow full screen on mobile.
  $head_elements['apple_mobile_web_app_capable'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'apple-mobile-web-app-capable',
      'content' => 'yes',
    ),
  );
}

/**
 * Implements hook_gent_base_theme_libraries_info().
 */
function gent_base_gent_base_theme_libraries_info() {
  $libraries['selectivizr'] = array(
    'name' => t('Selectivizr'),
    'description' => t('Selectivizr is a JavaScript utility that emulates CSS3 pseudo-classes and attribute selectors in Internet Explorer 6-8. Simply include the script in your pages and selectivizr will do the rest.'),
    'vendor' => 'Keith Clark',
    'vendor url' => 'http://selectivizr.com/',
    'package' => t('Polyfills'),
    'files' => array(
      'js' => array(
        'selectivizr.min.js' => array(
          'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
          'weight' => 110,
          'every_page' => TRUE,
        ),
      ),
    ),
    'variants' => array(
      'source' => array(
        'name' => t('Source'),
        'description' => t('During development it might be useful to include the source files instead of the minified version.'),
        'files' => array(
          'js' => array(
            'selectivizr.js' => array(
              'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
              'weight' => 110,
              'every_page' => TRUE,
            ),
          ),
        ),
      ),
    ),
  );

  $libraries['respond'] = array(
    'name' => t('Respond'),
    'description' => t('Respond is a fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more). Note: This library requires <a href="!url">CSS aggregation</a> to be enabled for it to work properly.', array('!url' => url('admin/config/development/performance', array('alias' => TRUE)))),
    'vendor' => 'Scott Jehl',
    'vendor url' => 'http://scottjehl.com/',
    'package' => t('Polyfills'),
    'callbacks' => array('gent_base_extension_assets_requirements_css_aggregation'),
    'files' => array(
      'js' => array(
        'respond.min.js' => array(
          'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
          'weight' => 120,
          'every_page' => TRUE,
        ),
      ),
    ),
    'variants' => array(
      'source' => array(
        'name' => t('Source'),
        'description' => t('During development it might be useful to include the source files instead of the minified version.'),
        'files' => array(
          'js' => array(
            'respond.js' => array(
              'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
              'weight' => 120,
              'every_page' => TRUE,
            ),
          ),
        ),
      ),
    ),
  );

  $libraries['pie'] = array(
    'name' => t('CSS3 PIE'),
    'description' => t('PIE makes Internet Explorer 6-9 capable of rendering several of the most useful CSS3 decoration features.'),
    'vendor' => 'Keith Clark',
    'vendor url' => 'http://css3pie.com/',
    'options form' => 'gent_base_library_pie_options_form',
    'package' => t('Polyfills'),
    'callbacks' => array('gent_base_extension_assets_load_pie_selectors'),
    'files' => array(),
    'variants' => array(
      'js' => array(
        'name' => t('JavaScript'),
        'description' => t('While the .htc behavior is still the recommended approach for most users, the JS version has some advantages that may be a better fit for some users.'),
        'files' => array(
          'js' => array(
            'PIE.js' => array(
              'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
              'weight' => 100,
              'every_page' => TRUE,
            ),
          ),
        ),
      ),
    ),
  );

  $libraries['html5shiv'] = array(
    'name' => t('HTML5 Shiv'),
    'description' => t('This script is the defacto way to enable use of HTML5 sectioning elements in legacy Internet Explorer, as well as default HTML5 styling in Internet Explorer 6 - 9, Safari 4.x (and iPhone 3.x), and Firefox 3.x.'),
    'vendor' => 'Alexander Farkas',
    'package' => t('Polyfills'),
    'files' => array(
      'js' => array(
        'html5shiv.min.js' => array(
          'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
          'weight' => 100,
          'every_page' => TRUE,
        ),
        'html5shiv-printshiv.min.js' => array(
          'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
          'weight' => 100,
          'every_page' => TRUE,
        ),
      ),
    ),
    'variants' => array(
      'source' => array(
        'name' => t('Source'),
        'description' => t('During development it might be useful to include the source files instead of the minified version.'),
        'files' => array(
          'js' => array(
            'html5shiv.js' => array(
              'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
              'weight' => 100,
              'every_page' => TRUE,
            ),
            'html5shiv-printshiv.js' => array(
              'browsers' => array('IE' => '(gte IE 6)&(lte IE 8)', '!IE' => FALSE),
              'weight' => 100,
              'every_page' => TRUE,
            ),
          ),
        ),
      ),
    ),
  );

  return $libraries;
}

/**
 * gent_base layout preprocessor for initializing default variables.
 */
function _gent_base_preprocess_default_layout_variables(&$variables, $hook) {
  // Invoke template_preprocess() manually but don't override the classes.
  $classes = isset($variables['classes_array']) ? $variables['classes_array'] : array();
  template_preprocess($variables, $hook);
  $variables['classes_array'] = $classes;

  $layout = $variables['gent_base_layout'];
  $variables['attributes_array']['class'][] = 'l-page';

  // Add information about the rendered sidebars, but only if the layout
  // actually supports sidebars.
  if ($matches = preg_grep('/^sidebar/', array_keys($layout['info']['regions']))) {
    $count = count(array_intersect($matches, array_keys(array_filter($variables['page']))));
    // No-one is going to have more than *nine* sidebars. Even nine is actually
    // already pretty unrealistic.
    $words = array('no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine');

    // Wrap this in a isset() just in case someone is stupid enough to have more
    // than *nine* sidebar regions.
    if (isset($words[$count])) {
      $variables['attributes_array']['class'][] = "has-{$words[$count]}-sidebar" . (($count !== 1) ? 's' : '');
    }

    foreach ($matches as $name) {
      if (!empty($variables['page'][$name])) {
        $variables['attributes_array']['class'][] = 'has-' . str_replace('_', '-', $name);
      }
    }
  }
}

/**
 * Theme callback for rendering an gent_base layout.
 */
function theme_gent_base_page_layout($variables) {
  // Clean up the theme hook suggestion so we don't end up in an infinite loop.
  unset($variables['theme_hook_suggestion'], $variables['theme_hook_suggestions']);

  $layout = $variables['gent_base_layout'];
  drupal_process_attached(array('#attached' => $layout['attached']));
  gent_base_layout_load_theme_assets($layout['name']);

  $hook = str_replace('-', '_', $variables['gent_base_layout']['template']);
  return theme($hook, $variables);
}

/**
 * Shows a notice when Google Chrome Frame is not installed.
 */
function theme_gent_base_chrome($variables) {
  $message = t('You are using an outdated browser! <a href="!upgrade">Upgrade your browser today</a> or <a href="!install">install Google Chrome Frame</a> to better experience this site.', array(
    '!upgrade' => url('http://browsehappy.com'),
    '!install' => url('http://www.google.com/chromeframe', array(
      'query' => array('redirect' => 'true'),
    )),
  ));

  return '<p class="chromeframe">' . $message . '</p>';
}

/**
 * Implements theme_breadcrumb().
 */
function gent_base_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  if (!empty($breadcrumb)) {
    $breadcrumb[0] = l(t('Gent.be'), '<front>');

    // Get path arguments array.
    //$args = arg() + array_fill(0, 10, NULL);

    // TODO complete me... make something in theme that we add breadcrumb prefix items! or subtheme?!

    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';
    if (count($breadcrumb) > 1) {
      $output .= '<ul class="breadcrumb"><li>' . implode('</li><li><span class="icon icon-caret"></span></li><li>', $breadcrumb) . '</li></ul>';
      return $output;
    }
    else {
      return FALSE;
    }
  }
}
