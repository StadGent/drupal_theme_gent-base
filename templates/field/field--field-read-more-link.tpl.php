<?php

/**
 * @file
 * Overrides the field template for the "Read more" field.
 */
?>
<div class="readmore-list-wrapper">
  <?php foreach ($items as $delta => $item): ?>
    <?php print render($item); ?>
  <?php endforeach; ?>
</div>
