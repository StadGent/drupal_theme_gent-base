<div class="<?php print $classes; ?>">

<?php if ($rows): ?>
<div class="multi-column-items">
  <?php print $rows; ?>
  <div class="gutter"></div>
</div>
<?php elseif ($empty): ?>
    <?php print $empty; ?>
<?php endif; ?>

<?php if ($pager): ?>
  <?php print $pager; ?>
<?php endif; ?>

<?php if ($more): ?>
  <?php print $more; ?>
<?php endif; ?>
</div>