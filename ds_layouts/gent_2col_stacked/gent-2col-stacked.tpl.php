<?php

/**
 * @file
 * Display Suite 2 column stacked template.
 */
?>
<<?php print $layout_wrapper; print $layout_attributes; ?> class="gent-2col-stacked <?php print $classes;?> clearfix">

  <?php if (isset($title_suffix['contextual_links'])): ?>
  <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>

  <?php if ($header): ?>
    <<?php print $header_wrapper ?> class="l-header">
      <?php print $header; ?>
    </<?php print $header_wrapper ?>>
  <?php endif; ?>

  <<?php print $left_wrapper ?> class="l-primary">
    <?php print $left; ?>
  </<?php print $left_wrapper ?>>

	<<?php print $right_wrapper ?> class="l-secondary">
    <?php print $right; ?>
  </<?php print $right_wrapper ?>>

  <?php if ($footer): ?>
    <<?php print $footer_wrapper ?> class="l-footer">
      <?php print $footer; ?>
    </<?php print $footer_wrapper ?>>
  <?php endif; ?>

</<?php print $layout_wrapper ?>>

<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>
