<?php
/**
 * @file
 * Template for gent gentinfo normal block template.
 */
?>
<div id="<?php print $block_html_id; ?>"
     class="gent-gentinfo__block-content island island--epsilon js-height <?php print $classes; ?>">
  <?php if ($block->subject): ?>
    <h2 class="h1 hT"><?php print $block->subject; ?></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <div class="clearfix">
    <?php print $content; ?>
  </div>
</div>
