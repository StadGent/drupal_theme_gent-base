<?php
/**
 * Custom template for the gentinfo block in our theme.
 *
 * The compact block receives a different island class and title classes.
 * @TODO See if we can make this more configurable for future blockw with the block class module.
 */
?>
<div id="<?php print $block_html_id; ?>" class="l-column island island--delta <?php print $classes; ?>">

  <?php if ($block->subject): ?>
    <h3><?php print $block->subject ?></h3>
  <?php endif;?>

  <?php print $content ?>
</div>
