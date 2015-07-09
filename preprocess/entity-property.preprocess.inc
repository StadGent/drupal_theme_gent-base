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
            $variables['content'] = '';
            foreach ($data as $product_id) {
              if (isset($products[$product_id])) {
                $variables['content'] .= l($products[$product_id], sprintf($appointment_base_path . '/%d', $product_id), array(
                  'attributes' => array(
                    'class' => array('btn', 'btn--medium', 'btn--delta'),
                  ),
                ));
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
