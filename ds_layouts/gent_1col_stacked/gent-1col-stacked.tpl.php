<?php

/**
 * @file
 * Display Suite 1 column stacked template.
 */
?>
<<?php print $layout_wrapper; print $layout_attributes; ?> class="gent-1col-stacked <?php print $classes;?> clearfix">

  <?php if (isset($title_suffix['contextual_links'])): ?>
  <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>

  <<?php print $header_wrapper ?>>
    <?php print $header; ?>
  </<?php print $header_wrapper ?>>

  <<?php print $left_wrapper ?>>
    <?php print $left; ?>
  </<?php print $left_wrapper ?>>

  <<?php print $footer_wrapper ?>>
    <?php print $footer; ?>
  </<?php print $footer_wrapper ?>>

</<?php print $layout_wrapper ?>>

<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>
