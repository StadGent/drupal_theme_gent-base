<?php

/**
 * @file
 * Overrides the compact block template from the gentinfo module.
 *
 * The compact block receives a different island class and title classes.
 */
?>
<div id="<?php print $block_html_id; ?>" class="l-column js-height island island--delta <?php print $classes; ?>">
  <?php if ($block->subject): ?>
    <h3><?php print $block->subject ?></h3>
  <?php endif;?>

  <?php print $content ?>
</div>
