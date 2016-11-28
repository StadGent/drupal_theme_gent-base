<?php

/**
 * @file
 * Overrides the block template in the content bottom region.
 */
?>
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>">

  <?php print render($title_prefix); ?>
  <?php if ($block->subject): ?>
    <h3<?php print $title_attributes; ?>><?php print $block->subject ?></h3>
  <?php endif;?>
  <?php print render($title_suffix); ?>

  <?php print $content ?>
</div>
