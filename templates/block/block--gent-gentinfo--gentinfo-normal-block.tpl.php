<div id="<?php print $block_html_id; ?>" class="l-third island island--epsilon js-height <?php print $classes; ?>">

<?php if ($block->subject): ?>
  <h2 class="h1 hT"><?php print $block->subject ?></h2>
<?php endif;?>
  <?php print render($title_suffix); ?>

  <?php print $content ?>
</div>
