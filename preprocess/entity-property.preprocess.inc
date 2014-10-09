<?php
/**
 * @file
 * GPDC sheet files preprocessing.
 */

/**
 * Overrides hook_preprocesss_HOOK().
 */
function gent_preprocess_entity_property(&$variables) {
  if (module_exists('sheet') && sheet_is_sheet_property($variables, 'gpdc')) {
    $element = $variables['elements'];
    $property = $element['#entity_wrapped']->{$element['#property_name']};

    // Include the theme hook suggestion.
    $path = __DIR__ . '/../theme/entity-property--sheet--gpdc--' . str_replace('_', '-', $element['#property_name']) . '.theme.inc';
    if (is_file($path)) {
      require_once $path;
    }

    switch ($element['#property_name']) {
      case 'references':
        $variables['content'] = array();

        foreach ($property->value() as $reference) {
          $content = '<span class="icon icon-newtab"></span>' . "\n";
          $content .= '<span class="article-content-action-title">' . t('Visit') . '</span>' . "\n";
          $content .= '<span class="article-content-action-document">' . check_plain($reference['title']) . '</span>' . "\n";

          $variables['content'][] = l($content, $reference['url'], array(
            'attributes' => array(
              'class' => array('article-content-action'),
            ),
            'html' => TRUE,
          ));
        }
        break;

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
          $nodes = node_view_multiple($nodes);
          $variables['content'] = render($nodes);
        }

        $variables['attributes_array']['class'] = array('article-footer');
        break;

      case 'attachments':
        $variables['items'] = array_map('get_object_vars', $property->value());
        $variables['attributes_array']['class'] = array('article-footer');
        break;

      case 'forms':
        $variables['content'] = array();

        foreach ($property->value() as $file) {
          $content = '<span class="icon icon-form_fill"></span>' . "\n";
          $content .= '<span class="article-content-action-title">' . t('Complete the requisition form') . '</span>' . "\n";
          $content .= '<span class="article-content-action-document">' . t('Requisition form @name', array('@name' => $file->filename)) . '</span> ';
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
