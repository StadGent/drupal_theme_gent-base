<?php

/**
 * @file
 * Overridden views view template for the multicolumn masonry views.
 *
 * @ingroup views_templates
 */
?>
<div class="masonry-wrapper">
  <?php if ($exposed): ?>
    <div class="view-filters">
      <?php print $exposed; ?>
    </div>
  <?php endif; ?>

  <div class="<?php print $classes; ?>">
    <?php if ($rows): ?>
      <div class="multi-column-items">
      <?php print $rows; ?>
      <div class="gutter"></div>
    </div>

    <?php elseif ($empty): ?>
        <?php print $empty; ?>
    <?php endif; ?>

    <?php if ($pager): ?>
      <?php print $pager; ?>
    <?php endif; ?>

    <?php if ($more): ?>
      <?php print $more; ?>
    <?php endif; ?>
  </div>
</div>
