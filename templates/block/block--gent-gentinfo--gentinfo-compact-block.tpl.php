<?php
/**
 * Custom template for the gentinfo block in our theme. The compact block receives a different island class
 */
?>
<div id="<?php print $block_html_id; ?>" class="l-column island island--delta <?php print $classes; ?>"<?php print $attributes; ?>>

  <?php if ($block->subject): ?>
    <h3><?php print $block->subject ?></h3>
  <?php endif;?>

  <?php print $content ?>
</div>
