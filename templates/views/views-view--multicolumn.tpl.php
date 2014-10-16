<?php if ($rows): ?>
  <div class="multi-column" data-columns>
    <?php print $rows; ?>
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
