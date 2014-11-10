<?php
/**
 * @file
 * GPDC sheet files preprocessing.
 */

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
      case 'form_url':
        $variables['content'] = '<span class="icon icon-newtab"></span>' . "\n";
        $variables['content'] .= '<span class="article-content-action-title">' . t('Online requisition form') . '</span>' . "\n";
        $variables['content'] .= '<span class="article-content-action-document">' . t('Complete the online requisition form') . '</span>' . "\n";

        $variables['content'] = l($variables['content'], $property->value(), array(
          'attributes' => array(
            'class' => array('article-content-action'),
          ),
          'html' => TRUE,
        ));
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
          $variables['content'] = theme('item_list', array('items' => $rendered_nodes, 'hide_wrapper' => TRUE, 'attributes' => array('class' => array('link-list'))));
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
          switch ($file->filemime) {
            case 'application/pdf':
              $title = t('Complete the requisition form (PDF)');
              break;

            case 'application/msword':
              $title = t('Complete the requisition form (Word)');
              break;

            default:
              $title = t('Complete the requisition form');
              break;
          }

          $content = '<span class="icon icon-form_fill"></span>' . "\n";
          $content .= '<span class="article-content-action-title">' . $title . '</span>' . "\n";
          $content .= '<span class="article-content-action-document">' . check_plain($file->filename) . '</span> ';
          $content .= '<span class="small article-content-action-document-size">' . format_size($file->filesize) . '</span>' . "\n";

          $variables['content'][] = l($content, file_create_url($file->uri), array(
            'attributes' => array(
              'class' => array('article-content-action'),
            ),
            'html' => TRUE,
          ));
        }
        break;
    }
  }
}
