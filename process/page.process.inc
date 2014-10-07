<?php

/**
 * Implements hook_process_page().
 */
function gent_base_process_page(&$variables) {
  // Collect inner_styles per region
  if (!empty($variables['inner_styles'])) {
    foreach ($variables['inner_styles'] as $region => $styles) {
      $variables['inner_styles'][$region] = " style='";
      foreach ($styles as $name => $value) {
        $variables['inner_styles'][$region] .= $name .': '. $value . '; ';
      }
      $variables['inner_styles'][$region] .= "'";
    }
  }
}
