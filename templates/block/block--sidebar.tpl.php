<?php

/**
 * @file
 * Overrides the block template in the sidebar region.
 */
?>
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($block->subject): ?>
    <h2><?php print $block->subject ?></h2>
  <?php endif;?>
  <?php print render($title_suffix); ?>

  <?php print $content ?>
</div>
