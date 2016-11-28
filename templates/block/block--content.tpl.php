<?php

/**
 * @file
 * Overrides the block template in the content region.
 */
?>
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>">

  <?php print render($title_prefix); ?>
  <?php if ($block->subject): ?>
    <header>
      <h2 class="h1 hT"><?php print $block->subject ?></h2>
    </header>
  <?php endif;?>
  <?php print render($title_suffix); ?>

  <?php print $content ?>
</div>
