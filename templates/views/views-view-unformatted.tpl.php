<?php

/**
 * @file
 * Overridden Views unformatted template.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <header class="l-full">
    <h2 class="h1 hT"><?php print $title; ?></h2>
  </header>
<?php endif; ?>

<?php if ($rows): ?>
  <div class="view-content clearfix">
    <?php foreach ($rows as $id => $row): ?>
      <?php if (!empty($classes_array[$id])): ?>
        <div class="<?php print $classes_array[$id]; ?>">
          <?php print $row; ?>
        </div>
      <?php else: ?>
        <?php print $row; ?>
      <?php endif; ?>
    <?php endforeach; ?>
  </div>
<?php endif; ?>
