<div id="<?php print $block_html_id; ?>" class="l-column island island--gamma <?php print $classes; ?>"<?php print $attributes; ?>>

<?php if ($block->subject): ?>
  <h3><?php print $block->subject ?></h3>
<?php endif;?>
  <?php print render($title_suffix); ?>

  <?php print $content ?>
</div>
