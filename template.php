<?php
/**
 * @file
 * Template file for the gent_base base theme.
 */

define('GENT_BASE_TOP_MENU_RENDER_METHOD_EMPTY', '');
define('GENT_BASE_TOP_MENU_RENDER_METHOD_REGION', 'region');
define('GENT_BASE_TOP_MENU_RENDER_METHOD_USER_LINKS', 'user_links');

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

  // Whitelist core CSS here. The rest can be allowed via the alter hook
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
    $variables['primary']['#prefix'] .= '<ul class="tabs primary tabs--primary links--inline">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] .= '<ul class="tabs secondary tabs--secondary links--inline">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }
  return $output;
}


/**
 * Implements theme_file_formatter_table().
 *
 * Use a list instead of table to display links.
 * @ingroup themeable
 */
function gent_base_file_formatter_table($variables) {
  $rows = array();
  foreach ($variables['items'] as $delta => $item) {
    $rows['items'][] = array(
      theme('file_link', array('file' => (object) $item)),
    );
  }
  $rows['attributes']['class'] = 'link-list';
  return empty($rows) ? '' : theme('item_list', $rows);
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

  if (empty($extension)) {
    $extension = $file->filemime;
  }
  return l($link_text, $url, $options) . '<span class="filetype">' . format_size($file->filesize) . '</span> <span class="filetype">' . strtoupper($extension) . '</span>';
}

/**
 * Implements theme_breadcrumb().
 */
function gent_base_breadcrumb($variables) {
  /*
  $breadcrumb = $variables['breadcrumb'];

  // Provide a navigational heading to give context for breadcrumb links to
  // screen-reader users. Make the heading invisible with .element-invisible.
  $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';
  $nr_parts = count($breadcrumb);
  if ($nr_parts > 1) {
    $breadcrumb[$nr_parts - 1] = '<span>' . $breadcrumb[$nr_parts - 1] . '</span>';
    $output .= '<ul class="nav nav--breadcrumb"><li>' . implode('</li><li>', $breadcrumb) . '</li></ul>';
    return $output;
  }
  return FALSE;
  */
}

/**
 * Implements theme_pager().
 *
 * @ingroup themeable
 */
function gent_base_pager($variables) {
  $tags = $variables['tags'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $quantity = $variables['quantity'];
  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // first is the first page listed by this pager piece (re quantity)
  $pager_first = $pager_current - $pager_middle + 1;
  // last is the last page listed by this pager piece (re quantity)
  $pager_last = $pager_current + $quantity - $pager_middle;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }
  // End of generation loop preparation.

  $li_first = theme('pager_first', array('text' => (isset($tags[0]) ? $tags[0] : t('« first')), 'element' => $element, 'parameters' => $parameters));
  $li_previous = theme('pager_previous', array('text' => (isset($tags[1]) ? $tags[1] : t('‹ previous')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_next = theme('pager_next', array('text' => (isset($tags[3]) ? $tags[3] : t('next ›')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_last = theme('pager_last', array('text' => (isset($tags[4]) ? $tags[4] : t('last »')), 'element' => $element, 'parameters' => $parameters));

  if ($pager_total[$element] > 1) {
    if ($li_first) {
      $items[] = array(
        'class' => array('pager-first'),
        'data' => $li_first,
      );
    }
    if ($li_previous) {
      $items[] = array(
        'class' => array('pager-previous'),
        'data' => $li_previous,
      );
    }

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '…',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_previous', array('text' => $i, 'element' => $element, 'interval' => ($pager_current - $i), 'parameters' => $parameters)),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            'class' => array('pager-current'),
            'data' => '<span>' . $i . '</span>',
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_next', array('text' => $i, 'element' => $element, 'interval' => ($i - $pager_current), 'parameters' => $parameters)),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '…',
        );
      }
    }
    // End generation.
    if ($li_next) {
      $items[] = array(
        'class' => array('pager-next'),
        'data' => $li_next,
      );
    }
    if ($li_last) {
      $items[] = array(
        'class' => array('pager-last'),
        'data' => $li_last,
      );
    }
    return '<h2 class="element-invisible">' . t('Pages') . '</h2>' . theme('item_list', array(
      'items' => $items,
      'attributes' => array('class' => array('pager')),
      'hide_wrapper' => TRUE,
    ));
  }
}

/**
 * Implements theme_item_list().
 *
 * @ingroup themeable
 */
function gent_base_item_list($variables) {
  $items = $variables['items'];
  $title = $variables['title'];
  $type = $variables['type'];
  $attributes = $variables['attributes'];
  $hide_wrapper = !empty($variables['hide_wrapper']);

  // Only output the list container and title, if there are any list items.
  // Check to see whether the block title exists before adding a header.
  // Empty headers are not semantic and present accessibility challenges.
  if (!$hide_wrapper) {
    $output = '<div class="item-list">';
  }
  if (isset($title) && $title !== '') {
    $output .= '<h3>' . $title . '</h3>';
  }

  if (!empty($items)) {
    $output .= "<$type" . drupal_attributes($attributes) . '>';
    $num_items = count($items);
    $i = 0;
    foreach ($items as $item) {
      $attributes = array();
      $children = array();
      $data = '';
      $i++;
      if (is_array($item)) {
        foreach ($item as $key => $value) {
          if ($key == 'data') {
            $data = $value;
          }
          elseif ($key == 'children') {
            $children = $value;
          }
          else {
            $attributes[$key] = $value;
          }
        }
      }
      else {
        $data = $item;
      }
      if (count($children) > 0) {
        // Render nested list.
        $data .= theme_item_list(array('items' => $children, 'title' => NULL, 'type' => $type, 'attributes' => $attributes));
      }
      if ($i == 1) {
        $attributes['class'][] = 'first';
      }
      if ($i == $num_items) {
        $attributes['class'][] = 'last';
      }
      $output .= '<li' . drupal_attributes($attributes) . '>' . $data . "</li>\n";
    }
    $output .= "</$type>";
  }
  if (!$hide_wrapper) {
    $output .= '</div>';
  }
  return $output;
}

/**
 * Implements hook_form_FORM_ID_ater().
 */
function gent_base_form_gent_newsletter_form_alter(&$form) {
  $form['email']['#attributes']['class'][] = 'prefix--email';
  $form['submit']['#attributes']['class'] = array('btn', 'btn--medium', 'btn--alpha', 'postfix--email-submit');
}
